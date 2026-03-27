export type Permission =
  | 'war-room'
  | 'tracking'
  | 'cross-tabs'
  | 'simulacoes'
  | 'sessoes'
  | 'clipes'
  | 'sentimentos'
  | 'alertas'
  | 'sintese'
  | 'causa-efeito'
  | 'configuracoes';

export const ALL_PERMISSIONS: Permission[] = [
  'war-room',
  'tracking',
  'cross-tabs',
  'simulacoes',
  'sessoes',
  'clipes',
  'sentimentos',
  'alertas',
  'sintese',
  'causa-efeito',
  'configuracoes'
];

export const PERMISSION_LABELS: Record<Permission, string> = {
  'war-room': 'War Room',
  tracking: 'Tracking',
  'cross-tabs': 'Cross-Tabs',
  simulacoes: 'Simulações de Cenário',
  sessoes: 'Acervo de Sessões',
  clipes: 'Biblioteca de Clipes',
  sentimentos: 'Mapa de Sentimentos',
  alertas: 'Alertas e Mudanças de Humor',
  sintese: 'Síntese Semanal',
  'causa-efeito': 'Causa e Efeito',
  configuracoes: 'Configurações'
};

export type UserRole = 'admin' | 'analista';

export interface HorusUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  permissions: Permission[];
  avatar?: string;
  active: boolean;
  createdAt: string;
}

export type HorusUserPublic = Omit<HorusUser, 'password'>;

// ==============================|| NOTIFICATIONS ||============================== //

export type NotificationType = 'alerta_critico' | 'alerta_atencao' | 'alerta_positivo' | 'tracking' | 'quali' | 'sistema' | 'usuario';

export type NotificationSeverity = 'critical' | 'warning' | 'success' | 'info';

export interface HorusNotification {
  id: string;
  type: NotificationType;
  severity: NotificationSeverity;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
  icon?: string;
}
