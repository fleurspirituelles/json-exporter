import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { ReactTabulator, ColumnDefinition } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';

interface DataSourceData {
  name: string;
  plcAddress: string;
  plcSlot: number;
  timeout: number;
}

const initialDataSourceData: DataSourceData[] = Array(5).fill({
  name: '',
  plcAddress: '',
  plcSlot: 0,
  timeout: 0,
});

const DataSource = forwardRef((props, ref) => {
  const [tableData, setTableData] = useState<DataSourceData[]>(initialDataSourceData);

  useImperativeHandle(ref, () => ({
    getData: () => tableData,
    setData: (data: DataSourceData[]) => {
      setTableData(data);
    },
  }));

  const columns: ColumnDefinition[] = [
    { title: 'Name', field: 'name', editor: 'input' },
    { title: 'PLC Address', field: 'plcAddress', editor: 'input' },
    { title: 'PLC Port', field: 'plcSlot', editor: 'number' },
    { title: 'Timeout', field: 'timeout', editor: 'number' },
  ];

  const addRow = () => {
    if (tableData.length < 20) {
      setTableData([...tableData, { name: '', plcAddress: '', plcSlot: 0, timeout: 0 }]);
    } else {
      alert('O limite máximo de 20 linhas foi atingido.');
    }
  };

  return (
    <div>
      <ReactTabulator
        data={tableData}
        columns={columns}
        layout="fitColumns"
        options={{ resizableColumnFit: true }}
        events={{
          dataChanged: (newData: DataSourceData[]) => setTableData(newData),
        }}
      />
      <button onClick={addRow} style={{ marginTop: '10px' }}>Adicionar Linha</button>
    </div>
  );
});

export default DataSource;