# Futuristic Todo List

A full-stack Todo List app with a beautiful glassmorphism (liquid glass) UI, built using **Django** (backend) and **React** (frontend, Vite). Inspired by Apple's modern design language.

## Features
- Add, edit, complete, and delete todos
- Multi-page app (Home, Todo Details, About, 404)
- Responsive, animated glassmorphism UI
- Real-time sync with Django REST API
- Environment-based API URL for easy deployment

## Tech Stack
- **Backend:** Django, Django REST Framework, django-cors-headers
- **Frontend:** React, Vite, Axios, React Router

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/futuristic-todolist.git
cd futuristic-todolist
```

### 2. Backend (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Set up your .env or environment variables for production
python manage.py migrate
python manage.py runserver
```

### 3. Frontend (React)
```bash
cd frontend
npm install
cp .env.example .env.local # or set VITE_API_BASE_URL in .env.local
npm run dev
```

## Deployment
- Set `DEBUG = False` and configure `ALLOWED_HOSTS` in Django for production
- Set `VITE_API_BASE_URL` in your frontend `.env` to your deployed backend
- Collect static files with `python manage.py collectstatic`

## License
MIT 