'use client';

import { useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';
import { SESSOES_COMPLETAS, SessaoCompleta } from 'data/horus';
import SessaoCard from 'sections/horus/sessoes/SessaoCard';
import NovaSessaoModal from 'sections/horus/sessoes/NovaSessaoModal';
import TranscricaoModal from 'sections/horus/sessoes/TranscricaoModal';
import { Add, SearchNormal1, Filter } from '@wandersonalwes/iconsax-react';
import ModuleTour from 'components/onboarding/ModuleTour';
import TourButton from 'components/onboarding/TourButton';

export default function SessoesListView() {
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [sentimentoFilter, setSentimentoFilter] = useState('Todos');
  const [busca, setBusca] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [localSessoes, setLocalSessoes] = useState<SessaoCompleta[]>([]);
  const allSessoes = useMemo(() => [...SESSOES_COMPLETAS, ...localSessoes], [localSessoes]);

  const [novaOpen, setNovaOpen] = useState(false);
  const [transcricaoSessao, setTranscricaoSessao] = useState<SessaoCompleta | null>(null);

  const filtered = useMemo(() => {
    return allSessoes.filter((s) => {
      if (statusFilter !== 'Todos' && s.status !== statusFilter) return false;
      if (sentimentoFilter !== 'Todos' && s.sentimento !== sentimentoFilter) return false;
      if (busca) {
        const q = busca.toLowerCase();
        return s.titulo.toLowerCase().includes(q) || s.tags.some((t) => t.toLowerCase().includes(q)) || s.resumo.toLowerCase().includes(q);
      }
      return true;
    });
  }, [allSessoes, statusFilter, sentimentoFilter, busca]);

  const totalParts = allSessoes.reduce((s, x) => s + x.participantes, 0);
  const transcritas = allSessoes.filter((s) => s.status === 'Transcrito').length;

  return (
    <>
      <Grid container spacing={GRID_COMMON_SPACING}>
        <Grid size={12}>
          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
            <Stack>
              <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                <Typography variant="h4">Acervo de Sessões Qualitativas</Typography>
                <TourButton tourId="sessoes" />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {allSessoes.length} sessões realizadas · {transcritas} transcritas · {totalParts} participantes no total
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ gap: 1 }}>
              <Button variant="outlined" size="small" startIcon={<Filter size={16} />} onClick={() => setShowFilters(!showFilters)} data-tour="sessoes-filtrar">Filtrar</Button>
              <Button variant="contained" startIcon={<Add size={16} />} onClick={() => setNovaOpen(true)} data-tour="sessoes-nova">Nova Sessão</Button>
            </Stack>
          </Stack>
        </Grid>

        {showFilters && (
          <Grid size={12}>
            <MainCard content={false} sx={{ p: 2 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 2, alignItems: { sm: 'center' }, flexWrap: 'wrap' }}>
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel>Status</InputLabel>
                  <Select value={statusFilter} label="Status" onChange={(e: SelectChangeEvent) => setStatusFilter(e.target.value)}>
                    <MenuItem value="Todos">Todos</MenuItem>
                    <MenuItem value="Transcrito">Transcrito</MenuItem>
                    <MenuItem value="Processando">Processando</MenuItem>
                    <MenuItem value="Pendente">Pendente</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel>Sentimento</InputLabel>
                  <Select value={sentimentoFilter} label="Sentimento" onChange={(e: SelectChangeEvent) => setSentimentoFilter(e.target.value)}>
                    <MenuItem value="Todos">Todos</MenuItem>
                    <MenuItem value="Positivo">Positivo</MenuItem>
                    <MenuItem value="Negativo">Negativo</MenuItem>
                    <MenuItem value="Neutro">Neutro</MenuItem>
                    <MenuItem value="Misto">Misto</MenuItem>
                  </Select>
                </FormControl>
                <OutlinedInput
                  size="small" placeholder="Buscar por título, tag ou resumo..." value={busca} onChange={(e) => setBusca(e.target.value)}
                  startAdornment={<InputAdornment position="start"><SearchNormal1 size={16} /></InputAdornment>} sx={{ minWidth: 280 }}
                />
                {(statusFilter !== 'Todos' || sentimentoFilter !== 'Todos' || busca) && (
                  <Chip label="Limpar filtros" size="small" onDelete={() => { setStatusFilter('Todos'); setSentimentoFilter('Todos'); setBusca(''); }} sx={{ borderRadius: 1 }} />
                )}
              </Stack>
            </MainCard>
          </Grid>
        )}

        <Grid size={12} data-tour="sessoes-grid">
          <Grid container spacing={GRID_COMMON_SPACING}>
            {filtered.map((sessao) => (
              <Grid key={sessao.id} size={{ xs: 12, lg: 6 }}>
                <SessaoCard sessao={sessao} onVerTranscricao={(s) => setTranscricaoSessao(s)} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {filtered.length === 0 && (
          <Grid size={12}>
            <MainCard><Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>Nenhuma sessão encontrada.</Typography></MainCard>
          </Grid>
        )}
      </Grid>

      <NovaSessaoModal open={novaOpen} onClose={() => setNovaOpen(false)} onCreated={(s) => setLocalSessoes((prev) => [s, ...prev])} />
      <TranscricaoModal sessao={transcricaoSessao} open={!!transcricaoSessao} onClose={() => setTranscricaoSessao(null)} />
      <ModuleTour tourId="sessoes" />
    </>
  );
}
