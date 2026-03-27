'use client';

// next
import Link from 'next/link';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { SecuritySafe } from '@wandersonalwes/iconsax-react';

// project-imports
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';

// ==============================|| ACESSO RESTRITO ||============================== //

export default function AcessoRestritoPage() {
  const downSM = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const handleSolicitarAcesso = () => {
    openSnackbar({
      open: true,
      message: 'Solicitação enviada ao administrador.',
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
      variant: 'alert',
      alert: { variant: 'filled' },
      severity: 'success'
    } as SnackbarProps);
  };

  return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 200px)', gap: 3 }}>
      <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            width: { xs: 120, sm: 180 },
            height: { xs: 120, sm: 180 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            bgcolor: 'error.lighter',
            color: 'error.main'
          }}
        >
          <SecuritySafe size={downSM ? 64 : 96} variant="Bulk" />
        </Box>
      </Stack>
      <Stack sx={{ width: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Typography align="center" variant={downSM ? 'h2' : 'h1'}>
          Acesso Restrito
        </Typography>
        <Typography variant="body1" align="center" sx={{ color: 'text.secondary', width: { xs: '73%', sm: '70%' }, mt: 1 }}>
          Você não tem permissão para acessar esta página.
        </Typography>
        <Typography variant="body2" align="center" sx={{ color: 'text.disabled', width: { xs: '73%', sm: '60%' }, mt: 0.5 }}>
          Entre em contato com o administrador para solicitar acesso.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 2, mt: 4 }}>
          <Button component={Link} href="/war-room" variant="contained" sx={{ textTransform: 'none' }}>
            Voltar ao War Room
          </Button>
          <Button variant="outlined" sx={{ textTransform: 'none' }} onClick={handleSolicitarAcesso}>
            Solicitar Acesso
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
