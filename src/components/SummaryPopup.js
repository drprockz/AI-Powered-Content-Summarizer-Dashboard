// src/components/SummaryPopup.js

import React, { useState, useEffect } from 'react';
import mockSummarize from '../utlis/mockAPI';
import '../assets/main.css';

const SummaryPopup = ({ originalContent, onClose, onGenerateSummary }) => {
  const [summaryLength, setSummaryLength] = useState('medium');
  const [summaryContent, setSummaryContent] = useState('');

  useEffect(() => {
    // Update summary content whenever originalContent changes
    if (originalContent) {
      const summary = mockSummarize(originalContent, summaryLength);
      setSummaryContent(summary);
    }
  }, [originalContent, summaryLength]);

  const handleGenerate = () => {
    const summary = mockSummarize(originalContent, summaryLength);
    setSummaryContent(summary); // Update summary content
    console.log(summary);
    onGenerateSummary(summary);
  };

  const handleChangeSummary = (e) => {
    setSummaryContent(e.target.value);
  };

  

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Create Summary</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={summaryContent}
          onChange={handleChangeSummary}
        ></textarea>
        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              value="short"
              checked={summaryLength === 'short'}
              onChange={() => setSummaryLength('short')}
            />
            Short
          </label>
          <label className="mr-4">
            <input
              type="radio"
              value="medium"
              checked={summaryLength === 'medium'}
              onChange={() => setSummaryLength('medium')}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              value="long"
              checked={summaryLength === 'long'}
              onChange={() => setSummaryLength('long')}
            />
            Long
          </label>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          >
            Generate
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPopup;
