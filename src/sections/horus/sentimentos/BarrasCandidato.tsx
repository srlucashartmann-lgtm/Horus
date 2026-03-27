'use client';

import { useState, useEffect } from 'react';
import { useColorScheme, useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import { SENTIMENTO_POR_CANDIDATO } from 'data/horus';

export default function BarrasCandidato() {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();
  const { state: { fontFamily } } = useConfig();
  const textSecondary = theme.vars.palette.text.secondary;
  const line = theme.vars.palette.divider;

  const series = [
    { name: 'Positivo', data: SENTIMENTO_POR_CANDIDATO.map((c) => c.positivo) },
    { name: 'Neutro', data: SENTIMENTO_POR_CANDIDATO.map((c) => c.neutro) },
    { name: 'Negativo', data: SENTIMENTO_POR_CANDIDATO.map((c) => c.negativo) }
  ];

  const [options, setOptions] = useState<ApexOptions>({});

  useEffect(() => {
    setOptions({
      chart: { type: 'bar', stacked: true, stackType: '100%', background: 'transparent', fontFamily, toolbar: { show: false } },
      plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: '55%' } },
      colors: ['#66BB6A', '#FFD54F', '#EF5350'],
      xaxis: { categories: SENTIMENTO_POR_CANDIDATO.map((c) => c.candidato), labels: { formatter: (val: string) => `${val}%`, style: { colors: String(textSecondary) } } },
      yaxis: { labels: { style: { colors: [String(textSecondary)] } } },
      legend: { show: true, position: 'bottom', labels: { colors: String(textSecondary) }, markers: { shape: 'circle' } },
      grid: { borderColor: String(line), strokeDashArray: 4 },
      dataLabels: { enabled: true, formatter: (val: number) => `${val.toFixed(0)}%`, style: { fontSize: '11px' } },
      tooltip: { y: { formatter: (val: number) => `${val}%` } },
      theme: { mode: colorScheme === ThemeMode.DARK ? 'dark' : 'light' }
    });
  }, [colorScheme, fontFamily, textSecondary, line]);

  return <ReactApexChart options={options} series={series} type="bar" height={280} />;
}
