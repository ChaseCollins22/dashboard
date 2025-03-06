import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';


const fixedColumns = [
  {
    field: 'metric',
    headerName: 'Metric',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'value',
    headerName: 'Value',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
];

const PAGES_PER_SESSION_COLS = [
  {
    field: 'metric',
    headerName: 'Metric',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'value',
    headerName: 'No. of pages per session',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
];

const TOP_PAGES_COLS = [
  {
    field: 'metric',
    headerName: 'URL',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'value',
    headerName: 'No. of Sessions',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
];

const SESSIONS_COLS = [
  {
    field: 'metric',
    headerName: 'Session type',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'value',
    headerName: 'No. of Sessions',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
];

const SCROLL_DEPTH_COLS = [
  {
    field: 'metric',
    headerName: 'Session type',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'value',
    headerName: 'No. of Sessions',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
];

const USERS_OVERVIEW_COLS = [
  {
    field: 'metric',
    headerName: 'User type',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'value',
    headerName: 'No. of Users',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
];

const COUNTRIES_COLS = [
  {
    field: 'metric',
    headerName: 'Session type',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'value',
    headerName: 'No. of Sessions',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'value1',
    headerName: '% of sessions',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
];

const ACTIVE_TIME_SPENT_COLS = [
  {
    field: 'metric',
    headerName: 'Time type',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'value',
    headerName: 'Time spent',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
];

const URL_PERFORMANCE_COLS = [
  {
    field: 'metric',
    headerName: 'Metric',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'value1',
    headerName: 'Value',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'value2',
    headerName: 'Value',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'value3',
    headerName: 'Value',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'value4',
    headerName: 'Value',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
];

export default function BasicTable({ clarityData }) {
  clarityData = clarityData.map(dataObj =>
    dataObj.data.map(arr => arr.filter(element => element !== ''))
  );

  const metricNames = clarityData.map(dataArr => dataArr[0][1]);

  const columnData = clarityData.map(dataArr => {
    const sliced = dataArr.slice(1);
    const returnObj = {};
    sliced.forEach((colData) => {
      returnObj[colData[0]] = colData[1];
    });
    return returnObj;
  });

  function renderTables() {
    return clarityData.map((dataArr, idx) => {
      const metricName = metricNames[idx];

      if (metricName === 'Countries' || metricName === 'URL performance') {
        const headerRow = metricName === 'URL performance' ? dataArr[1] : dataArr[0].slice(1)
        const columns = headerRow.map((header, colIdx) => ({
          field: header,
          headerName: header,
          minWidth: header,
          flex: 1,
          editable: false,
        }));
        const rows = dataArr.slice(2).map((row, rowIdx) => {
          const rowObj = { id: rowIdx };
          headerRow.forEach((header, colIdx) => {
            rowObj[header] = row[colIdx];
          });
          return rowObj;
        });
        return (
          <Box sx={{ height: 400, width: '100%' }} key={`table-${idx}`}>
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
              pageSizeOptions={[5, 10, 25]}
            />
          </Box>
        );
      } else {
        const rows = Object.keys(columnData[idx])
          .filter((key) => key !== 'id')
          .map((key, rIdx) => ({
            id: rIdx,
            metric: key,
            value: columnData[idx][key],
          }));
        return (
          <Box sx={{ height: 400, width: '100%' }} key={`table-${idx}`}>
            <h3 style={{ color: '#DA291C', margin: '2em 1em 1em 0' }}>
              {metricNames[idx]}
            </h3>
            <DataGrid
              rows={rows}
              columns={getColumnNames(metricName)}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              pageSizeOptions={[5]}
            />
          </Box>
        );
      }
    });
  }

  function getColumnNames(metricName) {
    if (metricName === 'Top pages') {
      return TOP_PAGES_COLS;
    }
    if (metricName === 'Sessions') {
      return SESSIONS_COLS;
    }
    if (metricName === 'Pages per session') {
      return PAGES_PER_SESSION_COLS;
    }
    if (metricName === 'Scroll depth') {
      return SCROLL_DEPTH_COLS;
    }
    if (metricName === 'Active time spent') {
      return ACTIVE_TIME_SPENT_COLS;
    }
    if (metricName === 'Users overview') {
      return USERS_OVERVIEW_COLS;
    }
    if (metricName === 'Countries') {
      return COUNTRIES_COLS;
    }
    if (metricName === 'URL performance') {
      return URL_PERFORMANCE_COLS;
    }
    return fixedColumns;
  }

  return <>{renderTables()}</>;
}