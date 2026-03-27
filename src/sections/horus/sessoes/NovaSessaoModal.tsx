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
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import { DocumentUpload } from '@wandersonalwes/iconsax-react';
import { SessaoCompleta } from 'data/horus';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (sessao: SessaoCompleta) => void;
}

const ACCEPT = '.mp3,.wav,.m4a,.ogg,.mp4,.webm,.mov,.avi';

export default function NovaSessaoModal({ open, onClose, onCreated }: Props) {
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [participantes, setParticipantes] = useState('');
  const [duracao, setDuracao] = useState('');
  const [moderador, setModerador] = useState('');
  const [sentimento, setSentimento] = useState<string>('Neutro');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [resumo, setResumo] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) setFile(files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files);
  };

  const handleSubmit = () => {
    if (!titulo || !data || !participantes || !duracao || !moderador) {
      openSnackbar({ open: true, message: 'Preencha todos os campos obrigatórios', variant: 'alert', severity: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } } as SnackbarProps);
      return;
    }
    const nova: SessaoCompleta = {
      id: String(Date.now()),
      titulo,
      data,
      participantes: Number(participantes),
      duracao,
      moderador,
      sentimento: sentimento as any,
      status: resumo ? 'Transcrito' : 'Pendente',
      tags,
      resumo: resumo || 'Resumo pendente — aguardando transcrição.',
      pontosIA: [],
      transcricao: [],
      sentimentoParticipantes: [],
      tagFrequencias: tags.map((t) => ({ tag: t, count: 1 }))
    };
    onCreated(nova);
    openSnackbar({ open: true, message: 'Sessão criada com sucesso', variant: 'alert', severity: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } } as SnackbarProps);
    setTitulo(''); setData(''); setParticipantes(''); setDuracao(''); setModerador(''); setSentimento('Neutro'); setTags([]); setResumo(''); setFile(null);
    onClose();
  };

  return (
    <>
      {open && (
        <Modal open={open} onClose={onClose}>
          <MainCard sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', minWidth: { xs: 340, sm: 500, md: 680 }, maxWidth: 680, maxHeight: '90vh' }} modal content={false}>
            <SimpleBar sx={{ maxHeight: 'calc(90vh - 48px)' }}>
              <DialogTitle>Nova Sessão Qualitativa</DialogTitle>
              <Divider />
              <DialogContent sx={{ p: 3 }}>
                <Grid container spacing={2.5}>
                  <Grid size={12}>
                    <TextField label="Título da sessão *" fullWidth value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex: Mulheres Indecisas — Classe C" />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField label="Data *" fullWidth value={data} onChange={(e) => setData(e.target.value)} placeholder="20/Mar" />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField label="Participantes *" fullWidth type="number" value={participantes} onChange={(e) => setParticipantes(e.target.value)} />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField label="Duração *" fullWidth value={duracao} onChange={(e) => setDuracao(e.target.value)} placeholder="1h 42min" />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField label="Moderador *" fullWidth value={moderador} onChange={(e) => setModerador(e.target.value)} />
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>Sentimento geral</InputLabel>
                      <Select value={sentimento} label="Sentimento geral" onChange={(e) => setSentimento(e.target.value)}>
                        <MenuItem value="Positivo">Positivo</MenuItem>
                        <MenuItem value="Negativo">Negativo</MenuItem>
                        <MenuItem value="Neutro">Neutro</MenuItem>
                        <MenuItem value="Misto">Misto</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <TextField label="Tags (Enter para adicionar)" fullWidth value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleAddTag} placeholder="Digite e pressione Enter" />
                    {tags.length > 0 && (
                      <Stack direction="row" sx={{ gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
                        {tags.map((t) => <Chip key={t} label={t} size="small" onDelete={() => setTags(tags.filter((x) => x !== t))} sx={{ borderRadius: 1 }} />)}
                      </Stack>
                    )}
                  </Grid>
                  <Grid size={12}>
                    <TextField label="Resumo" fullWidth multiline rows={3} value={resumo} onChange={(e) => setResumo(e.target.value)} placeholder="Resumo da sessão (opcional — pode ser gerado por IA depois)" />
                  </Grid>
                  <Grid size={12}>
                    <Box
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                      sx={{ p: 3, border: '2px dashed', borderColor: file ? 'primary.main' : 'divider', borderRadius: 2, textAlign: 'center', bgcolor: 'action.hover', cursor: 'pointer' }}
                      onClick={() => document.getElementById('upload-midia')?.click()}
                    >
                      <input id="upload-midia" type="file" accept={ACCEPT} hidden onChange={(e) => handleFileChange(e.target.files)} />
                      {file ? (
                        <Stack sx={{ gap: 0.5, alignItems: 'center' }}>
                          <DocumentUpload size={32} />
                          <Typography variant="subtitle2">{file.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{(file.size / 1024 / 1024).toFixed(1)} MB · {file.type}</Typography>
                          <Button size="small" color="error" onClick={(e) => { e.stopPropagation(); setFile(null); }}>Remover</Button>
                        </Stack>
                      ) : (
                        <Stack sx={{ gap: 0.5, alignItems: 'center' }}>
                          <DocumentUpload size={32} />
                          <Typography variant="body2" color="text.secondary">Arraste o áudio ou vídeo do grupo focal aqui</Typography>
                          <Typography variant="caption" color="text.secondary">.mp3, .wav, .mp4, .webm, .mov</Typography>
                        </Stack>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <Divider />
              <DialogActions sx={{ p: 2.5 }}>
                <Button color="secondary" onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit}>Criar Sessão</Button>
              </DialogActions>
            </SimpleBar>
          </MainCard>
        </Modal>
      )}
    </>
  );
}
