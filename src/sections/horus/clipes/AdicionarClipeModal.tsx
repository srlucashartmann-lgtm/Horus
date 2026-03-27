'use client';

import { useState, KeyboardEvent } from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import { SESSOES_COMPLETAS, Clipe } from 'data/horus';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (clipe: Clipe) => void;
}

export default function AdicionarClipeModal({ open, onClose, onCreated }: Props) {
  const [frase, setFrase] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [perfil, setPerfil] = useState('');
  const [sessaoId, setSessaoId] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [sentimento, setSentimento] = useState<string>('Neutro');

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleSubmit = () => {
    if (!frase || !nome) {
      openSnackbar({ open: true, message: 'Preencha pelo menos a frase e o nome', variant: 'alert', severity: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } } as SnackbarProps);
      return;
    }
    const sessao = SESSOES_COMPLETAS.find((s) => s.id === sessaoId);
    const novo: Clipe = {
      id: Date.now(),
      frase,
      participante: { nome, idade: Number(idade) || 0, perfil: perfil || '' },
      sessao: sessao?.titulo || 'Manual',
      sessaoId: sessaoId || '0',
      data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', ''),
      timestamp: timestamp || '00:00:00',
      tags,
      sentimento: sentimento as any,
      candidatoMencionado: null,
      mencoes: 1,
      favorito: false
    };
    onCreated(novo);
    openSnackbar({ open: true, message: 'Clipe adicionado!', variant: 'alert', severity: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } } as SnackbarProps);
    setFrase(''); setNome(''); setIdade(''); setPerfil(''); setSessaoId(''); setTimestamp(''); setTags([]); setSentimento('Neutro');
    onClose();
  };

  return (
    <>
      {open && (
        <Modal open={open} onClose={onClose}>
          <MainCard sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', minWidth: { xs: 340, sm: 500 }, maxWidth: 560, maxHeight: '90vh' }} modal content={false}>
            <SimpleBar sx={{ maxHeight: 'calc(90vh - 48px)' }}>
              <DialogTitle>Adicionar Clipe Manual</DialogTitle>
              <Divider />
              <DialogContent sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <TextField label="Frase *" fullWidth multiline rows={2} value={frase} onChange={(e) => setFrase(e.target.value)} placeholder="A frase do eleitor..." />
                  </Grid>
                  <Grid size={6}>
                    <TextField label="Nome *" fullWidth value={nome} onChange={(e) => setNome(e.target.value)} />
                  </Grid>
                  <Grid size={3}>
                    <TextField label="Idade" fullWidth type="number" value={idade} onChange={(e) => setIdade(e.target.value)} />
                  </Grid>
                  <Grid size={3}>
                    <TextField label="Perfil" fullWidth value={perfil} onChange={(e) => setPerfil(e.target.value)} placeholder="Classe C" />
                  </Grid>
                  <Grid size={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Sessão de origem</InputLabel>
                      <Select value={sessaoId} label="Sessão de origem" onChange={(e) => setSessaoId(e.target.value as string)}>
                        <MenuItem value="">Nenhuma</MenuItem>
                        {SESSOES_COMPLETAS.map((s) => <MenuItem key={s.id} value={s.id}>{s.titulo}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={3}>
                    <TextField label="Timestamp" fullWidth value={timestamp} onChange={(e) => setTimestamp(e.target.value)} placeholder="00:01:15" size="small" />
                  </Grid>
                  <Grid size={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Sentimento</InputLabel>
                      <Select value={sentimento} label="Sentimento" onChange={(e) => setSentimento(e.target.value)}>
                        <MenuItem value="Positivo">Positivo</MenuItem>
                        <MenuItem value="Negativo">Negativo</MenuItem>
                        <MenuItem value="Neutro">Neutro</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <TextField label="Tags (Enter para adicionar)" fullWidth value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleAddTag} placeholder="Digite e pressione Enter" size="small" />
                    {tags.length > 0 && (
                      <Stack direction="row" sx={{ gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
                        {tags.map((t) => <Chip key={t} label={t} size="small" onDelete={() => setTags(tags.filter((x) => x !== t))} sx={{ borderRadius: 1 }} />)}
                      </Stack>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>
              <Divider />
              <DialogActions sx={{ p: 2.5 }}>
                <Button color="secondary" onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit}>Adicionar Clipe</Button>
              </DialogActions>
            </SimpleBar>
          </MainCard>
        </Modal>
      )}
    </>
  );
}
