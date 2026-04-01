# Quick Start Guide 🚀

Get your Lyricsfrompriii romantic music diary running in minutes!

## Prerequisites
- Node.js 18+ installed
- Python 3.8+ installed
- Git installed

## 1. Clone and Install Dependencies

```bash
# Install all dependencies at once
npm run install:all

# Or install separately:
# Frontend dependencies
cd frontend && npm install

# Backend dependencies  
cd backend && pip install -r requirements.txt
```

## 2. Set Up Environment Variables

### Backend (.env)
```bash
cd backend
cp .env.example .env
```
Edit `.env` with your API keys:
- Get Spotify credentials: [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
- Get Supabase credentials: [Supabase Dashboard](https://supabase.com)

### Frontend (.env)
```bash
cd frontend
cp .env.example .env
```
Edit `.env`:
```
VITE_API_URL=http://localhost:5000
```

## 3. Set Up Database

1. Create a Supabase project
2. Go to SQL Editor in Supabase
3. Run the SQL from `database/schema.sql`

## 4. Run the Application

### Option 1: Run both frontend and backend together
```bash
# From project root
npm run dev
```

### Option 2: Run separately
```bash
# Terminal 1 - Backend
cd backend && python app.py

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

## 5. Access Your App

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/health

## Test It Out!

1. Open http://localhost:5173
2. Click "Add Song"
3. Search for your favorite song
4. Add a rating, favorite lyric, and personal note
5. View it in the beautiful timeline!

## Need Help?

- Check the full [README.md](./README.md) for detailed instructions
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Check console logs for any errors

Enjoy creating your romantic music diary! 🌙💝🎵
