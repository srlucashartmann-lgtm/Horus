'use client';

// material-ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import { REJEICAO_POR_SEGMENTO } from 'data/horus';

function getCellColor(value: number): string {
  if (value <= 18) return 'rgba(46, 125, 50, 0.2)';
  if (value <= 24) return 'rgba(102, 187, 106, 0.2)';
  if (value <= 30) return 'rgba(255, 235, 59, 0.25)';
  if (value <= 35) return 'rgba(255, 152, 0, 0.25)';
  return 'rgba(244, 67, 54, 0.25)';
}

function getTextColor(value: number): string {
  if (value <= 18) return '#1B5E20';
  if (value <= 24) return '#2E7D32';
  if (value <= 30) return '#F57F17';
  if (value <= 35) return '#E65100';
  return '#B71C1C';
}

const segKeys: { key: keyof typeof REJEICAO_POR_SEGMENTO[0]; label: string }[] = [
  { key: 'geral', label: 'Geral' },
  { key: 'evangelicos', label: 'Evangélicos' },
  { key: 'mulheres2534', label: 'Mulheres 25-34' },
  { key: 'jovens1624', label: 'Jovens 16-24' },
  { key: 'interior', label: 'Interior' }
];

export default function RejeicaoHeatmap() {
  return (
    <MainCard title="Mapa de Calor — Rejeição" content={false}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Segmento</TableCell>
              {REJEICAO_POR_SEGMENTO.map((r) => (
                <TableCell key={r.candidato} align="center" sx={{ fontWeight: 600 }}>
                  {r.candidato}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {segKeys.map((seg) => (
              <TableRow key={seg.key} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{seg.label}</Typography>
                </TableCell>
                {REJEICAO_POR_SEGMENTO.map((r) => {
                  const val = r[seg.key] as number;
                  return (
                    <TableCell
                      key={r.candidato}
                      align="center"
                      sx={{ bgcolor: getCellColor(val), transition: 'background-color 0.2s' }}
                    >
                      <Typography variant="subtitle2" sx={{ color: getTextColor(val), fontWeight: 700 }}>
                        {val}%
                      </Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}
