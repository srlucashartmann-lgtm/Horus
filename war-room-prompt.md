# ETAPA 5 — WAR ROOM DASHBOARD (Home) com Sistema de Widgets

Leia o arquivo diretrizes-cursor.md primeiro.

Rota: /war-room (página principal após login)

## CONCEITO

O War Room é a HOME do Hórus. Cada usuário monta seu próprio painel arrastando e soltando widgets. O layout é salvo por usuário (no localStorage por enquanto, futuro: banco de dados).

## BIBLIOTECA DE WIDGETS

Instale a biblioteca `react-grid-layout` para o sistema de drag & drop:
```
npm install react-grid-layout
npm install --save-dev @types/react-grid-layout
```

O grid usa 12 colunas. Cada widget tem tamanho mínimo e padrão definido.

## WIDGETS DISPONÍVEIS (catálogo de 14 widgets):

### Categoria: KPIs
1. **kpi-intencao** — Intenção de Voto Gabriel (card KPI com sparkline) — tamanho: 3x2
2. **kpi-rejeicao** — Rejeição Gabriel (card KPI com sparkline) — tamanho: 3x2
3. **kpi-aprovacao** — Aprovação do Governo (card KPI com sparkline) — tamanho: 3x2
4. **kpi-qualis** — Qualis da Semana (card KPI) — tamanho: 3x2

### Categoria: Gráficos
5. **chart-tracking** — Gráfico de Tracking Diário (linha com 4 candidatos + eventos) — tamanho: 8x4
6. **chart-rejeicao-segmento** — Barras de Rejeição por Segmento — tamanho: 6x4
7. **chart-cenario-atual** — Donut do cenário atual (pizza com os 4 candidatos) — tamanho: 4x4
8. **chart-sentimento** — Radar de Sentimento por Tema — tamanho: 4x4

### Categoria: Tabelas e Listas
9. **table-segmentos** — Tabela de Segmentos Eleitorais (voto + rejeição + variação) — tamanho: 6x4
10. **list-alertas** — Alertas Estratégicos (os 5 alertas com severidade) — tamanho: 4x5
11. **list-sessoes** — Últimas Sessões Quali (lista compacta das 5 sessões) — tamanho: 4x4
12. **list-frases** — Vocabulário do Eleitor (top 5 frases) — tamanho: 6x4

### Categoria: Ações e Status
13. **acoes-rapidas** — Ações Rápidas (4 botões: Síntese, Cheat Sheet, Exportar Ads, Nova Quali) — tamanho: 3x3
14. **status-sistema** — Status do Sistema (Deepgram, Tracking, Transcrição) — tamanho: 3x2

### Categoria: Especiais
15. **mapa-risco** — Mapa de Risco por Segmento (8 cards coloridos verde/amarelo/vermelho) — tamanho: 12x3
16. **resumo-semanal** — Resumo Executivo da semana (texto em prosa) — tamanho: 12x2

## IMPLEMENTAÇÃO DO SISTEMA DE WIDGETS

### Header da página War Room:
- Título: "War Room — Gabriel Souza"
- Subtítulo: "Governador do RS · Última atualização há 12 min"
- Badge: "Rodada 18 · 20/Mar"
- Botão "Editar Layout" (ícone de grid/layout) — ativa o modo de edição
- Botão "Exportar PDF"
- Botão "+ Nova Pesquisa"

### Modo Normal (padrão):
- Os widgets são exibidos no layout salvo do usuário
- Não é possível arrastar ou redimensionar
- Cada widget tem um header com título e um botão "⋮" (menu) com opções:
  - "Expandir" (abre o widget em modal fullscreen)
  - "Ir para página" (navega pro módulo correspondente — ex: widget de tracking leva pra /quantitativo/tracking)
  - "Remover" (tira do layout)

### Modo Edição (ao clicar "Editar Layout"):
- Barra de topo muda: fundo azul/indigo com texto "Modo Edição — Arraste para reorganizar"
- Botão "Salvar Layout" (verde) e "Cancelar" (cinza)
- Os widgets ganham borda tracejada e podem ser:
  - Arrastados para outra posição
  - Redimensionados pelos cantos
- Painel lateral direito (drawer) com o catálogo de widgets:
  - Título: "Adicionar Widgets"
  - Lista dos 16 widgets disponíveis agrupados por categoria
  - Cada item mostra: ícone + nome + tamanho padrão
  - Widgets já no layout aparecem com check e opção "Já adicionado"
  - Arrastar do painel para o grid, OU clicar no "+" para adicionar na próxima posição livre

### Layout Padrão (para novos usuários):
Quando o usuário abre pela primeira vez, o layout default é:

```
Linha 1: [kpi-intencao] [kpi-rejeicao] [kpi-aprovacao] [kpi-qualis]        (4 x 3col = 12col)
Linha 2: [chart-tracking (8col)] [list-alertas (4col)]                      (12col)
Linha 3: [table-segmentos (6col)] [list-sessoes (6col)]                     (12col)  
Linha 4: [list-frases (6col)] [acoes-rapidas (3col)] [status-sistema (3col)] (12col)
```

### Persistência:
- Salve o layout no localStorage: chave `horus-war-room-layout-{userId}`
- Formato: array de { widgetId, x, y, w, h }
- No futuro: migrar para banco de dados por usuário
- Botão "Restaurar Layout Padrão" nas configurações

## IMPLEMENTAÇÃO DOS WIDGETS INDIVIDUAIS

Cada widget é um componente React que:
1. É envolvido por um MainCard do Able Pro com header (título + menu ⋮)
2. Busca os dados de src/data/horus.ts
3. Usa componentes do Able Pro internamente
4. Tem tratamento de loading (skeleton) e erro

### Estrutura de arquivos sugerida:
```
src/sections/horus/war-room/
  WarRoomDashboard.tsx        — componente principal com react-grid-layout
  WidgetCatalog.tsx           — drawer lateral com lista de widgets
  WidgetWrapper.tsx           — wrapper que adiciona header/menu a cada widget
  widgets/
    KPIIntencao.tsx           — widget individual
    KPIRejeicao.tsx
    KPIAprovacao.tsx
    KPIQualis.tsx
    ChartTracking.tsx
    ChartRejeicaoSegmento.tsx
    ChartCenarioAtual.tsx
    ChartSentimento.tsx
    TableSegmentos.tsx
    ListAlertas.tsx
    ListSessoes.tsx
    ListFrases.tsx
    AcoesRapidas.tsx
    StatusSistema.tsx
    MapaRisco.tsx
    ResumoSemanal.tsx
```

## CONTEÚDO DE CADA WIDGET

### kpi-intencao:
- Use EcommerceDataCard do Able Pro
- Valor: 47%, Delta: +3pp, Sparkline com dados [36,37,39,41,42,44,43,45,44,46,47]
- Cor: primária/indigo

### kpi-rejeicao:
- Valor: 24%, Delta: +1.2pp (vermelho porque subiu), Sparkline
- Cor: error/vermelho

### kpi-aprovacao:
- Valor: 51%, Delta: +2pp, Sparkline
- Cor: success/verde

### kpi-qualis:
- Valor: 5 sessões, Subtítulo: "3 transcritas · 1 processando"
- Cor: warning/amber

### chart-tracking:
- Gráfico ApexCharts de linha/área — MESMO do módulo Tracking
- Gabriel com área preenchida, outros com linhas
- Marcadores de eventos
- Compacto (sem filtros — é um resumo)

### chart-rejeicao-segmento:
- Gráfico de barras — MESMO do módulo Tracking
- Versão compacta

### chart-cenario-atual:
- Donut — MESMO das Simulações tab "Cenário Atual"
- Gabriel 47%, Juliana 21%, Zucco 16%, Edegar 10%, B/N 6%

### chart-sentimento:
- Radar — MESMO do Mapa de Sentimentos
- Versão compacta

### table-segmentos:
- Tabela — MESMA do módulo Tracking mas compacta (sem scroll, top 8 segmentos)

### list-alertas:
- Lista dos 5 alertas — MESMA da tela de Alertas mas compacta
- Só badge + título + tempo — sem descrição detalhada
- Link "Ver todos →" no rodapé

### list-sessoes:
- Lista das 5 sessões — compacta
- Título + data + badge sentimento + badge status
- Link "Ver acervo →"

### list-frases:
- Top 5 frases — MESMO da Biblioteca de Clipes mas compacto
- Frase + quem + menções
- Link "Ver biblioteca →"

### acoes-rapidas:
- 4 botões: Gerar Síntese, Cheat Sheet, Exportar Ads, Nova Quali
- Cada um com ícone e label

### status-sistema:
- 3 linhas: Deepgram (Online), Tracking (Atualizado), Transcrição (67%)
- Dots coloridos

### mapa-risco:
- 8 cards coloridos — MESMO da tela de Alertas
- Grid 4x2

### resumo-semanal:
- Card com o texto do resumo executivo — MESMO da Síntese Semanal
- Versão compacta (primeiros 3 parágrafos)
- Link "Ler síntese completa →"

## REGRAS:
- Use APENAS componentes do Able Pro + react-grid-layout
- Todos os textos em pt-BR
- Cada widget deve ser autossuficiente (busca próprios dados)
- Os widgets devem ser versões COMPACTAS das mesmas visualizações que já existem nos módulos
- REUTILIZE o código dos módulos já construídos — não reescreva gráficos do zero
- O drag & drop deve ser suave com animação (react-grid-layout já faz isso)
- Responsivo: em telas menores os widgets empilham verticalmente
- O modo edição deve ter visual claramente diferente do modo normal

Implemente agora. Pare quando terminar para eu avaliar.
