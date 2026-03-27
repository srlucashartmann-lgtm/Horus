'use client';

import { useState, useMemo, useCallback } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';
import { CENARIO_ATUAL, REDISTRIBUICAO_PADRAO, CANDIDATOS } from 'data/horus';
import DonutChart from './DonutChart';

type DesistKey = 'edegar' | 'zucco' | 'juliana';

const DESIST_OPTIONS = [
  { value: 'edegar' as const, label: 'Edegar Pretto' },
  { value: 'zucco' as const, label: 'Zucco' },
  { value: 'juliana' as const, label: 'Juliana Brizola' }
];

function getDestinos(quemDesiste: DesistKey) {
  const pad = REDISTRIBUICAO_PADRAO[quemDesiste];
  return Object.entries(pad).map(([key, val]) => {
    const labels: Record<string, string> = { gabriel: 'Gabriel Souza', juliana: 'Juliana Brizola', zucco: 'Zucco', edegar: 'Edegar Pretto', brancos: 'Brancos/Nulos' };
    return { key, label: labels[key] || key, defaultPct: val };
  });
}

export default function DesistenciaCandidato() {
  const [quemDesiste, setQuemDesiste] = useState<DesistKey>('edegar');
  const destinos = useMemo(() => getDestinos(quemDesiste), [quemDesiste]);
  const [pcts, setPcts] = useState<Record<string, number>>(() => {
    const d = getDestinos('edegar');
    return Object.fromEntries(d.map((x) => [x.key, x.defaultPct]));
  });

  const handleDesistChange = (e: SelectChangeEvent) => {
    const v = e.target.value as DesistKey;
    setQuemDesiste(v);
    const d = getDestinos(v);
    setPcts(Object.fromEntries(d.map((x) => [x.key, x.defaultPct])));
  };

  const handleSlider = useCallback((key: string, newVal: number) => {
    setPcts((prev) => {
      const old = prev[key];
      const diff = newVal - old;
      const others = Object.keys(prev).filter((k) => k !== key);
      const othersTotal = others.reduce((s, k) => s + prev[k], 0);
      if (othersTotal === 0) return prev;
      const next = { ...prev, [key]: newVal };
      others.forEach((k) => {
        next[k] = Math.max(0, Math.round(prev[k] - (diff * prev[k]) / othersTotal));
      });
      const sum = Object.values(next).reduce((s, v) => s + v, 0);
      if (sum !== 100) {
        const lastOther = others[others.length - 1];
        next[lastOther] += 100 - sum;
      }
      return next;
    });
  }, []);

  const handleIgual = () => {
    const keys = destinos.map((d) => d.key);
    const each = Math.floor(100 / keys.length);
    const obj: Record<string, number> = {};
    keys.forEach((k, i) => { obj[k] = i === keys.length - 1 ? 100 - each * (keys.length - 1) : each; });
    setPcts(obj);
  };

  const votosDesistente = CENARIO_ATUAL[quemDesiste as keyof typeof CENARIO_ATUAL] as number;

  const depois = useMemo(() => {
    const r: Record<string, number> = {
      gabriel: CENARIO_ATUAL.gabriel,
      juliana: CENARIO_ATUAL.juliana,
      zucco: CENARIO_ATUAL.zucco,
      edegar: CENARIO_ATUAL.edegar,
      brancos: CENARIO_ATUAL.brancos
    };
    r[quemDesiste] = 0;
    destinos.forEach((d) => { r[d.key] = +(r[d.key] + votosDesistente * (pcts[d.key] || 0) / 100).toFixed(1); });
    return r;
  }, [pcts, quemDesiste, votosDesistente, destinos]);

  const gabrielDepois = depois.gabriel;
  const conclusaoColor = gabrielDepois > 50 ? '#2E7D32' : gabrielDepois >= 45 ? '#ED6C02' : '#C62828';
  const conclusaoTexto = gabrielDepois > 50
    ? `Gabriel Souza venceria no 1º turno com ${gabrielDepois}%`
    : `Gabriel Souza ficaria com ${gabrielDepois}% — ainda precisaria de mais votos`;

  const donutLabels = ['Gabriel Souza', 'Juliana Brizola', 'Zucco', 'Edegar Pretto', 'Brancos/Nulos'];
  const donutColors = [CANDIDATOS.gabriel.cor, CANDIDATOS.juliana.cor, CANDIDATOS.zucco.cor, CANDIDATOS.edegar.cor, CANDIDATOS.brancos.cor];

  const antesData = [CENARIO_ATUAL.gabriel, CENARIO_ATUAL.juliana, CENARIO_ATUAL.zucco, CENARIO_ATUAL.edegar, CENARIO_ATUAL.brancos];
  const depoisData = [depois.gabriel, depois.juliana, depois.zucco, depois.edegar, depois.brancos];

  return (
    <Stack sx={{ gap: 2.5 }}>
      <MainCard>
        <Stack sx={{ gap: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 2, alignItems: { sm: 'center' } }}>
            <FormControl size="small" sx={{ minWidth: 220 }}>
              <InputLabel>Quem desiste?</InputLabel>
              <Select value={quemDesiste} label="Quem desiste?" onChange={handleDesistChange}>
                {DESIST_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
              </Select>
            </FormControl>
            <Typography variant="h5">Cenário: {DESIST_OPTIONS.find((o) => o.value === quemDesiste)?.label} desiste</Typography>
          </Stack>

          <MainCard title={`Redistribuição dos ${votosDesistente}% de votos`} content={false} sx={{ p: 2 }}>
            <Stack sx={{ gap: 2 }}>
              {destinos.map((d) => (
                <Stack key={d.key} direction="row" sx={{ gap: 2, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ minWidth: 140 }}>→ {d.label}</Typography>
                  <Slider
                    value={pcts[d.key] || 0}
                    onChange={(_, v) => handleSlider(d.key, v as number)}
                    min={0} max={100} step={5}
                    sx={{ flex: 1 }}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(v) => `${v}%`}
                  />
                  <Typography variant="subtitle2" sx={{ minWidth: 70, textAlign: 'right' }}>
                    {pcts[d.key]}% ({(votosDesistente * (pcts[d.key] || 0) / 100).toFixed(1)}pp)
                  </Typography>
                </Stack>
              ))}
              <Button variant="outlined" size="small" onClick={handleIgual} sx={{ alignSelf: 'flex-start' }}>
                Redistribuir igualmente
              </Button>
            </Stack>
          </MainCard>
        </Stack>
      </MainCard>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <MainCard title="Antes">
            <DonutChart labels={donutLabels} series={antesData} colors={donutColors} centerLabel={`${CENARIO_ATUAL.gabriel}%`} />
          </MainCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MainCard title="Depois">
            <DonutChart labels={donutLabels} series={depoisData} colors={donutColors} centerLabel={`${gabrielDepois}%`} />
          </MainCard>
        </Grid>
      </Grid>

      <MainCard content={false} sx={{ borderLeft: `4px solid ${conclusaoColor}`, bgcolor: `${conclusaoColor}12`, p: 2.5 }}>
        <Typography variant="h5" sx={{ color: conclusaoColor }}>{conclusaoTexto}</Typography>
      </MainCard>
    </Stack>
  );
}
