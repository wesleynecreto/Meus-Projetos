const express = require('express');
const cors = require('cors');
const jsQR = require('jsqr');
const Jimp = require('jimp');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rota para decodificar QR Code enviado em Base64
app.post('/api/decode-qr', async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Base64 da imagem é obrigatório.' });
    }

    // Remove o prefixo data:image/...;base64, se existir
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Carrega a imagem com o Jimp
    const image = await Jimp.read(buffer);
    const { data, width, height } = image.bitmap;

    // Decodifica o QR Code
    const qrCode = jsQR(new Uint8ClampedArray(data), width, height);

    if (qrCode) {
      return res.json({
        success: true,
        url: qrCode.data,
        location: qrCode.location // Retorna a coordenada no frame para alinhar o clique
      });
    } else {
      return res.json({ success: false, message: 'Nenhum QR Code encontrado.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao processar imagem.', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});