'use client';

import { useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';

import CenarioAtual from 'sections/horus/simulacoes/CenarioAtual';
import DesistenciaCandidato from 'sections/horus/simulacoes/DesistenciaCandidato';
import SegundoTurno from 'sections/horus/simulacoes/SegundoTurno';
import ConversaoIndecisos from 'sections/horus/simulacoes/ConversaoIndecisos';

// onboarding
import ModuleTour from 'components/onboarding/ModuleTour';
import TourButton from 'components/onboarding/TourButton';

// assets
import { Simcard } from '@wandersonalwes/iconsax-react';

type SimMode = 'atual' | 'desistencia' | 'segundo_turno' | 'indecisos';

export default function SimulacoesView() {
  const [mode, setMode] = useState<SimMode>('atual');

  const handleModeChange = (_: React.MouseEvent<HTMLElement>, newMode: SimMode | null) => {
    if (newMode !== null) setMode(newMode);
  };

  return (
    <Grid container spacing={GRID_COMMON_SPACING}>
      <Grid size={12}>
        <MainCard>
          <Stack sx={{ gap: 2 }}>
            <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
              <Simcard size={22} />
              <Typography variant="h5">Simulações de Cenário</Typography>
              <TourButton tourId="simulacoes" />
            </Stack>
            <ToggleButtonGroup value={mode} exclusive onChange={handleModeChange} size="small" color="primary" sx={{ flexWrap: 'wrap' }} data-tour="simulacoes-tabs">
              <ToggleButton value="atual">Cenário Atual</ToggleButton>
              <ToggleButton value="desistencia">Desistência de Candidato</ToggleButton>
              <ToggleButton value="segundo_turno">Segundo Turno</ToggleButton>
              <ToggleButton value="indecisos">Conversão de Indecisos</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </MainCard>
      </Grid>

      <Grid size={12} data-tour="simulacoes-sliders">
        {mode === 'atual' && <CenarioAtual />}
        {mode === 'desistencia' && <DesistenciaCandidato />}
        {mode === 'segundo_turno' && <SegundoTurno />}
        {mode === 'indecisos' && <ConversaoIndecisos />}
      </Grid>
      <ModuleTour tourId="simulacoes" />
    </Grid>
  );
}
