import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Explicitly declare process to avoid TypeScript build errors in environments without @types/node
declare var process: any;

// Polyfill for process.env to prevent crashes in browser if bundler doesn't replace it
if (typeof process === 'undefined') {
  (window as any).process = { env: { API_KEY: '' } };
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