'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function SocialSettings() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    twitterUsername: '',
    twitterPassword: '',
    facebookUsername: '',
    facebookPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.success && data.data.userType === 'farmer') {
        setUser(data.data);
        setFormData({
          twitterUsername: data.data.twitterUsername || '',
          twitterPassword: data.data.twitterPassword || '',
          facebookUsername: data.data.facebookUsername || '',
          facebookPassword: data.data.facebookPassword || ''
        });
      } else {
        router.push('/login');
      }
    } catch {
      router.push('/login');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/auth/social-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        alert(data.error || 'Failed to save credentials');
      }
    } catch (e) {
      console.error(e);
      alert('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return <div className="container" style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '2rem' }}>
        <button onClick={() => router.push('/report')} className="btn btn-outline">
          ← Back to Dashboard
        </button>
      </div>

      <motion.div 
        className="glass-card" 
        style={{ maxWidth: '600px', margin: '0 auto' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>⚙️ Link Social Accounts</h2>
        <p style={{ color: '#555', marginBottom: '2rem' }}>
          By providing your social media credentials below, you enable our automated system to instantly broadcast your complaint to the public if Higher Authorities ignore it for more than 5 minutes.
        </p>

        {isSuccess && (
          <div style={{ padding: '1rem', background: 'var(--success-color)', color: 'white', borderRadius: '8px', marginBottom: '1.5rem' }}>
            Social media credentials saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ padding: '1.5rem', border: '1px solid #1DA1F2', borderRadius: '8px', marginBottom: '1.5rem', background: 'rgba(29, 161, 242, 0.05)' }}>
            <h3 style={{ color: '#1DA1F2', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🐦 Twitter
            </h3>
            <div className="form-group">
              <label className="form-label">Username / Email</label>
              <input 
                type="text" 
                name="twitterUsername" 
                className="form-input" 
                placeholder="@farmer123"
                value={formData.twitterUsername}
                onChange={handleChange}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Password</label>
              <input 
                type="password" 
                name="twitterPassword" 
                className="form-input" 
                placeholder="********"
                value={formData.twitterPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ padding: '1.5rem', border: '1px solid #4267B2', borderRadius: '8px', marginBottom: '2rem', background: 'rgba(66, 103, 178, 0.05)' }}>
            <h3 style={{ color: '#4267B2', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📘 Facebook
            </h3>
            <div className="form-group">
              <label className="form-label">Email / Phone</label>
              <input 
                type="text" 
                name="facebookUsername" 
                className="form-input" 
                placeholder="farmer@example.com"
                value={formData.facebookUsername}
                onChange={handleChange}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Password</label>
              <input 
                type="password" 
                name="facebookPassword" 
                className="form-input" 
                placeholder="********"
                value={formData.facebookPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Linked Accounts'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
