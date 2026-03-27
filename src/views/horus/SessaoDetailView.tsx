'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';
import SimpleBar from 'components/third-party/SimpleBar';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import { GRID_COMMON_SPACING } from 'config';
import { getSessaoById } from 'data/horus';
import { ArrowLeft, Calendar, Clock, DocumentText1, DocumentUpload, Microphone2, People, Cpu, VideoPlay } from '@wandersonalwes/iconsax-react';

interface Props { id: string }

const sentimentoColors: Record<string, 'success' | 'error' | 'secondary' | 'warning'> = {
  Positivo: 'success', Negativo: 'error', Neutro: 'secondary', Misto: 'warning'
};

const ACCEPT_MEDIA = '.mp3,.wav,.m4a,.ogg,.mp4,.webm,.mov,.avi';
const VIDEO_EXTS = ['.mp4', '.webm', '.mov', '.avi'];

export default function SessaoDetailView({ id }: Props) {
  const router = useRouter();
  const sessao = getSessaoById(id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);

  const [iaOpen, setIaOpen] = useState(false);
  const [iaLoading, setIaLoading] = useState(false);
  const [iaReady, setIaReady] = useState(false);

  const handleFileChange = useCallback((files: FileList | null) => {
    if (files && files[0]) {
      const f = files[0];
      setMediaFile(f);
      setMediaUrl(URL.createObjectURL(f));
      setIsVideo(VIDEO_EXTS.some((ext) => f.name.toLowerCase().endsWith(ext)));
    }
  }, []);

  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); handleFileChange(e.dataTransfer.files); };

  const handleGerarIA = () => {
    setIaOpen(true);
    setIaLoading(true);
    setIaReady(false);
    setTimeout(() => { setIaLoading(false); setIaReady(true); }, 2000);
  };

  const handleExportPDF = () => {
    openSnackbar({ open: true, message: 'Exportação PDF em desenvolvimento', variant: 'alert', severity: 'info', anchorOrigin: { vertical: 'top', horizontal: 'right' } } as SnackbarProps);
  };

  if (!sessao) {
    return (
      <MainCard>
        <Stack sx={{ gap: 2, alignItems: 'center', py: 6 }}>
          <Typography variant="h5">Sessão não encontrada</Typography>
          <Button variant="contained" onClick={() => router.push('/qualitativo/sessoes')}>Voltar ao Acervo</Button>
        </Stack>
      </MainCard>
    );
  }

  return (
    <>
      <Grid container spacing={GRID_COMMON_SPACING}>
        {/* Header */}
        <Grid size={12}>
          <MainCard>
            <Stack sx={{ gap: 2 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
                <Stack sx={{ gap: 1 }}>
                  <Typography variant="h4">{sessao.titulo}</Typography>
                  <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
                    <Chip label={sessao.sentimento} color={sentimentoColors[sessao.sentimento]} size="small" variant="light" sx={{ borderRadius: 1 }} />
                    <Chip label={sessao.status} color={sessao.status === 'Transcrito' ? 'success' : sessao.status === 'Processando' ? 'warning' : 'secondary'} size="small" variant="light" sx={{ borderRadius: 1 }} />
                  </Stack>
                </Stack>
                <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
                  <Button variant="outlined" size="small" startIcon={<DocumentText1 size={16} />} onClick={handleExportPDF}>Exportar PDF</Button>
                  <Button variant="outlined" size="small" startIcon={<Cpu size={16} />} onClick={handleGerarIA}>Gerar Relatório IA</Button>
                  <Button variant="text" size="small" startIcon={<ArrowLeft size={16} />} onClick={() => router.push('/qualitativo/sessoes')}>Voltar</Button>
                </Stack>
              </Stack>
              <Stack direction="row" sx={{ gap: 3, flexWrap: 'wrap' }}>
                <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center' }}><Calendar size={16} /><Typography variant="caption">{sessao.data}</Typography></Stack>
                <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center' }}><People size={16} /><Typography variant="caption">{sessao.participantes} participantes</Typography></Stack>
                <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center' }}><Clock size={16} /><Typography variant="caption">{sessao.duracao}</Typography></Stack>
                <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center' }}><Microphone2 size={16} /><Typography variant="caption">Moderador: {sessao.moderador}</Typography></Stack>
              </Stack>
            </Stack>
          </MainCard>
        </Grid>

        {/* Player */}
        <Grid size={{ xs: 12, md: 7 }}>
          <MainCard title={<Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>{isVideo ? <VideoPlay size={18} /> : <Microphone2 size={18} />}<Typography variant="h5">Mídia da Sessão — {sessao.duracao}</Typography></Stack>}>
            {mediaUrl ? (
              <Stack sx={{ gap: 2 }}>
                {isVideo ? (
                  <Box component="video" controls sx={{ width: '100%', borderRadius: 1, maxHeight: 360 }} src={mediaUrl} />
                ) : (
                  <Box component="audio" controls sx={{ width: '100%' }} src={mediaUrl} />
                )}
                <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">{mediaFile?.name} · {((mediaFile?.size || 0) / 1024 / 1024).toFixed(1)} MB</Typography>
                  <Button size="small" color="error" variant="text" onClick={() => { setMediaFile(null); setMediaUrl(null); }}>Remover</Button>
                </Stack>
              </Stack>
            ) : (
              <Box
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                sx={{ p: 5, border: '2px dashed', borderColor: 'divider', borderRadius: 2, textAlign: 'center', bgcolor: 'action.hover', cursor: 'pointer', transition: 'border-color 0.2s', '&:hover': { borderColor: 'primary.main' } }}
              >
                <input ref={fileInputRef} type="file" accept={ACCEPT_MEDIA} hidden onChange={(e) => handleFileChange(e.target.files)} />
                <Stack sx={{ gap: 1.5, alignItems: 'center' }}>
                  <DocumentUpload size={48} />
                  <Typography variant="h6" color="text.secondary">Arraste o áudio ou vídeo do grupo focal aqui</Typography>
                  <Typography variant="caption" color="text.secondary">.mp3, .wav, .m4a, .ogg, .mp4, .webm, .mov</Typography>
                  <Button variant="contained" size="small">Selecionar Arquivo</Button>
                </Stack>
              </Box>
            )}
          </MainCard>
        </Grid>

        {/* Transcrição */}
        <Grid size={{ xs: 12, md: 5 }}>
          <MainCard title="Transcrição" content={false}>
            <SimpleBar style={{ maxHeight: 500 }}>
              <Stack sx={{ p: 2, gap: 2 }}>
                {sessao.transcricao.length === 0 ? (
                  <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>Transcrição não disponível.</Typography>
                ) : (
                  sessao.transcricao.map((fala, idx) => {
                    const color = fala.tipo === 'moderador' ? '#1565C0' : '#C62828';
                    return (
                      <Stack key={idx} sx={{ gap: 0.5 }}>
                        <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                          <Typography variant="subtitle2" sx={{ color, fontWeight: 700 }}>{fala.speaker}</Typography>
                          <Typography variant="caption" sx={{ color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>[{fala.timestamp}]</Typography>
                        </Stack>
                        <Typography variant="body2">{fala.texto}</Typography>
                      </Stack>
                    );
                  })
                )}
              </Stack>
            </SimpleBar>
          </MainCard>
        </Grid>

        {/* Nuvem de Tags */}
        <Grid size={{ xs: 12, md: 4 }}>
          <MainCard title="Nuvem de Tags">
            <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
              {sessao.tagFrequencias.map((tf) => (
                <Chip key={tf.tag} label={`${tf.tag} (×${tf.count})`} color="primary" variant={tf.count >= 4 ? 'filled' : tf.count >= 2 ? 'light' : 'outlined'} size={tf.count >= 4 ? 'medium' : 'small'} sx={{ borderRadius: 1, fontWeight: tf.count >= 3 ? 600 : 400 }} />
              ))}
            </Stack>
          </MainCard>
        </Grid>

        {/* Resumo IA */}
        <Grid size={{ xs: 12, md: 4 }}>
          <MainCard title={<Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}><Cpu size={18} /><Typography variant="h5">Resumo por IA</Typography></Stack>}>
            {sessao.pontosIA.length > 0 ? (
              <Stack component="ol" sx={{ gap: 1, pl: 2, m: 0 }}>
                {sessao.pontosIA.map((ponto, idx) => <Typography component="li" variant="body2" key={idx}>{ponto}</Typography>)}
              </Stack>
            ) : (
              <Typography color="text.secondary">Resumo não disponível. Clique em "Gerar Relatório IA".</Typography>
            )}
          </MainCard>
        </Grid>

        {/* Sentimento */}
        <Grid size={{ xs: 12, md: 4 }}>
          <MainCard title="Sentimento por Participante" content={false}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Participante</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Sentimento</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Inclinação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sessao.sentimentoParticipantes.length === 0 ? (
                    <TableRow><TableCell colSpan={3} align="center"><Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>Dados não disponíveis.</Typography></TableCell></TableRow>
                  ) : (
                    sessao.sentimentoParticipantes.map((p) => (
                      <TableRow hover key={p.nome}>
                        <TableCell><Typography variant="body2">{p.nome}</Typography></TableCell>
                        <TableCell><Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}><Dot color={p.sentimento === 'Positivo' ? 'success' : p.sentimento === 'Negativo' ? 'error' : 'warning'} size={10} /><Typography variant="body2">{p.sentimento}</Typography></Stack></TableCell>
                        <TableCell><Typography variant="body2" color="text.secondary">{p.inclinacao}</Typography></TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </MainCard>
        </Grid>
      </Grid>

      {/* Modal IA */}
      <Dialog open={iaOpen} onClose={() => setIaOpen(false)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ py: 4 }}>
          {iaLoading ? (
            <Stack sx={{ gap: 2, alignItems: 'center', py: 4 }}>
              <CircularProgress />
              <Typography variant="h6" color="text.secondary">Analisando transcrição com IA...</Typography>
            </Stack>
          ) : iaReady && sessao.pontosIA.length > 0 ? (
            <Stack sx={{ gap: 2 }}>
              <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}><Cpu size={22} /><Typography variant="h5">Relatório Gerado</Typography></Stack>
              <Stack component="ol" sx={{ gap: 1.5, pl: 2, m: 0 }}>
                {sessao.pontosIA.map((p, i) => <Typography component="li" variant="body2" key={i}>{p}</Typography>)}
              </Stack>
            </Stack>
          ) : (
            <Typography color="text.secondary" align="center">Transcrição insuficiente para gerar relatório.</Typography>
          )}
        </DialogContent>
        <DialogActions><Button onClick={() => setIaOpen(false)}>Fechar</Button></DialogActions>
      </Dialog>
    </>
  );
}
