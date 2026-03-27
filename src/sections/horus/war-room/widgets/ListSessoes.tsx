'use client';

import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SESSOES_QUALITATIVAS } from 'data/horus';

const sentimentoColor: Record<string, 'success' | 'warning' | 'error' | 'secondary'> = {
  Positivo: 'success', Neutro: 'warning', Negativo: 'error', Misto: 'secondary'
};

export default function ListSessoes() {
  return (
    <Stack sx={{ gap: 0.5, height: '100%', justifyContent: 'space-between' }}>
      <List disablePadding>
        {SESSOES_QUALITATIVAS.map((s, i) => (
          <ListItem key={i} disablePadding sx={{ py: 0.75, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Stack sx={{ gap: 0.25, width: '100%' }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }} noWrap>{s.titulo}</Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled', flexShrink: 0, ml: 1 }}>{s.data}</Typography>
              </Stack>
              <Stack direction="row" sx={{ gap: 0.5 }}>
                <Chip label={s.sentimento} color={sentimentoColor[s.sentimento]} size="small" variant="combined" sx={{ borderRadius: 1, height: 18, fontSize: '0.6rem' }} />
                <Chip label={s.status} size="small" variant="outlined" sx={{ borderRadius: 1, height: 18, fontSize: '0.6rem' }} />
              </Stack>
            </Stack>
          </ListItem>
        ))}
      </List>
      <Button size="small" href="/qualitativo/sessoes" sx={{ alignSelf: 'flex-start', mt: 1 }}>Ver acervo →</Button>
    </Stack>
  );
}
