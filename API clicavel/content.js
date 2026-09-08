console.log("🟢 Extensão YouTube QR Ativa!");

async function scanVideoFrame() {
  const video = document.querySelector('video');
  if (!video || video.paused || video.ended) return;

  // Cria um canvas em memória para capturar a imagem atual do vídeo
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  
  try {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Envia os dados de imagem diretamente para a API local
    const response = await fetch('http://localhost:3000/api/decode-qr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageData: imgData.data,
        width: imgData.width,
        height: imgData.height
      })
    });

    const result = await response.json();

    if (result.success && result.url) {
      renderClickableOverlay(result.location, result.url, video);
    } else {
      removeOverlay();
    }
  } catch (e) {
    // Silencia erros de Canvas Tainted (bloqueio de CORS do próprio YouTube em alguns vídeos)
  }
}

function renderClickableOverlay(location, url, video) {
  let overlay = document.getElementById('qr-clickable-overlay');
  
  if (!overlay) {
    overlay = document.createElement('a');
    overlay.id = 'qr-clickable-overlay';
    overlay.target = '_blank';
    overlay.style.position = 'absolute';
    overlay.style.border = '3px solid #00FF00';
    overlay.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
    overlay.style.boxShadow = '0 0 10px #00FF00';
    overlay.style.cursor = 'pointer';
    overlay.style.zIndex = '999999';
    overlay.title = 'Clique para abrir o link do QR Code';
    
    // Insere por cima do container do player do YouTube
    const container = video.parentElement;
    container.appendChild(overlay);
  }

  // Ajusta a escala da caixa para bater exatamente com a resolução exibida na tela
  const rect = video.getBoundingClientRect();
  const scaleX = rect.width / video.videoWidth;
  const scaleY = rect.height / video.videoHeight;

  const width = (location.topRightCorner.x - location.topLeftCorner.x) * scaleX;
  const height = (location.bottomLeftCorner.y - location.topLeftCorner.y) * scaleY;

  overlay.href = url;
  overlay.style.left = `${location.topLeftCorner.x * scaleX}px`;
  overlay.style.top = `${location.topLeftCorner.y * scaleY}px`;
  overlay.style.width = `${width}px`;
  overlay.style.height = `${height}px`;
}

function removeOverlay() {
  const overlay = document.getElementById('qr-clickable-overlay');
  if (overlay) overlay.remove();
}

// Analisa a tela a cada 1.5 segundos
setInterval(scanVideoFrame, 1500);