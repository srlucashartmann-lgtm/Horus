'use client';

import { useState, useEffect } from 'react';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// project-imports
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import { ArrowRotateRight } from '@wandersonalwes/iconsax-react';

function RotatePhoneAnimation() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primaryLight = theme.palette.primary.lighter;

  return (
    <Box sx={{ position: 'relative', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          width: 52,
          height: 88,
          border: `3px solid ${primary}`,
          borderRadius: '12px',
          position: 'relative',
          bgcolor: primaryLight,
          animation: 'phoneRotate 2.5s ease-in-out infinite',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 16,
            height: 3,
            borderRadius: 2,
            bgcolor: primary,
            opacity: 0.5
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: primary,
            opacity: 0.3
          }
        }}
      >
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: `2px solid ${primary}`,
            opacity: 0.6,
            animation: 'phoneArrow 2.5s ease-in-out infinite',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: -2,
              right: -3,
              width: 0,
              height: 0,
              borderLeft: `4px solid transparent`,
              borderRight: `4px solid transparent`,
              borderBottom: `5px solid ${primary}`,
              opacity: 0.6
            }
          }}
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          right: 4,
          top: '50%',
          transform: 'translateY(-50%)',
          animation: 'arrowPulse 2.5s ease-in-out infinite',
          color: primary,
          opacity: 0.6
        }}
      >
        <ArrowRotateRight size={24} variant="Bold" />
      </Box>
    </Box>
  );
}

export default function MobileLandscapePrompt() {
  const isMobilePortrait = useMediaQuery('(max-width:768px) and (orientation:portrait)');
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (isMobilePortrait && !dismissed) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isMobilePortrait, dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setOpen(false);
  };

  const handleRotate = async () => {
    try {
      if (screen.orientation && 'lock' in screen.orientation) {
        await (screen.orientation as any).lock('landscape');
      }
    } catch {
      // API não suportada ou sem permissão
    }
    setDismissed(true);
    setOpen(false);
  };

  if (!isMobilePortrait && dismissed) {
    return null;
  }

  return (
    <Dialog
      open={open}
      slots={{ transition: PopupTransition }}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          mx: 2
        }
      }}
    >
      <DialogContent sx={{ py: 4, px: 3 }}>
        <Stack sx={{ gap: 2.5, alignItems: 'center' }}>
          <RotatePhoneAnimation />

          <Stack sx={{ gap: 1 }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 700 }}>
              Gire seu celular
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary">
              Para melhor visualização do sistema Hórus, utilize o modo paisagem (celular deitado)
            </Typography>
          </Stack>

          <Stack sx={{ gap: 1.5, width: 1 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<ArrowRotateRight size={20} />}
              onClick={handleRotate}
              sx={{ borderRadius: 1.5 }}
            >
              Girar para paisagem
            </Button>
            <Button fullWidth variant="outlined" color="secondary" onClick={handleDismiss} sx={{ borderRadius: 1.5 }}>
              Continuar assim
            </Button>
          </Stack>
        </Stack>
      </DialogContent>

      <Box
        component="style"
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes phoneRotate {
              0%, 15% { transform: rotate(0deg); }
              40%, 60% { transform: rotate(-90deg); }
              85%, 100% { transform: rotate(0deg); }
            }
            @keyframes phoneArrow {
              0%, 15% { opacity: 0.6; transform: rotate(0deg); }
              40%, 60% { opacity: 0; transform: rotate(-90deg); }
              85%, 100% { opacity: 0.6; transform: rotate(0deg); }
            }
            @keyframes arrowPulse {
              0%, 15% { opacity: 0.8; transform: translateY(-50%) scale(1); }
              30% { opacity: 1; transform: translateY(-50%) scale(1.2); }
              40%, 60% { opacity: 0; transform: translateY(-50%) scale(0.8); }
              85%, 100% { opacity: 0.8; transform: translateY(-50%) scale(1); }
            }
          `
        }}
      />
    </Dialog>
  );
}
