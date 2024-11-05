import React from 'react';
import './ExportButton.css';

interface ExportButtonProps {
  onClick: () => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      Export
    </button>
  );
};

export default ExportButton;