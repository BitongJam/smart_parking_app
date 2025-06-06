# 🚗 Parking Reservation System

A simple web-based system that allows users to reserve parking slots and receive notifications regarding the status of their reservations.

---

## 🧩 Project Overview

This project enables users to:
- View available parking slots.
- Reserve a parking slot by selecting a date and time.
- Receive notifications when their reservation is approved or canceled.
- Admins can manage parking locations and reservations.

---

## 🛠 Tech Stack

**Frontend:**
- React.js (TypeScript)
- Bootstrap 5

**Backend:**
- Django REST Framework
- PostgreSQL (or SQLite for development)

**Others:**
- Axios (HTTP client)
- Django CORS Headers
- JWT Authentication

---

## ⚙️ Setup & Installation

### 1. Clone the Repository


-  git https://github.com/BitongJam/smart_parking_app.git
- cd smart_parking_app
- cd backend/smart_parking_app
- python3 -m venv env  #i user python 3.10 
- source env/bin/activate  # or env\Scripts\activate on Windows

- pip install -r requirements.txt
- python manage.py migrate
- python manage.py createsuperuser
- python manage.py runserver



- cd smart_parking_app/frontend/smart_parking_app
- npm install
- npm run dev


Go back to the Backend 
-------
- cd backend/smart_parking_app/smart_parking_system
- open settiings.py

--find the CORS_ALLOWED_ORIGINS
change it what url of the Front End to allow connection of both

