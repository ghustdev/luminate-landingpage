'use client'

/**
 * ObstacleLeafletMap — camada VISUAL do mapa (para usuários com baixa visão ou
 * acompanhantes videntes). Carregada dinamicamente sem SSR.
 *
 * ACESSIBILIDADE:
 * - O mapa é `aria-hidden` porque um mapa de tiles não é navegável por leitor de
 *   tela. A informação equivalente está na LISTA de obstáculos ao lado, que é a
 *   interface primária (WCAG 1.1.1 — alternativa textual completa).
 */

import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { ObstaclePin } from '@/lib/luminate-store'

type Props = {
  pins: ObstaclePin[]
  center: { lat: number; lng: number }
  selectedId: string | null
}

/** Reposiciona o mapa quando o usuário seleciona um obstáculo na lista. */
function Recenter({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap()
  useEffect(() => {
    map.setView([center.lat, center.lng], map.getZoom(), { animate: true })
  }, [center.lat, center.lng, map])
  return null
}

export default function ObstacleLeafletMap({ pins, center, selectedId }: Props) {
  const initialCenter = useMemo<[number, number]>(() => [center.lat, center.lng], [])

  return (
    <div
      aria-hidden="true"
      className="border-border h-64 w-full overflow-hidden rounded-2xl border"
    >
      <MapContainer
        center={initialCenter}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Recenter center={center} />

        {/* Posição atual do usuário */}
        <CircleMarker
          center={[center.lat, center.lng]}
          radius={8}
          pathOptions={{ color: '#0064e0', fillColor: '#0064e0', fillOpacity: 1, weight: 3 }}
        />

        {pins.map((pin) => {
          const active = pin.id === selectedId
          return (
            <CircleMarker
              key={pin.id}
              center={[pin.lat, pin.lng]}
              radius={active ? 16 : 11}
              pathOptions={{
                color: '#ffffff',
                weight: active ? 4 : 2,
                fillColor: '#c8102e',
                fillOpacity: 0.9,
              }}
            >
              <Tooltip>{pin.note}</Tooltip>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}
