export interface SongEntry {
  id: string;
  song_id: string;
  title: string;
  artist: string;
  album_image?: string;
  spotify_url?: string;
  rating: number;
  favorite_lyric?: string;
  note?: string;
  created_at: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
    name: string;
  };
  external_urls: {
    spotify: string;
  };
  preview_url?: string;
}

export interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
  };
}
