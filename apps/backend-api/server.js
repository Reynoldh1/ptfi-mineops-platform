const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Mengaktifkan lintas data (CORS) agar Frontend Port 3000 bisa mengambil data dari Port 5000
app.use(cors());
app.use(express.json());

// Mock Data Telemetri Tambang Bawah Tanah PTFI (Grasberg Block Cave & DMLZ)
const mockTelemetryData = {
  status: "ONLINE",
  location: "Grasberg Open Pit & Underground Mine",
  coordinates: {
    latitude: -4.0512,
    longitude: 137.1102,
    altitude: 5000
  },
  infrastructure: [
    { id: "TNL-GBC-01", name: "Terowongan Utama GBC", depth: "1200m", status: "AMAN" },
    { id: "TNL-DMLZ-05", name: "Jalur Hauling West", depth: "1450m", status: "OPERASIONAL" },
    { id: "VNT-SHAFT-04", name: "Ventilasi Udara Shaft 4", depth: "900m", status: "NORMAL" }
  ],
  telemetry: {
    seismicActivity: "0.2 SR (Rendah)",
    gasLevel: "Aman (Oxygen 20.9%)",
    waterFlow: "320 Liter/Menit"
  },
  lastUpdated: new Date().toISOString()
};

// Endpoint Utama API Telemetri
app.get('/api/telemetry', (req, res) => {
  res.json(mockTelemetryData);
});

// Endpoint Cek Koneksi Dasar
app.get('/', (req, res) => {
  res.send('Mine-Ops Backend API Berjalan Mulus!');
});

app.listen(PORT, () => {
  console.log("=========================================");
  console.log(`Mine-Ops Backend API Berjalan Mulus di Port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log("=========================================");
});