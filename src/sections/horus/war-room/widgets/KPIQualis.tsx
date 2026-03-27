'use client';

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { People } from '@wandersonalwes/iconsax-react';
import HorusKPICard from './HorusKPICard';
import KPISparkline from './KPISparkline';

const sparkData = [2, 3, 3, 4, 5, 4, 5];

export default function KPIQualis() {
  const theme = useTheme();
  return (
    <HorusKPICard
      title="Qualis da Semana"
      count="5"
      color="warning"
      iconPrimary={<People />}
      percentage={
        <Typography sx={{ color: 'warning.dark', display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.7rem' }}>
          3 transcritas · 1 processando
        </Typography>
      }
    >
      <KPISparkline data={sparkData} color={theme.vars.palette.warning.dark} type="bar" />
    </HorusKPICard>
  );
}
