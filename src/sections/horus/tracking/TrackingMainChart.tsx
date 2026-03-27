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
import { CANDIDATOS, TRACKING_DATA, REJEICAO_DATA, APROVACAO_DATA, EVENTOS_CAMPANHA, TrackingRow } from 'data/horus';

type MetricType = 'intencao' | 'rejeicao' | 'aprovacao';

interface Props {
  metric: MetricType;
}

function getDataForMetric(metric: MetricType): TrackingRow[] {
  switch (metric) {
    case 'rejeicao': return REJEICAO_DATA;
    case 'aprovacao': return APROVACAO_DATA;
    default: return TRACKING_DATA;
  }
}

function getMaxY(metric: MetricType): number {
  switch (metric) {
    case 'rejeicao': return 50;
    case 'aprovacao': return 60;
    default: return 55;
  }
}

export default function TrackingMainChart({ metric }: Props) {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();
  const { state: { fontFamily } } = useConfig();

  const textSecondary = theme.vars.palette.text.secondary;
  const line = theme.vars.palette.divider;
  const bgPaper = theme.vars.palette.background.paper;

  const data = getDataForMetric(metric);
  const hasBrancos = metric === 'intencao';

  const brancosStrokeColor = 'rgba(158, 158, 158, 0.35)';

  const series = [
    { name: CANDIDATOS.gabriel.nome, data: data.map((r) => r.gabriel), type: 'area' as const },
    { name: CANDIDATOS.juliana.nome, data: data.map((r) => r.juliana), type: 'line' as const },
    { name: CANDIDATOS.zucco.nome, data: data.map((r) => r.zucco), type: 'line' as const },
    { name: CANDIDATOS.edegar.nome, data: data.map((r) => r.edegar), type: 'line' as const },
    ...(hasBrancos ? [{ name: CANDIDATOS.brancos.nome, data: data.map((r) => r.brancos), type: 'line' as const }] : [])
  ];

  const [options, setOptions] = useState<ApexOptions>({});

  useEffect(() => {
    const annotations: ApexAnnotations = {
      xaxis: EVENTOS_CAMPANHA.map((ev) => ({
        x: ev.data,
        borderColor: '#FF9800',
        strokeDashArray: 3,
        opacity: 0.8,
        label: {
          text: ev.label,
          orientation: 'horizontal',
          position: 'top',
          borderWidth: 0,
          offsetY: -8,
          style: {
            background: colorScheme === ThemeMode.DARK ? '#424242' : '#FFF8E1',
            color: colorScheme === ThemeMode.DARK ? '#FFB74D' : '#E65100',
            fontSize: '10px',
            fontFamily,
            fontWeight: 600,
            padding: { left: 6, right: 6, top: 3, bottom: 3 }
          }
        }
      }))
    };

    setOptions({
      chart: {
        type: 'line',
        stacked: false,
        background: 'transparent',
        fontFamily,
        toolbar: { show: true, tools: { download: true, selection: false, zoom: true, zoomin: true, zoomout: true, pan: false, reset: true } }
      },
      colors: [
        CANDIDATOS.gabriel.cor,
        CANDIDATOS.juliana.cor,
        CANDIDATOS.zucco.cor,
        CANDIDATOS.edegar.cor,
        ...(hasBrancos ? [brancosStrokeColor] : [])
      ],
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: hasBrancos ? [3, 2, 2, 1.5, 1] : [3, 2, 2, 1.5],
        dashArray: hasBrancos ? [0, 0, 0, 0, 10] : [0, 0, 0, 0]
      },
      fill: {
        type: hasBrancos
          ? ['gradient', 'solid', 'solid', 'solid', 'solid']
          : ['gradient', 'solid', 'solid', 'solid'],
        gradient: {
          type: 'vertical',
          shadeIntensity: 0,
          opacityFrom: 0.2,
          opacityTo: 0.02,
          colorStops: [
            [
              { offset: 0, color: CANDIDATOS.gabriel.cor, opacity: 0.2 },
              { offset: 100, color: String(bgPaper), opacity: 0.02 }
            ]
          ]
        }
      },
      markers: {
        size: [4, 0, 0, 0, ...(hasBrancos ? [0] : [])],
        strokeWidth: 2,
        hover: { sizeOffset: 3 }
      },
      xaxis: {
        categories: TRACKING_DATA.map((r) => r.data),
        labels: { style: { colors: String(textSecondary), fontSize: '11px' } },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        min: 0,
        max: getMaxY(metric),
        labels: { style: { colors: [String(textSecondary)] }, formatter: (val: number) => `${val}%` }
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: { formatter: (val: number) => `${val}%` }
      },
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        markers: { shape: 'circle' },
        itemMargin: { horizontal: 12, vertical: 8 },
        labels: { colors: String(textSecondary) }
      },
      grid: {
        strokeDashArray: 4,
        borderColor: String(line)
      },
      annotations,
      theme: { mode: colorScheme === ThemeMode.DARK ? 'dark' : 'light' }
    });
  }, [colorScheme, fontFamily, textSecondary, line, bgPaper, metric, hasBrancos]);

  return <ReactApexChart options={options} series={series} type="line" height={420} />;
}
