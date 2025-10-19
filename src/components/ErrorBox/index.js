import React from 'react';
import './index.css';

export default function ErrorBox({ message }) {
  return (
    <div className="error">
      <p>{message || 'Error occurred'}</p>
    </div>
  );
}
