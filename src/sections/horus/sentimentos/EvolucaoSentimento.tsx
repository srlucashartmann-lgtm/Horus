'use client';

import { useState, useEffect } from 'react';
import { useColorScheme, useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import { EVOLUCAO_SENTIMENTO } from 'data/horus';

export default function EvolucaoSentimento() {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();
  const { state: { fontFamily } } = useConfig();
  const textSecondary = theme.vars.palette.text.secondary;
  const line = theme.vars.palette.divider;

  const series = [{ name: 'Score de Sentimento', data: EVOLUCAO_SENTIMENTO.map((e) => e.score) }];

  const [options, setOptions] = useState<ApexOptions>({});

  useEffect(() => {
    setOptions({
      chart: { type: 'area', background: 'transparent', fontFamily, toolbar: { show: false } },
      colors: ['#3F51B5'],
      dataLabels: { enabled: true, formatter: (val: number) => `${val > 0 ? '+' : ''}${val}`, offsetY: -8, style: { fontSize: '11px', fontWeight: 600 } },
      stroke: { curve: 'smooth', width: 3 },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1, type: 'vertical', opacityFrom: 0.3, opacityTo: 0.05,
          colorStops: [
            [{ offset: 0, color: '#66BB6A', opacity: 0.3 }, { offset: 50, color: '#FFFFFF', opacity: 0.05 }, { offset: 100, color: '#EF5350', opacity: 0.3 }]
          ]
        }
      },
      xaxis: {
        categories: EVOLUCAO_SENTIMENTO.map((e) => e.data),
        labels: { style: { colors: String(textSecondary) } },
        axisBorder: { show: false }, axisTicks: { show: false }
      },
      yaxis: { min: -10, max: 10, labels: { style: { colors: [String(textSecondary)] }, formatter: (val: number) => `${val > 0 ? '+' : ''}${val}` } },
      annotations: {
        yaxis: [{ y: 0, borderColor: String(line), strokeDashArray: 3, label: { text: 'Neutro', style: { background: 'transparent', color: String(textSecondary), fontSize: '10px' } } }]
      },
      markers: { size: 6, strokeWidth: 2, hover: { sizeOffset: 3 } },
      tooltip: {
        custom: ({ dataPointIndex }: { dataPointIndex: number }) => {
          const e = EVOLUCAO_SENTIMENTO[dataPointIndex];
          return `<div style="padding:8px"><b>${e.sessao}</b><br/>${e.data} · Score: ${e.score > 0 ? '+' : ''}${e.score}</div>`;
        }
      },
      grid: { borderColor: String(line), strokeDashArray: 4 },
      theme: { mode: colorScheme === ThemeMode.DARK ? 'dark' : 'light' }
    });
  }, [colorScheme, fontFamily, textSecondary, line]);

  return <ReactApexChart options={options} series={series} type="area" height={300} />;
}
