'use client';

import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { SessaoCompleta } from 'data/horus';
import { Clock, Microphone2, People } from '@wandersonalwes/iconsax-react';

const sentimentoColors: Record<string, 'success' | 'error' | 'secondary' | 'warning'> = {
  Positivo: 'success', Negativo: 'error', Neutro: 'secondary', Misto: 'warning'
};
const statusColors: Record<string, 'success' | 'warning' | 'secondary'> = {
  Transcrito: 'success', Processando: 'warning', Pendente: 'secondary'
};
const btnColors: Record<string, 'success' | 'error' | 'secondary' | 'warning'> = {
  Positivo: 'success', Negativo: 'error', Neutro: 'secondary', Misto: 'warning'
};

interface Props {
  sessao: SessaoCompleta;
  onVerTranscricao: (sessao: SessaoCompleta) => void;
}

export default function SessaoCard({ sessao, onVerTranscricao }: Props) {
  const router = useRouter();

  return (
    <MainCard
      sx={{ cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 6 } }}
      onClick={() => router.push(`/qualitativo/sessoes/${sessao.id}`)}
    >
      <Stack sx={{ gap: 2 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
          <Stack sx={{ gap: 0.5 }}>
            <Typography variant="h5">{sessao.titulo}</Typography>
            <Stack direction="row" sx={{ gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
              <Chip label={sessao.sentimento} color={sentimentoColors[sessao.sentimento]} size="small" variant="light" sx={{ borderRadius: 1 }} data-tour="sessoes-status" />
              {sessao.status === 'Processando' ? (
                <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                  <Chip label={`Processando ${sessao.statusProgresso || 0}%`} color="warning" size="small" variant="light" sx={{ borderRadius: 1 }} />
                  <LinearProgress variant="determinate" value={sessao.statusProgresso || 0} sx={{ width: 60, height: 6, borderRadius: 3, '& .MuiLinearProgress-bar': { animation: 'none' } }} />
                </Stack>
              ) : (
                <Chip label={sessao.status} color={statusColors[sessao.status]} size="small" variant="light" sx={{ borderRadius: 1 }} />
              )}
            </Stack>
          </Stack>
          <Typography variant="subtitle2" color="text.secondary">{sessao.data}</Typography>
        </Stack>

        <Stack direction="row" sx={{ gap: 3, flexWrap: 'wrap' }}>
          <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center' }}><People size={16} /><Typography variant="caption">{sessao.participantes} participantes</Typography></Stack>
          <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center' }}><Clock size={16} /><Typography variant="caption">{sessao.duracao}</Typography></Stack>
          <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center' }}><Microphone2 size={16} /><Typography variant="caption">{sessao.moderador}</Typography></Stack>
        </Stack>

        <Stack direction="row" sx={{ gap: 0.75, flexWrap: 'wrap' }}>
          {sessao.tags.map((tag) => (
            <Chip key={tag} label={`#${tag}`} size="small" variant="outlined" color="primary" sx={{ borderRadius: 1, fontSize: '0.7rem' }} />
          ))}
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {sessao.resumo}
        </Typography>

        <Stack direction="row" sx={{ gap: 1 }} onClick={(e) => e.stopPropagation()}>
          <Button variant="contained" size="small" color={btnColors[sessao.sentimento]} onClick={() => router.push(`/qualitativo/sessoes/${sessao.id}`)} data-tour="sessoes-abrir">
            Abrir Sessão
          </Button>
          <Button variant="outlined" size="small" onClick={() => onVerTranscricao(sessao)}>
            Ver Transcrição
          </Button>
          <Tooltip title={sessao.transcricao.length === 0 ? 'Nenhum arquivo disponível' : ''}>
            <span>
              <Button variant="text" size="small" color="secondary" disabled={sessao.transcricao.length === 0}>
                Baixar Áudio
              </Button>
            </span>
          </Tooltip>
        </Stack>
      </Stack>
    </MainCard>
  );
}
