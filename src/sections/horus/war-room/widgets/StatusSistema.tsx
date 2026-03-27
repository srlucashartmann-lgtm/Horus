'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Dot from 'components/@extended/Dot';

const items = [
  { label: 'Deepgram API', status: 'Online', color: 'success' as const },
  { label: 'Tracking #18', status: 'Atualizado', color: 'success' as const },
  { label: 'Transcrição #3', status: '67%', color: 'warning' as const, progress: 67 }
];

export default function StatusSistema() {
  return (
    <Stack sx={{ gap: 1.5 }}>
      {items.map((item) => (
        <Stack key={item.label} direction="row" sx={{ alignItems: 'center', gap: 1 }}>
          <Dot color={item.color} size={10} />
          <Typography variant="caption" sx={{ flex: 1 }}>{item.label}</Typography>
          {item.progress ? (
            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, minWidth: 80 }}>
              <LinearProgress variant="determinate" value={item.progress} sx={{ flex: 1, height: 4, borderRadius: 2 }} />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>{item.status}</Typography>
            </Stack>
          ) : (
            <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>{item.status}</Typography>
          )}
        </Stack>
      ))}
    </Stack>
  );
}
