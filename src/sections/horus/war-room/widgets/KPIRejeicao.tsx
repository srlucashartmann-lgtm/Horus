'use client';

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArrowUp, Warning2 } from '@wandersonalwes/iconsax-react';
import HorusKPICard from './HorusKPICard';
import KPISparkline from './KPISparkline';
import { REJEICAO_DATA } from 'data/horus';

const sparkData = REJEICAO_DATA.map((r) => r.gabriel);

export default function KPIRejeicao() {
  const theme = useTheme();
  return (
    <HorusKPICard
      title="Rejeição"
      count="24%"
      color="error"
      iconPrimary={<Warning2 />}
      percentage={
        <Typography sx={{ color: 'error.dark', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> +1.2pp
        </Typography>
      }
    >
      <KPISparkline data={sparkData} color={theme.vars.palette.error.dark} />
    </HorusKPICard>
  );
}
