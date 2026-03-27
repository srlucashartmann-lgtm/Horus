export const CANDIDATOS = {
  gabriel: { nome: 'Gabriel Souza', cor: '#3F51B5', corClara: '#7986CB' },
  juliana: { nome: 'Juliana Brizola', cor: '#E91E63', corClara: '#F48FB1' },
  zucco: { nome: 'Zucco', cor: '#FF9800', corClara: '#FFB74D' },
  edegar: { nome: 'Edegar Pretto', cor: '#2E7D32', corClara: '#66BB6A' },
  brancos: { nome: 'Brancos/Nulos', cor: '#9E9E9E', corClara: '#BDBDBD' }
};

export interface TrackingRow {
  data: string;
  gabriel: number;
  juliana: number;
  zucco: number;
  edegar: number;
  brancos: number;
  evento?: string;
}

export const TRACKING_DATA: TrackingRow[] = [
  { data: '01/Mar', gabriel: 36, juliana: 22, zucco: 18, edegar: 12, brancos: 12 },
  { data: '03/Mar', gabriel: 37, juliana: 21, zucco: 18, edegar: 12, brancos: 12 },
  { data: '05/Mar', gabriel: 39, juliana: 21, zucco: 18, edegar: 11, brancos: 11, evento: 'Debate TV Record' },
  { data: '07/Mar', gabriel: 41, juliana: 20, zucco: 17, edegar: 11, brancos: 11 },
  { data: '09/Mar', gabriel: 42, juliana: 20, zucco: 17, edegar: 11, brancos: 10 },
  { data: '11/Mar', gabriel: 44, juliana: 21, zucco: 18, edegar: 10, brancos: 7, evento: 'Início Horário Eleitoral' },
  { data: '13/Mar', gabriel: 43, juliana: 21, zucco: 18, edegar: 10, brancos: 8 },
  { data: '14/Mar', gabriel: 43, juliana: 22, zucco: 17, edegar: 10, brancos: 8, evento: 'Ataque Juliana Brizola' },
  { data: '15/Mar', gabriel: 45, juliana: 21, zucco: 17, edegar: 10, brancos: 7 },
  { data: '17/Mar', gabriel: 44, juliana: 22, zucco: 17, edegar: 10, brancos: 7, evento: 'Viral TikTok Gabriel' },
  { data: '19/Mar', gabriel: 46, juliana: 21, zucco: 16, edegar: 10, brancos: 7 },
  { data: '20/Mar', gabriel: 47, juliana: 21, zucco: 16, edegar: 10, brancos: 6 }
];

export const REJEICAO_DATA: TrackingRow[] = [
  { data: '01/Mar', gabriel: 28, juliana: 33, zucco: 30, edegar: 26, brancos: 0 },
  { data: '03/Mar', gabriel: 27, juliana: 33, zucco: 30, edegar: 27, brancos: 0 },
  { data: '05/Mar', gabriel: 26, juliana: 34, zucco: 31, edegar: 27, brancos: 0, evento: 'Debate TV Record' },
  { data: '07/Mar', gabriel: 26, juliana: 34, zucco: 31, edegar: 27, brancos: 0 },
  { data: '09/Mar', gabriel: 25, juliana: 34, zucco: 31, edegar: 28, brancos: 0 },
  { data: '11/Mar', gabriel: 25, juliana: 35, zucco: 31, edegar: 28, brancos: 0, evento: 'Início Horário Eleitoral' },
  { data: '13/Mar', gabriel: 24, juliana: 35, zucco: 31, edegar: 28, brancos: 0 },
  { data: '14/Mar', gabriel: 25, juliana: 35, zucco: 31, edegar: 28, brancos: 0, evento: 'Ataque Juliana Brizola' },
  { data: '15/Mar', gabriel: 24, juliana: 35, zucco: 31, edegar: 28, brancos: 0 },
  { data: '17/Mar', gabriel: 24, juliana: 35, zucco: 31, edegar: 28, brancos: 0, evento: 'Viral TikTok Gabriel' },
  { data: '19/Mar', gabriel: 24, juliana: 35, zucco: 31, edegar: 28, brancos: 0 },
  { data: '20/Mar', gabriel: 24, juliana: 35, zucco: 31, edegar: 28, brancos: 0 }
];

export const APROVACAO_DATA: TrackingRow[] = [
  { data: '01/Mar', gabriel: 42, juliana: 30, zucco: 28, edegar: 25, brancos: 0 },
  { data: '03/Mar', gabriel: 43, juliana: 30, zucco: 28, edegar: 25, brancos: 0 },
  { data: '05/Mar', gabriel: 44, juliana: 30, zucco: 28, edegar: 24, brancos: 0, evento: 'Debate TV Record' },
  { data: '07/Mar', gabriel: 46, juliana: 29, zucco: 27, edegar: 24, brancos: 0 },
  { data: '09/Mar', gabriel: 47, juliana: 29, zucco: 27, edegar: 24, brancos: 0 },
  { data: '11/Mar', gabriel: 48, juliana: 29, zucco: 28, edegar: 23, brancos: 0, evento: 'Início Horário Eleitoral' },
  { data: '13/Mar', gabriel: 49, juliana: 29, zucco: 28, edegar: 23, brancos: 0 },
  { data: '14/Mar', gabriel: 48, juliana: 30, zucco: 27, edegar: 23, brancos: 0, evento: 'Ataque Juliana Brizola' },
  { data: '15/Mar', gabriel: 50, juliana: 29, zucco: 27, edegar: 23, brancos: 0 },
  { data: '17/Mar', gabriel: 50, juliana: 30, zucco: 27, edegar: 23, brancos: 0, evento: 'Viral TikTok Gabriel' },
  { data: '19/Mar', gabriel: 51, juliana: 29, zucco: 27, edegar: 23, brancos: 0 },
  { data: '20/Mar', gabriel: 51, juliana: 29, zucco: 27, edegar: 23, brancos: 0 }
];

export const SEGMENTOS = ['Geral', 'Evangélicos', 'Mulheres 25-34', 'Jovens 16-24', 'Interior'] as const;

export interface RejeicaoSegmento {
  candidato: string;
  geral: number;
  evangelicos: number;
  mulheres2534: number;
  jovens1624: number;
  interior: number;
}

export const REJEICAO_POR_SEGMENTO: RejeicaoSegmento[] = [
  { candidato: 'Gabriel Souza', geral: 24, evangelicos: 38, mulheres2534: 18, jovens1624: 14, interior: 31 },
  { candidato: 'Juliana Brizola', geral: 35, evangelicos: 28, mulheres2534: 22, jovens1624: 30, interior: 38 },
  { candidato: 'Zucco', geral: 31, evangelicos: 15, mulheres2534: 35, jovens1624: 28, interior: 22 },
  { candidato: 'Edegar Pretto', geral: 28, evangelicos: 42, mulheres2534: 25, jovens1624: 22, interior: 18 }
];

export const EVENTOS_CAMPANHA = [
  { data: '05/Mar', label: 'Debate TV Record', indice: 2 },
  { data: '11/Mar', label: 'Início Horário Eleitoral', indice: 5 },
  { data: '14/Mar', label: 'Ataque Juliana Brizola', indice: 7 },
  { data: '17/Mar', label: 'Viral TikTok Gabriel', indice: 9 }
];

export const SEGMENTOS_TABELA = [
  { segmento: 'Mulheres 25-34', voto: 52, rejeicao: 18, variacao: 3.2 },
  { segmento: 'Homens 35-49', voto: 41, rejeicao: 29, variacao: -1.8 },
  { segmento: 'Evangélicos', voto: 33, rejeicao: 38, variacao: -4.1 },
  { segmento: 'Classe C', voto: 44, rejeicao: 24, variacao: 0.5 },
  { segmento: 'Jovens 16-24', voto: 58, rejeicao: 14, variacao: 5.7 },
  { segmento: 'Interior Norte', voto: 39, rejeicao: 31, variacao: -2.3 },
  { segmento: 'Classe A/B', voto: 35, rejeicao: 34, variacao: -0.9 },
  { segmento: 'Mulheres 50+', voto: 48, rejeicao: 21, variacao: 1.4 }
];

export const ALERTAS = [
  { tipo: 'critico' as const, texto: 'Rejeição de Gabriel subiu 4.1% entre Evangélicos nos últimos 3 dias — ultrapassou margem de erro em 2 rodadas consecutivas' },
  { tipo: 'atencao' as const, texto: 'Tema "Gabriel inexperiente" apareceu espontaneamente em 2 qualis seguidas — possível ataque coordenado de Juliana Brizola' },
  { tipo: 'atencao' as const, texto: 'Zucco consolidando liderança em percepção de segurança — 68% dos evangélicos citam como melhor candidato no tema' },
  { tipo: 'positivo' as const, texto: 'Gabriel atingiu máxima histórica com Jovens 16-24 (58%) após viralização no TikTok' },
  { tipo: 'positivo' as const, texto: 'Frase "geladeira vazia" identificada como vocabulário-chave — recomendar uso no próximo debate' }
];

export const SESSOES_QUALITATIVAS = [
  { titulo: 'Mulheres Indecisas — Classe C', data: '19 Mar', participantes: 8, sentimento: 'Negativo' as const, status: 'Transcrito', tags: ['#geladeira-vazia', '#medo', '#creche'] },
  { titulo: 'Jovens Universitários — Capital', data: '17 Mar', participantes: 10, sentimento: 'Positivo' as const, status: 'Transcrito', tags: ['#emprego', '#tecnologia', '#futuro'] },
  { titulo: 'Evangélicos — Periferia', data: '15 Mar', participantes: 9, sentimento: 'Neutro' as const, status: 'Processando', tags: ['#família', '#valores', '#segurança'] },
  { titulo: 'Homens Classe B — Zona Sul', data: '13 Mar', participantes: 8, sentimento: 'Misto' as const, status: 'Transcrito', tags: ['#imposto', '#segurança'] },
  { titulo: 'Donas de Casa — Interior', data: '10 Mar', participantes: 7, sentimento: 'Negativo' as const, status: 'Transcrito', tags: ['#abandono', '#hospital'] }
];

export const FRASES_ELEITOR = [
  { frase: 'A geladeira tá vazia e o gás tá caro demais', autor: 'Maria, 32, Classe C', mencoes: 4 },
  { frase: 'Eu quero ver emprego, não promessa', autor: 'Lucas, 21, Universitário', mencoes: 3 },
  { frase: 'Ninguém fala da gente que mora longe', autor: 'José, 45, Interior', mencoes: 3 },
  { frase: 'O Gabriel parece que entende a gente jovem', autor: 'Ana, 19, Capital', mencoes: 2 },
  { frase: 'O Zucco é o único que fala de segurança de verdade', autor: 'Paulo, 55, Evangélico', mencoes: 2 },
  { frase: 'A Brizola tem o nome mas não tem o plano', autor: 'Dona Lúcia, 61, Classe C', mencoes: 2 },
  { frase: 'Eu tenho medo de votar errado e me arrepender', autor: 'Cláudia, 38, Indecisa', mencoes: 3 }
];

export const SEGMENTOS_FILTRO = [
  'Todos',
  'Mulheres 25-34',
  'Homens 35-49',
  'Evangélicos',
  'Classe C',
  'Jovens 16-24',
  'Interior Norte',
  'Classe A/B',
  'Mulheres 50+'
];

// ===================== CROSS-TABS =====================

export const CROSSTAB_PERGUNTAS = [
  { value: 'intencao_estimulada', label: 'Intenção de Voto Estimulada' },
  { value: 'intencao_espontanea', label: 'Intenção de Voto Espontânea' },
  { value: 'rejeicao', label: 'Rejeição' },
  { value: 'avaliacao_governo', label: 'Avaliação do Governo' },
  { value: 'avaliacao_gabriel', label: 'Avaliação do Candidato Gabriel' },
  { value: 'conhecimento', label: 'Conhecimento dos Candidatos' }
];

export const CROSSTAB_FILTROS = [
  { value: 'faixa_etaria', label: 'Faixa Etária' },
  { value: 'genero', label: 'Gênero' },
  { value: 'classe_social', label: 'Classe Social' },
  { value: 'religiao', label: 'Religião' },
  { value: 'escolaridade', label: 'Escolaridade' },
  { value: 'regiao', label: 'Região' },
  { value: 'todas', label: 'Todas (sem filtro)' }
];

export const CROSSTAB_RODADAS = [
  { value: 'r18', label: 'Rodada 18 (20/Mar)' },
  { value: 'r17', label: 'Rodada 17 (17/Mar)' },
  { value: 'r16', label: 'Rodada 16 (14/Mar)' },
  { value: 'r15', label: 'Rodada 15 (11/Mar)' }
];

export interface CrossTabRow {
  candidato: string;
  valores: number[];
  total: number;
}

export interface CrossTabResult {
  colunas: string[];
  dados: CrossTabRow[];
}

export interface CrossTabResultWithDelta {
  colunas: string[];
  dados: (CrossTabRow & { deltas: (number | null)[] })[];
}

const CANDIDATOS_NOMES = ['Gabriel Souza', 'Juliana Brizola', 'Zucco', 'Edegar Pretto', 'Brancos/Nulos'];

const CROSSTAB_DB: Record<string, Record<string, CrossTabResult>> = {
  intencao_estimulada: {
    faixa_etaria: {
      colunas: ['16-24', '25-34', '35-49', '50-64', '65+'],
      dados: [
        { candidato: CANDIDATOS_NOMES[0], valores: [58, 52, 41, 38, 33], total: 47 },
        { candidato: CANDIDATOS_NOMES[1], valores: [12, 18, 22, 28, 30], total: 21 },
        { candidato: CANDIDATOS_NOMES[2], valores: [10, 14, 18, 20, 22], total: 16 },
        { candidato: CANDIDATOS_NOMES[3], valores: [8, 8, 10, 8, 10], total: 10 },
        { candidato: CANDIDATOS_NOMES[4], valores: [12, 8, 9, 6, 5], total: 6 }
      ]
    },
    religiao: {
      colunas: ['Católico', 'Evangélico', 'Sem religião', 'Outras'],
      dados: [
        { candidato: CANDIDATOS_NOMES[0], valores: [52, 33, 55, 45], total: 47 },
        { candidato: CANDIDATOS_NOMES[1], valores: [20, 18, 22, 24], total: 21 },
        { candidato: CANDIDATOS_NOMES[2], valores: [14, 28, 10, 15], total: 16 },
        { candidato: CANDIDATOS_NOMES[3], valores: [8, 12, 8, 10], total: 10 },
        { candidato: CANDIDATOS_NOMES[4], valores: [6, 9, 5, 6], total: 6 }
      ]
    },
    classe_social: {
      colunas: ['A/B', 'C', 'D/E'],
      dados: [
        { candidato: CANDIDATOS_NOMES[0], valores: [35, 44, 55], total: 47 },
        { candidato: CANDIDATOS_NOMES[1], valores: [28, 20, 16], total: 21 },
        { candidato: CANDIDATOS_NOMES[2], valores: [22, 16, 12], total: 16 },
        { candidato: CANDIDATOS_NOMES[3], valores: [10, 12, 8], total: 10 },
        { candidato: CANDIDATOS_NOMES[4], valores: [5, 8, 9], total: 6 }
      ]
    },
    genero: {
      colunas: ['Masculino', 'Feminino'],
      dados: [
        { candidato: CANDIDATOS_NOMES[0], valores: [44, 50], total: 47 },
        { candidato: CANDIDATOS_NOMES[1], valores: [18, 24], total: 21 },
        { candidato: CANDIDATOS_NOMES[2], valores: [20, 12], total: 16 },
        { candidato: CANDIDATOS_NOMES[3], valores: [12, 8], total: 10 },
        { candidato: CANDIDATOS_NOMES[4], valores: [6, 6], total: 6 }
      ]
    },
    regiao: {
      colunas: ['Capital', 'Região Metropolitana', 'Interior Norte', 'Interior Sul'],
      dados: [
        { candidato: CANDIDATOS_NOMES[0], valores: [50, 46, 39, 44], total: 47 },
        { candidato: CANDIDATOS_NOMES[1], valores: [22, 20, 24, 18], total: 21 },
        { candidato: CANDIDATOS_NOMES[2], valores: [14, 16, 18, 20], total: 16 },
        { candidato: CANDIDATOS_NOMES[3], valores: [8, 12, 12, 10], total: 10 },
        { candidato: CANDIDATOS_NOMES[4], valores: [6, 6, 7, 8], total: 6 }
      ]
    },
    escolaridade: {
      colunas: ['Fundamental', 'Médio', 'Superior', 'Pós-graduação'],
      dados: [
        { candidato: CANDIDATOS_NOMES[0], valores: [50, 48, 42, 38], total: 47 },
        { candidato: CANDIDATOS_NOMES[1], valores: [16, 20, 24, 26], total: 21 },
        { candidato: CANDIDATOS_NOMES[2], valores: [14, 16, 18, 20], total: 16 },
        { candidato: CANDIDATOS_NOMES[3], valores: [10, 10, 10, 10], total: 10 },
        { candidato: CANDIDATOS_NOMES[4], valores: [10, 6, 6, 6], total: 6 }
      ]
    },
    todas: {
      colunas: ['Total Geral'],
      dados: [
        { candidato: CANDIDATOS_NOMES[0], valores: [47], total: 47 },
        { candidato: CANDIDATOS_NOMES[1], valores: [21], total: 21 },
        { candidato: CANDIDATOS_NOMES[2], valores: [16], total: 16 },
        { candidato: CANDIDATOS_NOMES[3], valores: [10], total: 10 },
        { candidato: CANDIDATOS_NOMES[4], valores: [6], total: 6 }
      ]
    }
  },
  avaliacao_gabriel: {
    faixa_etaria: {
      colunas: ['16-24', '25-34', '35-49', '50-64', '65+'],
      dados: [
        { candidato: 'Ótimo/Bom', valores: [62, 55, 44, 40, 35], total: 48 },
        { candidato: 'Regular', valores: [18, 22, 28, 30, 32], total: 26 },
        { candidato: 'Ruim/Péssimo', valores: [12, 15, 20, 22, 25], total: 19 },
        { candidato: 'NS/NR', valores: [8, 8, 8, 8, 8], total: 7 }
      ]
    },
    religiao: {
      colunas: ['Católico', 'Evangélico', 'Sem religião', 'Outras'],
      dados: [
        { candidato: 'Ótimo/Bom', valores: [52, 35, 58, 46], total: 48 },
        { candidato: 'Regular', valores: [25, 30, 22, 28], total: 26 },
        { candidato: 'Ruim/Péssimo', valores: [16, 28, 14, 18], total: 19 },
        { candidato: 'NS/NR', valores: [7, 7, 6, 8], total: 7 }
      ]
    },
    classe_social: {
      colunas: ['A/B', 'C', 'D/E'],
      dados: [
        { candidato: 'Ótimo/Bom', valores: [38, 48, 56], total: 48 },
        { candidato: 'Regular', valores: [30, 26, 22], total: 26 },
        { candidato: 'Ruim/Péssimo', valores: [25, 18, 14], total: 19 },
        { candidato: 'NS/NR', valores: [7, 8, 8], total: 7 }
      ]
    },
    genero: {
      colunas: ['Masculino', 'Feminino'],
      dados: [
        { candidato: 'Ótimo/Bom', valores: [45, 51], total: 48 },
        { candidato: 'Regular', valores: [28, 24], total: 26 },
        { candidato: 'Ruim/Péssimo', valores: [20, 18], total: 19 },
        { candidato: 'NS/NR', valores: [7, 7], total: 7 }
      ]
    },
    regiao: {
      colunas: ['Capital', 'Região Metropolitana', 'Interior Norte', 'Interior Sul'],
      dados: [
        { candidato: 'Ótimo/Bom', valores: [54, 48, 38, 45], total: 48 },
        { candidato: 'Regular', valores: [24, 26, 30, 28], total: 26 },
        { candidato: 'Ruim/Péssimo', valores: [16, 18, 24, 20], total: 19 },
        { candidato: 'NS/NR', valores: [6, 8, 8, 7], total: 7 }
      ]
    },
    escolaridade: {
      colunas: ['Fundamental', 'Médio', 'Superior', 'Pós-graduação'],
      dados: [
        { candidato: 'Ótimo/Bom', valores: [52, 50, 44, 40], total: 48 },
        { candidato: 'Regular', valores: [24, 26, 28, 30], total: 26 },
        { candidato: 'Ruim/Péssimo', valores: [16, 16, 20, 24], total: 19 },
        { candidato: 'NS/NR', valores: [8, 8, 8, 6], total: 7 }
      ]
    },
    todas: {
      colunas: ['Total Geral'],
      dados: [
        { candidato: 'Ótimo/Bom', valores: [48], total: 48 },
        { candidato: 'Regular', valores: [26], total: 26 },
        { candidato: 'Ruim/Péssimo', valores: [19], total: 19 },
        { candidato: 'NS/NR', valores: [7], total: 7 }
      ]
    }
  }
};

const DELTA_DB: Record<string, Record<string, number[][]>> = {
  intencao_estimulada: {
    faixa_etaria: [
      [5, 3, 1, -1, -2],
      [-1, 0, 1, 2, 1],
      [-2, -1, 0, 0, 1],
      [0, -1, -1, 0, 0],
      [-2, -1, -1, -1, 0]
    ],
    religiao: [
      [2, -4, 3, 1],
      [0, 1, -1, 0],
      [-1, 2, 0, 0],
      [0, 1, -1, 0],
      [-1, 0, -1, -1]
    ],
    classe_social: [
      [-1, 1, 3],
      [1, 0, -1],
      [0, -1, 0],
      [0, 1, -1],
      [0, -1, -1]
    ],
    genero: [
      [1, 3],
      [0, -1],
      [-1, 0],
      [0, -1],
      [0, -1]
    ],
    regiao: [
      [2, 1, -2, 1],
      [0, 0, 1, -1],
      [-1, 0, 1, 0],
      [0, 0, 0, 0],
      [-1, -1, 0, 0]
    ],
    escolaridade: [
      [3, 2, 0, -1],
      [-1, 0, 1, 1],
      [0, -1, 0, 0],
      [0, 0, -1, 0],
      [-2, -1, 0, 0]
    ],
    todas: [
      [3],
      [0],
      [-1],
      [0],
      [-2]
    ]
  }
};

export function getCrossTabData(pergunta: string, filtro: string): CrossTabResult {
  const perguntaData = CROSSTAB_DB[pergunta] || CROSSTAB_DB.intencao_estimulada;
  return perguntaData[filtro] || perguntaData.faixa_etaria;
}

export function getCrossTabDeltas(pergunta: string, filtro: string): number[][] | null {
  const p = DELTA_DB[pergunta] || DELTA_DB.intencao_estimulada;
  return p[filtro] || null;
}

export function getCrossTabInsights(pergunta: string, filtro: string): string[] {
  const data = getCrossTabData(pergunta, filtro);
  const deltas = getCrossTabDeltas(pergunta, filtro);
  const insights: string[] = [];

  const gabriel = data.dados[0];
  if (gabriel) {
    const maxIdx = gabriel.valores.indexOf(Math.max(...gabriel.valores));
    insights.push(`Gabriel Souza tem melhor desempenho em "${data.colunas[maxIdx]}" com ${gabriel.valores[maxIdx]}%.`);

    const minIdx = gabriel.valores.indexOf(Math.min(...gabriel.valores));
    if (minIdx !== maxIdx) {
      insights.push(`Pior desempenho de Gabriel em "${data.colunas[minIdx]}" com ${gabriel.valores[minIdx]}% — diferença de ${gabriel.valores[maxIdx] - gabriel.valores[minIdx]}pp.`);
    }
  }

  if (filtro === 'faixa_etaria') {
    const juliana = data.dados.find((d) => d.candidato === 'Juliana Brizola');
    if (juliana && juliana.valores.length >= 2) {
      const primeiro = juliana.valores[0];
      const ultimo = juliana.valores[juliana.valores.length - 1];
      if (ultimo > primeiro) {
        insights.push(`Juliana Brizola cresce com a idade: ${primeiro}% em ${data.colunas[0]} → ${ultimo}% em ${data.colunas[data.colunas.length - 1]}.`);
      }
    }
  }

  if (filtro === 'escolaridade') {
    insights.push('Juliana Brizola tem melhor desempenho entre Pós-graduação (26%) — público a ser disputado.');
    insights.push('Zucco estável em todas as escolaridades, sem ponto forte claro.');
  }

  if (deltas) {
    for (let i = 0; i < data.dados.length; i++) {
      for (let j = 0; j < deltas[i].length; j++) {
        const d = deltas[i][j];
        if (Math.abs(d) >= 3) {
          const dir = d > 0 ? 'subiu' : 'caiu';
          insights.push(`${data.dados[i].candidato} ${dir} ${Math.abs(d)}pp em "${data.colunas[j]}" vs rodada anterior.`);
        }
      }
    }
  }

  return insights;
}

// ===================== SIMULAÇÕES DE CENÁRIO =====================

export const CENARIO_ATUAL = {
  gabriel: 47, juliana: 21, zucco: 16, edegar: 10, brancos: 6,
  totalEleitores: 1200000
};

export const REDISTRIBUICAO_PADRAO: Record<string, Record<string, number>> = {
  edegar: { gabriel: 40, juliana: 25, zucco: 20, brancos: 15 },
  zucco: { gabriel: 30, juliana: 25, edegar: 25, brancos: 20 },
  juliana: { gabriel: 35, zucco: 20, edegar: 15, brancos: 30 }
};

export const SEGUNDO_TURNO = [
  { adversario: 'Juliana Brizola', gabriel: 56, oponente: 32, brancos: 12 },
  { adversario: 'Zucco', gabriel: 54, oponente: 30, brancos: 16 },
  { adversario: 'Edegar Pretto', gabriel: 58, oponente: 24, brancos: 18 }
];

export const CONVERSAO_PADRAO = { gabriel: 50, juliana: 20, zucco: 15, edegar: 5, permanecem: 10 };

// ===================== SESSÕES QUALITATIVAS COMPLETAS =====================

export interface FalaTranscricao {
  timestamp: string;
  speaker: string;
  tipo: 'moderador' | 'participante';
  texto: string;
}

export interface ParticipanteSentimento {
  nome: string;
  sentimento: 'Positivo' | 'Negativo' | 'Neutro';
  inclinacao: string;
}

export interface SessaoCompleta {
  id: string;
  titulo: string;
  data: string;
  participantes: number;
  duracao: string;
  moderador: string;
  sentimento: 'Positivo' | 'Negativo' | 'Neutro' | 'Misto';
  status: 'Transcrito' | 'Processando' | 'Pendente';
  statusProgresso?: number;
  tags: string[];
  resumo: string;
  pontosIA: string[];
  transcricao: FalaTranscricao[];
  sentimentoParticipantes: ParticipanteSentimento[];
  tagFrequencias: { tag: string; count: number }[];
}

export const SESSOES_COMPLETAS: SessaoCompleta[] = [
  {
    id: '1',
    titulo: 'Mulheres Indecisas — Classe C',
    data: '19/Mar',
    participantes: 8,
    duracao: '1h 42min',
    moderador: 'Ana Paula',
    sentimento: 'Negativo',
    status: 'Transcrito',
    tags: ['geladeira vazia', 'medo', 'creche', 'preço do gás', 'Bolsa Família'],
    resumo: 'Grupo marcado por forte angústia econômica. A expressão "geladeira vazia" foi repetida 4 vezes por participantes diferentes. Medo generalizado sobre fechamento de creches e aumento do gás. Gabriel Souza é visto como "jovem demais" por 3 participantes.',
    pontosIA: [
      'Forte angústia econômica — "geladeira vazia" é a expressão-símbolo do grupo',
      'Creche fechada no bairro é um gatilho emocional forte — 3 participantes mencionaram',
      'Gabriel Souza visto como "jovem demais" — ponto de vulnerabilidade',
      'Nenhum candidato gera entusiasmo — voto será defensivo',
      'Bolsa Família tem potencial como argumento — testou bem com 1 participante'
    ],
    transcricao: [
      { timestamp: '00:00:30', speaker: 'Moderador', tipo: 'moderador', texto: 'Boa noite a todas. Vamos conversar sobre o que mais preocupa vocês hoje no dia a dia.' },
      { timestamp: '00:01:15', speaker: 'Maria (Indecisa)', tipo: 'participante', texto: 'Olha, a geladeira tá vazia e o gás tá caro demais. Não sei como vou fazer no fim do mês.' },
      { timestamp: '00:02:03', speaker: 'Joana (Indecisa)', tipo: 'participante', texto: 'É igual pra mim. E a creche fechou no bairro, agora não tenho onde deixar meu filho pra trabalhar.' },
      { timestamp: '00:03:22', speaker: 'Cláudia (Indecisa)', tipo: 'participante', texto: 'Eu tenho medo de votar errado e me arrepender. Já aconteceu antes.' },
      { timestamp: '00:04:45', speaker: 'Moderador', tipo: 'moderador', texto: 'E sobre os candidatos, o que vocês conhecem? O que pensam?' },
      { timestamp: '00:05:10', speaker: 'Maria (Indecisa)', tipo: 'participante', texto: 'O Gabriel parece novo demais. Será que dá conta?' },
      { timestamp: '00:06:30', speaker: 'Sandra (Lulista)', tipo: 'participante', texto: 'Eu acho que ele entende mais a gente do que os outros. Pelo menos fala a nossa língua.' },
      { timestamp: '00:07:55', speaker: 'Joana (Indecisa)', tipo: 'participante', texto: 'A Brizola tem o nome mas não tem o plano. Fica só no sobrenome.' },
      { timestamp: '00:09:12', speaker: 'Cláudia (Indecisa)', tipo: 'participante', texto: 'O Zucco fala de segurança mas nunca apareceu aqui no bairro.' },
      { timestamp: '00:10:40', speaker: 'Moderador', tipo: 'moderador', texto: 'E sobre o preço das coisas, quem vocês acham que pode resolver?' },
      { timestamp: '00:11:05', speaker: 'Maria (Indecisa)', tipo: 'participante', texto: 'Ninguém resolve. Mas pelo menos alguém que entenda que a geladeira tá vazia já seria bom.' },
      { timestamp: '00:12:30', speaker: 'Sandra (Lulista)', tipo: 'participante', texto: 'O Gabriel falou sobre Bolsa Família no vídeo. Isso me chamou atenção.' }
    ],
    sentimentoParticipantes: [
      { nome: 'Maria', sentimento: 'Negativo', inclinacao: 'Indecisa' },
      { nome: 'Joana', sentimento: 'Negativo', inclinacao: 'Indecisa' },
      { nome: 'Cláudia', sentimento: 'Negativo', inclinacao: 'Indecisa' },
      { nome: 'Sandra', sentimento: 'Positivo', inclinacao: 'Pró-Gabriel' }
    ],
    tagFrequencias: [
      { tag: 'geladeira vazia', count: 4 },
      { tag: 'medo', count: 3 },
      { tag: 'creche', count: 2 },
      { tag: 'preço do gás', count: 2 },
      { tag: 'Bolsa Família', count: 1 },
      { tag: 'Gabriel jovem', count: 1 }
    ]
  },
  {
    id: '2',
    titulo: 'Jovens Universitários — Capital',
    data: '17/Mar',
    participantes: 10,
    duracao: '1h 28min',
    moderador: 'Carlos Eduardo',
    sentimento: 'Positivo',
    status: 'Transcrito',
    tags: ['emprego', 'tecnologia', 'futuro', 'inovação', 'Gabriel jovem'],
    resumo: 'Grupo otimista e engajado. Gabriel Souza tem forte identificação com esse público. Tema emprego e tecnologia dominou 60% da conversa. Candidato visto como "alguém que entende a gente". Juliana Brizola praticamente desconhecida neste grupo.',
    pontosIA: [
      'Gabriel Souza tem forte identificação — "alguém que entende a gente"',
      'Emprego e tecnologia dominaram 60% da conversa',
      'Juliana Brizola praticamente desconhecida neste grupo',
      'Inovação e futuro são as palavras-chave que mobilizam',
      'Potencial de engajamento digital altíssimo neste segmento'
    ],
    transcricao: [
      { timestamp: '00:00:45', speaker: 'Moderador', tipo: 'moderador', texto: 'Vamos falar sobre o que vocês esperam do próximo governador.' },
      { timestamp: '00:01:30', speaker: 'Lucas (Universitário)', tipo: 'participante', texto: 'Eu quero ver emprego, não promessa. Cansei de ouvir político falar bonito.' },
      { timestamp: '00:02:50', speaker: 'Ana (Universitária)', tipo: 'participante', texto: 'O Gabriel parece que entende a gente jovem. Vi o vídeo dele no TikTok.' },
      { timestamp: '00:04:10', speaker: 'Pedro (Universitário)', tipo: 'participante', texto: 'Tecnologia e inovação é o que o RS precisa. Não dá pra ficar parado no tempo.' }
    ],
    sentimentoParticipantes: [
      { nome: 'Lucas', sentimento: 'Positivo', inclinacao: 'Pró-Gabriel' },
      { nome: 'Ana', sentimento: 'Positivo', inclinacao: 'Pró-Gabriel' },
      { nome: 'Pedro', sentimento: 'Positivo', inclinacao: 'Pró-Gabriel' }
    ],
    tagFrequencias: [
      { tag: 'emprego', count: 5 },
      { tag: 'tecnologia', count: 4 },
      { tag: 'futuro', count: 3 },
      { tag: 'inovação', count: 2 },
      { tag: 'Gabriel jovem', count: 3 }
    ]
  },
  {
    id: '3',
    titulo: 'Evangélicos — Periferia',
    data: '15/Mar',
    participantes: 9,
    duracao: '1h 55min',
    moderador: 'Ana Paula',
    sentimento: 'Neutro',
    status: 'Processando',
    statusProgresso: 72,
    tags: ['família', 'valores', 'segurança', 'escola', 'Zucco confiável'],
    resumo: 'Grupo dividido. Forte identificação com Zucco no tema segurança. Gabriel Souza gera desconfiança em temas de valores e família. 4 participantes mencionaram "medo de mudar" espontaneamente.',
    pontosIA: [
      'Zucco tem forte identificação no tema segurança',
      'Gabriel gera desconfiança em temas de valores e família',
      '"Medo de mudar" mencionado por 4 de 9 participantes',
      'Escola e segurança são as prioridades práticas do grupo',
      'Oportunidade para Gabriel: mostrar compromisso com família'
    ],
    transcricao: [
      { timestamp: '00:01:00', speaker: 'Moderador', tipo: 'moderador', texto: 'O que é mais importante pra vocês na hora de escolher um candidato?' },
      { timestamp: '00:02:15', speaker: 'Paulo (Evangélico)', tipo: 'participante', texto: 'Família e valores. O Zucco é o único que fala de segurança de verdade.' },
      { timestamp: '00:03:40', speaker: 'Marta (Evangélica)', tipo: 'participante', texto: 'Eu tenho medo de mudar. Melhor o ruim conhecido do que o bom por conhecer.' }
    ],
    sentimentoParticipantes: [
      { nome: 'Paulo', sentimento: 'Negativo', inclinacao: 'Pró-Zucco' },
      { nome: 'Marta', sentimento: 'Neutro', inclinacao: 'Indecisa' }
    ],
    tagFrequencias: [
      { tag: 'família', count: 5 },
      { tag: 'valores', count: 4 },
      { tag: 'segurança', count: 3 },
      { tag: 'escola', count: 2 },
      { tag: 'Zucco confiável', count: 2 }
    ]
  },
  {
    id: '4',
    titulo: 'Homens Classe B — Zona Sul',
    data: '13/Mar',
    participantes: 8,
    duracao: '1h 35min',
    moderador: 'Ricardo Mendes',
    sentimento: 'Misto',
    status: 'Transcrito',
    tags: ['imposto', 'segurança', 'Brizola legado', 'Gabriel inexperiente'],
    resumo: 'Grupo pragmático focado em economia e segurança. Tema "Gabriel inexperiente" surgiu 3 vezes. Juliana Brizola tem recall por conta do legado familiar. Zucco visto como competente mas "sem carisma".',
    pontosIA: [
      '"Gabriel inexperiente" surgiu 3 vezes — narrativa a combater',
      'Juliana Brizola se beneficia do legado familiar neste público',
      'Zucco visto como competente mas "sem carisma"',
      'Grupo focado em economia e redução de impostos',
      'Segurança é preocupação secundária mas relevante'
    ],
    transcricao: [
      { timestamp: '00:01:20', speaker: 'Moderador', tipo: 'moderador', texto: 'O que vocês acham dos candidatos ao governo?' },
      { timestamp: '00:02:30', speaker: 'Roberto (Classe B)', tipo: 'participante', texto: 'O Gabriel é inexperiente. Parece que não sabe o que está fazendo.' },
      { timestamp: '00:04:00', speaker: 'Marcos (Classe B)', tipo: 'participante', texto: 'A Brizola pelo menos tem o nome. O pai fez coisas pelo estado.' }
    ],
    sentimentoParticipantes: [
      { nome: 'Roberto', sentimento: 'Negativo', inclinacao: 'Anti-Gabriel' },
      { nome: 'Marcos', sentimento: 'Neutro', inclinacao: 'Pró-Brizola' }
    ],
    tagFrequencias: [
      { tag: 'imposto', count: 4 },
      { tag: 'segurança', count: 3 },
      { tag: 'Brizola legado', count: 2 },
      { tag: 'Gabriel inexperiente', count: 3 }
    ]
  },
  {
    id: '5',
    titulo: 'Donas de Casa — Interior',
    data: '10/Mar',
    participantes: 7,
    duracao: '1h 20min',
    moderador: 'Ana Paula',
    sentimento: 'Negativo',
    status: 'Transcrito',
    tags: ['abandono', 'hospital', 'estrada', 'ninguém lembra da gente'],
    resumo: 'Grupo com forte sentimento de abandono. Expressão "ninguém lembra da gente" repetida por 5 de 7 participantes. Demandas práticas: hospital, estrada, transporte. Nenhum candidato gera entusiasmo — voto será "no menos pior".',
    pontosIA: [
      '"Ninguém lembra da gente" — expressão unânime do grupo',
      'Demandas práticas dominam: hospital, estrada, transporte',
      'Nenhum candidato gera entusiasmo — voto defensivo',
      'Interior se sente abandonado pela política estadual',
      'Oportunidade para Gabriel: agenda concreta para o interior'
    ],
    transcricao: [
      { timestamp: '00:00:50', speaker: 'Moderador', tipo: 'moderador', texto: 'Quais são os principais problemas da região de vocês?' },
      { timestamp: '00:01:45', speaker: 'Dona Lúcia (Interior)', tipo: 'participante', texto: 'Ninguém fala da gente que mora longe. O hospital mais perto é a 80km.' },
      { timestamp: '00:03:00', speaker: 'José (Interior)', tipo: 'participante', texto: 'A estrada tá destruída. Ninguém lembra da gente.' }
    ],
    sentimentoParticipantes: [
      { nome: 'Dona Lúcia', sentimento: 'Negativo', inclinacao: 'Indecisa' },
      { nome: 'José', sentimento: 'Negativo', inclinacao: 'Indeciso' }
    ],
    tagFrequencias: [
      { tag: 'abandono', count: 5 },
      { tag: 'hospital', count: 3 },
      { tag: 'estrada', count: 3 },
      { tag: 'ninguém lembra da gente', count: 5 }
    ]
  }
];

export function getSessaoById(id: string): SessaoCompleta | undefined {
  return SESSOES_COMPLETAS.find((s) => s.id === id);
}

export const TAGS_PREDEFINIDAS = [
  'Ataque_Adversário', 'Medo_Economia', 'Elogio_Gabriel', 'Elogio_Adversário',
  'Custo_de_Vida', 'Segurança', 'Saúde', 'Educação'
];

// ===================== BIBLIOTECA DE CLIPES =====================

export interface Clipe {
  id: number;
  frase: string;
  participante: { nome: string; idade: number; perfil: string };
  sessao: string;
  sessaoId: string;
  data: string;
  timestamp: string;
  tags: string[];
  sentimento: 'Positivo' | 'Negativo' | 'Neutro';
  candidatoMencionado: string | null;
  mencoes: number;
  favorito: boolean;
}

export const TAG_CORES: Record<string, string> = {
  Ataque_Adversário: '#C62828', Medo: '#C62828', Inexperiência: '#C62828',
  Elogio_Gabriel: '#2E7D32', Futuro: '#2E7D32',
  Economia: '#3F51B5', Custo_de_Vida: '#3F51B5', Emprego: '#3F51B5', Segurança: '#3F51B5', Saúde: '#3F51B5', Família: '#3F51B5', Valores: '#3F51B5', Educação: '#3F51B5', Elogio_Adversário: '#3F51B5',
  Abandono: '#78909C', Interior: '#78909C', Juventude: '#78909C', Cobrança: '#78909C', Pragmatismo: '#78909C'
};

export const CLIPES_DATA: Clipe[] = [
  { id: 1, frase: 'A geladeira tá vazia e o gás tá caro demais', participante: { nome: 'Maria', idade: 32, perfil: 'Classe C, Indecisa' }, sessao: 'Mulheres Indecisas — Classe C', sessaoId: '1', data: '19/Mar', timestamp: '00:01:15', tags: ['Economia', 'Custo_de_Vida'], sentimento: 'Negativo', candidatoMencionado: null, mencoes: 4, favorito: true },
  { id: 2, frase: 'Eu quero ver emprego, não promessa', participante: { nome: 'Lucas', idade: 21, perfil: 'Universitário' }, sessao: 'Jovens Universitários — Capital', sessaoId: '2', data: '17/Mar', timestamp: '00:04:22', tags: ['Emprego', 'Cobrança'], sentimento: 'Negativo', candidatoMencionado: null, mencoes: 3, favorito: true },
  { id: 3, frase: 'Ninguém fala da gente que mora longe', participante: { nome: 'José', idade: 45, perfil: 'Interior, Autônomo' }, sessao: 'Donas de Casa — Interior', sessaoId: '5', data: '10/Mar', timestamp: '00:08:40', tags: ['Abandono', 'Interior'], sentimento: 'Negativo', candidatoMencionado: null, mencoes: 3, favorito: true },
  { id: 4, frase: 'O Gabriel parece que entende a gente jovem', participante: { nome: 'Ana', idade: 19, perfil: 'Capital, Estudante' }, sessao: 'Jovens Universitários — Capital', sessaoId: '2', data: '17/Mar', timestamp: '00:12:05', tags: ['Elogio_Gabriel', 'Juventude'], sentimento: 'Positivo', candidatoMencionado: 'Gabriel', mencoes: 2, favorito: true },
  { id: 5, frase: 'O Zucco é o único que fala de segurança de verdade', participante: { nome: 'Paulo', idade: 55, perfil: 'Evangélico, Periferia' }, sessao: 'Evangélicos — Periferia', sessaoId: '3', data: '15/Mar', timestamp: '00:15:33', tags: ['Elogio_Adversário', 'Segurança'], sentimento: 'Positivo', candidatoMencionado: 'Zucco', mencoes: 2, favorito: false },
  { id: 6, frase: 'A Brizola tem o nome mas não tem o plano', participante: { nome: 'Dona Lúcia', idade: 61, perfil: 'Classe C, Aposentada' }, sessao: 'Mulheres Indecisas — Classe C', sessaoId: '1', data: '19/Mar', timestamp: '00:07:55', tags: ['Ataque_Adversário'], sentimento: 'Negativo', candidatoMencionado: 'Juliana', mencoes: 2, favorito: false },
  { id: 7, frase: 'Eu tenho medo de votar errado e me arrepender', participante: { nome: 'Cláudia', idade: 38, perfil: 'Indecisa' }, sessao: 'Mulheres Indecisas — Classe C', sessaoId: '1', data: '19/Mar', timestamp: '00:03:22', tags: ['Medo'], sentimento: 'Negativo', candidatoMencionado: null, mencoes: 3, favorito: false },
  { id: 8, frase: 'Ele fala a nossa língua, pelo menos', participante: { nome: 'Sandra', idade: 44, perfil: 'Lulista, Classe C' }, sessao: 'Mulheres Indecisas — Classe C', sessaoId: '1', data: '19/Mar', timestamp: '00:06:30', tags: ['Elogio_Gabriel'], sentimento: 'Positivo', candidatoMencionado: 'Gabriel', mencoes: 1, favorito: false },
  { id: 9, frase: 'O Gabriel é inexperiente. Parece que não sabe o que está fazendo', participante: { nome: 'Roberto', idade: 48, perfil: 'Classe B, Zona Sul' }, sessao: 'Homens Classe B — Zona Sul', sessaoId: '4', data: '13/Mar', timestamp: '00:02:30', tags: ['Ataque_Adversário', 'Inexperiência'], sentimento: 'Negativo', candidatoMencionado: 'Gabriel', mencoes: 3, favorito: false },
  { id: 10, frase: 'Família e valores. O Zucco é o único que fala disso', participante: { nome: 'Paulo', idade: 55, perfil: 'Evangélico' }, sessao: 'Evangélicos — Periferia', sessaoId: '3', data: '15/Mar', timestamp: '00:02:15', tags: ['Família', 'Valores', 'Elogio_Adversário'], sentimento: 'Positivo', candidatoMencionado: 'Zucco', mencoes: 2, favorito: false },
  { id: 11, frase: 'O hospital mais perto é a 80km. Isso é abandono', participante: { nome: 'Dona Lúcia', idade: 67, perfil: 'Interior, Aposentada' }, sessao: 'Donas de Casa — Interior', sessaoId: '5', data: '10/Mar', timestamp: '00:01:45', tags: ['Saúde', 'Abandono'], sentimento: 'Negativo', candidatoMencionado: null, mencoes: 2, favorito: false },
  { id: 12, frase: 'Tecnologia e inovação é o que o RS precisa', participante: { nome: 'Pedro', idade: 22, perfil: 'Universitário' }, sessao: 'Jovens Universitários — Capital', sessaoId: '2', data: '17/Mar', timestamp: '00:04:10', tags: ['Futuro', 'Emprego'], sentimento: 'Positivo', candidatoMencionado: null, mencoes: 1, favorito: false },
  { id: 13, frase: 'Eu tenho medo de mudar. Melhor o ruim conhecido', participante: { nome: 'Marta', idade: 50, perfil: 'Evangélica, Periferia' }, sessao: 'Evangélicos — Periferia', sessaoId: '3', data: '15/Mar', timestamp: '00:03:40', tags: ['Medo', 'Família'], sentimento: 'Negativo', candidatoMencionado: null, mencoes: 2, favorito: false },
  { id: 14, frase: 'O Gabriel falou sobre Bolsa Família no vídeo. Isso me chamou atenção', participante: { nome: 'Sandra', idade: 44, perfil: 'Lulista, Classe C' }, sessao: 'Mulheres Indecisas — Classe C', sessaoId: '1', data: '19/Mar', timestamp: '00:12:30', tags: ['Elogio_Gabriel', 'Economia'], sentimento: 'Positivo', candidatoMencionado: 'Gabriel', mencoes: 1, favorito: false },
  { id: 15, frase: 'A estrada tá destruída. Ninguém lembra da gente', participante: { nome: 'José', idade: 45, perfil: 'Interior' }, sessao: 'Donas de Casa — Interior', sessaoId: '5', data: '10/Mar', timestamp: '00:03:00', tags: ['Abandono', 'Interior'], sentimento: 'Negativo', candidatoMencionado: null, mencoes: 5, favorito: false }
];

// ===================== MAPA DE SENTIMENTOS =====================

export type SentimentoNivel = 'muito_positivo' | 'positivo' | 'neutro' | 'negativo' | 'muito_negativo' | 'nao_citado';

export const SENTIMENTO_CORES: Record<SentimentoNivel, string> = {
  muito_positivo: 'rgba(46,125,50,0.35)',
  positivo: 'rgba(102,187,106,0.25)',
  neutro: 'rgba(255,235,59,0.2)',
  negativo: 'rgba(239,83,80,0.2)',
  muito_negativo: 'rgba(198,40,40,0.3)',
  nao_citado: 'rgba(0,0,0,0.04)'
};

export const SENTIMENTO_LABELS: Record<SentimentoNivel, string> = {
  muito_positivo: 'Muito positivo', positivo: 'Positivo', neutro: 'Neutro',
  negativo: 'Negativo', muito_negativo: 'Muito negativo', nao_citado: '—'
};

export const TEMAS_SENTIMENTO = ['Economia', 'Segurança', 'Saúde', 'Educação', 'Emprego', 'Família', 'Gabriel', 'Juliana', 'Zucco', 'Edegar'] as const;

export interface MatrizSentimentoRow {
  sessao: string;
  sessaoId: string;
  data: string;
  valores: Record<string, SentimentoNivel>;
}

export const MATRIZ_SENTIMENTO: MatrizSentimentoRow[] = [
  { sessao: 'Mulheres Classe C', sessaoId: '1', data: '19/Mar', valores: { Economia: 'muito_negativo', Segurança: 'neutro', Saúde: 'negativo', Educação: 'negativo', Emprego: 'neutro', Família: 'neutro', Gabriel: 'neutro', Juliana: 'negativo', Zucco: 'neutro', Edegar: 'nao_citado' } },
  { sessao: 'Jovens Capital', sessaoId: '2', data: '17/Mar', valores: { Economia: 'neutro', Segurança: 'nao_citado', Saúde: 'nao_citado', Educação: 'positivo', Emprego: 'muito_positivo', Família: 'nao_citado', Gabriel: 'positivo', Juliana: 'negativo', Zucco: 'nao_citado', Edegar: 'nao_citado' } },
  { sessao: 'Evangélicos Periferia', sessaoId: '3', data: '15/Mar', valores: { Economia: 'neutro', Segurança: 'positivo', Saúde: 'neutro', Educação: 'neutro', Emprego: 'neutro', Família: 'positivo', Gabriel: 'negativo', Juliana: 'neutro', Zucco: 'positivo', Edegar: 'neutro' } },
  { sessao: 'Homens Classe B', sessaoId: '4', data: '13/Mar', valores: { Economia: 'negativo', Segurança: 'negativo', Saúde: 'neutro', Educação: 'nao_citado', Emprego: 'neutro', Família: 'nao_citado', Gabriel: 'neutro', Juliana: 'neutro', Zucco: 'neutro', Edegar: 'nao_citado' } },
  { sessao: 'Donas de Casa Interior', sessaoId: '5', data: '10/Mar', valores: { Economia: 'muito_negativo', Segurança: 'neutro', Saúde: 'muito_negativo', Educação: 'neutro', Emprego: 'nao_citado', Família: 'nao_citado', Gabriel: 'neutro', Juliana: 'nao_citado', Zucco: 'nao_citado', Edegar: 'nao_citado' } }
];

export const RADAR_SENTIMENTO = {
  temas: ['Economia', 'Segurança', 'Saúde', 'Educação', 'Emprego', 'Família', 'Valores'],
  negativo: [9, 5, 7, 4, 3, 3, 4],
  positivo: [2, 4, 1, 3, 8, 5, 5]
};

export const SENTIMENTO_POR_CANDIDATO = [
  { candidato: 'Gabriel Souza', positivo: 35, neutro: 30, negativo: 35 },
  { candidato: 'Juliana Brizola', positivo: 10, neutro: 25, negativo: 65 },
  { candidato: 'Zucco', positivo: 30, neutro: 40, negativo: 30 },
  { candidato: 'Edegar Pretto', positivo: 5, neutro: 45, negativo: 50 }
];

export const EVOLUCAO_SENTIMENTO = [
  { data: '10/Mar', sessao: 'Donas Casa Interior', score: -7 },
  { data: '13/Mar', sessao: 'Homens Classe B', score: -3 },
  { data: '15/Mar', sessao: 'Evangélicos', score: 0 },
  { data: '17/Mar', sessao: 'Jovens Capital', score: 6 },
  { data: '19/Mar', sessao: 'Mulheres Classe C', score: -6 }
];

export const EXPRESSOES_POR_EMOCAO = {
  medo: [
    { frase: 'ninguém lembra da gente', mencoes: 5 },
    { frase: 'geladeira vazia', mencoes: 4 },
    { frase: 'medo de votar errado', mencoes: 3 },
    { frase: 'Gabriel inexperiente', mencoes: 3 }
  ],
  esperanca: [
    { frase: 'entende a gente jovem', mencoes: 2 },
    { frase: 'tecnologia e inovação', mencoes: 2 },
    { frase: 'fala a nossa língua', mencoes: 1 }
  ],
  duvida: [
    { frase: 'medo de mudar', mencoes: 4 },
    { frase: 'voto no menos pior', mencoes: 2 },
    { frase: 'Brizola tem o nome mas não o plano', mencoes: 2 }
  ]
};

export const DIAGNOSTICO_SENTIMENTO = [
  { tipo: 'critico' as const, texto: 'ALERTA: Economia é o tema mais tóxico da campanha — sentimento negativo em 4 de 5 sessões. Recomendação: preparar resposta empática para o debate.' },
  { tipo: 'critico' as const, texto: 'ALERTA: Gabriel Souza tem percepção polarizada — amado pelos jovens, questionado pelas mulheres e rejeitado pelos evangélicos.' },
  { tipo: 'positivo' as const, texto: 'OPORTUNIDADE: Emprego é o único tema com sentimento majoritariamente positivo. Recomendação: reforçar propostas de emprego na mídia.' },
  { tipo: 'atencao' as const, texto: 'ATENÇÃO: Zucco tem sentimento positivo estável em Segurança — risco de consolidar nicho.' },
  { tipo: 'positivo' as const, texto: 'OPORTUNIDADE: A expressão "geladeira vazia" aparece em múltiplos perfis — vocabulário universal que pode ser usado como mote de campanha.' }
];

// ===================== ALERTAS E MUDANÇAS DE HUMOR =====================

export interface AlertaItem {
  id: number;
  severidade: 'critico' | 'atencao' | 'positivo';
  titulo: string;
  descricao: string;
  acaoSugerida: string;
  tags: string[];
  sparkline?: number[];
  status: 'ativo' | 'monitoramento' | 'resolvido';
  criadoEm: string;
  tempoAtras: string;
}

export const ALERTAS_ATIVOS: AlertaItem[] = [
  { id: 1, severidade: 'critico', titulo: 'Rejeição em alta entre Evangélicos', descricao: 'Rejeição de Gabriel subiu de 34% para 38% entre Evangélicos nos últimos 3 dias, ultrapassando a margem de erro em 2 rodadas consecutivas.', acaoSugerida: 'Revisar posicionamento sobre temas de família e valores', tags: ['Evangélicos', 'Rejeição', 'Valores'], sparkline: [34, 35, 36, 38], status: 'ativo', criadoEm: '20/Mar 05:32', tempoAtras: 'Há 3 horas' },
  { id: 2, severidade: 'critico', titulo: 'Tema "Gabriel inexperiente" ganhando tração', descricao: 'O tema apareceu espontaneamente em 2 grupos focais seguidos (Homens Classe B e Mulheres Classe C) — possível ataque coordenado de Juliana Brizola.', acaoSugerida: 'Preparar contra-narrativa com realizações e histórico', tags: ['Ataque', 'Inexperiência', 'Juliana Brizola'], status: 'ativo', criadoEm: '19/Mar 14:20', tempoAtras: 'Há 18 horas' },
  { id: 3, severidade: 'atencao', titulo: 'Zucco consolidando percepção de segurança', descricao: '68% dos evangélicos citam Zucco como melhor candidato no tema segurança pública. Risco de consolidar nicho.', acaoSugerida: 'Incluir proposta de segurança na próxima inserção de TV', tags: ['Zucco', 'Segurança', 'Evangélicos'], sparkline: [55, 58, 62, 65, 68], status: 'monitoramento', criadoEm: '18/Mar 09:15', tempoAtras: 'Há 2 dias' },
  { id: 4, severidade: 'positivo', titulo: 'Máxima histórica com Jovens 16-24', descricao: 'Gabriel atingiu 58% de intenção de voto entre Jovens 16-24 após viralização do vídeo no TikTok. Crescimento de +6.1pp em 5 dias.', acaoSugerida: 'Manter frequência de conteúdo para redes sociais', tags: ['Jovens', 'TikTok', 'Consolidar'], sparkline: [48, 50, 52, 55, 58], status: 'ativo', criadoEm: '18/Mar 11:00', tempoAtras: 'Há 2 dias' },
  { id: 5, severidade: 'positivo', titulo: 'Vocabulário-chave: "geladeira vazia"', descricao: 'Frase identificada em 4 menções em sessões diferentes. Potencial como mote de campanha — vocabulário universal entre Classe C e D.', acaoSugerida: 'Recomendar uso no próximo debate e peças de TV', tags: ['Vocabulário', 'Classe C', 'Economia'], status: 'ativo', criadoEm: '17/Mar 16:45', tempoAtras: 'Há 3 dias' }
];

export const TIMELINE_HUMOR = [
  { data: '20/Mar 05:32', texto: 'Rejeição Evangélicos ultrapassou 38%', tipo: 'critico' as const },
  { data: '19/Mar 14:20', texto: 'Tema "inexperiente" detectado em 2ª quali seguida', tipo: 'critico' as const },
  { data: '18/Mar 11:00', texto: 'Jovens 16-24 atingiram 58% — nova máxima', tipo: 'positivo' as const },
  { data: '18/Mar 09:15', texto: 'Zucco sobe em percepção de segurança: 68%', tipo: 'atencao' as const },
  { data: '17/Mar 16:45', texto: 'Expressão "geladeira vazia" identificada como padrão', tipo: 'positivo' as const },
  { data: '17/Mar 10:00', texto: 'Viral TikTok Gabriel — monitorando impacto', tipo: 'atencao' as const },
  { data: '15/Mar 20:30', texto: 'Evangélicos: sessão quali com sentimento dividido', tipo: 'atencao' as const },
  { data: '14/Mar 08:00', texto: 'Ataque de Juliana Brizola sobre tema família', tipo: 'critico' as const },
  { data: '11/Mar 07:00', texto: 'Início do Horário Eleitoral — impacto positivo', tipo: 'positivo' as const },
  { data: '05/Mar 22:00', texto: 'Pós-debate: Gabriel subiu 3pp no tracking', tipo: 'positivo' as const }
];

export const HUMOR_POR_SEGMENTO = [
  { segmento: 'Mulheres 25-34', humor: 'favoravel' as const, tendencia: 'melhorando' as const, variacao: '+3.2pp em 7 dias' },
  { segmento: 'Homens 35-49', humor: 'neutro' as const, tendencia: 'piorando' as const, variacao: '-1.8pp em 7 dias' },
  { segmento: 'Evangélicos', humor: 'desfavoravel' as const, tendencia: 'piorando' as const, variacao: '-4.1pp em 7 dias' },
  { segmento: 'Classe C', humor: 'favoravel' as const, tendencia: 'estavel' as const, variacao: '+0.5pp em 7 dias' },
  { segmento: 'Jovens 16-24', humor: 'muito_favoravel' as const, tendencia: 'melhorando' as const, variacao: '+5.7pp em 7 dias' },
  { segmento: 'Interior Norte', humor: 'neutro' as const, tendencia: 'piorando' as const, variacao: '-2.3pp em 7 dias' },
  { segmento: 'Classe A/B', humor: 'neutro' as const, tendencia: 'piorando' as const, variacao: '-0.9pp em 7 dias' },
  { segmento: 'Mulheres 50+', humor: 'favoravel' as const, tendencia: 'melhorando' as const, variacao: '+1.4pp em 7 dias' }
];

export const REGRAS_ALERTA = [
  { id: 1, regra: 'Rejeição por segmento', condicao: 'Variação acima da margem de erro', limiar: '2 rodadas consecutivas', ativo: true },
  { id: 2, regra: 'Tema espontâneo em quali', condicao: 'Mesmo tema em 2+ sessões', limiar: '2 sessões', ativo: true },
  { id: 3, regra: 'Queda de intenção de voto', condicao: 'Queda ≥ 3pp em qualquer segmento', limiar: '48 horas', ativo: true },
  { id: 4, regra: 'Consolidação adversário', condicao: 'Adversário sobe ≥ 5pp em tema', limiar: '3 rodadas', ativo: true },
  { id: 5, regra: 'Expressão viral', condicao: 'Mesma frase em 3+ participantes', limiar: 'Qualquer sessão', ativo: true }
];

// ===================== SÍNTESE SEMANAL =====================

export const SINTESE_SEMANAS = [
  { value: 's11', label: 'Semana 11 (14-20/Mar)' },
  { value: 's10', label: 'Semana 10 (07-13/Mar)' },
  { value: 's9', label: 'Semana 9 (01-06/Mar)' }
];

export const SINTESE_RESUMO =
  'Semana positiva no geral. Gabriel subiu de 44% para 47% na intenção de voto, consolidando liderança com 26pp de vantagem sobre Juliana Brizola. A viralização do TikTok no dia 17/Mar trouxe ganho expressivo entre Jovens 16-24 (+6.1pp). Porém, dois pontos exigem atenção urgente: a rejeição entre Evangélicos subiu para 38% e o tema "Gabriel inexperiente" está ganhando tração nas qualis. A expressão "geladeira vazia" foi identificada como vocabulário-chave e deve ser incorporada ao discurso.';

export const SINTESE_MELHOROU = [
  'Intenção de voto geral: 44% → 47% (+3pp)',
  'Jovens 16-24: 52% → 58% (+6.1pp) — impulsionado pelo TikTok',
  'Mulheres 25-34: 49% → 52% (+3.2pp)',
  'Mulheres 50+: 46% → 48% (+1.4pp)',
  'Expressão "geladeira vazia" identificada como mote potencial'
];

export const SINTESE_PIOROU = [
  'Rejeição Evangélicos: 34% → 38% (+4.1pp) — CRÍTICO',
  'Tema "inexperiente" surgiu em 2 qualis seguidas',
  'Interior Norte: 41% → 39% (-2.3pp)',
  'Homens 35-49: 43% → 41% (-1.8pp)',
  'Zucco consolidando nicho em Segurança (68% entre evangélicos)'
];

export const SINTESE_VOZES = [
  { frase: 'A geladeira tá vazia e o gás tá caro demais', autor: 'Maria, 32, Classe C', mencoes: 4 },
  { frase: 'Eu tenho medo de votar errado e me arrepender', autor: 'Cláudia, 38, Indecisa', mencoes: 3 },
  { frase: 'O Gabriel parece novo demais. Será que dá conta?', autor: 'Maria, 32, Classe C', mencoes: 3 },
  { frase: 'Ninguém fala da gente que mora longe', autor: 'José, 45, Interior', mencoes: 3 },
  { frase: 'Eu quero ver emprego, não promessa', autor: 'Lucas, 21, Universitário', mencoes: 3 }
];

export const SINTESE_RECOMENDACOES = [
  { id: 1, severidade: 'critico' as const, label: 'URGENTE', texto: 'Preparar contra-narrativa para tema "inexperiente" — gravar vídeo com realizações' },
  { id: 2, severidade: 'critico' as const, label: 'URGENTE', texto: 'Agendar agenda com lideranças evangélicas — reverter rejeição' },
  { id: 3, severidade: 'atencao' as const, label: 'IMPORTANTE', texto: 'Incorporar "geladeira vazia" no discurso do próximo debate' },
  { id: 4, severidade: 'atencao' as const, label: 'IMPORTANTE', texto: 'Manter produção de conteúdo para TikTok — consolidar jovens' },
  { id: 5, severidade: 'positivo' as const, label: 'OPORTUNIDADE', texto: 'Agendar visita ao Interior Norte — segmento em queda' }
];

export const SINTESE_CHEATSHEET = [
  {
    pergunta: 'O senhor não é muito jovem e inexperiente para governar?',
    resposta: 'A experiência que importa é a de entender o que o povo sente. Eu sei que a geladeira está vazia e o gás está caro. Minha experiência é a de quem ouviu mais de 500 gaúchos nas ruas este mês.'
  },
  {
    pergunta: 'Os evangélicos dizem que não confiam no senhor. O que responde?',
    resposta: 'Respeito profundamente a comunidade evangélica. Meu compromisso com a família e os valores é inegociável. Vou apresentar meu plano de segurança nas próximas semanas.'
  },
  {
    pergunta: 'O que o senhor faz de diferente da Juliana Brizola?',
    resposta: 'Com todo respeito ao legado do nome, o Rio Grande precisa de futuro, não de sobrenome. Eu tenho um plano concreto com 47 propostas.'
  }
];

export const SINTESE_TRACKING_SEMANAL = {
  datas: ['14/Mar', '15/Mar', '16/Mar', '17/Mar', '18/Mar', '19/Mar', '20/Mar'],
  gabriel: [43, 45, 44, 44, 45, 46, 47],
  juliana: [22, 21, 21, 22, 21, 21, 21],
  zucco: [17, 17, 17, 17, 17, 16, 16],
  edegar: [10, 10, 10, 10, 10, 10, 10],
  eventos: [
    { data: '14/Mar', label: 'Ataque Brizola' },
    { data: '17/Mar', label: 'TikTok Viral' }
  ]
};

// ===================== CAUSA E EFEITO =====================

export const CAUSA_EFEITO_SEGMENTOS = [
  'Evangélicos',
  'Jovens 16-24',
  'Interior Norte',
  'Mulheres 25-34',
  'Classe C',
  'Homens 35-49',
  'Classe A/B',
  'Mulheres 50+'
];

export const CAUSA_EFEITO_PERIODOS = [
  { value: '7d', label: 'Última semana' },
  { value: '15d', label: 'Últimos 15 dias' },
  { value: '30d', label: 'Último mês' }
];

export interface CausaEfeitoFrase {
  ordem: number;
  frase: string;
  autor: string;
  sessao: string;
  sessaoId: string;
  mencoes: number;
  tags: string[];
}

export interface CausaEfeitoNarrativa {
  tema: string;
  status: 'ganhando_forca' | 'precificado' | 'consolidando' | 'a_favor';
  statusLabel: string;
  tracacao: string;
  fonte: string;
}

export interface CausaEfeitoAcao {
  id: number;
  severidade: 'critico' | 'atencao' | 'positivo';
  label: string;
  texto: string;
}

export interface CausaEfeitoTema {
  tema: string;
  mencoes: number;
}

export interface CausaEfeitoSegmentoData {
  segmento: string;
  diagnosticoTitulo: string;
  diagnosticoSubtitulo: string;
  intencao: number;
  intencaoVar: number;
  rejeicao: number;
  rejeicaoVar: number;
  positivo: boolean;
  textoQuanti: string;
  chartIntencao: number[];
  chartRejeicao: number[];
  chartDatas: string[];
  chartEvento?: { data: string; label: string };
  frases: CausaEfeitoFrase[];
  diagnosticoIntegrado: string;
  temas: CausaEfeitoTema[];
  narrativas: CausaEfeitoNarrativa[];
  acoes: CausaEfeitoAcao[];
}

export const CAUSA_EFEITO_DATA: Record<string, CausaEfeitoSegmentoData> = {
  'Evangélicos': {
    segmento: 'Evangélicos',
    diagnosticoTitulo: 'Gabriel caiu 4.1pp com Evangélicos',
    diagnosticoSubtitulo: 'Rejeição subiu de 34% para 38% em 7 dias',
    intencao: 33,
    intencaoVar: -4.1,
    rejeicao: 38,
    rejeicaoVar: 4.1,
    positivo: false,
    textoQuanti: 'Ultrapassou margem de erro em 2 rodadas consecutivas. Classificado como CRÍTICO.',
    chartIntencao: [37, 36, 35, 34, 33, 33, 33],
    chartRejeicao: [32, 33, 34, 35, 36, 37, 38],
    chartDatas: ['08/Mar', '10/Mar', '12/Mar', '14/Mar', '16/Mar', '18/Mar', '20/Mar'],
    chartEvento: { data: '14/Mar', label: 'Ataque Brizola sobre família' },
    frases: [
      { ordem: 1, frase: 'Família e valores. O Zucco é o único que fala disso', autor: 'Paulo, 55, Evangélico', sessao: 'Evangélicos Periferia 15/Mar', sessaoId: '3', mencoes: 2, tags: ['Família', 'Valores', 'Elogio Adversário'] },
      { ordem: 2, frase: 'Eu tenho medo de mudar. Melhor o ruim conhecido', autor: 'Marta, 50, Evangélica', sessao: 'Evangélicos Periferia 15/Mar', sessaoId: '3', mencoes: 2, tags: ['Medo', 'Indecisão'] },
      { ordem: 3, frase: 'O Gabriel não fala da gente que tem fé', autor: 'Pedro, 48, Evangélico', sessao: 'Evangélicos Periferia 15/Mar', sessaoId: '3', mencoes: 1, tags: ['Rejeição', 'Valores'] },
      { ordem: 4, frase: 'Segurança é o mais importante. O Zucco entende isso', autor: 'Paulo, 55, Evangélico', sessao: 'Evangélicos Periferia 15/Mar', sessaoId: '3', mencoes: 2, tags: ['Segurança', 'Elogio Adversário'] },
      { ordem: 5, frase: 'A Brizola falou que o Gabriel não respeita a família', autor: 'Marta, 50, Evangélica', sessao: 'Evangélicos Periferia 15/Mar', sessaoId: '3', mencoes: 1, tags: ['Ataque', 'Família'] },
      { ordem: 6, frase: 'Eu queria votar no Gabriel mas tenho medo', autor: 'Ana Rosa, 42, Evangélica', sessao: 'Evangélicos Periferia 15/Mar', sessaoId: '3', mencoes: 1, tags: ['Medo', 'Indecisão', 'Gabriel'] }
    ],
    diagnosticoIntegrado: 'A queda de 4.1pp entre Evangélicos tem causa identificável nas qualis: o ataque de Juliana Brizola sobre o tema "família" no dia 14/Mar repercutiu fortemente neste segmento. Dos 9 participantes evangélicos ouvidos em 15/Mar, 6 mencionaram "família e valores" como critério principal de voto. Zucco é visto como o candidato que "fala a língua deles" em segurança e valores. O medo de mudar é um bloqueio emocional — não racional. A recomendação é agir no campo emocional: presença em igrejas, depoimento de lideranças evangélicas que apoiam Gabriel, e proposta concreta de segurança.',
    temas: [
      { tema: 'Família/Valores', mencoes: 8 },
      { tema: 'Segurança', mencoes: 6 },
      { tema: 'Medo de Mudar', mencoes: 4 },
      { tema: 'Fé/Religião', mencoes: 3 },
      { tema: 'Economia', mencoes: 2 }
    ],
    narrativas: [
      { tema: '"Gabriel inexperiente"', status: 'ganhando_forca', statusLabel: 'Ganhando força', tracacao: '3 menções em 2 qualis', fonte: 'Ataque Juliana' },
      { tema: '"Gabriel não respeita família"', status: 'ganhando_forca', statusLabel: 'Ganhando força', tracacao: '2 menções em 1 quali', fonte: 'Ataque Juliana' },
      { tema: '"Escândalo Obra X" (contra Zucco)', status: 'precificado', statusLabel: 'Precificado', tracacao: '0 menções espontâneas', fonte: '—' },
      { tema: '"Zucco = segurança"', status: 'consolidando', statusLabel: 'Consolidando', tracacao: '4 menções em 2 qualis', fonte: 'Orgânico' },
      { tema: '"Geladeira vazia"', status: 'a_favor', statusLabel: 'A nosso favor', tracacao: '4 menções em 3 qualis', fonte: 'Orgânico' }
    ],
    acoes: [
      { id: 1, severidade: 'critico', label: 'URGENTE', texto: 'Agendar visita a 3 igrejas evangélicas na Região Metropolitana esta semana' },
      { id: 2, severidade: 'critico', label: 'URGENTE', texto: 'Gravar depoimento de Pastor apoiando Gabriel — publicar nas redes' },
      { id: 3, severidade: 'atencao', label: 'IMPORTANTE', texto: 'Incluir proposta de segurança pública no próximo material de campanha' },
      { id: 4, severidade: 'atencao', label: 'IMPORTANTE', texto: 'Preparar resposta para ataque "não respeita família" — usar no debate' },
      { id: 5, severidade: 'positivo', label: 'MONITORAR', texto: 'Acompanhar menções ao tema família nas próximas 2 rodadas de tracking' }
    ]
  },
  'Jovens 16-24': {
    segmento: 'Jovens 16-24',
    diagnosticoTitulo: 'Gabriel consolidou +6.1pp com Jovens 16-24',
    diagnosticoSubtitulo: 'Intenção subiu de 52% para 58% em 5 dias',
    intencao: 58,
    intencaoVar: 6.1,
    rejeicao: 14,
    rejeicaoVar: -2.0,
    positivo: true,
    textoQuanti: 'Máxima histórica no segmento. Impulsionado pela viralização no TikTok em 17/Mar.',
    chartIntencao: [48, 50, 52, 53, 55, 57, 58],
    chartRejeicao: [18, 17, 16, 15, 15, 14, 14],
    chartDatas: ['08/Mar', '10/Mar', '12/Mar', '14/Mar', '16/Mar', '18/Mar', '20/Mar'],
    chartEvento: { data: '14/Mar', label: 'Viral TikTok Gabriel' },
    frases: [
      { ordem: 1, frase: 'O Gabriel parece que entende a gente jovem', autor: 'Ana, 19, Capital', sessao: 'Jovens Universitários 17/Mar', sessaoId: '2', mencoes: 2, tags: ['Identificação', 'Jovens'] },
      { ordem: 2, frase: 'Eu quero ver emprego, não promessa', autor: 'Lucas, 21, Universitário', sessao: 'Jovens Universitários 17/Mar', sessaoId: '2', mencoes: 3, tags: ['Emprego', 'Cobrança'] },
      { ordem: 3, frase: 'Vi o vídeo dele no TikTok e achei muito real', autor: 'Bruna, 20, Capital', sessao: 'Jovens Universitários 17/Mar', sessaoId: '2', mencoes: 2, tags: ['TikTok', 'Autenticidade'] },
      { ordem: 4, frase: 'Os outros candidatos parecem de outro século', autor: 'Felipe, 22, Universitário', sessao: 'Jovens Universitários 17/Mar', sessaoId: '2', mencoes: 1, tags: ['Rejeição Adversários', 'Modernidade'] },
      { ordem: 5, frase: 'Tecnologia e inovação é o que importa pro futuro', autor: 'Ana, 19, Capital', sessao: 'Jovens Universitários 17/Mar', sessaoId: '2', mencoes: 2, tags: ['Tecnologia', 'Futuro'] },
      { ordem: 6, frase: 'Ele fala a nossa língua nas redes', autor: 'Lucas, 21, Universitário', sessao: 'Jovens Universitários 17/Mar', sessaoId: '2', mencoes: 1, tags: ['Redes Sociais', 'Linguagem'] }
    ],
    diagnosticoIntegrado: 'O salto de 6.1pp entre Jovens 16-24 está diretamente ligado à viralização do vídeo de Gabriel no TikTok em 17/Mar. Nas qualis realizadas após o viral, os jovens citam "autenticidade" e "linguagem acessível" como diferenciais. A rejeição caiu para 14% — mínima histórica. O risco é que este ganho seja volátil se não houver continuidade de conteúdo. A recomendação é manter frequência alta de publicações no TikTok e Instagram, e usar a linguagem das redes no material de TV.',
    temas: [
      { tema: 'Emprego/Trabalho', mencoes: 7 },
      { tema: 'Tecnologia/Futuro', mencoes: 5 },
      { tema: 'Redes Sociais', mencoes: 4 },
      { tema: 'Educação', mencoes: 3 },
      { tema: 'Autenticidade', mencoes: 3 }
    ],
    narrativas: [
      { tema: '"Gabriel é jovem e conectado"', status: 'a_favor', statusLabel: 'A nosso favor', tracacao: '5 menções em 2 qualis', fonte: 'Orgânico' },
      { tema: '"TikTok do Gabriel"', status: 'a_favor', statusLabel: 'A nosso favor', tracacao: '4 menções espontâneas', fonte: 'Viral' },
      { tema: '"Outros candidatos são ultrapassados"', status: 'consolidando', statusLabel: 'Consolidando', tracacao: '2 menções em 1 quali', fonte: 'Orgânico' },
      { tema: '"Falta experiência"', status: 'ganhando_forca', statusLabel: 'Ganhando força', tracacao: '1 menção neste segmento', fonte: 'Ataque Juliana' },
      { tema: '"Emprego para jovens"', status: 'a_favor', statusLabel: 'A nosso favor', tracacao: '3 menções em 2 qualis', fonte: 'Orgânico' }
    ],
    acoes: [
      { id: 1, severidade: 'critico', label: 'URGENTE', texto: 'Manter frequência diária de conteúdo no TikTok e Instagram Reels' },
      { id: 2, severidade: 'atencao', label: 'IMPORTANTE', texto: 'Produzir 3 vídeos curtos com propostas de emprego jovem' },
      { id: 3, severidade: 'atencao', label: 'IMPORTANTE', texto: 'Adaptar linguagem das redes para inserções de TV' },
      { id: 4, severidade: 'positivo', label: 'MONITORAR', texto: 'Acompanhar se o tema "inexperiência" ganha tração neste segmento' },
      { id: 5, severidade: 'positivo', label: 'MONITORAR', texto: 'Verificar se ganho se mantém na próxima rodada de tracking' }
    ]
  },
  'Interior Norte': {
    segmento: 'Interior Norte',
    diagnosticoTitulo: 'Gabriel caiu 2.3pp no Interior Norte',
    diagnosticoSubtitulo: 'Intenção recuou de 41% para 39% em 7 dias',
    intencao: 39,
    intencaoVar: -2.3,
    rejeicao: 31,
    rejeicaoVar: 1.5,
    positivo: false,
    textoQuanti: 'Tendência de queda consistente. Segmento sente-se abandonado pela campanha.',
    chartIntencao: [43, 42, 41, 41, 40, 39, 39],
    chartRejeicao: [28, 29, 29, 30, 30, 31, 31],
    chartDatas: ['08/Mar', '10/Mar', '12/Mar', '14/Mar', '16/Mar', '18/Mar', '20/Mar'],
    frases: [
      { ordem: 1, frase: 'Ninguém fala da gente que mora longe', autor: 'José, 45, Interior', sessao: 'Donas de Casa Interior 10/Mar', sessaoId: '5', mencoes: 3, tags: ['Abandono', 'Interior'] },
      { ordem: 2, frase: 'O hospital tá caindo aos pedaços', autor: 'Dona Maria, 58, Interior', sessao: 'Donas de Casa Interior 10/Mar', sessaoId: '5', mencoes: 2, tags: ['Saúde', 'Infraestrutura'] },
      { ordem: 3, frase: 'Candidato só aparece aqui em época de eleição', autor: 'Seu João, 62, Interior', sessao: 'Donas de Casa Interior 10/Mar', sessaoId: '5', mencoes: 2, tags: ['Desconfiança', 'Presença'] },
      { ordem: 4, frase: 'A estrada tá intransitável quando chove', autor: 'Pedro, 40, Interior', sessao: 'Donas de Casa Interior 10/Mar', sessaoId: '5', mencoes: 1, tags: ['Infraestrutura', 'Estradas'] },
      { ordem: 5, frase: 'Quero saber quem vai cuidar do posto de saúde', autor: 'Dona Maria, 58, Interior', sessao: 'Donas de Casa Interior 10/Mar', sessaoId: '5', mencoes: 2, tags: ['Saúde', 'Cobrança'] },
      { ordem: 6, frase: 'A gente se sente esquecido', autor: 'José, 45, Interior', sessao: 'Donas de Casa Interior 10/Mar', sessaoId: '5', mencoes: 1, tags: ['Abandono', 'Sentimento'] }
    ],
    diagnosticoIntegrado: 'A queda de 2.3pp no Interior Norte reflete um sentimento consistente de abandono. Nas qualis, o tema dominante é "ninguém fala da gente" — os eleitores do interior sentem que a campanha é focada na capital. A rejeição subiu para 31%, puxada por reclamações de infraestrutura (hospital, estradas). Diferente dos Evangélicos, aqui não há ataque adversário — é uma falha de presença. A recomendação é agendar agenda no interior com propostas concretas de saúde e infraestrutura.',
    temas: [
      { tema: 'Abandono/Esquecimento', mencoes: 6 },
      { tema: 'Saúde/Hospital', mencoes: 5 },
      { tema: 'Infraestrutura', mencoes: 4 },
      { tema: 'Presença do Candidato', mencoes: 3 },
      { tema: 'Estradas', mencoes: 2 }
    ],
    narrativas: [
      { tema: '"Interior esquecido"', status: 'ganhando_forca', statusLabel: 'Ganhando força', tracacao: '3 menções em 1 quali', fonte: 'Orgânico' },
      { tema: '"Hospital precário"', status: 'consolidando', statusLabel: 'Consolidando', tracacao: '2 menções espontâneas', fonte: 'Orgânico' },
      { tema: '"Candidato só vem em eleição"', status: 'ganhando_forca', statusLabel: 'Ganhando força', tracacao: '2 menções em 1 quali', fonte: 'Orgânico' },
      { tema: '"Geladeira vazia"', status: 'a_favor', statusLabel: 'A nosso favor', tracacao: '1 menção neste segmento', fonte: 'Orgânico' },
      { tema: '"Estradas intransitáveis"', status: 'consolidando', statusLabel: 'Consolidando', tracacao: '1 menção espontânea', fonte: 'Orgânico' }
    ],
    acoes: [
      { id: 1, severidade: 'critico', label: 'URGENTE', texto: 'Agendar visita ao Interior Norte com pauta de saúde e infraestrutura' },
      { id: 2, severidade: 'critico', label: 'URGENTE', texto: 'Gravar vídeo com proposta concreta para hospitais do interior' },
      { id: 3, severidade: 'atencao', label: 'IMPORTANTE', texto: 'Incluir menções ao interior nos materiais de TV e rádio' },
      { id: 4, severidade: 'atencao', label: 'IMPORTANTE', texto: 'Recrutar lideranças locais para comitê de campanha no interior' },
      { id: 5, severidade: 'positivo', label: 'MONITORAR', texto: 'Verificar impacto da visita na próxima rodada de tracking' }
    ]
  }
};
