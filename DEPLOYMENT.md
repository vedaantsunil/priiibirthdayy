# Deployment Guide for Lyricsfrompriii

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository with your code

### Steps
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure settings:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Add environment variables:
     - `VITE_API_URL`: Your deployed backend URL
   - Click "Deploy"

### Environment Variables on Vercel
- Go to Project Settings → Environment Variables
- Add: `VITE_API_URL=https://your-backend-url.onrender.com`

## Backend Deployment (Render)

### Prerequisites
- Render account
- GitHub repository with your code

### Steps
1. **Prepare for Production**
   - Ensure your `.env` variables are set in Render dashboard
   - Update `requirements.txt` if needed

2. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure settings:
     - **Name**: lyricsfrompriii-backend
     - **Root Directory**: `backend`
     - **Runtime**: Python 3
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `python app.py`
     - **Instance Type**: Free (to start)

3. **Environment Variables on Render**
   Go to your service → Environment and add:
   - `SPOTIFY_CLIENT_ID`: Your Spotify Client ID
   - `SPOTIFY_CLIENT_SECRET`: Your Spotify Client Secret
   - `SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_KEY`: Your Supabase Anon Key
   - `FLASK_ENV`: `production`
   - `FLASK_DEBUG`: `False`
   - `PORT`: `5000`

## Database Setup (Supabase)

### Steps
1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization and set project name
   - Set a strong database password
   - Choose a region close to your users

2. **Run Database Schema**
   - Go to SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `database/schema.sql`
   - Click "Run" to create the `song_entries` table

3. **Get API Keys**
   - Go to Project Settings → API
   - Copy the **Project URL** and **anon public** key
   - Use these in your backend environment variables

## Spotify API Setup

### Steps
1. **Create Spotify Developer Account**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Log in with your Spotify account

2. **Create New App**
   - Click "Create App"
   - Fill in app details:
     - **App name**: Lyricsfrompriii
     - **App description**: A romantic music diary for two
     - **Website**: Your deployed frontend URL
     - **Redirect URI**: Not needed for this app
   - Check the boxes for terms and conditions

3. **Get Credentials**
   - Go to your app dashboard
   - Copy **Client ID** and **Client Secret**
   - Use these in your backend environment variables

## Final Deployment Checklist

### Before Deploying
- [ ] Test the app locally with `npm run dev` (frontend) and `python app.py` (backend)
- [ ] Ensure all environment variables are working
- [ ] Test Spotify search functionality
- [ ] Test adding songs to the database
- [ ] Verify the timeline displays correctly

### After Deploying
- [ ] Update frontend `VITE_API_URL` to point to deployed backend
- [ ] Test the deployed application end-to-end
- [ ] Check browser console for any API errors
- [ ] Verify CORS is working correctly

## Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure your Flask backend has CORS enabled and the frontend URL is allowed
2. **Spotify API Errors**: Check that your Client ID and Secret are correct
3. **Database Connection**: Verify Supabase URL and keys are correct
4. **Build Failures**: Check that all dependencies are properly listed in `requirements.txt`

### Environment Variable Issues
- Never commit `.env` files to Git
- Double-check variable names match exactly
- Ensure no trailing spaces in variable values

## Custom Domain (Optional)

### Vercel Custom Domain
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS instructions

### Render Custom Domain
1. Go to Service Settings → Custom Domains
2. Add your custom domain
3. Configure DNS records as instructed

## Monitoring and Maintenance

### Vercel
- Check deployment logs in Vercel dashboard
- Monitor usage and performance metrics

### Render
- Monitor service logs in Render dashboard
- Check database usage in Supabase
- Set up alerts for downtime or errors

### Supabase
- Monitor database usage and storage
- Set up backups if needed
- Review API usage in dashboard
