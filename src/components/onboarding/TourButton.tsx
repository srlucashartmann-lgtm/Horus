'use client';

import Tooltip from '@mui/material/Tooltip';
import type { SxProps, Theme } from '@mui/material/styles';
import IconButton from 'components/@extended/IconButton';
import { Eye } from 'lucide-react';
import { useOnboarding, TourId } from './OnboardingProvider';

interface Props {
  tourId: TourId;
  /** Ex.: banner escuro — ícone claro */
  sx?: SxProps<Theme>;
}

export default function TourButton({ tourId, sx }: Props) {
  const { startTour, resetTour } = useOnboarding();

  const handleClick = () => {
    resetTour(tourId);
    setTimeout(() => startTour(tourId), 200);
  };

  return (
    <Tooltip title="Repetir Tour">
      <IconButton color="secondary" variant="light" size="small" onClick={handleClick} sx={{ ml: 0.5, ...sx }}>
        <Eye size={18} strokeWidth={2.25} aria-hidden />
      </IconButton>
    </Tooltip>
  );
}
