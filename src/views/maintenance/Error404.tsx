'use client';

// next
import Link from 'next/link';

// material-ui
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import { APP_DEFAULT_PATH } from 'config';

// assets
const error404 = '/assets/images/maintenance/img-error-404.svg';

// ==============================|| ERROR 404 ||============================== //

export default function Error404Page() {
  return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', minHeight: '100vh', pt: 2, pb: 1, overflow: 'hidden', gap: 10 }}>
      <Stack direction="row" sx={{ justifyContent: 'center' }}>
        <Box sx={{ width: { xs: 250, sm: 590 }, height: { xs: 130, sm: 300 } }}>
          <CardMedia component="img" src={error404} alt="error 404" sx={{ height: 1, objectFit: 'inherit' }} />
        </Box>
      </Stack>
      <Stack sx={{ width: 1, gap: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h1">Page Not Found</Typography>
        <Typography align="center" sx={{ color: 'text.secondary', width: { xs: '73%', sm: '61%' } }}>
          The page you are looking for was moved, removed, renamed, or might never have existed!
        </Typography>
        <Button component={Link} href={APP_DEFAULT_PATH} variant="contained">
          Back To Home
        </Button>
      </Stack>
    </Stack>
  );
}
