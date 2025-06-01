require('dotenv').config()
const express = require('express')
const { GoogleGenAI } = require('@google/genai')
const cors = require('cors')

const app = express()

// 1) Allow CORS only from your front-end origin
app.use(cors({
  origin: 'http://localhost:5173'
}))

// 2) Let Express parse JSON bodies
app.use(express.json())

app.post('/pergunte-ao-gemini', async (req, res) => {
  try {
    // 3) Create Gemini client with your API key
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY })

    // 4) Get the prompt (tipo + texto) sent by the front-end
    const prompt = req.body.prompt

    // 5) Call the Gemini model
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    })

    // 6) Directly extract the generated text from the known path:
    const respostaIA = result.candidates[0].content.parts[0].text

    // 7) Return the JSON with key "resposta" back to the front-end
    return res.json({ resposta: respostaIA })

  } catch (err) {
    console.error('Erro ao gerar conteúdo com Gemini:', err)
    return res.status(500).json({ erro: 'Erro ao gerar resposta com IA.' })
  }
})

// 8) Start the server
app.listen(3000, () => {
  console.log('Beleza, rodando em http://localhost:3000')
})
