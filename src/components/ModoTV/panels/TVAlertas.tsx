'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ALERTAS } from 'data/horus';

const TIPO_CONFIG = {
  critico: { bg: '#7F1D1D', border: '#EF4444', color: '#FCA5A5', label: 'CRÍTICO' },
  atencao: { bg: '#78350F', border: '#F59E0B', color: '#FDE68A', label: 'ATENÇÃO' },
  positivo: { bg: '#064E3B', border: '#10B981', color: '#6EE7B7', label: 'POSITIVO' }
};

export default function TVAlertas() {
  return (
    <Box sx={{ bgcolor: '#0F1219', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, p: 2, maxHeight: 400, overflow: 'auto' }}>
      <Typography sx={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#475569', mb: 1.5 }}>
        Alertas Ativos
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {ALERTAS.map((alerta, i) => {
          const cfg = TIPO_CONFIG[alerta.tipo];
          return (
            <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, p: 1.5, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.02)' }}>
              <Box sx={{ px: 1, py: 0.25, borderRadius: 0.5, bgcolor: cfg.bg, border: `1px solid ${cfg.border}`, flexShrink: 0 }}>
                <Typography sx={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 700, color: cfg.color, letterSpacing: '0.05em' }}>
                  {cfg.label}
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: 'monospace', fontSize: '11px', color: '#CBD5E1', lineHeight: 1.5 }}>
                {alerta.texto}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
