// src/components/InputForm.js

import React, { useState } from 'react';
import '../assets/main.css';

const InputForm = ({ onSubmit }) => {
  const [textInput, setTextInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [inputType, setInputType] = useState('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputType === 'text') {
      onSubmit({ textInput });
    } else if (inputType === 'url') {
      onSubmit({ urlInput });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 absolute w-[80%] bottom-3">
      <div className="flex mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="text"
            checked={inputType === 'text'}
            onChange={() => setInputType('text')}
          />
          Scrape from Text
        </label>
        <label>
          <input
            type="radio"
            value="url"
            checked={inputType === 'url'}
            onChange={() => setInputType('url')}
          />
          Scrape from URL
        </label>
      </div>

      {inputType === 'text' ? (
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Paste or type long-form content..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          required
        ></textarea>
      ) : (
        <input
          type="url"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter URL to scrape content..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          required
        />
      )}

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default InputForm;
