import { useState } from 'react'
import { ANEXOS } from '../data/simplesNacional'
import { fmtBRL, fmtPct } from '../utils/helpers'
import { S } from '../styles/styles'

export default function PageTabelas() {
  const [aba, setAba] = useState('III')
  const an = ANEXOS[aba]

  return (
    <div style={S.page}>
      <h1 style={S.h1}>Tabelas do Simples Nacional</h1>
      <p style={S.sub}>
        Anexos III, IV e V — Serviços — vigência 2018 em diante (LC 123/2006 + CGSN nº 140/2018).
      </p>

      {/* Abas */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {Object.entries(ANEXOS).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setAba(k)}
            style={{
              padding: '0.45rem 1.2rem',
              borderRadius: '8px',
              border: `1px solid ${aba === k ? v.cor : 'rgba(255,255,255,0.08)'}`,
              background: aba === k ? v.cor + '20' : 'transparent',
              color: aba === k ? v.cor : '#64748b',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.82rem',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
            }}
          >
            {v.icone} {v.nome}
          </button>
        ))}
      </div>

      <div style={S.card}>
        {/* Cabeçalho do anexo */}
        <div style={{ marginBottom: '1rem' }}>
          <span style={S.badge(an.cor)}>{an.icone} {an.nome}</span>
          <span style={{ fontSize: '0.82rem', color: '#94a3b8', marginLeft: '0.5rem' }}>{an.descricao}</span>
          <div style={{ fontSize: '0.73rem', color: '#64748b', marginTop: '0.3rem' }}>{an.exemplos}</div>
        </div>

        {/* Tabela */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
            <thead>
              <tr>
                {['Faixa', 'Receita Bruta (12 meses)', 'Alíquota Nominal', 'Dedutível (R$)', '% ISS na Faixa'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '0.5rem 0.7rem',
                      textAlign: 'left',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#64748b',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {an.faixas.map((f, i) => {
                const min = i === 0 ? 0 : an.faixas[i - 1].receitaMax + 0.01
                return (
                  <tr key={f.faixa} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent' }}>
                    <td style={{ padding: '0.55rem 0.7rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={S.badge(an.cor)}>F{f.faixa}</span>
                    </td>
                    <td style={{ padding: '0.55rem 0.7rem', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#e2e8f0', whiteSpace: 'nowrap' }}>
                      {fmtBRL(min)} — {fmtBRL(f.receitaMax)}
                    </td>
                    <td style={{ padding: '0.55rem 0.7rem', borderBottom: '1px solid rgba(255,255,255,0.04)', fontWeight: 700, color: an.cor }}>
                      {fmtPct(f.aliquota, 2)}
                    </td>
                    <td style={{ padding: '0.55rem 0.7rem', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#e2e8f0' }}>
                      {fmtBRL(f.dedutivel)}
                    </td>
                    <td style={{ padding: '0.55rem 0.7rem', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#4ade80', fontWeight: 600 }}>
                      {fmtPct(f.ISS, 2)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Fórmula */}
        <div style={{ marginTop: '1rem', padding: '0.8rem', background: 'rgba(255,255,255,0.025)', borderRadius: '8px', fontSize: '0.73rem', color: '#64748b', lineHeight: 1.7 }}>
          <strong style={{ color: '#94a3b8' }}>Fórmula:</strong>{' '}
          Alíq. Efetiva = (RBT12 × Alíq. Nominal − Parcela Ded.) ÷ RBT12 &nbsp;|&nbsp;
          Alíq. ISS = Alíq. Efetiva × % ISS &nbsp;|&nbsp;
          <strong>Limite legal: mínimo 2% e máximo 5%</strong>
        </div>
      </div>
    </div>
  )
}
