'use client';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import { GRID_COMMON_SPACING } from 'config';
import EcommerceDataChart from 'sections/widget/chart/EcommerceDataChart';
import RepeatCustomerRate from 'sections/widget/chart/RepeatCustomerRate';
import TrackingMainChart from 'sections/horus/tracking/TrackingMainChart';
import ModuleTour from 'components/onboarding/ModuleTour';

import WarRoomWelcomeBanner from './WarRoomWelcomeBanner';
import {
  WarRoomAlertasSideCard,
  WarRoomHorusProjectOverview,
  WarRoomSegmentosTransactionsCard,
  WarRoomSessoesTotalIncomeCard
} from './WarRoomDefaultSlots';

// assets — mesmos ícones do dashboard Default Able Pro
import { ArrowUp, Book, Calendar, CloudChange, Wallet3 } from '@wandersonalwes/iconsax-react';

// ==============================|| WAR ROOM — layout = Dashboard Default Able Pro ||============================== //

export default function WarRoomDashboard() {
  const theme = useTheme();

  return (
    <>
      <Grid container spacing={GRID_COMMON_SPACING} alignItems="stretch">
        <Grid size={12}>
          <WarRoomWelcomeBanner />
        </Grid>

        {/* 4 KPIs — EcommerceDataCard (igual Default) */}
        <Grid size={12}>
          <Grid container spacing={GRID_COMMON_SPACING} id="war-room-kpis" data-tour="war-room-kpis">
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <EcommerceDataCard
            title="Intenção de Voto"
            count="47%"
            iconPrimary={<Wallet3 />}
            percentage={
              <Typography color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> +3pp
              </Typography>
            }
          >
            <EcommerceDataChart color={theme.vars.palette.primary.main} />
          </EcommerceDataCard>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <EcommerceDataCard
            title="Rejeição"
            count="24%"
            color="warning"
            iconPrimary={<Book />}
            percentage={
              <Typography sx={{ color: 'warning.dark', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> +1.2pp
              </Typography>
            }
          >
            <EcommerceDataChart color={theme.vars.palette.warning.dark} />
          </EcommerceDataCard>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <EcommerceDataCard
            title="Aprovação Gov"
            count="51%"
            color="success"
            iconPrimary={<Calendar />}
            percentage={
              <Typography sx={{ color: 'success.darker', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> +2pp
              </Typography>
            }
          >
            <EcommerceDataChart color={theme.vars.palette.success.darker} />
          </EcommerceDataCard>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <EcommerceDataCard
            title="Qualis da Semana"
            count="5"
            color="error"
            iconPrimary={<CloudChange />}
            percentage={
              <Typography sx={{ color: 'success.darker', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> +2 novas
              </Typography>
            }
          >
            <EcommerceDataChart color={theme.vars.palette.error.dark} />
          </EcommerceDataCard>
            </Grid>
          </Grid>
        </Grid>

        {/* Gráfico grande + coluna lateral (coluna alertas mais larga: lg 8+4) */}
        <Grid size={{ xs: 12, md: 8, lg: 8 }}>
          <Grid container spacing={GRID_COMMON_SPACING}>
            <Grid size={12}>
              <RepeatCustomerRate
                title="Tracking — Intenção de voto"
                summary={
                  <Stack direction="row" sx={{ gap: 1, alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Rodada 18 · 4 candidatos
                    </Typography>
                    <Chip color="success" variant="filled" label="Atualizado" size="small" sx={{ bgcolor: 'success.main', borderRadius: 1 }} />
                  </Stack>
                }
                chart={
                  <Box id="war-room-tracking" data-tour="war-room-tracking" sx={{ mt: 1 }}>
                    <TrackingMainChart metric="intencao" />
                  </Box>
                }
              />
            </Grid>
            <Grid size={12}>
              <WarRoomHorusProjectOverview />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          size={{ xs: 12, md: 4, lg: 4 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            '& > *': { flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, width: '100%' }
          }}
        >
          <WarRoomAlertasSideCard />
        </Grid>

        {/* Transações / Total Income — dados Hórus */}
        <Grid size={{ xs: 12, md: 6 }}>
          <WarRoomSegmentosTransactionsCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <WarRoomSessoesTotalIncomeCard />
        </Grid>
      </Grid>

      <ModuleTour tourId="general" />
    </>
  );
}
