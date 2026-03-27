'use client';

import { useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';
import { SEGMENTOS_FILTRO } from 'data/horus';

import TrackingMainChart from 'sections/horus/tracking/TrackingMainChart';
import RejeicaoBarChart from 'sections/horus/tracking/RejeicaoBarChart';
import RejeicaoHeatmap from 'sections/horus/tracking/RejeicaoHeatmap';
import TrackingTable from 'sections/horus/tracking/TrackingTable';

// onboarding
import ModuleTour from 'components/onboarding/ModuleTour';
import TourButton from 'components/onboarding/TourButton';

// assets
import { Filter } from '@wandersonalwes/iconsax-react';

type MetricType = 'intencao' | 'rejeicao' | 'aprovacao';

export default function TrackingView() {
  const [metric, setMetric] = useState<MetricType>('intencao');
  const [cenario, setCenario] = useState('estimulado');
  const [segmento, setSegmento] = useState('Todos');
  const [filtroAplicado, setFiltroAplicado] = useState('Todos');

  const handleMetricChange = (_: React.MouseEvent<HTMLElement>, newMetric: MetricType | null) => {
    if (newMetric !== null) setMetric(newMetric);
  };

  const handleAplicarFiltros = () => {
    setFiltroAplicado(segmento);
  };

  const metricLabels: Record<MetricType, string> = {
    intencao: 'Intenção de Voto',
    rejeicao: 'Rejeição',
    aprovacao: 'Aprovação de Governo'
  };

  return (
    <Grid container spacing={GRID_COMMON_SPACING}>
      {/* Filtros */}
      <Grid size={12}>
        <Box data-tour="tracking-filtros">
        <MainCard content={false} sx={{ p: 2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 2, alignItems: { sm: 'center' }, flexWrap: 'wrap' }}>
            <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
              <Filter size={20} />
              <Typography variant="subtitle1">Filtros</Typography>
            </Stack>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Período</InputLabel>
              <Select defaultValue="mar" label="Período">
                <MenuItem value="mar">01/Mar — 20/Mar</MenuItem>
                <MenuItem value="fev">01/Fev — 28/Fev</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Cenário</InputLabel>
              <Select value={cenario} label="Cenário" onChange={(e: SelectChangeEvent) => setCenario(e.target.value)}>
                <MenuItem value="estimulado">Estimulado</MenuItem>
                <MenuItem value="espontaneo">Espontâneo</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 170 }}>
              <InputLabel>Segmento</InputLabel>
              <Select value={segmento} label="Segmento" onChange={(e: SelectChangeEvent) => setSegmento(e.target.value)}>
                {SEGMENTOS_FILTRO.map((seg) => (
                  <MenuItem key={seg} value={seg}>{seg}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" size="small" sx={{ height: 40 }} onClick={handleAplicarFiltros}>
              Aplicar Filtros
            </Button>

            {filtroAplicado !== 'Todos' && (
              <Chip
                label={`Segmento: ${filtroAplicado}`}
                color="primary"
                variant="light"
                size="small"
                onDelete={() => { setSegmento('Todos'); setFiltroAplicado('Todos'); }}
                sx={{ borderRadius: 1 }}
              />
            )}
          </Stack>
        </MainCard>
        </Box>
      </Grid>

      {/* Toggle de métrica + Gráfico principal */}
      <Grid size={12}>
        <Box data-tour="tracking-chart">
        <MainCard>
          <Stack sx={{ gap: 2 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
              <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                <Typography variant="h5">{metricLabels[metric]} — Evolução Temporal</Typography>
                <TourButton tourId="tracking" />
              </Stack>
              <ToggleButtonGroup value={metric} exclusive onChange={handleMetricChange} size="small" color="primary" data-tour="tracking-tabs">
                <ToggleButton value="intencao">Intenção de Voto</ToggleButton>
                <ToggleButton value="rejeicao">Rejeição</ToggleButton>
                <ToggleButton value="aprovacao">Aprovação</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            <TrackingMainChart metric={metric} />
          </Stack>
        </MainCard>
        </Box>
      </Grid>

      {/* Grid: Barras + Heatmap */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <Box data-tour="tracking-barras">
        <MainCard title="Rejeição por Segmento">
          <RejeicaoBarChart />
        </MainCard>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Box data-tour="tracking-heatmap">
        <RejeicaoHeatmap />
        </Box>
      </Grid>

      {/* Tabela detalhada */}
      <Grid size={12}>
        <Box data-tour="tracking-tabela">
        <TrackingTable />
        </Box>
      </Grid>
      <ModuleTour tourId="tracking" />
    </Grid>
  );
}
