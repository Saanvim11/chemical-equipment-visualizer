# equipment/views.py

import pandas as pd
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes, permission_classes
from .models import UploadedDataset
from .serializers import UploadCSVSerializer


@parser_classes([MultiPartParser, FormParser])
class UploadCSVView(APIView):

    @permission_classes([AllowAny])
    def get(self, request):
        return Response({
            "message": "Use POST to upload CSV file",
            "note": "You must be logged in to upload."
        }, status=200)

    @permission_classes([IsAuthenticated])
    def post(self, request):
        serializer = UploadCSVSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        file = serializer.validated_data['file']

        try:
            df = pd.read_csv(file)
            required_cols = ['Equipment Name', 'Type', 'Flowrate', 'Pressure', 'Temperature']
            if not all(col in df.columns for col in required_cols):
                return Response({"error": "Missing required columns"}, status=400)

            summary = {
                "total_count": len(df),
                "avg_flowrate": round(df['Flowrate'].mean(), 2),
                "avg_pressure": round(df['Pressure'].mean(), 2),
                "avg_temperature": round(df['Temperature'].mean(), 2),
                "type_distribution": df['Type'].value_counts().to_dict()
            }

            with transaction.atomic():
                dataset = UploadedDataset.objects.create(file=file, summary=summary)
                if UploadedDataset.objects.count() > 5:
                    UploadedDataset.objects.order_by('uploaded_at').first().delete()

            return Response({
                "message": "File uploaded successfully",
                "summary": summary,
                "data_preview": df.head().to_dict(orient='records')
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=500)


class DatasetHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        datasets = UploadedDataset.objects.all().order_by('-uploaded_at')[:5]
        data = [
            {
                "id": d.id,
                "uploaded_at": d.uploaded_at.isoformat(),
                "summary": d.summary
            } for d in datasets
        ]
        return Response(data)