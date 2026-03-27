'use client';

import { lazy, Suspense, ComponentType } from 'react';
import Skeleton from '@mui/material/Skeleton';

// lazy load all widgets
const KPIIntencao = lazy(() => import('./widgets/KPIIntencao'));
const KPIRejeicao = lazy(() => import('./widgets/KPIRejeicao'));
const KPIAprovacao = lazy(() => import('./widgets/KPIAprovacao'));
const KPIQualis = lazy(() => import('./widgets/KPIQualis'));
const ChartTracking = lazy(() => import('./widgets/ChartTracking'));
const ChartRejeicaoSegmento = lazy(() => import('./widgets/ChartRejeicaoSegmento'));
const ChartCenarioAtual = lazy(() => import('./widgets/ChartCenarioAtual'));
const ChartSentimento = lazy(() => import('./widgets/ChartSentimento'));
const TableSegmentos = lazy(() => import('./widgets/TableSegmentos'));
const ListAlertas = lazy(() => import('./widgets/ListAlertas'));
const ListSessoes = lazy(() => import('./widgets/ListSessoes'));
const ListFrases = lazy(() => import('./widgets/ListFrases'));
const AcoesRapidas = lazy(() => import('./widgets/AcoesRapidas'));
const StatusSistema = lazy(() => import('./widgets/StatusSistema'));
const MapaRisco = lazy(() => import('./widgets/MapaRisco'));
const ResumoSemanal = lazy(() => import('./widgets/ResumoSemanal'));

export interface WidgetDef {
  id: string;
  title: string;
  category: string;
  defaultW: number;
  defaultH: number;
  minW: number;
  minH: number;
  component: ComponentType;
  href?: string;
}

export const WIDGET_REGISTRY: WidgetDef[] = [
  { id: 'kpi-intencao', title: 'Intenção de Voto', category: 'KPIs', defaultW: 3, defaultH: 3, minW: 3, minH: 2, component: KPIIntencao, href: '/quantitativo/tracking' },
  { id: 'kpi-rejeicao', title: 'Rejeição', category: 'KPIs', defaultW: 3, defaultH: 3, minW: 3, minH: 2, component: KPIRejeicao, href: '/quantitativo/tracking' },
  { id: 'kpi-aprovacao', title: 'Aprovação Gov.', category: 'KPIs', defaultW: 3, defaultH: 3, minW: 3, minH: 2, component: KPIAprovacao, href: '/quantitativo/tracking' },
  { id: 'kpi-qualis', title: 'Qualis da Semana', category: 'KPIs', defaultW: 3, defaultH: 3, minW: 3, minH: 2, component: KPIQualis, href: '/qualitativo/sessoes' },
  { id: 'chart-tracking', title: 'Tracking Diário', category: 'Gráficos', defaultW: 8, defaultH: 5, minW: 6, minH: 4, component: ChartTracking, href: '/quantitativo/tracking' },
  { id: 'chart-rejeicao-segmento', title: 'Rejeição por Segmento', category: 'Gráficos', defaultW: 6, defaultH: 4, minW: 4, minH: 3, component: ChartRejeicaoSegmento, href: '/quantitativo/tracking' },
  { id: 'chart-cenario-atual', title: 'Cenário Atual', category: 'Gráficos', defaultW: 4, defaultH: 4, minW: 3, minH: 3, component: ChartCenarioAtual, href: '/quantitativo/simulacoes' },
  { id: 'chart-sentimento', title: 'Radar de Sentimento', category: 'Gráficos', defaultW: 4, defaultH: 4, minW: 3, minH: 3, component: ChartSentimento, href: '/qualitativo/sentimentos' },
  { id: 'table-segmentos', title: 'Segmentos Eleitorais', category: 'Tabelas e Listas', defaultW: 6, defaultH: 4, minW: 4, minH: 3, component: TableSegmentos, href: '/quantitativo/tracking' },
  { id: 'list-alertas', title: 'Alertas Estratégicos', category: 'Tabelas e Listas', defaultW: 4, defaultH: 5, minW: 3, minH: 3, component: ListAlertas, href: '/inteligencia/alertas' },
  { id: 'list-sessoes', title: 'Últimas Sessões Quali', category: 'Tabelas e Listas', defaultW: 4, defaultH: 4, minW: 3, minH: 3, component: ListSessoes, href: '/qualitativo/sessoes' },
  { id: 'list-frases', title: 'Vocabulário do Eleitor', category: 'Tabelas e Listas', defaultW: 6, defaultH: 4, minW: 4, minH: 3, component: ListFrases, href: '/qualitativo/clipes' },
  { id: 'acoes-rapidas', title: 'Ações Rápidas', category: 'Ações e Status', defaultW: 3, defaultH: 3, minW: 3, minH: 3, component: AcoesRapidas },
  { id: 'status-sistema', title: 'Status do Sistema', category: 'Ações e Status', defaultW: 3, defaultH: 2, minW: 3, minH: 2, component: StatusSistema },
  { id: 'mapa-risco', title: 'Mapa de Risco', category: 'Especiais', defaultW: 12, defaultH: 3, minW: 6, minH: 3, component: MapaRisco, href: '/inteligencia/alertas' },
  { id: 'resumo-semanal', title: 'Resumo Executivo', category: 'Especiais', defaultW: 12, defaultH: 2, minW: 6, minH: 2, component: ResumoSemanal, href: '/inteligencia/sintese' }
];

export function getWidgetById(id: string): WidgetDef | undefined {
  return WIDGET_REGISTRY.find((w) => w.id === id);
}

export function WidgetRenderer({ id }: { id: string }) {
  const def = getWidgetById(id);
  if (!def) return null;
  const Comp = def.component;
  return (
    <Suspense fallback={<Skeleton variant="rounded" width="100%" height="100%" />}>
      <Comp />
    </Suspense>
  );
}
