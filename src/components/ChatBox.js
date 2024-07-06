import React, { useState } from 'react';
import Message from './Message';
import InputBox from './InputBox';
import LoadingIndicator from './LoadingIndicator';
// import ResultDisplay from './ResultDisplay';
import SummaryPopup from './SummaryPopup';

const ChatBox = ({ messages, onSendMessage, loading }) => {
  const [originalContent, setOriginalContent] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [summaryContent, setSummaryContent] = useState('');

  const handleScrapeComplete = (content) => {
    setOriginalContent(content);
    setShowPopup(false); // Show the summary popup after scraping completes
  };

  const handleGenerateSummary = (summary) => {
    setShowPopup(false);
    setSummaryContent(summary);
    setOriginalContent(''); // Clear original content after summary
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex-1 flex flex-col p-4">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        {loading && <LoadingIndicator />}
        {originalContent && !showPopup}
        {showPopup && (
          <SummaryPopup
            originalContent={originalContent}
            onClose={handleClosePopup}
            onGenerateSummary={handleGenerateSummary}
          />
        )}
      </div>
      <InputBox onSendMessage={onSendMessage} onScrapeComplete={handleScrapeComplete} />
    </div>
  );
};

export default ChatBox;
