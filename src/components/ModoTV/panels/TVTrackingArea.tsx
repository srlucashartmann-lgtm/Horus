'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ApexOptions } from 'apexcharts';
import { TRACKING_DATA, CANDIDATOS } from 'data/horus';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function TVTrackingArea() {
  const series = useMemo(
    () => [
      { name: CANDIDATOS.gabriel.nome, data: TRACKING_DATA.map((r) => r.gabriel) },
      { name: CANDIDATOS.juliana.nome, data: TRACKING_DATA.map((r) => r.juliana) },
      { name: CANDIDATOS.zucco.nome, data: TRACKING_DATA.map((r) => r.zucco) },
      { name: CANDIDATOS.edegar.nome, data: TRACKING_DATA.map((r) => r.edegar) },
      { name: CANDIDATOS.brancos.nome, data: TRACKING_DATA.map((r) => r.brancos) }
    ],
    []
  );

  const options: ApexOptions = useMemo(
    () => ({
      chart: { type: 'area', stacked: true, background: 'transparent', fontFamily: 'monospace', toolbar: { show: false } },
      theme: { mode: 'dark' },
      colors: ['#818CF8', '#FB7185', '#FBBF24', '#64748B', '#334155'],
      stroke: { curve: 'smooth', width: 1 },
      fill: { type: 'gradient', gradient: { opacityFrom: 0.6, opacityTo: 0.15 } },
      xaxis: {
        categories: TRACKING_DATA.map((r) => r.data),
        labels: { style: { colors: '#475569', fontSize: '10px', fontFamily: 'monospace' } },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: { labels: { formatter: (val: number) => `${val}%`, style: { colors: '#475569', fontSize: '10px' } } },
      grid: { borderColor: 'rgba(255,255,255,0.04)', strokeDashArray: 4 },
      tooltip: { theme: 'dark', shared: true, y: { formatter: (val: number) => `${val}%` } },
      legend: { position: 'top', horizontalAlign: 'right', labels: { colors: '#94A3B8' }, fontSize: '11px', fontFamily: 'monospace' }
    }),
    []
  );

  return (
    <Box sx={{ bgcolor: '#0F1219', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, p: 2 }}>
      <Typography sx={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#475569', mb: 1 }}>
        Tracking — Área Empilhada
      </Typography>
      <ReactApexChart options={options} series={series} type="area" height={300} />
    </Box>
  );
}
