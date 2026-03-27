'use client';

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArrowUp, Chart21 } from '@wandersonalwes/iconsax-react';
import HorusKPICard from './HorusKPICard';
import KPISparkline from './KPISparkline';
import { TRACKING_DATA } from 'data/horus';

const sparkData = TRACKING_DATA.map((r) => r.gabriel);

export default function KPIIntencao() {
  const theme = useTheme();
  return (
    <HorusKPICard
      title="Intenção de Voto"
      count="47%"
      color="primary"
      iconPrimary={<Chart21 />}
      percentage={
        <Typography color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> +3pp
        </Typography>
      }
    >
      <KPISparkline data={sparkData} color={theme.vars.palette.primary.main} />
    </HorusKPICard>
  );
}
