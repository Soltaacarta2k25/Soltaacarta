const {GoogleGenAI} = require ('@google/genai')
const express = require('express');//é um endpoint
const app = express();
app.use(express.json());//para o express entender o que está sendo enviado no body da requisição (JSON)

//endpoint: método HTTP, padrão de acesso e funcionalidade -- API: coleção de endpoints
//GET, POST, PUT (atualiza), DELETE (remove)
//Padrão de acesso é aquilo que o usuário vai digitar para acessar o navegador
//Funcionalidade () => {}: o que o usuário vai fazer quando acessar o navegador (o que se deja que o servidor faça)

app.post('/pergunte-ao-gemini', async (req, res) => {
    const ai = new GoogleGenAI({ apiKey: "AIzaSyCFme3tyNKIigpCAPKXLx04uFi3Cc-W230" });
    const prompt = req.body.prompt
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
    res.json({"resposta": response.text})
})

app.listen(3000, () => console.log("Beleza, rodando"))
