import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// SAFETY: Robust Polyfill for process.env
// This ensures that accessing process.env.API_KEY never crashes the app, 
// even if the bundler or environment doesn't inject 'process' globally.
const globalScope = typeof window !== 'undefined' ? window : self;

if (typeof (globalScope as any).process === 'undefined') {
  (globalScope as any).process = { env: {} };
} else if (typeof (globalScope as any).process.env === 'undefined') {
  (globalScope as any).process.env = {};
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);