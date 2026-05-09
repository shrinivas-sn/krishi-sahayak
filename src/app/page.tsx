'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, textAlign: 'center', marginTop: '10vh' }}>
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '800px', padding: '3rem' }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '1rem' }}
          >
            Empowering Farmers, Resolving Issues
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ fontSize: '1.25rem', color: '#333', marginBottom: '3rem' }}
          >
            A direct channel for farmers to report agricultural, irrigation, and local issues to the respective administrative officers.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}
          >
            <Link href="/report" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Report an Issue
            </Link>
            <Link href="/dashboard" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', backgroundColor: 'rgba(255,255,255,0.8)' }}>
              Officer Login
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
