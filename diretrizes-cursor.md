# HÓRUS — Motor de Síntese Estratégica para Campanha Eleitoral

## REGRA #1: ESTE PROJETO USA O TEMPLATE ABLE PRO

Este projeto é construído em cima do **Able Pro Next.js TypeScript v5**. Você está PROIBIDO de:
- Criar componentes do zero quando o Able Pro já tiver um equivalente
- Mudar o sistema de temas, cores ou tipografia do Able Pro
- Substituir bibliotecas que o Able Pro já usa (MUI, ApexCharts, etc.)
- Alterar o layout base (sidebar, header, footer) — apenas adaptar o conteúdo

Você DEVE:
- Explorar e reutilizar ao máximo os componentes existentes (cards, gráficos, tabelas, widgets, KPIs)
- Manter o visual, tipografia, espaçamento e padrões do Able Pro
- Usar o sistema de rotas que o Able Pro já implementa (Next.js App Router)
- Usar o sistema de temas light/dark que já existe
- Usar os ícones, badges, chips e elementos de UI que já estão disponíveis

**Antes de criar qualquer componente novo, procure no projeto se já existe algo similar.**

---

## REGRA #2: CONSTRUA TELA POR TELA

**NÃO construa todas as telas de uma vez.** Siga esta ordem:

1. **ETAPA 1:** Mapeie o template (explore todos os componentes, dashboards, gráficos, widgets disponíveis). Depois adapte a sidebar/navegação para o Hórus + construa a **Tela 1 — War Room Dashboard**. Pare e me mostre.
2. **ETAPA 2:** Construa a **Tela 2 — Tracking Quantitativo (Deep Dive)**. Pare e me mostre.
3. **ETAPA 3:** Construa a **Tela 3 — Cross-Tabs**. Pare e me mostre.
4. **ETAPA 4:** Construa a **Tela 4 — Sessão Qualitativa**. Pare e me mostre.
5. **ETAPA 5:** Construa a **Tela 5 — Inteligência: Causa e Efeito**. Pare e me mostre.
6. **ETAPA 6:** Construa a **Tela 6 — Modo TV Hórus**. Pare e me mostre.

Após cada etapa, espere meu feedback antes de avançar. Cada tela deve estar **completa e polida** antes de prosseguir.

---

## O QUE É O HÓRUS

O Hórus é um Motor de Síntese Estratégica para campanhas eleitorais majoritárias. O nome vem do deus egípcio da visão: o sistema é o olho que tudo vê na campanha. Ele cruza dados quantitativos (trackings, pesquisas de opinião) com dados qualitativos (grupos focais, transcrições de áudio/vídeo) para gerar inteligência acionável em tempo real.

### Candidato e Adversários

- **Candidato principal:** Gabriel Souza
- **Adversários:** Juliana Brizola, Zucco, Edegar Pretto

Todos os dados fictícios de demonstração devem usar esses nomes reais. O sistema gira em torno da campanha de Gabriel Souza.

---

## NAVEGAÇÃO DO HÓRUS (adaptar a sidebar do Able Pro)

Substitua os itens da sidebar do Able Pro por esta estrutura. Mantenha o visual/comportamento da sidebar original (colapsável, ícones, submenus), apenas troque os itens:

```
🏠 War Room (Dashboard Central)

📊 Quantitativo
   ├── Tracking (Evolução temporal)
   ├── Cross-Tabs (Cruzamentos dinâmicos)
   └── Simulações de Cenário

🗣️ Qualitativo
   ├── Acervo de Sessões
   ├── Biblioteca de Clipes
   └── Mapa de Sentimentos

🧠 Inteligência & Relatórios
   ├── Alertas e Mudanças de Humor
   ├── Síntese Semanal
   └── Causa e Efeito (Quali × Quanti)

⚙️ Configurações
   ├── Usuários e Permissões
   ├── Integração Deepgram
   └── Dicionário de Tags
```

No logo da sidebar, troque o texto/logo do Able Pro por **"HÓRUS"** com subtítulo **"Motor Estratégico"**.

No rodapé da sidebar, adicione um botão **"Modo TV Hórus"**.

### Tipos de Usuários (para implementar depois):

| Perfil | Nível de Acesso | O que faz |
|---|---|---|
| Candidato / Coordenação | Leitura VIP | Só vê War Room Dashboard, resumos e alertas |
| Estrategista / Marqueteiro | Análise Total | Cruza dados, lê transcrições, define insights |
| Cientista de Dados | Operacional Avançado | Upload de bases SPSS/CSV, cruzamentos complexos |
| Analista de Quali | Operacional Quali | Upload de vídeos, tagueamento, recorte de clipes |

---

## TELA 1 — WAR ROOM DASHBOARD

Esta é a página principal. Use os componentes do Able Pro para montar:

**1. Header da página:**
- Título "War Room — Gabriel Souza" + subtítulo "Governador do RS · Última atualização há 12 min"
- Badge "Rodada 18 · 20/Mar"
- Botões "Exportar PDF" e "+ Nova Pesquisa" (reutilize os botões do Able Pro)

**2. Linha de KPIs (4 cards):**
Use os cards de estatística/widget que o Able Pro já tem. Adapte para:
- Intenção de Voto: 47% (+3pp vs semana) — cor primária/indigo
- Rejeição: 24% (+1.2pp vs semana) — cor vermelha
- Aprovação Gov.: 51% (+2pp vs semana) — cor verde
- Qualis da Semana: 5 sessões — cor amarela/amber

Cada card deve ter: número grande, label, sparkline, badge de variação (▲/▼).

**3. Grid principal (2 colunas):**

**Coluna esquerda — Tracking Diário (gráfico):**
Use o componente de gráfico de área/linha que o Able Pro já possui (ApexCharts provavelmente). Configure com:
- 3 séries: Intenção de Voto Gabriel (linha principal com área), Rejeição (linha tracejada), Aprovação (linha tracejada)
- Eixo X temporal com datas de março
- Marcadores de eventos: "Debate" (05/Mar), "HE" (11/Mar), "Ataque" (14/Mar), "TikTok" (17/Mar)
- Tooltip estilizado

**Coluna direita — Alertas Estratégicos:**
Use cards/lista do Able Pro. Crie cards com:
- 🔴 Crítico: "Rejeição sobe 4.1% com Evangélicos" — borda esquerda vermelha
- 🟡 Atenção: "Gabriel inexperiente ganhando tração" — borda esquerda amarela
- 🟡 Atenção: "Zucco consolida percepção de segurança" — borda esquerda amarela
- 🟢 Positivo: "Máxima histórica Jovens 16-24 (58%)" — borda esquerda verde
- 🟢 Positivo: "Geladeira vazia como vocabulário-chave" — borda esquerda verde

**4. Grid secundário (2 colunas):**

**Tabela de Segmentos Eleitorais:**
Use o componente de tabela do Able Pro. Colunas: Segmento, Intenção, Rejeição, Variação.
- Rejeição com badge colorido (verde < 25%, amarelo 25-34%, vermelho ≥ 35%)
- Variação com setas coloridas (▲ verde, ▼ vermelho)

| Segmento | Voto | Rejeição | Variação |
|---|---|---|---|
| Mulheres 25-34 | 52% | 18% | +3.2pp |
| Homens 35-49 | 41% | 29% | -1.8pp |
| Evangélicos | 33% | 38% | -4.1pp |
| Classe C | 44% | 24% | +0.5pp |
| Jovens 16-24 | 58% | 14% | +5.7pp |
| Interior Norte | 39% | 31% | -2.3pp |
| Classe A/B | 35% | 34% | -0.9pp |
| Mulheres 50+ | 48% | 21% | +1.4pp |

**Últimas Sessões Qualitativas:**
Use cards/lista do Able Pro com badges de status e sentimento:
1. "Mulheres Indecisas — Classe C" / 19 Mar / 8 participantes / Negativo / Transcrito / #geladeira-vazia #medo #creche
2. "Jovens Universitários — Capital" / 17 Mar / 10 participantes / Positivo / Transcrito / #emprego #tecnologia #futuro
3. "Evangélicos — Periferia" / 15 Mar / 9 participantes / Neutro / Processando / #família #valores #segurança
4. "Homens Classe B — Zona Sul" / 13 Mar / 8 participantes / Misto / Transcrito / #imposto #segurança
5. "Donas de Casa — Interior" / 10 Mar / 7 participantes / Negativo / Transcrito / #abandono #hospital

**5. Linha inferior (2 colunas):**

**Vocabulário do Eleitor (Frases da Quali):**
- "A geladeira tá vazia e o gás tá caro demais" — Maria, 32, Classe C (×4 menções)
- "Eu quero ver emprego, não promessa" — Lucas, 21, Universitário (×3)
- "Ninguém fala da gente que mora longe" — José, 45, Interior (×3)
- "O Gabriel parece que entende a gente jovem" — Ana, 19, Capital (×2)

**Ações Rápidas:**
Botões: Gerar Síntese Semanal, Cheat Sheet do Candidato, Exportar Segmento p/ Ads, Nova Sessão Quali

**Status do Sistema:**
- Deepgram API: Online ✅
- Tracking #18: Atualizado ✅
- Transcrição #3: 67% ⟳

---

## TELA 2 — TRACKING QUANTITATIVO (Deep Dive)

- Gráfico de linha principal GRANDE com os 4 candidatos: Gabriel Souza, Juliana Brizola, Zucco, Edegar Pretto
- Filtros no topo: período, cenário (estimulado/espontâneo), segmento demográfico
- Marcadores de eventos da campanha sobrepostos no gráfico
- Toggle entre Intenção de Voto / Rejeição / Avaliação de Governo
- Gráfico secundário de barras: comparativo de rejeição entre os 4 candidatos por segmento
- Mapa de calor de rejeição: tabela cruzando segmentos × 4 candidatos, células coloridas por intensidade

---

## TELA 3 — CROSS-TABS (Cruzamentos Dinâmicos)

- Seletor de "Pergunta nas Linhas" (Ex: Intenção de Voto Estimulada)
- Seletor de "Filtros nas Colunas" (Ex: Religião + Faixa Etária)
- Tabela dinâmica resultante com valores percentuais
- Destaque automático de células com variações significativas
- Botão de exportar para planilha

---

## TELA 4 — SESSÃO QUALITATIVA (página individual)

**Topo:** Metadados — Data, Perfil do grupo, Moderador, Duração, Status

**Layout dividido:**
- **Esquerda (60%):** Player de vídeo/áudio nativo
- **Direita (40%):** Transcrição interativa (texto clicável que pula o player pro timestamp)
  - Diarização: renomear speakers para "Maria (Indecisa)", "João (Lulista)"
  - Tagueamento de trechos com tags de campanha (Ataque_Brizola, Medo_Economia, etc.)
  - Geração automática de clipes de ~15s ao taguear

**Abaixo:** Nuvem de tags, resumo por IA (5 tópicos), sentimento por participante

---

## TELA 5 — INTELIGÊNCIA: CAUSA E EFEITO

**Esquerda — O que aconteceu (Quanti):**
- Card: "Gabriel caiu 5 pontos com Mulheres Classe C"
- Gráfico mini de tracking do segmento

**Direita — Por que aconteceu (Quali):**
- 10 frases mais repetidas por aquele segmento nas qualis recentes
- Clipes de vídeo correspondentes
- Tags emergentes

**Abaixo — Termômetro de Ataques e Defesas:**
- Temas monitorados com indicador de tração (ganhando força / precificado)

---

## TELA 6 — MODO TV HÓRUS

- Overlay fullscreen, dark mode forçado
- Logo "HÓRUS" + indicador "AO VIVO" com dot pulsante
- 4 números gigantes: Intenção de Voto, Rejeição, Aprovação, Gap vs 2º colocado
- Footer com os números dos adversários
- Botão "Sair do Modo TV"

---

## DADOS MOCK COMPLETOS

### Tracking (rodadas diárias):

| Data | Gabriel | Juliana | Zucco | Edegar | Brancos |
|---|---|---|---|---|---|
| 01/Mar | 36% | 22% | 18% | 12% | 12% |
| 03/Mar | 37% | 21% | 18% | 12% | 12% |
| 05/Mar | 39% | 21% | 18% | 11% | 11% |
| 07/Mar | 41% | 20% | 17% | 11% | 11% |
| 09/Mar | 42% | 20% | 17% | 11% | 10% |
| 11/Mar | 44% | 21% | 18% | 10% | 7% |
| 13/Mar | 43% | 21% | 18% | 10% | 8% |
| 14/Mar | 43% | 22% | 17% | 10% | 8% |
| 15/Mar | 45% | 21% | 17% | 10% | 7% |
| 17/Mar | 44% | 22% | 17% | 10% | 7% |
| 19/Mar | 46% | 21% | 16% | 10% | 7% |
| 20/Mar | 47% | 21% | 16% | 10% | 6% |

### Rejeição por segmento:

| Candidato | Geral | Evangélicos | Mulheres 25-34 | Jovens 16-24 | Interior |
|---|---|---|---|---|---|
| Gabriel Souza | 24% | 38% | 18% | 14% | 31% |
| Juliana Brizola | 35% | 28% | 22% | 30% | 38% |
| Zucco | 31% | 15% | 35% | 28% | 22% |
| Edegar Pretto | 28% | 42% | 25% | 22% | 18% |

### Eventos da campanha:
- 05/Mar: Debate TV Record
- 11/Mar: Início do Horário Eleitoral
- 14/Mar: Ataque de Juliana Brizola (tema família)
- 17/Mar: Viralização de vídeo de Gabriel no TikTok

### Frases do eleitor:
- "A geladeira tá vazia e o gás tá caro demais" — Maria, 32, Classe C (×4)
- "Eu quero ver emprego, não promessa" — Lucas, 21, Universitário (×3)
- "Ninguém fala da gente que mora longe" — José, 45, Interior (×3)
- "O Gabriel parece que entende a gente jovem" — Ana, 19, Capital (×2)
- "O Zucco é o único que fala de segurança de verdade" — Paulo, 55, Evangélico (×2)
- "A Brizola tem o nome mas não tem o plano" — Dona Lúcia, 61, Classe C (×2)
- "Eu tenho medo de votar errado e me arrepender" — Cláudia, 38, Indecisa (×3)

### Alertas Estratégicos:
- 🔴 CRÍTICO: "Rejeição de Gabriel subiu 4.1% entre Evangélicos nos últimos 3 dias — ultrapassou margem de erro em 2 rodadas consecutivas"
- 🟡 ATENÇÃO: "Tema 'Gabriel inexperiente' apareceu espontaneamente em 2 qualis seguidas — possível ataque coordenado de Juliana Brizola"
- 🟡 ATENÇÃO: "Zucco consolidando liderança em percepção de segurança — 68% dos evangélicos citam como melhor candidato no tema"
- 🟢 POSITIVO: "Gabriel atingiu máxima histórica com Jovens 16-24 (58%) após viralização no TikTok"
- 🟢 POSITIVO: "Frase 'geladeira vazia' identificada como vocabulário-chave — recomendar uso no próximo debate"

---

## O QUE NÃO FAZER

- **NÃO delete componentes do Able Pro** — reutilize-os
- **NÃO mude o sistema de temas** — use o light/dark que já existe
- **NÃO troque as bibliotecas** — use MUI, ApexCharts e o que já está instalado
- **NÃO crie layouts do zero** — adapte os que existem
- **NÃO use placeholder "Lorem ipsum"** — todos os textos devem ser dados reais da campanha
- **NÃO simplifique os dados** — use TODOS os dados mock fornecidos acima

---

## ENTREGÁVEL

Adapte o Able Pro para o **Hórus**, mantendo 100% do visual e qualidade do template original. A primeira tela visível deve ser o War Room Dashboard. Os dados são mockados mas a estrutura deve ser clara para futura integração com API real.

**Comece pela ETAPA 1. Espere meu feedback antes de avançar.**
