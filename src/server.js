// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/translate', async (req, res) => {
  try {
    const response = await axios.post("https://libretranslate.de/translate", req.body, {
      headers: { "Content-Type": "application/json" }
    });
    res.json(response.data);
  } catch (err) {
    console.error("Ошибка на сервере перевода:", err);
    res.status(500).send("Ошибка при переводе");
  }
});

app.listen(3001, () => {
  console.log('Proxy server listening on port 3001');
});
