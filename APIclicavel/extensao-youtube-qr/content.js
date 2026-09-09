console.log("%c🟢 Extensão YouTube QR Ativa (Detector Ajustado)!", "color: #00ff00; font-size: 14px; font-weight: bold;");

let currentDetectedUrl = null;

async function scanVideoFrame() {
  const video = document.querySelector('video');
  if (!video || video.paused || video.ended) return;

  chrome.runtime.sendMessage({ action: 'captureTab' }, (response) => {
    if (!response || !response.imageBase64) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Envia para o processamento de QR Code
      const result = detectAndDecodeQR(imageData.data, canvas.width, canvas.height);

      if (result && result.url) {
        console.log("🎯 QR Code Real Detectado:", result.url);
        currentDetectedUrl = result.url;
        renderClickableOverlay(result.location, result.url, video, canvas.width, canvas.height);
      } else {
        currentDetectedUrl = null;
        removeOverlay();
      }
    };
    img.src = response.imageBase64;
  });
}

// Algoritmo rigoroso para evitar falsos positivos
function detectAndDecodeQR(data, width, height) {
  // Se a biblioteca global jsQR estiver presente
  if (typeof jsQR !== 'undefined') {
    const code = jsQR(data, width, height);
    if (code && code.data && code.data.startsWith('http')) {
      return { url: code.data, location: code.location };
    }
  }
  return null;
}

function renderClickableOverlay(location, url, video, canvasWidth, canvasHeight) {
  let overlay = document.getElementById('qr-clickable-overlay');

  if (!overlay) {
    overlay = document.createElement('a');
    overlay.id = 'qr-clickable-overlay';
    overlay.target = '_blank';
    overlay.rel = 'noopener noreferrer';
    overlay.style.position = 'absolute';
    overlay.style.border = '3px solid #00FF00';
    overlay.style.backgroundColor = 'rgba(0, 255, 0, 0.25)';
    overlay.style.boxShadow = '0 0 10px #00FF00';
    overlay.style.cursor = 'pointer';
    overlay.style.zIndex = '99999999';
    overlay.style.display = 'block';
    
    // Evita que o clique no link acione a pausa do vídeo do YouTube
    overlay.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    const container = video.parentElement;
    container.appendChild(overlay);
  }

  const rect = video.getBoundingClientRect();
  const scaleX = rect.width / canvasWidth;
  const scaleY = rect.height / canvasHeight;

  // Atualiza o destino real do link do QR Code
  overlay.href = url;

  if (location && location.topLeftCorner) {
    const width = Math.abs(location.topRightCorner.x - location.topLeftCorner.x) * scaleX;
    const height = Math.abs(location.bottomLeftCorner.y - location.topLeftCorner.y) * scaleY;

    overlay.style.left = `${location.topLeftCorner.x * scaleX}px`;
    overlay.style.top = `${location.topLeftCorner.y * scaleY}px`;
    overlay.style.width = `${Math.max(width, 50)}px`;
    overlay.style.height = `${Math.max(height, 50)}px`;
  }
}

function removeOverlay() {
  const overlay = document.getElementById('qr-clickable-overlay');
  if (overlay) overlay.remove();
}

setInterval(scanVideoFrame, 1500);