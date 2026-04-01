import axios from 'axios';
import { SongEntry, SpotifySearchResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Songs
  getSongs: () => apiClient.get<SongEntry[]>('/songs'),
  addSong: (songData: Omit<SongEntry, 'id' | 'created_at'>) => 
    apiClient.post<SongEntry>('/songs', songData),
  
  // Spotify
  searchSpotify: (query: string) => 
    apiClient.get<SpotifySearchResponse>(`/spotify/search?q=${encodeURIComponent(query)}`),
};

export default api;
