"use client";

import { useEffect, useRef, useState } from 'react';

export default function GisFreeportTwin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!document.getElementById('cesium-cdn-css')) {
      const link = document.createElement('link');
      link.id = 'cesium-cdn-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/cesium@1.116.0/Build/Cesium/Widgets/widgets.css';
      document.head.appendChild(link);
    }
    if (!document.getElementById('cesium-cdn-js')) {
      const script = document.createElement('script');
      script.id = 'cesium-cdn-js';
      script.src = 'https://unpkg.com/cesium@1.116.0/Build/Cesium/Cesium.js';
      script.async = true;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    } else {
      if ((window as any).Cesium) {
        setIsLoaded(true);
      }
    }
  }, []);

useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const Cesium = (window as any).Cesium;
    if (!Cesium) return;
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYzNhNTU5MzOTC4LTQ5ODktYjFkMS00OGZmUTU0YjI4ZDYiLCJpZCI6Mzk1MTY3LCJpYXQiOjE3NzI3OTEzOTE2MzN9.y4dADByVr_kq-6Q5zn-eAR3FFYy6ybSJMkSXcliDSKw';
    Cesium.buildModuleUrl.setBaseUrl('https://unpkg.com/cesium@1.116.0/Build/Cesium');
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
    <div ref={containerRef} style={{ width: '100%', height: '100%', margin: 0, padding: 0 }} />
  );
}