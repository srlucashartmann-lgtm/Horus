'use client';

import { useState, useEffect } from 'react';

// material-ui
import { useColorScheme, useTheme } from '@mui/material/styles';

// third-party
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

// project-imports
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import { CANDIDATOS, REJEICAO_POR_SEGMENTO, SEGMENTOS } from 'data/horus';

const baseOptions: ApexOptions = {
  chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 4, columnWidth: '60%', borderRadiusApplication: 'end' } },
  dataLabels: { enabled: false },
  xaxis: { categories: [...SEGMENTOS] },
  yaxis: { labels: { formatter: (val: number) => `${val}%` }, max: 50 },
  tooltip: { shared: true, intersect: false, y: { formatter: (val: number) => `${val}%` } },
  legend: { show: true, position: 'bottom', markers: { shape: 'circle' }, itemMargin: { horizontal: 10, vertical: 5 } },
  grid: { strokeDashArray: 4 }
};

export default function RejeicaoBarChart() {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();
  const { state: { fontFamily } } = useConfig();

  const textSecondary = theme.vars.palette.text.secondary;
  const line = theme.vars.palette.divider;

  const segKeys: (keyof typeof REJEICAO_POR_SEGMENTO[0])[] = ['geral', 'evangelicos', 'mulheres2534', 'jovens1624', 'interior'];
  const candidateNames = REJEICAO_POR_SEGMENTO.map((r) => r.candidato);

  const barSeries = candidateNames.map((name, i) => ({
    name,
    data: segKeys.map((key) => REJEICAO_POR_SEGMENTO[i][key] as number)
  }));

  const [options, setOptions] = useState<ApexOptions>(baseOptions);

  useEffect(() => {
    setOptions({
      ...baseOptions,
      chart: { ...baseOptions.chart, fontFamily },
      colors: [CANDIDATOS.gabriel.cor, CANDIDATOS.juliana.cor, CANDIDATOS.zucco.cor, CANDIDATOS.edegar.cor],
      xaxis: { ...baseOptions.xaxis, labels: { style: { colors: String(textSecondary) } } },
      yaxis: { ...baseOptions.yaxis, labels: { style: { colors: [String(textSecondary)] }, formatter: (val: number) => `${val}%` } },
      grid: { ...baseOptions.grid, borderColor: String(line) },
      legend: { ...baseOptions.legend, labels: { colors: String(textSecondary) } },
      theme: { mode: colorScheme === ThemeMode.DARK ? 'dark' : 'light' }
    });
  }, [colorScheme, fontFamily, textSecondary, line]);

  return <ReactApexChart options={options} series={barSeries} type="bar" height={380} />;
}
