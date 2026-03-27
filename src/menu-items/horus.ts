import {
  Home2,
  Chart21,
  Grid5,
  Simcard,
  Microphone2,
  VideoPlay,
  EmojiHappy,
  Alarm,
  DocumentText1,
  Link21,
  Setting2,
  SecurityUser,
  Book1
} from '@wandersonalwes/iconsax-react';
import { NavItemType } from 'types/menu';

const icons = {
  warRoom: Home2,
  tracking: Chart21,
  crossTabs: Grid5,
  simulacoes: Simcard,
  sessoes: Microphone2,
  clipes: VideoPlay,
  sentimentos: EmojiHappy,
  alertas: Alarm,
  sintese: DocumentText1,
  causaEfeito: Link21,
  configuracoes: Setting2,
  usuarios: SecurityUser,
  dicionario: Book1
};

const warRoom: NavItemType = {
  id: 'group-war-room',
  title: 'Principal',
  type: 'group',
  children: [
    {
      id: 'war-room',
      title: 'War Room',
      type: 'item',
      url: '/war-room',
      icon: icons.warRoom,
      breadcrumbs: false
    }
  ]
};

const quantitativo: NavItemType = {
  id: 'group-quantitativo',
  title: 'Quantitativo',
  type: 'group',
  children: [
    {
      id: 'tracking',
      title: 'Tracking',
      type: 'item',
      url: '/quantitativo/tracking',
      icon: icons.tracking,
      caption: 'Evolução temporal'
    },
    {
      id: 'cross-tabs',
      title: 'Cross-Tabs',
      type: 'item',
      url: '/quantitativo/cross-tabs',
      icon: icons.crossTabs,
      caption: 'Cruzamentos dinâmicos'
    },
    {
      id: 'simulacoes',
      title: 'Simulações de Cenário',
      type: 'item',
      url: '/quantitativo/simulacoes',
      icon: icons.simulacoes
    }
  ]
};

const qualitativo: NavItemType = {
  id: 'group-qualitativo',
  title: 'Qualitativo',
  type: 'group',
  children: [
    {
      id: 'sessoes',
      title: 'Acervo de Sessões',
      type: 'item',
      url: '/qualitativo/sessoes',
      icon: icons.sessoes
    },
    {
      id: 'clipes',
      title: 'Biblioteca de Clipes',
      type: 'item',
      url: '/qualitativo/clipes',
      icon: icons.clipes
    },
    {
      id: 'sentimentos',
      title: 'Mapa de Sentimentos',
      type: 'item',
      url: '/qualitativo/sentimentos',
      icon: icons.sentimentos
    }
  ]
};

const inteligencia: NavItemType = {
  id: 'group-inteligencia',
  title: 'Inteligência & Relatórios',
  type: 'group',
  children: [
    {
      id: 'alertas',
      title: 'Alertas e Mudanças de Humor',
      type: 'item',
      url: '/inteligencia/alertas',
      icon: icons.alertas
    },
    {
      id: 'sintese',
      title: 'Síntese Semanal',
      type: 'item',
      url: '/inteligencia/sintese',
      icon: icons.sintese
    },
    {
      id: 'causa-efeito',
      title: 'Causa e Efeito',
      type: 'item',
      url: '/inteligencia/causa-efeito',
      icon: icons.causaEfeito,
      caption: 'Quali × Quanti'
    }
  ]
};

const configuracoes: NavItemType = {
  id: 'group-configuracoes',
  title: 'Configurações',
  type: 'group',
  children: [
    {
      id: 'dicionario',
      title: 'Dicionário de Tags',
      type: 'item',
      url: '/configuracoes/dicionario',
      icon: icons.dicionario
    }
  ]
};

export { warRoom, quantitativo, qualitativo, inteligencia, configuracoes };
