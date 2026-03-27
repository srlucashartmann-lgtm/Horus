'use client';

import { useState, useEffect } from 'react';

// material-ui
import { useTheme, useColorScheme, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

// project-imports
import MainCard from 'components/MainCard';
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import Dot from 'components/@extended/Dot';
import EcommerceDataChart from 'sections/widget/chart/EcommerceDataChart';
import { GRID_COMMON_SPACING, ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import {
  CANDIDATOS,
  SINTESE_SEMANAS,
  SINTESE_RESUMO,
  SINTESE_MELHOROU,
  SINTESE_PIOROU,
  SINTESE_VOZES,
  SINTESE_RECOMENDACOES,
  SINTESE_CHEATSHEET,
  SINTESE_TRACKING_SEMANAL
} from 'data/horus';

// onboarding
import ModuleTour from 'components/onboarding/ModuleTour';
import TourButton from 'components/onboarding/TourButton';

// assets
import { ArrowUp, ArrowDown, DocumentDownload, Play, MessageQuestion, Chart21, Warning2, People } from '@wandersonalwes/iconsax-react';

// ==============================|| CHART — TRACKING SEMANAL ||============================== //

const chartBaseOptions: ApexOptions = {
  chart: { height: 340, type: 'line', background: 'transparent', toolbar: { show: false } },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: [3, 2, 2, 2] },
  grid: { show: true, strokeDashArray: 3, position: 'back', xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
  legend: { show: true, position: 'bottom', horizontalAlign: 'left', itemMargin: { horizontal: 10 } },
  yaxis: { min: 0, max: 55, tickAmount: 5 }
};

function TrackingSemanalChart() {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();
  const { state: { fontFamily } } = useConfig();

  const textSecondary = theme.vars.palette.text.secondary;
  const line = theme.vars.palette.divider;

  const [options, setOptions] = useState<ApexOptions>(chartBaseOptions);

  useEffect(() => {
    setOptions({
      ...chartBaseOptions,
      chart: { ...chartBaseOptions.chart, fontFamily },
      colors: [CANDIDATOS.gabriel.cor, CANDIDATOS.juliana.cor, CANDIDATOS.zucco.cor, CANDIDATOS.edegar.cor],
      xaxis: {
        categories: SINTESE_TRACKING_SEMANAL.datas,
        labels: { style: { colors: textSecondary } },
        axisBorder: { show: true, color: line }
      },
      yaxis: { ...chartBaseOptions.yaxis, labels: { style: { colors: textSecondary }, formatter: (v: number) => `${v}%` } },
      grid: { ...chartBaseOptions.grid, borderColor: line },
      tooltip: { y: { formatter: (v: number) => `${v}%` } },
      annotations: {
        xaxis: SINTESE_TRACKING_SEMANAL.eventos.map((e) => ({
          x: e.data,
          borderColor: theme.vars.palette.warning.main,
          label: {
            text: e.label,
            orientation: 'horizontal',
            borderColor: theme.vars.palette.warning.main,
            style: { background: theme.vars.palette.warning.main, color: '#fff', fontSize: '11px', fontFamily }
          }
        }))
      },
      theme: { mode: colorScheme === ThemeMode.DARK ? 'dark' : 'light' }
    });
  }, [colorScheme, fontFamily, textSecondary, line, theme]);

  const series = [
    { name: 'Gabriel Souza', data: SINTESE_TRACKING_SEMANAL.gabriel },
    { name: 'Juliana Brizola', data: SINTESE_TRACKING_SEMANAL.juliana },
    { name: 'Zucco', data: SINTESE_TRACKING_SEMANAL.zucco },
    { name: 'Edegar Pretto', data: SINTESE_TRACKING_SEMANAL.edegar }
  ];

  return <ReactApexChart options={options} series={series} type="line" height={340} />;
}

// ==============================|| SÍNTESE SEMANAL VIEW ||============================== //

export default function SinteseSemanalView() {
  const theme = useTheme();
  const [semana, setSemana] = useState('s11');
  const [checkedRec, setCheckedRec] = useState<Record<number, boolean>>({});

  const handleSemana = (e: SelectChangeEvent) => setSemana(e.target.value);
  const toggleRec = (id: number) => setCheckedRec((prev) => ({ ...prev, [id]: !prev[id] }));

  const sevChipColor: Record<string, 'error' | 'warning' | 'success'> = { critico: 'error', atencao: 'warning', positivo: 'success' };

  const semanaAtual = semana === 's11';

  return (
    <Grid container spacing={GRID_COMMON_SPACING}>
      {/* ==================== HEADER ==================== */}
      <Grid size={12}>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
          <Stack>
            <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
              <Typography variant="h4">Síntese Semanal</Typography>
              <TourButton tourId="sintese" />
            </Stack>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Semana 11 — 14/Mar a 20/Mar · Gerada automaticamente
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center' }}>
            <Select value={semana} onChange={handleSemana} size="small" sx={{ minWidth: 200 }}>
              {SINTESE_SEMANAS.map((s) => (
                <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
              ))}
            </Select>
            <Button variant="outlined" color="secondary" startIcon={<DocumentDownload size={16} />}>Exportar PDF</Button>
            <Button variant="contained" startIcon={<MessageQuestion size={16} />}>Gerar Cheat Sheet</Button>
          </Stack>
        </Stack>
      </Grid>

      {/* ==================== CONTEÚDO CONDICIONAL ==================== */}
      {!semanaAtual ? (
        <Grid size={12}>
          <MainCard>
            <Stack sx={{ alignItems: 'center', py: 6, gap: 2 }}>
              <Typography variant="h5" sx={{ color: 'text.secondary' }}>Dados não disponíveis</Typography>
              <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                Selecione a Semana 11 para ver a síntese completa.
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
      ) : (
        <>
          {/* ==================== SEÇÃO 1 — RESUMO EXECUTIVO ==================== */}
          <Grid size={12}>
            <Box data-tour="sintese-resumo">
            <MainCard
              border={false}
              sx={(theme: Theme) => ({
                bgcolor: 'primary.darker',
                color: 'common.white',
                ...theme.applyStyles('dark', { bgcolor: 'primary.400', color: 'text.primary' })
              })}
            >
              <Stack sx={{ gap: 2, p: 1 }}>
                <Typography variant="h5" sx={{ color: 'inherit' }}>
                  Resumo da Semana para Gabriel Souza
                </Typography>
                <Typography variant="body1" sx={{ color: 'inherit', opacity: 0.92, lineHeight: 1.8 }}>
                  {SINTESE_RESUMO}
                </Typography>
              </Stack>
            </MainCard>
            </Box>
          </Grid>

          {/* ==================== SEÇÃO 2 — KPIs (EcommerceDataCard + EcommerceDataChart) ==================== */}
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <EcommerceDataCard
              title="Intenção de Voto"
              count="47%"
              iconPrimary={<Chart21 />}
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
              color="error"
              iconPrimary={<Warning2 />}
              percentage={
                <Typography sx={{ color: 'error.dark', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> +1.2pp
                </Typography>
              }
            >
              <EcommerceDataChart color={theme.vars.palette.error.dark} />
            </EcommerceDataCard>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <EcommerceDataCard
              title="Sessões Quali"
              count="3"
              color="warning"
              iconPrimary={<People />}
              percentage={
                <Typography sx={{ color: 'warning.dark', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  2 transcritas
                </Typography>
              }
            >
              <EcommerceDataChart color={theme.vars.palette.warning.dark} />
            </EcommerceDataCard>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <EcommerceDataCard
              title="Alertas Gerados"
              count="5"
              color="error"
              iconPrimary={<Warning2 />}
              percentage={
                <Typography sx={{ color: 'error.dark', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ArrowDown size={16} style={{ transform: 'rotate(-45deg)' }} /> 2 críticos
                </Typography>
              }
            >
              <EcommerceDataChart color={theme.vars.palette.error.main} />
            </EcommerceDataCard>
          </Grid>

          {/* ==================== SEÇÃO 3 — MELHOROU / PIOROU ==================== */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MainCard
              title="O que Melhorou esta Semana"
              border={false}
              sx={{ bgcolor: 'success.lighter', border: '1px solid', borderColor: 'success.main' }}
            >
              <List disablePadding>
                {SINTESE_MELHOROU.map((item, i) => (
                  <ListItem key={i} disablePadding sx={{ py: 0.75 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <ArrowUp size={16} style={{ color: '#2e7d32' }} />
                    </ListItemIcon>
                    <ListItemText primary={item} slotProps={{ primary: { variant: 'body2' } }} />
                  </ListItem>
                ))}
              </List>
            </MainCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <MainCard
              title="O que Piorou esta Semana"
              border={false}
              sx={{ bgcolor: 'error.lighter', border: '1px solid', borderColor: 'error.main' }}
            >
              <List disablePadding>
                {SINTESE_PIOROU.map((item, i) => (
                  <ListItem key={i} disablePadding sx={{ py: 0.75 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <ArrowDown size={16} style={{ color: '#c62828' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      slotProps={{ primary: { variant: 'body2', ...(i === 0 && { sx: { fontWeight: 700 } }) } }}
                    />
                  </ListItem>
                ))}
              </List>
            </MainCard>
          </Grid>

          {/* ==================== SEÇÃO 4 — GRÁFICO DA SEMANA ==================== */}
          <Grid size={12}>
            <MainCard title="Evolução da Semana (14-20/Mar)">
              <TrackingSemanalChart />
            </MainCard>
          </Grid>

          {/* ==================== SEÇÃO 5 — VOZES + RECOMENDAÇÕES ==================== */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MainCard title="Vozes da Semana">
              <List disablePadding>
                {SINTESE_VOZES.map((v, i) => (
                  <ListItem
                    key={i}
                    disablePadding
                    sx={{
                      py: 1.25,
                      borderBottom: i < SINTESE_VOZES.length - 1 ? '1px solid' : 'none',
                      borderColor: 'divider'
                    }}
                    secondaryAction={
                      <Button size="small" variant="text" color="secondary" sx={{ minWidth: 'auto' }}>
                        <Play size={16} />
                      </Button>
                    }
                  >
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <Dot color="primary" size={8} />
                    </ListItemIcon>
                    <ListItemText
                      primary={`"${v.frase}"`}
                      secondary={`${v.autor} (x${v.mencoes} menções)`}
                      slotProps={{
                        primary: { variant: 'body2', sx: { fontStyle: 'italic', fontWeight: 500 } },
                        secondary: { variant: 'caption' }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </MainCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box data-tour="sintese-recomendacoes">
            <MainCard title="Recomendações para a Próxima Semana">
              <List disablePadding>
                {SINTESE_RECOMENDACOES.map((r) => (
                  <ListItem key={r.id} disablePadding sx={{ py: 0.75 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!checkedRec[r.id]}
                          onChange={() => toggleRec(r.id)}
                          size="small"
                          sx={{ mr: 0.5 }}
                        />
                      }
                      label={
                        <Stack direction="row" sx={{ gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                          <Chip
                            label={r.label}
                            color={sevChipColor[r.severidade]}
                            size="small"
                            sx={{ borderRadius: 1, fontWeight: 700, height: 20, fontSize: '0.65rem' }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ ...(checkedRec[r.id] && { textDecoration: 'line-through', color: 'text.disabled' }) }}
                          >
                            {r.texto}
                          </Typography>
                        </Stack>
                      }
                      sx={{ alignItems: 'flex-start', m: 0, width: '100%' }}
                    />
                  </ListItem>
                ))}
              </List>
            </MainCard>
            </Box>
          </Grid>

          {/* ==================== SEÇÃO 6 — CHEAT SHEET ==================== */}
          <Grid size={12}>
            <Box data-tour="sintese-cheatsheet">
            <MainCard
              title="Cheat Sheet — Perguntas Difíceis"
              border={false}
              sx={{ bgcolor: 'primary.lighter', border: '1px solid', borderColor: 'primary.main' }}
              secondary={
                <Button variant="outlined" size="small" startIcon={<DocumentDownload size={14} />}>
                  Exportar Cheat Sheet como PDF
                </Button>
              }
            >
              <Stack sx={{ gap: 3 }}>
                {SINTESE_CHEATSHEET.map((qa, i) => (
                  <Stack key={i} sx={{ gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      P: &quot;{qa.pergunta}&quot;
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        pl: 2,
                        borderLeft: '3px solid',
                        borderColor: 'primary.main',
                        color: 'text.secondary',
                        lineHeight: 1.7
                      }}
                    >
                      R: &quot;{qa.resposta}&quot;
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </MainCard>
            </Box>
          </Grid>
        </>
      )}
      <ModuleTour tourId="sintese" />
    </Grid>
  );
}
