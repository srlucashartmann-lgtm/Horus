'use client';

import { useMemo } from 'react';

// material-ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// project-imports
import MainCard from 'components/MainCard';
import { CrossTabResult, CANDIDATOS } from 'data/horus';

// assets
import { ArrowUp, ArrowDown, DocumentDownload, Document, Archive } from '@wandersonalwes/iconsax-react';

interface Props {
  result: CrossTabResult;
  deltas: number[][] | null;
  compararAtivo: boolean;
  perguntaLabel: string;
  filtroLabel: string;
  rodadaLabel: string;
  cenarioLabel: string;
}

function getDeltaBg(d: number): string {
  if (d >= 3) return 'rgba(46, 125, 50, 0.08)';
  if (d <= -3) return 'rgba(244, 67, 54, 0.08)';
  return 'transparent';
}

export default function CrossTabTable({ result, deltas, compararAtivo, perguntaLabel, filtroLabel, rodadaLabel, cenarioLabel }: Props) {
  const numCols = result.colunas.length;
  const dadosSemBrancos = result.dados.filter((r) => r.candidato !== 'Brancos/Nulos');

  const colMaxIdx = useMemo(() => {
    return Array.from({ length: numCols }, (_, colIdx) => {
      let maxVal = -1;
      let maxRow = -1;
      dadosSemBrancos.forEach((row) => {
        if (row.valores[colIdx] > maxVal) { maxVal = row.valores[colIdx]; maxRow = result.dados.indexOf(row); }
      });
      return maxRow;
    });
  }, [result, numCols, dadosSemBrancos]);

  const colMinIdx = useMemo(() => {
    return Array.from({ length: numCols }, (_, colIdx) => {
      let minVal = Infinity;
      let minRow = -1;
      dadosSemBrancos.forEach((row) => {
        if (row.valores[colIdx] < minVal) { minVal = row.valores[colIdx]; minRow = result.dados.indexOf(row); }
      });
      return minRow;
    });
  }, [result, numCols, dadosSemBrancos]);

  return (
    <Stack sx={{ gap: 2 }}>
      <MainCard
        title={
          <Stack sx={{ gap: 0.5 }}>
            <Typography variant="h5">{`${perguntaLabel} × ${filtroLabel}`}</Typography>
            <Typography variant="caption" color="text.secondary">{`${rodadaLabel} · Cenário ${cenarioLabel}`}</Typography>
          </Stack>
        }
        content={false}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, minWidth: 160 }}>Candidato</TableCell>
                {result.colunas.map((col) => (
                  <TableCell key={col} align="center" sx={{ fontWeight: 600 }}>{col}</TableCell>
                ))}
                <TableCell align="center" sx={{ fontWeight: 700, bgcolor: 'action.hover' }}>TOTAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.dados.map((row, rowIdx) => {
                const isGabriel = row.candidato === 'Gabriel Souza';
                const isBrancos = row.candidato === 'Brancos/Nulos';

                return (
                  <TableRow
                    hover
                    key={row.candidato}
                    sx={isGabriel ? { bgcolor: 'rgba(63, 81, 181, 0.04)' } : undefined}
                  >
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        sx={isGabriel ? { color: CANDIDATOS.gabriel.cor, fontWeight: 700 } : undefined}
                      >
                        {row.candidato}
                      </Typography>
                    </TableCell>

                    {row.valores.map((val, colIdx) => {
                      const delta = compararAtivo && deltas ? deltas[rowIdx]?.[colIdx] ?? null : null;
                      const hasSigDelta = delta !== null && Math.abs(delta) >= 3;

                      const isMax = !isBrancos && colMaxIdx[colIdx] === rowIdx;
                      const isMin = !isBrancos && colMinIdx[colIdx] === rowIdx;

                      let cellBg = 'transparent';
                      if (hasSigDelta) cellBg = getDeltaBg(delta!);

                      let textColor: string | undefined;
                      let fontWeight: number | undefined;
                      if (isGabriel) {
                        textColor = CANDIDATOS.gabriel.cor;
                        fontWeight = 600;
                      }
                      if (isMax) {
                        textColor = '#2E7D32';
                        fontWeight = 700;
                      } else if (isMin) {
                        textColor = '#C62828';
                      }

                      return (
                        <TableCell
                          key={colIdx}
                          align="center"
                          sx={{ bgcolor: cellBg, transition: 'background-color 0.2s' }}
                        >
                          <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center', gap: 0.5 }}>
                            <Typography variant="body2" sx={{ fontWeight, color: textColor }}>
                              {val}%
                            </Typography>
                            {compararAtivo && delta !== null && delta !== 0 && (
                              <Typography
                                variant="caption"
                                sx={{
                                  color: delta > 0 ? 'success.main' : 'error.main',
                                  fontWeight: 600,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.25
                                }}
                              >
                                {delta > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                                {delta > 0 ? '+' : ''}{delta}
                              </Typography>
                            )}
                          </Stack>
                        </TableCell>
                      );
                    })}

                    <TableCell align="center" sx={{ bgcolor: 'action.hover' }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          color: isGabriel ? CANDIDATOS.gabriel.cor : undefined
                        }}
                      >
                        {row.total}%
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>

      {/* Barra de ações + rodapé amostral */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2, px: 1 }}
      >
        <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
          <Button variant="outlined" size="small" startIcon={<DocumentDownload size={16} />}>
            Exportar Excel
          </Button>
          <Button variant="outlined" size="small" startIcon={<Document size={16} />}>
            Exportar PDF
          </Button>
          <Button variant="outlined" size="small" color="secondary" startIcon={<Archive size={16} />}>
            Salvar Cruzamento
          </Button>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          Base: 1.200 entrevistas · Margem de erro: ±2.8pp · Confiança: 95%
        </Typography>
      </Stack>
    </Stack>
  );
}
