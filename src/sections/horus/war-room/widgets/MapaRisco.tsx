'use client';

import { useRouter } from 'next/navigation';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';

const MAPA = [
  { segmento: 'Mulheres 25-34', voto: 52, tend: '▲', cor: 'success' as const },
  { segmento: 'Homens 35-49', voto: 41, tend: '▼', cor: 'warning' as const },
  { segmento: 'Evangélicos', voto: 33, tend: '▼▼', cor: 'error' as const },
  { segmento: 'Classe C', voto: 44, tend: '→', cor: 'success' as const },
  { segmento: 'Jovens 16-24', voto: 58, tend: '▲▲', cor: 'success' as const },
  { segmento: 'Interior Norte', voto: 39, tend: '▼', cor: 'error' as const },
  { segmento: 'Classe A/B', voto: 35, tend: '▼', cor: 'warning' as const },
  { segmento: 'Mulheres 50+', voto: 48, tend: '▲', cor: 'success' as const }
];

const bg: Record<string, string> = { error: 'error.lighter', warning: 'warning.lighter', success: 'success.lighter' };
const border: Record<string, string> = { error: 'error.main', warning: 'warning.main', success: 'success.main' };

export default function MapaRisco() {
  const router = useRouter();
  return (
    <Grid container spacing={1.5}>
      {MAPA.map((s) => (
        <Grid key={s.segmento} size={{ xs: 6, sm: 3 }}>
          <MainCard
            border={false}
            contentSX={{ p: 1.5 }}
            sx={{ bgcolor: bg[s.cor], border: '1px solid', borderColor: border[s.cor], cursor: 'pointer', '&:hover': { boxShadow: 4 } }}
            onClick={() => router.push('/quantitativo/tracking')}
          >
            <Stack sx={{ gap: 0.25 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>{s.segmento}</Typography>
              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
                <Typography variant="h5">{s.voto}%</Typography>
                <Chip variant="combined" color={s.cor} label={s.tend} size="small" sx={{ borderRadius: 1, height: 20, fontSize: '0.65rem' }} />
              </Stack>
            </Stack>
          </MainCard>
        </Grid>
      ))}
    </Grid>
  );
}
