const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rota simplificada apenas para registrar ou redirecionar o link enviado pela extensão
app.post('/api/log-qr', (req, res) => {
  const { url } = req.body;
  if (url) {
    console.log('✅ Link de QR Code recebido do YouTube:', url);
    return res.json({ success: true, url });
  }
  return res.status(400).json({ success: false, error: 'URL ausente' });
});

app.listen(3000, () => {
  console.log('🚀 API Rodando com sucesso em http://localhost:3000');
});