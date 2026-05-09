'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterAuthority() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    department: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const data = new FormData();
    data.append('userType', 'authority');
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('password', formData.password);
    data.append('department', formData.department);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();

      if (res.ok && result.success) {
        router.push('/login');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
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
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Register as Higher Authority</h2>
        
        {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number (For SMS & Login)</label>
            <input type="tel" name="phone" className="form-input" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Overseen Department</label>
            <select name="department" className="form-select" value={formData.department} onChange={handleChange} required>
              <option value="" disabled>Select Department</option>
              <option value="Irrigation">Irrigation & Water Supply</option>
              <option value="Agriculture">Agriculture & Crop Health</option>
              <option value="Subsidies">Seeds & Subsidies</option>
              <option value="Electricity">Electricity & Power</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-input" value={formData.password} onChange={handleChange} required />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          <p>Already have an account?</p>
          <Link href="/login" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Login Here</Link>
        </div>
      </motion.div>
    </div>
  );
}
