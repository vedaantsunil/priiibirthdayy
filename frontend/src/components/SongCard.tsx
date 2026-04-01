import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { SongEntry } from '../types';

interface SongCardProps {
  song: SongEntry;
  index: number;
}

const SongCard: React.FC<SongCardProps> = ({ song, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{
          fontSize: '24px',
          color: i < rating ? '#ffd700' : '#535353',
          marginRight: '2px'
        }}
      >
        ★
      </span>
    ));
  };

  const handlePlayClick = () => {
    if (song.spotify_url) {
      window.open(song.spotify_url, '_blank');
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="song-item border-b border-[#282828]/50 hover:bg-[#282828] transition-colors"
    >
      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center gap-2 py-3 px-4">
        {/* Number/Play Button */}
        <div className="w-8 flex-shrink-0">
          <span className="text-[#b3b3b3] text-sm">{index + 1}</span>
        </div>

        {/* Album Art - Desktop */}
        <div className="flex-shrink-0 w-8 h-8 relative group overflow-hidden">       
          <div className="flex-shrink-0 w-[64px] h-[64px] min-w-[64px] max-w-[64px] min-h-[64px] max-h-[64px] relative overflow-hidden">
            <img
              src={song.album_image || 'https://via.placeholder.com/28'}
              alt={`${song.title} album art`}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 bg-black/60 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            disabled={!song.spotify_url}
          >
            <span className="text-white text-xs">▶</span>
          </button>
        </div>

        {/* Song Info - Desktop */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white truncate">
            {song.title}
          </h3>
          <p className="text-xs text-[#b3b3b3] truncate">
            {song.artist}
          </p>
        </div>

        {/* Rating - Desktop */}
        <div className="flex-shrink-0 mr-4">
          {renderStars(song.rating)}
        </div>

        {/* Date - Desktop */}
        <div className="flex-shrink-0 text-xs text-[#b3b3b3] w-24 text-right">
          {new Date(song.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden p-4">
        <div className="flex items-start gap-3">
          {/* Number */}
          <div className="w-6 flex-shrink-0 pt-1">
            <span className="text-[#b3b3b3] text-sm">{index + 1}</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Album Art + Song Info - Mobile */}
            <div className="flex items-center gap-3 mb-3">
              {/* Album Art - Mobile (same size) */}
              <div className="flex-shrink-0 w-8 h-8 relative group overflow-hidden">
                <div className="flex-shrink-0 w-[64px] h-[64px] min-w-[64px] max-w-[64px] min-h-[64px] max-h-[64px] relative overflow-hidden">
                  <img
                    src={song.album_image || 'https://via.placeholder.com/28'}
                    alt={`${song.title} album art`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={handlePlayClick}
                  className="absolute inset-0 bg-black/60 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={!song.spotify_url}
                >
                  <span className="text-white text-xs">▶</span>
                </button>
              </div>

              {/* Song Info - Mobile */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-white truncate">
                  {song.title}
                </h3>
                <p className="text-xs text-[#b3b3b3] truncate">
                  {song.artist}
                </p>
              </div>
            </div>

            {/* Rating + Date - Mobile */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                {renderStars(song.rating)}
              </div>
              <div className="text-xs text-[#b3b3b3]">
                {new Date(song.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expand for lyrics/note - Both Desktop and Mobile */}
      {(song.favorite_lyric || song.note) && (
        <div className="px-4 pb-3 sm:pl-12 sm:pb-4">
          {song.favorite_lyric && (
            <div className="mb-2">
              <span className="text-xs text-[#1db954]">Lyric: </span>
              <span className="text-xs text-[#b3b3b3] italic">"{song.favorite_lyric}"</span>
            </div>
          )}
          {song.note && (
            <div>
              <span className="text-xs text-[#1db954]">Note: </span>
              <span className="text-xs text-[#b3b3b3]">{song.note}</span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SongCard;
