import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { ReactTabulator, ColumnDefinition } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';

interface FormData {
  name: string;
  address: string;
  slot: number;
  timeout: number;
}

const ControllerTable = forwardRef((props, ref) => {
  const [tableData, setTableData] = useState<FormData[]>([]);

  useImperativeHandle(ref, () => ({
    getData: () => tableData,
    setData: (data: FormData[]) => {
      setTableData(data);
    },
  }));

  const columns: ColumnDefinition[] = [
    { title: 'Name', field: 'name', editor: 'input' },
    { title: 'Address', field: 'address', editor: 'input' },
    { title: 'Slot', field: 'slot', editor: 'number' },
    { title: 'Timeout', field: 'timeout', editor: 'number' },
  ];

  return (
    <ReactTabulator
      data={tableData}
      columns={columns}
      layout="fitColumns"
      events={{
        dataChanged: (newData: FormData[]) => setTableData(newData),
      }}
    />
  );
});

export default ControllerTable;