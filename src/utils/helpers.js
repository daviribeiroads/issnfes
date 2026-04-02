/**
 * Formata um número como moeda brasileira (R$)
 */
export const fmtBRL = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

/**
 * Formata um número como percentual
 */
export const fmtPct = (v, decimais = 4) =>
  `${(v * 100).toFixed(decimais)}%`

/**
 * Faz o parse de um arquivo XML de NF-e ou NFS-e
 * e tenta extrair o valor da nota
 */
export const parseXML = (xmlString) => {
  try {
    const doc = new DOMParser().parseFromString(xmlString, 'text/xml')

    // Tags de valor — NFS-e (ABRASF) e NF-e
    const tagValor = ['vServ', 'ValorServicos', 'ValorLiquidoNfse', 'vNF', 'vProd', 'Valor']
    for (const tag of tagValor) {
      const el = doc.getElementsByTagName(tag)[0]
      if (el?.textContent?.trim()) {
        const v = parseFloat(el.textContent.trim().replace(',', '.'))
        if (!isNaN(v) && v > 0) return { ok: true, valor: v }
      }
    }

    return { ok: false, erro: 'Valor não encontrado no XML' }
  } catch {
    return { ok: false, erro: 'Arquivo XML inválido ou corrompido' }
  }
}
