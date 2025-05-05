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
  const handleSubmit = (props) => {
    props.preventDefault()
    // Aqui futuramente chamaremos o backend com a API do Gemini
    setResposta('Simulação de resposta da IA para: ' + entrada)
  }

  return (
    <div className="app">
      <Header /> 
      
      <main className="container">
        
        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="tipo">Tipo de conteúdo:</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(props) => setTipo(props.target.value)}
          >
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

