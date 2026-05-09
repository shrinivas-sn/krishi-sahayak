'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterOfficer() {
  const [formData, setFormData] = useState({
    name: '',
    officerId: '',
    password: '',
    department: '',
  });
  const [document, setDocument] = useState<File | null>(null);
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

    if (!document) {
      setError('Government ID document is mandatory for officers.');
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    data.append('userType', 'officer');
    data.append('name', formData.name);
    data.append('officerId', formData.officerId);
    data.append('password', formData.password);
    data.append('department', formData.department);
    data.append('document', document);

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
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Register as Officer</h2>
        
        {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Officer ID</label>
            <input type="text" name="officerId" className="form-input" value={formData.officerId} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <select name="department" className="form-select" value={formData.department} onChange={handleChange} required>
              <option value="" disabled>Select Department</option>
              <option value="Irrigation">Irrigation & Water Supply</option>
              <option value="Agriculture">Agriculture & Crop Health</option>
              <option value="Electricity">Electricity Board</option>
              <option value="General Admin">General Administration</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-input" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Government ID Document (Required)</label>
            <input type="file" accept=".pdf,image/*" className="form-input" onChange={(e) => setDocument(e.target.files?.[0] || null)} required />
            <small style={{ color: '#666', display: 'block', marginTop: '0.25rem' }}>Upload Official ID for verification.</small>
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
