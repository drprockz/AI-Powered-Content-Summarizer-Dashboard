// src/App.js

import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatBox from './components/ChatBox';
import ResultDisplay from './components/ResultDisplay';
import SummaryPopup from './components/SummaryPopup';
import mockSummarize from './utlis/mockAPI';
import './styles.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [messages] = useState([]);
  const [history, setHistory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [originalContent, setOriginalContent] = useState('');
  const [summaryContent, setSummaryContent] = useState('');

  const handleSendMessage = (message) => {
    setLoading(true);
    setTimeout(() => {
      setOriginalContent(message.content);
      setShowPopup(true);
      setLoading(false);
    }, 1500); // Simulate loading time
  };

  const handleGenerateSummary = (summary) => {
    setShowPopup(false);
    setSummaryContent(summary);
    // Add new history item when generating summary
    setHistory((prevHistory) => [...prevHistory, originalContent]);
  };

  const handleHistoryItemClick = (item) => {
    setOriginalContent(item);
    const summaryLength = 'medium'; // Adjust as needed
    const summary = mockSummarize(item, summaryLength);
    setSummaryContent(summary);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar history={history} onHistoryItemClick={handleHistoryItemClick} />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <ResultDisplay originalContent={originalContent} summaryContent={summaryContent} />
          <ChatBox messages={messages} onSendMessage={handleSendMessage} loading={loading} />
        </div>
        {showPopup && (
          <SummaryPopup
            originalContent={originalContent}
            onClose={handleClosePopup}
            onGenerateSummary={handleGenerateSummary}
          />
        )}
      </div>
    </div>
  );
};

export default App;
