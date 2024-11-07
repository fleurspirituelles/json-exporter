import React from 'react';

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

        const hasRequiredSections = jsonData.General && jsonData.DataSource && jsonData.Points;
        if (!hasRequiredSections) {
          onImport(null, 'Campos obrigatórios não encontrados.');
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
      <button onClick={onExport} style={{ marginTop: '10px' }}>
        Exportar
      </button>
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