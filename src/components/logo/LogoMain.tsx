import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function LogoMain({ reverse }: { reverse?: boolean }) {
  const theme = useTheme();

  return (
    <Typography
      variant="h3"
      sx={{
        fontWeight: 700,
        color: reverse ? 'common.white' : theme.vars.palette.primary.main,
        letterSpacing: '0.15em',
        lineHeight: 1
      }}
    >
      HÓRUS
    </Typography>
  );
}
