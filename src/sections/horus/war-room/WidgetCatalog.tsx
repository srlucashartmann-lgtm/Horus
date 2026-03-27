'use client';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Add, TickCircle } from '@wandersonalwes/iconsax-react';
import { WIDGET_REGISTRY } from './widgetRegistry';

interface Props {
  open: boolean;
  onClose: () => void;
  activeIds: string[];
  onAdd: (id: string) => void;
}

const categories = ['Gráficos', 'Tabelas e Listas', 'Ações e Status', 'Especiais'];

export default function WidgetCatalog({ open, onClose, activeIds, onAdd }: Props) {
  const grouped = categories.map((cat) => ({
    cat,
    widgets: WIDGET_REGISTRY.filter((w) => w.category === cat)
  }));

  return (
    <Drawer anchor="right" open={open} onClose={onClose} sx={{ '& .MuiDrawer-paper': { width: 320, p: 2.5 } }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Adicionar Widgets</Typography>
      {grouped.map((g) => (
        <Stack key={g.cat} sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>{g.cat}</Typography>
          <List disablePadding>
            {g.widgets.map((w) => {
              const isActive = activeIds.includes(w.id);
              return (
                <ListItem key={w.id} disablePadding sx={{ py: 0.5 }}>
                  <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 1 }}>
                    <Stack>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{w.title}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>{w.defaultW}x{w.defaultH}</Typography>
                    </Stack>
                    {isActive ? (
                      <Chip icon={<TickCircle size={14} />} label="Adicionado" size="small" color="success" variant="combined" sx={{ borderRadius: 1, fontSize: '0.65rem' }} />
                    ) : (
                      <Button size="small" variant="outlined" startIcon={<Add size={14} />} onClick={() => onAdd(w.id)} sx={{ fontSize: '0.7rem' }}>
                        Adicionar
                      </Button>
                    )}
                  </Stack>
                </ListItem>
              );
            })}
          </List>
        </Stack>
      ))}
    </Drawer>
  );
}
