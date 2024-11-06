import React, { useRef } from 'react';
import './App.css';
import ControllerTable from './components/ControllerTable';
import FileHandler from './components/FileHandler';

const App: React.FC = () => {
  const controllerTableRef = useRef<any>(null);

  const handleExport = () => {
    const data = {
      controllerTable: controllerTableRef.current?.getData() || []
    };

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (data: any) => {
    if (data.controllerTable) {
      controllerTableRef.current?.setData(data.controllerTable);
    }
  };

  return (
    <div className="App">
      <h1>Lista de Controladoras</h1>
      <ControllerTable ref={controllerTableRef} />
      <FileHandler onImport={handleImport} onExport={handleExport} />
    </div>
  );
};

export default App;