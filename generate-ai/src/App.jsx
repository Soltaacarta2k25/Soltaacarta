import { useState } from 'react'
import './App.css'
import Header from './Header'



function App() {
  // Estados
  const [tipo, setTipo] = useState('post')
  const [entrada, setEntrada] = useState('')
  const [resposta, setResposta] = useState('')


  // definir o texto de acordo com seleção
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

  
 // Função chamada ao enviar o formulário
const handleSubmit = async (e) => {
  e.preventDefault()   // Impede de recarregar a página no submit

  // 1) Mostrar algo na tela enquanto carrega (opcional, mas encorajador):
  setResposta('Carregando...')

  try {
    // 2) Montar o objeto que o back espera: { prompt: "texto digitado" }
    const payload = { prompt: entrada }

    // 3) Fazer a chamada ao back-end
    const response = await fetch('http://localhost:3000/pergunte-ao-gemini', {
      method: 'POST',                        // método HTTP POST
      headers: {
        'Content-Type': 'application/json'   // vamos enviar JSON
      },
      body: JSON.stringify(payload)          // converte payload para string JSON
    })

    // 4) Verificar se deu certo (status 2xx). Se não, tratar como erro.
    if (!response.ok) {
      throw new Error(`Erro na chamada: ${response.status}`)
    }

    // 5) Pegar o JSON que o back enviou (que tem { resposta: "texto da IA" })
    const data = await response.json()

    // 6) Atualizar o estado para exibir a resposta na tela
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
          <select id="tipo" value={tipo} onChange={(props) => setTipo(props.target.value)}>
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
            <p style={{color: 'black'}}>{resposta}</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App