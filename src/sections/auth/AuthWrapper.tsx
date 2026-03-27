import { ReactElement } from 'react';

// material-ui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// project-imports
import AuthCard from './AuthCard';

// assets
import AuthBackground from '../../../public/assets/images/auth/AuthBackground';

interface Props {
  children: ReactElement;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper({ children }: Props) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AuthBackground />
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' }
          }}
        >
          <AuthCard>{children}</AuthCard>
        </Stack>
      </Stack>
    </Box>
  );
}
