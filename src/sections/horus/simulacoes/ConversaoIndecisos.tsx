'use client';

import { useState, useMemo, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { CENARIO_ATUAL, CONVERSAO_PADRAO, CANDIDATOS } from 'data/horus';
import DonutChart from './DonutChart';

export default function ConversaoIndecisos() {
  const [pcts, setPcts] = useState({ ...CONVERSAO_PADRAO });

  const handleSlider = useCallback((key: string, newVal: number) => {
    setPcts((prev) => {
      const old = (prev as any)[key] as number;
      const diff = newVal - old;
      const keys = Object.keys(prev).filter((k) => k !== key);
      const othersTotal = keys.reduce((s, k) => s + (prev as any)[k], 0);
      if (othersTotal === 0) return prev;
      const next = { ...prev, [key]: newVal };
      keys.forEach((k) => {
        (next as any)[k] = Math.max(0, Math.round((prev as any)[k] - (diff * (prev as any)[k]) / othersTotal));
      });
      const sum = Object.values(next).reduce((s, v) => s + v, 0);
      if (sum !== 100) {
        const last = keys[keys.length - 1];
        (next as any)[last] += 100 - sum;
      }
      return next;
    });
  }, []);

  const bn = CENARIO_ATUAL.brancos;
  const eleitoresBN = Math.round(CENARIO_ATUAL.totalEleitores * bn / 100);

  const resultado = useMemo(() => ({
    gabriel: +(CENARIO_ATUAL.gabriel + bn * pcts.gabriel / 100).toFixed(1),
    juliana: +(CENARIO_ATUAL.juliana + bn * pcts.juliana / 100).toFixed(1),
    zucco: +(CENARIO_ATUAL.zucco + bn * pcts.zucco / 100).toFixed(1),
    edegar: +(CENARIO_ATUAL.edegar + bn * pcts.edegar / 100).toFixed(1),
    brancos: +(bn * pcts.permanecem / 100).toFixed(1)
  }), [pcts, bn]);

  const conclusaoColor = resultado.gabriel >= 50 ? '#2E7D32' : resultado.gabriel >= 48 ? '#ED6C02' : '#C62828';

  const sliders = [
    { key: 'gabriel', label: 'Gabriel Souza', color: CANDIDATOS.gabriel.cor },
    { key: 'juliana', label: 'Juliana Brizola', color: CANDIDATOS.juliana.cor },
    { key: 'zucco', label: 'Zucco', color: CANDIDATOS.zucco.cor },
    { key: 'edegar', label: 'Edegar Pretto', color: CANDIDATOS.edegar.cor },
    { key: 'permanecem', label: 'Permanecem indecisos', color: CANDIDATOS.brancos.cor }
  ];

  return (
    <Stack sx={{ gap: 2.5 }}>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <MainCard title="Distribuição dos indecisos">
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
              {bn}% de Brancos/Nulos = ≈{(eleitoresBN / 1000).toFixed(0)} mil eleitores
            </Typography>
            <Stack sx={{ gap: 2.5 }}>
              {sliders.map((s) => (
                <Stack key={s.key} sx={{ gap: 0.5 }}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">{s.label}</Typography>
                    <Typography variant="subtitle2">{(pcts as any)[s.key]}% ({(bn * (pcts as any)[s.key] / 100).toFixed(1)}pp)</Typography>
                  </Stack>
                  <Slider
                    value={(pcts as any)[s.key]}
                    onChange={(_, v) => handleSlider(s.key, v as number)}
                    min={0} max={100} step={5}
                    sx={{ color: s.color }}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(v) => `${v}%`}
                  />
                </Stack>
              ))}
            </Stack>
          </MainCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MainCard title="Cenário com conversão de indecisos">
            <DonutChart
              labels={['Gabriel Souza', 'Juliana Brizola', 'Zucco', 'Edegar Pretto', 'Brancos/Nulos']}
              series={[resultado.gabriel, resultado.juliana, resultado.zucco, resultado.edegar, resultado.brancos]}
              colors={[CANDIDATOS.gabriel.cor, CANDIDATOS.juliana.cor, CANDIDATOS.zucco.cor, CANDIDATOS.edegar.cor, CANDIDATOS.brancos.cor]}
              centerLabel={`${resultado.gabriel}%`}
            />
          </MainCard>
        </Grid>
      </Grid>

      <MainCard content={false} sx={{ borderLeft: `4px solid ${conclusaoColor}`, p: 2.5 }}>
        <Stack sx={{ gap: 2 }}>
          <Typography variant="h5" sx={{ color: conclusaoColor }}>
            {resultado.gabriel >= 50
              ? `Gabriel alcança ${resultado.gabriel}% — vitória no 1º turno!`
              : `Gabriel ficaria com ${resultado.gabriel}% — ${(50 - resultado.gabriel).toFixed(1)}pp do 1º turno`}
          </Typography>
          <Stack sx={{ gap: 0.5 }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">Progresso para 50%</Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>{resultado.gabriel}% / 50%</Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={Math.min(100, (resultado.gabriel / 50) * 100)}
              sx={{ height: 10, borderRadius: 5, bgcolor: 'action.hover', '& .MuiLinearProgress-bar': { bgcolor: conclusaoColor, borderRadius: 5 } }}
            />
          </Stack>
        </Stack>
      </MainCard>
    </Stack>
  );
}
