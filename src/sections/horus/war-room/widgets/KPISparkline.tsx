'use client';

import { useState, useEffect } from 'react';
import { useColorScheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

interface Props {
  data: number[];
  color: string;
  height?: number;
  type?: 'area' | 'bar';
}

export default function KPISparkline({ data, color, height = 50, type = 'area' }: Props) {
  const { colorScheme } = useColorScheme();
  const {
    state: { fontFamily }
  } = useConfig();

  const [options, setOptions] = useState<ApexOptions>({});

  useEffect(() => {
    const isDark = colorScheme === ThemeMode.DARK;
    const baseOpts: ApexOptions = {
      chart: {
        type,
        background: 'transparent',
        sparkline: { enabled: true },
        toolbar: { show: false },
        fontFamily
      },
      colors: [color],
      dataLabels: { enabled: false },
      tooltip: { fixed: { enabled: false }, x: { show: false } },
      theme: { mode: isDark ? 'dark' : 'light' },
      ...(type === 'area'
        ? {
            stroke: { curve: 'smooth', width: 2 },
            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] } }
          }
        : {
            plotOptions: { bar: { borderRadius: 2, columnWidth: '80%' } }
          })
    };
    setOptions(baseOpts);
  }, [color, fontFamily, colorScheme, type]);

  return <ReactApexChart options={options} series={[{ data }]} type={type} height={height} />;
}
