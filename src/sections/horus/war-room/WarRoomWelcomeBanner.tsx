'use client';

// material-ui
import type { Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// next
import Link from 'next/link';

// project-imports
import MainCard from 'components/MainCard';
import TourButton from 'components/onboarding/TourButton';
import Dot from 'components/@extended/Dot';
import { TIMELINE_HUMOR } from 'data/horus';

const NOVIDADES_SEMANA = TIMELINE_HUMOR.slice(0, 4);

const tipoDot: Record<(typeof TIMELINE_HUMOR)[number]['tipo'], 'error' | 'warning' | 'success'> = {
  critico: 'error',
  atencao: 'warning',
  positivo: 'success'
};

// ==============================|| WAR ROOM — BANNER (novidades da semana, visual claro) ||============================== //

export default function WarRoomWelcomeBanner() {
  return (
    <MainCard
      border={false}
      sx={(theme: Theme) => ({
        position: 'relative',
        overflow: 'hidden',
        color: 'text.primary',
        bgcolor: 'grey.50',
        backgroundImage: `linear-gradient(135deg, ${theme.vars.palette.primary.lighter} 0%, ${theme.vars.palette.background.paper} 48%, ${theme.vars.palette.secondary.lighter} 100%)`,
        border: `1px solid ${theme.vars.palette.divider}`,
        boxShadow: 'none',
        ...theme.applyStyles('dark', {
          bgcolor: 'grey.900',
          backgroundImage: `linear-gradient(135deg, ${theme.vars.palette.primary.dark}22 0%, ${theme.vars.palette.background.default} 50%, ${theme.vars.palette.secondary.dark}18 100%)`,
          border: `1px solid ${theme.vars.palette.divider}`
        }),
        '&:before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          borderRadius: '0 4px 4px 0',
          bgcolor: 'primary.main',
          zIndex: 1
        }
      })}
    >
      <Grid container sx={{ position: 'relative', zIndex: 2 }}>
        <Grid size={{ md: 7, sm: 7, xs: 12 }}>
          <Stack sx={{ gap: 2, p: { xs: 2.5, sm: 3 }, pl: { xs: 2.5, sm: 3.5 } }}>
            <Stack direction="row" sx={{ alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="Novidades da semana" color="primary" variant="light" size="small" sx={{ fontWeight: 600, height: 26 }} />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Rodada 18 · 20/Mar · atualizado há 12 min
              </Typography>
            </Stack>

            <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.2 }}>
                War Room — Gabriel Souza
              </Typography>
              <TourButton
                tourId="general"
                sx={(theme) => ({
                  color: 'primary.main',
                  bgcolor: 'primary.lighter',
                  '&:hover': { bgcolor: 'primary.light' },
                  ...theme.applyStyles('dark', {
                    color: 'primary.light',
                    bgcolor: 'primary.dark',
                    '&:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' }
                  })
                })}
              />
            </Stack>

            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 560, lineHeight: 1.65 }}>
              Resumo do que mudou na campanha nos últimos dias — tracking, qualis e alertas em um só lugar. Use a síntese para o
              briefing rápido.
            </Typography>

            <Stack component="ul" sx={{ m: 0, pl: 0, listStyle: 'none', gap: 1.25 }}>
              {NOVIDADES_SEMANA.map((item) => (
                <Stack
                  key={`${item.data}-${item.texto}`}
                  component="li"
                  direction="row"
                  spacing={1.25}
                  alignItems="flex-start"
                  sx={{ py: 0.25 }}
                >
                  <Dot color={tipoDot[item.tipo]} size={10} sx={{ mt: 0.85, flexShrink: 0 }} />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mb: 0.25 }}>
                      {item.data}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.5, color: 'text.primary' }}>
                      {item.texto}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 0.5, alignItems: { sm: 'center' } }}>
              <Button component={Link} href="/inteligencia/sintese" variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                Ver Síntese Semanal
              </Button>
              <Button component={Link} href="/inteligencia/alertas" variant="text" color="secondary" sx={{ textTransform: 'none' }}>
                Central de alertas
              </Button>
            </Stack>
          </Stack>
        </Grid>

        <Grid size={{ md: 5, sm: 5, xs: 12 }} sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'stretch' }}>
          <Box
            sx={(theme: Theme) => ({
              flex: 1,
              m: 2,
              ml: { sm: 0 },
              borderRadius: 2,
              border: `1px dashed ${theme.vars.palette.primary.light}`,
              bgcolor: 'background.paper',
              opacity: 0.92,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 3,
              textAlign: 'center',
              ...theme.applyStyles('dark', {
                bgcolor: 'grey.800',
                borderColor: 'divider'
              })
            })}
          >
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1.2 }}>
              Radar Hórus
            </Typography>
            <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
              Semana em movimento
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, maxWidth: 220 }}>
              +{TIMELINE_HUMOR.length} eventos na linha do tempo completa — abra a síntese para narrativa executiva.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
}
