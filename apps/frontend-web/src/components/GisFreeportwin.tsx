"use client";

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

export default function GisFreeportTwin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Pastikan script sudah load, container siap, dan berjalan di browser (bukan server)
    if (!isLoaded || !containerRef.current || typeof window === 'undefined') return;

    const Cesium = (window as any).Cesium;
    if (!Cesium) return;

    // Set Base URL yang konsisten sebelum inisialisasi peta
    (window as any).CESIUM_BASE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/cesium/1.116.0/Build/Cesium/';
    Cesium.buildModuleUrl.setBaseUrl('https://cdnjs.cloudflare.com/ajax/libs/cesium/1.116.0/Build/Cesium/');

    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYzNhNTU5MzOTC4LTQ5ODktYjFkMS00OGZmUTU0YjI4ZDYiLCJpZCI6Mzk1MTY3LCJpYXQiOjE3NzI3OTEzOTE2MzN9.y4dADByVr_kq-6Q5zn-eAR3FFYy6ybSJMkSXcliDSKw';

    const viewer = new Cesium.Viewer(containerRef.current, {
      animation: false,
      timeline: false,
      infoBox: true,
      selectionIndicator: true,
      sceneModePicker: true,
      navigationHelpButton: false,
      baseLayerPicker: true
    });

    const grasbergTarget = Cesium.Cartesian3.fromDegrees(137.1102, -4.0512, 5000);
    viewer.camera.setView({
      destination: grasbergTarget,
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-35.0),
        roll: 0.0
      }
    });

    return () => {
      if (viewer && !viewer.isDestroyed()) {
        viewer.destroy();
      }
    };
  }, [isLoaded]);

  return (
    <>
      {/* 1. Load CSS secara native di struktur Next.js */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/cesium/1.116.0/Build/Cesium/Widgets/widgets.css" 
        crossOrigin="anonymous" 
      />
      
      {/* 2. Load JS menggunakan komponen Script resmi Next.js */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/cesium/1.116.0/Build/Cesium/Cesium.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        onLoad={() => {
          setIsLoaded(true); // Memicu useEffect di atas hanya setelah Cesium 100% siap
        }}
      />

      <div 
        ref={containerRef} 
        style={{ width: '100%', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }} 
      />
    </>
  );
}