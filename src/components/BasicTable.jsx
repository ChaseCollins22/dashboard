import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { getColumnNames } from '../utils/tableUtils';

export default function BasicTable({ clarityData }) {
  clarityData = clarityData.map(dataObj =>
    dataObj.data.map(arr => arr.filter(element => element !== ''))
  );

  const metricNames = clarityData.map(dataArr => dataArr[0][1]);

  const columnData = clarityData.map(dataArr => {
    const sliced = dataArr.slice(1);
    const returnObj = {};
    sliced.forEach(colData => {
      returnObj[colData[0]] = colData[1];
    });
    return returnObj;
  });

  function renderTables() {
    return clarityData.map((dataArr, idx) => {
      const metricName = metricNames[idx];
      let columns, rows;

      if (metricName === 'Countries' || metricName === 'URL performance') {
        const headerRow =
          metricName === 'URL performance' ? dataArr[1] : dataArr[0].slice(1);

        columns = headerRow.map((header, colIdx) => ({
          field: header,
          headerName: header,
          minWidth: 150,
          flex: 1,
          editable: false,
        }));

        rows = dataArr.slice(2).map((row, rowIdx) => {
          const rowObj = { id: rowIdx };
          headerRow.forEach((header, colIdx) => {
            rowObj[header] = row[colIdx];
          });
          return rowObj;
        });
      } else {
        rows = Object.keys(columnData[idx])
          .filter(key => key !== 'id')
          .map((key, rIdx) => ({
            id: rIdx,
            metric: key,
            value: columnData[idx][key],
          }));
        columns = getColumnNames(metricName);
      }

      return (
        <Box sx={{ width: '100%', marginBottom: '2em' }} key={`table-${idx}`}>
          <h3 style={{ color: '#DA291C', margin: '2em 1em 1em 0' }}>
            {metricName}
          </h3>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />

        </Box>
      );
    });
  }
  return <>{renderTables()}</>;
}