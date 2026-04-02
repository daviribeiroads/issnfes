// Tabelas do Simples Nacional — Anexos de Serviço
// LC 123/2006 + Resolução CGSN nº 140/2018 (vigência 2018 em diante)

export const ANEXOS = {
  III: {
    nome: 'Anexo III',
    icone: '🔧',
    descricao: 'Serviços em geral',
    exemplos: 'Arquitetura, engenharia, academias, salões, escolas, clínicas...',
    cor: '#0ea5e9',
    faixas: [
      { faixa: 1, receitaMax: 180000,   aliquota: 0.06,  dedutivel: 0,       ISS: 0.335  },
      { faixa: 2, receitaMax: 360000,   aliquota: 0.112, dedutivel: 9360,    ISS: 0.32  },
      { faixa: 3, receitaMax: 720000,   aliquota: 0.135, dedutivel: 17640,   ISS: 0.325  },
      { faixa: 4, receitaMax: 1800000,  aliquota: 0.16,  dedutivel: 35640,   ISS: 0.325  },
      { faixa: 5, receitaMax: 3600000,  aliquota: 0.21,  dedutivel: 125640,  ISS: 0.335  },
      { faixa: 6, receitaMax: 4800000,  aliquota: 0.33,  dedutivel: 648000,  ISS: 0.305  },
    ],
  },
  IV: {
    nome: 'Anexo IV',
    icone: '🏗️',
    descricao: 'Limpeza, vigilância e obras',
    exemplos: 'Construção civil, limpeza, vigilância, portaria, conservação...',
    cor: '#f59e0b',
    faixas: [
      { faixa: 1, receitaMax: 180000,   aliquota: 0.045, dedutivel: 0,       ISS: 0.2135 },
      { faixa: 2, receitaMax: 360000,   aliquota: 0.09,  dedutivel: 8100,    ISS: 0.2135 },
      { faixa: 3, receitaMax: 720000,   aliquota: 0.102, dedutivel: 12420,   ISS: 0.2135 },
      { faixa: 4, receitaMax: 1800000,  aliquota: 0.14,  dedutivel: 39780,   ISS: 0.2135 },
      { faixa: 5, receitaMax: 3600000,  aliquota: 0.22,  dedutivel: 183780,  ISS: 0.2135 },
      { faixa: 6, receitaMax: 4800000,  aliquota: 0.33,  dedutivel: 828000,  ISS: 0.2135 },
    ],
  },
  V: {
    nome: 'Anexo V',
    icone: '💻',
    descricao: 'Serviços intelectuais e TI',
    exemplos: 'TI, auditoria, jornalismo, publicidade, consultoria, engenharia...',
    cor: '#8b5cf6',
    faixas: [
      { faixa: 1, receitaMax: 180000,   aliquota: 0.155, dedutivel: 0,       ISS: 0.15   },
      { faixa: 2, receitaMax: 360000,   aliquota: 0.18,  dedutivel: 4500,    ISS: 0.17   },
      { faixa: 3, receitaMax: 720000,   aliquota: 0.195, dedutivel: 9900,    ISS: 0.18   },
      { faixa: 4, receitaMax: 1800000,  aliquota: 0.205, dedutivel: 17100,   ISS: 0.24   },
      { faixa: 5, receitaMax: 3600000,  aliquota: 0.23,  dedutivel: 62100,   ISS: 0.22   },
      { faixa: 6, receitaMax: 4800000,  aliquota: 0.305, dedutivel: 540000,  ISS: 0.27   },
    ],
  },
}

/**
 * Calcula a alíquota ISS para uma empresa do Simples Nacional
 * @param {number} rbt12 - Receita Bruta Total dos últimos 12 meses
 * @param {string} anexoKey - Chave do anexo: 'III', 'IV' ou 'V'
 * @returns {object|null} Resultado do cálculo ou null se inválido
 */
export const calcularISS = (rbt12, anexoKey) => {
  const anexo = ANEXOS[anexoKey]
  if (!anexo || !rbt12 || rbt12 <= 0) return null

  const faixa = anexo.faixas.find((f) => rbt12 <= f.receitaMax)
  if (!faixa) return null

  const aliquotaEfetiva = (rbt12 * faixa.aliquota - faixa.dedutivel) / rbt12
  const issRaw = aliquotaEfetiva * faixa.ISS
  const issFinal = Math.min(Math.max(issRaw, 0.02), 0.05)

  return {
    faixa,
    aliquotaEfetiva,
    issRaw,
    issFinal,
    limitado: issRaw !== issFinal,
  }
}
