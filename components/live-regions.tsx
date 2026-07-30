/**
 * LiveRegions — dois contêineres ARIA sempre presentes no DOM.
 *
 * ACESSIBILIDADE:
 * - `aria-live="polite"` para atualizações informativas (ex.: "Pin registrado").
 * - `aria-live="assertive"` para eventos urgentes que interrompem a leitura
 *   (ex.: "Óculos desconectados", "Chamada iniciada").
 * - `sr-only` mantém os anúncios invisíveis: nenhum ruído visual, apenas semântica.
 * - `aria-atomic` garante que a mensagem seja lida por inteiro a cada mudança.
 */
export function LiveRegions() {
  return (
    <>
      <div
        id="luminate-live-polite"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      <div
        id="luminate-live-assertive"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      />
    </>
  )
}
