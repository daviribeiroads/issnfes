# 🧾 Calculadora ISS — Simples Nacional

Calcula a alíquota correta do ISS para nota fiscal de serviço de empresas enquadradas nos **Anexos III, IV e V** do Simples Nacional.

---

## 🚀 Como rodar

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm (já vem com o Node)

### Passos

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar em modo desenvolvimento
npm run dev
```

Acesse no navegador: **http://localhost:5173**

### Build para produção

```bash
npm run build
npm run preview
```

---

## 📁 Estrutura do projeto

```
src/
├── data/
│   └── simplesNacional.js   # Tabelas dos Anexos III, IV e V + função calcularISS()
├── utils/
│   └── helpers.js           # Formatação de moeda, percentual e parser de XML
├── styles/
│   └── styles.js            # Objeto de estilos compartilhados
├── pages/
│   ├── PageHome.jsx         # Página inicial
│   ├── PageCalcular.jsx     # Calculadora (XML + manual)
│   ├── PageTabelas.jsx      # Tabelas completas dos Anexos
│   └── PageSobre.jsx        # Metodologia e base legal
├── App.jsx                  # Navegação entre páginas
├── main.jsx                 # Entry point
└── index.css                # Reset global
```

---

## 📐 Fórmula do cálculo

1. **Alíquota Efetiva** = (RBT12 × Alíquota da Faixa − Parcela Dedutível) ÷ RBT12
2. **Alíquota ISS** = Alíquota Efetiva × % ISS da faixa
3. Resultado limitado entre **2%** (mínimo — LC 116/2003) e **5%** (máximo)

---

## 📋 Base Legal
- Lei Complementar nº 123/2006
- Resolução CGSN nº 140/2018
- Lei Complementar nº 116/2003
