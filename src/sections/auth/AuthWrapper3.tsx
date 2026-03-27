import { ReactNode } from 'react';

// material-ui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// project-imports
import AuthSlider from './AuthSlider';

interface Props {
  children: ReactNode;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper3({ children }: Props) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Stack sx={{ justifyContent: 'center', minHeight: '100vh', bgcolor: 'background.paper' }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' }
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: 'center',
              flex: 1,
              p: 4,
              minHeight: '100vh',
              '& > .MuiPaper-root > .MuiBox-root': { minHeight: '100%', display: 'flex' }
            }}
          >
            {children}
          </Stack>
          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              width: 580,
              overflow: 'hidden',
              alignSelf: 'stretch',
              position: 'relative',
              bgcolor: 'primary.main'
            }}
          >
            <AuthSlider />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
