require('dotenv').config()
const express = require('express')
const { GoogleGenAI } = require('@google/genai')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(express.json())

app.post('/pergunte-ao-gemini', async (req, res) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY })

    const prompt = req.body.prompt

    const result = await ai.models.generateContent({
      model: 'gemini-pro',
      contents: prompt,
    })

    const respostaIA = result.candidates[0].content.parts[0].text

    return res.json({ resposta: respostaIA })

  } catch (err) {
    console.error('Erro ao gerar conteúdo com Gemini:', err)
    return res.status(500).json({ erro: 'Erro ao gerar resposta com IA.' })
  }
})

app.listen(3000, () => {
  console.log('Beleza, rodando em http://localhost:3000')
})
