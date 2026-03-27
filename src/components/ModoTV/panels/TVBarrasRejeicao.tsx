'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ApexOptions } from 'apexcharts';
import { REJEICAO_POR_SEGMENTO, SEGMENTOS } from 'data/horus';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function TVBarrasRejeicao() {
  const series = useMemo(
    () =>
      REJEICAO_POR_SEGMENTO.map((r) => ({
        name: r.candidato,
        data: [r.geral, r.evangelicos, r.mulheres2534, r.jovens1624, r.interior]
      })),
    []
  );

  const options: ApexOptions = useMemo(
    () => ({
      chart: { type: 'bar', background: 'transparent', fontFamily: 'monospace', toolbar: { show: false } },
      theme: { mode: 'dark' },
      plotOptions: { bar: { horizontal: true, borderRadius: 3, barHeight: '65%' } },
      colors: ['#818CF8', '#FB7185', '#FBBF24', '#64748B'],
      dataLabels: { enabled: false },
      xaxis: {
        categories: [...SEGMENTOS],
        labels: { formatter: (val: string) => `${val}%`, style: { colors: '#475569', fontSize: '10px' } }
      },
      yaxis: { labels: { style: { colors: '#94A3B8', fontSize: '10px' } } },
      grid: { borderColor: 'rgba(255,255,255,0.04)', strokeDashArray: 4 },
      tooltip: { theme: 'dark', y: { formatter: (val: number) => `${val}%` } },
      legend: { position: 'top', horizontalAlign: 'right', labels: { colors: '#94A3B8' }, fontSize: '11px', fontFamily: 'monospace' }
    }),
    []
  );

  return (
    <Box sx={{ bgcolor: '#0F1219', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, p: 2 }}>
      <Typography sx={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#475569', mb: 1 }}>
        Rejeição por Segmento
      </Typography>
      <ReactApexChart options={options} series={series} type="bar" height={300} />
    </Box>
  );
}
