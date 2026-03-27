'use client';

import { useState, useMemo } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';
import {
  CROSSTAB_PERGUNTAS,
  CROSSTAB_FILTROS,
  CROSSTAB_RODADAS,
  getCrossTabData,
  getCrossTabDeltas,
  getCrossTabInsights
} from 'data/horus';

import CrossTabTable from 'sections/horus/cross-tabs/CrossTabTable';
import CrossTabInsights from 'sections/horus/cross-tabs/CrossTabInsights';

// onboarding
import ModuleTour from 'components/onboarding/ModuleTour';
import TourButton from 'components/onboarding/TourButton';

// assets
import { TableDocument } from '@wandersonalwes/iconsax-react';

export default function CrossTabsView() {
  const [pergunta, setPergunta] = useState('intencao_estimulada');
  const [filtro, setFiltro] = useState('faixa_etaria');
  const [cenario, setCenario] = useState('estimulado');
  const [rodada, setRodada] = useState('r18');
  const [comparar, setComparar] = useState(false);

  const [activePergunta, setActivePergunta] = useState('intencao_estimulada');
  const [activeFiltro, setActiveFiltro] = useState('faixa_etaria');
  const [activeComparar, setActiveComparar] = useState(false);
  const [activeRodada, setActiveRodada] = useState('r18');
  const [activeCenario, setActiveCenario] = useState('estimulado');

  const handleGerar = () => {
    setActivePergunta(pergunta);
    setActiveFiltro(filtro);
    setActiveComparar(comparar);
    setActiveRodada(rodada);
    setActiveCenario(cenario);
  };

  const result = useMemo(() => getCrossTabData(activePergunta, activeFiltro), [activePergunta, activeFiltro]);
  const deltas = useMemo(() => activeComparar ? getCrossTabDeltas(activePergunta, activeFiltro) : null, [activePergunta, activeFiltro, activeComparar]);
  const insights = useMemo(() => getCrossTabInsights(activePergunta, activeFiltro), [activePergunta, activeFiltro]);

  const perguntaLabel = CROSSTAB_PERGUNTAS.find((p) => p.value === activePergunta)?.label || '';
  const filtroLabel = CROSSTAB_FILTROS.find((f) => f.value === activeFiltro)?.label || '';
  const rodadaLabel = CROSSTAB_RODADAS.find((r) => r.value === activeRodada)?.label || '';
  const cenarioLabel = activeCenario === 'estimulado' ? 'Estimulado' : 'Espontâneo';

  return (
    <Grid container spacing={GRID_COMMON_SPACING}>
      {/* Painel de configuração */}
      <Grid size={12}>
        <Box data-tour="crosstabs-seletores">
        <MainCard>
          <Stack sx={{ gap: 3 }}>
            <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
              <TableDocument size={22} />
              <Typography variant="h5">Cruzamento Dinâmico</Typography>
              <TourButton tourId="crossTabs" />
            </Stack>

            {/* Linha 1 */}
            <Stack direction={{ xs: 'column', md: 'row' }} sx={{ gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Pergunta (Linhas)</InputLabel>
                <Select value={pergunta} label="Pergunta (Linhas)" onChange={(e: SelectChangeEvent) => setPergunta(e.target.value)}>
                  {CROSSTAB_PERGUNTAS.map((p) => (
                    <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Filtro (Colunas)</InputLabel>
                <Select value={filtro} label="Filtro (Colunas)" onChange={(e: SelectChangeEvent) => setFiltro(e.target.value)}>
                  {CROSSTAB_FILTROS.map((f) => (
                    <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            {/* Linha 2 */}
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 2, alignItems: { sm: 'center' }, flexWrap: 'wrap' }}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Cenário</InputLabel>
                <Select value={cenario} label="Cenário" onChange={(e: SelectChangeEvent) => setCenario(e.target.value)}>
                  <MenuItem value="estimulado">Estimulado</MenuItem>
                  <MenuItem value="espontaneo">Espontâneo</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Rodada</InputLabel>
                <Select value={rodada} label="Rodada" onChange={(e: SelectChangeEvent) => setRodada(e.target.value)}>
                  {CROSSTAB_RODADAS.map((r) => (
                    <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControlLabel
                data-tour="crosstabs-comparacao"
                control={<Switch checked={comparar} onChange={(e) => setComparar(e.target.checked)} color="primary" />}
                label={<Typography variant="body2">Comparar com rodada anterior</Typography>}
              />

              <Button variant="contained" onClick={handleGerar} sx={{ px: 4 }} data-tour="crosstabs-exportar">
                Gerar Cruzamento
              </Button>
            </Stack>
          </Stack>
        </MainCard>
        </Box>
      </Grid>

      {/* Tabela dinâmica */}
      <Grid size={12}>
        <Box data-tour="crosstabs-tabela">
        <CrossTabTable
          result={result}
          deltas={deltas}
          compararAtivo={activeComparar}
          perguntaLabel={perguntaLabel}
          filtroLabel={filtroLabel}
          rodadaLabel={rodadaLabel}
          cenarioLabel={cenarioLabel}
        />
        </Box>
      </Grid>

      {/* Insights */}
      <Grid size={12}>
        <Box data-tour="crosstabs-insights">
        <CrossTabInsights insights={insights} />
        </Box>
      </Grid>
      <ModuleTour tourId="crossTabs" />
    </Grid>
  );
}
