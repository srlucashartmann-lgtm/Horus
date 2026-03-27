'use client';

import { useRouter } from 'next/navigation';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { MATRIZ_SENTIMENTO, TEMAS_SENTIMENTO, SENTIMENTO_CORES, SENTIMENTO_LABELS, SentimentoNivel } from 'data/horus';

export default function MatrizSentimento() {
  const router = useRouter();

  return (
    <MainCard title="Matriz de Sentimento por Sessão" content={false}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, minWidth: 180, position: 'sticky', left: 0, bgcolor: 'background.paper', zIndex: 1 }}>Sessão</TableCell>
              {TEMAS_SENTIMENTO.map((t) => (
                <TableCell key={t} align="center" sx={{ fontWeight: 600, fontSize: '0.75rem', minWidth: 90 }}>{t}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {MATRIZ_SENTIMENTO.map((row) => (
              <TableRow
                key={row.sessaoId}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => router.push(`/qualitativo/sessoes/${row.sessaoId}`)}
              >
                <TableCell sx={{ position: 'sticky', left: 0, bgcolor: 'background.paper', zIndex: 1 }}>
                  <Typography variant="subtitle2">{row.sessao}</Typography>
                  <Typography variant="caption" color="text.secondary">{row.data}</Typography>
                </TableCell>
                {TEMAS_SENTIMENTO.map((tema) => {
                  const nivel: SentimentoNivel = row.valores[tema] || 'nao_citado';
                  const label = SENTIMENTO_LABELS[nivel];
                  const bg = SENTIMENTO_CORES[nivel];
                  return (
                    <Tooltip key={tema} title={`${tema} em ${row.sessao}: ${label}`} arrow>
                      <TableCell align="center" sx={{ bgcolor: bg, transition: 'all 0.2s', minWidth: 90 }}>
                        <Typography variant="caption" sx={{ fontWeight: nivel === 'nao_citado' ? 400 : 600, color: nivel === 'nao_citado' ? 'text.disabled' : 'text.primary', fontSize: '0.7rem' }}>
                          {label}
                        </Typography>
                      </TableCell>
                    </Tooltip>
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
