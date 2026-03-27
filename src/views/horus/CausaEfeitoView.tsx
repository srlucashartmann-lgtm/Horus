'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// material-ui
import { useTheme, useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// third-party
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

// project-imports
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING, ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import {
  CAUSA_EFEITO_SEGMENTOS,
  CAUSA_EFEITO_PERIODOS,
  CAUSA_EFEITO_DATA,
  CausaEfeitoSegmentoData
} from 'data/horus';

// onboarding
import ModuleTour from 'components/onboarding/ModuleTour';
import TourButton from 'components/onboarding/TourButton';

// assets
import { ArrowUp, ArrowDown, DocumentDownload, Play, SearchNormal1 } from '@wandersonalwes/iconsax-react';

// ==============================|| CHART — TRACKING SEGMENTO ||============================== //

function SegmentoChart({ data }: { data: CausaEfeitoSegmentoData }) {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();
  const { state: { fontFamily } } = useConfig();

  const textSecondary = theme.vars.palette.text.secondary;
  const line = theme.vars.palette.divider;
  const successMain = theme.vars.palette.success.main;
  const errorMain = theme.vars.palette.error.main;

  const [options, setOptions] = useState<ApexOptions>({});

  useEffect(() => {
    const annotations: ApexOptions['annotations'] = data.chartEvento
      ? {
          xaxis: [{
            x: data.chartEvento.data,
            borderColor: theme.vars.palette.warning.main,
            label: {
              text: data.chartEvento.label,
              orientation: 'horizontal',
              borderColor: theme.vars.palette.warning.main,
              style: { background: theme.vars.palette.warning.main, color: '#fff', fontSize: '11px', fontFamily }
            }
          }]
        }
      : undefined;

    setOptions({
      chart: { height: 280, type: 'line', background: 'transparent', toolbar: { show: false }, fontFamily },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: [3, 3] },
      colors: [data.positivo ? successMain : errorMain, data.positivo ? errorMain : successMain],
      grid: { show: true, strokeDashArray: 3, borderColor: line, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
      xaxis: {
        categories: data.chartDatas,
        labels: { style: { colors: textSecondary } },
        axisBorder: { show: true, color: line }
      },
      yaxis: { labels: { style: { colors: textSecondary }, formatter: (v: number) => `${v}%` } },
      tooltip: { y: { formatter: (v: number) => `${v}%` } },
      legend: { show: true, position: 'bottom', horizontalAlign: 'left', itemMargin: { horizontal: 10 } },
      annotations,
      theme: { mode: colorScheme === ThemeMode.DARK ? 'dark' : 'light' }
    });
  }, [data, colorScheme, fontFamily, textSecondary, line, successMain, errorMain, theme]);

  const series = [
    { name: 'Intenção de Voto', data: data.chartIntencao },
    { name: 'Rejeição', data: data.chartRejeicao }
  ];

  return <ReactApexChart options={options} series={series} type="line" height={280} />;
}

// ==============================|| CHART — TEMAS BARRAS HORIZONTAIS ||============================== //

function TemasChart({ data }: { data: CausaEfeitoSegmentoData }) {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();
  const { state: { fontFamily } } = useConfig();

  const textSecondary = theme.vars.palette.text.secondary;
  const line = theme.vars.palette.divider;

  const [options, setOptions] = useState<ApexOptions>({});

  useEffect(() => {
    setOptions({
      chart: { type: 'bar', background: 'transparent', toolbar: { show: false }, fontFamily },
      plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: '60%' } },
      dataLabels: { enabled: true, formatter: (v: number) => `${v}`, style: { fontSize: '12px' } },
      colors: [theme.vars.palette.primary.main],
      xaxis: {
        categories: data.temas.map((t) => t.tema),
        labels: { style: { colors: textSecondary } },
        axisBorder: { show: false }
      },
      yaxis: { labels: { style: { colors: textSecondary, fontSize: '12px' } } },
      grid: { borderColor: line, xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } },
      tooltip: { y: { formatter: (v: number) => `${v} menções` } },
      theme: { mode: colorScheme === ThemeMode.DARK ? 'dark' : 'light' }
    });
  }, [data, colorScheme, fontFamily, textSecondary, line, theme]);

  const series = [{ name: 'Menções', data: data.temas.map((t) => t.mencoes) }];

  return <ReactApexChart options={options} series={series} type="bar" height={250} />;
}

// ==============================|| CAUSA E EFEITO VIEW ||============================== //

export default function CausaEfeitoView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const segmentoParam = searchParams.get('segmento');
  const [segmento, setSegmento] = useState(segmentoParam || 'Evangélicos');
  const [periodo, setPeriodo] = useState('7d');
  const [checkedAcoes, setCheckedAcoes] = useState<Record<number, boolean>>({});

  const handleSegmento = (e: SelectChangeEvent) => {
    setSegmento(e.target.value);
    setCheckedAcoes({});
  };

  const toggleAcao = (id: number) => setCheckedAcoes((prev) => ({ ...prev, [id]: !prev[id] }));

  const segData = CAUSA_EFEITO_DATA[segmento];
  const hasData = !!segData;

  const sevChipColor: Record<string, 'error' | 'warning' | 'success'> = { critico: 'error', atencao: 'warning', positivo: 'success' };
  const narrativaChipColor: Record<string, 'error' | 'warning' | 'success'> = {
    ganhando_forca: 'error',
    precificado: 'success',
    consolidando: 'warning',
    a_favor: 'success'
  };

  return (
    <Grid container spacing={GRID_COMMON_SPACING}>
      {/* ==================== HEADER / SELETOR ==================== */}
      <Grid size={12}>
        <Box data-tour="causa-seletores">
        <MainCard>
          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
            <Stack>
              <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                <Typography variant="h4">Análise de Causa e Efeito</Typography>
                <TourButton tourId="causaEfeito" />
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Cruzamento automático entre dados quantitativos e qualitativos
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center' }}>
              <Select value={segmento} onChange={handleSegmento} size="small" sx={{ minWidth: 180 }}>
                {CAUSA_EFEITO_SEGMENTOS.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
              <Select value={periodo} onChange={(e) => setPeriodo(e.target.value)} size="small" sx={{ minWidth: 160 }}>
                {CAUSA_EFEITO_PERIODOS.map((p) => (
                  <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>
                ))}
              </Select>
              <Button variant="contained" startIcon={<SearchNormal1 size={16} />}>Analisar</Button>
            </Stack>
          </Stack>
        </MainCard>
        </Box>
      </Grid>

      {!hasData ? (
        <Grid size={12}>
          <MainCard>
            <Stack sx={{ alignItems: 'center', py: 6, gap: 2 }}>
              <Typography variant="h5" sx={{ color: 'text.secondary' }}>Dados não disponíveis para "{segmento}"</Typography>
              <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                Selecione Evangélicos, Jovens 16-24 ou Interior Norte para ver a análise completa.
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
      ) : (
        <>
          {/* ==================== SEÇÃO 1 — DIAGNÓSTICO QUANTI + GRÁFICO ==================== */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box data-tour="causa-quanti">
            <MainCard
              border={false}
              content={false}
              sx={{
                borderLeft: '4px solid',
                borderLeftColor: segData.positivo ? 'success.main' : 'error.main',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Stack sx={{ p: 2.5, gap: 2 }}>
                <Typography variant="h5">{segData.diagnosticoTitulo}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{segData.diagnosticoSubtitulo}</Typography>

                <Stack direction="row" sx={{ gap: 3 }}>
                  <Stack sx={{ gap: 0.5 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Intenção de voto</Typography>
                    <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                      <Typography variant="h4">{segData.intencao}%</Typography>
                      <Chip
                        variant="combined"
                        color={segData.intencaoVar >= 0 ? 'success' : 'error'}
                        icon={segData.intencaoVar >= 0
                          ? <ArrowUp size={14} style={{ transform: 'rotate(45deg)' }} />
                          : <ArrowDown size={14} style={{ transform: 'rotate(-45deg)' }} />}
                        label={`${segData.intencaoVar > 0 ? '+' : ''}${segData.intencaoVar}pp`}
                        size="small"
                        sx={{ borderRadius: 1, pl: 0.5 }}
                      />
                    </Stack>
                  </Stack>
                  <Stack sx={{ gap: 0.5 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Rejeição</Typography>
                    <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                      <Typography variant="h4">{segData.rejeicao}%</Typography>
                      <Chip
                        variant="combined"
                        color={segData.rejeicaoVar <= 0 ? 'success' : 'error'}
                        icon={segData.rejeicaoVar >= 0
                          ? <ArrowUp size={14} style={{ transform: 'rotate(45deg)' }} />
                          : <ArrowDown size={14} style={{ transform: 'rotate(-45deg)' }} />}
                        label={`${segData.rejeicaoVar > 0 ? '+' : ''}${segData.rejeicaoVar}pp`}
                        size="small"
                        sx={{ borderRadius: 1, pl: 0.5 }}
                      />
                    </Stack>
                  </Stack>
                </Stack>

                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>{segData.textoQuanti}</Typography>
              </Stack>
            </MainCard>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <MainCard title={`Tracking — ${segData.segmento} (últimos 15 dias)`}>
              <SegmentoChart data={segData} />
            </MainCard>
          </Grid>

          {/* ==================== SEÇÃO 2 — EVIDÊNCIAS QUALITATIVAS ==================== */}
          <Grid size={12}>
            <Box data-tour="causa-quali">
            <MainCard title={`Evidências Qualitativas — O que os ${segData.segmento} estão dizendo`} content={false}>
              <Stack sx={{ p: 2.5, gap: 1.5 }}>
                {segData.frases.map((f) => (
                  <MainCard
                    key={f.ordem}
                    content={false}
                    sx={{ borderLeft: '3px solid', borderLeftColor: 'primary.main' }}
                  >
                    <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ p: 2, gap: 2, alignItems: { sm: 'center' } }}>
                      <Typography variant="h4" sx={{ color: 'primary.main', minWidth: 28, textAlign: 'center' }}>
                        {f.ordem}
                      </Typography>
                      <Stack sx={{ flex: 1, gap: 0.5 }}>
                        <Typography variant="body2" sx={{ fontStyle: 'italic', fontWeight: 500 }}>
                          &quot;{f.frase}&quot;
                        </Typography>
                        <Stack direction="row" sx={{ gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {f.autor}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.disabled' }}>·</Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                            onClick={() => router.push(`/qualitativo/sessoes/${f.sessaoId}`)}
                          >
                            {f.sessao}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.disabled' }}>·</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>x{f.mencoes}</Typography>
                        </Stack>
                        <Stack direction="row" sx={{ gap: 0.5, flexWrap: 'wrap' }}>
                          {f.tags.map((t) => (
                            <Chip key={t} label={t} size="small" variant="outlined" sx={{ borderRadius: 1, fontSize: '0.65rem', height: 20 }} />
                          ))}
                        </Stack>
                      </Stack>
                      <Button size="small" variant="text" color="secondary" sx={{ minWidth: 'auto' }}>
                        <Play size={18} />
                      </Button>
                    </Stack>
                  </MainCard>
                ))}
              </Stack>
            </MainCard>
            </Box>
          </Grid>

          {/* ==================== SEÇÃO 3 — DIAGNÓSTICO INTEGRADO ==================== */}
          <Grid size={12}>
            <MainCard
              border={false}
              sx={{ bgcolor: 'primary.lighter', border: '1px solid', borderColor: 'primary.main' }}
              title="Diagnóstico Integrado"
            >
              <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                {segData.diagnosticoIntegrado}
              </Typography>
            </MainCard>
          </Grid>

          {/* ==================== SEÇÃO 4 — TEMAS + NARRATIVAS ==================== */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MainCard title={`Temas em Alta — ${segData.segmento}`}>
              <TemasChart data={segData} />
            </MainCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box data-tour="causa-narrativas">
            <MainCard title="Monitoramento de Narrativas" content={false}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: 3 }}>Tema</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Tração</TableCell>
                      <TableCell align="right" sx={{ pr: 3 }}>Fonte</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {segData.narrativas.map((n, i) => (
                      <TableRow hover key={i} sx={{ '&:last-of-type td': { border: 0 } }}>
                        <TableCell sx={{ pl: 3 }}>
                          <Typography variant="subtitle2">{n.tema}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={n.statusLabel}
                            color={narrativaChipColor[n.status]}
                            size="small"
                            variant="combined"
                            sx={{ borderRadius: 1, fontWeight: 600, fontSize: '0.7rem' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption">{n.tracacao}</Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ pr: 3 }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{n.fonte}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </MainCard>
            </Box>
          </Grid>

          {/* ==================== SEÇÃO 5 — AÇÕES RECOMENDADAS ==================== */}
          <Grid size={12}>
            <MainCard
              title={`Plano de Ação para ${segData.segmento}`}
              secondary={
                <Button variant="outlined" size="small" startIcon={<DocumentDownload size={14} />}>
                  Exportar Plano de Ação como PDF
                </Button>
              }
            >
              <List disablePadding>
                {segData.acoes.map((a) => (
                  <ListItem key={a.id} disablePadding sx={{ py: 0.75 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!checkedAcoes[a.id]}
                          onChange={() => toggleAcao(a.id)}
                          size="small"
                          sx={{ mr: 0.5 }}
                        />
                      }
                      label={
                        <Stack direction="row" sx={{ gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                          <Chip
                            label={a.label}
                            color={sevChipColor[a.severidade]}
                            size="small"
                            sx={{ borderRadius: 1, fontWeight: 700, height: 20, fontSize: '0.65rem' }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ ...(checkedAcoes[a.id] && { textDecoration: 'line-through', color: 'text.disabled' }) }}
                          >
                            {a.texto}
                          </Typography>
                        </Stack>
                      }
                      sx={{ alignItems: 'flex-start', m: 0, width: '100%' }}
                    />
                  </ListItem>
                ))}
              </List>
            </MainCard>
          </Grid>
        </>
      )}
      <ModuleTour tourId="causaEfeito" />
    </Grid>
  );
}
