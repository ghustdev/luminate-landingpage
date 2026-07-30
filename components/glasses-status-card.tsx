'use client'

/**
 * GlassesStatusCard — status da conexão BLE com os Meta Ray-Ban.
 *
 * ACESSIBILIDADE:
 * - O card é um `<section>` com `aria-labelledby`, então o leitor de tela
 *   anuncia "Status dos óculos" ao entrar na região.
 * - `role="status"` + `aria-live="polite"` no bloco de estado: mudanças de
 *   bateria/conexão são anunciadas sem roubar o foco do usuário.
 * - A barra de bateria usa `role="progressbar"` com `aria-valuenow` e
 *   `aria-valuetext` em português ("78 por cento, bateria boa").
 * - Nenhuma informação depende apenas de cor: há sempre texto equivalente.
 */

import { Battery, BatteryLow, Bluetooth, BluetoothOff, Glasses } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLuminate } from '@/lib/luminate-store'
import { describeBattery } from '@/lib/glasses-service'

export function GlassesStatusCard() {
  const { glasses, connect, disconnect } = useLuminate()
  const connected = glasses.status === 'connected'
  const connecting = glasses.status === 'connecting'
  const lowBattery = connected && glasses.battery <= 25

  return (
    <section
      aria-labelledby="titulo-oculos"
      className="border-border bg-card text-card-foreground flex flex-col gap-4 rounded-2xl border-2 p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className={cn(
              'flex size-12 shrink-0 items-center justify-center rounded-xl',
              connected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground',
            )}
          >
            <Glasses className="size-7" />
          </span>
          <div>
            <h2 id="titulo-oculos" className="text-xl leading-tight font-black">
              Meta Ray-Ban
            </h2>
            <p className="text-muted-foreground text-sm">{glasses.deviceName}</p>
          </div>
        </div>

        {connected ? (
          <Bluetooth aria-hidden="true" className="text-primary size-6 shrink-0" />
        ) : (
          <BluetoothOff aria-hidden="true" className="text-muted-foreground size-6 shrink-0" />
        )}
      </div>

      {/* Estado textual: fonte única de verdade para o leitor de tela */}
      <p role="status" aria-live="polite" className="text-lg leading-relaxed font-bold">
        {connected
          ? `Conectado · ${glasses.battery}% de bateria`
          : connecting
            ? 'Procurando os óculos…'
            : 'Desconectado'}
      </p>

      {connected ? (
        <div className="flex flex-col gap-2">
          <div
            role="progressbar"
            aria-label="Bateria dos óculos"
            aria-valuenow={glasses.battery}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuetext={`${glasses.battery} por cento, ${describeBattery(glasses.battery)}`}
            className="bg-secondary h-4 w-full overflow-hidden rounded-full"
          >
            <div
              className={cn('h-full rounded-full', lowBattery ? 'bg-destructive' : 'bg-primary')}
              style={{ width: `${glasses.battery}%` }}
            />
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            {lowBattery ? (
              <BatteryLow aria-hidden="true" className="text-destructive size-5" />
            ) : (
              <Battery aria-hidden="true" className="size-5" />
            )}
            <span>
              {describeBattery(glasses.battery)} · sinal {glasses.signalDbm} dBm · firmware{' '}
              {glasses.firmware}
            </span>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={connected ? disconnect : connect}
        disabled={connecting}
        aria-label={connected ? 'Desconectar os óculos' : 'Conectar os óculos por Bluetooth'}
        aria-describedby="dica-oculos"
        className={cn(
          'min-h-14 w-full rounded-xl text-lg font-bold',
          connected
            ? 'border-border bg-secondary text-secondary-foreground border-2'
            : 'bg-primary text-primary-foreground',
          connecting && 'opacity-70',
        )}
      >
        {connecting ? 'Conectando…' : connected ? 'Desconectar' : 'Conectar óculos'}
      </button>
      <p id="dica-oculos" className="text-muted-foreground text-sm leading-relaxed">
        A câmera dos óculos captura a imagem e o celular faz o processamento. O áudio volta pelos
        alto-falantes open-ear.
      </p>
    </section>
  )
}
