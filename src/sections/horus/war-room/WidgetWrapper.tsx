'use client';

import { useState, MouseEvent, ReactNode } from 'react';

// material-ui
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import MoreIcon from 'components/@extended/MoreIcon';

// assets
import { ExportSquare, Maximize4, Trash } from '@wandersonalwes/iconsax-react';

interface Props {
  title: string;
  children: ReactNode;
  href?: string;
  onRemove?: () => void;
  editing?: boolean;
}

export default function WidgetWrapper({ title, children, href, onRemove, editing }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const open = Boolean(anchorEl);

  return (
    <>
      <MainCard
        title={title}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '& .MuiCardContent-root': { flex: 1, overflow: 'auto', p: 1.5 },
          ...(editing && { border: '2px dashed', borderColor: 'primary.main', opacity: 0.95 })
        }}
        secondary={
          <>
            <IconButton color="secondary" onClick={(e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)}>
              <MoreIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              slotProps={{ list: { sx: { p: 1, minWidth: 180 } } }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <ListItemButton onClick={() => { setExpanded(true); setAnchorEl(null); }}>
                <ListItemIcon sx={{ minWidth: 28 }}><Maximize4 size={16} /></ListItemIcon>
                <ListItemText primary="Expandir" slotProps={{ primary: { variant: 'body2' } }} />
              </ListItemButton>
              {href && (
                <ListItemButton component="a" href={href} onClick={() => setAnchorEl(null)}>
                  <ListItemIcon sx={{ minWidth: 28 }}><ExportSquare size={16} /></ListItemIcon>
                  <ListItemText primary="Ir para página" slotProps={{ primary: { variant: 'body2' } }} />
                </ListItemButton>
              )}
              {onRemove && (
                <ListItemButton onClick={() => { onRemove(); setAnchorEl(null); }} sx={{ color: 'error.main' }}>
                  <ListItemIcon sx={{ minWidth: 28, color: 'inherit' }}><Trash size={16} /></ListItemIcon>
                  <ListItemText primary="Remover do layout" slotProps={{ primary: { variant: 'body2' } }} />
                </ListItemButton>
              )}
            </Menu>
          </>
        }
      >
        {children}
      </MainCard>

      <Dialog open={expanded} onClose={() => setExpanded(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">{title}</Typography>
            <IconButton color="secondary" onClick={() => setExpanded(false)}>
              <Maximize4 size={18} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ minHeight: 400 }}>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}
