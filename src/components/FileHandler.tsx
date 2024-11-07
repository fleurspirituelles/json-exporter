import React from 'react';
import { validateAllData } from '../utils/ValidationUtils';

interface FileHandlerProps {
  onImport: (data: any, error: string | null) => void;
  onExport: () => void;
}

const FileHandler: React.FC<FileHandlerProps> = ({ onImport, onExport }) => {
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);

        const errorMessage = validateAllData(jsonData);
        if (errorMessage) {
          onImport(null, errorMessage);
          return;
        }

        onImport(jsonData, null);
      } catch (error) {
        onImport(null, 'Arquivo JSON inválido.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <button onClick={onExport} style={{ marginTop: '10px' }}>Exportar</button>
      <input
        type="file"
        accept="application/json"
        onChange={handleImport}
        style={{ marginTop: '10px' }}
      />
    </div>
  );
};

export default FileHandler;