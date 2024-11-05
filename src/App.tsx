import React from 'react';
import './App.css';
import ExportButton from './components/ExportButton';

const App: React.FC = () => {
  const handleClick = () => {
    console.log('Exporting to JSON.');
  };

  return (
    <div className="App">
      <ExportButton onClick={handleClick} />
    </div>
  );
}

export default App;