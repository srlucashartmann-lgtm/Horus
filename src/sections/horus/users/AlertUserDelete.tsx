'use client';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { deleteHorusUser } from 'api/horus-users';
import { openSnackbar } from 'api/snackbar';
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';
import { Trash } from '@wandersonalwes/iconsax-react';
import { SnackbarProps } from 'types/snackbar';

interface Props {
  id: string;
  name: string;
  open: boolean;
  handleClose: () => void;
}

export default function AlertUserDelete({ id, name, open, handleClose }: Props) {
  const deleteHandler = async () => {
    try {
      await deleteHorusUser(id);
      openSnackbar({
        open: true,
        message: 'Usuário removido com sucesso',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        severity: 'success'
      } as SnackbarProps);
      handleClose();
    } catch (error: any) {
      openSnackbar({
        open: true,
        message: error.message || 'Erro ao remover usuário',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        severity: 'error'
      } as SnackbarProps);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} keepMounted slots={{ transition: PopupTransition }} maxWidth="xs">
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack sx={{ gap: 3.5, alignItems: 'center' }}>
          <Avatar color="error" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
            <Trash variant="Bold" />
          </Avatar>
          <Stack sx={{ gap: 2 }}>
            <Typography variant="h4" align="center">
              Tem certeza que deseja remover?
            </Typography>
            <Typography align="center">
              O usuário
              <Typography variant="subtitle1" component="span">
                {' '}
                &quot;{name}&quot;{' '}
              </Typography>
              será removido permanentemente.
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ gap: 2, width: 1 }}>
            <Button fullWidth onClick={handleClose} color="secondary" variant="outlined">
              Cancelar
            </Button>
            <Button fullWidth color="error" variant="contained" onClick={deleteHandler} autoFocus>
              Remover
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
