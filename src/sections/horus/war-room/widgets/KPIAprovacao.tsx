'use client';

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArrowUp, TrendUp } from '@wandersonalwes/iconsax-react';
import HorusKPICard from './HorusKPICard';
import KPISparkline from './KPISparkline';
import { APROVACAO_DATA } from 'data/horus';

const sparkData = APROVACAO_DATA.map((r) => r.gabriel);

export default function KPIAprovacao() {
  const theme = useTheme();
  return (
    <HorusKPICard
      title="Aprovação Gov."
      count="51%"
      color="success"
      iconPrimary={<TrendUp />}
      percentage={
        <Typography sx={{ color: 'success.darker', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> +2pp
        </Typography>
      }
    >
      <KPISparkline data={sparkData} color={theme.vars.palette.success.darker} />
    </HorusKPICard>
  );
}
