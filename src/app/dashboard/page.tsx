'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

type Complaint = {
  id: number;
  farmerId: number;
  farmerName?: string;
  issueType: string;
  description: string;
  imagePath: string | null;
  videoPath: string | null;
  location: string | null;
  status: string;
  createdAt: string;
};

export default function OfficerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    try {
      const authRes = await fetch('/api/auth/me');
      const authData = await authRes.json();
      if (authData.success && authData.data.userType === 'officer') {
        setUser(authData.data);
        await fetchComplaints();
      } else {
        router.push('/login');
      }
    } catch {
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComplaints = async () => {
    try {
      const res = await fetch('/api/complaints');
      const data = await res.json();
      if (data.success) {
        setComplaints(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await fetch('/api/complaints', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  if (isLoading) return <div className="container" style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>;
  if (!user) return null;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--primary-color)' }}>Officer Dashboard - {user.department}</h2>
        <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Logout</button>
      </div>
      
      {complaints.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <p>No complaints reported yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {complaints.map((complaint, index) => (
            <motion.div 
              key={complaint.id}
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{complaint.issueType}</span>
                <span style={{ fontSize: '0.85rem', color: '#666' }}>{new Date(complaint.createdAt).toLocaleDateString()}</span>
              </div>
              
              <h3 style={{ marginBottom: '0.5rem' }}>{complaint.farmerName || 'Unknown Farmer'}</h3>
              {complaint.location && (
                <p style={{ fontSize: '0.85rem', color: 'var(--primary-color)', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  📍 {complaint.location}
                </p>
              )}
              <p style={{ color: '#555', marginBottom: '1rem', flexGrow: 1 }}>{complaint.description}</p>
              
              {complaint.imagePath && (
                <div style={{ marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={complaint.imagePath} alt="Issue" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                </div>
              )}
              {complaint.videoPath && (
                <div style={{ marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee' }}>
                  <video controls src={complaint.videoPath} style={{ width: '100%', maxHeight: '200px', backgroundColor: '#000' }} />
                </div>
              )}
              
              <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>Status</label>
                <select 
                  className="form-select"
                  value={complaint.status}
                  onChange={(e) => handleStatusChange(complaint.id!, e.target.value)}
                  style={{ 
                    borderColor: complaint.status === 'Resolved' ? 'var(--success-color)' : 
                                 complaint.status === 'In Progress' ? 'var(--accent-color)' : 'var(--border-color)'
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
