import React, { useRef, useState, useEffect } from 'react';
import DataSource from '../components/tables/DataSource';
import General from '../components/tables/General';
import Points from '../components/tables/Points';
import FileHandler from '../components/FileHandler';
import ErrorDisplay from '../components/ErrorDisplay';
import { validateAllData } from '../utils/ValidationUtils';

interface DataPageProps {
  authData: { auth_user: string; auth_password: string };
}

const DataPage: React.FC<DataPageProps> = ({ authData }) => {
  const dataSourceRef = useRef<any>(null);
  const generalRef = useRef<any>(null);
  const pointsRef = useRef<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    generalRef.current?.setData([{ auth_user: authData.auth_user, auth_password: authData.auth_password, api_port: null }]);
  }, [authData]);

  const handleExport = () => {
    const data = {
      General: generalRef.current?.getData() || [],
      DataSource: dataSourceRef.current?.getData() || [],
      Points: pointsRef.current?.getData() || []
    };

    const validationError = validateAllData(data);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setErrorMessage(null);

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
    <div>
      <h1>Configurações Gerais</h1>
      <General ref={generalRef} />
      <h1>Controladoras</h1>
      <DataSource ref={dataSourceRef} />
      <h1>Pontos</h1>
      <Points ref={pointsRef} />
      <FileHandler onImport={handleImport} onExport={handleExport} />
      <ErrorDisplay message={errorMessage} />
    </div>
  );
};

export default DataPage;