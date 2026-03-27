'use client';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import { Clipe, TAG_CORES } from 'data/horus';
import { DocumentText1, Play, Sms, Trash } from '@wandersonalwes/iconsax-react';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  favoritos: Clipe[];
  total: number;
  onRemoveFav: (id: number) => void;
}

export default function DestaquesSemana({ favoritos, total, onRemoveFav }: Props) {
  const handleExport = () => {
    openSnackbar({ open: true, message: 'Exportação de briefing em desenvolvimento', variant: 'alert', severity: 'info', anchorOrigin: { vertical: 'top', horizontal: 'right' } } as SnackbarProps);
  };

  return (
    <MainCard
      title={
        <Stack sx={{ gap: 0.5 }}>
          <Typography variant="h5">⭐ Destaques da Semana</Typography>
          <Typography variant="caption" color="text.secondary">Clipes selecionados para o briefing do candidato</Typography>
        </Stack>
      }
      sx={{ position: 'sticky', top: 80 }}
    >
      <Stack sx={{ gap: 2 }}>
        {favoritos.length === 0 ? (
          <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
            Nenhum clipe favoritado. Clique em ⭐ para adicionar.
          </Typography>
        ) : (
          <Stack sx={{ gap: 1.5 }}>
            {favoritos.map((c) => (
              <Stack key={c.id} sx={{ gap: 0.5 }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center', flex: 1, minWidth: 0 }}>
                    <Tooltip title="Reproduzir">
                      <IconButton size="small" color="primary" sx={{ p: 0.25 }}>
                        <Play size={14} />
                      </IconButton>
                    </Tooltip>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', flex: 1, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      &ldquo;{c.frase}&rdquo;
                    </Typography>
                  </Stack>
                  <Tooltip title="Remover">
                    <IconButton size="small" onClick={() => onRemoveFav(c.id)} sx={{ ml: 0.5 }}>
                      <Trash size={14} />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">{c.participante.nome}</Typography>
                  {c.tags[0] && <Chip label={c.tags[0].replace(/_/g, ' ')} size="small" sx={{ borderRadius: 1, height: 18, fontSize: '0.65rem', bgcolor: `${TAG_CORES[c.tags[0]] || '#78909C'}18`, color: TAG_CORES[c.tags[0]] || '#78909C' }} />}
                </Stack>
                <Divider />
              </Stack>
            ))}
          </Stack>
        )}

        <Typography variant="caption" color="text.secondary" align="center">
          {favoritos.length} de {total} clipes selecionados
        </Typography>

        <Stack sx={{ gap: 1 }}>
          <Button variant="contained" size="small" fullWidth startIcon={<DocumentText1 size={16} />} onClick={handleExport}>
            Exportar Briefing PDF
          </Button>
          <Button variant="outlined" size="small" fullWidth startIcon={<Sms size={16} />} onClick={handleExport}>
            Enviar por e-mail
          </Button>
        </Stack>
      </Stack>
    </MainCard>
  );
}
