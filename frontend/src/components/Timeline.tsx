import React from 'react';
import { motion } from 'framer-motion';
import SongCard from './SongCard';
import type { SongEntry } from '../types';

interface TimelineProps {
  songs: SongEntry[];
  loading: boolean;
  onRefresh: () => void;
}

const Timeline: React.FC<TimelineProps> = ({ songs, loading, onRefresh }) => {
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center h-48 gap-3">
          <div className="spinner" />
          <p className="text-[#b3b3b3] text-sm">Loading your collection...</p>
        </div>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md mx-auto px-4 py-12 text-center"
      >
        <div className="glass-card p-8">
          <div className="text-5xl mb-4">🎵</div>
          <h3 className="text-xl font-bold text-white mb-2">
            No songs yet
          </h3>
          <p className="text-[#b3b3b3] mb-6 text-sm">
            Start building your collection by adding your first song
          </p>
          <button
            onClick={onRefresh}
            className="btn-spotify"
          >
            Refresh
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Your Collection</h2>
        <span className="text-sm text-[#b3b3b3]">{songs.length} songs</span>
      </div>

      {/* Column Headers */}
      <div className="hidden sm:flex items-center px-4 py-2 border-b border-[#282828] text-xs text-[#b3b3b3] uppercase tracking-wider">
        <div className="w-8">#</div>
        <div className="flex-1">Title</div>
        <div className="flex-shrink-0 mr-4 w-24">Rating</div>
        <div className="flex-shrink-0 w-24 text-right">Date Added</div>
      </div>

      {/* Mobile Headers - Hidden on Desktop */}
      <div className="sm:hidden px-4 py-2 border-b border-[#282828]">
        <div className="text-xs text-[#b3b3b3] uppercase tracking-wider">Your Collection</div>
      </div>

      {/* Songs */}
      <div>
        {songs.map((song, index) => (
          <SongCard key={song.id} song={song} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
