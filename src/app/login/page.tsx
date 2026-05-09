'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [userType, setUserType] = useState<'farmer' | 'officer' | 'authority'>('farmer');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userType, identifier, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.userType === 'farmer') {
          router.push('/report');
        } else if (data.userType === 'officer') {
          router.push('/dashboard');
        } else if (data.userType === 'authority') {
          router.push('/authority-dashboard');
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Login</h2>
        
        <div style={{ display: 'flex', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <button 
            type="button"
            style={{ flex: 1, padding: '0.75rem', fontWeight: userType === 'farmer' ? 'bold' : 'normal', borderBottom: userType === 'farmer' ? '2px solid var(--primary-color)' : 'none' }}
            onClick={() => setUserType('farmer')}
          >
            Farmer
          </button>
          <button 
            type="button"
            style={{ flex: 1, padding: '0.75rem', fontWeight: userType === 'officer' ? 'bold' : 'normal', borderBottom: userType === 'officer' ? '2px solid var(--primary-color)' : 'none' }}
            onClick={() => setUserType('officer')}
          >
            Officer
          </button>
          <button 
            type="button"
            style={{ flex: 1, padding: '0.75rem', fontWeight: userType === 'authority' ? 'bold' : 'normal', borderBottom: userType === 'authority' ? '2px solid var(--primary-color)' : 'none' }}
            onClick={() => setUserType('authority')}
          >
            Authority
          </button>
        </div>

        {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">{userType === 'farmer' ? 'Phone Number' : userType === 'officer' ? 'Officer ID' : 'Phone Number'}</label>
            <input 
              type="text" 
              className="form-input" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          <p>Don't have an account?</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '0.5rem' }}>
            <Link href="/register/farmer" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Farmer</Link>
            <span style={{ color: 'var(--border-color)' }}>|</span>
            <Link href="/register/officer" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Officer</Link>
            <span style={{ color: 'var(--border-color)' }}>|</span>
            <Link href="/register/authority" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Authority</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
