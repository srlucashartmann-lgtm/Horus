'use client';

import { useState, MouseEvent, ReactNode, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import IconButton from 'components/@extended/IconButton';
import MoreIcon from 'components/@extended/MoreIcon';
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';
import Link from 'next/link';

import ListAlertas from './widgets/ListAlertas';
import TableSegmentos from './widgets/TableSegmentos';
import ListSessoes from './widgets/ListSessoes';
import ListFrases from './widgets/ListFrases';
import AcoesRapidas from './widgets/AcoesRapidas';
import StatusSistema from './widgets/StatusSistema';

import { Add } from '@wandersonalwes/iconsax-react';

// ==============================|| TAB PANEL (igual Transactions) ||============================== //

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`war-seg-tabpanel-${index}`} aria-labelledby={`war-seg-tab-${index}`} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return { id: `war-seg-tab-${index}`, 'aria-controls': `war-seg-tabpanel-${index}` };
}

// ==============================|| ALERTAS — slot ProjectRelease ||============================== //

export function WarRoomAlertasSideCard() {
  return (
    <MainCard
      title="Alertas estratégicos"
      id="war-room-alertas"
      data-tour="war-room-alertas"
      sx={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', minHeight: { md: 320 } }}
      contentSX={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', pt: 2, pb: 2 }}
    >
      <Stack spacing={1.5} sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto', pr: 0.5 }}>
          <ListAlertas limit={5} showFooter={false} />
        </Box>
        <Button
          fullWidth
          variant="contained"
          component={Link}
          href="/inteligencia/alertas"
          startIcon={<Add />}
          sx={{ textTransform: 'none', flexShrink: 0, mt: 'auto' }}
        >
          Ver central de alertas
        </Button>
      </Stack>
    </MainCard>
  );
}

// ==============================|| SEGMENTOS — shell Transactions ||============================== //

export function WarRoomSegmentosTransactionsCard() {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MainCard content={false} id="war-room-segmentos" data-tour="war-room-segmentos">
      <Box sx={{ p: 3, pb: 1 }}>
        <Stack direction="row" sx={{ gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5">Segmentos eleitorais</Typography>
          <IconButton
            color="secondary"
            id="war-seg-more"
            aria-controls={open ? 'war-seg-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={(e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)}
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="war-seg-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            slotProps={{ list: { 'aria-labelledby': 'war-seg-more', sx: { p: 1.25, minWidth: 150 } } }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <ListItemButton onClick={() => setAnchorEl(null)}>Hoje</ListItemButton>
            <ListItemButton onClick={() => setAnchorEl(null)}>Semanal</ListItemButton>
            <ListItemButton onClick={() => setAnchorEl(null)}>Rodada</ListItemButton>
          </Menu>
        </Stack>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="segmentos tabs" sx={{ px: 3 }}>
            <Tab label="Resumo" {...a11yProps(0)} />
            <Tab label="Críticos" {...a11yProps(1)} />
            <Tab label="Oportunidades" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box sx={{ px: 2, pb: 2, pt: 1 }}>
            <TableSegmentos filter="todos" />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box sx={{ px: 2, pb: 2, pt: 1 }}>
            <TableSegmentos filter="criticos" />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box sx={{ px: 2, pb: 2, pt: 1 }}>
            <TableSegmentos filter="oportunidades" />
          </Box>
        </TabPanel>
      </Box>
    </MainCard>
  );
}

// ==============================|| SESSÕES — shell Total Income (sem donut) ||============================== //

export function WarRoomSessoesTotalIncomeCard() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <MainCard id="war-room-sessoes" data-tour="war-room-sessoes">
      <Grid container spacing={GRID_COMMON_SPACING}>
        <Grid size={12}>
          <Stack direction="row" sx={{ gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h5">Sessões qualitativas</Typography>
            <IconButton
              color="secondary"
              id="war-sess-more"
              aria-controls={open ? 'war-sess-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)}
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id="war-sess-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              slotProps={{ list: { 'aria-labelledby': 'war-sess-more', sx: { p: 1.25, minWidth: 150 } } }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <ListItemButton onClick={() => setAnchorEl(null)}>Hoje</ListItemButton>
              <ListItemButton onClick={() => setAnchorEl(null)}>Semanal</ListItemButton>
              <ListItemButton onClick={() => setAnchorEl(null)}>Mensal</ListItemButton>
            </Menu>
          </Stack>
        </Grid>
        <Grid size={12}>
          <Box sx={{ px: { xs: 0, sm: 1 } }}>
            <ListSessoes />
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
}

// ==============================|| 3 CARDS — Vocabulário / Ações / Status ||============================== //

export function WarRoomHorusProjectOverview() {
  return (
    <Grid container spacing={GRID_COMMON_SPACING}>
      <Grid size={{ xs: 12, md: 6 }} id="war-room-frases" data-tour="war-room-frases">
        <MainCard title="Vocabulário do Eleitor">
          <Box sx={{ maxHeight: 280, overflow: 'auto' }}>
            <ListFrases />
          </Box>
        </MainCard>
      </Grid>
      <Grid size={{ xs: 12, md: 3 }} id="war-room-acoes" data-tour="war-room-acoes">
        <MainCard title="Ações rápidas">
          <AcoesRapidas />
        </MainCard>
      </Grid>
      <Grid size={{ xs: 12, md: 3 }} id="war-room-status" data-tour="war-room-status">
        <MainCard title="Status do sistema">
          <Stack spacing={2}>
            <StatusSistema />
            <Button
              fullWidth
              variant="outlined"
              size="small"
              component={Link}
              href="/modo-tv"
              sx={{
                textTransform: 'none',
                borderColor: '#5C6BC0',
                color: '#5C6BC0',
                '&:hover': {
                  borderColor: '#3949AB',
                  color: '#3949AB',
                  bgcolor: 'rgba(57, 73, 171, 0.06)'
                }
              }}
            >
              Modo TV Hórus
            </Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}
