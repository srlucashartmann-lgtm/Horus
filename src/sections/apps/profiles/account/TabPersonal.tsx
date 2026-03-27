import { useEffect, useState, ChangeEvent } from 'react';

// material-ui
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';

// assets
import { Camera } from '@wandersonalwes/iconsax-react';

const avatarImage = '/assets/images/users';

export default function TabPersonal() {
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>(`${avatarImage}/default.png`);

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <MainCard title="Informações Pessoais">
      <Grid container spacing={3} sx={{ maxWidth: 600 }}>
        <Grid size={12}>
          <Stack sx={{ gap: 2.5, alignItems: 'center' }}>
            <FormLabel
              htmlFor="change-avatar"
              sx={{
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                '&:hover .MuiBox-root': { opacity: 1 },
                cursor: 'pointer'
              }}
            >
              <Avatar alt="Avatar" src={avatar} sx={{ width: 76, height: 76 }} />
              <Box
                sx={(theme) => ({
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bgcolor: 'rgba(0,0,0,.65)',
                  ...theme.applyStyles('dark', { bgcolor: 'rgba(255, 255, 255, .75)' }),
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                })}
              >
                <Stack sx={{ gap: 0.5, alignItems: 'center', color: 'secondary.lighter' }}>
                  <Camera style={{ fontSize: '1.5rem' }} />
                      <Typography variant="caption">Enviar</Typography>
                </Stack>
              </Box>
            </FormLabel>
            <TextField
              type="file"
              id="change-avatar"
              placeholder="Outlined"
              variant="outlined"
              sx={{ display: 'none' }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedImage(e.target.files?.[0])}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel htmlFor="personal-first-name">Nome</InputLabel>
            <TextField fullWidth id="personal-first-name" placeholder="Seu nome" />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel htmlFor="personal-last-name">Sobrenome</InputLabel>
            <TextField fullWidth id="personal-last-name" placeholder="Seu sobrenome" />
          </Stack>
        </Grid>
        <Grid size={12}>
          <Stack direction="row" sx={{ gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" color="secondary">
              Cancelar
            </Button>
            <Button variant="contained">Salvar</Button>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
}
