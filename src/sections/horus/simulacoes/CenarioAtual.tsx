'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import { CENARIO_ATUAL, CANDIDATOS } from 'data/horus';
import DonutChart from './DonutChart';
import { TrendUp, Diagram, People, Warning2 } from '@wandersonalwes/iconsax-react';

const cards = [
  {
    title: 'Distância para 2º lugar',
    value: `${CENARIO_ATUAL.gabriel - CENARIO_ATUAL.juliana}pp`,
    icon: <TrendUp variant="Bold" size={22} />,
    color: 'success' as const,
    borderColor: '#2E7D32'
  },
  {
    title: 'Para vencer no 1º turno (>50%)',
    value: `Faltam ${50 - CENARIO_ATUAL.gabriel}pp`,
    icon: <Diagram variant="Bold" size={22} />,
    color: 'warning' as const,
    borderColor: '#ED6C02'
  },
  {
    title: 'Brancos/Nulos disponíveis',
    value: `${CENARIO_ATUAL.brancos}% (≈${Math.round(CENARIO_ATUAL.totalEleitores * CENARIO_ATUAL.brancos / 100000)}mil)`,
    icon: <People variant="Bold" size={22} />,
    color: 'primary' as const,
    borderColor: '#3F51B5'
  },
  {
    title: 'Rejeição de Gabriel',
    value: `24% — teto teórico: 76%`,
    icon: <Warning2 variant="Bold" size={22} />,
    color: 'error' as const,
    borderColor: '#C62828'
  }
];

export default function CenarioAtual() {
  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box data-tour="simulacoes-donuts">
        <MainCard title="Cenário Estimulado — Rodada 18">
          <DonutChart
            labels={[CANDIDATOS.gabriel.nome, CANDIDATOS.juliana.nome, CANDIDATOS.zucco.nome, CANDIDATOS.edegar.nome, CANDIDATOS.brancos.nome]}
            series={[CENARIO_ATUAL.gabriel, CENARIO_ATUAL.juliana, CENARIO_ATUAL.zucco, CENARIO_ATUAL.edegar, CENARIO_ATUAL.brancos]}
            colors={[CANDIDATOS.gabriel.cor, CANDIDATOS.juliana.cor, CANDIDATOS.zucco.cor, CANDIDATOS.edegar.cor, CANDIDATOS.brancos.cor]}
            centerLabel={`${CENARIO_ATUAL.gabriel}%`}
          />
        </MainCard>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box data-tour="simulacoes-resultado">
        <Stack sx={{ gap: 2, height: '100%', justifyContent: 'center' }}>
          {cards.map((card) => (
            <MainCard key={card.title} content={false} sx={{ borderLeft: `4px solid ${card.borderColor}` }}>
              <Stack direction="row" sx={{ gap: 2, alignItems: 'center', p: 2 }}>
                <Avatar color={card.color} variant="rounded" size="md">
                  {card.icon}
                </Avatar>
                <Stack>
                  <Typography variant="caption" color="text.secondary">{card.title}</Typography>
                  <Typography variant="h5">{card.value}</Typography>
                </Stack>
              </Stack>
            </MainCard>
          ))}
        </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}
