'use client';

import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DocumentText1, MessageQuestion, ExportSquare, VideoPlay } from '@wandersonalwes/iconsax-react';

const acoes = [
  { label: 'Gerar Síntese', icon: DocumentText1, href: '/inteligencia/sintese' },
  { label: 'Cheat Sheet', icon: MessageQuestion, href: '/inteligencia/sintese' },
  { label: 'Exportar p/ Ads', icon: ExportSquare, href: '#' },
  { label: 'Nova Quali', icon: VideoPlay, href: '/qualitativo/sessoes' }
];

export default function AcoesRapidas() {
  const router = useRouter();
  return (
    <Grid container spacing={1.5}>
      {acoes.map((a) => {
        const Icon = a.icon;
        return (
          <Grid key={a.label} size={6}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              startIcon={<Icon size={16} />}
              onClick={() => router.push(a.href)}
              sx={{ fontSize: '0.7rem', py: 1, textTransform: 'none' }}
            >
              {a.label}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
}
