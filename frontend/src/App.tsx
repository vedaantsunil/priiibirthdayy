import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Timeline from './components/Timeline';
import AddSong from './components/AddSong';
import IntroSection from './components/IntroSection';
import Home from './components/Home';
import type { SongEntry } from './types';
import { api } from './services/api';

function App() {
  const [songs, setSongs] = useState<SongEntry[]>([]);
  const [currentView, setCurrentView] = useState<'home' | 'timeline' | 'add'>('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await api.getSongs();
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSong = async (songData: Omit<SongEntry, 'id' | 'created_at'>) => {
    try {
      const response = await api.addSong(songData);
      setSongs(prev => [response.data, ...prev]);
      setCurrentView('timeline');
    } catch (error) {
      console.error('Error adding song:', error);
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden" style={{ background: '#121212' }}>
      {/* Stars Background */}
      <div className="stars-bg">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="star" />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Navbar currentView={currentView} setCurrentView={setCurrentView} />
        
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Home />
            </motion.div>
          )}
          
          {currentView === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <IntroSection />
              <Timeline 
                songs={songs} 
                loading={loading}
                onRefresh={fetchSongs}
              />
            </motion.div>
          )}
          
          {currentView === 'add' && (
            <motion.div
              key="add"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AddSong onAddSong={handleAddSong} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
