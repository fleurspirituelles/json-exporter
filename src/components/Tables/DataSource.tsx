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

const DataSource = forwardRef((props, ref) => {
  const [tableData, setTableData] = useState<DataSourceData[]>([]);

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

  return (
    <ReactTabulator
      data={tableData}
      columns={columns}
      layout="fitColumns"
      options={{ resizableColumnFit: true }}
      events={{
        dataChanged: (newData: DataSourceData[]) => setTableData(newData),
      }}
    />
  );
});

export default DataSource;