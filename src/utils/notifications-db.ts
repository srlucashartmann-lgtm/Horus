import fs from 'fs';
import path from 'path';
import { HorusNotification, NotificationType, NotificationSeverity } from 'types/horus';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'notifications.json');

function getInitialNotifications(): HorusNotification[] {
  return [
    {
      id: '1',
      type: 'alerta_critico',
      severity: 'critical',
      title: 'Rejeição em alta com Evangélicos',
      message: 'Rejeição de Gabriel subiu 4.1% entre Evangélicos nos últimos 3 dias — ultrapassou margem de erro em 2 rodadas consecutivas.',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      link: '/quantitativo/tracking'
    },
    {
      id: '2',
      type: 'alerta_atencao',
      severity: 'warning',
      title: 'Tema "inexperiente" ganhando tração',
      message: 'Tema "Gabriel inexperiente" apareceu espontaneamente em 2 qualis seguidas — possível ataque coordenado de Juliana Brizola.',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      link: '/inteligencia/alertas'
    },
    {
      id: '3',
      type: 'alerta_positivo',
      severity: 'success',
      title: 'Máxima histórica com Jovens 16-24',
      message: 'Gabriel atingiu 58% com Jovens 16-24 após viralização no TikTok — máxima histórica no segmento.',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      link: '/quantitativo/tracking'
    },
    {
      id: '4',
      type: 'tracking',
      severity: 'info',
      title: 'Tracking #18 atualizado',
      message: 'Nova rodada de tracking importada com sucesso. 1.200 entrevistas processadas.',
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      link: '/quantitativo/tracking'
    },
    {
      id: '5',
      type: 'quali',
      severity: 'info',
      title: 'Transcrição concluída',
      message: 'Sessão "Mulheres Indecisas — Classe C" (19/Mar) foi transcrita com sucesso pelo Deepgram.',
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      link: '/qualitativo/sessoes'
    }
  ];
}

function readNotifications(): HorusNotification[] {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initial = getInitialNotifications();
      writeNotifications(initial);
      return initial;
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    const initial = getInitialNotifications();
    writeNotifications(initial);
    return initial;
  }
}

function writeNotifications(notifications: HorusNotification[]) {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(notifications, null, 2), 'utf-8');
}

export function getNotifications(): HorusNotification[] {
  return readNotifications().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getUnreadCount(): number {
  return readNotifications().filter((n) => !n.read).length;
}

export function createNotification(data: {
  type: NotificationType;
  severity: NotificationSeverity;
  title: string;
  message: string;
  link?: string;
  icon?: string;
}): HorusNotification {
  const notifications = readNotifications();
  const maxId = notifications.reduce((max, n) => Math.max(max, parseInt(n.id, 10) || 0), 0);

  const newNotification: HorusNotification = {
    id: String(maxId + 1),
    type: data.type,
    severity: data.severity,
    title: data.title,
    message: data.message,
    read: false,
    createdAt: new Date().toISOString(),
    link: data.link,
    icon: data.icon
  };

  notifications.unshift(newNotification);

  if (notifications.length > 100) {
    notifications.splice(100);
  }

  writeNotifications(notifications);
  return newNotification;
}

export function markAsRead(id: string): HorusNotification | null {
  const notifications = readNotifications();
  const index = notifications.findIndex((n) => n.id === id);
  if (index === -1) return null;

  notifications[index].read = true;
  writeNotifications(notifications);
  return notifications[index];
}

export function markAllAsRead(): number {
  const notifications = readNotifications();
  let count = 0;
  notifications.forEach((n) => {
    if (!n.read) {
      n.read = true;
      count++;
    }
  });
  writeNotifications(notifications);
  return count;
}

export function deleteNotification(id: string): boolean {
  const notifications = readNotifications();
  const filtered = notifications.filter((n) => n.id !== id);
  if (filtered.length === notifications.length) return false;
  writeNotifications(filtered);
  return true;
}

export function clearAllNotifications(): void {
  writeNotifications([]);
}
