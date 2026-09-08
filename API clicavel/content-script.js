async function scanVideoFrame() {
  const video = document.querySelector('video');
  if (!video || video.paused) return;

  // 1. Desenha o frame do vídeo em um canvas invisível
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageBase64 = canvas.toDataURL('image/png');

  // 2. Envia para a sua API
  try {
    const response = await fetch('http://localhost:3000/api/decode-qr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64 })
    });

    const data = await response.json();

    if (data.success && data.url) {
      renderClickableOverlay(data.location, data.url, video);
    }
  } catch (error) {
    console.error('Erro na API QR Code:', error);
  }
}

// 3. Desenha um botão/link por cima do vídeo
function renderClickableOverlay(location, url, video) {
  let overlay = document.getElementById('qr-clickable-overlay');
  if (!overlay) {
    overlay = document.createElement('a');
    overlay.id = 'qr-clickable-overlay';
    overlay.target = '_blank';
    overlay.style.position = 'absolute';
    overlay.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
    overlay.style.border = '2px solid green';
    overlay.style.cursor = 'pointer';
    overlay.style.zIndex = '9999';
    video.parentElement.appendChild(overlay);
  }

  // Mapeia as coordenadas da imagem para o tamanho do player na tela
  const rect = video.getBoundingClientRect();
  const scaleX = rect.width / video.videoWidth;
  const scaleY = rect.height / video.videoHeight;

  overlay.href = url;
  overlay.style.left = `${location.topLeftCorner.x * scaleX}px`;
  overlay.style.top = `${location.topLeftCorner.y * scaleY}px`;
  overlay.style.width = `${(location.topRightCorner.x - location.topLeftCorner.x) * scaleX}px`;
  overlay.style.height = `${(location.bottomLeftCorner.y - location.topLeftCorner.y) * scaleY}px`;
}

// Roda a verificação periodicamente a cada 2 segundos
setInterval(scanVideoFrame, 2000);