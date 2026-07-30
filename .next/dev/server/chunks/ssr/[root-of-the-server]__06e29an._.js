module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/glasses-service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * GlassesService — gerencia a conexao com os Meta Ray-Ban Smart Glasses.
 *
 * ARQUITETURA (processamento distribuido):
 *   Oculos (captura de imagem/audio)  --BLE-->  App (processamento + IA)  --BLE-->  Oculos (TTS)
 *
 * NO APP NATIVO este arquivo seria implementado com `react-native-ble-plx`:
 *
 *   const manager = new BleManager()
 *   manager.startDeviceScan([LUMINATE_SERVICE_UUID], null, (error, device) => { ... })
 *   const device = await manager.connectToDevice(id)
 *   await device.discoverAllServicesAndCharacteristics()
 *   device.monitorCharacteristicForAndUpdate(SERVICE, FRAME_CHAR, (e, c) => onFrame(c.value))
 *   await device.writeCharacteristicWithResponseForService(SERVICE, AUDIO_CHAR, base64Audio)
 *
 * Como o navegador nao expoe o SDK da Meta, aqui mantemos a MESMA interface publica
 * com um transporte simulado. Trocar a implementacao interna nao afeta a UI.
 */ __turbopack_context__.s([
    "CHAR_AUDIO_OUT",
    ()=>CHAR_AUDIO_OUT,
    "CHAR_BATTERY",
    ()=>CHAR_BATTERY,
    "CHAR_BUTTON_EVENT",
    ()=>CHAR_BUTTON_EVENT,
    "CHAR_FRAME_STREAM",
    ()=>CHAR_FRAME_STREAM,
    "LUMINATE_SERVICE_UUID",
    ()=>LUMINATE_SERVICE_UUID,
    "connectGlasses",
    ()=>connectGlasses,
    "describeBattery",
    ()=>describeBattery,
    "describeStatus",
    ()=>describeStatus,
    "disconnectGlasses",
    ()=>disconnectGlasses,
    "getGlassesState",
    ()=>getGlassesState,
    "routeAudioToGlasses",
    ()=>routeAudioToGlasses,
    "subscribeGlasses",
    ()=>subscribeGlasses
]);
const LUMINATE_SERVICE_UUID = '0000fe80-0000-1000-8000-00805f9b34fb';
const CHAR_FRAME_STREAM = '0000fe81-0000-1000-8000-00805f9b34fb' // oculos -> app (frames)
;
const CHAR_AUDIO_OUT = '0000fe82-0000-1000-8000-00805f9b34fb' // app -> oculos (TTS)
;
const CHAR_BATTERY = '00002a19-0000-1000-8000-00805f9b34fb' // padrao Battery Service
;
const CHAR_BUTTON_EVENT = '0000fe83-0000-1000-8000-00805f9b34fb' // toque na haste
;
const initialState = {
    status: 'disconnected',
    battery: 0,
    deviceName: 'Ray-Ban Meta • Wayfarer',
    firmware: '14.2.1',
    signalDbm: -100
};
let state = {
    ...initialState
};
const listeners = new Set();
let batteryTimer = null;
function emit() {
    const snapshot = {
        ...state
    };
    listeners.forEach((l)=>l(snapshot));
}
function subscribeGlasses(listener) {
    listeners.add(listener);
    listener({
        ...state
    });
    return ()=>listeners.delete(listener);
}
function getGlassesState() {
    return {
        ...state
    };
}
async function connectGlasses() {
    if (state.status === 'connected') return {
        ...state
    };
    state = {
        ...state,
        status: 'connecting'
    };
    emit();
    // Simula scan BLE + descoberta de servicos + handshake de autenticacao.
    await new Promise((resolve)=>setTimeout(resolve, 1400));
    state = {
        ...state,
        status: 'connected',
        battery: 78,
        signalDbm: -52
    };
    emit();
    startBatteryMonitor();
    return {
        ...state
    };
}
function disconnectGlasses() {
    stopBatteryMonitor();
    state = {
        ...initialState
    };
    emit();
}
/** Assinatura da CHAR_BATTERY: o firmware notifica o nivel periodicamente. */ function startBatteryMonitor() {
    stopBatteryMonitor();
    batteryTimer = setInterval(()=>{
        if (state.status !== 'connected') return;
        const drained = Math.max(4, state.battery - 1);
        const jitter = Math.round((Math.random() - 0.5) * 6);
        state = {
            ...state,
            battery: drained,
            signalDbm: Math.min(-38, Math.max(-78, state.signalDbm + jitter))
        };
        emit();
    }, 45000);
}
function stopBatteryMonitor() {
    if (batteryTimer) clearInterval(batteryTimer);
    batteryTimer = null;
}
function routeAudioToGlasses() {
    return state.status === 'connected';
}
function describeBattery(battery) {
    if (battery <= 10) return 'bateria crítica';
    if (battery <= 25) return 'bateria baixa';
    if (battery <= 60) return 'bateria média';
    return 'bateria boa';
}
function describeStatus(s) {
    if (s.status === 'connected') {
        return `Óculos conectados. ${s.battery} por cento de bateria, ${describeBattery(s.battery)}.`;
    }
    if (s.status === 'connecting') return 'Procurando os óculos por Bluetooth.';
    return 'Óculos desconectados.';
}
}),
"[project]/lib/speech-service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * SpeechService — camada de Text-to-Speech (TTS) e Speech-to-Text (STT).
 *
 * ACESSIBILIDADE:
 * - Todo retorno da IA e toda mudanca de estado relevante do app passa por `speak()`,
 *   garantindo que o usuario cego receba a informacao por audio sem depender da tela.
 * - No app nativo (React Native), o `speak()` seria substituido por `expo-speech` /
 *   `react-native-tts` com a saida roteada por Bluetooth para os alto-falantes
 *   open-ear dos Meta Ray-Ban. Aqui usamos a Web Speech API como equivalente.
 * - `announce()` usa uma live region ARIA para leitores de tela (VoiceOver/TalkBack),
 *   evitando "fala dupla" quando o leitor de tela do sistema ja esta ativo.
 */ __turbopack_context__.s([
    "announce",
    ()=>announce,
    "cancelSpeech",
    ()=>cancelSpeech,
    "getSpeechRate",
    ()=>getSpeechRate,
    "haptic",
    ()=>haptic,
    "isRecognitionSupported",
    ()=>isRecognitionSupported,
    "isTtsSupported",
    ()=>isTtsSupported,
    "notify",
    ()=>notify,
    "setSpeechRate",
    ()=>setSpeechRate,
    "setTtsEnabled",
    ()=>setTtsEnabled,
    "speak",
    ()=>speak,
    "startListening",
    ()=>startListening
]);
let currentRate = 1;
let ttsEnabled = true;
function setSpeechRate(rate) {
    currentRate = rate;
}
function getSpeechRate() {
    return currentRate;
}
function setTtsEnabled(enabled) {
    ttsEnabled = enabled;
    if (!enabled) cancelSpeech();
}
function isTtsSupported() {
    return ("TURBOPACK compile-time value", "undefined") !== 'undefined' && 'speechSynthesis' in window;
}
function speak(text, options) {
    if (!ttsEnabled || !isTtsSupported() || !text.trim()) return;
    //TURBOPACK unreachable
    ;
    const synth = undefined;
    const utterance = undefined;
    // Prefere uma voz pt-BR quando disponivel no dispositivo.
    const ptVoice = undefined;
}
function cancelSpeech() {
    if (!isTtsSupported()) return;
    //TURBOPACK unreachable
    ;
}
function announce(message, priority = 'polite') {
    if (typeof document === 'undefined') return;
    const id = priority === 'assertive' ? 'luminate-live-assertive' : 'luminate-live-polite';
    const region = document.getElementById(id);
    if (!region) return;
    // Limpa antes para forcar o leitor de tela a reanunciar mensagens repetidas.
    region.textContent = '';
    window.setTimeout(()=>{
        region.textContent = message;
    }, 60);
}
function notify(message, priority = 'polite') {
    speak(message, {
        interrupt: priority === 'assertive'
    });
    announce(message, priority);
}
function haptic(pattern = 'light') {
    if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return;
    const patterns = {
        light: 20,
        success: [
            30,
            60,
            30
        ],
        error: [
            80,
            60,
            80,
            60,
            80
        ]
    };
    try {
        navigator.vibrate(patterns[pattern]);
    } catch  {
    // Silencioso: vibracao e um reforco, nunca o unico canal de feedback.
    }
}
function isRecognitionSupported() {
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
}
function startListening(handlers) {
    if (!isRecognitionSupported()) {
        handlers.onError?.('Reconhecimento de voz não suportado neste dispositivo.');
        return null;
    }
    const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Ctor) return null;
    const recognition = new Ctor();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event)=>{
        const transcript = event.results[0]?.[0]?.transcript ?? '';
        handlers.onResult(transcript);
    };
    recognition.onerror = (event)=>{
        handlers.onError?.(event.error === 'not-allowed' ? 'Permissão de microfone negada.' : 'Não consegui ouvir. Tente novamente.');
    };
    recognition.onend = ()=>handlers.onEnd?.();
    recognition.start();
    return {
        stop: ()=>recognition.stop()
    };
}
}),
"[project]/lib/luminate-store.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LuminateProvider",
    ()=>LuminateProvider,
    "useLuminate",
    ()=>useLuminate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * LuminateProvider — estado global do app (dados simulados nesta versao).
 *
 * ACESSIBILIDADE:
 * - Centraliza o TTS: qualquer parte do app chama `say()` e o usuario ouve.
 * - Guarda as preferencias de acessibilidade (velocidade do TTS, alto contraste,
 *   tamanho da fonte) e as aplica no <html> para valer em todas as telas.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$glasses$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/glasses-service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$speech$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/speech-service.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const DEFAULT_PREFS = {
    speechRate: 1,
    ttsEnabled: true,
    highContrast: false,
    fontScale: 1,
    hapticsEnabled: true,
    backgroundMapping: true,
    autoDescribe: false
};
const SEED_CONTACTS = [
    {
        id: 'c1',
        name: 'Marina Alves',
        relation: 'Irmã',
        phone: '+55 11 98888-1010',
        favorite: true,
        available: true
    },
    {
        id: 'c2',
        name: 'Rede Luminate • Voluntários',
        relation: 'Plantão 24h',
        phone: 'sala-voluntarios',
        favorite: true,
        available: true
    },
    {
        id: 'c3',
        name: 'Paulo Menezes',
        relation: 'Vizinho',
        phone: '+55 11 97777-2020',
        favorite: false,
        available: false
    }
];
// Pins semente ao redor da Av. Paulista (Sao Paulo) para o mapa colaborativo.
const SEED_PINS = [
    {
        id: 'p1',
        lat: -23.5613,
        lng: -46.6565,
        type: 'obra',
        note: 'Obra na calçada, tapume estreitando a passagem',
        confirmations: 12,
        source: 'ia',
        createdAt: Date.now() - 86400000 * 2
    },
    {
        id: 'p2',
        lat: -23.5641,
        lng: -46.6529,
        type: 'buraco',
        note: 'Buraco fundo próximo ao poste',
        confirmations: 7,
        source: 'queda',
        createdAt: Date.now() - 86400000 * 5
    },
    {
        id: 'p3',
        lat: -23.5589,
        lng: -46.6602,
        type: 'degrau',
        note: 'Degrau sem sinalização na entrada da galeria',
        confirmations: 4,
        source: 'manual',
        createdAt: Date.now() - 86400000
    },
    {
        id: 'p4',
        lat: -23.5658,
        lng: -46.6512,
        type: 'galho',
        note: 'Galho baixo na altura da cabeça',
        confirmations: 9,
        source: 'ia',
        createdAt: Date.now() - 3600000 * 8
    }
];
const LuminateContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function LuminateProvider({ children }) {
    const [glasses, setGlasses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        status: 'disconnected',
        battery: 0,
        deviceName: 'Ray-Ban Meta • Wayfarer',
        firmware: '14.2.1',
        signalDbm: -100
    });
    const [prefs, setPrefs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_PREFS);
    const [contacts, setContacts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(SEED_CONTACTS);
    const [pins, setPins] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(SEED_PINS);
    const [descriptions, setDescriptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const prefsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(prefs);
    prefsRef.current = prefs;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$glasses$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeGlasses"])(setGlasses), []);
    // Propaga as preferencias para o servico de fala e para o documento.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$speech$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSpeechRate"])(prefs.speechRate);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$speech$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setTtsEnabled"])(prefs.ttsEnabled);
        const root = document.documentElement;
        root.classList.toggle('contrast-boost', prefs.highContrast);
        root.style.fontSize = `${16 * prefs.fontScale}px`;
    }, [
        prefs
    ]);
    const say = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message, priority = 'polite')=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$speech$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["notify"])(message, priority);
    }, []);
    const buzz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((pattern = 'light')=>{
        if (prefsRef.current.hapticsEnabled) (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$speech$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["haptic"])(pattern);
    }, []);
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        say('Procurando os óculos por Bluetooth.', 'assertive');
        const next = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$glasses$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["connectGlasses"])();
        buzz('success');
        say(`Óculos conectados. ${next.battery} por cento de bateria.`, 'assertive');
    }, [
        say,
        buzz
    ]);
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$glasses$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disconnectGlasses"])();
        buzz('light');
        say('Óculos desconectados.', 'assertive');
    }, [
        say,
        buzz
    ]);
    const updatePrefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((patch)=>{
        setPrefs((current)=>({
                ...current,
                ...patch
            }));
    }, []);
    const toggleFavorite = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setContacts((list)=>list.map((c)=>c.id === id ? {
                    ...c,
                    favorite: !c.favorite
                } : c));
    }, []);
    const addContact = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((contact)=>{
        setContacts((list)=>[
                ...list,
                {
                    ...contact,
                    id: `c${Date.now()}`,
                    available: true
                }
            ]);
    }, []);
    const removeContact = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setContacts((list)=>list.filter((c)=>c.id !== id));
    }, []);
    const addPin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((pin)=>{
        setPins((list)=>[
                {
                    ...pin,
                    id: `p${Date.now()}`,
                    createdAt: Date.now(),
                    confirmations: 1
                },
                ...list
            ]);
    }, []);
    const confirmPin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setPins((list)=>list.map((p)=>p.id === id ? {
                    ...p,
                    confirmations: p.confirmations + 1
                } : p));
    }, []);
    const addDescription = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((d)=>{
        setDescriptions((list)=>[
                {
                    ...d,
                    id: `d${Date.now()}`,
                    createdAt: Date.now()
                },
                ...list
            ]);
    }, []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
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
            buzz
        }), [
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
        buzz
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LuminateContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/luminate-store.tsx",
        lineNumber: 299,
        columnNumber: 10
    }, this);
}
function useLuminate() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LuminateContext);
    if (!ctx) throw new Error('useLuminate deve ser usado dentro de LuminateProvider');
    return ctx;
}
}),
"[project]/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/components/app-shell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppShell",
    ()=>AppShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * AppShell — moldura do app: header de status + conteúdo + navegação inferior.
 *
 * ACESSIBILIDADE:
 * - Ordem de foco lógica top-down: skip link -> header -> main -> navegação.
 * - `<nav>` com `aria-label` e cada item com `aria-current="page"` para o
 *   leitor de tela informar onde o usuário está.
 * - Alvos de toque de 64px de altura (muito acima do mínimo de 44x44pt).
 * - Ícone + rótulo textual sempre juntos: nunca dependemos só do ícone.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.mjs [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.mjs [app-ssr] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map.mjs [app-ssr] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.mjs [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$luminate$2d$store$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/luminate-store.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$glasses$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/glasses-service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
const NAV_ITEMS = [
    {
        href: '/',
        label: 'Início',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"],
        hint: 'Tela principal com o botão de voz'
    },
    {
        href: '/visao',
        label: 'Visão IA',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"],
        hint: 'Descrever a cena com inteligência artificial'
    },
    {
        href: '/apoio',
        label: 'Apoio',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        hint: 'Chamar um voluntário ou familiar'
    },
    {
        href: '/mapa',
        label: 'Mapa',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"],
        hint: 'Mapa colaborativo de obstáculos'
    },
    {
        href: '/ajustes',
        label: 'Ajustes',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
        hint: 'Configurações de acessibilidade'
    }
];
function AppShell({ children }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const { glasses, say } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$luminate$2d$store$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLuminate"])();
    // Feedback de voz automático ao abrir o app: "Luminate ativo..."
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>{
            say(`Luminate ativo. ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$glasses$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["describeStatus"])(glasses)}`, 'assertive');
        }, 700);
        return ()=>window.clearTimeout(timer);
    // Executa apenas na montagem inicial, de propósito.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto flex min-h-dvh w-full max-w-md flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusHeader, {}, void 0, false, {
                fileName: "[project]/components/app-shell.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                id: "conteudo",
                tabIndex: -1,
                className: "flex flex-1 flex-col px-4 pt-2 pb-28 outline-none",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/app-shell.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                "aria-label": "Navegação principal do Luminate",
                className: "bg-background/95 border-border fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t backdrop-blur",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "flex items-stretch justify-between px-1 py-1",
                    children: NAV_ITEMS.map((item)=>{
                        const active = pathname === item.href;
                        const Icon = item.icon;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                "aria-current": active ? 'page' : undefined,
                                "aria-label": item.label,
                                title: item.hint,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-xs font-bold', active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        "aria-hidden": "true",
                                        className: "size-6 shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/app-shell.tsx",
                                        lineNumber: 79,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-center leading-tight",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/app-shell.tsx",
                                        lineNumber: 80,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/app-shell.tsx",
                                lineNumber: 67,
                                columnNumber: 17
                            }, this)
                        }, item.href, false, {
                            fileName: "[project]/components/app-shell.tsx",
                            lineNumber: 66,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/app-shell.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/app-shell.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/app-shell.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
/**
 * StatusHeader — status de conexão dos óculos, sempre visível.
 * O texto do estado é redundante ao ícone e à cor (WCAG 1.4.1).
 */ function StatusHeader() {
    const { glasses } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$luminate$2d$store$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLuminate"])();
    const connected = glasses.status === 'connected';
    const connecting = glasses.status === 'connecting';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "border-border flex items-center justify-between gap-3 border-b px-4 py-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        src: "/logo.svg",
                        alt: "Logo Luminate",
                        width: 24,
                        height: 24
                    }, void 0, false, {
                        fileName: "[project]/components/app-shell.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg font-black tracking-tight",
                        children: "Luminate"
                    }, void 0, false, {
                        fileName: "[project]/components/app-shell.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/app-shell.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                role: "status",
                "aria-live": "polite",
                className: "text-muted-foreground text-right text-xs font-bold uppercase",
                children: connected ? `Conectado · ${glasses.battery}%` : connecting ? 'Conectando…' : 'Desconectado'
            }, void 0, false, {
                fileName: "[project]/components/app-shell.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/app-shell.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__06e29an._.js.map