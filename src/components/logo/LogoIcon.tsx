import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function LogoIcon() {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          color: theme.vars.palette.primary.main,
          letterSpacing: '0.1em',
          lineHeight: 1
        }}
      >
        H
      </Typography>
    </Box>
  );
}
