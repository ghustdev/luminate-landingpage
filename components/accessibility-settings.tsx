'use client'

/**
 * AccessibilitySettings — centro de controle da experiência.
 *
 * ACESSIBILIDADE:
 * - Cada ajuste é um <button role="switch"> com `aria-checked`, ou um grupo
 *   `radiogroup`, para leitores de tela anunciarem o estado corretamente.
 * - Ao mudar a velocidade da voz, uma frase de amostra é falada imediatamente
 *   naquela velocidade (feedback multissensorial: ouvir o resultado).
 * - Estados nunca dependem só de cor: há texto ("Ligado"/"Desligado") e ícone.
 * - Alvos de toque com no mínimo 56px de altura.
 */

import { useState } from 'react'
import {
  Bluetooth,
  BluetoothOff,
  Camera,
  Contrast,
  Gauge,
  MapPinned,
  Mic,
  Type,
  Vibrate,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLuminate } from '@/lib/luminate-store'
import { speak } from '@/lib/speech-service'
import type { SpeechRate } from '@/lib/speech-service'
import { cn } from '@/lib/utils'

const RATES: { value: SpeechRate; label: string }[] = [
  { value: 1, label: '1x' },
  { value: 1.5, label: '1,5x' },
  { value: 2, label: '2x' },
  { value: 2.5, label: '2,5x' },
  { value: 3, label: '3x' },
]

const FONT_SCALES: { value: 1 | 1.15 | 1.3 | 1.5; label: string }[] = [
  { value: 1, label: 'Padrão' },
  { value: 1.15, label: 'Grande' },
  { value: 1.3, label: 'Maior' },
  { value: 1.5, label: 'Máximo' },
]

export function AccessibilitySettings() {
  const { prefs, updatePrefs, glasses, connect, disconnect, say, buzz } = useLuminate()

  return (
    <div className="mt-5 flex flex-col gap-7">
      {/* ---------------- Voz ---------------- */}
      <section aria-labelledby="sec-voz" className="flex flex-col gap-4">
        <h2 id="sec-voz" className="flex items-center gap-2 text-xl font-black tracking-tight">
          <Gauge aria-hidden="true" className="text-primary size-5" />
          Voz e leitura
        </h2>

        <fieldset className="flex flex-col gap-3">
          <legend className="text-base font-bold">Velocidade da fala</legend>
          <p id="ajuda-velocidade" className="text-muted-foreground text-sm leading-relaxed">
            Usuários experientes de leitor de tela costumam preferir 2x ou mais.
          </p>
          <div
            role="radiogroup"
            aria-labelledby="sec-voz"
            aria-describedby="ajuda-velocidade"
            className="flex flex-wrap gap-2"
          >
            {RATES.map((rate) => {
              const active = prefs.speechRate === rate.value
              return (
                <button
                  key={rate.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    updatePrefs({ speechRate: rate.value })
                    buzz('light')
                    speak(`Velocidade ${rate.label}. Esta é a nova velocidade da voz.`, {
                      rate: rate.value,
                    })
                  }}
                  className={cn(
                    'min-h-14 min-w-16 flex-1 rounded-xl border text-base font-black',
                    active
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card border-border text-foreground',
                  )}
                >
                  {rate.label}
                  {active && <span className="sr-only">, selecionado</span>}
                </button>
              )
            })}
          </div>
        </fieldset>

        <ToggleRow
          label="Retorno por voz"
          description="Fala automática das descrições e dos avisos do app."
          checked={prefs.ttsEnabled}
          onIcon={Volume2}
          offIcon={VolumeX}
          onChange={(next) => {
            updatePrefs({ ttsEnabled: next })
            if (next) speak('Retorno por voz ligado.')
            else say('Retorno por voz desligado.')
          }}
        />
      </section>

      {/* ---------------- Visual ---------------- */}
      <section aria-labelledby="sec-visual" className="flex flex-col gap-4">
        <h2
          id="sec-visual"
          className="flex items-center gap-2 text-xl font-black tracking-tight"
        >
          <Contrast aria-hidden="true" className="text-primary size-5" />
          Visão e contraste
        </h2>

        <ToggleRow
          label="Alto contraste reforçado"
          description="Bordas mais fortes e texto em preto sobre branco puro."
          checked={prefs.highContrast}
          onIcon={Contrast}
          offIcon={Contrast}
          onChange={(next) => {
            updatePrefs({ highContrast: next })
            say(next ? 'Alto contraste ligado.' : 'Alto contraste desligado.')
          }}
        />

        <fieldset className="flex flex-col gap-3">
          <legend className="flex items-center gap-2 text-base font-bold">
            <Type aria-hidden="true" className="size-4" />
            Tamanho do texto
          </legend>
          <div role="radiogroup" aria-label="Tamanho do texto" className="flex flex-wrap gap-2">
            {FONT_SCALES.map((scale) => {
              const active = prefs.fontScale === scale.value
              return (
                <button
                  key={scale.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    updatePrefs({ fontScale: scale.value })
                    say(`Tamanho do texto: ${scale.label}.`)
                  }}
                  className={cn(
                    'min-h-14 flex-1 rounded-xl border px-3 text-base font-black',
                    active
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card border-border text-foreground',
                  )}
                >
                  {scale.label}
                  {active && <span className="sr-only">, selecionado</span>}
                </button>
              )
            })}
          </div>
        </fieldset>
      </section>

      {/* ---------------- Sensores ---------------- */}
      <section aria-labelledby="sec-sensores" className="flex flex-col gap-4">
        <h2
          id="sec-sensores"
          className="flex items-center gap-2 text-xl font-black tracking-tight"
        >
          <Vibrate aria-hidden="true" className="text-primary size-5" />
          Feedback e sensores
        </h2>

        <ToggleRow
          label="Vibração"
          description="Confirma toques e alertas com um pulso curto."
          checked={prefs.hapticsEnabled}
          onIcon={Vibrate}
          offIcon={Vibrate}
          onChange={(next) => {
            updatePrefs({ hapticsEnabled: next })
            say(next ? 'Vibração ligada.' : 'Vibração desligada.')
          }}
        />

        <ToggleRow
          label="Mapeamento em segundo plano"
          description="Registra tropeços detectados pelo acelerômetro no mapa da comunidade."
          checked={prefs.backgroundMapping}
          onIcon={MapPinned}
          offIcon={MapPinned}
          onChange={(next) => {
            updatePrefs({ backgroundMapping: next })
            say(
              next
                ? 'Mapeamento em segundo plano ligado.'
                : 'Mapeamento em segundo plano desligado.',
            )
          }}
        />

        <ToggleRow
          label="Descrever a cena automaticamente"
          description="A câmera dos óculos descreve o ambiente a cada 30 segundos durante a caminhada."
          checked={prefs.autoDescribe}
          onIcon={Camera}
          offIcon={Camera}
          onChange={(next) => {
            updatePrefs({ autoDescribe: next })
            say(next ? 'Descrição automática ligada.' : 'Descrição automática desligada.')
          }}
        />
      </section>

      {/* ---------------- Óculos ---------------- */}
      <section aria-labelledby="sec-oculos" className="flex flex-col gap-4">
        <h2
          id="sec-oculos"
          className="flex items-center gap-2 text-xl font-black tracking-tight"
        >
          <Bluetooth aria-hidden="true" className="text-primary size-5" />
          Óculos conectados
        </h2>

        <div className="border-border bg-card flex flex-col gap-1 rounded-2xl border p-4">
          <p className="text-lg font-black">{glasses.deviceName}</p>
          <p className="text-muted-foreground text-sm font-bold">
            Firmware {glasses.firmware} ·{' '}
            {glasses.status === 'connected'
              ? `Conectado · ${glasses.battery}% de bateria`
              : glasses.status === 'connecting'
                ? 'Conectando…'
                : 'Desconectado'}
          </p>
        </div>

        {glasses.status === 'connected' ? (
          <Button
            variant="outline"
            onClick={disconnect}
            className="min-h-16 w-full justify-start gap-3 rounded-2xl text-lg font-black"
          >
            <BluetoothOff aria-hidden="true" className="size-6" />
            Desconectar os óculos
          </Button>
        ) : (
          <Button
            onClick={connect}
            className="min-h-16 w-full justify-start gap-3 rounded-2xl text-lg font-black"
          >
            <Bluetooth aria-hidden="true" className="size-6" />
            Conectar os óculos
          </Button>
        )}
      </section>

      {/* ---------------- Permissões ---------------- */}
      <PermissionsSection />
    </div>
  )
}

/** Linha de ajuste liga/desliga com semântica de switch. */
function ToggleRow({
  label,
  description,
  checked,
  onChange,
  onIcon: OnIcon,
  offIcon: OffIcon,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (next: boolean) => void
  onIcon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' }>
  offIcon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' }>
}) {
  const Icon = checked ? OnIcon : OffIcon
  const descId = `desc-${label.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-describedby={descId}
      onClick={() => onChange(!checked)}
      className="border-border bg-card flex min-h-16 w-full items-center gap-3 rounded-2xl border p-4 text-left"
    >
      <span
        aria-hidden="true"
        className={cn(
          'flex size-11 shrink-0 items-center justify-center rounded-xl',
          checked ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground',
        )}
      >
        <Icon className="size-6" />
      </span>

      <span className="flex flex-1 flex-col gap-0.5">
        <span className="text-base leading-tight font-black">{label}</span>
        <span id={descId} className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </span>
      </span>

      {/* Estado em texto: não dependemos apenas de cor ou posição */}
      <span
        className={cn(
          'shrink-0 rounded-lg px-2 py-1 text-xs font-black uppercase',
          checked ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground',
        )}
      >
        {checked ? 'Ligado' : 'Desligado'}
      </span>
    </button>
  )
}

/** Solicita permissões reais do navegador (microfone, câmera, localização). */
function PermissionsSection() {
  const { say, buzz } = useLuminate()
  const [status, setStatus] = useState<Record<string, string>>({})

  const request = async (
    key: 'mic' | 'camera' | 'geo',
    label: string,
    run: () => Promise<void>,
  ) => {
    try {
      await run()
      setStatus((s) => ({ ...s, [key]: 'Permitido' }))
      buzz('success')
      say(`${label} permitido.`)
    } catch {
      setStatus((s) => ({ ...s, [key]: 'Bloqueado' }))
      buzz('error')
      say(`${label} bloqueado. Ajuste nas configurações do navegador.`)
    }
  }

  const items = [
    {
      key: 'mic' as const,
      label: 'Microfone',
      icon: Mic,
      hint: 'Necessário para os comandos de voz.',
      run: async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        stream.getTracks().forEach((t) => t.stop())
      },
    },
    {
      key: 'camera' as const,
      label: 'Câmera',
      icon: Camera,
      hint: 'Necessária para a descrição de cenas pela IA.',
      run: async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        stream.getTracks().forEach((t) => t.stop())
      },
    },
    {
      key: 'geo' as const,
      label: 'Localização',
      icon: MapPinned,
      hint: 'Necessária para o mapa colaborativo de obstáculos.',
      run: () =>
        new Promise<void>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(
            () => resolve(),
            () => reject(new Error('denied')),
          ),
        ),
    },
  ]

  return (
    <section aria-labelledby="sec-permissoes" className="flex flex-col gap-4">
      <h2
        id="sec-permissoes"
        className="flex items-center gap-2 text-xl font-black tracking-tight"
      >
        <Mic aria-hidden="true" className="text-primary size-5" />
        Permissões
      </h2>

      <ul className="flex flex-col gap-3">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.key}>
              <button
                type="button"
                onClick={() => request(item.key, item.label, item.run)}
                className="border-border bg-card flex min-h-16 w-full items-center gap-3 rounded-2xl border p-4 text-left"
              >
                <span
                  aria-hidden="true"
                  className="bg-secondary text-foreground flex size-11 shrink-0 items-center justify-center rounded-xl"
                >
                  <Icon className="size-6" />
                </span>
                <span className="flex flex-1 flex-col gap-0.5">
                  <span className="text-base font-black">{item.label}</span>
                  <span className="text-muted-foreground text-sm leading-relaxed">
                    {item.hint}
                  </span>
                </span>
                <span className="text-muted-foreground shrink-0 text-xs font-black uppercase">
                  {status[item.key] ?? 'Verificar'}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <p role="status" aria-live="polite" className="sr-only">
        {Object.entries(status)
          .map(([k, v]) => `${k}: ${v}`)
          .join('. ')}
      </p>
    </section>
  )
}
