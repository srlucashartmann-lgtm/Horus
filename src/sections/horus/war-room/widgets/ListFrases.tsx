'use client';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dot from 'components/@extended/Dot';
import { FRASES_ELEITOR } from 'data/horus';

export default function ListFrases() {
  return (
    <Stack sx={{ gap: 0.5, height: '100%', justifyContent: 'space-between' }}>
      <List disablePadding>
        {FRASES_ELEITOR.slice(0, 5).map((f, i) => (
          <ListItem key={i} disablePadding sx={{ py: 0.75, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" sx={{ gap: 1, alignItems: 'flex-start', width: '100%' }}>
              <Dot color="primary" size={8} sx={{ mt: 0.75, flexShrink: 0 }} />
              <Stack sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ fontStyle: 'italic', fontWeight: 500 }}>
                  &quot;{f.frase}&quot;
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {f.autor} (x{f.mencoes})
                </Typography>
              </Stack>
            </Stack>
          </ListItem>
        ))}
      </List>
      <Button size="small" href="/qualitativo/clipes" sx={{ alignSelf: 'flex-start', mt: 1 }}>Ver biblioteca →</Button>
    </Stack>
  );
}
