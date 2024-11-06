import React, { useState } from 'react';
import { ReactTabulator, ColumnDefinition } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';

interface FormData {
  name: string;
  address: string;
  slot: number;
  timeout: number;
}

const DataTable: React.FC = () => {
  const [tableData, setTableData] = useState<FormData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const columns: ColumnDefinition[] = [
    { title: 'Name', field: 'name', editor: 'input' },
    { title: 'Address', field: 'address', editor: 'input' },
    { title: 'Slot', field: 'slot', editor: 'number' },
    { title: 'Timeout', field: 'timeout', editor: 'number' },
  ];

  const handleExport = () => {
    const jsonString = JSON.stringify(tableData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        setTableData(jsonData);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage('Arquivo JSON inválido!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <ReactTabulator
        data={tableData}
        columns={columns}
        layout="fitColumns"
        events={{
          dataChanged: (newData: FormData[]) => setTableData(newData),
        }}
      />
      <button onClick={handleExport} style={{ marginTop: '10px' }}>
        Exportar
      </button>
      <input
        type="file"
        accept="application/json"
        onChange={handleImport}
        style={{ marginTop: '10px' }}
      />
      
      {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
    </div>
  );
};

export default DataTable;