import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { ReactTabulator, ColumnDefinition } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';

interface GeneralData {
  auth_user: string;
  auth_password: string;
  api_port: number | null;
}

const General = forwardRef((props, ref) => {
  const [tableData, setTableData] = useState<GeneralData[]>([
    { auth_user: '', auth_password: '', api_port: null },
  ]);

  useImperativeHandle(ref, () => ({
    getData: () => tableData,
    setData: (data: GeneralData[]) => {
      setTableData(data);
    },
  }));

  const columns: ColumnDefinition[] = [
    { title: 'User', field: 'auth_user', editor: 'input' },
    { title: 'Password', field: 'auth_password', editor: 'input' },
    { title: 'API Port', field: 'api_port', editor: 'number' },
  ];

  return (
    <ReactTabulator
      data={tableData}
      columns={columns}
      layout="fitColumns"
      options={{ resizableColumnFit: false }}
      events={{
        dataChanged: (newData: GeneralData[]) => setTableData(newData),
      }}
    />
  );
});

export default General;