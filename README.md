# Luminate: See Sound

PROMPT (copie a partir daqui)

Você é o design lead de um estúdio que constrói identidades visuais sob medida — nunca templates genéricos. Construa uma landing page de uma página só (single-page), em HTML/CSS/JS puro (sem framework pesado, pode usar poucas libs via CDN se necessário), para apresentar o Luminate, um assistente de autonomia e navegação para pessoas cegas ou com baixa visão, construído sobre os Meta AI Glasses.

1. Contexto do produto (use isso como fonte de verdade do copy)

Luminate é um ecossistema hands-free: os óculos da Meta captam o ambiente (câmera + microfone) e devolvem informação por voz no alto-falante open-ear — não há display. Um app companion no celular funciona como o "cérebro": processa IA multimodal sob demanda, roda um modelo leve de Edge AI para detectar obstáculos com eficiência de bateria, aciona uma rede de apoio humano por videochamada quando a IA não resolve sozinha, guia navegação GPS acessível, e gera de forma anônima um mapeamento colaborativo de obstáculos urbanos (o "Waze da Acessibilidade"). O produto existe porque as soluções atuais — bengala, apps que exigem segurar o celular, óculos assistivos de nicho e caros — nunca resolvem as duas pontas ao mesmo tempo: percepção contínua do ambiente e ausência de estigma visual.

Pilares centrais para a página comunicar, em ordem de importância:

Hands-free de verdade — nada de segurar celular na frente do rosto.

Sem estigma — parece um óculos comum, não um equipamento médico.

Eficiência radical de bateria — Edge AI e ativação dinâmica por sensores, não câmera sempre ligada.

Rede de apoio humano — quando a IA não basta, uma pessoa real entra na chamada.

Efeito rede — cada obstáculo detectado alimenta um mapa coletivo de acessibilidade urbana.

Dado que o público final do produto é majoritariamente cego ou com baixa visão, a própria landing page precisa ser um exemplo de acessibilidade bem-feita — não apenas falar sobre acessibilidade, mas praticá-la (ver Seção 5).

2. Direção de marca e identidade visual

Referência de estilo: a linguagem visual institucional do CEIA/UFG e da Meta — minimalista, técnica, confiável, sem exagero decorativo. Fuja de clichês de design gerado por IA (fundo bege quente com serifada de alto contraste; fundo quase preto com um único acento verde-ácido; layout estilo jornal com regras finas). A direção aqui é precisão e silêncio visual, não minimalismo genérico — cada escolha deve reforçar a ideia central de que o produto "desaparece" na experiência do usuário (óculos comuns, nenhuma tela). Utilize elementos do https://21st.dev/ para cirar uma landingpage de encher os olhos.

Paleta (4-6 tons nomeados):

--azul-meta #0064E0 — accent primário, CTAs, links, ícones ativos

--azul-profundo #0A1F44 — seções escuras, rodapé, texto de maior peso sobre fundo claro

--branco #FFFFFF — fundo primário

--cinza-nevoa #F2F4F7 — fundo secundário para alternância de seções

--cinza-grafite #5B6472 — texto secundário, legendas, metadados

--preto-quase #12141A — texto primário sobre fundo branco

Tipografia (2 famílias, papéis distintos):

Display (títulos, headline do hero): uma geométrica de peso firme e cantos levemente arredondados (ex.: Space Grotesk ou General Sans, peso 500–700) — transmite precisão técnica sem frieza.

Corpo e UI (parágrafos, botões, labels): uma humanista de altíssima legibilidade (ex.: Inter), peso 400–500, com tamanho mínimo de 16px no corpo — legibilidade é literalmente o tema do produto, então a tipografia da página não pode ser o primeiro lugar onde isso falha.

Escala tipográfica clara: hero em ~56–64px desktop / ~34px mobile; H2 de seção ~36px; corpo ~18px; legendas ~14px.

Conceito de layout: rolagem única, vertical, com respiro generoso entre seções (nada de densidade jornalística). Nav fixa minimalista (logotipo + 3–4 âncoras + CTA). Alternância sutil entre fundo branco e --cinza-nevoa para separar seções sem precisar de linhas divisórias pesadas.

[ NAV: Luminate  ·  Problema  Solução  Diferenciais  Equipe  · CTA ]

[ HERO: headline + subheadline + elemento-assinatura (ver abaixo) ]

[ PROBLEMA: dado central (6,9 milhões) + 2-3 apoios curtos ]

[ SOLUÇÃO: 3 blocos — Óculos (percepção) | App (cérebro) | Rede de Apoio ]

[ DIFERENCIAL: comparação Luminate vs. bengala / OrCam / Envision / Be My Eyes ]

[ ÉTICA & PRIVACIDADE: 3 princípios curtos, tom institucional ]

[ EQUIPE / IMPACTO: papéis necessários + áreas de aplicação ]

[ RODAPÉ: CTA final + créditos do edital ]

Elemento de assinatura (o que torna essa página inconfundível): uma onda sonora (waveform) minimalista, desenhada em SVG, que atravessa o hero como elemento gráfico central — não decorativo, mas literal: ela representa a descrição do ambiente sendo convertida em áudio, o núcleo do produto. Ao rolar a página, a onda pode se contrair suavemente até virar uma linha reta fina que "costura" as seções seguintes (respeitando prefers-reduced-motion — ver Seção 5). Se quiser um momento interativo real: um botão no hero ("Ouvir uma descrição de exemplo") que reproduz um áudio curto sintetizado descrevendo uma cena simples, demonstrando ao vivo o que o produto faz — isso é mais forte do que qualquer imagem estática, porque o produto inteiro é sobre áudio, não sobre tela.

3. Conteúdo por seção (copy de referência — adapte o tom, mas mantenha a substância)

Hero

Headline: algo na linha de "Os olhos que faltam para o mundo enxergar você de volta" ou "Autonomia que não parece equipamento médico" — teste variações, mas a ideia central é hands-free + sem estigma, não uma lista de features.

Subheadline: uma frase explicando que o Luminate une os Meta Glasses e um app companion para descrever o ambiente, ler textos e conectar a uma rede de apoio, tudo por voz.

CTA primário: "Ver como funciona" (rola para a seção Solução) — CTA secundário opcional: "Ouvir uma descrição de exemplo".

Problema

Estatística central: 3,4% da população brasileira — cerca de 6,9 milhões de pessoas — declara muita dificuldade ou incapacidade de enxergar (PNS 2019/IBGE).

Reforço: bengala e cão-guia não cobrem obstáculos acima da linha da cintura; soluções existentes resolvem só pedaços do problema (leitura de tela, videochamada, bengala eletrônica) e nenhuma é hands-free de ponta a ponta.

Solução — três blocos lado a lado (ou empilhados no mobile)

Óculos — percepção: câmera e microfone captam o ambiente; alto-falante open-ear devolve tudo por voz — descrição de cena, leitura de texto, alerta de obstáculo.

App — cérebro: Edge AI local ajusta o ritmo de captura conforme o movimento do usuário (parado = câmera desligada; andando = 1 frame a cada poucos segundos), poupando bateria; IA em nuvem entra sob demanda para perguntas mais complexas.

Rede de apoio: quando a IA não resolve, uma videochamada silenciosa conecta o usuário a um voluntário ou familiar, que enxerga o feed da câmera dos óculos e guia em tempo real.

Diferencial — cards ou tabela comparando Luminate a bengala eletrônica, OrCam MyEye, Envision Glasses e Be My Eyes, destacando em cada caso a mesma conclusão: nenhum concorrente é hands-free e livre de estigma e multifuncional ao mesmo tempo.

Ética & privacidade — três princípios curtos: consentimento explícito antes de qualquer captura; câmera focada em objetos e espaços, não em rostos de terceiros; dados tratados conforme a LGPD, sem retenção além do necessário.

Equipe / impacto — áreas de aplicação (mobilidade urbana, compras, saúde, emergências) e um convite institucional (ex.: "Projeto em desenvolvimento para o Programa AI Glasses Brasil — CEIA/UFG/FUNAPE + Meta").

Rodapé — CTA final (contato, link para o documento de proposta) + crédito ao edital.

4. Requisitos técnicos

HTML semântico (<header>, <main>, <section>, <footer>, hierarquia de headings correta — um único <h1>).

CSS com variáveis (:root { --azul-meta: ... }) derivadas exatamente da paleta acima — nada de cores soltas no meio do código.

Totalmente responsivo (mobile-first ou com breakpoints claros em ~640px e ~1024px).

Sem dependências pesadas; se precisar de ícones, usar SVG inline.

Performance: imagens/SVGs otimizados, sem bibliotecas de animação pesadas — a onda sonora do hero pode ser CSS/SVG puro.

5. Acessibilidade — não é opcional, é o argumento central do produto

Contraste mínimo AA (4.5:1) em todo texto, testado especialmente onde --cinza-grafite aparece sobre --cinza-nevoa.

Foco de teclado sempre visível (outline customizado, nunca outline: none sem substituto).

Toda imagem/ícone com alt significativo; a onda sonora do hero deve ter aria-hidden="true" se for puramente decorativa, ou uma descrição textual se carregar informação.

Respeitar prefers-reduced-motion: qualquer animação (incluindo a onda sonora) precisa de uma versão estática equivalente.

Navegação 100% possível via teclado, incluindo os anchors do menu e o botão de áudio de exemplo.

Se incluir o botão "Ouvir uma descrição de exemplo", garantir controle de play/pause acessível e não iniciar áudio automaticamente.

6. Instruções finais para o agente

Antes de gerar o código, valide mentalmente o plano de design contra este brief: a paleta e a tipografia batem com "institucional, técnico, minimalista, sem clichê de IA"? O elemento de assinatura (onda sonora) está de fato ligado ao produto, não é decoração genérica? Só depois disso, escreva o código completo em um único arquivo (HTML com CSS e JS embutidos), pronto para abrir no navegador sem build step.





Prompt de apoio para a materialização visual da proposta Luminate — Etapa 1 do Edital AI Glasses Brasil (CEIA/UFG/FUNAPE + Meta).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/12c0e6a6-1287-437d-bf29-7b3d8d2bf832).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
