'use client';

import { useMemo } from 'react';

// material-ui
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import { CSVExport } from 'components/third-party/react-table';
import { TRACKING_DATA, TrackingRow } from 'data/horus';

const csvHeaders = [
  { label: 'Data', key: 'data' },
  { label: 'Gabriel Souza', key: 'gabriel' },
  { label: 'Juliana Brizola', key: 'juliana' },
  { label: 'Zucco', key: 'zucco' },
  { label: 'Edegar Pretto', key: 'edegar' },
  { label: 'Brancos/Nulos', key: 'brancos' },
  { label: 'Evento', key: 'evento' }
];

export default function TrackingTable() {
  const csvData = useMemo(
    () =>
      TRACKING_DATA.map((row) => ({
        data: row.data,
        gabriel: `${row.gabriel}%`,
        juliana: `${row.juliana}%`,
        zucco: `${row.zucco}%`,
        edegar: `${row.edegar}%`,
        brancos: `${row.brancos}%`,
        evento: row.evento || ''
      })),
    []
  );

  return (
    <MainCard
      title="Dados Detalhados do Tracking"
      content={false}
      secondary={<CSVExport data={csvData} filename="tracking-horus.csv" headers={csvHeaders} />}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell align="center">Gabriel Souza</TableCell>
              <TableCell align="center">Juliana Brizola</TableCell>
              <TableCell align="center">Zucco</TableCell>
              <TableCell align="center">Edegar Pretto</TableCell>
              <TableCell align="center">Brancos/Nulos</TableCell>
              <TableCell>Evento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TRACKING_DATA.map((row: TrackingRow) => (
              <TableRow hover key={row.data}>
                <TableCell>
                  <Typography variant="subtitle2">{row.data}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#3F51B5' }}>{row.gabriel}%</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{row.juliana}%</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{row.zucco}%</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{row.edegar}%</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" color="text.secondary">{row.brancos}%</Typography>
                </TableCell>
                <TableCell>
                  {row.evento && (
                    <Chip label={row.evento} size="small" color="warning" variant="light" sx={{ borderRadius: 1 }} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}
