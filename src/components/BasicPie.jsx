import { PieChart } from '@mui/x-charts';
import * as React from 'react';
import '../styles/basicPie.css';

export default function BasicPie({ data }) {
  return (
    <div className="pie-container">
      <PieChart
        series={[
          {
            data,
          },
        ]}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'left' },
            padding: { top: 10, left: 10, right: 10, bottom: 0 },
            labelStyle: {
              fontSize: 'clamp(10px, 14px, 16px)',
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            }
          },
        }}
        margin={{ top: 10, bottom: 50, left: 10, right: 10 }}
      />
    </div>
  );
}