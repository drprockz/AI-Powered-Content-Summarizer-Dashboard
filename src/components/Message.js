// src/components/Message.js

import React from 'react';
import '../assets/main.css';

const Message = ({ message }) => {
  return (
    <div className={`p-2 my-2 rounded ${message.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
      {message.content}
    </div>
  );
};

export default Message;
