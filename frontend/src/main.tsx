import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => (
<div style={{ background: '#0b0b0d', color: '#e6e6e6', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
  <div style={{ background: 'linear-gradient(45deg, #1e1e1e, #2d2d2d)', padding: '3rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', textAlign: 'center' }}>
    <h1 style={{ fontFamily: 'sans-serif', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>Problem Extractor SaaS</h1>
    <p style={{ fontFamily: 'sans-serif', color: '#888', fontSize: '1.2rem', margin: 0 }}>Built autonomously by Antigravity AI on Azure.</p>
  </div>
</div>
);

createRoot(document.getElementById('root')!).render(<App />);
