import os
import base64
import requests
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Health check endpoint for Railway
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()}), 200

# Initialize Supabase client
supabase: Client = create_client(
    os.getenv('SUPABASE_URL'),
    os.getenv('SUPABASE_KEY')
)

# Spotify API configuration
SPOTIFY_CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
SPOTIFY_CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')
SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
SPOTIFY_SEARCH_URL = 'https://api.spotify.com/v1/search'

def get_spotify_access_token():
    """Get Spotify API access token"""
    auth_string = f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}"
    auth_bytes = auth_string.encode('utf-8')
    auth_base64 = base64.b64encode(auth_bytes).decode('utf-8')
    
    headers = {
        'Authorization': f'Basic {auth_base64}',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    data = {'grant_type': 'client_credentials'}
    
    try:
        response = requests.post(SPOTIFY_TOKEN_URL, headers=headers, data=data)
        response.raise_for_status()
        return response.json()['access_token']
    except requests.RequestException as e:
        print(f"Error getting Spotify token: {e}")
        return None

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

@app.route('/songs', methods=['GET'])
def get_songs():
    """Get all songs from the database"""
    try:
        response = supabase.table('song_entries').select('*').order('created_at', desc=True).execute()
        
        if response.data:
            return jsonify(response.data)
        else:
            return jsonify([])
    except Exception as e:
        print(f"Error fetching songs: {e}")
        return jsonify({'error': 'Failed to fetch songs'}), 500

@app.route('/songs', methods=['POST'])
def add_song():
    """Add a new song to the database"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['song_id', 'title', 'artist', 'rating']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Validate rating
        if not isinstance(data['rating'], int) or data['rating'] < 1 or data['rating'] > 5:
            return jsonify({'error': 'Rating must be an integer between 1 and 5'}), 400
        
        # Prepare song data
        song_data = {
            'song_id': data['song_id'],
            'title': data['title'],
            'artist': data['artist'],
            'album_image': data.get('album_image'),
            'spotify_url': data.get('spotify_url'),
            'rating': data['rating'],
            'favorite_lyric': data.get('favorite_lyric'),
            'note': data.get('note'),
            'created_at': datetime.now().isoformat()
        }
        
        response = supabase.table('song_entries').insert(song_data).execute()
        
        if response.data:
            return jsonify(response.data[0]), 201
        else:
            return jsonify({'error': 'Failed to add song'}), 500
            
    except Exception as e:
        print(f"Error adding song: {e}")
        return jsonify({'error': 'Failed to add song'}), 500

@app.route('/spotify/search', methods=['GET'])
def search_spotify():
    """Search for songs on Spotify"""
    try:
        query = request.args.get('q')
        if not query:
            return jsonify({'error': 'Search query is required'}), 400
        
        # Get Spotify access token
        access_token = get_spotify_access_token()
        if not access_token:
            return jsonify({'error': 'Failed to authenticate with Spotify'}), 500
        
        # Search Spotify
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }
        
        params = {
            'q': query,
            'type': 'track',
            'limit': 10,
            'market': 'US'
        }
        
        response = requests.get(SPOTIFY_SEARCH_URL, headers=headers, params=params)
        response.raise_for_status()
        
        return jsonify(response.json())
        
    except requests.RequestException as e:
        print(f"Error searching Spotify: {e}")
        return jsonify({'error': 'Failed to search Spotify'}), 500
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    
    print(f"Starting Lyricsfrompriii backend on port {port}")
    print(f"Debug mode: {debug}")
    
    app.run(host='0.0.0.0', port=port, debug=debug)
