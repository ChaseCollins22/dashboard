import { BarChart } from '@mui/x-charts';
import * as React from 'react';
import '../styles/barChart.css';

export default function BasicBarChart({ capabilitiesData, label = 'Metrics' }) {
  const labels = Object.keys(capabilitiesData).filter(capabilityName => capabilitiesData[capabilityName] != 0).map(capabilityName => capabilityName.replaceAll(' ', '\n '));
  const data = Object.values(capabilitiesData)

  return (
    <div className='barchart-container'>
      <BarChart
        series={[
          { data: data, label, id: 'pvId', color: '#DA291C' },
        ]}
        xAxis={[{
          data: labels,
          scaleType: 'band',
          tickLabelStyle: {
            fontSize: 12,
            padding: 0,
            angle: 45,
            textAnchor: 'start',
          },
        }]}
        yAxis={[{
          scaleType: 'linear',
        }]}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'top', horizontal: 'right' },
            padding: { top: 0, left: 0, right: 10, bottom: 0 },
            itemMarkWidth: 15,
            itemMarkHeight: 15,
            markGap: 5,
            itemGap: 10,
          },
        }}
        height={300}
        sx={{
          width: '100%',
        }}
        margin={{ top: 50, right: 20, bottom: 90, left: 40 }}
      />
    </div>
  );
}