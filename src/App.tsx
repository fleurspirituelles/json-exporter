import React from 'react';
import './App.css';
import ControllerTable from './components/Tables/ControllerTable';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Lista de Controladoras</h1>
      <ControllerTable />
    </div>
  );
};

export default App;