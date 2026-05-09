import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import BackgroundSlider from '@/components/BackgroundSlider';
import ClientCron from '@/components/ClientCron';
export const metadata: Metadata = {
  title: 'Krishi Sahayak - Farmer Portal',
  description: 'Report agricultural issues directly to respective officers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
            <Link href="/" className="nav-logo" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
              🌾 Krishi Sahayak
            </Link>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/report" className="nav-link">Report Issue</Link>
            <Link href="/dashboard" className="nav-link">Officer Dashboard</Link>
            <Link href="/guides" className="nav-link" style={{ fontWeight: 'bold' }}>Farming Guides</Link>
            <Link href="/tools" className="nav-link" style={{ fontWeight: 'bold' }}>Farming Tools</Link>
            <Link href="/insecticides" className="nav-link" style={{ fontWeight: 'bold' }}>Crop Protection</Link>
            <Link href="/fertilizers" className="nav-link" style={{ fontWeight: 'bold' }}>Fertilizers</Link>
            <Link href="/soil-testing" className="nav-link" style={{ fontWeight: 'bold' }}>Soil & Irrigation</Link>
            <Link href="/login" className="nav-link" style={{ fontWeight: 'bold' }}>Login / Register</Link>
          </div>
        </nav>
        <ClientCron />
        <BackgroundSlider />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
