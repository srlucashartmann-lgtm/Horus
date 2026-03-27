import type { Step } from 'react-joyride';
import { TourId } from './OnboardingProvider';

type TourStepDef = Omit<Step, 'target'> & { target: string };

const centerFloater: TourStepDef['floaterProps'] = {
  hideArrow: true
};

/** Garante `disableBeacon: true` em todos os passos (sem beacon pulsante). */
function withDisableBeacon(steps: TourStepDef[]): TourStepDef[] {
  return steps.map((s) => ({ ...s, disableBeacon: true }));
}

const generalSteps: TourStepDef[] = [
  {
    target: 'body',
    placement: 'center',
    title: '',
    content:
      'O Hórus é seu Motor de Síntese Estratégica. Aqui você cruza dados de pesquisas com as vozes dos eleitores para tomar decisões rápidas e precisas. Vamos te guiar pelo sistema em menos de 2 minutos.',
    data: { welcome: true },
    floaterProps: centerFloater
  },
  {
    target: 'body',
    placement: 'center',
    floaterProps: centerFloater,
    title: 'War Room — Seu Painel Central',
    content:
      'Esta é a home do Hórus. Mostra um resumo de tudo que está acontecendo na campanha. Os widgets são personalizáveis — clique no ⚙ para reorganizar.'
  },
  {
    target: '#horus-sidebar',
    title: 'Navegação Principal',
    content:
      'Aqui ficam todos os módulos do sistema. Estão organizados em: Quantitativo (números das pesquisas), Qualitativo (vozes dos eleitores), Inteligência (análises cruzadas) e Configurações.',
    placement: 'right-start'
  },
  {
    target: '#war-room-kpis',
    title: 'Indicadores Vitais',
    content:
      'Os 4 números mais importantes: Intenção de Voto, Rejeição, Aprovação do Governo e Qualis da Semana. As setas mostram a variação vs semana anterior. Verde = melhorando, Vermelho = piorando.',
    placement: 'bottom-start'
  },
  {
    target: '#war-room-tracking',
    title: 'Tracking Diário',
    content:
      'O gráfico mostra a evolução da intenção de voto ao longo do tempo. A linha principal (azul) é o Gabriel Souza. Os marcadores verticais indicam eventos da campanha (debates, ataques, virais).',
    placement: 'bottom-start'
  },
  {
    target: '#war-room-alertas',
    title: 'Alertas Estratégicos',
    content:
      'O sistema monitora automaticamente mudanças nos números. Quando algo sai do padrão — como uma queda de rejeição num segmento — um alerta é disparado. Vermelho = urgente, Amarelo = atenção, Verde = positivo.',
    placement: 'bottom-start'
  },
  {
    target: '#war-room-segmentos',
    title: 'Segmentos Eleitorais',
    content:
      "Cada linha é um perfil de eleitor. A coluna 'Rejeição' usa cores: verde (baixa), amarelo (atenção), vermelho (alta). As setas mostram se estamos ganhando ou perdendo naquele grupo.",
    placement: 'top-start'
  },
  {
    target: '#war-room-sessoes',
    title: 'Sessões Qualitativas',
    content:
      'Aqui aparecem os últimos grupos focais realizados. Cada sessão tem um sentimento geral (Positivo/Negativo/Neutro) e tags com os temas discutidos. Clique para ver a transcrição completa.',
    placement: 'top-start'
  },
  {
    target: '#war-room-frases',
    title: 'Vocabulário do Eleitor',
    content:
      "As frases que os eleitores realmente usam. Quando uma expressão como 'geladeira vazia' aparece múltiplas vezes, ela vira um vocabulário-chave que o candidato deve incorporar no discurso.",
    placement: 'top-start'
  },
  {
    target: 'body',
    placement: 'center',
    floaterProps: centerFloater,
    title: 'Pronto para começar! 🚀',
    content:
      'Cada módulo tem seu próprio tour explicando os detalhes. Ao abrir uma tela pela primeira vez, o tour inicia automaticamente. Você pode repetir qualquer tour clicando no ícone ❓ no topo da página. Bom trabalho!'
  }
];

const trackingSteps: TourStepDef[] = [
  {
    target: '[data-tour="tracking-filtros"]',
    title: 'Filtros de Análise',
    content:
      "Filtre por período, cenário (estimulado ou espontâneo) e segmento demográfico. Após selecionar, clique em 'Aplicar Filtros' para atualizar todos os gráficos.",
    placement: 'bottom-start'
  },
  {
    target: '[data-tour="tracking-chart"]',
    title: 'Evolução Temporal',
    content:
      'O gráfico mostra todos os candidatos ao longo do tempo. A área azul é Gabriel Souza. As linhas tracejadas verticais marcam eventos da campanha — passe o mouse pra ver detalhes.',
    placement: 'top-start'
  },
  {
    target: '[data-tour="tracking-tabs"]',
    title: 'Trocar Métrica',
    content: 'Alterne entre Intenção de Voto, Rejeição e Aprovação. O gráfico se atualiza mostrando os mesmos candidatos mas com a métrica selecionada.',
    placement: 'bottom-start'
  },
  {
    target: '[data-tour="tracking-barras"]',
    title: 'Rejeição por Segmento',
    content: 'Compare a rejeição dos 4 candidatos em cada perfil demográfico. Passe o mouse nas barras para ver os valores exatos.',
    placement: 'top-start'
  },
  {
    target: '[data-tour="tracking-heatmap"]',
    title: 'Mapa de Calor',
    content:
      'As cores indicam o nível de rejeição: verde (baixa), amarelo (média), vermelho (alta). Use para identificar rapidamente onde cada candidato é mais rejeitado.',
    placement: 'top-start'
  },
  {
    target: '[data-tour="tracking-tabela"]',
    title: 'Dados Completos',
    content:
      "Todos os números do tracking em detalhe. A coluna 'Evento' mostra acontecimentos relevantes da campanha. Clique no ícone de download para exportar como CSV.",
    placement: 'top-start'
  }
];

const crossTabsSteps: TourStepDef[] = [
  {
    target: '[data-tour="crosstabs-seletores"]',
    title: 'Monte seu Cruzamento',
    content:
      "Escolha a pergunta nas linhas (ex: Intenção de Voto) e o filtro nas colunas (ex: Faixa Etária). Selecione a rodada e clique em 'Gerar Cruzamento'.",
    placement: 'bottom-start'
  },
  {
    target: '[data-tour="crosstabs-comparacao"]',
    title: 'Comparação entre Rodadas',
    content:
      'Ative este switch para ver a variação entre a rodada atual e a anterior. Células verdes subiram, vermelhas caíram. Perfeito para detectar movimentações recentes.',
    placement: 'bottom-start'
  },
  {
    target: '[data-tour="crosstabs-tabela"]',
    title: 'Tabela de Cruzamento',
    content:
      'A linha do Gabriel está destacada em azul. O maior valor de cada coluna aparece em verde (líder naquele segmento). A coluna TOTAL mostra o cenário geral.',
    placement: 'top-start'
  },
  {
    target: '[data-tour="crosstabs-insights"]',
    title: 'Insights Automáticos',
    content:
      'O sistema analisa os dados e gera insights automaticamente: onde Gabriel lidera, onde está fraco, e tendências dos adversários.',
    placement: 'top-start'
  },
  {
    target: '[data-tour="crosstabs-exportar"]',
    title: 'Exporte seus Dados',
    content: 'Exporte para Excel, PDF, ou salve o cruzamento para acesso rápido. A base amostral e margem de erro estão indicadas abaixo.',
    placement: 'top-start'
  }
];

const simulacoesSteps: TourStepDef[] = [
  {
    target: '[data-tour="simulacoes-tabs"]',
    title: 'Tipos de Simulação',
    content:
      'Quatro modos: Cenário Atual (como está hoje), Desistência (e se alguém sair), Segundo Turno (cenários de 2º turno) e Conversão de Indecisos (e se conquistarmos os Brancos/Nulos).',
    placement: 'bottom-start'
  },
  {
    target: '[data-tour="simulacoes-sliders"]',
    title: 'Redistribuição de Votos',
    content:
      "Arraste os sliders para simular para onde iriam os votos. O gráfico 'Depois' atualiza em tempo real. A soma sempre dá 100%. Use 'Redistribuir Igualmente' para resetar.",
    placement: 'top-start'
  },
  {
    target: '[data-tour="simulacoes-donuts"]',
    title: 'Compare os Cenários',
    content:
      "O donut 'Antes' mostra o cenário real. O 'Depois' mostra a simulação. Se Gabriel passa de 50%, o card abaixo fica verde indicando vitória em 1º turno.",
    placement: 'top-start'
  },
  {
    target: '[data-tour="simulacoes-resultado"]',
    title: 'Resultado da Simulação',
    content:
      'O card de conclusão muda de cor conforme o resultado: verde (vitória provável), amarelo (indefinido), vermelho (risco). Use para testar cenários antes de tomar decisões.',
    placement: 'top-start'
  }
];

const sessoesSteps: TourStepDef[] = [
  {
    target: '[data-tour="sessoes-grid"]',
    title: 'Suas Sessões Qualitativas',
    content:
      'Cada card é um grupo focal realizado. O badge de cor indica o sentimento geral: verde (positivo), vermelho (negativo), amarelo (neutro/misto). As tags mostram os temas discutidos.',
    placement: 'bottom-start'
  },
  {
    target: '[data-tour="sessoes-status"]',
    title: 'Status de Transcrição',
    content:
      "'Transcrito' significa que o áudio já foi processado e o texto está disponível. 'Processando' indica que a transcrição está em andamento. 'Pendente' aguarda upload do áudio.",
    placement: 'top-start'
  },
  {
    target: '[data-tour="sessoes-nova"]',
    title: 'Adicionar Sessão',
    content:
      'Clique aqui para registrar um novo grupo focal. Preencha os dados, faça upload do áudio/vídeo, e o sistema processará a transcrição automaticamente via Deepgram.',
    placement: 'bottom-start'
  },
  {
    target: '[data-tour="sessoes-abrir"]',
    title: 'Explorar Sessão',
    content: 'Abra uma sessão para ver a transcrição interativa, ouvir o áudio, taguear trechos importantes e ver o resumo gerado por IA.',
    placement: 'top-start'
  },
  {
    target: '[data-tour="sessoes-filtrar"]',
    title: 'Filtrar Sessões',
    content: 'Filtre por status, sentimento, período ou busque por texto nas keywords. Útil quando há muitas sessões acumuladas.',
    placement: 'bottom-start'
  }
];

const clipesSteps: TourStepDef[] = [
  {
    target: '[data-tour="clipes-grid"]',
    title: 'Melhores Momentos',
    content:
      'Cada card é uma frase de impacto de um eleitor. Mostra quem falou, de qual sessão, quantas vezes foi mencionada, e as tags temáticas. Clique no play para ouvir o trecho.',
    placement: 'bottom-start'
  },
  {
    target: '[data-tour="clipes-favorito"]',
    title: 'Destaques da Semana',
    content:
      "Favorite os clipes mais relevantes clicando na estrela. Eles aparecem no painel 'Destaques da Semana' à direita — prontos para o briefing do candidato.",
    placement: 'left-start'
  },
  {
    target: '[data-tour="clipes-filtros"]',
    title: 'Encontre Rapidamente',
    content: "Filtre por tag, sentimento, candidato mencionado, ou busque por texto. Ative 'Só favoritos' para ver apenas os destaques.",
    placement: 'bottom-start'
  }
];

const sentimentosSteps: TourStepDef[] = [
  {
    target: '[data-tour="sentimentos-matriz"]',
    title: 'Matriz de Sentimentos',
    content:
      'Cada célula mostra o sentimento de um tema numa sessão específica. Verde = positivo, Amarelo = neutro, Vermelho = negativo, Cinza = não discutido. Passe o mouse para ver detalhes.',
    placement: 'bottom-start'
  },
  {
    target: '[data-tour="sentimentos-radar"]',
    title: 'Radar de Temas',
    content:
      'O radar mostra a intensidade de cada tema na campanha. A área vermelha indica sentimento negativo, a verde indica positivo. Quanto maior a área, mais forte o sentimento.',
    placement: 'top-start'
  },
  {
    target: '[data-tour="sentimentos-barras"]',
    title: 'Percepção por Candidato',
    content:
      'Veja como cada candidato é percebido: proporção de menções positivas (verde), neutras (amarelo) e negativas (vermelho). Gabriel tem percepção polarizada — os adversários também.',
    placement: 'top-start'
  },
  {
    target: '[data-tour="sentimentos-diagnostico"]',
    title: 'Diagnóstico Automático',
    content:
      'O sistema analisa todos os dados e gera alertas (vermelho), atenções (amarelo) e oportunidades (verde). Cada insight tem uma recomendação acionável.',
    placement: 'top-start'
  }
];

const alertasSteps: TourStepDef[] = [
  {
    target: '[data-tour="alertas-kpis"]',
    title: 'Visão Rápida',
    content:
      'Quantos alertas ativos, quantos requerem ação imediata, quantos foram resolvidos, e quantos segmentos estão em zona de risco.',
    placement: 'bottom-start'
  },
  {
    target: '[data-tour="alertas-risco"]',
    title: 'Mapa de Risco',
    content:
      'Cada card é um segmento eleitoral. Verde = seguro, Amarelo = atenção, Vermelho = risco. O número é a intenção de voto do Gabriel naquele grupo. As setas mostram a tendência.',
    placement: 'right'
  },
  {
    target: '[data-tour="alertas-lista"]',
    title: 'Alertas Ativos',
    content:
      "Cada alerta tem severidade (Crítico/Atenção/Positivo), descrição, ação sugerida e tags. Clique em 'Investigar' para ir ao Causa e Efeito. 'Resolvido' marca como tratado.",
    placement: 'right'
  },
  {
    target: '[data-tour="alertas-regras"]',
    title: 'Regras de Alerta',
    content:
      'O sistema monitora automaticamente os dados usando estas regras. Quando uma condição é atingida, um alerta é gerado. Você pode ativar ou desativar cada regra.',
    placement: 'left'
  }
];

const sinteseSteps: TourStepDef[] = [
  {
    target: '[data-tour="sintese-resumo"]',
    title: 'Resumo Executivo',
    content:
      'O texto resume toda a semana em um parágrafo — o que melhorou, o que piorou, e o que precisa de ação. Escrito para ser lido pelo candidato em 30 segundos.',
    placement: 'bottom-start'
  },
  {
    target: '[data-tour="sintese-recomendacoes"]',
    title: 'Plano de Ação',
    content:
      'Ações priorizadas para a próxima semana. Vermelho = urgente, Amarelo = importante, Verde = oportunidade. Marque o checkbox quando a ação for executada.',
    placement: 'top-start'
  },
  {
    target: '[data-tour="sintese-cheatsheet"]',
    title: 'Cheat Sheet do Candidato',
    content:
      'Perguntas difíceis que apareceram nas qualis com respostas sugeridas. O candidato lê antes de entrevistas e debates. Exporte como PDF clicando no botão.',
    placement: 'top-start'
  }
];

const causaEfeitoSteps: TourStepDef[] = [
  {
    target: '[data-tour="causa-seletores"]',
    title: 'Escolha o Segmento',
    content:
      'Selecione qual segmento eleitoral quer analisar. O sistema cruza automaticamente os dados quantitativos (números) com os qualitativos (falas dos eleitores) daquele grupo.',
    placement: 'bottom-start'
  },
  {
    target: '[data-tour="causa-quanti"]',
    title: 'O que Aconteceu',
    content:
      'Os números mostram a variação detectada: quanto caiu ou subiu a intenção de voto e a rejeição naquele segmento. O gráfico mostra a tendência visual.',
    placement: 'top-start'
  },
  {
    target: '[data-tour="causa-quali"]',
    title: 'Por que Aconteceu',
    content:
      'As frases reais dos eleitores daquele segmento explicam o motivo da variação. Cada frase vem de uma sessão qualitativa e pode ser ouvida clicando no play.',
    placement: 'top-start'
  },
  {
    target: '[data-tour="causa-narrativas"]',
    title: 'Monitoramento de Narrativas',
    content:
      "'Ganhando força' significa que os eleitores estão mencionando o tema sozinhos — é perigoso. 'Precificado' significa que já perdeu impacto. 'A nosso favor' são narrativas que nos beneficiam.",
    placement: 'top-start'
  }
];

export const TOUR_STEPS: Record<TourId, TourStepDef[]> = {
  general: withDisableBeacon(generalSteps),
  tracking: withDisableBeacon(trackingSteps),
  crossTabs: withDisableBeacon(crossTabsSteps),
  simulacoes: withDisableBeacon(simulacoesSteps),
  sessoes: withDisableBeacon(sessoesSteps),
  sessaoIndividual: [],
  clipes: withDisableBeacon(clipesSteps),
  sentimentos: withDisableBeacon(sentimentosSteps),
  alertas: withDisableBeacon(alertasSteps),
  sintese: withDisableBeacon(sinteseSteps),
  causaEfeito: withDisableBeacon(causaEfeitoSteps)
};
