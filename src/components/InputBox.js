import React, { useState } from 'react';
import axios from 'axios';
import LoadingIndicator from './LoadingIndicator'; // Assuming you have a LoadingIndicator component

const InputBox = ({ onSendMessage, onScrapeComplete }) => {
  const [inputType, setInputType] = useState('text');
  const [inputValue, setInputValue] = useState('');
  const [scrapeSection, setScrapeSection] = useState('body'); // State for selecting section
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleSend = async () => {
    if (inputType === 'text') {
      if (!inputValue.trim()) {
        alert('Please enter some text to send.');
        return;
      }
      if (isValidURL(inputValue)) {
        alert('Please use the "Scrape from URL" feature for URLs.');
        return;
      }
      onSendMessage({ type: 'user', content: inputValue });
      setInputValue('');
    } else if (inputType === 'url') {
      if (!isValidURL(inputValue)) {
        alert('Please enter a valid URL.');
        return;
      }
      setLoading(true); // Set loading state
      await handleScrape();
    }
  };

  const handleScrape = async () => {
    try {
      const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(inputValue)}`);
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data.contents, 'text/html');

      // Extract content based on selected section
      let content = '';
      if (scrapeSection === 'body') {
        content = doc.body.innerText;
      } else {
        const section = doc.querySelector(scrapeSection);
        if (section) {
          content = section.innerText;
        } else {
          alert('Selected section not found in the document.');
          return;
        }
      }

      onScrapeComplete(content);
      onSendMessage({ type: 'user', content });
      setInputValue('');
    } catch (error) {
      console.error('Error scraping the URL:', error);
      alert('Error scraping the URL. Please try again later.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to validate if input is a valid URL
  const isValidURL = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
  };

  return (
    <div className="mt-4 absolute w-[80%] bottom-3">
      <div className="flex items-center mb-4">
        <button
          className={`mr-4 px-4 py-2 rounded ${inputType === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setInputType('text')}
        >
          Text
        </button>
        <button
          className={`px-4 py-2 rounded ${inputType === 'url' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setInputType('url')}
        >
          URL
        </button>
      </div>

      {inputType === 'text' ? (
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Paste or type long-form content..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></textarea>
      ) : (
        <>
          <input
            type="url"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter URL to scrape content..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <select
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={scrapeSection}
            onChange={(e) => setScrapeSection(e.target.value)}
          >
            <option value="body">Entire Page</option>
            <option value="main">Main</option>
            <option value="article">Article</option>
            <option value="section">Section</option>
            {/* Add more options as needed */}
          </select>
        </>
      )}

      <button
        onClick={handleSend}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {inputType === 'url' ? 'Scrape' : 'Send'}
      </button>

      {loading && <LoadingIndicator />}
    </div>
  );
};

export default InputBox;
