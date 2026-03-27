'use client';

import { useState, useEffect } from 'react';
import { useColorScheme, useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import { RADAR_SENTIMENTO } from 'data/horus';

export default function RadarSentimento() {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();
  const { state: { fontFamily } } = useConfig();
  const textSecondary = theme.vars.palette.text.secondary;

  const series = [
    { name: 'Sentimento Negativo', data: RADAR_SENTIMENTO.negativo },
    { name: 'Sentimento Positivo', data: RADAR_SENTIMENTO.positivo }
  ];

  const [options, setOptions] = useState<ApexOptions>({});

  useEffect(() => {
    setOptions({
      chart: { type: 'radar', background: 'transparent', fontFamily, toolbar: { show: false } },
      colors: ['#EF5350', '#66BB6A'],
      xaxis: { categories: RADAR_SENTIMENTO.temas, labels: { style: { colors: Array(7).fill(String(textSecondary)), fontSize: '11px' } } },
      yaxis: { show: false, max: 10 },
      stroke: { width: 2 },
      fill: { opacity: 0.2 },
      markers: { size: 4 },
      legend: { show: true, position: 'bottom', labels: { colors: String(textSecondary) }, markers: { shape: 'circle' } },
      plotOptions: { radar: { polygons: { strokeColors: String(theme.vars.palette.divider), connectorColors: String(theme.vars.palette.divider) } } },
      theme: { mode: colorScheme === ThemeMode.DARK ? 'dark' : 'light' }
    });
  }, [colorScheme, fontFamily, textSecondary, theme.vars.palette.divider]);

  return <ReactApexChart options={options} series={series} type="radar" height={360} />;
}
