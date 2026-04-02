import { ANEXOS } from '../data/simplesNacional'
import { S } from '../styles/styles'

export default function PageHome({ onNav }) {
  return (
    <div style={S.page}>
      <div style={{ textAlign: 'center', padding: '2.5rem 0 1.75rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🧾</div>
        <h1 style={{ ...S.h1, fontSize: '2.1rem', marginBottom: '0.7rem' }}>
          Calculadora de Alíquota ISS
          <br />
          <span style={{ color: '#38bdf8' }}>Simples Nacional — Serviços</span>
        </h1>
        <p style={{ ...S.sub, maxWidth: '500px', margin: '0 auto 2rem' }}>
          Calcule a alíquota correta do ISS para a nota fiscal de serviço de empresas
          enquadradas nos Anexos III, IV e V do Simples Nacional.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button style={S.btn('primary')} onClick={() => onNav('calcular')}>
            ⚡ Calcular Alíquota
          </button>
          <button style={S.btn('secondary')} onClick={() => onNav('tabelas')}>
            📋 Ver Tabelas
          </button>
        </div>
      </div>

      {/* Cards dos Anexos */}
      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
        Anexos de Serviços disponíveis
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {Object.entries(ANEXOS).map(([k, v]) => (
          <div
            key={k}
            onClick={() => onNav('calcular')}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${v.cor}33`,
              borderRadius: '14px',
              padding: '1.25rem 1rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = v.cor + '15')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
          >
            <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{v.icone}</div>
            <div style={{ fontWeight: 800, color: v.cor, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
              {v.nome}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
              {v.descricao}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: 1.5 }}>{v.exemplos}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.9rem' }}>
        {[
          { i: '📁', t: 'Importe os XMLs', d: 'Arraste as NFs dos últimos 12 meses e o sistema soma o faturamento automaticamente.' },
          { i: '🔍', t: 'Faixa automática', d: 'O sistema identifica a faixa correta e calcula a alíquota efetiva com a fórmula do Simples.' },
          { i: '✅', t: 'Alíquota ISS pronta', d: 'Resultado entre 2% e 5% pronto para usar diretamente na nota fiscal de serviço.' },
        ].map((c) => (
          <div key={c.t} style={S.card}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.45rem' }}>{c.i}</div>
            <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '0.3rem', fontSize: '0.85rem' }}>{c.t}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.6 }}>{c.d}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
