import { PieChart } from '@mui/x-charts';
import * as React from 'react';
import '../styles/basicPie.css';

export default function BasicPie({ data }) {
  //[...data].map(dataObj => console.log(dataObj));

  const hasValidData = Array.isArray(data) && [...data].filter(dataObj => {
    return !(dataObj.label.includes('Total') || dataObj.label.includes('Success'))
  }).some(dataObj => dataObj.value != 0)

  console.log([...data].filter(dataObj => {
    return !(dataObj.label.includes('Total') || dataObj.label.includes('Success'))
  }))

  const placeholderData = [{ id: 'noData', value: 1, label: 'No tests performed', color: '#cccccc' }];
  const displayData = hasValidData ? data : placeholderData;
  // console.log(data);


  return (
    <div className="pie-container">
      <PieChart
        series={[
          {
            data: displayData,
            // data,
            innerRadius: 40,
            outerRadius: 130,
            paddingAngle: 1,
            cornerRadius: 5,
          },
        ]}
        slotProps={{
          legend: {
            direction: 'column',
            position: { vertical: 'bottom', horizontal: 'left' },
            padding: { top: 20, left: 10, right: 20, bottom: 0 },
            labelStyle: {
              fontSize: 'clamp(12px, 14px, 16px)',
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            },
            itemWidth: 150
          },
        }}
        margin={{ top: 10, bottom: 140, left: 10, right: 10 }}
      />
    </div>
  );
}