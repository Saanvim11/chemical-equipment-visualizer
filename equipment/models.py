from django.db import models

class UploadedDataset(models.Model):
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    summary = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"Dataset {self.id} - {self.uploaded_at}"