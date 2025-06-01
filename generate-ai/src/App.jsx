import { useState } from 'react'
import './App.css'
import Header from './Header'

function App() {
  // Estados
  const [tipo, setTipo] = useState('post')
  const [entrada, setEntrada] = useState('')
  const [resposta, setResposta] = useState('')

  // Definir o texto de acordo com a seleção
  const obterPlaceholder = () => {
    switch (tipo) {
      case 'post':
        return 'Digite o tema ou produto que deseja divulgar...'
      case 'titulo':
        return 'Digite o assunto para gerar um título com grande engajamento...'
      case 'resumo':
        return 'Cole aqui o texto que deseja resumir...'
      case 'reescrita':
        return 'Digite o texto que você deseja reescrever...'
      default:
        return ''
    }
  }

  // Montar o prompt combinando tipo + texto
  const gerarPromptComTipo = () => {
    switch (tipo) {
      case 'post':
        return `Gere um post de rede social sobre: ${entrada}`
      case 'titulo':
        return `Gere um título chamativo com base no seguinte tema: ${entrada}`
      case 'resumo':
        return `Resuma o seguinte texto: ${entrada}`
      case 'reescrita':
        return `Reescreva a seguinte mensagem de forma mais clara e profissional: ${entrada}`
      default:
        return entrada
    }
  }

  // Logo que o usuário clica em “Gerar conteúdo”
  const handleSubmit = async (e) => {
    e.preventDefault()
    setResposta('Carregando...')

    try {
      const payload = { prompt: gerarPromptComTipo() }
      const response = await fetch('http://localhost:3000/pergunte-ao-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error(`Erro: ${response.status}`)

      const data = await response.json()
      setResposta(data.resposta)
    } catch (error) {
      console.error('Erro ao chamar o back-end:', error)
      setResposta('Desculpe, ocorreu um erro ao obter a resposta da IA.')
    }
  }

  return (
    <div className="app">
      <Header />

      <main className="container">
        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="tipo">Tipo de conteúdo:</label>
          <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="post">Post de rede social</option>
            <option value="titulo">Título chamativo</option>
            <option value="resumo">Resumo de texto</option>
            <option value="reescrita">Reescrever mensagem</option>
          </select>

          <label htmlFor="entrada">Digite sua ideia ou conteúdo:</label>
          <textarea
            id="entrada"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            rows="5"
            placeholder={obterPlaceholder()}
          />

          <button type="submit" className="botao">
            Gerar conteúdo
          </button>
        </form>

        {resposta && (
          <div className="resposta">
            <h2>Resposta da IA:</h2>
            {/* Aqui usamos <div> com CSS para respeitar \n */}
            <div
              style={{
                color: 'black',
                whiteSpace: 'pre-wrap',
                fontFamily: 'inherit',
                lineHeight: '1.5',
              }}
            >
              {resposta}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
