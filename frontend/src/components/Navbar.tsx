import React from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  currentView: 'home' | 'timeline' | 'add';
  setCurrentView: (view: 'home' | 'timeline' | 'add') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#070707] border-b border-[#282828]">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - Click to go Home */}
          <motion.h1 
            className="text-xl font-bold cursor-pointer flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            onClick={() => setCurrentView('home')}
          >
            <span className="text-white">Lyricsfrompriii</span>
          </motion.h1>
          
          {/* Navigation */}
          <div className="flex gap-1">
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView('timeline')}
              className={`nav-link ${currentView === 'timeline' ? 'active' : ''}`}
            >
              <span>📀</span>
              <span>Collection</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView('add')}
              className={`nav-link ${currentView === 'add' ? 'active' : ''}`}
            >
              <span>➕</span>
              <span>Add Song</span>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
