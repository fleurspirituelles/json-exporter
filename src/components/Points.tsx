import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { ReactTabulator, ColumnDefinition } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';

interface PointsData {
  plcName: string;
  plcTag: string;
  pointName: string;
  description: string;
  decimals: number;
  unit: string;
  rawLow: number;
  rawHigh: number;
  EULow: number;
  EUHigh: number;
}

const Points = forwardRef((props, ref) => {
  const [tableData, setTableData] = useState<PointsData[]>([]);

  useImperativeHandle(ref, () => ({
    getData: () => tableData,
    setData: (data: PointsData[]) => {
      setTableData(data);
    },
  }));

  const columns: ColumnDefinition[] = [
    { title: 'PLC Name', field: 'plcName', editor: 'input' },
    { title: 'PLC Tag', field: 'plcTag', editor: 'input' },
    { title: 'Point Name', field: 'pointName', editor: 'input' },
    { title: 'Description', field: 'description', editor: 'input' },
    { title: 'Decimals', field: 'decimals', editor: 'number' },
    { title: 'Unit', field: 'unit', editor: 'input' },
    { title: 'Raw Low', field: 'rawLow', editor: 'number' },
    { title: 'Raw High', field: 'rawHigh', editor: 'number' },
    { title: 'EU Low', field: 'EULow', editor: 'number' },
    { title: 'EU High', field: 'EUHigh', editor: 'number' },
  ];

  return (
    <ReactTabulator
      data={tableData}
      columns={columns}
      layout="fitColumns"
      options={{ resizableColumnFit: true }}
      events={{
        dataChanged: (newData: PointsData[]) => setTableData(newData),
      }}
    />
  );
});

export default Points;