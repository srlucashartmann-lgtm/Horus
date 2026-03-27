# ONBOARDING — ACESSO GUIADO DO HÓRUS

Leia o arquivo diretrizes-cursor.md primeiro.

## CONCEITO

Quando o usuário entra no Hórus pela primeira vez, um tour guiado passo a passo mostra cada funcionalidade do sistema. O tour usa tooltips que destacam elementos na tela (highlight com overlay escuro ao redor), com botões "Próximo", "Anterior" e "Pular Tour".

## IMPLEMENTAÇÃO TÉCNICA

Instale a biblioteca react-joyride:
```
npm install react-joyride
```

O react-joyride cria spotlights (destaque) em elementos da página com tooltip explicativo.

Crie a estrutura:
```
src/components/onboarding/
  OnboardingProvider.tsx    — Context que controla estado do tour
  TourSteps.ts             — Definição de todos os passos de cada tour
  ModuleTour.tsx            — Componente que renderiza o Joyride em cada página
```

## SISTEMA DE TOURS

### Controle de estado:
- localStorage guarda quais tours o usuário já completou: `horus-tours-completed-{userId}`
- Formato: { general: true, tracking: true, crossTabs: false, ... }
- Se o tour daquela página nunca foi feito, inicia automaticamente ao abrir
- Botão "Repetir Tour" discreto no header de cada página (ícone de ? ou graduação)
- Botão "Pular" em todos os passos — marca como completado

### Estilo dos tooltips:
- Fundo: branco (light mode) ou #1A2236 (dark mode)
- Borda arredondada: 12px
- Sombra forte pra se destacar
- Título do passo em bold
- Texto explicativo em 2-3 frases curtas
- Indicador de progresso: "Passo 3 de 12"
- Botão "Próximo" em cor primária
- Botão "Anterior" em outline
- Botão "Pular Tour" como texto link discreto
- O overlay (fundo escuro) em rgba(0,0,0,0.5) com spotlight no elemento destacado
- Animação suave ao trocar de passo

---

## TOUR 1 — GERAL (primeira vez que loga no sistema)

Este tour roda na War Room e apresenta o sistema como um todo. São 10 passos:

**Passo 1 — Boas-vindas (sem target, tooltip centralizado na tela):**
Título: "Bem-vindo ao Hórus 👁"
Texto: "O Hórus é seu Motor de Síntese Estratégica. Ele cruza dados quantitativos (pesquisas) com qualitativos (grupos focais) para gerar inteligência acionável para a campanha. Vamos te mostrar como usar."

**Passo 2 — Sidebar (target: sidebar inteira):**
Título: "Navegação Principal"
Texto: "Aqui ficam todos os módulos do sistema. Estão organizados em: Quantitativo (números das pesquisas), Qualitativo (vozes dos eleitores), Inteligência (análises cruzadas) e Configurações."

**Passo 3 — War Room (target: área de conteúdo principal):**
Título: "War Room — Seu Painel Central"
Texto: "Esta é a home do Hórus. Mostra um resumo de tudo que está acontecendo na campanha. Os widgets são personalizáveis — clique no ⚙ para reorganizar."

**Passo 4 — KPIs (target: os 4 cards de KPI):**
Título: "Indicadores Vitais"
Texto: "Os 4 números mais importantes: Intenção de Voto, Rejeição, Aprovação do Governo e Qualis da Semana. As setas mostram a variação vs semana anterior. Verde = melhorando, Vermelho = piorando."

**Passo 5 — Tracking (target: widget do gráfico de tracking):**
Título: "Tracking Diário"
Texto: "O gráfico mostra a evolução da intenção de voto ao longo do tempo. A linha principal (azul) é o Gabriel Souza. Os marcadores verticais indicam eventos da campanha (debates, ataques, virais)."

**Passo 6 — Alertas (target: widget de alertas):**
Título: "Alertas Estratégicos"
Texto: "O sistema monitora automaticamente mudanças nos números. Quando algo sai do padrão — como uma queda de rejeição num segmento — um alerta é disparado. Vermelho = urgente, Amarelo = atenção, Verde = positivo."

**Passo 7 — Segmentos (target: widget da tabela de segmentos):**
Título: "Segmentos Eleitorais"
Texto: "Cada linha é um perfil de eleitor. A coluna 'Rejeição' usa cores: verde (baixa), amarelo (atenção), vermelho (alta). As setas mostram se estamos ganhando ou perdendo naquele grupo."

**Passo 8 — Sessões Quali (target: widget de sessões):**
Título: "Sessões Qualitativas"
Texto: "Aqui aparecem os últimos grupos focais realizados. Cada sessão tem um sentimento geral (Positivo/Negativo/Neutro) e tags com os temas discutidos. Clique para ver a transcrição completa."

**Passo 9 — Vocabulário (target: widget de frases):**
Título: "Vocabulário do Eleitor"
Texto: "As frases que os eleitores realmente usam. Quando uma expressão como 'geladeira vazia' aparece múltiplas vezes, ela vira um vocabulário-chave que o candidato deve incorporar no discurso."

**Passo 10 — Conclusão (sem target, centralizado):**
Título: "Pronto para começar! 🚀"
Texto: "Cada módulo tem seu próprio tour explicando os detalhes. Ao abrir uma tela pela primeira vez, o tour inicia automaticamente. Você pode repetir qualquer tour clicando no ícone ❓ no topo da página. Bom trabalho!"

---

## TOUR 2 — TRACKING (ao abrir /quantitativo/tracking pela primeira vez)

6 passos:

**Passo 1 — Filtros (target: barra de filtros):**
Título: "Filtros de Análise"
Texto: "Filtre por período, cenário (estimulado ou espontâneo) e segmento demográfico. Após selecionar, clique em 'Aplicar Filtros' para atualizar todos os gráficos."

**Passo 2 — Gráfico principal (target: gráfico de linha):**
Título: "Evolução Temporal"
Texto: "O gráfico mostra todos os candidatos ao longo do tempo. A área azul é Gabriel Souza. As linhas tracejadas verticais marcam eventos da campanha — passe o mouse pra ver detalhes."

**Passo 3 — Tabs de métrica (target: tabs Intenção/Rejeição/Aprovação):**
Título: "Trocar Métrica"
Texto: "Alterne entre Intenção de Voto, Rejeição e Aprovação. O gráfico se atualiza mostrando os mesmos candidatos mas com a métrica selecionada."

**Passo 4 — Gráfico de barras (target: gráfico de rejeição por segmento):**
Título: "Rejeição por Segmento"
Texto: "Compare a rejeição dos 4 candidatos em cada perfil demográfico. Passe o mouse nas barras para ver os valores exatos."

**Passo 5 — Mapa de calor (target: tabela de calor):**
Título: "Mapa de Calor"
Texto: "As cores indicam o nível de rejeição: verde (baixa), amarelo (média), vermelho (alta). Use para identificar rapidamente onde cada candidato é mais rejeitado."

**Passo 6 — Tabela (target: tabela de dados):**
Título: "Dados Completos"
Texto: "Todos os números do tracking em detalhe. A coluna 'Evento' mostra acontecimentos relevantes da campanha. Clique no ícone de download para exportar como CSV."

---

## TOUR 3 — CROSS-TABS (ao abrir pela primeira vez)

5 passos:

**Passo 1 — Seletores (target: painel de configuração):**
Título: "Monte seu Cruzamento"
Texto: "Escolha a pergunta nas linhas (ex: Intenção de Voto) e o filtro nas colunas (ex: Faixa Etária). Selecione a rodada e clique em 'Gerar Cruzamento'."

**Passo 2 — Comparação (target: switch 'Comparar com rodada anterior'):**
Título: "Comparação entre Rodadas"
Texto: "Ative este switch para ver a variação entre a rodada atual e a anterior. Células verdes subiram, vermelhas caíram. Perfeito para detectar movimentações recentes."

**Passo 3 — Tabela (target: tabela de resultados):**
Título: "Tabela de Cruzamento"
Texto: "A linha do Gabriel está destacada em azul. O maior valor de cada coluna aparece em verde (líder naquele segmento). A coluna TOTAL mostra o cenário geral."

**Passo 4 — Destaques (target: card de destaques):**
Título: "Insights Automáticos"
Texto: "O sistema analisa os dados e gera insights automaticamente: onde Gabriel lidera, onde está fraco, e tendências dos adversários."

**Passo 5 — Exportar (target: botões de exportar):**
Título: "Exporte seus Dados"
Texto: "Exporte para Excel, PDF, ou salve o cruzamento para acesso rápido. A base amostral e margem de erro estão indicadas abaixo."

---

## TOUR 4 — SIMULAÇÕES (ao abrir pela primeira vez)

4 passos:

**Passo 1 — Tabs (target: tabs de modo):**
Título: "Tipos de Simulação"
Texto: "Quatro modos: Cenário Atual (como está hoje), Desistência (e se alguém sair), Segundo Turno (cenários de 2º turno) e Conversão de Indecisos (e se conquistarmos os Brancos/Nulos)."

**Passo 2 — Sliders (target: sliders de redistribuição):**
Título: "Redistribuição de Votos"
Texto: "Arraste os sliders para simular para onde iriam os votos. O gráfico 'Depois' atualiza em tempo real. A soma sempre dá 100%. Use 'Redistribuir Igualmente' para resetar."

**Passo 3 — Antes/Depois (target: gráficos donut):**
Título: "Compare os Cenários"
Texto: "O donut 'Antes' mostra o cenário real. O 'Depois' mostra a simulação. Se Gabriel passa de 50%, o card abaixo fica verde indicando vitória em 1º turno."

**Passo 4 — Conclusão (target: card de resultado):**
Título: "Resultado da Simulação"
Texto: "O card de conclusão muda de cor conforme o resultado: verde (vitória provável), amarelo (indefinido), vermelho (risco). Use para testar cenários antes de tomar decisões."

---

## TOUR 5 — SESSÕES QUALI (ao abrir pela primeira vez)

5 passos:

**Passo 1 — Visão geral (target: grid de cards):**
Título: "Suas Sessões Qualitativas"
Texto: "Cada card é um grupo focal realizado. O badge de cor indica o sentimento geral: verde (positivo), vermelho (negativo), amarelo (neutro/misto). As tags mostram os temas discutidos."

**Passo 2 — Status (target: badge de status de qualquer card):**
Título: "Status de Transcrição"
Texto: "'Transcrito' significa que o áudio já foi processado e o texto está disponível. 'Processando' indica que a transcrição está em andamento. 'Pendente' aguarda upload do áudio."

**Passo 3 — Nova sessão (target: botão + Nova Sessão):**
Título: "Adicionar Sessão"
Texto: "Clique aqui para registrar um novo grupo focal. Preencha os dados, faça upload do áudio/vídeo, e o sistema processará a transcrição automaticamente via Deepgram."

**Passo 4 — Abrir sessão (target: botão Abrir Sessão de qualquer card):**
Título: "Explorar Sessão"
Texto: "Abra uma sessão para ver a transcrição interativa, ouvir o áudio, taguear trechos importantes e ver o resumo gerado por IA."

**Passo 5 — Filtros (target: botão Filtrar):**
Título: "Filtrar Sessões"
Texto: "Filtre por status, sentimento, período ou busque por texto nas keywords. Útil quando há muitas sessões acumuladas."

---

## TOUR 6 — SESSÃO INDIVIDUAL (ao abrir uma sessão pela primeira vez)

5 passos:

**Passo 1 — Player (target: área do player):**
Título: "Player de Mídia"
Texto: "Ouça o áudio ou assista o vídeo do grupo focal. Use os controles de velocidade (1x, 1.5x, 2x) para ouvir mais rápido."

**Passo 2 — Transcrição (target: coluna da transcrição):**
Título: "Transcrição Interativa"
Texto: "O texto foi gerado automaticamente pelo Deepgram. Cada fala tem o nome do participante e o timestamp. Clique no timestamp para pular o áudio para aquele momento."

**Passo 3 — Tagueamento (target: qualquer trecho da transcrição):**
Título: "Tagueie Trechos"
Texto: "Selecione um trecho do texto com o mouse. Um menu aparece com tags pré-definidas (Economia, Ataque, Elogio, etc). Trechos tagueados ficam destacados e vão automaticamente para a Biblioteca de Clipes."

**Passo 4 — Resumo IA (target: card de resumo):**
Título: "Resumo por IA"
Texto: "A inteligência artificial analisa toda a transcrição e gera os 5 pontos principais da sessão. Economiza horas de análise manual."

**Passo 5 — Sentimento (target: tabela de sentimento por participante):**
Título: "Sentimento Individual"
Texto: "Veja o sentimento de cada participante e sua inclinação política. Ajuda a entender quais perfis estão mais resistentes ou favoráveis ao candidato."

---

## TOUR 7 — BIBLIOTECA DE CLIPES (ao abrir pela primeira vez)

3 passos:

**Passo 1 — Cards de clipes (target: grid de clipes):**
Título: "Melhores Momentos"
Texto: "Cada card é uma frase de impacto de um eleitor. Mostra quem falou, de qual sessão, quantas vezes foi mencionada, e as tags temáticas. Clique no play para ouvir o trecho."

**Passo 2 — Favoritos (target: estrela de favorito):**
Título: "Destaques da Semana"
Texto: "Favorite os clipes mais relevantes clicando na estrela. Eles aparecem no painel 'Destaques da Semana' à direita — prontos para o briefing do candidato."

**Passo 3 — Filtros (target: barra de filtros):**
Título: "Encontre Rapidamente"
Texto: "Filtre por tag, sentimento, candidato mencionado, ou busque por texto. Ative 'Só favoritos' para ver apenas os destaques."

---

## TOUR 8 — MAPA DE SENTIMENTOS (ao abrir pela primeira vez)

4 passos:

**Passo 1 — Matriz (target: tabela de sentimento por sessão):**
Título: "Matriz de Sentimentos"
Texto: "Cada célula mostra o sentimento de um tema numa sessão específica. Verde = positivo, Amarelo = neutro, Vermelho = negativo, Cinza = não discutido. Passe o mouse para ver detalhes."

**Passo 2 — Radar (target: gráfico radar):**
Título: "Radar de Temas"
Texto: "O radar mostra a intensidade de cada tema na campanha. A área vermelha indica sentimento negativo, a verde indica positivo. Quanto maior a área, mais forte o sentimento."

**Passo 3 — Barras por candidato (target: gráfico de barras empilhadas):**
Título: "Percepção por Candidato"
Texto: "Veja como cada candidato é percebido: proporção de menções positivas (verde), neutras (amarelo) e negativas (vermelho). Gabriel tem percepção polarizada — os adversários também."

**Passo 4 — Diagnóstico (target: cards de diagnóstico):**
Título: "Diagnóstico Automático"
Texto: "O sistema analisa todos os dados e gera alertas (vermelho), atenções (amarelo) e oportunidades (verde). Cada insight tem uma recomendação acionável."

---

## TOUR 9 — ALERTAS (ao abrir pela primeira vez)

4 passos:

**Passo 1 — KPIs (target: cards de KPI):**
Título: "Visão Rápida"
Texto: "Quantos alertas ativos, quantos requerem ação imediata, quantos foram resolvidos, e quantos segmentos estão em zona de risco."

**Passo 2 — Mapa de Risco (target: grid de segmentos coloridos):**
Título: "Mapa de Risco"
Texto: "Cada card é um segmento eleitoral. Verde = seguro, Amarelo = atenção, Vermelho = risco. O número é a intenção de voto do Gabriel naquele grupo. As setas mostram a tendência."

**Passo 3 — Alertas (target: lista de alertas):**
Título: "Alertas Ativos"
Texto: "Cada alerta tem severidade (Crítico/Atenção/Positivo), descrição, ação sugerida e tags. Clique em 'Investigar' para ir ao Causa e Efeito. 'Resolvido' marca como tratado."

**Passo 4 — Regras (target: seção de regras):**
Título: "Regras de Alerta"
Texto: "O sistema monitora automaticamente os dados usando estas regras. Quando uma condição é atingida, um alerta é gerado. Você pode ativar ou desativar cada regra."

---

## TOUR 10 — SÍNTESE SEMANAL (ao abrir pela primeira vez)

3 passos:

**Passo 1 — Resumo (target: card de resumo executivo):**
Título: "Resumo Executivo"
Texto: "O texto resume toda a semana em um parágrafo — o que melhorou, o que piorou, e o que precisa de ação. Escrito para ser lido pelo candidato em 30 segundos."

**Passo 2 — Recomendações (target: lista de recomendações):**
Título: "Plano de Ação"
Texto: "Ações priorizadas para a próxima semana. Vermelho = urgente, Amarelo = importante, Verde = oportunidade. Marque o checkbox quando a ação for executada."

**Passo 3 — Cheat Sheet (target: card de perguntas difíceis):**
Título: "Cheat Sheet do Candidato"
Texto: "Perguntas difíceis que apareceram nas qualis com respostas sugeridas. O candidato lê antes de entrevistas e debates. Exporte como PDF clicando no botão."

---

## TOUR 11 — CAUSA E EFEITO (ao abrir pela primeira vez)

4 passos:

**Passo 1 — Seletores (target: selects de segmento e período):**
Título: "Escolha o Segmento"
Texto: "Selecione qual segmento eleitoral quer analisar. O sistema cruza automaticamente os dados quantitativos (números) com os qualitativos (falas dos eleitores) daquele grupo."

**Passo 2 — Quanti (target: card de diagnóstico quantitativo):**
Título: "O que Aconteceu"
Texto: "Os números mostram a variação detectada: quanto caiu ou subiu a intenção de voto e a rejeição naquele segmento. O gráfico mostra a tendência visual."

**Passo 3 — Quali (target: lista de frases):**
Título: "Por que Aconteceu"
Texto: "As frases reais dos eleitores daquele segmento explicam o motivo da variação. Cada frase vem de uma sessão qualitativa e pode ser ouvida clicando no play."

**Passo 4 — Termômetro (target: tabela de narrativas):**
Título: "Monitoramento de Narrativas"
Texto: "'Ganhando força' significa que os eleitores estão mencionando o tema sozinhos — é perigoso. 'Precificado' significa que já perdeu impacto. 'A nosso favor' são narrativas que nos beneficiam."

---

## REGRAS GERAIS:
- Use react-joyride com spotlightClicks: true (permite clicar no elemento destacado)
- Os tours devem funcionar em light e dark mode
- Todos os textos em pt-BR
- O tour geral roda APENAS na primeira vez que o usuário loga
- Os tours por módulo rodam na primeira vez que aquele módulo é aberto
- Botão ❓ discreto no header de CADA página que permite repetir o tour daquela tela
- Se o usuário pular, marca como completado e não mostra de novo
- Transições suaves entre passos (scroll automático se o elemento estiver fora da tela)
- O indicador "Passo X de Y" deve estar visível em todos os tooltips
- Salve o progresso no localStorage: horus-tours-{userId}

Implemente agora. Pare quando terminar para eu avaliar.
