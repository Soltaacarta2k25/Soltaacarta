require('dotenv').config()
const express = require ('express')
const { GoogleGenAI } = require ('@google/genai')
const app = express()
app.use(express.json())

//endpoint: método HTTP, padrão de acesso, funcionalidade
//GET, POST, PUT, DELETE
//usjt.br/notas
//funcionalidade () => {}
app.post('/pergunte-ao-gemini', async (req, res) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
  const prompt = req.body.prompt
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  res.json({"resposta": response.text})
})

app.listen(3000, () => console.log("Beleza, rodando"))