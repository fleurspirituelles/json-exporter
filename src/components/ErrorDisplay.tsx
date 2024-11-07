import React from 'react';

interface ErrorDisplayProps {
  message: string | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  if (!message) return null;

  return <div style={{ color: 'red', marginTop: '10px' }}>{message}</div>;
};

export default ErrorDisplay;