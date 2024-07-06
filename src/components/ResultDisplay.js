import React from 'react';
import '../assets/main.css';

const ResultDisplay = ({ originalContent, summaryContent }) => {
  return (
    <div className="result-display">
      {originalContent && (
        <div className="original-content p-4 bg-[#2f2f2f] text-white h-fit rounded-md font-sans">
          <h2 className="mb-4 font-semibold text-xl">Original Content</h2>
          <p>{originalContent}</p>
        </div>
      )}
      {summaryContent && (
        <div className="summary p-4 bg-[#0EAD69] text-white h-fit rounded-md font-sans">
          <h2 className="mb-4 font-semibold text-xl">AI-Generated Summary</h2>
          <p>{summaryContent}</p>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
