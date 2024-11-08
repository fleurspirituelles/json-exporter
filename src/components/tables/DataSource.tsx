import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { ReactTabulator, ColumnDefinition } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';
import './TableButtons.css';

interface DataSourceData {
  name: string;
  plcAddress: string;
  plcSlot: number | null;
  timeout: number | null;
}

const DataSource = forwardRef((props, ref) => {
  const [tableData, setTableData] = useState<DataSourceData[]>([
    { name: '', plcAddress: '', plcSlot: null, timeout: null },
  ]);

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
      setTableData([
        ...tableData,
        { name: '', plcAddress: '', plcSlot: null, timeout: null },
      ]);
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
        options={{ resizableColumnFit: false }}
        events={{
          dataChanged: (newData: DataSourceData[]) => setTableData(newData),
        }}
      />
      <div className="button-container">
        <button className="add-row-button" onClick={addRow}>+</button>
      </div>
    </div>
  );
});

export default DataSource;