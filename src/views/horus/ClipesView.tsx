'use client';

import { useState, useMemo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import { GRID_COMMON_SPACING } from 'config';
import { CLIPES_DATA, Clipe } from 'data/horus';
import ClipeCard from 'sections/horus/clipes/ClipeCard';
import DestaquesSemana from 'sections/horus/clipes/DestaquesSemana';
import AdicionarClipeModal from 'sections/horus/clipes/AdicionarClipeModal';
import { Add, Microphone2, Play, SearchNormal1, Star1, Tag } from '@wandersonalwes/iconsax-react';
import ModuleTour from 'components/onboarding/ModuleTour';
import TourButton from 'components/onboarding/TourButton';

const ALL_TAGS = ['Economia', 'Custo_de_Vida', 'Emprego', 'Segurança', 'Medo', 'Família', 'Abandono', 'Elogio_Gabriel', 'Ataque_Adversário', 'Elogio_Adversário', 'Saúde', 'Educação'];

export default function ClipesView() {
  const [clipes, setClipes] = useState<Clipe[]>(CLIPES_DATA);
  const [busca, setBusca] = useState('');
  const [tagFilter, setTagFilter] = useState('Todos');
  const [sentFilter, setSentFilter] = useState('Todos');
  const [candFilter, setCandFilter] = useState('Todos');
  const [soFavoritos, setSoFavoritos] = useState(false);
  const [ordenacao, setOrdenacao] = useState('recentes');
  const [addOpen, setAddOpen] = useState(false);

  const toggleFav = useCallback((id: number) => {
    setClipes((prev) => prev.map((c) => c.id === id ? { ...c, favorito: !c.favorito } : c));
  }, []);

  const filtered = useMemo(() => {
    let r = [...clipes];
    if (busca) { const q = busca.toLowerCase(); r = r.filter((c) => c.frase.toLowerCase().includes(q) || c.participante.nome.toLowerCase().includes(q) || c.tags.some((t) => t.toLowerCase().includes(q))); }
    if (tagFilter !== 'Todos') r = r.filter((c) => c.tags.includes(tagFilter));
    if (sentFilter !== 'Todos') r = r.filter((c) => c.sentimento === sentFilter);
    if (candFilter !== 'Todos') r = r.filter((c) => c.candidatoMencionado === candFilter);
    if (soFavoritos) r = r.filter((c) => c.favorito);
    switch (ordenacao) {
      case 'mencoes': r.sort((a, b) => b.mencoes - a.mencoes); break;
      case 'favoritos': r.sort((a, b) => (b.favorito ? 1 : 0) - (a.favorito ? 1 : 0)); break;
      case 'sessao': r.sort((a, b) => a.sessao.localeCompare(b.sessao)); break;
      default: break;
    }
    return r;
  }, [clipes, busca, tagFilter, sentFilter, candFilter, soFavoritos, ordenacao]);

  const favoritos = useMemo(() => clipes.filter((c) => c.favorito), [clipes]);
  const uniqueTags = useMemo(() => [...new Set(clipes.flatMap((c) => c.tags))], [clipes]);
  const temaMaisFreq = useMemo(() => {
    const m: Record<string, number> = {};
    clipes.forEach((c) => c.tags.forEach((t) => { m[t] = (m[t] || 0) + 1; }));
    return Object.entries(m).sort((a, b) => b[1] - a[1])[0];
  }, [clipes]);

  return (
    <>
    <Grid container spacing={GRID_COMMON_SPACING}>
      {/* Header */}
      <Grid size={12}>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
          <Stack>
            <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
              <Typography variant="h4">Biblioteca de Clipes</Typography>
              <TourButton tourId="clipes" />
            </Stack>
            <Typography variant="body2" color="text.secondary">Os melhores momentos de todas as sessões qualitativas</Typography>
          </Stack>
          <Button variant="contained" startIcon={<Add size={16} />} onClick={() => setAddOpen(true)}>Adicionar Clipe</Button>
        </Stack>
      </Grid>

      {/* Stats */}
      <Grid size={12}>
        <Stack direction="row" sx={{ gap: 2, flexWrap: 'wrap' }}>
          <MainCard content={false} sx={{ px: 2, py: 1.5 }}>
            <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}><Avatar color="primary" size="sm"><Play size={16} /></Avatar><Typography variant="subtitle2">{clipes.length} clipes</Typography></Stack>
          </MainCard>
          <MainCard content={false} sx={{ px: 2, py: 1.5 }}>
            <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}><Avatar color="warning" size="sm"><Tag size={16} /></Avatar><Typography variant="subtitle2">{uniqueTags.length} tags</Typography></Stack>
          </MainCard>
          <MainCard content={false} sx={{ px: 2, py: 1.5 }}>
            <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}><Avatar color="success" size="sm"><Microphone2 size={16} /></Avatar><Typography variant="subtitle2">5 sessões</Typography></Stack>
          </MainCard>
          {temaMaisFreq && (
            <MainCard content={false} sx={{ px: 2, py: 1.5 }}>
              <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}><Avatar color="error" size="sm"><Star1 size={16} /></Avatar><Typography variant="subtitle2">Top: {temaMaisFreq[0].replace(/_/g, ' ')} ({temaMaisFreq[1]})</Typography></Stack>
            </MainCard>
          )}
        </Stack>
      </Grid>

      {/* Filtros */}
      <Grid size={12}>
        <Box data-tour="clipes-filtros">
        <MainCard content={false} sx={{ p: 2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 2, alignItems: { sm: 'center' }, flexWrap: 'wrap' }}>
            <OutlinedInput size="small" placeholder="Buscar frase, nome ou tag..." value={busca} onChange={(e) => setBusca(e.target.value)} startAdornment={<InputAdornment position="start"><SearchNormal1 size={16} /></InputAdornment>} sx={{ minWidth: 240 }} />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Tag</InputLabel>
              <Select value={tagFilter} label="Tag" onChange={(e: SelectChangeEvent) => setTagFilter(e.target.value)}>
                <MenuItem value="Todos">Todas</MenuItem>
                {ALL_TAGS.map((t) => <MenuItem key={t} value={t}>{t.replace(/_/g, ' ')}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>Sentimento</InputLabel>
              <Select value={sentFilter} label="Sentimento" onChange={(e: SelectChangeEvent) => setSentFilter(e.target.value)}>
                <MenuItem value="Todos">Todos</MenuItem>
                <MenuItem value="Positivo">Positivo</MenuItem>
                <MenuItem value="Negativo">Negativo</MenuItem>
                <MenuItem value="Neutro">Neutro</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>Candidato</InputLabel>
              <Select value={candFilter} label="Candidato" onChange={(e: SelectChangeEvent) => setCandFilter(e.target.value)}>
                <MenuItem value="Todos">Todos</MenuItem>
                <MenuItem value="Gabriel">Gabriel</MenuItem>
                <MenuItem value="Juliana">Juliana</MenuItem>
                <MenuItem value="Zucco">Zucco</MenuItem>
                <MenuItem value="Edegar">Edegar</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel control={<Switch checked={soFavoritos} onChange={(e) => setSoFavoritos(e.target.checked)} size="small" />} label={<Typography variant="body2">⭐ Só favoritos</Typography>} />
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Ordenar</InputLabel>
              <Select value={ordenacao} label="Ordenar" onChange={(e: SelectChangeEvent) => setOrdenacao(e.target.value)}>
                <MenuItem value="recentes">Mais recentes</MenuItem>
                <MenuItem value="mencoes">Mais menções</MenuItem>
                <MenuItem value="favoritos">Favoritos primeiro</MenuItem>
                <MenuItem value="sessao">Por sessão</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </MainCard>
        </Box>
      </Grid>

      {/* Grid principal */}
      <Grid size={{ xs: 12, lg: 8 }}>
        <Grid container spacing={2} data-tour="clipes-grid">
          {filtered.map((clipe) => (
            <Grid key={clipe.id} size={{ xs: 12, md: 6 }}>
              <ClipeCard clipe={clipe} onToggleFav={toggleFav} />
            </Grid>
          ))}
          {filtered.length === 0 && (
            <Grid size={12}>
              <MainCard><Typography color="text.secondary" align="center" sx={{ py: 4 }}>Nenhum clipe encontrado.</Typography></MainCard>
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* Destaques */}
      <Grid size={{ xs: 12, lg: 4 }}>
        <DestaquesSemana favoritos={favoritos} total={clipes.length} onRemoveFav={toggleFav} />
      </Grid>
    </Grid>

    <AdicionarClipeModal open={addOpen} onClose={() => setAddOpen(false)} onCreated={(c) => setClipes((prev) => [c, ...prev])} />
    <ModuleTour tourId="clipes" />
    </>
  );
}
