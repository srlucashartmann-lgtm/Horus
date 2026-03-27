'use client';

import { useRouter } from 'next/navigation';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import { Clipe, TAG_CORES } from 'data/horus';
import { Copy, DocumentDownload, Play, Star1 } from '@wandersonalwes/iconsax-react';

const sentAvatarBg: Record<string, string> = { Positivo: '#E8F5E9', Negativo: '#FFEBEE', Neutro: '#ECEFF1' };
const sentAvatarColor: Record<string, string> = { Positivo: '#2E7D32', Negativo: '#C62828', Neutro: '#546E7A' };

interface Props {
  clipe: Clipe;
  onToggleFav: (id: number) => void;
}

export default function ClipeCard({ clipe, onToggleFav }: Props) {
  const router = useRouter();
  const initials = clipe.participante.nome.split(' ').map((n) => n[0]).join('').slice(0, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${clipe.frase}" — ${clipe.participante.nome}, ${clipe.participante.idade}, ${clipe.participante.perfil}`);
    openSnackbar({ open: true, message: 'Frase copiada!', variant: 'alert', severity: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } } as SnackbarProps);
  };

  return (
    <MainCard sx={{ transition: 'all 0.2s', '&:hover': { boxShadow: 6, borderColor: 'primary.light' } }}>
      <Stack sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
          &ldquo;{clipe.frase}&rdquo;
        </Typography>

        <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center' }}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: sentAvatarBg[clipe.sentimento], color: sentAvatarColor[clipe.sentimento], fontSize: 14, fontWeight: 700 }}>
            {initials}
          </Avatar>
          <Stack>
            <Typography variant="subtitle2">{clipe.participante.nome}, {clipe.participante.idade} anos</Typography>
            <Typography variant="caption" color="text.secondary">{clipe.participante.perfil}</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" sx={{ gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
          <Chip
            label={clipe.sessao}
            size="small"
            variant="outlined"
            sx={{ borderRadius: 1, cursor: 'pointer' }}
            onClick={() => router.push(`/qualitativo/sessoes/${clipe.sessaoId}`)}
          />
          <Typography variant="caption" color="primary">[{clipe.timestamp}]</Typography>
          <Typography variant="caption" color="text.secondary">{clipe.data}</Typography>
          {clipe.mencoes > 1 && <Chip label={`×${clipe.mencoes} menções`} size="small" variant="light" color="secondary" sx={{ borderRadius: 1 }} />}
        </Stack>

        <Stack direction="row" sx={{ gap: 0.5, flexWrap: 'wrap' }}>
          {clipe.tags.map((tag) => (
            <Chip key={tag} label={tag.replace(/_/g, ' ')} size="small" sx={{ borderRadius: 1, bgcolor: `${TAG_CORES[tag] || '#78909C'}18`, color: TAG_CORES[tag] || '#78909C', fontWeight: 500, fontSize: '0.7rem' }} />
          ))}
        </Stack>

        <Stack direction="row" sx={{ gap: 0.5 }}>
          <Tooltip title="Reproduzir"><IconButton size="small" color="primary"><Play size={18} /></IconButton></Tooltip>
          <Tooltip title={clipe.favorito ? 'Remover dos favoritos' : 'Favoritar'}>
            <IconButton size="small" onClick={() => onToggleFav(clipe.id)} sx={{ color: clipe.favorito ? '#FFB300' : 'text.secondary' }} data-tour="clipes-favorito">
              <Star1 size={18} variant={clipe.favorito ? 'Bold' : 'Linear'} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copiar frase"><IconButton size="small" color="secondary" onClick={handleCopy}><Copy size={18} /></IconButton></Tooltip>
          <Tooltip title="Download"><IconButton size="small" color="secondary" onClick={() => openSnackbar({ open: true, message: 'Download em desenvolvimento', variant: 'alert', severity: 'info', anchorOrigin: { vertical: 'top', horizontal: 'right' } } as SnackbarProps)}><DocumentDownload size={18} /></IconButton></Tooltip>
        </Stack>
      </Stack>
    </MainCard>
  );
}
