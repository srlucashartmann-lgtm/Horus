'use client';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { TrendUp, TrendDown, Warning2 } from '@wandersonalwes/iconsax-react';

interface Props {
  insights: string[];
}

function getInsightStyle(insight: string) {
  const isPositive = insight.includes('melhor') || insight.includes('subiu') || insight.includes('cresce');
  const isNegative = insight.includes('Pior') || insight.includes('caiu');

  if (isPositive) return { borderColor: '#2E7D32', icon: <TrendUp size={20} color="#2E7D32" />, color: '#2E7D32' };
  if (isNegative) return { borderColor: '#C62828', icon: <TrendDown size={20} color="#C62828" />, color: '#C62828' };
  return { borderColor: '#ED6C02', icon: <Warning2 size={20} color="#ED6C02" />, color: '#ED6C02' };
}

export default function CrossTabInsights({ insights }: Props) {
  if (insights.length === 0) return null;

  return (
    <MainCard title="Destaques do Cruzamento">
      <Grid container spacing={2}>
        {insights.map((insight, idx) => {
          const style = getInsightStyle(insight);
          return (
            <Grid size={{ xs: 12, md: 6 }} key={idx}>
              <Stack
                direction="row"
                sx={{
                  gap: 1.5,
                  alignItems: 'flex-start',
                  p: 2,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderLeft: `4px solid ${style.borderColor}`,
                  bgcolor: 'background.paper'
                }}
              >
                <Stack sx={{ pt: 0.25 }}>{style.icon}</Stack>
                <Typography variant="body2">{insight}</Typography>
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </MainCard>
  );
}
