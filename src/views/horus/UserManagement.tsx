'use client';

import { useMemo, useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// project-imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import PermissionGuard from 'utils/route-guard/PermissionGuard';
import UserModal from 'sections/horus/users/UserModal';
import AlertUserDelete from 'sections/horus/users/AlertUserDelete';
import { useGetHorusUsers } from 'api/horus-users';
import { HorusUserPublic } from 'types/horus';

// assets
import { Add, Edit, Trash } from '@wandersonalwes/iconsax-react';

export default function UserManagement() {
  const { users, usersLoading } = useGetHorusUsers();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<HorusUserPublic | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState<{ id: string; name: string } | null>(null);

  const handleAdd = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user: HorusUserPublic) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleDelete = (user: HorusUserPublic) => {
    setDeleteUser({ id: user.id, name: user.name });
    setDeleteOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setDeleteUser(null);
  };

  const sortedUsers = useMemo(() => {
    if (!users) return [];
    return [...users].sort((a, b) => {
      if (a.role === 'admin' && b.role !== 'admin') return -1;
      if (a.role !== 'admin' && b.role === 'admin') return 1;
      return a.name.localeCompare(b.name);
    });
  }, [users]);

  return (
    <PermissionGuard permission="configuracoes">
      <Stack sx={{ gap: 3 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Typography variant="h4">Usuários e Permissões</Typography>
            <Typography variant="body2" color="text.secondary">
              Gerencie os usuários do sistema e suas permissões de acesso
            </Typography>
          </div>
          <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
            Novo Usuário
          </Button>
        </Stack>

        <MainCard content={false}>
          {usersLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Usuário</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Perfil</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Criado em</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedUsers.map((user) => (
                    <TableRow hover key={user.id}>
                      <TableCell>
                        <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center' }}>
                          <Avatar alt={user.name} src={user.avatar} size="sm" />
                          <Typography variant="subtitle1">{user.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.role === 'admin' ? 'Administrador' : 'Analista'}
                          color={user.role === 'admin' ? 'primary' : 'secondary'}
                          size="small"
                          variant="light"
                          sx={{ borderRadius: 1 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.active ? 'Ativo' : 'Inativo'}
                          color={user.active ? 'success' : 'error'}
                          size="small"
                          variant="light"
                          sx={{ borderRadius: 1 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {user.createdAt}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" sx={{ justifyContent: 'center', gap: 0.5 }}>
                          <Tooltip title="Editar">
                            <IconButton color="primary" onClick={() => handleEdit(user)}>
                              <Edit size={18} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Remover">
                            <IconButton color="error" onClick={() => handleDelete(user)}>
                              <Trash size={18} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}

                  {sortedUsers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          Nenhum usuário cadastrado
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </MainCard>
      </Stack>

      <UserModal open={modalOpen} onClose={handleCloseModal} user={selectedUser} />

      {deleteUser && (
        <AlertUserDelete id={deleteUser.id} name={deleteUser.name} open={deleteOpen} handleClose={handleCloseDelete} />
      )}
    </PermissionGuard>
  );
}
