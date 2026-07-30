'use client'

/**
 * VisionModule — captura o frame e envia para a IA multimodal.
 *
 * NO APP NATIVO o frame chegaria dos óculos pela característica BLE
 * CHAR_FRAME_STREAM (ver lib/glasses-service.ts). Aqui usamos a câmera
 * traseira do celular via getUserMedia, que cumpre o mesmo papel de "olho".
 *
 * ACESSIBILIDADE:
 * - Botões de modo com `role="radio"` dentro de `role="radiogroup"`: o leitor
 *   de tela anuncia "Descrever cena, selecionado, 1 de 3".
 * - O <video> é `aria-hidden`: a imagem crua não tem valor para quem não vê.
 *   O valor está na descrição em texto, que é a informação semântica.
 * - Resultado renderizado em `role="status" aria-live="polite"` e falado por TTS.
 * - Estados de carregamento anunciados por texto ("Analisando a imagem…"),
 *   nunca apenas por spinner.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Camera, CameraOff, Loader2, ScanText, Sparkles, TriangleAlert, Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLuminate } from '@/lib/luminate-store'
import { speak } from '@/lib/speech-service'

type Mode = 'cena' | 'texto' | 'obstaculos'

const MODES: { id: Mode; label: string; hint: string; icon: typeof Sparkles }[] = [
  {
    id: 'cena',
    label: 'Descrever cena',
    hint: 'Resume o ambiente priorizando riscos e obstáculos',
    icon: Sparkles,
  },
  {
    id: 'texto',
    label: 'Ler texto',
    hint: 'Lê placas, cardápios, etiquetas e documentos em voz alta',
    icon: ScanText,
  },
  {
    id: 'obstaculos',
    label: 'Checar calçada',
    hint: 'Verifica se a passagem à frente está livre',
    icon: TriangleAlert,
  },
]

export function VisionModule() {
  const params = useSearchParams()
  const initialMode = (params.get('modo') as Mode) || 'cena'
  const { say, buzz, addDescription, descriptions, glasses } = useLuminate()

  const [mode, setMode] = useState<Mode>(
    MODES.some((m) => m.id === initialMode) ? initialMode : 'cena',
  )
  const [cameraOn, setCameraOn] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setCameraOn(false)
  }, [])

  useEffect(() => stopCamera, [stopCamera])

  const startCamera = useCallback(async () => {
    setCameraError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 } },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setCameraOn(true)
      say('Câmera ativa. Toque em analisar quando estiver pronto.', 'assertive')
    } catch {
      setCameraOn(false)
      setCameraError(
        'Não foi possível acessar a câmera. Verifique a permissão nas configurações do navegador.',
      )
      say('Não consegui acessar a câmera. Verifique as permissões.', 'assertive')
    }
  }, [say])

  /** Extrai o frame atual como JPEG base64 (equivale ao frame vindo dos óculos). */
  const captureFrame = useCallback((): string | null => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || !video.videoWidth) return null
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/jpeg', 0.75)
  }, [])

  const analyze = useCallback(async () => {
    if (!cameraOn) {
      say('Ative a câmera primeiro.', 'assertive')
      return
    }
    const dataUrl = captureFrame()
    if (!dataUrl) {
      say('Não consegui capturar a imagem. Tente novamente.', 'assertive')
      return
    }

    buzz('light')
    setAnalyzing(true)
    setResult(null)
    say(mode === 'texto' ? 'Procurando texto na imagem.' : 'Analisando a imagem.', 'assertive')

    try {
      const response = await fetch('/api/describe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl, mode }),
      })
      const data = (await response.json()) as { description?: string; error?: string }

      if (!response.ok || !data.description) {
        throw new Error(data.error ?? 'Falha na análise.')
      }

      setResult(data.description)
      addDescription({ text: data.description, image: dataUrl })
      buzz('success')
      // Resposta lida em voz alta e enviada aos alto-falantes dos óculos.
      say(data.description, 'assertive')
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não consegui processar a imagem. Tente de novo ou chame a Rede de Apoio.'
      setResult(message)
      buzz('error')
      say(message, 'assertive')
    } finally {
      setAnalyzing(false)
    }
  }, [cameraOn, captureFrame, mode, say, buzz, addDescription])

  return (
    <div className="flex flex-col gap-5">
      {/* Fonte do frame: óculos quando conectados, celular como reserva */}
      <p className="border-border bg-card text-card-foreground rounded-xl border p-3 text-sm leading-relaxed">
        <span className="font-bold">Fonte da imagem: </span>
        {glasses.status === 'connected'
          ? 'câmera dos óculos (via Bluetooth)'
          : 'câmera do celular (óculos desconectados)'}
      </p>

      {/* Seleção de modo */}
      <div role="radiogroup" aria-label="Modo de análise" className="flex flex-col gap-3">
        {MODES.map((item, index) => {
          const Icon = item.icon
          const selected = mode === item.id
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${item.label}. ${item.hint}`}
              aria-setsize={MODES.length}
              aria-posinset={index + 1}
              onClick={() => {
                setMode(item.id)
                buzz('light')
                say(`${item.label} selecionado.`, 'polite')
              }}
              className={cn(
                'flex min-h-16 items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left',
                selected
                  ? 'border-primary bg-accent text-accent-foreground'
                  : 'border-border bg-card text-card-foreground',
              )}
            >
              <Icon aria-hidden="true" className="size-7 shrink-0" />
              <span className="flex flex-col">
                <span className="text-lg leading-tight font-bold">{item.label}</span>
                <span className="text-muted-foreground text-sm leading-snug">{item.hint}</span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Visor da câmera — decorativo para o leitor de tela */}
      <div
        aria-hidden="true"
        className="border-border bg-muted relative aspect-4/3 w-full overflow-hidden rounded-2xl border-2"
      >
        <video
          ref={videoRef}
          playsInline
          muted
          className={cn('size-full object-cover', !cameraOn && 'hidden')}
        />
        {!cameraOn ? (
          <div className="text-muted-foreground flex size-full items-center justify-center">
            <CameraOff className="size-14" />
          </div>
        ) : null}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {cameraError ? (
        <p role="alert" className="text-destructive text-base leading-relaxed font-bold">
          {cameraError}
        </p>
      ) : null}

      {/* Ações principais */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={cameraOn ? stopCamera : startCamera}
          aria-label={cameraOn ? 'Desligar a câmera' : 'Ligar a câmera'}
          className="border-border bg-secondary text-secondary-foreground flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 text-lg font-bold"
        >
          <Camera aria-hidden="true" className="size-6" />
          {cameraOn ? 'Desligar câmera' : 'Ligar câmera'}
        </button>

        <button
          type="button"
          onClick={analyze}
          disabled={analyzing}
          aria-label="Analisar a imagem agora"
          aria-describedby="dica-analisar"
          className={cn(
            'bg-primary text-primary-foreground flex min-h-20 items-center justify-center gap-3 rounded-2xl text-2xl font-black',
            analyzing && 'opacity-80',
          )}
        >
          {analyzing ? (
            <Loader2 aria-hidden="true" className="size-8 animate-spin" />
          ) : (
            <Sparkles aria-hidden="true" className="size-8" />
          )}
          {analyzing ? 'Analisando…' : 'Analisar agora'}
        </button>
        <p id="dica-analisar" className="text-muted-foreground text-sm leading-relaxed">
          A resposta é lida em voz alta automaticamente assim que fica pronta.
        </p>
      </div>

      {/* Resultado: texto é a informação primária, não a imagem */}
      <section aria-labelledby="titulo-resultado" className="flex flex-col gap-3">
        <h2 id="titulo-resultado" className="text-xl font-black">
          Descrição
        </h2>
        <div
          role="status"
          aria-live="polite"
          className="border-border bg-card text-card-foreground min-h-24 rounded-2xl border-2 p-4 text-lg leading-relaxed"
        >
          {analyzing
            ? 'Analisando a imagem…'
            : (result ?? 'Nenhuma análise ainda. Toque em Analisar agora.')}
        </div>

        {result && !analyzing ? (
          <button
            type="button"
            onClick={() => speak(result)}
            aria-label="Repetir a descrição em voz alta"
            className="border-border bg-secondary text-secondary-foreground flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 text-lg font-bold"
          >
            <Volume2 aria-hidden="true" className="size-6" />
            Repetir em voz alta
          </button>
        ) : null}
      </section>

      {/* Histórico: útil para revisar com um acompanhante */}
      {descriptions.length > 1 ? (
        <section aria-labelledby="titulo-historico" className="flex flex-col gap-3">
          <h2 id="titulo-historico" className="text-xl font-black">
            Análises anteriores
          </h2>
          <ul className="flex flex-col gap-2">
            {descriptions.slice(1, 5).map((d) => (
              <li
                key={d.id}
                className="border-border bg-card text-card-foreground rounded-xl border p-3 text-base leading-relaxed"
              >
                <span className="text-muted-foreground block text-xs font-bold uppercase">
                  {new Date(d.createdAt).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                {d.text}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
