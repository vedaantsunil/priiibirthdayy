-- Create song_entries table for Lyricsfrompriii
CREATE TABLE IF NOT EXISTS song_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    song_id TEXT NOT NULL,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    album_image TEXT,
    spotify_url TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    favorite_lyric TEXT,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_song_entries_created_at ON song_entries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_song_entries_song_id ON song_entries(song_id);

-- Optional: Add RLS (Row Level Security) policies if needed
-- ALTER TABLE song_entries ENABLE ROW LEVEL SECURITY;
