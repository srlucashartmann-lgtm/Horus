'use client';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Add } from '@wandersonalwes/iconsax-react';

export type LayoutPreset = '4-numeros' | 'kpis-grafico' | 'grafico-full' | 'centro-operacoes' | 'customizado';

export const PANEL_CATALOG = [
  { id: 'tv-intencao', label: 'Intenção de Voto' },
  { id: 'tv-rejeicao', label: 'Rejeição' },
  { id: 'tv-aprovacao', label: 'Aprovação Gov' },
  { id: 'tv-gap', label: 'Gap vs 2º Lugar' },
  { id: 'tv-tracking-line', label: 'Tracking (Linha)' },
  { id: 'tv-tracking-area', label: 'Tracking (Área)' },
  { id: 'tv-barras-rejeicao', label: 'Barras Rejeição' },
  { id: 'tv-donut-cenario', label: 'Donut Cenário' },
  { id: 'tv-segmentos', label: 'Tabela Segmentos' },
  { id: 'tv-alertas', label: 'Alertas' },
  { id: 'tv-mapa-risco', label: 'Mapa de Risco' },
  { id: 'tv-adversarios', label: 'Placar Adversários' }
] as const;

export type PanelId = (typeof PANEL_CATALOG)[number]['id'];

export const LAYOUT_PRESETS: Record<LayoutPreset, PanelId[]> = {
  '4-numeros': ['tv-intencao', 'tv-rejeicao', 'tv-aprovacao', 'tv-gap'],
  'kpis-grafico': ['tv-intencao', 'tv-rejeicao', 'tv-aprovacao', 'tv-gap', 'tv-tracking-line', 'tv-adversarios'],
  'grafico-full': ['tv-tracking-line'],
  'centro-operacoes': PANEL_CATALOG.map((p) => p.id) as unknown as PanelId[],
  customizado: []
};

export interface TVConfig {
  layout: LayoutPreset;
  enabledPanels: PanelId[];
  autoRefresh: number;
  rotation: boolean;
}

export const DEFAULT_TV_CONFIG: TVConfig = {
  layout: 'kpis-grafico',
  enabledPanels: ['tv-intencao', 'tv-rejeicao', 'tv-aprovacao', 'tv-gap', 'tv-tracking-line', 'tv-adversarios'],
  autoRefresh: 60,
  rotation: false
};

interface Props {
  open: boolean;
  onClose: () => void;
  config: TVConfig;
  onChange: (config: TVConfig) => void;
}

export default function TVConfigDrawer({ open, onClose, config, onChange }: Props) {
  const handleTogglePanel = (panelId: PanelId) => {
    const panels = config.enabledPanels.includes(panelId)
      ? config.enabledPanels.filter((p) => p !== panelId)
      : [...config.enabledPanels, panelId];
    onChange({ ...config, enabledPanels: panels, layout: 'customizado' });
  };

  const handleLayoutChange = (layout: LayoutPreset) => {
    if (layout === 'customizado') {
      onChange({ ...config, layout });
    } else {
      onChange({ ...config, layout, enabledPanels: [...LAYOUT_PRESETS[layout]] });
    }
  };

  const handleReset = () => {
    onChange({ ...DEFAULT_TV_CONFIG });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ zIndex: 10000 }}
      slotProps={{ paper: { sx: { width: 340, bgcolor: '#0F1117', color: '#E2E8F0', borderLeft: '1px solid rgba(255,255,255,0.06)' } } }}
    >
      <Stack sx={{ p: 2.5, gap: 3, height: '100%' }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ color: '#E2E8F0', fontFamily: 'monospace' }}>Configurar Painéis</Typography>
          <IconButton onClick={onClose} sx={{ color: '#64748B' }}>
            <Add size={24} style={{ transform: 'rotate(45deg)' }} />
          </IconButton>
        </Stack>

        {/* Layout preset */}
        <Box>
          <Typography sx={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 1, fontFamily: 'monospace' }}>
            Layout
          </Typography>
          <Select
            fullWidth
            size="small"
            value={config.layout}
            onChange={(e) => handleLayoutChange(e.target.value as LayoutPreset)}
            sx={{ bgcolor: '#1A1F2E', color: '#E2E8F0', fontFamily: 'monospace', fontSize: '13px', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' }, '& .MuiSvgIcon-root': { color: '#64748B' } }}
            MenuProps={{ PaperProps: { sx: { bgcolor: '#1A1F2E', color: '#E2E8F0' } } }}
          >
            <MenuItem value="4-numeros">4 Números</MenuItem>
            <MenuItem value="kpis-grafico">KPIs + Gráfico (Padrão)</MenuItem>
            <MenuItem value="grafico-full">Gráfico Full</MenuItem>
            <MenuItem value="centro-operacoes">Centro de Operações</MenuItem>
            <MenuItem value="customizado">Customizado</MenuItem>
          </Select>
        </Box>

        {/* Panel toggles */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Typography sx={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 1, fontFamily: 'monospace' }}>
            Painéis
          </Typography>
          <Stack sx={{ gap: 0.5 }}>
            {PANEL_CATALOG.map((panel) => (
              <Stack
                key={panel.id}
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center', py: 0.5, px: 1, borderRadius: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' } }}
              >
                <Typography sx={{ fontSize: '13px', color: '#CBD5E1', fontFamily: 'monospace' }}>{panel.label}</Typography>
                <Switch
                  size="small"
                  checked={config.enabledPanels.includes(panel.id)}
                  onChange={() => handleTogglePanel(panel.id)}
                  sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#818CF8' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#818CF8' } }}
                />
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Auto-refresh */}
        <Box>
          <Typography sx={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 1, fontFamily: 'monospace' }}>
            Auto-refresh
          </Typography>
          <Select
            fullWidth
            size="small"
            value={config.autoRefresh}
            onChange={(e) => onChange({ ...config, autoRefresh: Number(e.target.value) })}
            sx={{ bgcolor: '#1A1F2E', color: '#E2E8F0', fontFamily: 'monospace', fontSize: '13px', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' }, '& .MuiSvgIcon-root': { color: '#64748B' } }}
            MenuProps={{ PaperProps: { sx: { bgcolor: '#1A1F2E', color: '#E2E8F0' } } }}
          >
            <MenuItem value={30}>30 segundos</MenuItem>
            <MenuItem value={60}>1 minuto</MenuItem>
            <MenuItem value={300}>5 minutos</MenuItem>
            <MenuItem value={0}>Desligado</MenuItem>
          </Select>
        </Box>

        {/* Rotation */}
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography sx={{ fontSize: '13px', color: '#CBD5E1', fontFamily: 'monospace' }}>Rotação Automática</Typography>
            <Typography sx={{ fontSize: '10px', color: '#475569', fontFamily: 'monospace' }}>Alterna layouts a cada 30s</Typography>
          </Box>
          <Switch
            checked={config.rotation}
            onChange={(e) => onChange({ ...config, rotation: e.target.checked })}
            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#818CF8' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#818CF8' } }}
          />
        </Stack>

        {/* Actions */}
        <Stack direction="row" sx={{ gap: 1.5 }}>
          <Button fullWidth variant="contained" onClick={onClose} sx={{ bgcolor: '#818CF8', fontFamily: 'monospace', textTransform: 'none', '&:hover': { bgcolor: '#6366F1' } }}>
            Salvar
          </Button>
          <Button fullWidth variant="outlined" onClick={handleReset} sx={{ borderColor: 'rgba(255,255,255,0.1)', color: '#94A3B8', fontFamily: 'monospace', textTransform: 'none', '&:hover': { borderColor: 'rgba(255,255,255,0.2)' } }}>
            Restaurar Padrão
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
