'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SINTESE_RESUMO } from 'data/horus';

export default function ResumoSemanal() {
  return (
    <Stack sx={{ gap: 1.5, height: '100%', justifyContent: 'space-between' }}>
      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
        {SINTESE_RESUMO}
      </Typography>
      <Button size="small" href="/inteligencia/sintese" sx={{ alignSelf: 'flex-start' }}>Ler síntese completa →</Button>
    </Stack>
  );
}
