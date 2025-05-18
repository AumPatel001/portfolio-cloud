import React from 'react';

const FloatingPhoto = () => (
  <div
    className="w-32 h-32 md:w-32 md:h-32 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mr-6 animate-float"
    style={{ minWidth: '96px', minHeight: '96px' }}
  >
    <img
      src="/Patel-Aum-DigitalPhoto.jpg"
      alt="Aum Patel"
      className="w-full h-full object-cover"
      draggable={false}
    />
  </div>
);

export default FloatingPhoto; 