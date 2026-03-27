'use client';

import { useMemo } from 'react';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { ArrowUp, ArrowDown } from '@wandersonalwes/iconsax-react';
import { SEGMENTOS_TABELA } from 'data/horus';

export type SegmentosFilterMode = 'todos' | 'criticos' | 'oportunidades';

function filterRows(mode: SegmentosFilterMode) {
  if (mode === 'criticos') return SEGMENTOS_TABELA.filter((s) => s.variacao < 0);
  if (mode === 'oportunidades') return SEGMENTOS_TABELA.filter((s) => s.variacao > 0);
  return SEGMENTOS_TABELA;
}

type Props = {
  filter?: SegmentosFilterMode;
};

export default function TableSegmentos({ filter = 'todos' }: Props) {
  const rows = useMemo(() => filterRows(filter), [filter]);

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 2 }}>Segmento</TableCell>
            <TableCell align="center">Voto</TableCell>
            <TableCell align="center">Rejeição</TableCell>
            <TableCell align="right" sx={{ pr: 2 }}>Variação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((s) => {
            const rejColor = s.rejeicao >= 35 ? 'error' : s.rejeicao >= 25 ? 'warning' : 'success';
            const pos = s.variacao > 0;
            const neg = s.variacao < 0;
            return (
              <TableRow hover key={s.segmento} sx={{ '&:last-of-type td': { border: 0 } }}>
                <TableCell sx={{ pl: 2 }}>
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>{s.segmento}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>{s.voto}%</Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip label={`${s.rejeicao}%`} color={rejColor} size="small" variant="combined" sx={{ borderRadius: 1, fontSize: '0.65rem', height: 20 }} />
                </TableCell>
                <TableCell align="right" sx={{ pr: 2 }}>
                  {pos && (
                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end', gap: 0.25 }}>
                      <ArrowUp size={12} style={{ color: '#2e7d32' }} />
                      <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>+{s.variacao}pp</Typography>
                    </Stack>
                  )}
                  {neg && (
                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end', gap: 0.25 }}>
                      <ArrowDown size={12} style={{ color: '#c62828' }} />
                      <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 600 }}>{s.variacao}pp</Typography>
                    </Stack>
                  )}
                  {!pos && !neg && (
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>0pp</Typography>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
