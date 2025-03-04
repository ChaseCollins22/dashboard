import { PieChart } from '@mui/x-charts';
import * as React from 'react';
import '../styles/basicPie.css';

export default function BasicPie({ data }) {
  //[...data].map(dataObj => console.log(dataObj));

  const hasValidData = Array.isArray(data) && [...data].every(dataObj => {
    return dataObj.value != 0
  })
  const placeholderData = [{ id: 'noData', value: 1, label: 'No tests performed', color: '#cccccc' }];
  const displayData = hasValidData ? data : placeholderData;
  // console.log(data);


  return (
    <div className="pie-container">
      <PieChart
        series={[
          {
            data: displayData,
          },
        ]}
        slotProps={{
          legend: {
            direction: 'column',
            position: { vertical: 'bottom', horizontal: 'left' },
            padding: { top: 10, left: 10, right: 20, bottom: 0 },
            labelStyle: {
              fontSize: 'clamp(12px, 14px, 16px)',
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            }
          },
        }}
        margin={{ top: 10, bottom: 50, left: 10, right: -10 }}
      />
    </div>
  );
}