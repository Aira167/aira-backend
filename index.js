
const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(bodyParser.json());

app.post('/api/metaphor', async (req, res) => {
  try {
    const { objective, reflection, tomorrowGoal, progress } = req.body;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Eres un coach experto en PNL.',
        },
        {
          role: 'user',
          content: `Actúa como coach experto en PNL. Con base en:
- Objetivo: "${objective}"
- Reflexión de hoy: "${reflection}"
- Acción clave para mañana: "${tomorrowGoal}"
- Progreso actual: "${progress}% completado"

Crea una metáfora motivacional única en español, máxima 20 palabras, emocional y directa, para impulsar acción inmediata.`,
        },
      ],
    });

    const metaphor = completion.choices[0].message.content;
    res.json({ metaphor });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generando metáfora.');
  }
});

app.listen(port, () => {
  console.log(`AIRA Backend corriendo en http://localhost:${port}`);
});
