'use client';

import { useState, useEffect } from 'react';
import { useColorScheme, useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import { SEGUNDO_TURNO, CANDIDATOS } from 'data/horus';
import { TickCircle, Warning2, People } from '@wandersonalwes/iconsax-react';

export default function SegundoTurnoComponent() {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();
  const { state: { fontFamily } } = useConfig();
  const textSecondary = theme.vars.palette.text.secondary;
  const line = theme.vars.palette.divider;

  const [adversario, setAdversario] = useState(0);
  const cenario = SEGUNDO_TURNO[adversario];

  const [options, setOptions] = useState<ApexOptions>({});

  useEffect(() => {
    setOptions({
      chart: { type: 'bar', background: 'transparent', toolbar: { show: false }, fontFamily },
      plotOptions: { bar: { horizontal: true, borderRadius: 6, barHeight: '50%' } },
      dataLabels: { enabled: true, formatter: (val: number) => `${val}%`, style: { fontSize: '14px', fontWeight: 700 } },
      xaxis: { categories: ['Gabriel Souza', cenario.adversario, 'Brancos/Nulos'], max: 70, labels: { formatter: (val: string) => `${val}%`, style: { colors: String(textSecondary) } } },
      yaxis: { labels: { style: { colors: [String(textSecondary)] } } },
      colors: [CANDIDATOS.gabriel.cor, CANDIDATOS.juliana.cor, '#BDBDBD'],
      grid: { borderColor: String(line), strokeDashArray: 4 },
      legend: { show: false },
      tooltip: { y: { formatter: (val: number) => `${val}%` } },
      theme: { mode: colorScheme === ThemeMode.DARK ? 'dark' : 'light' }
    });
  }, [colorScheme, fontFamily, textSecondary, line, cenario.adversario]);

  const series = [{ name: '2º Turno', data: [cenario.gabriel, cenario.oponente, cenario.brancos] }];

  const insights = [
    { text: 'Gabriel vence em todos os cenários de 2º turno', icon: <TickCircle variant="Bold" size={20} />, color: '#2E7D32' },
    { text: `Adversário mais competitivo: Juliana Brizola (32%)`, icon: <Warning2 variant="Bold" size={20} />, color: '#ED6C02' },
    { text: `Maior taxa de B/N: contra Edegar (18%) — votos em disputa`, icon: <People variant="Bold" size={20} />, color: '#3F51B5' }
  ];

  return (
    <Stack sx={{ gap: 2.5 }}>
      <MainCard>
        <Stack sx={{ gap: 2 }}>
          <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 220 }}>
              <InputLabel>Adversário no 2º turno</InputLabel>
              <Select value={String(adversario)} label="Adversário no 2º turno" onChange={(e: SelectChangeEvent) => setAdversario(Number(e.target.value))}>
                {SEGUNDO_TURNO.map((c, i) => <MenuItem key={i} value={String(i)}>{c.adversario}</MenuItem>)}
              </Select>
            </FormControl>
            <Typography variant="h5">Gabriel Souza vs {cenario.adversario}</Typography>
          </Stack>
        </Stack>
      </MainCard>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 7 }}>
          <MainCard title={`2º Turno: Gabriel vs ${cenario.adversario}`}>
            <ReactApexChart options={options} series={series} type="bar" height={220} />
          </MainCard>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack sx={{ gap: 2, height: '100%', justifyContent: 'center' }}>
            {insights.map((ins) => (
              <MainCard key={ins.text} content={false} sx={{ borderLeft: `4px solid ${ins.color}` }}>
                <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', p: 2 }}>
                  <Stack sx={{ color: ins.color }}>{ins.icon}</Stack>
                  <Typography variant="body2">{ins.text}</Typography>
                </Stack>
              </MainCard>
            ))}
          </Stack>
        </Grid>
      </Grid>

      <MainCard title="Comparativo — Todos os cenários de 2º turno" content={false}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Cenário</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Gabriel</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Adversário</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>B/N</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Gap</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {SEGUNDO_TURNO.map((c) => (
                <TableRow hover key={c.adversario}>
                  <TableCell><Typography variant="subtitle2">vs {c.adversario}</Typography></TableCell>
                  <TableCell align="center"><Typography variant="body2" sx={{ fontWeight: 700, color: CANDIDATOS.gabriel.cor }}>{c.gabriel}%</Typography></TableCell>
                  <TableCell align="center"><Typography variant="body2">{c.oponente}%</Typography></TableCell>
                  <TableCell align="center"><Typography variant="body2" color="text.secondary">{c.brancos}%</Typography></TableCell>
                  <TableCell align="center"><Typography variant="subtitle2" color="success.main">{c.gabriel - c.oponente}pp</Typography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
    </Stack>
  );
}
