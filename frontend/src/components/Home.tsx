import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const photos = Array.from({ length: 23 }, (_, i) => i + 1);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [caption, setCaption] = useState('');
  const [captions, setCaptions] = useState<string[]>([]);

  console.log('Home component rendering, photos:', photos.length);

  // Load captions from text file
  useEffect(() => {
    fetch('/images/captions.txt')
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        setCaptions(lines);
        console.log('Loaded captions:', lines.length);
      })
      .catch(error => {
        console.log('No captions.txt found, using empty captions');
        setCaptions([]);
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    photoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const openPhotoModal = (photoNum: number) => {
    setSelectedPhoto(photoNum);
    setCaption(captions[photoNum - 1] || ''); // Get caption from loaded array
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
    setCaption('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Starry Sky */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Stars Background */}
        <div className="stars-bg">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`,
              }}
            />
          ))}
        </div>

        {/* Moon */}
        <div className="moon-glow" />

        {/* Birthday Message */}
        <motion.div 
          className="birthday-message relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.h1 
            className="birthday-title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Happy Birthday LOSER! 🎉
          </motion.h1>
          
          <motion.p 
            className="birthday-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Someone told me no materialistic gifts ˙◠˙
            <br />
            So here's this stupid thing that I made for you
            <br />
            <span className="text-white mt-4 block">🌙 Let this be your musical time capsule ✨</span>
          </motion.p>

          <motion.div
            className="mt-12"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
           <br /> <span className="text-3xl">👇</span><br />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Photo Gallery Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <motion.div 
          className="section-header mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Da Stupid Diva</h2>
          <p className="section-subtitle">23 cute photos that do make me smile</p>
        </motion.div>

        <div className="photo-grid">
          {photos.map((num, index) => (
            <motion.div
              key={num}
              ref={(el) => {
                photoRefs.current[index] = el;
              }}
              className="photo-item hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
              onClick={() => openPhotoModal(num)}
            >
              <img
                src={`/images/${num}.jpg`}
                alt={`Memory ${num}`}
                className="photo-img"
                onLoad={() => console.log(`Image ${num} loaded successfully`)}
                onError={(e) => {
                  console.log(`Image ${num} failed to load, trying fallback...`);
                  // Fallback to placeholder if image not found
                  (e.target as HTMLImageElement).src = `https://picsum.photos/300/300?random=${num}`;
                }}
              />
              <div className="photo-overlay">
                <span className="photo-number">#{num}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message at the bottom */}
        <motion.div 
          className="text-center mt-16 py-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg text-[#b3b3b3] mb-4">
            Wanted to make an app but you dont have storage lmao,
          </p>
          <p className="text-xl text-white font-medium mb-6">
            HAPPY BIRTHDAYYYYY AGAIN. 💜
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-spotify"
          >
            Back to Top
          </motion.button>
        </motion.div>
      </section>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="photo-modal" onClick={closePhotoModal}>
          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="photo-modal-close" onClick={closePhotoModal}>
              ✕
            </button>
            <img
              src={`/images/${selectedPhoto}.jpg`}
              alt={`Memory ${selectedPhoto}`}
              className="photo-modal-img"
              onError={(e) => {
                // Fallback to placeholder if image not found
                (e.target as HTMLImageElement).src = `https://picsum.photos/800x600?random=${selectedPhoto}`;
              }}
            />
            <div className="photo-modal-caption">
              <p className="text-white text-center p-3 bg-[#282828] rounded-lg min-h-[60px] flex items-center justify-center">
                {caption || 'No caption available'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
