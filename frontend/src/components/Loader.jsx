import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    'Loading',
    'Loading.',
    'Loading..',
    'Loading...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
      <div className="relative w-24 h-24 mb-3">
        <div className="absolute inset-0 border-8 border-double border-pink-400 rounded-full animate-spin-slow"></div>
      </div>
      <p className="text-gray-900 font-mono text-lg mt-8">{messages[messageIndex]}</p>
    </div>
  );
};

export default Loader;