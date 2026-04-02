import { useState } from 'react'
import { S } from './styles/styles'
import PageHome from './pages/PageHome'
import PageCalcular from './pages/PageCalcular'
import PageTabelas from './pages/PageTabelas'
import PageSobre from './pages/PageSobre'

const PAGES = [
  { id: 'home',     label: '🏠 Início'  },
  { id: 'calcular', label: '⚡ Calcular' },
  { id: 'tabelas',  label: '📋 Tabelas' },
  { id: 'sobre',    label: 'ℹ Sobre'    },
]

export default function App() {
  const [pagina, setPagina] = useState('home')

  return (
    <div style={S.app}>
      {/* Navbar */}
      <nav style={S.nav}>
        <div style={S.logo}>🧾 ISS · Simples Nacional</div>
        <div style={{ display: 'flex', gap: '0.15rem' }}>
          {PAGES.map((p) => (
            <button
              key={p.id}
              style={S.navBtn(pagina === p.id)}
              onClick={() => setPagina(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Páginas */}
      {pagina === 'home'     && <PageHome     onNav={setPagina} />}
      {pagina === 'calcular' && <PageCalcular />}
      {pagina === 'tabelas'  && <PageTabelas  />}
      {pagina === 'sobre'    && <PageSobre    />}
    </div>
  )
}
