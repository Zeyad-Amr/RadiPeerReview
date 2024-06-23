import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import ChartCard from './ChartCard';
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';

interface chartCardProp {
  Accepted: number
  Rejected: number
  Pending: number
}

export default function Pie({ Accepted, Rejected, Pending }: chartCardProp) {

  return (
    <ChartCard sx={{
      padding: '0 0 0 5.5rem',
      overflow: 'hidden'
    }}
      icon={<PieChartRoundedIcon sx={{ color: 'secondary.main' }} />}
      title='Reports Chart'
    >
      <PieChart
        title='Reports'
        series={[

          {
            data: [
              { id: 0, value: Accepted, label: 'Accepted Reports', color: '#343f7a' },
              { id: 1, value: Rejected, label: 'Rejected Reports', color: '#84d9fd' },
              { id: 2, value: Pending, label: 'Pending Reports', color: '#eff4fb' },
            ],
          },
        ]}
        slotProps={{ legend: { hidden: true } }}

        width={300}
        height={300}
        sx={{ fontWeight: '300' }}
      />
    </ChartCard>
  );
}