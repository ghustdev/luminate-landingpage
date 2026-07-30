import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const TITLE = "Luminate — Autonomia hands-free para pessoas cegas";
const DESC =
  "Luminate une os Meta AI Glasses a um app companion para descrever o ambiente, ler textos e acionar uma rede de apoio humana — tudo por voz, sem tela e sem estigma.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- Signature element: waveform ---------- */
function Waveform({ compact = false }: { compact?: boolean }) {
  const bars = 64;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 120"
      className={compact ? "h-8 w-full" : "h-28 w-full sm:h-36"}
      preserveAspectRatio="none"
    >
      {Array.from({ length: bars }).map((_, i) => {
        const t = i / (bars - 1);
        const env = Math.sin(Math.PI * t) ** 0.8;
        const r2 = (n: number) => Math.round(n * 100) / 100;
        const h = r2((14 + env * 92 * (0.55 + 0.45 * Math.sin(i * 1.7))) * (compact ? 0.25 : 1));
        return (
          <rect
            key={i}
            className="lum-bar"
            x={i * 10 + 2.5}
            y={r2(60 - Math.abs(h) / 2)}
            width="4"
            height={r2(Math.max(4, Math.abs(h)))}
            rx="2"
            fill={i % 6 === 0 ? "var(--azul-meta)" : "var(--azul-profundo)"}
            opacity={r2(0.25 + env * 0.75)}
            style={{ animationDelay: `${(i % 12) * 0.12}s` }}
          />
        );
      })}
    </svg>
  );
}

/* ---------- Example audio (Web Speech, no autoplay) ---------- */
const SAMPLE =
  "Calçada larga à sua frente, livre por cerca de dez metros. À direita, um poste a dois passos. Adiante, à esquerda, a entrada da farmácia com dois degraus. Uma pessoa se aproxima pela direita.";

function SampleAudioButton() {
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);
  const uttRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window)
        window.speechSynthesis.cancel();
    };
  }, []);

  const toggle = () => {
    if (!supported) return;
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(SAMPLE);
    u.lang = "pt-BR";
    u.rate = 1;
    u.onend = () => setPlaying(false);
    u.onerror = () => setPlaying(false);
    uttRef.current = u;
    window.speechSynthesis.speak(u);
    setPlaying(true);
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-azul-profundo/20 bg-branco px-6 py-3 text-base font-medium text-azul-profundo transition-colors hover:bg-cinza-nevoa"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="currentColor">
          {playing ? (
            <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
          ) : (
            <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5z" />
          )}
        </svg>
        {playing ? "Parar descrição de exemplo" : "Ouvir uma descrição de exemplo"}
      </button>
      <p className="max-w-md text-sm text-cinza-grafite">
        {supported ? (
          <>
            Exemplo do que o Luminate diria: <span className="italic">“{SAMPLE}”</span>
          </>
        ) : (
          <>Seu navegador não reproduz voz sintetizada. Texto do exemplo: “{SAMPLE}”</>
        )}
      </p>
    </div>
  );
}

/* ---------- Icons ---------- */
const Icon = ({ d }: { d: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-7"
  >
    <path d={d} />
  </svg>
);

const NAV = [
  { href: "#problema", label: "Problema" },
  { href: "#solucao", label: "Solução" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#equipe", label: "Equipe" },
];

const PILARES = [
  {
    tag: "Óculos",
    title: "Percepção contínua",
    icon: "M2 12h3m14 0h3M5 12a3.5 3.5 0 1 0 7 0 3.5 3.5 0 1 0-7 0m7 0a3.5 3.5 0 1 0 7 0 3.5 3.5 0 1 0-7 0",
    body: "Câmera e microfone captam o ambiente. O alto-falante open-ear devolve tudo por voz: descrição de cena, leitura de texto e alerta de obstáculo — sem display, sem mãos ocupadas.",
  },
  {
    tag: "App",
    title: "O cérebro no bolso",
    icon: "M12 3a4 4 0 0 0-4 4v1a3 3 0 0 0 0 6v1a4 4 0 0 0 8 0v-1a3 3 0 0 0 0-6V7a4 4 0 0 0-4-4Z",
    body: "Edge AI local ajusta o ritmo de captura ao movimento — parado, a câmera desliga; andando, um frame a cada poucos segundos. A IA em nuvem entra só sob demanda, poupando bateria.",
  },
  {
    tag: "Rede",
    title: "Apoio humano real",
    icon: "M17 20v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0M22 20v-1a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    body: "Quando a IA não resolve, uma videochamada silenciosa conecta o usuário a um voluntário ou familiar, que vê o feed dos óculos e orienta em tempo real.",
  },
];

const COMPARE = [
  { nome: "Bengala / cão-guia", hf: true, est: false, multi: false, nota: "Não cobre obstáculos acima da cintura" },
  { nome: "OrCam MyEye", hf: true, est: false, multi: false, nota: "Alto custo e aparência de equipamento médico" },
  { nome: "Envision Glasses", hf: true, est: false, multi: true, nota: "Nicho, caro e visualmente destacado" },
  { nome: "Be My Eyes", hf: false, est: true, multi: false, nota: "Exige segurar o celular na frente do rosto" },
  { nome: "Luminate", hf: true, est: true, multi: true, nota: "Hands-free, sem estigma e multifuncional", destaque: true },
];

function Mark({ ok }: { ok: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`size-5 ${ok ? "text-azul-meta" : "text-cinza-grafite"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      >
        {ok ? <path d="M4 12.5 9.5 18 20 6.5" /> : <path d="M6 6l12 12M18 6 6 18" />}
      </svg>
      <span className="sr-only">{ok ? "Sim" : "Não"}</span>
    </span>
  );
}

function Index() {
  return (
    <div className="min-h-dvh bg-branco text-preto-quase">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-azul-meta focus:px-4 focus:py-2 focus:text-base focus:text-branco"
      >
        Pular para o conteúdo
      </a>

      <header className="sticky top-0 z-40 border-b border-azul-profundo/10 bg-branco/85 backdrop-blur">
        <nav
          aria-label="Principal"
          className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4"
        >
          <a href="#conteudo" className="flex items-center gap-2.5">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6">
              <rect x="1" y="9" width="3" height="6" rx="1.5" fill="var(--azul-profundo)" />
              <rect x="6.5" y="4" width="3" height="16" rx="1.5" fill="var(--azul-meta)" />
              <rect x="12" y="7" width="3" height="10" rx="1.5" fill="var(--azul-profundo)" />
              <rect x="17.5" y="10" width="3" height="4" rx="1.5" fill="var(--azul-meta)" />
            </svg>
            <span className="font-display text-lg font-bold tracking-tight text-azul-profundo">
              Luminate
            </span>
          </a>
          <ul className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="text-base text-cinza-grafite transition-colors hover:text-azul-meta"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            className="inline-flex min-h-11 items-center rounded-full bg-azul-meta px-5 text-base font-medium text-branco transition-colors hover:bg-[var(--azul-meta-hover)]"
          >
            Falar com a equipe
          </a>
        </nav>
      </header>

      <main id="conteudo">
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-20 sm:pt-28">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-azul-meta/25 bg-azul-meta/5 px-4 py-1.5 text-sm font-medium text-azul-meta">
            Programa AI Glasses Brasil · CEIA/UFG · Meta
          </p>
          <h1 className="max-w-4xl text-[2.125rem] font-bold leading-[1.05] text-azul-profundo sm:text-5xl lg:text-[3.75rem]">
            Autonomia que não parece equipamento médico.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-cinza-grafite sm:text-xl">
            O Luminate une os Meta AI Glasses a um app companion para descrever o ambiente, ler
            textos e acionar uma rede de apoio humana — tudo por voz, com as mãos livres.
          </p>
          <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
            <a
              href="#solucao"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-azul-meta px-7 text-base font-medium text-branco transition-colors hover:bg-[var(--azul-meta-hover)]"
            >
              Ver como funciona
            </a>
            <SampleAudioButton />
          </div>
          <div className="mt-14">
            <Waveform />
            <p className="mt-4 text-sm text-cinza-grafite">
              A onda representa a descrição do ambiente sendo convertida em áudio — o núcleo do
              produto.
            </p>
          </div>
        </section>

        <div className="lum-seam mx-auto h-px max-w-6xl" />

        {/* PROBLEMA */}
        <section id="problema" className="bg-cinza-nevoa py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-3xl font-bold text-azul-profundo sm:text-4xl">O problema</h2>
              <p className="mt-5 font-display text-6xl font-bold leading-none text-azul-meta sm:text-7xl">
                6,9 mi
              </p>
              <p className="mt-3 max-w-sm text-base text-cinza-grafite">
                de brasileiros — 3,4% da população — declaram muita dificuldade ou incapacidade de
                enxergar (PNS 2019 / IBGE).
              </p>
            </div>
            <ul className="space-y-5">
              {[
                "Bengala e cão-guia não detectam obstáculos acima da linha da cintura — galhos, toldos, caçambas e portas abertas seguem invisíveis.",
                "Apps de leitura e videochamada funcionam, mas exigem segurar o celular na frente do rosto: uma mão ocupada e uma barreira social.",
                "Óculos assistivos de nicho são caros e anunciam a deficiência antes da pessoa — resolvem percepção, mas custam estigma.",
              ].map((t) => (
                <li
                  key={t}
                  className="rounded-2xl border border-azul-profundo/10 bg-branco p-6 text-base text-preto-quase"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SOLUÇÃO */}
        <section id="solucao" className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="max-w-2xl text-3xl font-bold text-azul-profundo sm:text-4xl">
              Um ecossistema hands-free em três partes
            </h2>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {PILARES.map((p) => (
                <article
                  key={p.tag}
                  className="flex flex-col rounded-3xl border border-azul-profundo/10 p-8 transition-colors hover:border-azul-meta/40"
                >
                  <span className="text-azul-meta">
                    <Icon d={p.icon} />
                  </span>
                  <p className="mt-6 text-sm font-medium uppercase tracking-widest text-cinza-grafite">
                    {p.tag}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-azul-profundo">{p.title}</h3>
                  <p className="mt-4 text-base text-cinza-grafite">{p.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 rounded-3xl bg-azul-profundo p-8 text-branco sm:p-10">
              <h3 className="text-2xl font-semibold">O Waze da Acessibilidade</h3>
              <p className="mt-3 max-w-3xl text-base text-branco/80">
                Cada obstáculo detectado é enviado de forma anônima para um mapa coletivo. Quanto
                mais pessoas usam o Luminate, mais preciso fica o mapeamento urbano de
                acessibilidade — e mais cedo o próximo usuário é avisado.
              </p>
            </div>
          </div>
        </section>

        <div className="lum-seam mx-auto h-px max-w-6xl" />

        {/* DIFERENCIAIS */}
        <section id="diferenciais" className="bg-cinza-nevoa py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-3xl font-bold text-azul-profundo sm:text-4xl">
              Nenhuma solução resolve as duas pontas
            </h2>
            <p className="mt-4 max-w-2xl text-base text-cinza-grafite">
              Percepção contínua do ambiente e ausência de estigma visual, ao mesmo tempo.
            </p>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <caption className="sr-only">
                  Comparação entre Luminate e soluções existentes quanto a operação hands-free,
                  ausência de estigma e multifuncionalidade
                </caption>
                <thead>
                  <tr className="border-b border-azul-profundo/15">
                    {["Solução", "Hands-free", "Sem estigma", "Multifuncional", "Limite principal"].map(
                      (h) => (
                        <th
                          key={h}
                          scope="col"
                          className="px-4 py-4 text-sm font-semibold uppercase tracking-wider text-cinza-grafite"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((r) => (
                    <tr
                      key={r.nome}
                      className={`border-b border-azul-profundo/10 ${
                        r.destaque ? "bg-branco" : ""
                      }`}
                    >
                      <th
                        scope="row"
                        className={`px-4 py-5 text-base font-semibold ${
                          r.destaque ? "text-azul-meta" : "text-azul-profundo"
                        }`}
                      >
                        {r.nome}
                      </th>
                      <td className="px-4 py-5">
                        <Mark ok={r.hf} />
                      </td>
                      <td className="px-4 py-5">
                        <Mark ok={r.est} />
                      </td>
                      <td className="px-4 py-5">
                        <Mark ok={r.multi} />
                      </td>
                      <td className="px-4 py-5 text-base text-cinza-grafite">{r.nota}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ÉTICA */}
        <section id="etica" className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-3xl font-bold text-azul-profundo sm:text-4xl">
              Ética e privacidade
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                ["Consentimento explícito", "Nenhuma captura acontece sem ação e ciência do usuário. O controle é sempre por voz e sempre reversível."],
                ["Foco em espaços, não em rostos", "A visão computacional é orientada a objetos, textos e obstáculos — não à identificação de terceiros."],
                ["LGPD por padrão", "Dados tratados conforme a LGPD, com minimização e sem retenção além do estritamente necessário."],
              ].map(([t, d], i) => (
                <div key={t} className="border-t-2 border-azul-meta pt-5">
                  <p className="font-display text-sm font-bold text-azul-meta">0{i + 1}</p>
                  <h3 className="mt-2 text-xl font-semibold text-azul-profundo">{t}</h3>
                  <p className="mt-3 text-base text-cinza-grafite">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EQUIPE / IMPACTO */}
        <section id="equipe" className="bg-cinza-nevoa py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-azul-profundo sm:text-4xl">
                Equipe e impacto
              </h2>
              <p className="mt-4 text-base text-cinza-grafite">
                Projeto em desenvolvimento para o Programa AI Glasses Brasil — CEIA/UFG/FUNAPE +
                Meta. Buscamos parceiros e perfis para a próxima etapa.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Engenharia de Edge AI",
                  "Visão computacional multimodal",
                  "Design de interação por voz",
                  "Pesquisa com usuários cegos",
                  "Mobile (app companion)",
                  "Ética, dados e LGPD",
                ].map((p) => (
                  <li
                    key={p}
                    className="rounded-xl bg-branco px-4 py-3 text-base text-preto-quase"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-azul-profundo">Áreas de aplicação</h3>
              <dl className="mt-6 space-y-6">
                {[
                  ["Mobilidade urbana", "Rotas guiadas por GPS acessível, com alerta de obstáculos em tempo real."],
                  ["Compras", "Leitura de rótulos, preços e validades sem precisar pedir ajuda."],
                  ["Saúde", "Identificação de medicamentos, bulas e orientações impressas."],
                  ["Emergências", "Acionamento imediato da rede de apoio humano por voz."],
                ].map(([t, d]) => (
                  <div key={t} className="border-l-2 border-azul-meta pl-5">
                    <dt className="text-lg font-semibold text-azul-profundo">{t}</dt>
                    <dd className="mt-1 text-base text-cinza-grafite">{d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer id="contato" className="bg-azul-profundo py-20 text-branco sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Waveform compact />
          <h2 className="mt-8 max-w-3xl text-3xl font-bold sm:text-4xl">
            Vamos construir a próxima etapa do Luminate juntos.
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:contato@luminate.app"
              className="inline-flex min-h-12 items-center rounded-full bg-branco px-7 text-base font-medium text-azul-profundo transition-opacity hover:opacity-90"
            >
              Falar com a equipe
            </a>
            <a
              href="#solucao"
              className="inline-flex min-h-12 items-center rounded-full border border-branco/40 px-7 text-base font-medium text-branco transition-colors hover:bg-branco/10"
            >
              Rever a proposta
            </a>
          </div>
          <p className="mt-12 max-w-2xl text-sm text-branco/70">
            Luminate · Proposta submetida ao edital do Programa AI Glasses Brasil — CEIA/UFG /
            FUNAPE em parceria com a Meta. Dados de prevalência: PNS 2019 / IBGE.
          </p>
        </div>
      </footer>
    </div>
  );
}
