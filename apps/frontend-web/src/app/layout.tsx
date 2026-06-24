import { ReactNode } from 'react';

export const metadata = {
  title: 'PTFI Mine-Ops Platform',
  description: 'Digital Twin System - Real-time 3D Asset Monitoring',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0, backgroundColor: '#020617' }}>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#020617', color: '#ffffff' }}>
        {children}
      </body>
    </html>
  );
}