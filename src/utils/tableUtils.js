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

export {
  ACTIVE_TIME_SPENT_COLS, fixedColumns, getColumnNames,
  PAGES_PER_SESSION_COLS, SCROLL_DEPTH_COLS, SESSIONS_COLS, TOP_PAGES_COLS, USERS_OVERVIEW_COLS
};
