import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SongEntry, SpotifyTrack } from '../types';
import { api } from '../services/api';

interface AddSongProps {
  onAddSong: (song: Omit<SongEntry, 'id' | 'created_at'>) => Promise<void>;
}

const AddSong: React.FC<AddSongProps> = ({ onAddSong }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SpotifyTrack[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrack | null>(null);
  const [rating, setRating] = useState(5);
  const [favoriteLyric, setFavoriteLyric] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    setError(null);

    try {
      const response = await api.searchSpotify(searchQuery);
      setSearchResults(response.data?.tracks?.items || []);
    } catch {
      setError('Search failed');
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrack) return;

    // Validation: Require either favorite lyric or note
    if (!favoriteLyric.trim() && !note.trim()) {
      setError('Please add either a favorite lyric or a personal note for this song.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onAddSong({
        song_id: selectedTrack.id,
        title: selectedTrack.name,
        artist: selectedTrack.artists.map((a) => a.name).join(', '),
        album_image: selectedTrack.album.images[0]?.url || '',
        spotify_url: selectedTrack.external_urls.spotify,
        rating,
        favorite_lyric: favoriteLyric || undefined,
        note: note || undefined,
      });

      setAdded(true);

      setTimeout(() => {
        setAdded(false);
        setSelectedTrack(null);
        setSearchQuery('');
        setFavoriteLyric('');
        setNote('');
        setRating(5);
      }, 1500);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">
          Add song
        </h2>
        <p className="text-xs text-[#b3b3b3]">
          Add to your collection
        </p>
      </div>

      {/* Search */}
      <div className="mb-3">
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search songs"
            className="search-input pr-20 text-sm"
          />

          <button
            onClick={handleSearch}
            disabled={searching}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#1db954] text-black px-3 py-1 rounded-full text-xs font-medium"
          >
            {searching ? '...' : 'Search'}
          </button>
        </div>
      </div>

      {/* Search Results */}
      <AnimatePresence>
        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#181818] rounded-md overflow-hidden"
          >
            {searchResults.slice(0, 6).map((track) => (
              <div
                key={track.id}
                onClick={() => {
                  setSelectedTrack(track);
                  setSearchResults([]);
                }}
                className="flex items-center gap-1.5 px-1.5 py-1 hover:bg-[#282828] cursor-pointer"
              >
                <img
                  src={track.album.images[0]?.url}
                className="w-[200px] h-[200px] rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white truncate">
                    {track.name}
                  </p>
                  <p className="text-[10px] text-[#b3b3b3] truncate">
                    {track.artists.map(a => a.name).join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Song */}
      <AnimatePresence>
        {selectedTrack && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 bg-[#181818] rounded-md p-2"
          >

            {/* Song Row */}
            <div className="flex items-center gap-1.5 mb-2">
              <img
                src={selectedTrack.album.images[0]?.url}
                className="w-[200px] h-[200px] rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">
                  {selectedTrack.name}
                </p>
                <p className="text-[10px] text-[#b3b3b3] truncate">
                  {selectedTrack.artists.map(a => a.name).join(', ')}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-0.5 mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className={`cursor-pointer text-sm ${
                    i < rating ? 'text-yellow-400' : 'text-[#535353]'
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="ml-1 text-[10px] text-[#b3b3b3]">
                {rating}/5
              </span>
            </div>

            {/* Inputs */}
            <textarea
              value={favoriteLyric}
              onChange={(e) => setFavoriteLyric(e.target.value)}
              placeholder="Favorite lyric"
              className="input-field text-xs mb-1.5 py-1 px-2"
              rows={1}
            />

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note"
              className="input-field text-xs mb-2 py-1 px-2"
              rows={1}
            />

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-spotify w-full py-1 text-[10px]"
            >
              {loading ? 'Adding...' : 'Add'}
            </button>

            {/* Success */}
            <AnimatePresence>
              {added && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-[#1db954] text-xs mt-2"
                >
                  Added ✓
                </motion.p>
              )}
            </AnimatePresence>

          </motion.form>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-red-400 text-xs mt-3 text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default AddSong;