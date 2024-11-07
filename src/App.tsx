import React, { useRef, useState } from 'react';
import './App.css';
import DataSource from './components/Tables/DataSource';
import General from './components/Tables/General';
import Points from './components/Tables/Points';
import FileHandler from './components/FileHandler';

const App: React.FC = () => {
  const dataSourceRef = useRef<any>(null);
  const generalRef = useRef<any>(null);
  const pointsRef = useRef<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const requiredFields = {
    DataSource: ['name', 'plcAddress', 'plcSlot', 'timeout'],
    General: ['auth_user', 'auth_password', 'api_port'],
    Points: ['plcName', 'plcTag', 'pointName', 'description', 'decimals']
  };

  const validateData = (data: any, requiredFields: string[]): boolean => {
    return requiredFields.every(field => data[field] !== '' && data[field] !== null && data[field] !== undefined);
  };

  const handleExport = () => {
    const generalData = generalRef.current?.getData() || [];
    const dataSourceData = dataSourceRef.current?.getData() || [];
    const pointsData = pointsRef.current?.getData() || [];

    const isGeneralValid = generalData.every((item: any) => validateData(item, requiredFields.General));
    const isDataSourceValid = dataSourceData.every((item: any) => validateData(item, requiredFields.DataSource));
    const isPointsValid = pointsData.every((item: any) => validateData(item, requiredFields.Points));

    if (!isGeneralValid || !isDataSourceValid || !isPointsValid) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios antes de exportar.');
      return;
    }

    setErrorMessage(null);

    const data = {
      General: generalData,
      DataSource: dataSourceData,
      Points: pointsData
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

  const handleImport = (data: any, error: string | null) => {
    if (error) {
      setErrorMessage(error);
      return;
    }

    setErrorMessage(null);

    if (data.General) {
      generalRef.current?.setData(data.General);
    }
    if (data.DataSource) {
      dataSourceRef.current?.setData(data.DataSource);
    }
    if (data.Points) {
      pointsRef.current?.setData(data.Points);
    }
  };

  return (
    <div className="App">
      <h1>Configurações Gerais</h1>
      <General ref={generalRef} />
      <h1>Controladoras</h1>
      <DataSource ref={dataSourceRef} />
      <h1>Pontos</h1>
      <Points ref={pointsRef} />
      <FileHandler onImport={handleImport} onExport={handleExport} />
      {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
    </div>
  );
};

export default App;