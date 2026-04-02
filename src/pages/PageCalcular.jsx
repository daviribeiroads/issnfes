import { useState, useCallback } from 'react'
import { ANEXOS, calcularISS } from '../data/simplesNacional'
import { fmtBRL, fmtPct, parseXML } from '../utils/helpers'
import { S } from '../styles/styles'

export default function PageCalcular() {
  const [anexo, setAnexo] = useState('III')
  const [notas, setNotas] = useState([])
  const [drag, setDrag] = useState(false)
  const [manual, setManual] = useState('')
  const [resultado, setResultado] = useState(null)

  const an = ANEXOS[anexo]
  const cor = an.cor

  const rbt12 =
    notas.length > 0
      ? notas.filter((n) => n.ok).reduce((s, n) => s + n.valor, 0)
      : parseFloat(manual.replace(/\./g, '').replace(',', '.')) || 0

  const processarArquivos = useCallback(async (files) => {
    const novos = []
    for (const file of Array.from(files)) {
      if (!file.name.toLowerCase().endsWith('.xml')) continue
      const txt = await file.text()
      const r = parseXML(txt)
      novos.push({ nome: file.name, ok: r.ok, valor: r.ok ? r.valor : 0, erro: r.erro })
    }
    setNotas((prev) => [...prev, ...novos])
    setResultado(null)
  }, [])

  const onDrop = (e) => {
    e.preventDefault()
    setDrag(false)
    processarArquivos(e.dataTransfer.files)
  }

  const handleCalcular = () => {
    setResultado(calcularISS(rbt12, anexo))
  }

  return (
    <div style={S.page}>
      <h1 style={S.h1}>Calcular Alíquota ISS</h1>
      <p style={S.sub}>Selecione o anexo, importe os XMLs ou informe o faturamento manualmente.</p>

      {/* ── PASSO 1 — SELEÇÃO DO ANEXO ── */}
      <div style={S.card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <span style={S.badge('#38bdf8')}>Passo 1</span>
          <span style={{ fontWeight: 600, color: '#f1f5f9', fontSize: '0.92rem' }}>
            Selecione o Anexo do Simples Nacional
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.65rem' }}>
          {Object.entries(ANEXOS).map(([k, v]) => (
            <button
              key={k}
              onClick={() => { setAnexo(k); setResultado(null) }}
              style={{
                padding: '1rem 0.75rem',
                borderRadius: '12px',
                border: `2px solid ${anexo === k ? v.cor : 'rgba(255,255,255,0.08)'}`,
                background: anexo === k ? v.cor + '18' : 'rgba(255,255,255,0.02)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{v.icone}</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: anexo === k ? v.cor : '#94a3b8' }}>
                {v.nome}
              </div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '0.2rem', lineHeight: 1.35 }}>
                {v.descricao}
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.9rem', borderRadius: '8px', background: cor + '11', border: `1px solid ${cor}33`, fontSize: '0.78rem', color: cor }}>
          <strong>{an.nome} — {an.descricao}</strong>
          <br />
          <span style={{ color: '#64748b' }}>{an.exemplos}</span>
        </div>
      </div>

      {/* ── PASSO 2 — RBT12 ── */}
      <div style={S.card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <span style={S.badge('#38bdf8')}>Passo 2</span>
          <span style={{ fontWeight: 600, color: '#f1f5f9', fontSize: '0.92rem' }}>
            Faturamento dos Últimos 12 Meses (RBT12)
          </span>
        </div>

        {/* Drop Zone */}
        <div
          style={{
            border: `2px dashed ${drag ? cor : 'rgba(255,255,255,0.12)'}`,
            borderRadius: '12px',
            padding: '1.75rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s',
            background: drag ? cor + '08' : 'transparent',
          }}
          onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          onClick={() => document.getElementById('xmlInput').click()}
        >
          <input
            id="xmlInput"
            type="file"
            accept=".xml"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => processarArquivos(e.target.files)}
          />
          <div style={{ fontSize: '2rem', marginBottom: '0.35rem' }}>📂</div>
          <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.88rem', marginBottom: '0.2rem' }}>
            Arraste os XMLs das notas ou clique para selecionar
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
            Múltiplos arquivos .xml — notas fiscais dos últimos 12 meses
          </div>
        </div>

        {/* Lista de notas carregadas */}
        {notas.length > 0 && (
          <div style={{ marginTop: '0.9rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.35rem' }}>
              {notas.length} arquivo(s) carregado(s) — Total válido:{' '}
              <strong style={{ color: '#4ade80' }}>{fmtBRL(rbt12)}</strong>
            </div>
            <div style={{ maxHeight: '140px', overflowY: 'auto' }}>
              {notas.map((n, i) => (
                <span key={i} style={S.chip(n.ok)}>
                  {n.ok ? '✓' : '✗'} {n.nome.replace('.xml', '')}{' '}
                  {n.ok ? `· ${fmtBRL(n.valor)}` : `· ${n.erro}`}
                </span>
              ))}
            </div>
            <button
              style={{ ...S.btn('secondary'), marginTop: '0.5rem', padding: '0.3rem 0.75rem', fontSize: '0.72rem' }}
              onClick={() => { setNotas([]); setResultado(null) }}
            >
              🗑 Limpar arquivos
            </button>
          </div>
        )}

        {/* Divisor */}
        <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
          <span style={{ fontSize: '0.68rem', color: '#64748b' }}>OU INFORME MANUALMENTE</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
        </div>

        <label style={S.label}>RBT12 — Receita Bruta Total dos últimos 12 meses (R$)</label>
        <input
          type="text"
          placeholder="Ex: 250.000,00"
          style={S.input}
          value={manual}
          onChange={(e) => { setManual(e.target.value); setNotas([]); setResultado(null) }}
          disabled={notas.length > 0}
        />

        {rbt12 > 0 && (
          <div style={{ marginTop: '0.6rem', padding: '0.6rem 0.9rem', borderRadius: '8px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', fontSize: '0.78rem', color: '#4ade80' }}>
            ✓ RBT12 identificado: <strong>{fmtBRL(rbt12)}</strong>
          </div>
        )}
      </div>

      {/* ── BOTÃO CALCULAR ── */}
      <button
        style={{ ...S.btn('primary', cor), width: '100%', padding: '0.95rem', fontSize: '0.95rem', opacity: rbt12 > 0 ? 1 : 0.45 }}
        onClick={handleCalcular}
        disabled={rbt12 <= 0}
      >
        {an.icone} Calcular Alíquota ISS — {an.nome}
      </button>

      {/* ── RESULTADO ── */}
      {resultado && (
        <div style={{
          background: `linear-gradient(135deg,${cor}0d,rgba(139,92,246,0.07))`,
          border: `1px solid ${cor}33`,
          borderRadius: '16px',
          padding: '1.75rem',
          textAlign: 'center',
          marginTop: '1.25rem',
        }}>
          <span style={S.badge(cor)}>Faixa {resultado.faixa.faixa} · {an.nome}</span>
          <div style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.5rem 0 0.6rem' }}>
            Alíquota ISS para a nota fiscal de serviço
          </div>
          <div style={{ fontSize: '3.75rem', fontWeight: 900, color: cor, letterSpacing: '-0.04em', lineHeight: 1 }}>
            {fmtPct(resultado.issFinal, 2)}
          </div>
          {resultado.limitado && (
            <div style={{ fontSize: '0.74rem', color: '#f59e0b', marginTop: '0.4rem' }}>
              ⚠ Limitado ao mínimo de 2% pela legislação (LC 116/2003)
            </div>
          )}

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginTop: '1.25rem' }}>
            {[
              [fmtBRL(rbt12),                            'RBT12 (12 meses)'],
              [fmtPct(resultado.faixa.aliquota),         'Alíquota nominal da faixa'],
              [fmtBRL(resultado.faixa.dedutivel),        'Parcela dedutível'],
              [fmtPct(resultado.aliquotaEfetiva),        'Alíquota efetiva Simples'],
              [fmtPct(resultado.faixa.ISS),              '% ISS na repartição da faixa'],
              [fmtPct(resultado.issFinal, 2) + ' ✅',    'Alíquota ISS final'],
            ].map(([v, l]) => (
              <div key={l} style={S.statBox}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: l.includes('✅') ? cor : '#f1f5f9' }}>{v}</div>
                <div style={{ fontSize: '0.67rem', color: '#64748b', marginTop: '0.2rem' }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Detalhamento */}
          <div style={{ marginTop: '1rem', padding: '0.9rem', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', fontSize: '0.74rem', color: '#64748b', textAlign: 'left', lineHeight: 1.9 }}>
            <strong style={{ color: '#94a3b8' }}>Como foi calculado:</strong>
            <br />
            Alíq. Efetiva = ({fmtBRL(rbt12)} × {fmtPct(resultado.faixa.aliquota)} − {fmtBRL(resultado.faixa.dedutivel)}) ÷ {fmtBRL(rbt12)} ={' '}
            <strong style={{ color: '#e2e8f0' }}>{fmtPct(resultado.aliquotaEfetiva)}</strong>
            <br />
            Alíq. ISS = {fmtPct(resultado.aliquotaEfetiva)} × {fmtPct(resultado.faixa.ISS)} ={' '}
            <strong style={{ color: cor }}>{fmtPct(resultado.issFinal, 2)}</strong>
          </div>
        </div>
      )}
    </div>
  )
}
