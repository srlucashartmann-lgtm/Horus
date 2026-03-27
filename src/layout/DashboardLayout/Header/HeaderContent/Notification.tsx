'use client';

import { useRef, useState, useEffect } from 'react';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Badge from '@mui/material/Badge';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// project-imports
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import Transitions from 'components/@extended/Transitions';
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';

import { useNotifications } from 'api/notifications';
import { HorusNotification, NotificationSeverity } from 'types/horus';

// assets
import {
  Notification as NotificationIcon,
  Danger,
  Warning2,
  TickCircle,
  InfoCircle,
  Chart,
  Microphone2,
  Setting2,
  Profile2User,
  Trash,
  TickSquare,
  NotificationBing
} from '@wandersonalwes/iconsax-react';
import Button from '@mui/material/Button';

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

const SEVERITY_CONFIG: Record<NotificationSeverity, { color: 'error' | 'warning' | 'success' | 'info'; bgColor: string; darkBgColor: string }> = {
  critical: { color: 'error', bgColor: 'error.lighter', darkBgColor: 'error.900' },
  warning: { color: 'warning', bgColor: 'warning.lighter', darkBgColor: 'warning.900' },
  success: { color: 'success', bgColor: 'success.lighter', darkBgColor: 'success.900' },
  info: { color: 'info', bgColor: 'secondary.lighter', darkBgColor: 'secondary.900' }
};

function getNotificationIcon(notification: HorusNotification) {
  const iconSize = 20;
  switch (notification.type) {
    case 'alerta_critico':
      return <Danger size={iconSize} variant="Bold" />;
    case 'alerta_atencao':
      return <Warning2 size={iconSize} variant="Bold" />;
    case 'alerta_positivo':
      return <TickCircle size={iconSize} variant="Bold" />;
    case 'tracking':
      return <Chart size={iconSize} variant="Bold" />;
    case 'quali':
      return <Microphone2 size={iconSize} variant="Bold" />;
    case 'sistema':
      return <Setting2 size={iconSize} variant="Bold" />;
    case 'usuario':
      return <Profile2User size={iconSize} variant="Bold" />;
    default:
      return <InfoCircle size={iconSize} variant="Bold" />;
  }
}

function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 1) return 'agora';
  if (diffMin < 60) return `${diffMin} min atrás`;
  if (diffHours < 24) return `${diffHours}h atrás`;
  if (diffDays === 1) return 'ontem';
  return `${diffDays} dias atrás`;
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

export default function NotificationPage() {
  const downMD = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [browserPermission, setBrowserPermission] = useState<NotificationPermission>('default');

  const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setBrowserPermission(Notification.permission);
    }
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleEnableBrowserNotifications = () => {
    if (!('Notification' in window)) return;

    Notification.requestPermission().then((perm) => {
      setBrowserPermission(perm);
      if (perm === 'granted') {
        new window.Notification('Hórus — Notificações ativadas!', {
          body: 'Você receberá alertas estratégicos em tempo real.',
          icon: '/favicon.svg'
        });
      }
    });
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleMarkAllRead = (e: React.MouseEvent) => {
    e.preventDefault();
    markAllAsRead();
  };

  const handleNotificationClick = (notification: HorusNotification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.link) {
      window.location.href = notification.link;
      setOpen(false);
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteNotification(id);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.5 }}>
      <IconButton
        color="secondary"
        variant="light"
        aria-label="abrir notificações"
        ref={anchorRef}
        aria-controls={open ? 'notification-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        size="large"
        sx={(theme) => ({
          p: 1,
          color: 'secondary.main',
          bgcolor: open ? 'secondary.200' : 'secondary.100',
          ...theme.applyStyles('dark', { bgcolor: open ? 'background.paper' : 'background.default' })
        })}
      >
        <Badge badgeContent={unreadCount} color={unreadCount > 0 ? 'error' : 'success'} slotProps={{ badge: { sx: { top: 2, right: 4 } } }}>
          <NotificationIcon variant="Bold" />
        </Badge>
      </IconButton>
      <Popper
        placement={downMD ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [downMD ? -5 : 0, 9] } }] }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position={downMD ? 'top' : 'top-right'} in={open} {...TransitionProps}>
            <Paper sx={(theme) => ({ boxShadow: theme.vars.customShadows.z1, borderRadius: 1.5, width: { xs: 340, sm: 440 } })}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 2.5, pb: 0 }}>
                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h5">Notificações</Typography>
                        {unreadCount > 0 && <Chip label={unreadCount} color="error" size="small" variant="light" />}
                      </Stack>
                      {unreadCount > 0 && (
                        <Link
                          href="#"
                          variant="h6"
                          color="primary"
                          onClick={handleMarkAllRead}
                          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, textDecoration: 'none' }}
                        >
                          <TickSquare size={16} />
                          Marcar todas como lidas
                        </Link>
                      )}
                    </Stack>
                  </CardContent>

                  {browserPermission !== 'granted' && (
                    <Box
                      sx={(theme) => ({
                        mx: 2.5,
                        mt: 1.5,
                        p: 1.5,
                        borderRadius: 1,
                        bgcolor: browserPermission === 'denied' ? 'warning.lighter' : 'primary.lighter',
                        border: `1px solid`,
                        borderColor: browserPermission === 'denied' ? 'warning.light' : 'primary.light',
                        ...theme.applyStyles('dark', {
                          bgcolor: browserPermission === 'denied' ? 'warning.900' : 'primary.900',
                          borderColor: browserPermission === 'denied' ? 'warning.800' : 'primary.800'
                        })
                      })}
                    >
                      {browserPermission === 'denied' ? (
                        <Stack spacing={0.5}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <NotificationBing size={18} variant="Bold" />
                            <Typography variant="caption" sx={{ fontWeight: 600 }}>
                              Notificações bloqueadas pelo navegador
                            </Typography>
                          </Stack>
                          <Typography variant="caption" color="text.secondary">
                            Clique no ícone de cadeado 🔒 na barra de endereço → Notificações → Permitir → Recarregue a página
                          </Typography>
                        </Stack>
                      ) : (
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <NotificationBing size={20} variant="Bold" />
                          <Stack spacing={0.5} sx={{ flex: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 600 }}>
                              Ativar notificações do navegador
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Receba alertas mesmo com a aba em segundo plano
                            </Typography>
                          </Stack>
                          <Button size="small" variant="contained" onClick={handleEnableBrowserNotifications} sx={{ minWidth: 'auto', px: 1.5 }}>
                            Ativar
                          </Button>
                        </Stack>
                      )}
                    </Box>
                  )}

                  <SimpleBar style={{ maxHeight: 'calc(100vh - 200px)' }}>
                    {isLoading ? (
                      <Stack alignItems="center" justifyContent="center" sx={{ py: 4 }}>
                        <CircularProgress size={32} />
                      </Stack>
                    ) : notifications.length === 0 ? (
                      <Stack alignItems="center" justifyContent="center" sx={{ py: 4 }}>
                        <NotificationIcon size={40} variant="Bulk" color="#8c8c8c" />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Nenhuma notificação
                        </Typography>
                      </Stack>
                    ) : (
                      <List
                        component="nav"
                        sx={(theme) => ({
                          px: 1.5,
                          pb: 1,
                          '& .MuiListItemButton-root': {
                            p: 1.5,
                            my: 0.75,
                            borderRadius: 1,
                            border: `1px solid ${theme.vars.palette.divider}`,
                            '&:hover': { bgcolor: 'primary.lighter', borderColor: 'primary.light' },
                            '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                          }
                        })}
                      >
                        {notifications.map((notification) => {
                          const config = SEVERITY_CONFIG[notification.severity];
                          return (
                            <ListItem
                              key={notification.id}
                              component={ListItemButton}
                              onClick={() => handleNotificationClick(notification)}
                              secondaryAction={
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                  <Typography variant="caption" noWrap color="text.secondary">
                                    {formatTime(notification.createdAt)}
                                  </Typography>
                                  <Tooltip title="Remover">
                                    <IconButton size="small" color="secondary" onClick={(e: any) => handleDelete(e, notification.id)}>
                                      <Trash size={14} />
                                    </IconButton>
                                  </Tooltip>
                                </Stack>
                              }
                              sx={{
                                opacity: notification.read ? 0.7 : 1,
                                borderLeft: notification.read ? undefined : `3px solid`,
                                borderLeftColor: notification.read ? undefined : `${config.color}.main`
                              }}
                            >
                              <ListItemAvatar>
                                <Avatar color={config.color} type={"light" as any} size="sm">
                                  {getNotificationIcon(notification)}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Typography variant={notification.read ? 'body2' : 'subtitle1'} sx={{ fontWeight: notification.read ? 400 : 600 }}>
                                    {notification.title}
                                  </Typography>
                                }
                                secondary={
                                  <Box component="span" sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                                    <Typography
                                      component="span"
                                      variant="caption"
                                      color="text.secondary"
                                      sx={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                      }}
                                    >
                                      {notification.message}
                                    </Typography>
                                    <Typography component="span" variant="caption" color="text.disabled">
                                      {formatTimeAgo(notification.createdAt)}
                                    </Typography>
                                  </Box>
                                }
                              />
                            </ListItem>
                          );
                        })}
                      </List>
                    )}
                  </SimpleBar>

                  {notifications.length > 0 && (
                    <>
                      <Divider />
                      <CardContent sx={{ py: 1.5 }}>
                        <Stack direction="row" sx={{ justifyContent: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            {notifications.length} notificação{notifications.length !== 1 ? 'ões' : ''}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </>
                  )}
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}
