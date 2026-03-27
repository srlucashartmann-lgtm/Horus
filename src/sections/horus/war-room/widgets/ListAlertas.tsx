'use client';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ALERTAS_ATIVOS } from 'data/horus';

const sevColor: Record<string, 'error' | 'warning' | 'success'> = { critico: 'error', atencao: 'warning', positivo: 'success' };
const sevLabel: Record<string, string> = { critico: 'CRÍTICO', atencao: 'ATENÇÃO', positivo: 'POSITIVO' };

type ListAlertasProps = {
  limit?: number;
  showFooter?: boolean;
};

export default function ListAlertas({ limit, showFooter = true }: ListAlertasProps) {
  const rows = limit != null ? ALERTAS_ATIVOS.slice(0, limit) : ALERTAS_ATIVOS;

  return (
    <Stack sx={{ gap: 0, width: '100%' }}>
      {rows.map((a, i) => (
        <Stack
          key={a.id}
          direction="row"
          spacing={1}
          alignItems="flex-start"
          sx={{
            width: '100%',
            py: 1.25,
            borderBottom: i < rows.length - 1 ? '1px solid' : 'none',
            borderColor: 'divider'
          }}
        >
          <Chip
            label={sevLabel[a.severidade]}
            color={sevColor[a.severidade]}
            size="small"
            sx={{
              borderRadius: 1,
              fontWeight: 700,
              height: 22,
              fontSize: '0.6rem',
              minWidth: 64,
              maxWidth: 72,
              flexShrink: 0,
              mt: 0.25,
              '& .MuiChip-label': { px: 0.75, whiteSpace: 'nowrap' }
            }}
          />
          <Stack spacing={0.5} sx={{ flex: 1, width: '100%', minWidth: 0 }}>
            <Typography
              component="div"
              sx={{
                fontSize: 12,
                fontWeight: 500,
                lineHeight: 1.45,
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                overflow: 'visible',
                textOverflow: 'clip',
                display: 'block'
              }}
            >
              {a.titulo}
            </Typography>
            <Typography component="div" sx={{ fontSize: 11, color: 'text.disabled' }}>
              {a.tempoAtras}
            </Typography>
          </Stack>
        </Stack>
      ))}
      {showFooter && (
        <Button size="small" href="/inteligencia/alertas" sx={{ alignSelf: 'flex-start', mt: 1 }}>
          Ver todos →
        </Button>
      )}
    </Stack>
  );
}
