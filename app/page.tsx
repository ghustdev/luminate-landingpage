import Link from 'next/link'
import { Eye, Map, Users } from 'lucide-react'
import { GlassesStatusCard } from '@/components/glasses-status-card'
import { VoiceButton } from '@/components/voice-button'
import { BackgroundMappingBanner } from '@/components/background-mapping-banner'

/**
 * Tela Inicial (Home).
 *
 * ORDEM DE FOCO (top-down, lógica):
 *   1. Título da página (h1)
 *   2. Botão gigante de comando de voz  <- ação primária, vem antes de tudo
 *   3. Status dos óculos
 *   4. Atalhos secundários
 *   5. Serviço de mapeamento em background
 */
export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 pt-2">
      <div>
        <h1 className="text-3xl leading-tight font-black text-balance">Luminate</h1>
        <p className="text-muted-foreground mt-1 text-base leading-relaxed">
          Seu assistente de visão e navegação. Fale um comando ou toque na haste dos óculos.
        </p>
      </div>

      {/* Ação primária: primeira no DOM para o leitor de tela alcançar rápido */}
      <VoiceButton />

      <GlassesStatusCard />

      <nav aria-labelledby="titulo-atalhos" className="flex flex-col gap-3">
        <h2 id="titulo-atalhos" className="text-xl font-black">
          Atalhos
        </h2>
        <ul className="flex flex-col gap-3">
          <ShortcutItem
            href="/visao"
            label="Descrever a cena"
            hint="Usa a câmera dos óculos e a IA para descrever o ambiente em voz alta"
            icon="eye"
          />
          <ShortcutItem
            href="/apoio"
            label="Chamar a Rede de Apoio"
            hint="Inicia uma videochamada com um familiar ou voluntário de plantão"
            icon="users"
          />
          <ShortcutItem
            href="/mapa"
            label="Mapa de obstáculos"
            hint="Vê e registra obstáculos mapeados pela comunidade perto de você"
            icon="map"
          />
        </ul>
      </nav>

      <BackgroundMappingBanner />
    </div>
  )
}

/**
 * ShortcutItem — link de atalho com alvo de toque de 72px.
 * `aria-describedby` cumpre o papel do accessibilityHint: explica o RESULTADO
 * da ação, enquanto o rótulo diz apenas O QUE é.
 */
function ShortcutItem({
  href,
  label,
  hint,
  icon,
}: {
  href: string
  label: string
  hint: string
  icon: 'eye' | 'users' | 'map'
}) {
  const Icon = icon === 'eye' ? Eye : icon === 'users' ? Users : Map
  const hintId = `hint-${href.replace('/', '')}`

  return (
    <li>
      <Link
        href={href}
        aria-label={label}
        aria-describedby={hintId}
        className="border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground flex min-h-18 items-center gap-4 rounded-2xl border-2 p-4"
      >
        <Icon aria-hidden="true" className="text-primary size-8 shrink-0" />
        <span className="flex flex-col gap-0.5">
          <span className="text-lg leading-tight font-bold">{label}</span>
          <span id={hintId} className="text-muted-foreground text-sm leading-snug">
            {hint}
          </span>
        </span>
      </Link>
    </li>
  )
}
