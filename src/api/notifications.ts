import { useMemo, useCallback, useEffect, useRef } from 'react';
import useSWR, { mutate } from 'swr';
import { HorusNotification, NotificationType, NotificationSeverity } from 'types/horus';

const ENDPOINT = '/api/notifications';
const SWR_KEY = 'horus-notifications';
const POLL_INTERVAL = 15000;

interface NotificationsState {
  notifications: HorusNotification[];
  unreadCount: number;
}

const fetcher = async (): Promise<NotificationsState> => {
  const res = await fetch(ENDPOINT);
  if (!res.ok) throw new Error('Falha ao buscar notificações');
  return res.json();
};

export function useNotifications() {
  const { data, error, isLoading } = useSWR<NotificationsState>(SWR_KEY, fetcher, {
    refreshInterval: POLL_INTERVAL,
    revalidateOnFocus: true,
    dedupingInterval: 5000
  });

  const previousCountRef = useRef<number>(0);

  useEffect(() => {
    if (!data) return;

    const newCount = data.unreadCount;
    const prevCount = previousCountRef.current;

    if (prevCount > 0 && newCount > prevCount) {
      const newestUnread = data.notifications.find((n) => !n.read);
      if (newestUnread) {
        showBrowserNotification(newestUnread);
      }
    }

    previousCountRef.current = newCount;
  }, [data]);

  const markAsRead = useCallback(async (id: string) => {
    await fetch(`${ENDPOINT}/${id}`, { method: 'PATCH' });
    mutate(SWR_KEY);
  }, []);

  const markAllAsRead = useCallback(async () => {
    await fetch(ENDPOINT, { method: 'PATCH' });
    mutate(SWR_KEY);
  }, []);

  const deleteNotification = useCallback(async (id: string) => {
    await fetch(`${ENDPOINT}/${id}`, { method: 'DELETE' });
    mutate(SWR_KEY);
  }, []);

  const clearAll = useCallback(async () => {
    await fetch(ENDPOINT, { method: 'DELETE' });
    mutate(SWR_KEY);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      notifications: data?.notifications || [],
      unreadCount: data?.unreadCount || 0,
      isLoading,
      error,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAll
    }),
    [data, isLoading, error, markAsRead, markAllAsRead, deleteNotification, clearAll]
  );

  return memoizedValue;
}

// === Browser Notifications API ===

export function requestBrowserPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('Este navegador não suporta notificações do sistema.');
    return Promise.resolve('denied' as NotificationPermission);
  }

  if (Notification.permission === 'granted') {
    return Promise.resolve('granted');
  }

  return Notification.requestPermission();
}

export function showBrowserNotification(notification: HorusNotification) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const severityEmoji: Record<NotificationSeverity, string> = {
    critical: '🔴',
    warning: '🟡',
    success: '🟢',
    info: 'ℹ️'
  };

  const n = new window.Notification(`${severityEmoji[notification.severity]} ${notification.title}`, {
    body: notification.message,
    icon: '/favicon.svg',
    tag: notification.id,
    requireInteraction: notification.severity === 'critical'
  });

  if (notification.link) {
    n.onclick = () => {
      window.focus();
      window.location.href = notification.link!;
      n.close();
    };
  }
}

// === Criar notificação via API (para uso em qualquer componente) ===

export async function sendNotification(data: {
  type: NotificationType;
  severity: NotificationSeverity;
  title: string;
  message: string;
  link?: string;
}): Promise<HorusNotification | null> {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) return null;

    const { notification } = await res.json();
    mutate(SWR_KEY);
    return notification;
  } catch {
    return null;
  }
}
