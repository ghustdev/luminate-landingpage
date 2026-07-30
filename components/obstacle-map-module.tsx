'use client'

/**
 * ObstacleMapModule — "Waze da Acessibilidade".
 *
 * ACESSIBILIDADE (o ponto central deste módulo):
 * - A LISTA é a interface primária, não o mapa. Ela é ordenada por distância e
 *   cada item anuncia tipo, distância, direção e número de confirmações.
 * - Um botão "Ler obstáculos próximos" faz a leitura em voz alta de tudo.
 * - O mapa visual é `aria-hidden` (alternativa textual equivalente na lista).
 * - Formulário de relato com <label> reais, sem placeholder como rótulo.
 */

import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, Check, MapPin, Navigation, Plus, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLuminate, type ObstaclePin } from '@/lib/luminate-store'
import { distanceMeters } from '@/lib/mapping-service'

const ObstacleLeafletMap = dynamic(() => import('@/components/obstacle-leaflet-map'), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="bg-muted border-border h-64 w-full animate-pulse rounded-2xl border"
    />
  ),
})

const FALLBACK_CENTER = { lat: -23.5629, lng: -46.6544 }

const TYPE_LABEL: Record<ObstaclePin['type'], string> = {
  buraco: 'Buraco',
  obra: 'Obra na calçada',
  degrau: 'Degrau',
  galho: 'Galho baixo',
  poste: 'Poste ou obstáculo fixo',
  outro: 'Outro obstáculo',
}

const SOURCE_LABEL: Record<ObstaclePin['source'], string> = {
  ia: 'detectado pela câmera dos óculos',
  queda: 'detectado por sensor de tropeço',
  manual: 'relatado manualmente',
}

/** Converte um rumo em graus para uma direção falada em português. */
function bearingLabel(from: { lat: number; lng: number }, to: { lat: number; lng: number }) {
  const dLng = to.lng - from.lng
  const dLat = to.lat - from.lat
  const deg = (Math.atan2(dLng, dLat) * 180) / Math.PI
  const normalized = (deg + 360) % 360
  const names = [
    'ao norte',
    'a nordeste',
    'a leste',
    'a sudeste',
    'ao sul',
    'a sudoeste',
    'a oeste',
    'a noroeste',
  ]
  return names[Math.round(normalized / 45) % 8]
}

export function ObstacleMapModule() {
  const { pins, addPin, confirmPin, say, buzz } = useLuminate()
  const [center, setCenter] = useState(FALLBACK_CENTER)
  const [locating, setLocating] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  // Pega a localização real uma vez ao montar.
  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setLocating(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setLocating(false)
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 6000 },
    )
  }, [])

  // Ordena por proximidade: o mais relevante para quem caminha vem primeiro.
  const sorted = useMemo(
    () =>
      pins
        .map((pin) => ({
          pin,
          meters: distanceMeters(center, pin),
          direction: bearingLabel(center, pin),
        }))
        .sort((a, b) => a.meters - b.meters),
    [pins, center],
  )

  const readNearby = () => {
    const closest = sorted.slice(0, 3)
    if (closest.length === 0) {
      say('Nenhum obstáculo registrado por perto.', 'assertive')
      return
    }
    const sentences = closest.map(
      ({ pin, meters, direction }) =>
        `${TYPE_LABEL[pin.type]} a ${meters} metros, ${direction}. ${pin.note}.`,
    )
    say(`${closest.length} obstáculos próximos. ${sentences.join(' ')}`, 'assertive')
  }

  return (
    <div className="mt-5 flex flex-col gap-5">
      <ObstacleLeafletMap
        pins={pins}
        center={selectedId ? (pins.find((p) => p.id === selectedId) ?? center) : center}
        selectedId={selectedId}
      />

      <p role="status" aria-live="polite" className="text-muted-foreground text-sm font-bold">
        {locating
          ? 'Obtendo sua localização…'
          : `${pins.length} obstáculos mapeados perto de você`}
      </p>

      <div className="flex flex-col gap-3">
        <Button
          onClick={readNearby}
          className="min-h-16 w-full justify-start gap-3 rounded-2xl text-lg font-black"
        >
          <Volume2 aria-hidden="true" className="size-6 shrink-0" />
          Ler obstáculos próximos
        </Button>

        <Button
          variant="outline"
          onClick={() => setFormOpen((v) => !v)}
          aria-expanded={formOpen}
          aria-controls="form-relato"
          className="min-h-16 w-full justify-start gap-3 rounded-2xl text-lg font-black"
        >
          <Plus aria-hidden="true" className="size-6 shrink-0" />
          Relatar um obstáculo aqui
        </Button>
      </div>

      {formOpen && (
        <ReportForm
          id="form-relato"
          onSubmit={(type, note) => {
            addPin({ lat: center.lat, lng: center.lng, type, note, source: 'manual' })
            buzz('success')
            say(`${TYPE_LABEL[type]} registrado na sua posição atual. Obrigado por ajudar a comunidade.`, 'assertive')
            setFormOpen(false)
          }}
          onCancel={() => setFormOpen(false)}
        />
      )}

      <section aria-labelledby="titulo-lista" className="flex flex-col gap-3">
        <h2 id="titulo-lista" className="text-xl font-black tracking-tight">
          Obstáculos por proximidade
        </h2>

        <ul className="flex flex-col gap-3">
          {sorted.map(({ pin, meters, direction }) => (
            <li key={pin.id}>
              <article
                className={
                  'border-border bg-card flex flex-col gap-3 rounded-2xl border p-4 ' +
                  (pin.id === selectedId ? 'ring-ring ring-2' : '')
                }
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="bg-destructive text-destructive-foreground flex size-11 shrink-0 items-center justify-center rounded-xl"
                  >
                    <AlertTriangle className="size-6" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg leading-tight font-black">{TYPE_LABEL[pin.type]}</h3>
                    <p className="text-base leading-relaxed">{pin.note}</p>
                    <p className="text-muted-foreground text-sm font-bold">
                      {meters} metros, {direction} · {pin.confirmations} confirmações ·{' '}
                      {SOURCE_LABEL[pin.source]}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      confirmPin(pin.id)
                      buzz('success')
                      say(`Obrigado. ${TYPE_LABEL[pin.type]} confirmado.`)
                    }}
                    className="min-h-14 flex-1 gap-2 rounded-xl font-bold"
                  >
                    <Check aria-hidden="true" className="size-5" />
                    <span>
                      Confirmar
                      <span className="sr-only"> que {TYPE_LABEL[pin.type]} ainda existe</span>
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedId(pin.id)
                      say(
                        `${TYPE_LABEL[pin.type]} selecionado. A ${meters} metros, ${direction}.`,
                        'assertive',
                      )
                    }}
                    className="min-h-14 flex-1 gap-2 rounded-xl font-bold"
                  >
                    <Navigation aria-hidden="true" className="size-5" />
                    <span>
                      Localizar
                      <span className="sr-only"> {TYPE_LABEL[pin.type]} no mapa</span>
                    </span>
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

/** Formulário de relato: rótulos visíveis, alvos grandes, sem depender de cor. */
function ReportForm({
  id,
  onSubmit,
  onCancel,
}: {
  id: string
  onSubmit: (type: ObstaclePin['type'], note: string) => void
  onCancel: () => void
}) {
  const [type, setType] = useState<ObstaclePin['type']>('buraco')
  const [note, setNote] = useState('')

  return (
    <form
      id={id}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(type, note.trim() || TYPE_LABEL[type])
      }}
      className="border-border bg-card flex flex-col gap-4 rounded-2xl border p-4"
    >
      <div className="flex items-center gap-2">
        <MapPin aria-hidden="true" className="text-primary size-5" />
        <h2 className="text-lg font-black">Novo relato na sua posição</h2>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="tipo-obstaculo" className="text-base font-bold">
          Tipo de obstáculo
        </label>
        <select
          id="tipo-obstaculo"
          value={type}
          onChange={(e) => setType(e.target.value as ObstaclePin['type'])}
          className="border-input bg-background min-h-14 rounded-xl border px-3 text-base font-bold"
        >
          {Object.entries(TYPE_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="nota-obstaculo" className="text-base font-bold">
          Descrição (opcional)
        </label>
        <textarea
          id="nota-obstaculo"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          aria-describedby="ajuda-nota"
          className="border-input bg-background rounded-xl border p-3 text-base leading-relaxed"
        />
        <p id="ajuda-nota" className="text-muted-foreground text-sm">
          Ex.: buraco fundo perto do poste, do lado direito da calçada.
        </p>
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="min-h-14 flex-1 rounded-xl text-base font-black">
          Salvar relato
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="min-h-14 flex-1 rounded-xl text-base font-black"
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
