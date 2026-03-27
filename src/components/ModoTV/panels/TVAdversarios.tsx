'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TRACKING_DATA, CANDIDATOS } from 'data/horus';

const latest = TRACKING_DATA[TRACKING_DATA.length - 1];
const maxPct = latest.gabriel; // Gabriel is the leader, used as 100% reference for bars

const adversarios = [
  { nome: CANDIDATOS.gabriel.nome, pct: latest.gabriel, color: '#818CF8', destaque: true },
  { nome: CANDIDATOS.juliana.nome, pct: latest.juliana, color: '#64748B', destaque: false },
  { nome: CANDIDATOS.zucco.nome, pct: latest.zucco, color: '#64748B', destaque: false },
  { nome: CANDIDATOS.edegar.nome, pct: latest.edegar, color: '#64748B', destaque: false },
  { nome: 'B/N', pct: latest.brancos, color: '#334155', destaque: false }
];

export default function TVAdversarios() {
  return (
    <Box
      sx={{
        bgcolor: '#0F1219',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        px: 3,
        py: 2.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        flexWrap: 'wrap'
      }}
    >
      {adversarios.map((a, i) => (
        <Box key={a.nome} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              px: { xs: 2, md: 5 },
              py: 1
            }}
          >
            <Typography
              sx={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: a.destaque ? '14px' : '11px',
                color: a.destaque ? '#818CF8' : '#64748B',
                fontWeight: a.destaque ? 700 : 400,
                mb: 0.5
              }}
            >
              {a.nome}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: a.destaque ? '32px' : '20px',
                fontWeight: 800,
                color: a.destaque ? '#818CF8' : '#94A3B8',
                lineHeight: 1,
                textShadow: a.destaque ? '0 0 40px rgba(129,140,248,0.3)' : 'none'
              }}
            >
              {a.pct}%
            </Typography>
            {/* Progress bar */}
            <Box
              sx={{
                mt: 1,
                width: 80,
                height: 3,
                bgcolor: 'rgba(255,255,255,0.04)',
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  width: `${(a.pct / maxPct) * 100}%`,
                  height: '100%',
                  bgcolor: a.destaque ? '#818CF8' : '#475569',
                  borderRadius: 2,
                  transition: 'width 1s ease'
                }}
              />
            </Box>
          </Box>
          {i < adversarios.length - 1 && (
            <Box sx={{ width: '1px', height: 50, bgcolor: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />
          )}
        </Box>
      ))}
    </Box>
  );
}
