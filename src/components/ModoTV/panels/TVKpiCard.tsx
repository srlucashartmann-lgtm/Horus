'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface TVKpiCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  color: string;
}

export default function TVKpiCard({ label, value, delta, deltaPositive = true, color }: TVKpiCardProps) {
  // Unique animation name based on color to avoid conflicts
  const animId = `glow_${color.replace('#', '')}`;

  return (
    <Box
      sx={{
        background: `linear-gradient(180deg, #0F1219 0%, ${color}0D 100%)`,
        border: `1px solid ${color}26`,
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 3, md: 5 },
        px: 2,
        minHeight: { xs: 160, md: 220 }
      }}
    >
      <Typography
        sx={{
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#475569',
          mb: 1
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
          fontSize: 'clamp(48px, 8vw, 120px)',
          fontWeight: 800,
          color,
          lineHeight: 1,
          textShadow: `0 0 80px ${color}4D, 0 0 40px ${color}33, 0 0 120px ${color}1A`,
          [`@keyframes ${animId}`]: {
            '0%, 100%': { textShadow: `0 0 80px ${color}4D, 0 0 40px ${color}33, 0 0 120px ${color}1A` },
            '50%': { textShadow: `0 0 100px ${color}66, 0 0 60px ${color}4D, 0 0 160px ${color}26` }
          },
          animation: `${animId} 4s ease-in-out infinite`
        }}
      >
        {value}
      </Typography>
      {delta && (
        <Box
          sx={{
            mt: 1.5,
            px: 2,
            py: 0.5,
            borderRadius: 10,
            bgcolor: `${color}14`,
            border: `1px solid ${color}25`,
            display: 'inline-flex',
            alignItems: 'center'
          }}
        >
          <Typography
            sx={{
              fontFamily: '"JetBrains Mono", "Fira Code", monospace',
              fontSize: '14px',
              fontWeight: 600,
              color
            }}
          >
            {deltaPositive ? '\u25B2' : '\u25BC'} {delta}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
