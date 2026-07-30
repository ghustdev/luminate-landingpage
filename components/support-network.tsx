'use client'

/**
 * SupportNetwork — lista de contatos + tela de chamada (WebRTC).
 *
 * ACESSIBILIDADE:
 * - O botão de chamada de emergência é o PRIMEIRO elemento focável da região,
 *   com min-h-24 e rótulo explícito ("Chamar ajuda agora").
 * - Cada contato é um <li> com um botão único, cujo `aria-label` já inclui o
 *   nome, a relação e a disponibilidade — o usuário não precisa varrer a tela.
 * - Durante a chamada, o foco é movido para o botão "Encerrar" (a ação mais
 *   provável) e a mudança de estado é anunciada em `aria-live="assertive"`.
 * - O cronômetro tem `aria-live="off"` para não tagarelar a cada segundo;
 *   o usuário pede a duração tocando em "Ouvir duração".
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Mic, MicOff, PhoneCall, PhoneOff, Star, Timer, Video } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLuminate, type Contact } from '@/lib/luminate-store'
import {
  closeStream,
  formatDuration,
  openLocalStream,
  speakableDuration,
  type CallStatus,
} from '@/lib/call-service'

export function SupportNetwork() {
  const { contacts, toggleFavorite, say, buzz, glasses } = useLuminate()
  const [status, setStatus] = useState<CallStatus>('idle')
  const [peer, setPeer] = useState<Contact | null>(null)
  const [seconds, setSeconds] = useState(0)
  const [muted, setMuted] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const endButtonRef = useRef<HTMLButtonElement>(null)

  // Cronômetro da chamada ativa.
  useEffect(() => {
    if (status !== 'active') return
    const timer = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(timer)
  }, [status])

  // Ao entrar em chamada, move o foco para a ação mais provável: encerrar.
  useEffect(() => {
    if (status === 'active' || status === 'ringing') endButtonRef.current?.focus()
  }, [status])

  const hangUp = useCallback(
    (reason?: string) => {
      closeStream(streamRef.current)
      streamRef.current = null
      setStatus('ended')
      setMuted(false)
      buzz('light')
      say(reason ?? `Chamada encerrada após ${speakableDuration(seconds)}.`, 'assertive')
      window.setTimeout(() => {
        setStatus('idle')
        setPeer(null)
        setSeconds(0)
      }, 1200)
    },
    [say, buzz, seconds],
  )

  const startCall = useCallback(
    async (contact: Contact) => {
      setPeer(contact)
      setSeconds(0)
      setStatus('ringing')
      buzz('light')
      say(`Chamando ${contact.name}. Transmitindo o vídeo dos óculos.`, 'assertive')

      try {
        // Stream local = a "visão" enviada ao voluntário.
        const stream = await openLocalStream()
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.muted = true
          await videoRef.current.play().catch(() => {})
        }
      } catch {
        // Sem câmera/microfone a chamada segue em modo áudio-descrição simulado.
        say('Sem acesso à câmera. A chamada continuará apenas com áudio.', 'polite')
      }

      // Simula o handshake de sinalização + o voluntário atendendo.
      window.setTimeout(() => {
        setStatus('active')
        buzz('success')
        say(
          `${contact.name} atendeu. Ela está vendo o que os óculos veem e a voz dela sai pelos alto-falantes.`,
          'assertive',
        )
      }, 2600)
    },
    [say, buzz],
  )

  const emergencyCall = useCallback(() => {
    const target =
      contacts.find((c) => c.favorite && c.available) ?? contacts.find((c) => c.available)
    if (!target) {
      buzz('error')
      say('Nenhum contato disponível agora. Adicione contatos em Ajustes.', 'assertive')
      return
    }
    startCall(target)
  }, [contacts, startCall, say, buzz])

  const toggleMute = useCallback(() => {
    const next = !muted
    setMuted(next)
    streamRef.current?.getAudioTracks().forEach((t) => (t.enabled = !next))
    buzz('light')
    say(next ? 'Microfone desligado.' : 'Microfone ligado.', 'assertive')
  }, [muted, say, buzz])

  const inCall = status === 'ringing' || status === 'active'

  /* ---------------- Tela de chamada ---------------- */
  if (inCall || status === 'ended') {
    return (
      <section
        aria-labelledby="titulo-chamada"
        className="flex flex-col gap-4"
        aria-describedby="estado-chamada"
      >
        <h2 id="titulo-chamada" className="text-2xl leading-tight font-black">
          {peer?.name ?? 'Chamada'}
        </h2>

        <p
          id="estado-chamada"
          role="status"
          aria-live="assertive"
          className="text-lg leading-relaxed font-bold"
        >
          {status === 'ringing'
            ? 'Chamando… aguardando o voluntário atender.'
            : status === 'active'
              ? 'Chamada em andamento. O voluntário está vendo a sua câmera.'
              : 'Chamada encerrada.'}
        </p>

        {/* Vídeo do voluntário: decorativo para quem não vê */}
        <div
          aria-hidden="true"
          className="border-border bg-muted relative aspect-3/4 w-full overflow-hidden rounded-2xl border-2"
        >
          {status === 'active' ? (
            <Image
              src="/images/volunteer-video.png"
              alt=""
              fill
              sizes="(max-width: 448px) 100vw, 448px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="text-muted-foreground flex size-full items-center justify-center">
              <PhoneCall className="size-16 animate-pulse" />
            </div>
          )}

          {/* Miniatura do que o voluntário está vendo (câmera dos óculos) */}
          <div className="border-background bg-background absolute right-3 bottom-3 h-32 w-24 overflow-hidden rounded-xl border-2">
            <video ref={videoRef} playsInline muted className="size-full object-cover" />
          </div>
        </div>

        {status === 'active' ? (
          <>
            <p aria-live="off" className="text-muted-foreground font-mono text-base font-bold">
              Duração {formatDuration(seconds)}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Vídeo: {glasses.status === 'connected' ? 'câmera dos óculos' : 'câmera do celular'} ·
              Áudio de retorno: alto-falantes open-ear
            </p>
          </>
        ) : null}

        <div className="flex flex-col gap-3">
          <button
            ref={endButtonRef}
            type="button"
            onClick={() => hangUp()}
            aria-label="Encerrar a chamada"
            className="bg-destructive text-destructive-foreground flex min-h-20 items-center justify-center gap-3 rounded-2xl text-2xl font-black"
          >
            <PhoneOff aria-hidden="true" className="size-8" />
            Encerrar
          </button>

          {status === 'active' ? (
            <>
              <button
                type="button"
                role="switch"
                aria-checked={muted}
                aria-label="Silenciar o meu microfone"
                onClick={toggleMute}
                className="border-border bg-secondary text-secondary-foreground flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 text-lg font-bold"
              >
                {muted ? (
                  <MicOff aria-hidden="true" className="size-6" />
                ) : (
                  <Mic aria-hidden="true" className="size-6" />
                )}
                {muted ? 'Microfone desligado' : 'Microfone ligado'}
              </button>

              <button
                type="button"
                onClick={() => say(`Chamada em andamento há ${speakableDuration(seconds)}.`, 'polite')}
                aria-label="Ouvir a duração da chamada"
                className="border-border bg-secondary text-secondary-foreground flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 text-lg font-bold"
              >
                <Timer aria-hidden="true" className="size-6" />
                Ouvir duração
              </button>
            </>
          ) : null}
        </div>
      </section>
    )
  }

  /* ---------------- Lista de contatos ---------------- */
  const favorites = contacts.filter((c) => c.favorite)
  const others = contacts.filter((c) => !c.favorite)

  return (
    <div className="flex flex-col gap-6">
      {/* Ação de emergência: primeira na ordem de foco */}
      <button
        type="button"
        onClick={emergencyCall}
        aria-label="Chamar ajuda agora"
        aria-describedby="dica-emergencia"
        className="bg-destructive text-destructive-foreground flex min-h-24 items-center justify-center gap-3 rounded-3xl text-2xl font-black"
      >
        <PhoneCall aria-hidden="true" className="size-9" />
        Chamar ajuda agora
      </button>
      <p id="dica-emergencia" className="text-muted-foreground text-sm leading-relaxed">
        Liga imediatamente para o primeiro contato favorito disponível e começa a transmitir o
        vídeo dos óculos.
      </p>

      <ContactGroup
        title="Favoritos"
        contacts={favorites}
        onCall={startCall}
        onToggleFavorite={toggleFavorite}
      />
      <ContactGroup
        title="Outros contatos"
        contacts={others}
        onCall={startCall}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  )
}

function ContactGroup({
  title,
  contacts,
  onCall,
  onToggleFavorite,
}: {
  title: string
  contacts: Contact[]
  onCall: (c: Contact) => void
  onToggleFavorite: (id: string) => void
}) {
  const id = `grupo-${title.toLowerCase().replace(/\s/g, '-')}`
  if (contacts.length === 0) return null

  return (
    <section aria-labelledby={id} className="flex flex-col gap-3">
      <h2 id={id} className="text-xl font-black">
        {title}
      </h2>
      <ul className="flex flex-col gap-3">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="border-border bg-card text-card-foreground flex items-stretch gap-2 rounded-2xl border-2 p-2"
          >
            <button
              type="button"
              onClick={() => onCall(contact)}
              disabled={!contact.available}
              aria-label={`Ligar para ${contact.name}, ${contact.relation}, ${
                contact.available ? 'disponível' : 'indisponível agora'
              }`}
              className={cn(
                'flex min-h-18 flex-1 items-center gap-3 rounded-xl px-3 text-left',
                contact.available
                  ? 'hover:bg-accent hover:text-accent-foreground'
                  : 'cursor-not-allowed opacity-60',
              )}
            >
              <Video
                aria-hidden="true"
                className={cn(
                  'size-7 shrink-0',
                  contact.available ? 'text-primary' : 'text-muted-foreground',
                )}
              />
              <span className="flex flex-col">
                <span className="text-lg leading-tight font-bold">{contact.name}</span>
                <span className="text-muted-foreground text-sm">
                  {contact.relation} · {contact.available ? 'Disponível' : 'Indisponível'}
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => onToggleFavorite(contact.id)}
              aria-pressed={contact.favorite}
              aria-label={`Marcar ${contact.name} como favorito`}
              className="border-border bg-secondary text-secondary-foreground flex min-h-18 w-14 shrink-0 items-center justify-center rounded-xl border"
            >
              <Star
                aria-hidden="true"
                className={cn('size-6', contact.favorite && 'fill-current text-primary')}
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
