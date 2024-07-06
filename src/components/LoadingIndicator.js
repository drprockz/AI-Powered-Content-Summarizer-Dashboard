// src/components/LoadingIndicator.js

import React from 'react';
import '../assets/main.css';

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="loader"></div>
      <div className="loading-spacer"></div>
      <h3 className='text-white font-sans text-2xl'>
        Waiting for the AI to generate the summary
      </h3>
    </div>
  );
}

export default LoadingIndicator;
