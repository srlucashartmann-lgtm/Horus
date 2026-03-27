'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ApexOptions } from 'apexcharts';
import { TRACKING_DATA, CANDIDATOS, EVENTOS_CAMPANHA } from 'data/horus';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function TVTrackingLine() {
  const series = useMemo(
    () => [
      { name: CANDIDATOS.gabriel.nome, type: 'area' as const, data: TRACKING_DATA.map((r) => r.gabriel) },
      { name: CANDIDATOS.juliana.nome, type: 'line' as const, data: TRACKING_DATA.map((r) => r.juliana) },
      { name: CANDIDATOS.zucco.nome, type: 'line' as const, data: TRACKING_DATA.map((r) => r.zucco) },
      { name: CANDIDATOS.edegar.nome, type: 'line' as const, data: TRACKING_DATA.map((r) => r.edegar) }
    ],
    []
  );

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'line',
        background: 'transparent',
        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        toolbar: { show: false },
        animations: { enabled: true, easing: 'easeinout', speed: 800 },
        dropShadow: {
          enabled: true,
          enabledOnSeries: [0],
          top: 0,
          left: 0,
          blur: 12,
          color: '#818CF8',
          opacity: 0.35
        }
      },
      theme: { mode: 'dark' },
      colors: ['#818CF8', '#FB7185', '#FBBF24', '#64748B'],
      stroke: {
        curve: 'smooth',
        width: [3, 1.5, 1.5, 1.5],
        lineCap: 'round'
      },
      fill: {
        type: ['gradient', 'solid', 'solid', 'solid'],
        gradient: {
          type: 'vertical',
          shadeIntensity: 0,
          opacityFrom: 0.25,
          opacityTo: 0.02,
          stops: [0, 100]
        }
      },
      markers: {
        size: [5, 0, 0, 0],
        strokeWidth: 2,
        strokeColors: '#0F1219',
        hover: { sizeOffset: 3 }
      },
      xaxis: {
        categories: TRACKING_DATA.map((r) => r.data),
        labels: { style: { colors: '#475569', fontSize: '10px', fontFamily: '"JetBrains Mono", monospace' } },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        min: 0,
        max: 55,
        labels: {
          formatter: (val: number) => `${val}%`,
          style: { colors: '#475569', fontSize: '10px', fontFamily: '"JetBrains Mono", monospace' }
        }
      },
      grid: { borderColor: 'rgba(255,255,255,0.04)', strokeDashArray: 4 },
      tooltip: {
        theme: 'dark',
        shared: true,
        intersect: false,
        y: { formatter: (val: number) => `${val}%` },
        style: { fontSize: '11px', fontFamily: '"JetBrains Mono", monospace' },
        marker: { show: true }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: { colors: '#94A3B8' },
        fontSize: '11px',
        fontFamily: '"JetBrains Mono", monospace',
        markers: { shape: 'circle' as any }
      },
      annotations: {
        xaxis: EVENTOS_CAMPANHA.map((ev) => ({
          x: ev.data,
          borderColor: '#FBBF24',
          strokeDashArray: 3,
          label: {
            text: ev.label,
            position: 'top' as any,
            orientation: 'horizontal',
            style: {
              background: '#1A1F2E',
              color: '#FBBF24',
              fontSize: '9px',
              fontFamily: '"JetBrains Mono", monospace',
              padding: { left: 4, right: 4, top: 2, bottom: 2 }
            }
          }
        }))
      }
    }),
    []
  );

  return (
    <Box sx={{ bgcolor: '#0F1219', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', p: 2 }}>
      <Typography
        sx={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#475569',
          mb: 1
        }}
      >
        Tracking — Intenção de Voto
      </Typography>
      <ReactApexChart options={options} series={series} type="line" height={300} />
    </Box>
  );
}
