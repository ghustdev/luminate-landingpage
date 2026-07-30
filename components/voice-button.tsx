'use client'

/**
 * VoiceButton — botão central gigante (~50% da tela) para comandos de voz.
 *
 * ACESSIBILIDADE (pontos-chave):
 * - `role="button"` implícito no <button>, com `aria-label` descritivo e
 *   `aria-describedby` apontando para a dica de uso (equivale ao
 *   accessibilityLabel + accessibilityHint do React Native).
 * - `aria-pressed` comunica o estado ligado/desligado da escuta.
 * - Área de toque enorme (min-h-64) — muito acima dos 44x44pt exigidos.
 * - Estado transmitido por TEXTO ("Ouvindo…"), não apenas por cor/animação.
 * - Haptics + TTS a cada mudança de estado: feedback tátil e sonoro.
 * - O foco permanece no botão após o uso, para não perder o usuário na tela.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Mic, MicOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLuminate } from '@/lib/luminate-store'
import { isRecognitionSupported, startListening } from '@/lib/speech-service'
import { parseVoiceCommand } from '@/lib/voice-commands'

type Phase = 'idle' | 'listening' | 'processing'

export function VoiceButton() {
  const router = useRouter()
  const { say, buzz, glasses, addPin } = useLuminate()
  const [phase, setPhase] = useState<Phase>('idle')
  const [transcript, setTranscript] = useState('')
  const handleRef = useRef<{ stop: () => void } | null>(null)

  useEffect(() => () => handleRef.current?.stop(), [])

  const runIntent = useCallback(
    (text: string) => {
      const intent = parseVoiceCommand(text)
      say(intent.spoken, 'assertive')
      buzz('success')

      switch (intent.kind) {
        case 'describe':
        case 'read-text':
          router.push(intent.kind === 'read-text' ? '/visao?modo=texto' : '/visao?modo=cena')
          break
        case 'call-support':
          router.push('/apoio')
          break
        case 'map':
          router.push('/mapa')
          break
        case 'report-obstacle':
          // Registra na posição aproximada atual (fallback: centro do mapa semente).
          navigator.geolocation?.getCurrentPosition(
            (pos) => {
              addPin({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                type: 'outro',
                note: 'Obstáculo relatado por voz',
                source: 'manual',
              })
              say('Obstáculo registrado e compartilhado com a rede.', 'polite')
            },
            () => {
              addPin({
                lat: -23.5629,
                lng: -46.6544,
                type: 'outro',
                note: 'Obstáculo relatado por voz (posição aproximada)',
                source: 'manual',
              })
              say('Obstáculo registrado com posição aproximada.', 'polite')
            },
          )
          break
        case 'battery':
          say(
            glasses.status === 'connected'
              ? `Óculos conectados com ${glasses.battery} por cento de bateria.`
              : 'Os óculos estão desconectados.',
            'assertive',
          )
          break
        case 'settings':
          router.push('/ajustes')
          break
        default:
          break
      }
    },
    [router, say, buzz, glasses, addPin],
  )

  const stop = useCallback(() => {
    handleRef.current?.stop()
    handleRef.current = null
    setPhase('idle')
  }, [])

  const start = useCallback(() => {
    buzz('light')
    setTranscript('')

    if (!isRecognitionSupported()) {
      // Fallback demonstrativo quando o navegador não tem Speech Recognition.
      setPhase('processing')
      say('Reconhecimento de voz indisponível. Usando comando de exemplo.', 'assertive')
      window.setTimeout(() => {
        const demo = 'Descreva o que está à minha frente'
        setTranscript(demo)
        setPhase('idle')
        runIntent(demo)
      }, 1200)
      return
    }

    setPhase('listening')
    say('Ouvindo. Fale o seu comando.', 'assertive')

    handleRef.current = startListening({
      onResult: (text) => {
        setTranscript(text)
        setPhase('processing')
        runIntent(text)
      },
      onError: (message) => {
        setPhase('idle')
        buzz('error')
        say(message, 'assertive')
      },
      onEnd: () => {
        handleRef.current = null
        setPhase((current) => (current === 'listening' ? 'idle' : current))
      },
    })
  }, [buzz, say, runIntent])

  const listening = phase === 'listening'
  const processing = phase === 'processing'

  const stateLabel = listening
    ? 'Ouvindo. Toque novamente para parar.'
    : processing
      ? 'Processando o seu comando.'
      : 'Toque para falar um comando'

  return (
    <section aria-labelledby="titulo-comando" className="flex flex-col gap-4">
      <h2 id="titulo-comando" className="sr-only">
        Comando de voz
      </h2>

      <button
        type="button"
        onClick={listening ? stop : start}
        disabled={processing}
        aria-label={listening ? 'Parar de ouvir o comando de voz' : 'Falar um comando de voz'}
        aria-describedby="dica-comando"
        aria-pressed={listening}
        className={cn(
          'flex min-h-64 w-full flex-col items-center justify-center gap-4 rounded-3xl border-4 p-6 transition-colors',
          'focus-visible:outline-4 focus-visible:outline-offset-4',
          listening
            ? 'bg-primary text-primary-foreground border-primary'
            : 'bg-secondary text-secondary-foreground border-primary/70 hover:bg-accent hover:text-accent-foreground',
          processing && 'opacity-90',
        )}
      >
        {processing ? (
          <Loader2 aria-hidden="true" className="size-20 animate-spin" />
        ) : listening ? (
          <Mic aria-hidden="true" className="size-20" />
        ) : (
          <MicOff aria-hidden="true" className="size-20" />
        )}
        <span className="text-3xl leading-tight font-black text-balance">
          {listening ? 'Ouvindo…' : processing ? 'Processando…' : 'Falar'}
        </span>
        <span className="text-lg leading-relaxed font-medium text-balance opacity-90">
          {stateLabel}
        </span>
      </button>

      <p id="dica-comando" className="text-muted-foreground text-base leading-relaxed">
        Diga por exemplo: <span className="text-foreground font-bold">descreva a cena</span>,{' '}
        <span className="text-foreground font-bold">ler texto</span> ou{' '}
        <span className="text-foreground font-bold">preciso de ajuda</span>. Você também pode
        tocar duas vezes na haste dos óculos.
      </p>

      {/* Último comando reconhecido: útil para acompanhantes e para depuração. */}
      {transcript ? (
        <p className="border-border bg-card text-card-foreground rounded-xl border p-3 text-base">
          <span className="text-muted-foreground block text-xs font-bold uppercase">
            Último comando ouvido
          </span>
          {transcript}
        </p>
      ) : null}
    </section>
  )
}
