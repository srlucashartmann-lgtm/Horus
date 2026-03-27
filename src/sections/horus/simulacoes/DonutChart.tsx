'use client';

import { useState, useEffect } from 'react';
import { useColorScheme, useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

interface Props {
  labels: string[];
  series: number[];
  colors: string[];
  centerLabel?: string;
  height?: number;
}

export default function DonutChart({ labels, series, colors, centerLabel, height = 320 }: Props) {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();
  const { state: { fontFamily } } = useConfig();
  const textSecondary = theme.vars.palette.text.secondary;

  const [options, setOptions] = useState<ApexOptions>({});

  useEffect(() => {
    setOptions({
      chart: { type: 'donut', background: 'transparent', fontFamily },
      labels,
      colors,
      dataLabels: { enabled: true, formatter: (val: number) => `${val.toFixed(1)}%` },
      plotOptions: {
        pie: {
          donut: {
            size: '55%',
            labels: {
              show: !!centerLabel,
              total: {
                show: !!centerLabel,
                label: 'Gabriel',
                fontSize: '14px',
                fontWeight: 400,
                color: String(textSecondary),
                formatter: () => centerLabel || ''
              },
              value: { fontSize: '28px', fontWeight: 700 }
            }
          }
        }
      },
      legend: { show: true, position: 'bottom', labels: { colors: String(textSecondary) }, markers: { shape: 'circle' }, itemMargin: { horizontal: 8, vertical: 4 } },
      stroke: { width: 2 },
      theme: { mode: colorScheme === ThemeMode.DARK ? 'dark' : 'light' }
    });
  }, [colorScheme, fontFamily, labels, colors, centerLabel, textSecondary]);

  return <ReactApexChart options={options} series={series} type="donut" height={height} />;
}
