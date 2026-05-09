'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { translations } from '@/lib/translations';

export default function ReportIssue() {
  const [user, setUser] = useState<any>(null);
  const [lang, setLang] = useState('en');
  const [formData, setFormData] = useState({
    issueType: '',
    description: '',
    location: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [myComplaints, setMyComplaints] = useState<any[]>([]);
  
  // Camera State
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraMode, setCameraMode] = useState<'photo' | 'video'>('photo');
  const [isRecording, setIsRecording] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [locating, setLocating] = useState(false);
  const router = useRouter();

  const t = translations[lang] || translations['en'];

  useEffect(() => {
    checkAuth();
    fetchMyComplaints();
    
    // Poll for updates (e.g. social escalation triggers) every 30 seconds
    const interval = setInterval(() => {
      fetchMyComplaints();
    }, 30000);

    return () => {
      stopCamera();
      clearInterval(interval);
    };
  }, []);

  const fetchMyComplaints = async () => {
    try {
      const res = await fetch('/api/complaints/my');
      const data = await res.json();
      if (data.success) {
        setMyComplaints(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.success && data.data.userType === 'farmer') {
        setUser(data.data);
      } else {
        router.push('/login');
      }
    } catch {
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  const autoDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData(prev => ({ ...prev, location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` }));
        setLocating(false);
      },
      (error) => {
        console.error(error);
        alert('Unable to retrieve your location. Please check permissions or enter it manually.');
        setLocating(false);
      }
    );
  };

  const startCamera = async (mode: 'photo' | 'video') => {
    setCameraMode(mode);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: mode === 'video' });
      setStream(mediaStream);
      setIsCameraOpen(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(e => console.error("Video play error:", e));
        }
      }, 100);
    } catch (error: any) {
      console.error('Camera access denied or error:', error);
      if (error.name === 'NotFoundError' || error.message.includes('Requested device not found')) {
        alert('No camera detected on your device! Please make sure a webcam is plugged in or enabled.');
      } else {
        alert('Could not access camera. It might be blocked, in use by another app, or not available on this device.');
      }
    }
  };

  const stopCamera = () => {
    if (isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const videoEl = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = videoEl.videoWidth;
      canvas.height = videoEl.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
            setImage(file);
            stopCamera();
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  const startRecording = () => {
    if (!stream) return;
    
    try {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const file = new File([blob], `video-${Date.now()}.webm`, { type: 'video/webm' });
        setVideo(file);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Stop after 15 seconds max
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          stopRecording();
        }
      }, 15000);
    } catch (e) {
      console.error("MediaRecorder error:", e);
      alert("Video recording is not supported in this browser.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    stopCamera();
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setVideo(file);
      } else {
        setImage(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append('issueType', formData.issueType);
    data.append('description', formData.description);
    data.append('location', formData.location);
    if (image) {
      data.append('image', image);
    }
    if (video) {
      data.append('video', video);
    }

    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({ issueType: '', description: '', location: '' });
        setImage(null);
        setVideo(null);
        fetchMyComplaints();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert('Failed to submit report. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialEscalate = (complaint: any, platform: string) => {
    if (platform === 'twitter' && (!user.twitterUsername || !user.twitterPassword)) {
      alert("You need to link your Twitter account first!");
      router.push('/social-settings');
      return;
    }
    if (platform === 'facebook' && (!user.facebookUsername || !user.facebookPassword)) {
      alert("You need to link your Facebook account first!");
      router.push('/social-settings');
      return;
    }

    const text = encodeURIComponent(`URGENT: My agricultural issue regarding [${complaint.issueType}] has been ignored by the department and Higher Authorities for over 5 minutes! We need immediate intervention. #KrishiSahayak #FarmersUrgent\n\nDetails: ${complaint.description}`);
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://krishisahayak.com')}&quote=${text}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    }
  };

  if (isLoading) return <div className="container" style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>;
  if (!user) return null;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
        <select 
          className="form-select" 
          style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.9rem' }}
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी (Hindi)</option>
          <option value="kn">ಕನ್ನಡ (Kannada)</option>
          <option value="te">తెలుగు (Telugu)</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="mr">मराठी (Marathi)</option>
          <option value="bn">বাংলা (Bengali)</option>
          <option value="gu">ગુજરાતી (Gujarati)</option>
          <option value="ml">മലയാളം (Malayalam)</option>
          <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
          <option value="or">ଓଡ଼ିଆ (Odia)</option>
        </select>
        <button onClick={() => router.push('/social-settings')} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', borderColor: '#1DA1F2', color: '#1DA1F2' }}>
          ⚙️ Link Social Accounts
        </button>
        <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>{t.logout}</button>
      </div>
      <motion.div 
        className="glass-card" 
        style={{ maxWidth: '600px', margin: '0 auto 2rem auto' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>{t.welcome?.replace('{name}', user.name)}</h2>
        <p style={{ marginBottom: '1.5rem', color: '#555' }}>{t.subtitle}</p>
        
        <AnimatePresence>
          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ padding: '1rem', background: 'var(--success-color)', color: 'white', borderRadius: '8px', marginBottom: '1.5rem', overflow: 'hidden' }}
            >
              {t.successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">{t.categoryLabel}</label>
            <select 
              name="issueType" 
              className="form-select" 
              value={formData.issueType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>{t.categoryPlaceholder}</option>
              <option value="Irrigation">{t.catIrrigation}</option>
              <option value="Agriculture">{t.catCrop}</option>
              <option value="Subsidies">{t.catSubsidies}</option>
              <option value="Electricity">{t.catElectricity}</option>
              <option value="Other">{t.catOther}</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">{t.locationLabel}</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                name="location"
                className="form-input" 
                placeholder={t.locationPlaceholder}
                value={formData.location}
                onChange={handleChange}
                required
              />
              <button 
                type="button" 
                className="btn btn-outline" 
                style={{ padding: '0 1rem', whiteSpace: 'nowrap' }}
                onClick={autoDetectLocation}
                disabled={locating}
              >
                {locating ? '...' : t.autoDetectBtn}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">{t.imageLabel}</label>
            
            {isCameraOpen ? (
              <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem', backgroundColor: '#000' }}>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted={cameraMode === 'photo'} 
                  style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                />
                
                {isRecording && (
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'red', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.5)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    <div style={{ width: '10px', height: '10px', background: 'red', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
                    REC (15s max)
                  </div>
                )}

                <div style={{ position: 'absolute', bottom: '1rem', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  {cameraMode === 'photo' ? (
                    <button type="button" onClick={capturePhoto} className="btn btn-primary">{t.captureBtn}</button>
                  ) : (
                    isRecording ? (
                      <button type="button" onClick={stopRecording} className="btn btn-primary" style={{ background: 'red', border: 'none' }}>⏹ {t.stopRecordBtn}</button>
                    ) : (
                      <button type="button" onClick={startRecording} className="btn btn-primary" style={{ background: 'red', border: 'none' }}>⏺ {t.recordBtn}</button>
                    )
                  )}
                  <button type="button" onClick={stopCamera} className="btn btn-outline" style={{ background: 'white' }}>Cancel</button>
                </div>
                <canvas ref={canvasRef} style={{ display: 'none' }} />
              </div>
            ) : (
              <div 
                className={`file-drop-area ${dragActive ? 'active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  {image && <p style={{ color: 'var(--primary-color)', fontWeight: 500, margin: 0 }}>📷 {image.name}</p>}
                  {video && <p style={{ color: 'red', fontWeight: 500, margin: 0 }}>🎥 {video.name}</p>}
                  {!image && !video && <p style={{ color: 'var(--primary-color)', fontWeight: 500, margin: 0 }}>{t.imagePlaceholder}</p>}
                </div>
                <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={() => startCamera('photo')}
                  >
                    📷 {t.cameraBtn}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    style={{ borderColor: 'red', color: 'red' }}
                    onClick={() => startCamera('video')}
                  >
                    🎥 {t.recordBtn}
                  </button>
                  <label className="btn btn-primary" style={{ cursor: 'pointer', margin: 0 }}>
                    📁 Browse
                    <input 
                      type="file" 
                      accept="image/*,video/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          if (file.type.startsWith('video/')) {
                            setVideo(file);
                          } else {
                            setImage(file);
                          }
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">{t.descLabel}</label>
            <textarea 
              name="description" 
              className="form-textarea" 
              placeholder={t.descPlaceholder}
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
            {isSubmitting ? t.submittingBtn : t.submitBtn}
          </button>
        </form>
      </motion.div>

      {/* MY COMPLAINTS SECTION */}
      {myComplaints.length > 0 && (
        <motion.div 
          className="glass-card" 
          style={{ maxWidth: '800px', margin: '0 auto 2rem auto', padding: '2rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>
            My Previous Complaints
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {myComplaints.map((c) => (
              <motion.div 
                key={c.id} 
                whileHover={{ scale: 1.02, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{ 
                padding: '1.5rem', 
                border: c.socialEscalated ? '2px solid var(--danger-color)' : '1px solid #ddd', 
                borderRadius: '12px', 
                background: c.socialEscalated ? 'rgba(211, 47, 47, 0.05)' : 'white',
                cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{c.issueType}</span>
                  <span style={{ 
                    padding: '0.2rem 0.8rem', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem', 
                    fontWeight: 'bold',
                    background: c.status === 'Resolved' ? '#e8f5e9' : '#fff3e0',
                    color: c.status === 'Resolved' ? '#2e7d32' : '#f57c00'
                  }}>
                    {c.status}
                  </span>
                </div>
                <p style={{ color: '#555', marginBottom: '1rem' }}>{c.description}</p>
                <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1rem' }}>
                  Reported on: {new Date(c.createdAt).toLocaleDateString()}
                </div>

                {c.socialEscalated === 1 && c.status !== 'Resolved' && (
                  <div style={{ marginTop: '1rem', padding: '1rem', background: '#ffebee', borderRadius: '8px', border: '1px solid #ffcdd2' }}>
                    <p style={{ color: '#c62828', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      🚨 IGNORED FOR 5+ MINUTES: Escalate to Public / Social Media
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>
                      Your issue has been heavily delayed by authorities. Click below to instantly publish a viral complaint using your linked social media accounts.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <button onClick={() => handleSocialEscalate(c, 'twitter')} className="btn btn-primary" style={{ background: '#1DA1F2', border: 'none' }}>🐦 Twitter</button>
                      <button onClick={() => handleSocialEscalate(c, 'facebook')} className="btn btn-primary" style={{ background: '#4267B2', border: 'none' }}>📘 Facebook</button>
                      <button onClick={() => handleSocialEscalate(c, 'whatsapp')} className="btn btn-primary" style={{ background: '#25D366', border: 'none' }}>💬 WhatsApp</button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  );
}
