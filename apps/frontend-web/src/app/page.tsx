'use client';

import dynamic from 'next/dynamic';

// Perbaikan Presisi: Mengimpor file 'GisFreeportwin' (dengan satu huruf 't' sesuai nama file fisik Anda)
const GisFreeportwin = dynamic(
  () => import('@/components/GisFreeportwin'),
  {
    ssr: false, // Mencegah eror peta 3D di sisi server Next.js
    loading: () => (
      <div style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        color: '#ffffff',
        fontFamily: 'sans-serif',
        fontSize: '1.25rem',
        fontWeight: '600',
        letterSpacing: '0.05em'
      }}>
        Memuat Sistem Digital Twin PTFI Mine-Ops...
      </div>
    ),
  }
);

export default function Home() {
  return (
    <main style={{ 
      width: '100vw', 
      height: '100vh', 
      margin: 0, 
      padding: 0, 
      overflow: 'hidden',
      backgroundColor: '#020617' 
    }}>
      <GisFreeportwin />
    </main>
  );
}