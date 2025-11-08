#  Vizly – Interactive CSV Analyzer (Web + Desktop)

**Vizly** is a hybrid **Web + Desktop application** for uploading, analyzing, and visualizing CSV datasets interactively.  
It enables users to upload tabular data, explore key statistics, and visualize insights through clean, dynamic charts — accessible via both browser and desktop interfaces.

---

##  Project Overview

Vizly demonstrates seamless integration between:
-  A **React (Vite)** web frontend  
-  A **Django + Django REST Framework** backend API  
-  A **PyQt5 desktop application**

Users can upload CSV files, view computed analytics (mean, min, max, distributions), and visualize trends via interactive charts.  
The backend provides a unified API used by both the web and desktop versions.

---

##  Features

-  **CSV Upload:** Upload datasets from web or desktop interface  
-  **Data Summary:** Compute totals, averages, and column statistics via Django + Pandas  
-  **Visualizations:** 
  - Chart.js for web  
  - Matplotlib for desktop  
-  **History Management:** Store last 5 uploaded datasets in SQLite  
-  **PDF Export:** Generate and download summary reports  
-  **Authentication (optional):** Basic user access control  
-  **Sample Data:** Includes `sample_equipment_data.csv` for quick testing  

---

##  Tech Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| **Frontend (Web)** | React.js + Vite + Chart.js | Upload, visualize, and interact with data |
| **Frontend (Desktop)** | PyQt5 + Matplotlib | Desktop data visualization client |
| **Backend** | Django + Django REST Framework | API for analytics, file management, and reports |
| **Database** | SQLite | Stores upload history and metadata |
| **Data Handling** | Pandas | CSV parsing and statistical analysis |
| **Deployment** | Render (Backend) + Vercel (Frontend) | Cloud hosting for demo |

---

##  Setup Instructions

###  1. Clone the Repository

```bash
git clone https://github.com/Saanvim11/vizly.git
cd vizly


## Backend Setup (Django)
# Create virtual environment
python -m venv venv
source venv/bin/activate   # (Windows: venv\Scripts\activate)

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start the development server
python manage.py runserver

### Backend runs at
http://127.0.0.1:8000/

## Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev

### Frontend runs at
http://localhost:5173/

## Deploed the full app at - 
