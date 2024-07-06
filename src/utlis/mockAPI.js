// src/utils/mockAPI.js

const mockSummarize = (text, summaryLength) => {
  if (!text) return '';

  // Split text into words
  const words = text.trim().split(/\s+/);

  // Simple logic to simulate different summary lengths in words
  let summary;
  switch (summaryLength) {
    case 'short':
      summary = words.slice(0, 10).join(' '); // First 10 words for short summary
      break;
    case 'medium':
      summary = words.slice(0, 20).join(' '); // First 20 words for medium summary
      break;
    case 'long':
      summary = words.slice(0, 30).join(' '); // First 30 words for long summary
      break;
    default:
      summary = words.slice(0, 20).join(' '); // Default to medium length
  }

  return summary;
};

export default mockSummarize;
