'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backgrounds = [
  '/backgrounds/bg1.png',
  '/backgrounds/bg2.png',
  '/backgrounds/bg3.png',
];

export default function BackgroundSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgrounds.length);
    }, 8000); // Change image every 8 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: 'hidden' }}>
      <AnimatePresence>
        <motion.img
          key={index}
          src={backgrounds[index]}
          alt="Background"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }}
        />
      </AnimatePresence>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.4)' }} />
    </div>
  );
}
