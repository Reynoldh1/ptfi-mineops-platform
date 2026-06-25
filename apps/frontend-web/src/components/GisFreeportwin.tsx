"use client";

import { useEffect, useRef } from 'react';

export default function GisFreeportTwin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    const initCesiumMap = () => {
      const Cesium = (window as any).Cesium;
      
      if (!Cesium || viewerRef.current || !containerRef.current) return;

      // 1. KEMBALIKAN KE CDNJS: Hindari unpkg.com agar tidak kena blokir CORS di Vercel
      (window as any).CESIUM_BASE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/cesium/1.116.0/Build/Cesium/';
      Cesium.buildModuleUrl.setBaseUrl('https://cdnjs.cloudflare.com/ajax/libs/cesium/1.116.0/Build/Cesium/');

      // 2. MASUKKAN TOKEN DARI SCREENSHOT ANDA:
      // Hapus teks di bawah dan ganti dengan Token dari screenshot Cesium Ion Anda!
      Cesium.Ion.defaultAccessToken = 'PASTE_TOKEN_ANDA_DI_SINI';

      // Render Peta
      const viewer = new Cesium.Viewer(containerRef.current, {
        animation: false,
        timeline: false,
        infoBox: true,
        selectionIndicator: true,
        sceneModePicker: true,
        navigationHelpButton: false,
        baseLayerPicker: true,
        terrain: Cesium.Terrain.fromWorldTerrain() // 3D Grasberg Terrain
      });

      viewerRef.current = viewer;

      // Arahkan ke Grasberg
      const grasbergTarget = Cesium.Cartesian3.fromDegrees(137.1102, -4.0512, 5000);
      viewer.camera.setView({
        destination: grasbergTarget,
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-35.0),
          roll: 0.0
        }
      });
    };

    const checkCesiumInterval = setInterval(() => {
      if (typeof window !== 'undefined' && (window as any).Cesium) {
        clearInterval(checkCesiumInterval);
        initCesiumMap();
      }
    }, 100);

    return () => {
      clearInterval(checkCesiumInterval);
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Load CSS dari cdnjs */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/cesium/1.116.0/Build/Cesium/Widgets/widgets.css" 
        crossOrigin="anonymous"
      />
      
      {/* Load JS dari cdnjs dengan crossOrigin */}
      <script 
        src="https://cdnjs.cloudflare.com/ajax/libs/cesium/1.116.0/Build/Cesium/Cesium.js" 
        async={false} 
        defer 
        crossOrigin="anonymous"
      />

      <div 
        ref={containerRef} 
        style={{ width: '100%', height: '100vh', margin: 0, padding: 0, backgroundColor: '#000' }} 
      />
    </>
  );
}