'use client';

// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import ColorScheme from 'components/customization/ColorScheme';
import MenuCaption from 'components/customization/MenuCaption';
import ThemeContrast from 'components/customization/ThemeContrast';
import ThemeFont from 'components/customization/ThemeFont';
import ThemeLayout from 'components/customization/ThemeLayout';
import ThemeMenuDirection from 'components/customization/ThemeMenuDirection';
import ThemeModeComponent from 'components/customization/ThemeMode';
import ThemeWidth from 'components/customization/ThemeWidth';
import { GRID_COMMON_SPACING } from 'config';

// ==============================|| ACCOUNT PROFILE - APARÊNCIA ||============================== //

export default function TabAparencia() {
  return (
    <Grid container spacing={GRID_COMMON_SPACING}>
      {/* theme-mode */}
      <Grid size={12}>
        <Stack>
          <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
            Modo do Tema
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Escolha entre modo claro ou escuro
          </Typography>
        </Stack>
      </Grid>
      <Grid size={12}>
        <ThemeModeComponent />
      </Grid>
      <Grid size={12}>
        <Divider />
      </Grid>

      {/* theme-contrast */}
      <Grid size={12}>
        <Stack>
          <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
            Contraste do Tema
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Escolha o contraste e sombras
          </Typography>
        </Stack>
      </Grid>
      <Grid size={12}>
        <ThemeContrast />
      </Grid>
      <Grid size={12}>
        <Divider />
      </Grid>

      {/* custom-theme */}
      <Grid size={12}>
        <Stack>
          <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
            Cor do Tema
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Escolha a cor primária do tema
          </Typography>
        </Stack>
      </Grid>
      <Grid size={12}>
        <ColorScheme />
      </Grid>
      <Grid size={12}>
        <Divider />
      </Grid>

      {/* menu-caption */}
      <Grid size={12}>
        <Stack>
          <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
            Legenda da Sidebar
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Mostrar ou ocultar legendas do menu
          </Typography>
        </Stack>
      </Grid>
      <Grid size={12}>
        <MenuCaption />
      </Grid>
      <Grid size={12}>
        <Divider />
      </Grid>

      {/* theme-layout */}
      <Grid size={12}>
        <Stack>
          <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
            Layout do Tema
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Escolha o layout do menu
          </Typography>
        </Stack>
      </Grid>
      <Grid size={12}>
        <ThemeLayout />
      </Grid>
      <Grid size={12}>
        <Divider />
      </Grid>

      {/* theme-orientation */}
      <Grid size={12}>
        <Stack>
          <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
            Direção do Menu
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Escolha a direção do tema (LTR ou RTL)
          </Typography>
        </Stack>
      </Grid>
      <Grid size={12}>
        <ThemeMenuDirection />
      </Grid>
      <Grid size={12}>
        <Divider />
      </Grid>

      {/* theme-container */}
      <Grid size={12}>
        <Stack>
          <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
            Largura do Layout
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Escolha layout fluido ou contêiner
          </Typography>
        </Stack>
      </Grid>
      <Grid size={12}>
        <ThemeWidth />
      </Grid>
      <Grid size={12}>
        <Divider />
      </Grid>

      {/* theme-font-family */}
      <Grid size={12}>
        <Stack>
          <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
            Fonte
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Escolha a família de fontes
          </Typography>
        </Stack>
      </Grid>
      <Grid size={12}>
        <ThemeFont />
      </Grid>
    </Grid>
  );
}
