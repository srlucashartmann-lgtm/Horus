'use client';

import { ReactNode } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// types
import { ColorProps } from 'types/extended';

interface Props {
  title: string;
  count: string;
  percentage: ReactNode;
  iconPrimary: ReactNode;
  children: any;
  color?: ColorProps;
}

export default function HorusKPICard({ title, count, percentage, color, iconPrimary, children }: Props) {
  return (
    <MainCard>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
            <Avatar variant="rounded" color={color}>
              {iconPrimary}
            </Avatar>
            <Typography variant="subtitle1">{title}</Typography>
          </Stack>
        </Grid>
        <Grid size={12}>
          <Box sx={{ p: 2, pt: 0 }}>
            <Grid container spacing={3} sx={{ alignItems: 'center' }}>
              <Grid size={7}>{children}</Grid>
              <Grid size={5}>
                <Stack sx={{ gap: 1 }}>
                  <Typography variant="h5">{count}</Typography>
                  {percentage}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
}
