chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureTab') {
    // Especifica a janela atual para evitar o erro de permissão ativa
    chrome.tabs.captureVisibleTab(sender.tab.windowId, { format: 'png' }, (dataUrl) => {
      if (chrome.runtime.lastError) {
        // Trata o erro silenciosamente caso a aba mude de foco
        sendResponse({ imageBase64: null, error: chrome.runtime.lastError.message });
      } else {
        sendResponse({ imageBase64: dataUrl });
      }
    });
    return true; // Mantém o canal de comunicação assíncrono aberto
  }
});