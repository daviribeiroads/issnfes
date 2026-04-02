import { ANEXOS } from '../data/simplesNacional'
import { S } from '../styles/styles'

export default function PageSobre() {
  return (
    <div style={S.page}>
      <h1 style={S.h1}>Sobre o Sistema</h1>
      <p style={S.sub}>Metodologia e base legal do cálculo ISS no Simples Nacional.</p>

      {/* Metodologia */}
      <div style={S.card}>
        <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: '1rem', fontSize: '0.95rem' }}>
          📐 Metodologia do Cálculo
        </div>
        {[
          { n: '1', t: 'Obter o RBT12', d: 'Some o faturamento bruto dos últimos 12 meses consecutivos. Se a empresa tiver menos de 12 meses de atividade, calcule a média mensal e multiplique por 12.' },
          { n: '2', t: 'Identificar a Faixa', d: 'Com o RBT12 em mãos, localize a faixa correspondente na tabela do Anexo em que a empresa está enquadrada (III, IV ou V).' },
          { n: '3', t: 'Calcular a Alíquota Efetiva', d: 'Fórmula: (RBT12 × Alíquota da Faixa − Parcela Dedutível) ÷ RBT12' },
          { n: '4', t: 'Calcular a Alíquota ISS', d: 'Alíquota Efetiva × % de repartição do ISS da faixa. O resultado é limitado entre 2% (mínimo legal — LC 116/2003) e 5% (máximo legal).' },
        ].map((s) => (
          <div key={s.n} style={{ display: 'flex', gap: '0.85rem', marginBottom: '1rem' }}>
            <div style={{ width: '1.7rem', height: '1.7rem', borderRadius: '7px', background: 'rgba(56,189,248,0.15)', color: '#38bdf8', fontWeight: 800, fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {s.n}
            </div>
            <div>
              <div style={{ fontWeight: 600, color: '#f1f5f9', marginBottom: '0.15rem', fontSize: '0.88rem' }}>{s.t}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.6 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Diferença entre Anexos */}
      <div style={S.card}>
        <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: '0.85rem', fontSize: '0.95rem' }}>
          📋 Diferença entre os Anexos de Serviço
        </div>
        {Object.entries(ANEXOS).map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '1.15rem' }}>{v.icone}</span>
            <div>
              <span style={{ ...S.badge(v.cor), marginRight: '0.4rem' }}>{v.nome}</span>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{v.descricao}</span>
              <div style={{ fontSize: '0.73rem', color: '#64748b', marginTop: '0.15rem' }}>{v.exemplos}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Base Legal */}
      <div style={S.card}>
        <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: '0.7rem', fontSize: '0.95rem' }}>
          📋 Base Legal
        </div>
        <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 2 }}>
          • Lei Complementar nº 123/2006 — Estatuto Nacional da Microempresa e da Empresa de Pequeno Porte<br />
          • Resolução CGSN nº 140/2018 — Regulamenta o Simples Nacional<br />
          • Lei Complementar nº 116/2003 — ISS: alíquota mínima 2% e máxima 5%
        </div>
      </div>

      {/* Aviso */}
      <div style={{ ...S.card, background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.17)' }}>
        <div style={{ fontWeight: 700, color: '#f59e0b', marginBottom: '0.4rem' }}>⚠ Aviso Importante</div>
        <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.7 }}>
          Esta ferramenta é apenas um apoio para o cálculo. Consulte sempre um contador ou profissional habilitado para confirmar o enquadramento correto da sua empresa e a alíquota do ISS aplicável no seu município.
        </div>
      </div>
    </div>
  )
}
