'use client';

import { useEffect } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// third-party
import * as Yup from 'yup';
import { useFormik } from 'formik';

// project-imports
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import AnimateButton from 'components/@extended/AnimateButton';
import { insertHorusUser, updateHorusUser } from 'api/horus-users';
import { openSnackbar } from 'api/snackbar';
import { ALL_PERMISSIONS, PERMISSION_LABELS, HorusUserPublic, Permission } from 'types/horus';
import { SnackbarProps } from 'types/snackbar';

interface Props {
  open: boolean;
  onClose: () => void;
  user?: HorusUserPublic | null;
}

export default function UserModal({ open, onClose, user }: Props) {
  const isEdit = Boolean(user);

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Nome é obrigatório'),
    email: Yup.string().email('Email inválido').max(255).required('Email é obrigatório'),
    password: isEdit ? Yup.string() : Yup.string().min(6, 'Mínimo 6 caracteres').required('Senha é obrigatória'),
    role: Yup.string().oneOf(['admin', 'analista']).required('Perfil é obrigatório')
  });

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      role: user?.role || 'analista',
      permissions: user?.permissions || [] as string[]
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (isEdit && user) {
          const updateData: any = {
            name: values.name,
            email: values.email,
            role: values.role,
            permissions: values.role === 'admin' ? [...ALL_PERMISSIONS] : values.permissions
          };
          if (values.password) {
            updateData.password = values.password;
          }
          await updateHorusUser(user.id, updateData);
          openSnackbar({
            open: true,
            message: 'Usuário atualizado com sucesso',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            variant: 'alert',
            severity: 'success'
          } as SnackbarProps);
        } else {
          await insertHorusUser({
            name: values.name,
            email: values.email,
            password: values.password,
            role: values.role,
            permissions: values.role === 'admin' ? [...ALL_PERMISSIONS] : values.permissions
          });
          openSnackbar({
            open: true,
            message: 'Usuário criado com sucesso',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            variant: 'alert',
            severity: 'success'
          } as SnackbarProps);
        }
        resetForm();
        onClose();
      } catch (error: any) {
        openSnackbar({
          open: true,
          message: error.message || 'Erro ao salvar usuário',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          severity: 'error'
        } as SnackbarProps);
      } finally {
        setSubmitting(false);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values, setFieldValue } = formik;

  const isAdmin = values.role === 'admin';

  const handleTogglePermission = (perm: Permission) => {
    const current = values.permissions as string[];
    if (current.includes(perm)) {
      setFieldValue(
        'permissions',
        current.filter((p) => p !== perm)
      );
    } else {
      setFieldValue('permissions', [...current, perm]);
    }
  };

  const handleSelectAll = () => {
    setFieldValue('permissions', [...ALL_PERMISSIONS]);
  };

  const handleClearAll = () => {
    setFieldValue('permissions', []);
  };

  useEffect(() => {
    if (isAdmin) {
      setFieldValue('permissions', [...ALL_PERMISSIONS]);
    }
  }, [isAdmin, setFieldValue]);

  return (
    <>
      {open && (
        <Modal open={open} onClose={onClose} aria-labelledby="user-modal-title">
          <MainCard
            sx={{
              minWidth: { xs: 340, sm: 500, md: 680 },
              maxWidth: 680,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxHeight: '90vh'
            }}
            modal
            content={false}
          >
            <SimpleBar sx={{ maxHeight: 'calc(90vh - 48px)' }}>
              <form onSubmit={handleSubmit}>
                <DialogTitle>{isEdit ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
                <Divider />
                <DialogContent sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid size={12}>
                      <Stack sx={{ gap: 1 }}>
                        <InputLabel htmlFor="user-name">Nome</InputLabel>
                        <TextField
                          id="user-name"
                          fullWidth
                          placeholder="Nome completo"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Stack>
                    </Grid>
                    <Grid size={12}>
                      <Stack sx={{ gap: 1 }}>
                        <InputLabel htmlFor="user-email">Email</InputLabel>
                        <TextField
                          id="user-email"
                          fullWidth
                          type="email"
                          placeholder="email@exemplo.com"
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Stack>
                    </Grid>
                    <Grid size={12}>
                      <Stack sx={{ gap: 1 }}>
                        <InputLabel htmlFor="user-password">{isEdit ? 'Nova Senha (deixe vazio para manter)' : 'Senha'}</InputLabel>
                        <TextField
                          id="user-password"
                          fullWidth
                          type="password"
                          placeholder={isEdit ? '••••••' : 'Mínimo 6 caracteres'}
                          {...getFieldProps('password')}
                          error={Boolean(touched.password && errors.password)}
                          helperText={touched.password && errors.password}
                        />
                      </Stack>
                    </Grid>
                    <Grid size={12}>
                      <Stack sx={{ gap: 1 }}>
                        <InputLabel htmlFor="user-role">Perfil</InputLabel>
                        <FormControl fullWidth error={Boolean(touched.role && errors.role)}>
                          <Select id="user-role" {...getFieldProps('role')}>
                            <MenuItem value="admin">Administrador</MenuItem>
                            <MenuItem value="analista">Analista</MenuItem>
                          </Select>
                          {touched.role && errors.role && <FormHelperText error>{errors.role}</FormHelperText>}
                        </FormControl>
                      </Stack>
                    </Grid>

                    <Grid size={12}>
                      <Divider />
                    </Grid>

                    <Grid size={12}>
                      <Stack sx={{ gap: 2 }}>
                        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="h5">Permissões de Acesso</Typography>
                          {!isAdmin && (
                            <Stack direction="row" sx={{ gap: 1 }}>
                              <Button size="small" variant="outlined" onClick={handleSelectAll}>
                                Selecionar todos
                              </Button>
                              <Button size="small" variant="outlined" color="secondary" onClick={handleClearAll}>
                                Limpar todos
                              </Button>
                            </Stack>
                          )}
                        </Stack>
                        {isAdmin && (
                          <Typography variant="body2" color="text.secondary">
                            Administradores têm acesso total a todos os módulos.
                          </Typography>
                        )}
                        <Grid container spacing={1}>
                          {ALL_PERMISSIONS.map((perm) => (
                            <Grid size={{ xs: 12, sm: 6 }} key={perm}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={isAdmin || (values.permissions as string[]).includes(perm)}
                                    disabled={isAdmin}
                                    onChange={() => handleTogglePermission(perm)}
                                    color="primary"
                                  />
                                }
                                label={PERMISSION_LABELS[perm]}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Stack>
                    </Grid>
                  </Grid>
                </DialogContent>
                <Divider />
                <DialogActions sx={{ p: 2.5 }}>
                  <Button color="secondary" onClick={onClose}>
                    Cancelar
                  </Button>
                  <AnimateButton>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      {isEdit ? 'Salvar' : 'Criar Usuário'}
                    </Button>
                  </AnimateButton>
                </DialogActions>
              </form>
            </SimpleBar>
          </MainCard>
        </Modal>
      )}
    </>
  );
}
