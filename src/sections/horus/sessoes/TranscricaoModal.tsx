'use client';

import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SimpleBar from 'components/third-party/SimpleBar';
import { SessaoCompleta } from 'data/horus';

interface Props {
  sessao: SessaoCompleta | null;
  open: boolean;
  onClose: () => void;
}

export default function TranscricaoModal({ sessao, open, onClose }: Props) {
  const router = useRouter();
  if (!sessao) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{sessao.titulo} — Transcrição</DialogTitle>
      <DialogContent dividers>
        {sessao.transcricao.length === 0 ? (
          <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>Transcrição não disponível.</Typography>
        ) : (
          <SimpleBar style={{ maxHeight: 400 }}>
            <Stack sx={{ gap: 2 }}>
              {sessao.transcricao.map((fala, idx) => {
                const color = fala.tipo === 'moderador' ? '#1565C0' : '#C62828';
                return (
                  <Stack key={idx} sx={{ gap: 0.25 }}>
                    <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                      <Typography variant="subtitle2" sx={{ color, fontWeight: 700 }}>{fala.speaker}</Typography>
                      <Typography variant="caption" color="primary">[{fala.timestamp}]</Typography>
                    </Stack>
                    <Typography variant="body2">{fala.texto}</Typography>
                  </Stack>
                );
              })}
            </Stack>
          </SimpleBar>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Fechar</Button>
        <Button variant="contained" onClick={() => { onClose(); router.push(`/qualitativo/sessoes/${sessao.id}`); }}>Abrir Página Completa</Button>
      </DialogActions>
    </Dialog>
  );
}
