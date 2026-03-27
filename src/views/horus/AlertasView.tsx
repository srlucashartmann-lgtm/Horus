'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';

// project-imports
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';
import { GRID_COMMON_SPACING } from 'config';
import { ALERTAS_ATIVOS, TIMELINE_HUMOR, HUMOR_POR_SEGMENTO, REGRAS_ALERTA, AlertaItem } from 'data/horus';

// onboarding
import ModuleTour from 'components/onboarding/ModuleTour';
import TourButton from 'components/onboarding/TourButton';

// assets
import { ArrowDown, ArrowUp, Minus, Notification, SecuritySafe, Warning2, VolumeSlash, TickCircle } from '@wandersonalwes/iconsax-react';

// ==============================|| ALERTAS - CONSTANTS ||============================== //

const MAPA_RISCO = [
  { segmento: 'Mulheres 25-34', voto: 52, tend: '▲', cor: 'success' as const },
  { segmento: 'Homens 35-49', voto: 41, tend: '▼', cor: 'warning' as const },
  { segmento: 'Evangélicos', voto: 33, tend: '▼▼', cor: 'error' as const },
  { segmento: 'Classe C', voto: 44, tend: '→', cor: 'success' as const },
  { segmento: 'Jovens 16-24', voto: 58, tend: '▲▲', cor: 'success' as const },
  { segmento: 'Interior Norte', voto: 39, tend: '▼', cor: 'error' as const },
  { segmento: 'Classe A/B', voto: 35, tend: '▼', cor: 'warning' as const },
  { segmento: 'Mulheres 50+', voto: 48, tend: '▲', cor: 'success' as const }
];

const riscoBg: Record<string, string> = {
  error: 'error.lighter',
  warning: 'warning.lighter',
  success: 'success.lighter'
};

const riscoBorder: Record<string, string> = {
  error: 'error.main',
  warning: 'warning.main',
  success: 'success.main'
};

const sevColor: Record<string, 'error' | 'warning' | 'success'> = { critico: 'error', atencao: 'warning', positivo: 'success' };
const sevLabel: Record<string, string> = { critico: 'CRÍTICO', atencao: 'ATENÇÃO', positivo: 'POSITIVO' };
const humorLabel: Record<string, string> = { muito_favoravel: 'Muito favorável', favoravel: 'Favorável', neutro: 'Neutro', desfavoravel: 'Desfavorável' };
const humorDotColor: Record<string, 'success' | 'warning' | 'error'> = { muito_favoravel: 'success', favoravel: 'success', neutro: 'warning', desfavoravel: 'error' };
const tendIcon: Record<string, React.ReactNode> = {
  melhorando: <ArrowUp size={14} style={{ transform: 'rotate(45deg)', color: '#2e7d32' }} />,
  piorando: <ArrowDown size={14} style={{ transform: 'rotate(-45deg)', color: '#c62828' }} />,
  estavel: <Minus size={14} style={{ color: '#78909c' }} />
};
const tlDotColor: Record<string, 'error' | 'warning' | 'success'> = { critico: 'error', atencao: 'warning', positivo: 'success' };
const regraIcons: Record<number, React.ReactNode> = {
  1: <Warning2 size={20} />,
  2: <Notification size={20} />,
  3: <ArrowDown size={20} />,
  4: <SecuritySafe size={20} />,
  5: <Notification size={20} />
};

// ==============================|| KPI CARD — SAME PATTERN AS AnalyticEcommerce ||============================== //

function KpiCard({ title, count, subtitle, color }: { title: string; count: string; subtitle: string; color: string }) {
  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack sx={{ gap: 0.5 }}>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
        <Grid container sx={{ alignItems: 'center' }}>
          <Grid>
            <Typography variant="h4" color="inherit">
              {count}
            </Typography>
          </Grid>
        </Grid>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        <Typography variant="caption" sx={{ color: `${color}.main` }}>
          {subtitle}
        </Typography>
      </Box>
    </MainCard>
  );
}

// ==============================|| ALERTAS E MUDANÇAS DE HUMOR ||============================== //

export default function AlertasView() {
  const router = useRouter();
  const [alertas, setAlertas] = useState<AlertaItem[]>(ALERTAS_ATIVOS);
  const [regras, setRegras] = useState(REGRAS_ALERTA.map((r) => ({ ...r })));

  const handleResolver = (id: number) => {
    setAlertas((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'resolvido' as const } : a)));
  };

  const ativos = useMemo(() => alertas.filter((a) => a.status !== 'resolvido'), [alertas]);
  const requeremAcao = useMemo(() => alertas.filter((a) => a.severidade === 'critico' && a.status === 'ativo'), [alertas]);
  const resolvidos = useMemo(() => alertas.filter((a) => a.status === 'resolvido'), [alertas]);
  const segEmRisco = MAPA_RISCO.filter((s) => s.cor === 'error').length;

  const sortedAlertas = useMemo(() => {
    const order = { critico: 0, atencao: 1, positivo: 2 };
    return [...alertas].sort((a, b) => {
      if (a.status === 'resolvido' && b.status !== 'resolvido') return 1;
      if (a.status !== 'resolvido' && b.status === 'resolvido') return -1;
      return order[a.severidade] - order[b.severidade];
    });
  }, [alertas]);

  return (
    <Grid container spacing={GRID_COMMON_SPACING}>
      {/* ==================== HEADER ==================== */}
      <Grid size={12}>
        <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
          <Typography variant="h4">Alertas e Mudanças de Humor</Typography>
          <TourButton tourId="alertas" />
        </Stack>
      </Grid>

      {/* ==================== KPIs ==================== */}
      <Grid size={12} data-tour="alertas-kpis">
        <Grid container spacing={GRID_COMMON_SPACING}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <KpiCard title="Alertas Ativos" count={String(ativos.length)} subtitle="2 críticos requerem ação imediata" color="error" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <KpiCard title="Requerem Ação" count={String(requeremAcao.length)} subtitle="Evangélicos e tema Inexperiência" color="warning" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <KpiCard title="Resolvidos" count={String(resolvidos.length)} subtitle="Nenhum resolvido esta semana" color="success" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <KpiCard title="Segmentos em Risco" count={String(segEmRisco)} subtitle="Evangélicos e Interior Norte" color="error" />
          </Grid>
        </Grid>
      </Grid>

      {/* ==================== MAPA DE RISCO ==================== */}
      <Grid size={12}>
        <Box data-tour="alertas-risco">
        <MainCard title="Mapa de Risco por Segmento">
          <Grid container spacing={2}>
            {MAPA_RISCO.map((s) => (
              <Grid key={s.segmento} size={{ xs: 6, sm: 3 }}>
                <MainCard
                  border={false}
                  contentSX={{ p: 2.25 }}
                  sx={{
                    cursor: 'pointer',
                    bgcolor: riscoBg[s.cor],
                    border: '1px solid',
                    borderColor: riscoBorder[s.cor],
                    '&:hover': { boxShadow: 4 }
                  }}
                  onClick={() => router.push('/quantitativo/tracking')}
                >
                  <Stack sx={{ gap: 0.5 }}>
                    <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                      {s.segmento}
                    </Typography>
                    <Grid container sx={{ alignItems: 'center' }}>
                      <Grid>
                        <Typography variant="h4">{s.voto}%</Typography>
                      </Grid>
                      <Grid>
                        <Chip
                          variant="combined"
                          color={s.cor}
                          label={s.tend}
                          sx={{ ml: 1.25, pl: 1, borderRadius: 1 }}
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </Stack>
                </MainCard>
              </Grid>
            ))}
          </Grid>
        </MainCard>
        </Box>
      </Grid>

      {/* ==================== ALERTAS ATIVOS ==================== */}
      <Grid size={12}>
        <Box data-tour="alertas-lista">
        <MainCard title="Alertas Ativos" content={false} contentSX={{ p: 0 }}>
          <Stack sx={{ p: 2.5, gap: 2 }}>
            {sortedAlertas.map((a) => (
              <MainCard
                key={a.id}
                content={false}
                sx={{
                  borderLeft: '4px solid',
                  borderLeftColor: `${sevColor[a.severidade]}.main`,
                  ...(a.status === 'resolvido' && { opacity: 0.45 })
                }}
              >
                <Stack sx={{ p: 2, gap: 1.5 }}>
                  {/* Header: badge + title + action buttons */}
                  <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                    <Stack sx={{ gap: 0.75, flex: 1, minWidth: 0 }}>
                      <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                        <Chip
                          label={sevLabel[a.severidade]}
                          color={sevColor[a.severidade]}
                          size="small"
                          sx={{ borderRadius: 1, fontWeight: 700, height: 22, fontSize: '0.675rem' }}
                        />
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, ...(a.status === 'resolvido' && { textDecoration: 'line-through' }) }}>
                          {a.titulo}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {a.descricao}
                      </Typography>
                    </Stack>
                    <Stack direction="row" sx={{ gap: 0.75, flexShrink: 0, alignItems: 'center' }}>
                      <Button size="small" variant="contained" color={sevColor[a.severidade]} onClick={() => router.push('/inteligencia/causa-efeito')}>
                        Investigar
                      </Button>
                      {a.status !== 'resolvido' && (
                        <Button size="small" variant="outlined" color="success" startIcon={<TickCircle size={14} />} onClick={() => handleResolver(a.id)}>
                          Resolvido
                        </Button>
                      )}
                      <Tooltip title="Silenciar">
                        <Button size="small" variant="text" color="secondary" sx={{ minWidth: 'auto', px: 1 }}>
                          <VolumeSlash size={16} />
                        </Button>
                      </Tooltip>
                    </Stack>
                  </Stack>

                  {/* Tags + suggested action */}
                  <Stack direction="row" sx={{ gap: 0.75, alignItems: 'center', flexWrap: 'wrap' }}>
                    {a.tags.map((t) => (
                      <Chip key={t} label={t} size="small" variant="outlined" sx={{ borderRadius: 1, fontSize: '0.7rem', height: 22 }} />
                    ))}
                    <Typography variant="caption" sx={{ color: `${sevColor[a.severidade]}.main`, fontWeight: 600, ml: 0.5 }}>
                      {a.acaoSugerida}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled', ml: 'auto' }}>
                      {a.tempoAtras}
                    </Typography>
                  </Stack>
                </Stack>
              </MainCard>
            ))}
          </Stack>
        </MainCard>
        </Box>
      </Grid>

      {/* ==================== TIMELINE ==================== */}
      <Grid size={{ xs: 12, lg: 5 }}>
        <MainCard title="Timeline de Mudanças de Humor">
          <Timeline
            position="right"
            sx={{
              p: 0,
              m: 0,
              '& .MuiTimelineItem-root::before': { display: 'none' }
            }}
          >
            {TIMELINE_HUMOR.map((t, i) => (
              <TimelineItem key={i} sx={{ minHeight: i === TIMELINE_HUMOR.length - 1 ? 'auto' : 56 }}>
                <TimelineSeparator>
                  <TimelineDot color={tlDotColor[t.tipo]} variant={i === 0 ? 'filled' : 'outlined'} sx={{ my: 0.75 }} />
                  {i < TIMELINE_HUMOR.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ py: 0, px: 2 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {t.data}
                  </Typography>
                  <Typography variant="body2">{t.texto}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </MainCard>
      </Grid>

      {/* ==================== HUMOR POR SEGMENTO ==================== */}
      <Grid size={{ xs: 12, lg: 7 }}>
        <MainCard title="Humor Atual por Segmento" content={false}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: 3 }}>Segmento</TableCell>
                  <TableCell>Intenção</TableCell>
                  <TableCell>Humor</TableCell>
                  <TableCell>Tendência</TableCell>
                  <TableCell align="right" sx={{ pr: 3 }}>Variação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {HUMOR_POR_SEGMENTO.map((h) => {
                  const mr = MAPA_RISCO.find((m) => m.segmento === h.segmento);
                  return (
                    <TableRow
                      hover
                      key={h.segmento}
                      sx={{ cursor: 'pointer', '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                      onClick={() => router.push('/quantitativo/tracking')}
                    >
                      <TableCell sx={{ pl: 3 }}>
                        <Typography variant="subtitle2">{h.segmento}</Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 32 }}>
                            {mr?.voto || 0}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={mr?.voto || 0}
                            color={mr?.cor || 'primary'}
                            sx={{ flex: 1, height: 6, borderRadius: 3, maxWidth: 80, bgcolor: 'action.hover' }}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                          <Dot color={humorDotColor[h.humor]} size={10} />
                          <Typography variant="body2">{humorLabel[h.humor]}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{tendIcon[h.tendencia]}</TableCell>
                      <TableCell align="right" sx={{ pr: 3 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: h.variacao.startsWith('+') ? 'success.main' : h.variacao.startsWith('-') ? 'error.main' : 'text.secondary'
                          }}
                        >
                          {h.variacao}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Grid>

      {/* ==================== REGRAS DE ALERTA ==================== */}
      <Grid size={12}>
        <Box data-tour="alertas-regras">
        <MainCard title="Regras de Alerta">
          <Grid container spacing={2}>
            {regras.map((r) => (
              <Grid key={r.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <MainCard contentSX={{ p: 2 }}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                      <Box sx={{ color: r.ativo ? 'primary.main' : 'text.disabled', display: 'flex' }}>{regraIcons[r.id]}</Box>
                      <Typography variant="subtitle1">{r.regra}</Typography>
                    </Stack>
                    <Switch
                      checked={r.ativo}
                      size="small"
                      onChange={() => setRegras((prev) => prev.map((x) => (x.id === r.id ? { ...x, ativo: !x.ativo } : x)))}
                    />
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {r.condicao}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                    Limiar: {r.limiar}
                  </Typography>
                </MainCard>
              </Grid>
            ))}
          </Grid>
        </MainCard>
        </Box>
      </Grid>
      <ModuleTour tourId="alertas" />
    </Grid>
  );
}
