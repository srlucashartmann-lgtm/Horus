'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import { GRID_COMMON_SPACING } from 'config';
import { EXPRESSOES_POR_EMOCAO, DIAGNOSTICO_SENTIMENTO } from 'data/horus';
import MatrizSentimento from 'sections/horus/sentimentos/MatrizSentimento';
import RadarSentimento from 'sections/horus/sentimentos/RadarSentimento';
import BarrasCandidato from 'sections/horus/sentimentos/BarrasCandidato';
import EvolucaoSentimento from 'sections/horus/sentimentos/EvolucaoSentimento';
import { Microphone2, TrendDown, Diagram, Profile } from '@wandersonalwes/iconsax-react';
import { TrendUp, TrendDown as TD2, Warning2 } from '@wandersonalwes/iconsax-react';
import ModuleTour from 'components/onboarding/ModuleTour';
import TourButton from 'components/onboarding/TourButton';

const kpis = [
  { title: 'Sessões Analisadas', value: '5', icon: <Microphone2 size={20} />, color: 'primary' as const },
  { title: 'Sentimento Predominante', value: 'Negativo', icon: <TrendDown size={20} />, color: 'error' as const },
  { title: 'Tema Mais Citado', value: 'Economia (23)', icon: <Diagram size={20} />, color: 'warning' as const },
  { title: 'Candidato Mais Citado', value: 'Gabriel (38)', icon: <Profile size={20} />, color: 'primary' as const }
];

const diagBorder: Record<string, string> = { critico: '#C62828', positivo: '#2E7D32', atencao: '#ED6C02' };
const diagIcon: Record<string, React.ReactNode> = { critico: <TD2 size={20} color="#C62828" />, positivo: <TrendUp size={20} color="#2E7D32" />, atencao: <Warning2 size={20} color="#ED6C02" /> };

export default function SentimentosView() {
  const router = useRouter();

  return (
    <Grid container spacing={GRID_COMMON_SPACING}>
      {/* Header */}
      <Grid size={12}>
        <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
          <Typography variant="h4">Mapa de Sentimentos</Typography>
          <TourButton tourId="sentimentos" />
        </Stack>
        <Typography variant="body2" color="text.secondary">Visão macro do sentimento em todas as sessões qualitativas</Typography>
      </Grid>

      {/* KPIs */}
      {kpis.map((k) => (
        <Grid key={k.title} size={{ xs: 6, md: 3 }}>
          <MainCard>
            <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center' }}>
              <Avatar color={k.color} variant="rounded" size="sm">{k.icon}</Avatar>
              <Stack>
                <Typography variant="caption" color="text.secondary">{k.title}</Typography>
                <Typography variant="h5">{k.value}</Typography>
              </Stack>
            </Stack>
          </MainCard>
        </Grid>
      ))}

      {/* Matriz */}
      <Grid size={12}>
        <Box data-tour="sentimentos-matriz">
        <MatrizSentimento />
        </Box>
      </Grid>

      {/* Radar + Barras */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <Box data-tour="sentimentos-radar">
        <MainCard title="Sentimento por Tema (Radar)">
          <RadarSentimento />
        </MainCard>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Box data-tour="sentimentos-barras">
        <MainCard title="Sentimento por Candidato">
          <BarrasCandidato />
        </MainCard>
        </Box>
      </Grid>

      {/* Evolução + Expressões */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <MainCard title="Evolução do Sentimento ao Longo do Tempo">
          <EvolucaoSentimento />
        </MainCard>
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <MainCard title="Top Expressões por Emoção">
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography variant="subtitle2" sx={{ color: '#C62828' }}>😡 Medo / Raiva</Typography>
              <Stack component="ol" sx={{ pl: 2, m: 0, mt: 0.5, gap: 0.25 }}>
                {EXPRESSOES_POR_EMOCAO.medo.map((e) => (
                  <Typography component="li" variant="body2" key={e.frase} sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }} onClick={() => router.push('/qualitativo/clipes')}>
                    &ldquo;{e.frase}&rdquo; — {e.mencoes} menções
                  </Typography>
                ))}
              </Stack>
            </Grid>
            <Grid size={12}>
              <Typography variant="subtitle2" sx={{ color: '#2E7D32' }}>😊 Esperança / Aprovação</Typography>
              <Stack component="ol" sx={{ pl: 2, m: 0, mt: 0.5, gap: 0.25 }}>
                {EXPRESSOES_POR_EMOCAO.esperanca.map((e) => (
                  <Typography component="li" variant="body2" key={e.frase} sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }} onClick={() => router.push('/qualitativo/clipes')}>
                    &ldquo;{e.frase}&rdquo; — {e.mencoes} menções
                  </Typography>
                ))}
              </Stack>
            </Grid>
            <Grid size={12}>
              <Typography variant="subtitle2" sx={{ color: '#78909C' }}>😐 Dúvida / Indecisão</Typography>
              <Stack component="ol" sx={{ pl: 2, m: 0, mt: 0.5, gap: 0.25 }}>
                {EXPRESSOES_POR_EMOCAO.duvida.map((e) => (
                  <Typography component="li" variant="body2" key={e.frase} sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }} onClick={() => router.push('/qualitativo/clipes')}>
                    &ldquo;{e.frase}&rdquo; — {e.mencoes} menções
                  </Typography>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      {/* Diagnóstico */}
      <Grid size={12}>
        <Box data-tour="sentimentos-diagnostico">
        <MainCard title="Diagnóstico de Sentimento">
          <Grid container spacing={2}>
            {DIAGNOSTICO_SENTIMENTO.map((d, i) => (
              <Grid key={i} size={{ xs: 12, md: 6 }}>
                <Stack direction="row" sx={{ gap: 1.5, alignItems: 'flex-start', p: 2, border: '1px solid', borderColor: 'divider', borderLeft: `4px solid ${diagBorder[d.tipo]}`, borderRadius: 1 }}>
                  <Stack sx={{ pt: 0.25 }}>{diagIcon[d.tipo]}</Stack>
                  <Typography variant="body2">{d.texto}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </MainCard>
        </Box>
      </Grid>
      <ModuleTour tourId="sentimentos" />
    </Grid>
  );
}
