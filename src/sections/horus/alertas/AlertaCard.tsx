'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useColorScheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';
import { AlertaItem } from 'data/horus';
import { TickCircle, VolumeSlash, Warning2 } from '@wandersonalwes/iconsax-react';

const sevColors: Record<string, string> = { critico: '#C62828', atencao: '#ED6C02', positivo: '#2E7D32' };
const sevLabels: Record<string, string> = { critico: 'Crítico', atencao: 'Atenção', positivo: 'Positivo' };
const sevChipColor: Record<string, 'error' | 'warning' | 'success'> = { critico: 'error', atencao: 'warning', positivo: 'success' };
const sevBg: Record<string, string> = { critico: 'rgba(198,40,40,0.06)', atencao: 'rgba(237,108,2,0.04)', positivo: 'rgba(46,125,50,0.04)' };
const statusText: Record<string, string> = { ativo: 'Ativo', monitoramento: 'Monitoramento', resolvido: 'Resolvido' };

interface Props { alerta: AlertaItem; onResolver: (id: number) => void }

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const { colorScheme } = useColorScheme();
  const [opts, setOpts] = useState<ApexOptions>({});
  useEffect(() => {
    setOpts({ chart: { type: 'area', sparkline: { enabled: true }, background: 'transparent' }, stroke: { curve: 'smooth', width: 2 }, colors: [color], fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } }, tooltip: { enabled: false }, theme: { mode: colorScheme === ThemeMode.DARK ? 'dark' : 'light' } });
  }, [color, colorScheme]);
  return <ReactApexChart options={opts} series={[{ data }]} type="area" height={32} width={90} />;
}

export default function AlertaCard({ alerta, onResolver }: Props) {
  const router = useRouter();
  const cor = sevColors[alerta.severidade];
  const isCritico = alerta.severidade === 'critico';

  return (
    <MainCard
      content={false}
      sx={{
        borderLeft: `${isCritico ? 6 : 4}px solid ${cor}`,
        bgcolor: sevBg[alerta.severidade],
        boxShadow: isCritico ? 4 : 1,
        ...(alerta.status === 'resolvido' && { opacity: 0.5 })
      }}
    >
      <Stack sx={{ px: 2, py: 1.5, gap: 1 }}>
        {/* Linha 1: severidade + título + tempo + status */}
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
          <Stack direction="row" sx={{ gap: 0.75, alignItems: 'center', flex: 1, minWidth: 0 }}>
            {isCritico && alerta.status !== 'resolvido' && (
              <Box sx={{ '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } }, animation: 'pulse 1.5s infinite', display: 'flex', flexShrink: 0 }}>
                <Warning2 size={18} color={cor} variant="Bold" />
              </Box>
            )}
            <Chip label={sevLabels[alerta.severidade]} color={sevChipColor[alerta.severidade]} size="small" sx={{ borderRadius: 1, fontWeight: 700, height: 22 }} />
            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600, ...(alerta.status === 'resolvido' && { textDecoration: 'line-through' }) }}>{alerta.titulo}</Typography>
          </Stack>
          <Stack direction="row" sx={{ gap: 1, alignItems: 'center', flexShrink: 0 }}>
            <Typography variant="caption" color="text.secondary">{alerta.tempoAtras}</Typography>
            <Chip label={statusText[alerta.status]} size="small" variant="outlined" color={alerta.status === 'resolvido' ? 'success' : alerta.status === 'monitoramento' ? 'warning' : 'error'} sx={{ borderRadius: 1, height: 20, fontSize: '0.65rem' }} />
          </Stack>
        </Stack>

        {/* Linha 2: descrição + sparkline */}
        <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>{alerta.descricao}</Typography>
          {alerta.sparkline && <MiniSparkline data={alerta.sparkline} color={cor} />}
        </Stack>

        {/* Linha 3: tags + ação sugerida + botões */}
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 1 }}>
          <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center', flexWrap: 'wrap', flex: 1 }}>
            {alerta.tags.map((t) => <Chip key={t} label={t} size="small" variant="outlined" sx={{ borderRadius: 1, fontSize: '0.65rem', height: 20 }} />)}
            <Typography variant="caption" sx={{ color: cor, fontWeight: 600, ml: 0.5 }}>→ {alerta.acaoSugerida}</Typography>
          </Stack>
          <Stack direction="row" sx={{ gap: 0.75, flexShrink: 0 }}>
            <Button size="small" variant="contained" sx={{ fontSize: '0.7rem', py: 0.25 }} onClick={() => router.push('/inteligencia/causa-efeito')}>Investigar</Button>
            {alerta.status !== 'resolvido' && (
              <Button size="small" variant="outlined" color="success" sx={{ fontSize: '0.7rem', py: 0.25 }} startIcon={<TickCircle size={12} />} onClick={() => onResolver(alerta.id)}>Resolvido</Button>
            )}
            <Button size="small" variant="text" color="secondary" sx={{ fontSize: '0.7rem', py: 0.25, minWidth: 'auto' }} startIcon={<VolumeSlash size={12} />}>Silenciar</Button>
          </Stack>
        </Stack>

        <Typography sx={{ fontSize: '0.65rem', color: 'text.disabled' }}>Criado: {alerta.criadoEm}</Typography>
      </Stack>
    </MainCard>
  );
}
