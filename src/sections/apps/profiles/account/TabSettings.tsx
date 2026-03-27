import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';

// ==============================|| ACCOUNT PROFILE - SETTINGS ||============================== //

export default function TabSettings() {
  const [checked, setChecked] = useState(['en', 'email-1', 'email-3', 'order-1', 'order-3']);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Grid container spacing={GRID_COMMON_SPACING}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Grid container spacing={GRID_COMMON_SPACING}>
          <Grid size={12}>
            <MainCard title="Configurações de E-mail">
              <Stack sx={{ gap: 2.5 }}>
                <Typography variant="subtitle1">Notificações por E-mail</Typography>
                <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                  <ListItem>
                    <ListItemText id="switch-list-label-en" primary={<Typography color="secondary">Notificações por e-mail</Typography>} />
                    <Switch
                      edge="end"
                      onChange={handleToggle('en')}
                      checked={checked.indexOf('en') !== -1}
                      slotProps={{ input: { 'aria-labelledby': 'switch-list-label-en' } }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      id="switch-list-label-sctp"
                      primary={<Typography color="secondary">Enviar cópia para e-mail pessoal</Typography>}
                    />
                    <Switch
                      edge="end"
                      onChange={handleToggle('sctp')}
                      checked={checked.indexOf('sctp') !== -1}
                      slotProps={{ input: { 'aria-labelledby': 'switch-list-label-sctp' } }}
                    />
                  </ListItem>
                </List>
              </Stack>
            </MainCard>
          </Grid>
          <Grid size={12}>
            <MainCard title="Atualizações do Sistema">
              <Stack sx={{ gap: 2.5 }}>
                <Typography variant="subtitle1">Receber e-mails sobre:</Typography>
                <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                  <ListItem>
                    <ListItemText primary={<Typography color="secondary">Novidades e atualizações do sistema</Typography>} />
                    <Checkbox defaultChecked />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={<Typography color="secondary">Dicas de uso do sistema</Typography>} />
                    <Checkbox defaultChecked />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={<Typography color="secondary">Atividades desde seu último acesso</Typography>}
                    />
                    <Checkbox />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={<Typography color="secondary">Novidades sobre serviços relacionados</Typography>} />
                    <Checkbox />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={<Typography color="secondary">Documentação e relatórios</Typography>} />
                    <Checkbox />
                  </ListItem>
                </List>
              </Stack>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <MainCard title="E-mails de Atividade">
          <Stack sx={{ gap: 2.5 }}>
            <Typography variant="subtitle1">Quando enviar e-mail?</Typography>
            <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
              <ListItem>
                <ListItemText id="switch-list-label-email-1" primary={<Typography color="secondary">Novas notificações</Typography>} />
                <Switch
                  edge="end"
                  onChange={handleToggle('email-1')}
                  checked={checked.indexOf('email-1') !== -1}
                  slotProps={{ input: { 'aria-labelledby': 'switch-list-label-email-1' } }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  id="switch-list-label-email-2"
                  primary={<Typography color="secondary">Mensagem direta recebida</Typography>}
                />
                <Switch
                  edge="end"
                  onChange={handleToggle('email-2')}
                  checked={checked.indexOf('email-2') !== -1}
                  slotProps={{ input: { 'aria-labelledby': 'switch-list-label-email-2' } }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  id="switch-list-label-email-3"
                  primary={<Typography color="secondary">Alguém adicionou você como conexão</Typography>}
                />
                <Switch
                  edge="end"
                  onChange={handleToggle('email-3')}
                  checked={checked.indexOf('email-3') !== -1}
                  slotProps={{ input: { 'aria-labelledby': 'switch-list-label-email-3' } }}
                />
              </ListItem>
            </List>
            <Divider />
            <Typography variant="subtitle1">Quando escalar e-mails?</Typography>
            <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
              <ListItem>
                <ListItemText
                  id="switch-list-label-order-1"
                  primary={<Typography sx={{ color: 'secondary.400' }}>Nova solicitação</Typography>}
                />
                <Switch
                  edge="end"
                  onChange={handleToggle('order-1')}
                  checked={checked.indexOf('order-1') !== -1}
                  disabled
                  slotProps={{ input: { 'aria-labelledby': 'switch-list-label-order-1' } }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  id="switch-list-label-order-2"
                  primary={<Typography sx={{ color: 'secondary.400' }}>Aprovação de novo membro</Typography>}
                />
                <Switch
                  edge="end"
                  disabled
                  onChange={handleToggle('order-2')}
                  checked={checked.indexOf('order-2') !== -1}
                  slotProps={{ input: { 'aria-labelledby': 'switch-list-label-order-2' } }}
                />
              </ListItem>
              <ListItem>
                <ListItemText id="switch-list-label-order-3" primary={<Typography color="secondary">Registro de membro</Typography>} />
                <Switch
                  edge="end"
                  onChange={handleToggle('order-3')}
                  checked={checked.indexOf('order-3') !== -1}
                  slotProps={{ input: { 'aria-labelledby': 'switch-list-label-order-3' } }}
                />
              </ListItem>
            </List>
          </Stack>
        </MainCard>
      </Grid>
      <Grid size={12}>
        <Stack direction="row" sx={{ gap: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button variant="outlined" color="secondary">
            Cancelar
          </Button>
          <Button variant="contained">Salvar</Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
