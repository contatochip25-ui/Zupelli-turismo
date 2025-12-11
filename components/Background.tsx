import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#f8fafc] pointer-events-none">
      {/* Dynamic Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-amber-50/30" />

      {/* Floating Orbs - Futuristic Touch */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-200/20 rounded-full blur-[100px] animate-float opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-orange-100/30 rounded-full blur-[80px] animate-float opacity-60" style={{ animationDelay: '2s' }}></div>

      {/* Abstract Map */}
      <svg className="absolute top-0 right-0 w-[800px] h-[800px] text-blue-100/60 opacity-30 transform translate-x-1/4 -translate-y-1/4" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.2C93.4,8.9,81.8,22,70.5,32.7C59.1,43.4,48,51.6,36.5,58.8C25,66,13,72.2,-0.7,73.4C-14.4,74.6,-27.4,70.9,-39.3,63.9C-51.2,56.9,-62,46.6,-70.6,34.4C-79.1,22.2,-85.4,8,-84.6,-5.8C-83.8,-19.6,-75.9,-33,-65.4,-44.1C-54.8,-55.2,-41.7,-64,-28.4,-71.7C-15.1,-79.4,-1.6,-86,11.9,-86.3C25.4,-86.6,30.5,-63.6,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>

      {/* Minimal Grid - Tech Feel */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: 'linear-gradient(#1e3a8a 0.5px, transparent 0.5px), linear-gradient(90deg, #1e3a8a 0.5px, transparent 0.5px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
    </div>
  );
};