import React, { useRef } from 'react';
import './FileHandler.css';

interface FileHandlerProps {
  onImport: (data: any, error: string | null) => void;
  onExport: () => void;
}

const FileHandler: React.FC<FileHandlerProps> = ({ onImport, onExport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        onImport(jsonData, null);
      } catch (error) {
        onImport(null, 'Arquivo JSON inválido.');
      }
    };
    reader.readAsText(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="file-handler">
      <button className="custom-import-button" onClick={triggerFileInput}>
        Importar
      </button>
      <input
        type="file"
        accept="application/json"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      <button className="custom-export-button" onClick={onExport}>
        Exportar
      </button>
    </div>
  );
};

export default FileHandler;