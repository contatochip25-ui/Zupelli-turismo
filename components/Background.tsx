import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#f8fafc]">
      {/* Soft Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50" />

      {/* Abstract World Map / Organic Shapes */}
      <svg className="absolute top-0 right-0 w-[800px] h-[800px] text-blue-100 opacity-40 transform translate-x-1/4 -translate-y-1/4" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.2C93.4,8.9,81.8,22,70.5,32.7C59.1,43.4,48,51.6,36.5,58.8C25,66,13,72.2,-0.7,73.4C-14.4,74.6,-27.4,70.9,-39.3,63.9C-51.2,56.9,-62,46.6,-70.6,34.4C-79.1,22.2,-85.4,8,-84.6,-5.8C-83.8,-19.6,-75.9,-33,-65.4,-44.1C-54.8,-55.2,-41.7,-64,-28.4,-71.7C-15.1,-79.4,-1.6,-86,11.9,-86.3C25.4,-86.6,30.5,-63.6,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>

      <svg className="absolute bottom-0 left-0 w-[600px] h-[600px] text-orange-100 opacity-40 transform -translate-x-1/4 translate-y-1/4" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M41.3,-69.9C52.4,-61.7,59.8,-47.9,65.8,-34.2C71.8,-20.5,76.3,-6.9,74.6,6C72.9,18.9,64.9,31.1,55.5,41.2C46.1,51.3,35.3,59.4,23.4,64.3C11.5,69.2,-1.5,71,-14.2,68.7C-26.9,66.4,-39.3,60,-50.3,51.1C-61.3,42.2,-70.9,30.8,-75.6,17.7C-80.3,4.6,-80.1,-10.2,-74.6,-23.6C-69.1,-37,-58.3,-49,-45.8,-56.6C-33.3,-64.2,-19.1,-67.4,-5.2,-66.4C8.7,-65.4,17.4,-60.1,41.3,-69.9Z" transform="translate(100 100)" />
      </svg>

      {/* Decorative Lines */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
    </div>
  );
};