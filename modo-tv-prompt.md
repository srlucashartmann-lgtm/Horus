# ETAPA 6 — MODO TV HÓRUS (inspirado no Grafana)

Leia o arquivo diretrizes-cursor.md primeiro.

## CONCEITO

O Modo TV é um painel fullscreen para o monitor do comitê de campanha. Inspirado no Grafana TV/Kiosk mode — fundo escuro, dados densos, visual de "centro de operações". 

Diferente de um dashboard normal, o Modo TV é pensado pra ser visto de longe, em tela grande, sem interação de mouse.

O usuário acessa pelo menu do perfil (clicando na foto/avatar no header, onde já tem "Configurações" e "Sair"). Adicione a opção "Modo TV" neste menu, com ícone de TV/monitor.

## IMPLEMENTAÇÃO

### Acesso:
- No menu do avatar/perfil no header (onde tem Configurações e Sair), adicione "Modo TV" como primeira opção com ícone de monitor/TV
- Ao clicar, abre o overlay fullscreen
- Também pode ser acessado pelo menu ⚙ da War Room (se existir)

### Overlay:
- position: fixed, inset: 0, z-index: 9999
- Background: #07090F (quase preto, como Grafana dark)
- Cursor esconde após 3 segundos sem movimento (cursor: none)
- ESC ou botão fecha o modo TV

---

## LAYOUT DO MODO TV

### Top Bar (height: 48px):
Barra fina no topo com fundo rgba(255,255,255,0.03):
- ESQUERDA: Logo "HÓRUS" em branco (font mono, weight 800, letter-spacing 0.08em) + subtítulo "War Room" em cinza
- CENTRO: Data e hora atual em tempo real (relógio digital, font mono, atualiza a cada segundo) + "Rodada 18"
- DIREITA: 
  - Dot vermelho pulsante + "AO VIVO" em vermelho (font mono 11px)
  - Botão ⚙ (configurar painéis) — abre drawer de configuração
  - Botão ✕ (sair) — fecha o modo TV

### Área Principal — Grid de Painéis Customizáveis:

O usuário escolhe quais painéis mostrar. O grid se adapta automaticamente.

#### CATÁLOGO DE PAINÉIS DISPONÍVEIS (12 opções):

**Números Gigantes:**
1. `tv-intencao` — Intenção de Voto: número gigante "47%" em cor indigo com glow, label "INTENÇÃO DE VOTO" acima, delta "▲ +3pp" abaixo
2. `tv-rejeicao` — Rejeição: "24%" em rosa/vermelho com glow
3. `tv-aprovacao` — Aprovação Gov: "51%" em verde com glow
4. `tv-gap` — Gap vs 2º Lugar: "26pp" em amarelo com glow, subtítulo "vs Juliana Brizola"

**Gráficos:**
5. `tv-tracking-line` — Gráfico de linha do tracking (últimos 20 dias, 4 candidatos) — versão dark theme com linhas brilhantes sobre fundo escuro, estilo Grafana
6. `tv-tracking-area` — Mesmo tracking mas como área empilhada (estilo Grafana stacked)
7. `tv-barras-rejeicao` — Barras horizontais de rejeição por segmento — tema dark
8. `tv-donut-cenario` — Donut do cenário atual — tema dark com cores neon

**Tabelas/Listas:**
9. `tv-segmentos` — Tabela de segmentos compacta (fonte branca em fundo escuro, badges coloridos)
10. `tv-alertas` — Lista de alertas (apenas badge + título, rolagem automática se muitos)
11. `tv-mapa-risco` — Grid de 8 cards de segmento com cor de risco (verde/amarelo/vermelho) — versão dark
12. `tv-adversarios` — Barra horizontal mostrando os 4 candidatos com % (tipo placar eleitoral)

### Layout Padrão (primeira vez):
Grid 2x2:
```
[tv-intencao]   [tv-rejeicao]
[tv-aprovacao]   [tv-gap]
```

Abaixo, fullwidth:
```
[tv-tracking-line]
```

Footer:
```
[tv-adversarios]
```

### Drawer de Configuração (ao clicar ⚙):
Drawer lateral direito com fundo escuro (#0F1117):
- Título: "Configurar Painéis"
- Lista dos 12 painéis com switch toggle ON/OFF
- Drag and drop para reordenar
- Preview do layout: miniatura mostrando como vai ficar
- Select "Layout": 
  - "4 Números" (2x2 só KPIs)
  - "KPIs + Gráfico" (4 KPIs no topo + gráfico embaixo) — PADRÃO
  - "Gráfico Full" (só o tracking em tela toda)
  - "Centro de Operações" (todos os painéis visíveis, grid denso estilo Grafana)
  - "Customizado" (o usuário organiza)
- Select "Auto-refresh": 30s | 1min | 5min | Desligado
- Select "Rotação automática": Liga/Desliga — quando ligado, alterna entre os layouts a cada 30 segundos (como Grafana playlist)
- Botão "Salvar" e "Restaurar Padrão"
- Configuração salva no localStorage

---

## ESTILO VISUAL (Grafana Dark Theme):

### Cores:
- Background: #07090F
- Cards/painéis: #0F1219 com borda 1px solid rgba(255,255,255,0.06)
- Texto principal: #E2E8F0
- Texto secundário: #64748B
- Texto terciário: #334155
- Indigo: #818CF8 (intenção de voto)
- Rosa: #FB7185 (rejeição)
- Verde: #34D399 (aprovação)
- Amarelo: #FBBF24 (gap/warning)
- Vermelho: #EF4444 (crítico)

### Números Gigantes:
- Font: monospace (JetBrains Mono ou similar)
- Size: clamp(64px, 10vw, 140px)
- Weight: 800
- Text-shadow: 0 0 60px {cor}30 (glow sutil)
- Label acima: 11px, uppercase, letter-spacing 0.15em, cor #475569
- Delta abaixo: 16px, dentro de pill com background {cor}14, border 1px solid {cor}25

### Gráficos (tema dark Grafana):
- Background do gráfico: transparente
- Grid lines: rgba(255,255,255,0.04)
- Axis labels: #475569
- Linha do Gabriel: #818CF8, strokeWidth 3, com glow (filter: drop-shadow)
- Linha Juliana: #FB7185, strokeWidth 1.5
- Linha Zucco: #F59E0B, strokeWidth 1.5
- Linha Edegar: #64748B, strokeWidth 1.5
- Tooltip: fundo #1A1F2E, borda rgba(255,255,255,0.1)
- Annotations de eventos: linhas verticais amarelas tracejadas com label

### Tabela dark:
- Header: background #111827, texto uppercase #64748B
- Linhas: alternando #0F1219 e #111827
- Texto valores: #E2E8F0
- Badges: mesmo estilo mas com cores sobre fundo escuro
- Hover: background rgba(255,255,255,0.03)

### Cards de Risco (dark):
- Verde: background #064E3B com borda #10B981
- Amarelo: background #78350F com borda #F59E0B
- Vermelho: background #7F1D1D com borda #EF4444

### Animações:
- Dot "AO VIVO": pulsa infinitamente (opacity 1 → 0.3 → 1)
- Números gigantes: glow pulsa sutilmente (text-shadow oscila)
- Ao abrir: fade in 0.5s nos painéis com delay escalonado
- Transição entre layouts de rotação: crossfade 0.8s

---

## PAINEL tv-adversarios (footer):
Barra horizontal com os adversários, estilo placar eleitoral:
```
Gabriel Souza 47%  |  Juliana Brizola 21%  |  Zucco 16%  |  Edegar Pretto 10%  |  B/N 6%
```
- Nome em branco, % em cor do candidato, font mono
- Gabriel destacado (texto maior, cor indigo)
- Separadores verticais rgba(255,255,255,0.08)
- Barra de progresso horizontal fina atrás de cada % (proporcional ao valor)

---

## REGRAS:
- O Modo TV é um componente SEPARADO do dashboard normal — não interfere nas outras telas
- Use ApexCharts com tema dark configurado (theme: { mode: 'dark' })
- Todos os textos em pt-BR
- Persistir configuração no localStorage
- O relógio digital atualiza em tempo real (useEffect com setInterval)
- Responsivo: se a tela for menor, os painéis empilham
- O ESC fecha o modo TV
- Performance: os gráficos não devem re-renderizar desnecessariamente

Implemente agora. Pare quando terminar para eu avaliar.
