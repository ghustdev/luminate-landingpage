'use client'

/**
 * BackgroundMappingBanner — o diferencial do Luminate: o "Waze da Acessibilidade".
 *
 * O serviço roda em segundo plano combinando GPS + acelerômetro/giroscópio.
 * Quando detecta um tropeço (pico de aceleração) ou quando a IA reconhece o
 * mesmo obstáculo repetidamente, um pin geolocalizado é gravado em silêncio.
 *
 * ACESSIBILIDADE:
 * - O registro é SILENCIOSO por design: nenhum anúncio interrompe a caminhada.
 *   O usuário fica sabendo apenas pelo contador, que é `aria-live="off"`.
 * - O interruptor usa `role="switch"` + `aria-checked`, lido como
 *   "ativado/desativado" pelo VoiceOver e TalkBack.
 */

import { useEffect, useRef } from 'react'
import { Radar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLuminate } from '@/lib/luminate-store'
import { startFallDetection } from '@/lib/mapping-service'

export function BackgroundMappingBanner() {
  const { prefs, updatePrefs, pins, addPin, say } = useLuminate()
  const stopRef = useRef<(() => void) | null>(null)

  // Liga/desliga o serviço de detecção conforme a preferência do usuário.
  useEffect(() => {
    if (!prefs.backgroundMapping) {
      stopRef.current?.()
      stopRef.current = null
      return
    }
    stopRef.current = startFallDetection((pin) => {
      // Registro silencioso: sem TTS, para não interromper a caminhada.
      addPin(pin)
    })
    return () => {
      stopRef.current?.()
      stopRef.current = null
    }
  }, [prefs.backgroundMapping, addPin])

  const toggle = () => {
    const next = !prefs.backgroundMapping
    updatePrefs({ backgroundMapping: next })
    say(
      next
        ? 'Mapeamento colaborativo ativado. Registros são feitos em silêncio.'
        : 'Mapeamento colaborativo desativado.',
      'polite',
    )
  }

  return (
    <section
      aria-labelledby="titulo-mapeamento"
      className="border-border bg-card text-card-foreground flex flex-col gap-3 rounded-2xl border-2 p-4"
    >
      <div className="flex items-start gap-3">
        <Radar
          aria-hidden="true"
          className={cn(
            'size-7 shrink-0',
            prefs.backgroundMapping ? 'text-primary' : 'text-muted-foreground',
          )}
        />
        <div className="flex-1">
          <h2 id="titulo-mapeamento" className="text-lg leading-tight font-black">
            Mapeamento colaborativo
          </h2>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            Em segundo plano, o app registra buracos, obras e degraus usando GPS e os sensores de
            movimento. Nada é anunciado em voz para não te interromper.
          </p>
        </div>
      </div>

      <p aria-live="off" className="text-base font-bold">
        {pins.length} obstáculos na sua região
      </p>

      <button
        type="button"
        role="switch"
        aria-checked={prefs.backgroundMapping}
        aria-label="Mapeamento colaborativo em segundo plano"
        onClick={toggle}
        className={cn(
          'flex min-h-14 items-center justify-between rounded-xl border-2 px-4 text-base font-bold',
          prefs.backgroundMapping
            ? 'border-primary bg-accent text-accent-foreground'
            : 'border-border bg-secondary text-secondary-foreground',
        )}
      >
        <span>{prefs.backgroundMapping ? 'Ativado' : 'Desativado'}</span>
        <span
          aria-hidden="true"
          className={cn(
            'flex h-8 w-14 items-center rounded-full p-1',
            prefs.backgroundMapping ? 'bg-primary justify-end' : 'bg-muted-foreground/40',
          )}
        >
          <span className="bg-background size-6 rounded-full" />
        </span>
      </button>
    </section>
  )
}
