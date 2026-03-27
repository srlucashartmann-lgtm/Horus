'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SEGMENTOS_TABELA } from 'data/horus';

function getRisco(variacao: number) {
  if (variacao >= 2) return { bg: '#064E3B', border: '#10B981', color: '#34D399', label: 'POSITIVO' };
  if (variacao <= -2) return { bg: '#7F1D1D', border: '#EF4444', color: '#FCA5A5', label: 'CRÍTICO' };
  return { bg: '#78350F', border: '#F59E0B', color: '#FDE68A', label: 'ATENÇÃO' };
}

export default function TVMapaRisco() {
  return (
    <Box sx={{ bgcolor: '#0F1219', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, p: 2 }}>
      <Typography sx={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#475569', mb: 1.5 }}>
        Mapa de Risco por Segmento
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 1.5 }}>
        {SEGMENTOS_TABELA.map((seg) => {
          const risco = getRisco(seg.variacao);
          return (
            <Box
              key={seg.segmento}
              sx={{ bgcolor: risco.bg, border: `1px solid ${risco.border}`, borderRadius: 1.5, p: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}
            >
              <Typography sx={{ fontFamily: 'monospace', fontSize: '10px', color: risco.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {risco.label}
              </Typography>
              <Typography sx={{ fontFamily: 'monospace', fontSize: '13px', color: '#E2E8F0', fontWeight: 600 }}>
                {seg.segmento}
              </Typography>
              <Typography sx={{ fontFamily: 'monospace', fontSize: '22px', color: '#818CF8', fontWeight: 800 }}>
                {seg.voto}%
              </Typography>
              <Typography sx={{ fontFamily: 'monospace', fontSize: '11px', color: risco.color }}>
                {seg.variacao > 0 ? '+' : ''}{seg.variacao}pp
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
