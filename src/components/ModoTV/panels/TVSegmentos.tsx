'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SEGMENTOS_TABELA } from 'data/horus';

export default function TVSegmentos() {
  return (
    <Box sx={{ bgcolor: '#0F1219', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, p: 2, overflow: 'auto' }}>
      <Typography sx={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#475569', mb: 1.5 }}>
        Segmentos — Gabriel Souza
      </Typography>
      <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: '12px' }}>
        <Box component="thead">
          <Box component="tr" sx={{ bgcolor: '#111827' }}>
            {['Segmento', 'Voto', 'Rejeição', 'Var.'].map((h) => (
              <Box component="th" key={h} sx={{ textAlign: 'left', p: '8px 12px', color: '#64748B', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em', fontWeight: 600 }}>
                {h}
              </Box>
            ))}
          </Box>
        </Box>
        <Box component="tbody">
          {SEGMENTOS_TABELA.map((seg, i) => (
            <Box
              component="tr"
              key={seg.segmento}
              sx={{ bgcolor: i % 2 === 0 ? '#0F1219' : '#111827', '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' } }}
            >
              <Box component="td" sx={{ p: '8px 12px', color: '#E2E8F0' }}>{seg.segmento}</Box>
              <Box component="td" sx={{ p: '8px 12px', color: '#818CF8', fontWeight: 700 }}>{seg.voto}%</Box>
              <Box component="td" sx={{ p: '8px 12px', color: '#FB7185', fontWeight: 700 }}>{seg.rejeicao}%</Box>
              <Box component="td" sx={{ p: '8px 12px' }}>
                <Box
                  component="span"
                  sx={{
                    px: 1,
                    py: 0.25,
                    borderRadius: 1,
                    fontSize: '11px',
                    fontWeight: 700,
                    bgcolor: seg.variacao > 0 ? '#064E3B' : seg.variacao < 0 ? '#7F1D1D' : '#1E293B',
                    color: seg.variacao > 0 ? '#34D399' : seg.variacao < 0 ? '#FB7185' : '#94A3B8'
                  }}
                >
                  {seg.variacao > 0 ? '+' : ''}{seg.variacao}pp
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
