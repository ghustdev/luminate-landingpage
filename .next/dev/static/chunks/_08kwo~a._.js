(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/glasses-status-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GlassesStatusCard",
    ()=>GlassesStatusCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$battery$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Battery$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/battery.mjs [app-client] (ecmascript) <export default as Battery>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$battery$2d$low$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BatteryLow$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/battery-low.mjs [app-client] (ecmascript) <export default as BatteryLow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bluetooth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bluetooth$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bluetooth.mjs [app-client] (ecmascript) <export default as Bluetooth>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bluetooth$2d$off$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BluetoothOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bluetooth-off.mjs [app-client] (ecmascript) <export default as BluetoothOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$glasses$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Glasses$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/glasses.mjs [app-client] (ecmascript) <export default as Glasses>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$luminate$2d$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/luminate-store.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$glasses$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/glasses-service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function GlassesStatusCard() {
    _s();
    const { glasses, connect, disconnect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$luminate$2d$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLuminate"])();
    const connected = glasses.status === 'connected';
    const connecting = glasses.status === 'connecting';
    const lowBattery = connected && glasses.battery <= 25;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": "titulo-oculos",
        className: "border-border bg-card text-card-foreground flex flex-col gap-4 rounded-2xl border-2 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": "true",
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex size-12 shrink-0 items-center justify-center rounded-xl', connected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$glasses$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Glasses$3e$__["Glasses"], {
                                    className: "size-7"
                                }, void 0, false, {
                                    fileName: "[project]/components/glasses-status-card.tsx",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/glasses-status-card.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        id: "titulo-oculos",
                                        className: "text-xl leading-tight font-black",
                                        children: "Meta Ray-Ban"
                                    }, void 0, false, {
                                        fileName: "[project]/components/glasses-status-card.tsx",
                                        lineNumber: 44,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground text-sm",
                                        children: glasses.deviceName
                                    }, void 0, false, {
                                        fileName: "[project]/components/glasses-status-card.tsx",
                                        lineNumber: 47,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/glasses-status-card.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/glasses-status-card.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    connected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bluetooth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bluetooth$3e$__["Bluetooth"], {
                        "aria-hidden": "true",
                        className: "text-primary size-6 shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/components/glasses-status-card.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bluetooth$2d$off$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BluetoothOff$3e$__["BluetoothOff"], {
                        "aria-hidden": "true",
                        className: "text-muted-foreground size-6 shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/components/glasses-status-card.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/glasses-status-card.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                role: "status",
                "aria-live": "polite",
                className: "text-lg leading-relaxed font-bold",
                children: connected ? `Conectado · ${glasses.battery}% de bateria` : connecting ? 'Procurando os óculos…' : 'Desconectado'
            }, void 0, false, {
                fileName: "[project]/components/glasses-status-card.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            connected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        role: "progressbar",
                        "aria-label": "Bateria dos óculos",
                        "aria-valuenow": glasses.battery,
                        "aria-valuemin": 0,
                        "aria-valuemax": 100,
                        "aria-valuetext": `${glasses.battery} por cento, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$glasses$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["describeBattery"])(glasses.battery)}`,
                        className: "bg-secondary h-4 w-full overflow-hidden rounded-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('h-full rounded-full', lowBattery ? 'bg-destructive' : 'bg-primary'),
                            style: {
                                width: `${glasses.battery}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/glasses-status-card.tsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/glasses-status-card.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-muted-foreground flex items-center gap-2 text-sm font-medium",
                        children: [
                            lowBattery ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$battery$2d$low$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BatteryLow$3e$__["BatteryLow"], {
                                "aria-hidden": "true",
                                className: "text-destructive size-5"
                            }, void 0, false, {
                                fileName: "[project]/components/glasses-status-card.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$battery$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Battery$3e$__["Battery"], {
                                "aria-hidden": "true",
                                className: "size-5"
                            }, void 0, false, {
                                fileName: "[project]/components/glasses-status-card.tsx",
                                lineNumber: 87,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$glasses$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["describeBattery"])(glasses.battery),
                                    " · sinal ",
                                    glasses.signalDbm,
                                    " dBm · firmware",
                                    ' ',
                                    glasses.firmware
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/glasses-status-card.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/glasses-status-card.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/glasses-status-card.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: connected ? disconnect : connect,
                disabled: connecting,
                "aria-label": connected ? 'Desconectar os óculos' : 'Conectar os óculos por Bluetooth',
                "aria-describedby": "dica-oculos",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('min-h-14 w-full rounded-xl text-lg font-bold', connected ? 'border-border bg-secondary text-secondary-foreground border-2' : 'bg-primary text-primary-foreground', connecting && 'opacity-70'),
                children: connecting ? 'Conectando…' : connected ? 'Desconectar' : 'Conectar óculos'
            }, void 0, false, {
                fileName: "[project]/components/glasses-status-card.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: "dica-oculos",
                className: "text-muted-foreground text-sm leading-relaxed",
                children: "A câmera dos óculos captura a imagem e o celular faz o processamento. O áudio volta pelos alto-falantes open-ear."
            }, void 0, false, {
                fileName: "[project]/components/glasses-status-card.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/glasses-status-card.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(GlassesStatusCard, "tK5IsjnLAnpGigM0th1DL/Fm/C8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$luminate$2d$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLuminate"]
    ];
});
_c = GlassesStatusCard;
var _c;
__turbopack_context__.k.register(_c, "GlassesStatusCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/voice-commands.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Roteador de comandos de voz.
 *
 * Interpreta a transcrição do usuário e devolve a intenção + a resposta falada.
 * Mantido puro (sem React) para poder ser reutilizado pelo evento de toque na
 * haste dos óculos (CHAR_BUTTON_EVENT) ou por um wake word em background.
 */ __turbopack_context__.s([
    "COMMAND_EXAMPLES",
    ()=>COMMAND_EXAMPLES,
    "parseVoiceCommand",
    ()=>parseVoiceCommand
]);
const RULES = [
    {
        kind: 'describe',
        patterns: /(descrev|o que|à minha frente|na minha frente|cena|ambiente|enxerg)/i,
        spoken: 'Descrevendo o que os óculos estão vendo.'
    },
    {
        kind: 'read-text',
        patterns: /(ler|leia|texto|placa|cardápio|cardapio|etiqueta|bula)/i,
        spoken: 'Procurando texto na imagem para ler em voz alta.'
    },
    {
        kind: 'call-support',
        patterns: /(ajuda|socorro|voluntári|volunt|liga|chama|emergência|emergencia|apoio)/i,
        spoken: 'Abrindo a Rede de Apoio.'
    },
    {
        kind: 'report-obstacle',
        patterns: /(obstáculo|obstaculo|buraco|tropec|caí|cai aqui|obra|degrau|registrar)/i,
        spoken: 'Registrando um obstáculo na sua posição atual.'
    },
    {
        kind: 'map',
        patterns: /(mapa|rota|caminho|onde estou|navega)/i,
        spoken: 'Abrindo o mapa colaborativo.'
    },
    {
        kind: 'battery',
        patterns: /(bateria|carga|conexão|conexao|conectad)/i,
        spoken: 'Verificando o status dos óculos.'
    },
    {
        kind: 'settings',
        patterns: /(ajuste|configura|velocidade|contato|permiss)/i,
        spoken: 'Abrindo as configurações de acessibilidade.'
    }
];
function parseVoiceCommand(transcript) {
    const text = transcript.trim();
    for (const rule of RULES){
        if (rule.patterns.test(text)) {
            return {
                kind: rule.kind,
                spoken: rule.spoken
            };
        }
    }
    return {
        kind: 'unknown',
        spoken: 'Não entendi. Você pode dizer: descreva a cena, ler texto, pedir ajuda, registrar obstáculo ou abrir o mapa.'
    };
}
const COMMAND_EXAMPLES = [
    'Descreva o que está à minha frente',
    'Leia esse texto para mim',
    'Preciso de ajuda de um voluntário',
    'Registrar um obstáculo aqui',
    'Qual a bateria dos óculos?'
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/voice-button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VoiceButton",
    ()=>VoiceButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.mjs [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic-off.mjs [app-client] (ecmascript) <export default as MicOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$luminate$2d$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/luminate-store.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$speech$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/speech-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$voice$2d$commands$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/voice-commands.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function VoiceButton() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { say, buzz, glasses, addPin } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$luminate$2d$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLuminate"])();
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [transcript, setTranscript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VoiceButton.useEffect": ()=>({
                "VoiceButton.useEffect": ()=>handleRef.current?.stop()
            })["VoiceButton.useEffect"]
    }["VoiceButton.useEffect"], []);
    const runIntent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VoiceButton.useCallback[runIntent]": (text)=>{
            const intent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$voice$2d$commands$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseVoiceCommand"])(text);
            say(intent.spoken, 'assertive');
            buzz('success');
            switch(intent.kind){
                case 'describe':
                case 'read-text':
                    router.push(intent.kind === 'read-text' ? '/visao?modo=texto' : '/visao?modo=cena');
                    break;
                case 'call-support':
                    router.push('/apoio');
                    break;
                case 'map':
                    router.push('/mapa');
                    break;
                case 'report-obstacle':
                    // Registra na posição aproximada atual (fallback: centro do mapa semente).
                    navigator.geolocation?.getCurrentPosition({
                        "VoiceButton.useCallback[runIntent]": (pos)=>{
                            addPin({
                                lat: pos.coords.latitude,
                                lng: pos.coords.longitude,
                                type: 'outro',
                                note: 'Obstáculo relatado por voz',
                                source: 'manual'
                            });
                            say('Obstáculo registrado e compartilhado com a rede.', 'polite');
                        }
                    }["VoiceButton.useCallback[runIntent]"], {
                        "VoiceButton.useCallback[runIntent]": ()=>{
                            addPin({
                                lat: -23.5629,
                                lng: -46.6544,
                                type: 'outro',
                                note: 'Obstáculo relatado por voz (posição aproximada)',
                                source: 'manual'
                            });
                            say('Obstáculo registrado com posição aproximada.', 'polite');
                        }
                    }["VoiceButton.useCallback[runIntent]"]);
                    break;
                case 'battery':
                    say(glasses.status === 'connected' ? `Óculos conectados com ${glasses.battery} por cento de bateria.` : 'Os óculos estão desconectados.', 'assertive');
                    break;
                case 'settings':
                    router.push('/ajustes');
                    break;
                default:
                    break;
            }
        }
    }["VoiceButton.useCallback[runIntent]"], [
        router,
        say,
        buzz,
        glasses,
        addPin
    ]);
    const stop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VoiceButton.useCallback[stop]": ()=>{
            handleRef.current?.stop();
            handleRef.current = null;
            setPhase('idle');
        }
    }["VoiceButton.useCallback[stop]"], []);
    const start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VoiceButton.useCallback[start]": ()=>{
            buzz('light');
            setTranscript('');
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$speech$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecognitionSupported"])()) {
                // Fallback demonstrativo quando o navegador não tem Speech Recognition.
                setPhase('processing');
                say('Reconhecimento de voz indisponível. Usando comando de exemplo.', 'assertive');
                window.setTimeout({
                    "VoiceButton.useCallback[start]": ()=>{
                        const demo = 'Descreva o que está à minha frente';
                        setTranscript(demo);
                        setPhase('idle');
                        runIntent(demo);
                    }
                }["VoiceButton.useCallback[start]"], 1200);
                return;
            }
            setPhase('listening');
            say('Ouvindo. Fale o seu comando.', 'assertive');
            handleRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$speech$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startListening"])({
                onResult: {
                    "VoiceButton.useCallback[start]": (text)=>{
                        setTranscript(text);
                        setPhase('processing');
                        runIntent(text);
                    }
                }["VoiceButton.useCallback[start]"],
                onError: {
                    "VoiceButton.useCallback[start]": (message)=>{
                        setPhase('idle');
                        buzz('error');
                        say(message, 'assertive');
                    }
                }["VoiceButton.useCallback[start]"],
                onEnd: {
                    "VoiceButton.useCallback[start]": ()=>{
                        handleRef.current = null;
                        setPhase({
                            "VoiceButton.useCallback[start]": (current)=>current === 'listening' ? 'idle' : current
                        }["VoiceButton.useCallback[start]"]);
                    }
                }["VoiceButton.useCallback[start]"]
            });
        }
    }["VoiceButton.useCallback[start]"], [
        buzz,
        say,
        runIntent
    ]);
    const listening = phase === 'listening';
    const processing = phase === 'processing';
    const stateLabel = listening ? 'Ouvindo. Toque novamente para parar.' : processing ? 'Processando o seu comando.' : 'Toque para falar um comando';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": "titulo-comando",
        className: "flex flex-col gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                id: "titulo-comando",
                className: "sr-only",
                children: "Comando de voz"
            }, void 0, false, {
                fileName: "[project]/components/voice-button.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: listening ? stop : start,
                disabled: processing,
                "aria-label": listening ? 'Parar de ouvir o comando de voz' : 'Falar um comando de voz',
                "aria-describedby": "dica-comando",
                "aria-pressed": listening,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex min-h-64 w-full flex-col items-center justify-center gap-4 rounded-3xl border-4 p-6 transition-colors', 'focus-visible:outline-4 focus-visible:outline-offset-4', listening ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary text-secondary-foreground border-primary/70 hover:bg-accent hover:text-accent-foreground', processing && 'opacity-90'),
                children: [
                    processing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        "aria-hidden": "true",
                        className: "size-20 animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/components/voice-button.tsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, this) : listening ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                        "aria-hidden": "true",
                        className: "size-20"
                    }, void 0, false, {
                        fileName: "[project]/components/voice-button.tsx",
                        lineNumber: 174,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__["MicOff"], {
                        "aria-hidden": "true",
                        className: "size-20"
                    }, void 0, false, {
                        fileName: "[project]/components/voice-button.tsx",
                        lineNumber: 176,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-3xl leading-tight font-black text-balance",
                        children: listening ? 'Ouvindo…' : processing ? 'Processando…' : 'Falar'
                    }, void 0, false, {
                        fileName: "[project]/components/voice-button.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-lg leading-relaxed font-medium text-balance opacity-90",
                        children: stateLabel
                    }, void 0, false, {
                        fileName: "[project]/components/voice-button.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/voice-button.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: "dica-comando",
                className: "text-muted-foreground text-base leading-relaxed",
                children: [
                    "Diga por exemplo: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-foreground font-bold",
                        children: "descreva a cena"
                    }, void 0, false, {
                        fileName: "[project]/components/voice-button.tsx",
                        lineNumber: 187,
                        columnNumber: 27
                    }, this),
                    ",",
                    ' ',
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-foreground font-bold",
                        children: "ler texto"
                    }, void 0, false, {
                        fileName: "[project]/components/voice-button.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    " ou",
                    ' ',
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-foreground font-bold",
                        children: "preciso de ajuda"
                    }, void 0, false, {
                        fileName: "[project]/components/voice-button.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    ". Você também pode tocar duas vezes na haste dos óculos."
                ]
            }, void 0, true, {
                fileName: "[project]/components/voice-button.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            transcript ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "border-border bg-card text-card-foreground rounded-xl border p-3 text-base",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted-foreground block text-xs font-bold uppercase",
                        children: "Último comando ouvido"
                    }, void 0, false, {
                        fileName: "[project]/components/voice-button.tsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this),
                    transcript
                ]
            }, void 0, true, {
                fileName: "[project]/components/voice-button.tsx",
                lineNumber: 195,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/voice-button.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
_s(VoiceButton, "9rjSl+aKELhN2attl0kroNO7jRI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$luminate$2d$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLuminate"]
    ];
});
_c = VoiceButton;
var _c;
__turbopack_context__.k.register(_c, "VoiceButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/mapping-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * MappingService — o "Waze da Acessibilidade".
 *
 * COMO FUNCIONA NO APP NATIVO:
 * 1. Um Foreground Service (Android) / Background Location (iOS) mantém o GPS ativo.
 *    - `expo-location`: startLocationUpdatesAsync com accuracy BestForNavigation.
 * 2. O acelerômetro é amostrado a ~50Hz (`expo-sensors` / `react-native-sensors`).
 * 3. Um tropeço é detectado quando a magnitude do vetor de aceleração passa de
 *    ~2.5g seguida de uma queda abrupta (assinatura de impacto + parada).
 * 4. Nesse instante, gravamos a última posição GPS como pin e sincronizamos com
 *    o backend (Supabase/Firebase) quando houver rede.
 *
 * AQUI (protótipo web) usamos a DeviceMotion API quando disponível e, em
 * desktop, um gerador simulado — mantendo a mesma interface pública.
 */ __turbopack_context__.s([
    "distanceMeters",
    ()=>distanceMeters,
    "shouldPromoteToPin",
    ()=>shouldPromoteToPin,
    "startFallDetection",
    ()=>startFallDetection
]);
/** Limiar de impacto em m/s². 1g ≈ 9.8; usamos ~2.5g. */ const IMPACT_THRESHOLD = 24;
const FALLBACK_CENTER = {
    lat: -23.5629,
    lng: -46.6544
};
async function currentPosition() {
    if (typeof navigator === 'undefined' || !navigator.geolocation) return FALLBACK_CENTER;
    return new Promise((resolve)=>{
        navigator.geolocation.getCurrentPosition((pos)=>resolve({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            }), ()=>resolve(FALLBACK_CENTER), {
            enableHighAccuracy: true,
            timeout: 4000
        });
    });
}
function startFallDetection(onDetect) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    let lastTrigger = 0;
    const handleMotion = async (event)=>{
        const a = event.accelerationIncludingGravity;
        if (!a || a.x == null || a.y == null || a.z == null) return;
        const magnitude = Math.sqrt(a.x ** 2 + a.y ** 2 + a.z ** 2);
        // Debounce de 20s: evita registrar o mesmo tropeço várias vezes.
        if (magnitude < IMPACT_THRESHOLD || Date.now() - lastTrigger < 20000) return;
        lastTrigger = Date.now();
        const { lat, lng } = await currentPosition();
        onDetect({
            lat,
            lng,
            type: 'outro',
            note: 'Impacto detectado pelo acelerômetro (possível tropeço)',
            source: 'queda'
        });
    };
    if ('DeviceMotionEvent' in window) {
        window.addEventListener('devicemotion', handleMotion);
        return ()=>window.removeEventListener('devicemotion', handleMotion);
    }
    // Sem sensor (desktop): nada é gerado, apenas devolvemos um no-op.
    return ()=>{};
}
function shouldPromoteToPin(detections, candidate) {
    const RADIUS_DEG = 0.00013 // ~15 metros
    ;
    const nearby = detections.filter((d)=>d.type === candidate.type && Math.abs(d.lat - candidate.lat) < RADIUS_DEG && Math.abs(d.lng - candidate.lng) < RADIUS_DEG);
    return nearby.length >= 2;
}
function distanceMeters(a, b) {
    const R = 6371000;
    const dLat = (b.lat - a.lat) * Math.PI / 180;
    const dLng = (b.lng - a.lng) * Math.PI / 180;
    const lat1 = a.lat * Math.PI / 180;
    const lat2 = b.lat * Math.PI / 180;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/background-mapping-banner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BackgroundMappingBanner",
    ()=>BackgroundMappingBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/radar.mjs [app-client] (ecmascript) <export default as Radar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$luminate$2d$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/luminate-store.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mapping$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mapping-service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function BackgroundMappingBanner() {
    _s();
    const { prefs, updatePrefs, pins, addPin, say } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$luminate$2d$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLuminate"])();
    const stopRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Liga/desliga o serviço de detecção conforme a preferência do usuário.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BackgroundMappingBanner.useEffect": ()=>{
            if (!prefs.backgroundMapping) {
                stopRef.current?.();
                stopRef.current = null;
                return;
            }
            stopRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mapping$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startFallDetection"])({
                "BackgroundMappingBanner.useEffect": (pin)=>{
                    // Registro silencioso: sem TTS, para não interromper a caminhada.
                    addPin(pin);
                }
            }["BackgroundMappingBanner.useEffect"]);
            return ({
                "BackgroundMappingBanner.useEffect": ()=>{
                    stopRef.current?.();
                    stopRef.current = null;
                }
            })["BackgroundMappingBanner.useEffect"];
        }
    }["BackgroundMappingBanner.useEffect"], [
        prefs.backgroundMapping,
        addPin
    ]);
    const toggle = ()=>{
        const next = !prefs.backgroundMapping;
        updatePrefs({
            backgroundMapping: next
        });
        say(next ? 'Mapeamento colaborativo ativado. Registros são feitos em silêncio.' : 'Mapeamento colaborativo desativado.', 'polite');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": "titulo-mapeamento",
        className: "border-border bg-card text-card-foreground flex flex-col gap-3 rounded-2xl border-2 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radar$3e$__["Radar"], {
                        "aria-hidden": "true",
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('size-7 shrink-0', prefs.backgroundMapping ? 'text-primary' : 'text-muted-foreground')
                    }, void 0, false, {
                        fileName: "[project]/components/background-mapping-banner.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "titulo-mapeamento",
                                className: "text-lg leading-tight font-black",
                                children: "Mapeamento colaborativo"
                            }, void 0, false, {
                                fileName: "[project]/components/background-mapping-banner.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground mt-1 text-sm leading-relaxed",
                                children: "Em segundo plano, o app registra buracos, obras e degraus usando GPS e os sensores de movimento. Nada é anunciado em voz para não te interromper."
                            }, void 0, false, {
                                fileName: "[project]/components/background-mapping-banner.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/background-mapping-banner.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/background-mapping-banner.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                "aria-live": "off",
                className: "text-base font-bold",
                children: [
                    pins.length,
                    " obstáculos na sua região"
                ]
            }, void 0, true, {
                fileName: "[project]/components/background-mapping-banner.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                role: "switch",
                "aria-checked": prefs.backgroundMapping,
                "aria-label": "Mapeamento colaborativo em segundo plano",
                onClick: toggle,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex min-h-14 items-center justify-between rounded-xl border-2 px-4 text-base font-bold', prefs.backgroundMapping ? 'border-primary bg-accent text-accent-foreground' : 'border-border bg-secondary text-secondary-foreground'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: prefs.backgroundMapping ? 'Ativado' : 'Desativado'
                    }, void 0, false, {
                        fileName: "[project]/components/background-mapping-banner.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": "true",
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex h-8 w-14 items-center rounded-full p-1', prefs.backgroundMapping ? 'bg-primary justify-end' : 'bg-muted-foreground/40'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "bg-background size-6 rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/components/background-mapping-banner.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/background-mapping-banner.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/background-mapping-banner.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/background-mapping-banner.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(BackgroundMappingBanner, "8croHdcG3xpec6cSubeFD1C9drQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$luminate$2d$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLuminate"]
    ];
});
_c = BackgroundMappingBanner;
var _c;
__turbopack_context__.k.register(_c, "BackgroundMappingBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/battery.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Battery
]);
/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M 22 14 L 22 10",
            key: "nqc4tb"
        }
    ],
    [
        "rect",
        {
            x: "2",
            y: "6",
            width: "16",
            height: "12",
            rx: "2",
            key: "13zb55"
        }
    ]
];
const Battery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("battery", __iconNode);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/battery.mjs [app-client] (ecmascript) <export default as Battery>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Battery",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$battery$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$battery$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/battery.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/battery-low.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>BatteryLow
]);
/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M22 14v-4",
            key: "14q9d5"
        }
    ],
    [
        "path",
        {
            d: "M6 14v-4",
            key: "14a6bd"
        }
    ],
    [
        "rect",
        {
            x: "2",
            y: "6",
            width: "16",
            height: "12",
            rx: "2",
            key: "13zb55"
        }
    ]
];
const BatteryLow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("battery-low", __iconNode);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/battery-low.mjs [app-client] (ecmascript) <export default as BatteryLow>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BatteryLow",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$battery$2d$low$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$battery$2d$low$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/battery-low.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/bluetooth.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Bluetooth
]);
/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m7 7 10 10-5 5V2l5 5L7 17",
            key: "1q5490"
        }
    ]
];
const Bluetooth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("bluetooth", __iconNode);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/bluetooth.mjs [app-client] (ecmascript) <export default as Bluetooth>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Bluetooth",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bluetooth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bluetooth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bluetooth.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/bluetooth-off.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>BluetoothOff
]);
/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m17 17-5 5V12l-5 5",
            key: "v5aci6"
        }
    ],
    [
        "path",
        {
            d: "m2 2 20 20",
            key: "1ooewy"
        }
    ],
    [
        "path",
        {
            d: "M14.5 9.5 17 7l-5-5v4.5",
            key: "1kddfz"
        }
    ]
];
const BluetoothOff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("bluetooth-off", __iconNode);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/bluetooth-off.mjs [app-client] (ecmascript) <export default as BluetoothOff>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BluetoothOff",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bluetooth$2d$off$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bluetooth$2d$off$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bluetooth-off.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/glasses.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Glasses
]);
/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "6",
            cy: "15",
            r: "4",
            key: "vux9w4"
        }
    ],
    [
        "circle",
        {
            cx: "18",
            cy: "15",
            r: "4",
            key: "18o8ve"
        }
    ],
    [
        "path",
        {
            d: "M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2",
            key: "1ag4bs"
        }
    ],
    [
        "path",
        {
            d: "M2.5 13 5 7c.7-1.3 1.4-2 3-2",
            key: "1hm1gs"
        }
    ],
    [
        "path",
        {
            d: "M21.5 13 19 7c-.7-1.3-1.5-2-3-2",
            key: "1r31ai"
        }
    ]
];
const Glasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("glasses", __iconNode);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/glasses.mjs [app-client] (ecmascript) <export default as Glasses>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Glasses",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$glasses$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$glasses$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/glasses.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>LoaderCircle
]);
/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21 12a9 9 0 1 1-6.219-8.56",
            key: "13zald"
        }
    ]
];
const LoaderCircle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("loader-circle", __iconNode);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-client] (ecmascript) <export default as Loader2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Loader2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/mic.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Mic
]);
/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 19v3",
            key: "npa21l"
        }
    ],
    [
        "path",
        {
            d: "M19 10v2a7 7 0 0 1-14 0v-2",
            key: "1vc78b"
        }
    ],
    [
        "rect",
        {
            x: "9",
            y: "2",
            width: "6",
            height: "13",
            rx: "3",
            key: "s6n7sd"
        }
    ]
];
const Mic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("mic", __iconNode);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/mic.mjs [app-client] (ecmascript) <export default as Mic>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Mic",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/mic-off.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>MicOff
]);
/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 19v3",
            key: "npa21l"
        }
    ],
    [
        "path",
        {
            d: "M15 9.34V5a3 3 0 0 0-5.68-1.33",
            key: "1gzdoj"
        }
    ],
    [
        "path",
        {
            d: "M16.95 16.95A7 7 0 0 1 5 12v-2",
            key: "cqa7eg"
        }
    ],
    [
        "path",
        {
            d: "M18.89 13.23A7 7 0 0 0 19 12v-2",
            key: "16hl24"
        }
    ],
    [
        "path",
        {
            d: "m2 2 20 20",
            key: "1ooewy"
        }
    ],
    [
        "path",
        {
            d: "M9 9v3a3 3 0 0 0 5.12 2.12",
            key: "r2i35w"
        }
    ]
];
const MicOff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("mic-off", __iconNode);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/mic-off.mjs [app-client] (ecmascript) <export default as MicOff>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MicOff",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic-off.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/radar.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Radar
]);
/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M19.07 4.93A10 10 0 0 0 6.99 3.34",
            key: "z3du51"
        }
    ],
    [
        "path",
        {
            d: "M4 6h.01",
            key: "oypzma"
        }
    ],
    [
        "path",
        {
            d: "M2.29 9.62A10 10 0 1 0 21.31 8.35",
            key: "qzzz0"
        }
    ],
    [
        "path",
        {
            d: "M16.24 7.76A6 6 0 1 0 8.23 16.67",
            key: "1yjesh"
        }
    ],
    [
        "path",
        {
            d: "M12 18h.01",
            key: "mhygvu"
        }
    ],
    [
        "path",
        {
            d: "M17.99 11.66A6 6 0 0 1 15.77 16.67",
            key: "1u2y91"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "2",
            key: "1c9p78"
        }
    ],
    [
        "path",
        {
            d: "m13.41 10.59 5.66-5.66",
            key: "mhq4k0"
        }
    ]
];
const Radar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("radar", __iconNode);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/radar.mjs [app-client] (ecmascript) <export default as Radar>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Radar",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/radar.mjs [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_08kwo~a._.js.map