# Lyricsfrompriii Backend

Flask REST API for the Lyricsfrompriii romantic music diary application.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file from `.env.example` and fill in your API keys:
```bash
cp .env.example .env
```

3. Set up Supabase:
   - Create a new Supabase project
   - Run the SQL schema from `../database/schema.sql`
   - Get your project URL and anon key from Supabase settings

4. Get Spotify API credentials:
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Get your Client ID and Client Secret

## Running the Server

```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### GET /health
Health check endpoint.

### GET /songs
Get all saved songs ordered by creation date (newest first).

**Response:**
```json
[
  {
    "id": "uuid",
    "song_id": "spotify_track_id",
    "title": "Song Title",
    "artist": "Artist Name",
    "album_image": "https://...",
    "spotify_url": "https://...",
    "rating": 5,
    "favorite_lyric": "Favorite lyric text",
    "note": "Personal note",
    "created_at": "2024-01-01T00:00:00"
  }
]
```

### POST /songs
Add a new song entry.

**Request Body:**
```json
{
  "song_id": "spotify_track_id",
  "title": "Song Title",
  "artist": "Artist Name",
  "album_image": "https://...",
  "spotify_url": "https://...",
  "rating": 5,
  "favorite_lyric": "Favorite lyric text",
  "note": "Personal note"
}
```

### GET /spotify/search?q=<query>
Search for songs on Spotify.

**Query Parameters:**
- `q`: Search query string

**Response:**
```json
{
  "tracks": {
    "items": [
      {
        "id": "spotify_track_id",
        "name": "Song Title",
        "artists": [{"name": "Artist Name"}],
        "album": {
          "images": [{"url": "https://..."}],
          "name": "Album Name"
        },
        "external_urls": {
          "spotify": "https://..."
        }
      }
    ]
  }
}
```

## Environment Variables

- `SPOTIFY_CLIENT_ID`: Spotify app client ID
- `SPOTIFY_CLIENT_SECRET`: Spotify app client secret
- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_KEY`: Supabase anon key
- `FLASK_DEBUG`: Enable/disable debug mode
- `PORT`: Server port (default: 5000)
