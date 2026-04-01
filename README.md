# Lyricsfrompriii 🌙

A romantic, interactive music diary for two people built with React, Flask, and Supabase.

## Tech Stack
- **Frontend**: React + Vite, Tailwind CSS, Framer Motion
- **Backend**: Python Flask (REST API)
- **Database**: Supabase (PostgreSQL)
- **Music API**: Spotify Web API

## Features
- 🎵 Search songs via Spotify API
- ⭐ Rate songs (1-5 stars)
- 📝 Add favorite lyrics and personal notes
- 🌙 Romantic timeline UI with animations
- 📱 Mobile responsive
- 🔗 Shareable collection pages

## Project Structure
```
lyricsfrompriii/
├── frontend/          # React + Vite app
├── backend/           # Flask API
├── .env.example       # Environment variables template
└── README.md          # This file
```

## Setup Instructions

### 1. Clone and Install Dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
pip install -r requirements.txt
```

### 2. Environment Variables
Copy `.env.example` to `.env` and fill in your API keys:
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SUPABASE_URL`
- `SUPABASE_KEY`

### 3. Run Development Servers
```bash
# Backend (port 5000)
cd backend
python app.py

# Frontend (port 5173)
cd frontend
npm run dev
```

### 4. Database Setup
Create a Supabase project and run the SQL from `database/schema.sql`.

## Deployment
- **Frontend**: Vercel
- **Backend**: Render or Railway

## API Endpoints
- `GET /songs` - Fetch all saved songs
- `POST /songs` - Add a new song entry
- `GET /spotify/search?q=<query>` - Search Spotify for songs
