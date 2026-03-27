'use client';

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import { Add, Setting2 } from '@wandersonalwes/iconsax-react';
import { useTV } from './TVContext';
import TVConfigDrawer, { TVConfig, DEFAULT_TV_CONFIG, PanelId, LAYOUT_PRESETS, LayoutPreset } from './TVConfigDrawer';
import TVKpiCard from './panels/TVKpiCard';
import TVTrackingLine from './panels/TVTrackingLine';
import TVTrackingArea from './panels/TVTrackingArea';
import TVBarrasRejeicao from './panels/TVBarrasRejeicao';
import TVDonutCenario from './panels/TVDonutCenario';
import TVSegmentos from './panels/TVSegmentos';
import TVAlertas from './panels/TVAlertas';
import TVMapaRisco from './panels/TVMapaRisco';
import TVAdversarios from './panels/TVAdversarios';
import { TRACKING_DATA, REJEICAO_DATA, APROVACAO_DATA } from 'data/horus';

const LS_KEY = 'horus-tv-config';

function loadConfig(): TVConfig {
  if (typeof window === 'undefined') return DEFAULT_TV_CONFIG;
  try {
    const saved = localStorage.getItem(LS_KEY);
    return saved ? { ...DEFAULT_TV_CONFIG, ...JSON.parse(saved) } : DEFAULT_TV_CONFIG;
  } catch {
    return DEFAULT_TV_CONFIG;
  }
}

function saveConfig(config: TVConfig) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(config));
  } catch {}
}

// Latest data
const latestTracking = TRACKING_DATA[TRACKING_DATA.length - 1];
const prevTracking = TRACKING_DATA[TRACKING_DATA.length - 2];
const latestRejeicao = REJEICAO_DATA[REJEICAO_DATA.length - 1];
const latestAprovacao = APROVACAO_DATA[APROVACAO_DATA.length - 1];
const gap = latestTracking.gabriel - latestTracking.juliana;

export default function ModoTV() {
  const { open, closeTV } = useTV();
  const [config, setConfig] = useState<TVConfig>(DEFAULT_TV_CONFIG);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [clock, setClock] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [cursorHidden, setCursorHidden] = useState(false);
  const cursorTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [, setRotationIdx] = useState(0);

  // Load config on mount
  useEffect(() => {
    setConfig(loadConfig());
  }, []);

  // Clock
  useEffect(() => {
    if (!open) return;
    const update = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDateStr(now.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeTV();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, closeTV]);

  // Cursor auto-hide
  const handleMouseMove = useCallback(() => {
    setCursorHidden(false);
    if (cursorTimer.current) clearTimeout(cursorTimer.current);
    cursorTimer.current = setTimeout(() => setCursorHidden(true), 3000);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [open, handleMouseMove]);

  // Rotation
  useEffect(() => {
    if (!open || !config.rotation) return;
    const layouts: LayoutPreset[] = ['4-numeros', 'kpis-grafico', 'grafico-full', 'centro-operacoes'];
    const id = setInterval(() => {
      setRotationIdx((prev) => {
        const next = (prev + 1) % layouts.length;
        const layout = layouts[next];
        setConfig((c) => ({ ...c, layout, enabledPanels: [...LAYOUT_PRESETS[layout]] }));
        return next;
      });
    }, 30000);
    return () => clearInterval(id);
  }, [open, config.rotation]);

  const handleConfigChange = useCallback((newConfig: TVConfig) => {
    setConfig(newConfig);
    saveConfig(newConfig);
  }, []);

  const has = useCallback((id: PanelId) => config.enabledPanels.includes(id), [config.enabledPanels]);

  // KPI panels
  const kpis = useMemo(() => {
    const items: PanelId[] = ['tv-intencao', 'tv-rejeicao', 'tv-aprovacao', 'tv-gap'];
    return items.filter(has);
  }, [has]);

  const charts = useMemo(() => {
    const items: PanelId[] = ['tv-tracking-line', 'tv-tracking-area', 'tv-barras-rejeicao', 'tv-donut-cenario'];
    return items.filter(has);
  }, [has]);

  const tables = useMemo(() => {
    const items: PanelId[] = ['tv-segmentos', 'tv-alertas', 'tv-mapa-risco'];
    return items.filter(has);
  }, [has]);

  if (!open) return null;

  const renderPanel = (id: PanelId, delay: number) => {
    const fadeProps = { in: true, timeout: 500, style: { transitionDelay: `${delay * 100}ms` } };
    switch (id) {
      case 'tv-intencao':
        return <Fade key={id} {...fadeProps}><Box><TVKpiCard label="Intenção de Voto" value={`${latestTracking.gabriel}%`} delta={`+${latestTracking.gabriel - prevTracking.gabriel}pp`} color="#818CF8" /></Box></Fade>;
      case 'tv-rejeicao':
        return <Fade key={id} {...fadeProps}><Box><TVKpiCard label="Rejeição" value={`${latestRejeicao.gabriel}%`} delta="-1pp" deltaPositive={false} color="#FB7185" /></Box></Fade>;
      case 'tv-aprovacao':
        return <Fade key={id} {...fadeProps}><Box><TVKpiCard label="Aprovação Gov" value={`${latestAprovacao.gabriel}%`} delta="+1pp" color="#34D399" /></Box></Fade>;
      case 'tv-gap':
        return <Fade key={id} {...fadeProps}><Box><TVKpiCard label="Gap vs 2º Lugar" value={`${gap}pp`} delta={`vs ${TRACKING_DATA[TRACKING_DATA.length - 1].juliana}% Juliana`} color="#FBBF24" /></Box></Fade>;
      case 'tv-tracking-line':
        return <Fade key={id} {...fadeProps}><Box><TVTrackingLine /></Box></Fade>;
      case 'tv-tracking-area':
        return <Fade key={id} {...fadeProps}><Box><TVTrackingArea /></Box></Fade>;
      case 'tv-barras-rejeicao':
        return <Fade key={id} {...fadeProps}><Box><TVBarrasRejeicao /></Box></Fade>;
      case 'tv-donut-cenario':
        return <Fade key={id} {...fadeProps}><Box><TVDonutCenario /></Box></Fade>;
      case 'tv-segmentos':
        return <Fade key={id} {...fadeProps}><Box><TVSegmentos /></Box></Fade>;
      case 'tv-alertas':
        return <Fade key={id} {...fadeProps}><Box><TVAlertas /></Box></Fade>;
      case 'tv-mapa-risco':
        return <Fade key={id} {...fadeProps}><Box><TVMapaRisco /></Box></Fade>;
      case 'tv-adversarios':
        return <Fade key={id} {...fadeProps}><Box><TVAdversarios /></Box></Fade>;
      default:
        return null;
    }
  };

  return (
    <Box
      onMouseMove={handleMouseMove}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        bgcolor: '#07090F',
        cursor: cursorHidden ? 'none' : 'default',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          height: 48,
          flexShrink: 0,
          bgcolor: 'rgba(255,255,255,0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          borderBottom: '1px solid rgba(255,255,255,0.06)'
        }}
      >
        {/* Left */}
        <Stack direction="row" sx={{ alignItems: 'baseline', gap: 1.5 }}>
          <Typography sx={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '16px', color: '#fff', letterSpacing: '0.08em' }}>
            HÓRUS
          </Typography>
          <Typography sx={{ fontFamily: 'monospace', fontSize: '12px', color: '#475569' }}>
            War Room
          </Typography>
        </Stack>

        {/* Center */}
        <Stack sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: '#64748B' }}>
            {dateStr}
          </Typography>
          <Stack direction="row" sx={{ alignItems: 'baseline', gap: 2 }}>
            <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '18px', fontWeight: 700, color: '#E2E8F0', letterSpacing: '0.05em', lineHeight: 1 }}>
              {clock}
            </Typography>
            <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', fontWeight: 600, color: '#818CF8', letterSpacing: '0.05em' }}>
              Rodada 18
            </Typography>
          </Stack>
        </Stack>

        {/* Right */}
        <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
          {/* Live dot */}
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: '#EF4444',
                '@keyframes livePulse': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
                animation: 'livePulse 1.5s ease-in-out infinite'
              }}
            />
            <Typography sx={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#EF4444', letterSpacing: '0.05em' }}>
              AO VIVO
            </Typography>
          </Stack>

          <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#64748B', '&:hover': { color: '#94A3B8' } }}>
            <Setting2 size={20} />
          </IconButton>
          <IconButton onClick={closeTV} sx={{ color: '#64748B', '&:hover': { color: '#FB7185' } }}>
            <Add size={22} style={{ transform: 'rotate(45deg)' }} />
          </IconButton>
        </Stack>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: { xs: 1.5, md: 3 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* KPIs Row */}
        {kpis.length > 0 && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: `repeat(${kpis.length}, 1fr)` }, gap: 2 }}>
            {kpis.map((id, i) => renderPanel(id, i))}
          </Box>
        )}

        {/* Charts */}
        {charts.length > 0 && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: charts.length > 1 ? 'repeat(2, 1fr)' : '1fr' }, gap: 2 }}>
            {charts.map((id, i) => renderPanel(id, kpis.length + i))}
          </Box>
        )}

        {/* Tables / Lists */}
        {tables.length > 0 && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: tables.length > 1 ? `repeat(${Math.min(tables.length, 3)}, 1fr)` : '1fr' }, gap: 2 }}>
            {tables.map((id, i) => renderPanel(id, kpis.length + charts.length + i))}
          </Box>
        )}

        {/* Footer: Adversarios */}
        {has('tv-adversarios') && renderPanel('tv-adversarios', kpis.length + charts.length + tables.length)}
      </Box>

      {/* Config Drawer */}
      <TVConfigDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} config={config} onChange={handleConfigChange} />
    </Box>
  );
}
