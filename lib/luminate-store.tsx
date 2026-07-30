'use client'

/**
 * LuminateProvider — estado global do app (dados simulados nesta versao).
 *
 * ACESSIBILIDADE:
 * - Centraliza o TTS: qualquer parte do app chama `say()` e o usuario ouve.
 * - Guarda as preferencias de acessibilidade (velocidade do TTS, alto contraste,
 *   tamanho da fonte) e as aplica no <html> para valer em todas as telas.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  connectGlasses,
  disconnectGlasses,
  subscribeGlasses,
  type GlassesState,
} from './glasses-service'
import { haptic, notify, setSpeechRate, setTtsEnabled, type SpeechRate } from './speech-service'

export type Contact = {
  id: string
  name: string
  relation: string
  phone: string
  favorite: boolean
  available: boolean
}

export type ObstaclePin = {
  id: string
  lat: number
  lng: number
  type: 'buraco' | 'obra' | 'degrau' | 'galho' | 'poste' | 'outro'
  note: string
  confirmations: number
  source: 'ia' | 'queda' | 'manual'
  createdAt: number
}

export type SceneDescription = {
  id: string
  text: string
  image: string | null
  createdAt: number
}

export type Prefs = {
  speechRate: SpeechRate
  ttsEnabled: boolean
  highContrast: boolean
  fontScale: 1 | 1.15 | 1.3 | 1.5
  hapticsEnabled: boolean
  backgroundMapping: boolean
  autoDescribe: boolean
}

const DEFAULT_PREFS: Prefs = {
  speechRate: 1,
  ttsEnabled: true,
  highContrast: false,
  fontScale: 1,
  hapticsEnabled: true,
  backgroundMapping: true,
  autoDescribe: false,
}

const SEED_CONTACTS: Contact[] = [
  {
    id: 'c1',
    name: 'Marina Alves',
    relation: 'Irmã',
    phone: '+55 11 98888-1010',
    favorite: true,
    available: true,
  },
  {
    id: 'c2',
    name: 'Rede Luminate • Voluntários',
    relation: 'Plantão 24h',
    phone: 'sala-voluntarios',
    favorite: true,
    available: true,
  },
  {
    id: 'c3',
    name: 'Paulo Menezes',
    relation: 'Vizinho',
    phone: '+55 11 97777-2020',
    favorite: false,
    available: false,
  },
]

// Pins semente ao redor da Av. Paulista (Sao Paulo) para o mapa colaborativo.
const SEED_PINS: ObstaclePin[] = [
  {
    id: 'p1',
    lat: -23.5613,
    lng: -46.6565,
    type: 'obra',
    note: 'Obra na calçada, tapume estreitando a passagem',
    confirmations: 12,
    source: 'ia',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'p2',
    lat: -23.5641,
    lng: -46.6529,
    type: 'buraco',
    note: 'Buraco fundo próximo ao poste',
    confirmations: 7,
    source: 'queda',
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: 'p3',
    lat: -23.5589,
    lng: -46.6602,
    type: 'degrau',
    note: 'Degrau sem sinalização na entrada da galeria',
    confirmations: 4,
    source: 'manual',
    createdAt: Date.now() - 86400000,
  },
  {
    id: 'p4',
    lat: -23.5658,
    lng: -46.6512,
    type: 'galho',
    note: 'Galho baixo na altura da cabeça',
    confirmations: 9,
    source: 'ia',
    createdAt: Date.now() - 3600000 * 8,
  },
]

type LuminateContextValue = {
  glasses: GlassesState
  connect: () => Promise<void>
  disconnect: () => void
  prefs: Prefs
  updatePrefs: (patch: Partial<Prefs>) => void
  contacts: Contact[]
  toggleFavorite: (id: string) => void
  addContact: (contact: Omit<Contact, 'id' | 'available'>) => void
  removeContact: (id: string) => void
  pins: ObstaclePin[]
  addPin: (pin: Omit<ObstaclePin, 'id' | 'createdAt' | 'confirmations'>) => void
  confirmPin: (id: string) => void
  descriptions: SceneDescription[]
  addDescription: (d: Omit<SceneDescription, 'id' | 'createdAt'>) => void
  /** Fala + anuncia na live region. */
  say: (message: string, priority?: 'polite' | 'assertive') => void
  buzz: (pattern?: 'light' | 'success' | 'error') => void
}

const LuminateContext = createContext<LuminateContextValue | null>(null)

export function LuminateProvider({ children }: { children: React.ReactNode }) {
  const [glasses, setGlasses] = useState<GlassesState>({
    status: 'disconnected',
    battery: 0,
    deviceName: 'Ray-Ban Meta • Wayfarer',
    firmware: '14.2.1',
    signalDbm: -100,
  })
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS)
  const [contacts, setContacts] = useState<Contact[]>(SEED_CONTACTS)
  const [pins, setPins] = useState<ObstaclePin[]>(SEED_PINS)
  const [descriptions, setDescriptions] = useState<SceneDescription[]>([])
  const prefsRef = useRef(prefs)
  prefsRef.current = prefs

  useEffect(() => subscribeGlasses(setGlasses), [])

  // Propaga as preferencias para o servico de fala e para o documento.
  useEffect(() => {
    setSpeechRate(prefs.speechRate)
    setTtsEnabled(prefs.ttsEnabled)
    const root = document.documentElement
    root.classList.toggle('contrast-boost', prefs.highContrast)
    root.style.fontSize = `${16 * prefs.fontScale}px`
  }, [prefs])

  const say = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    notify(message, priority)
  }, [])

  const buzz = useCallback((pattern: 'light' | 'success' | 'error' = 'light') => {
    if (prefsRef.current.hapticsEnabled) haptic(pattern)
  }, [])

  const connect = useCallback(async () => {
    say('Procurando os óculos por Bluetooth.', 'assertive')
    const next = await connectGlasses()
    buzz('success')
    say(`Óculos conectados. ${next.battery} por cento de bateria.`, 'assertive')
  }, [say, buzz])

  const disconnect = useCallback(() => {
    disconnectGlasses()
    buzz('light')
    say('Óculos desconectados.', 'assertive')
  }, [say, buzz])

  const updatePrefs = useCallback((patch: Partial<Prefs>) => {
    setPrefs((current) => ({ ...current, ...patch }))
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    setContacts((list) =>
      list.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)),
    )
  }, [])

  const addContact = useCallback((contact: Omit<Contact, 'id' | 'available'>) => {
    setContacts((list) => [
      ...list,
      { ...contact, id: `c${Date.now()}`, available: true },
    ])
  }, [])

  const removeContact = useCallback((id: string) => {
    setContacts((list) => list.filter((c) => c.id !== id))
  }, [])

  const addPin = useCallback(
    (pin: Omit<ObstaclePin, 'id' | 'createdAt' | 'confirmations'>) => {
      setPins((list) => [
        { ...pin, id: `p${Date.now()}`, createdAt: Date.now(), confirmations: 1 },
        ...list,
      ])
    },
    [],
  )

  const confirmPin = useCallback((id: string) => {
    setPins((list) =>
      list.map((p) => (p.id === id ? { ...p, confirmations: p.confirmations + 1 } : p)),
    )
  }, [])

  const addDescription = useCallback((d: Omit<SceneDescription, 'id' | 'createdAt'>) => {
    setDescriptions((list) => [
      { ...d, id: `d${Date.now()}`, createdAt: Date.now() },
      ...list,
    ])
  }, [])

  const value = useMemo<LuminateContextValue>(
    () => ({
      glasses,
      connect,
      disconnect,
      prefs,
      updatePrefs,
      contacts,
      toggleFavorite,
      addContact,
      removeContact,
      pins,
      addPin,
      confirmPin,
      descriptions,
      addDescription,
      say,
      buzz,
    }),
    [
      glasses,
      connect,
      disconnect,
      prefs,
      updatePrefs,
      contacts,
      toggleFavorite,
      addContact,
      removeContact,
      pins,
      addPin,
      confirmPin,
      descriptions,
      addDescription,
      say,
      buzz,
    ],
  )

  return <LuminateContext.Provider value={value}>{children}</LuminateContext.Provider>
}

export function useLuminate() {
  const ctx = useContext(LuminateContext)
  if (!ctx) throw new Error('useLuminate deve ser usado dentro de LuminateProvider')
  return ctx
}
