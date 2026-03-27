'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ApexOptions } from 'apexcharts';
import { TRACKING_DATA, CANDIDATOS } from 'data/horus';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function TVDonutCenario() {
  const latest = TRACKING_DATA[TRACKING_DATA.length - 1];

  const series = useMemo(() => [latest.gabriel, latest.juliana, latest.zucco, latest.edegar, latest.brancos], [latest]);

  const options: ApexOptions = useMemo(
    () => ({
      chart: { type: 'donut', background: 'transparent', fontFamily: 'monospace' },
      theme: { mode: 'dark' },
      colors: ['#818CF8', '#FB7185', '#FBBF24', '#64748B', '#334155'],
      labels: [CANDIDATOS.gabriel.nome, CANDIDATOS.juliana.nome, CANDIDATOS.zucco.nome, CANDIDATOS.edegar.nome, CANDIDATOS.brancos.nome],
      stroke: { width: 2, colors: ['#0F1219'] },
      dataLabels: { enabled: true, style: { fontSize: '12px', fontFamily: 'monospace', fontWeight: 700 }, dropShadow: { enabled: false } },
      plotOptions: { pie: { donut: { size: '60%', labels: { show: true, name: { color: '#94A3B8' }, value: { color: '#E2E8F0', fontSize: '20px', fontFamily: 'monospace', fontWeight: 700, formatter: (val: string) => `${val}%` }, total: { show: true, label: 'Total', color: '#64748B', formatter: () => '100%' } } } } },
      legend: { position: 'bottom', labels: { colors: '#94A3B8' }, fontSize: '11px', fontFamily: 'monospace' },
      tooltip: { theme: 'dark', y: { formatter: (val: number) => `${val}%` } }
    }),
    []
  );

  return (
    <Box sx={{ bgcolor: '#0F1219', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, p: 2 }}>
      <Typography sx={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#475569', mb: 1 }}>
        Cenário Atual
      </Typography>
      <ReactApexChart options={options} series={series} type="donut" height={300} />
    </Box>
  );
}
