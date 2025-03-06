import { ResponsiveChartContainer } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';
import * as React from 'react';

export default function BasicPie({ data }) {
  return (
    <ResponsiveChartContainer
      height={400}

      series={[
        { type: 'pie', data }
      ]}
    >
      <PieChart
        series={[
          {
            data: data
          },
        ]}
      />
    </ResponsiveChartContainer>
  );
}