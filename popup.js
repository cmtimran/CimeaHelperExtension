document.addEventListener('DOMContentLoaded', () => {
  // Existing toggles
  const autoFillToggle = document.getElementById('autoFillToggle');
  const fastNavToggle = document.getElementById('fastNavToggle');
  const autoRetryToggle = document.getElementById('autoRetryToggle');
  const soundAlertToggle = document.getElementById('soundAlertToggle');
  const startBtn = document.getElementById('startBtn');

  // New Inputs
  const tgToken = document.getElementById('tgToken');
  const tgChatId = document.getElementById('tgChatId');
  const cardName = document.getElementById('cardName');
  const cardNum = document.getElementById('cardNum');
  const cardExp = document.getElementById('cardExp');
  const cardCvc = document.getElementById('cardCvc');
  const testTgBtn = document.getElementById('testTgBtn');

  // Analytics Elements
  const statRetries = document.getElementById('stat-retries');
  const statTime = document.getElementById('stat-time');

  // Speed Controller
  const speedController = document.getElementById('speedController');

  // Load saved settings
  chrome.storage.local.get([
    'autoFill', 'fastNav', 'autoRetry', 'soundAlert', 
    'tgToken', 'tgChatId', 
    'cardName', 'cardNum', 'cardExp', 'cardCvc',
    'totalRetries', 'speed'
  ], (result) => {
    autoFillToggle.checked = result.autoFill !== false;
    fastNavToggle.checked = result.fastNav !== false;
    autoRetryToggle.checked = result.autoRetry !== false;
    soundAlertToggle.checked = result.soundAlert !== false;
    
    if(tgToken) tgToken.value = result.tgToken || '';
    if(tgChatId) tgChatId.value = result.tgChatId || '';
    if(cardName) cardName.value = result.cardName || '';
    if(cardNum) cardNum.value = result.cardNum || '';
    if(cardExp) cardExp.value = result.cardExp || '';
    if(cardCvc) cardCvc.value = result.cardCvc || '';
    if(speedController) speedController.value = result.speed || '3000';

    // Analytics
    const retries = result.totalRetries || 0;
    if(statRetries) statRetries.innerText = retries;
    if(statTime) statTime.innerText = Math.floor((retries * 3) / 60) + 'm ' + ((retries * 3) % 60) + 's';
  });

  // Save settings on change
  const saveSettings = () => {
    chrome.storage.local.set({ 
      autoFill: autoFillToggle.checked,
      fastNav: fastNavToggle.checked,
      autoRetry: autoRetryToggle.checked,
      soundAlert: soundAlertToggle.checked,
      tgToken: tgToken ? tgToken.value : '',
      tgChatId: tgChatId ? tgChatId.value : '',
      cardName: cardName ? cardName.value : '',
      cardNum: cardNum ? cardNum.value : '',
      cardExp: cardExp ? cardExp.value : '',
      cardCvc: cardCvc ? cardCvc.value : '',
      speed: speedController ? speedController.value : '3000'
    });
  };

  if(autoFillToggle) autoFillToggle.addEventListener('change', saveSettings);
  if(fastNavToggle) fastNavToggle.addEventListener('change', saveSettings);
  if(autoRetryToggle) autoRetryToggle.addEventListener('change', saveSettings);
  if(soundAlertToggle) soundAlertToggle.addEventListener('change', saveSettings);
  if(speedController) speedController.addEventListener('change', saveSettings);
  
  // Save text inputs on blur (when user finishes typing)
  [tgToken, tgChatId, cardName, cardNum, cardExp, cardCvc].forEach(input => {
      if(input) input.addEventListener('blur', saveSettings);
  });

  // Test Telegram Message
  if(testTgBtn) {
    testTgBtn.addEventListener('click', async () => {
        const token = tgToken.value.trim();
        const chat = tgChatId.value.trim();
        if (!token || !chat) {
            testTgBtn.innerText = "Error: Missing Info";
            setTimeout(() => testTgBtn.innerText = "Test Message", 2000);
            return;
        }
        
        testTgBtn.innerText = "Sending...";
        try {
            const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chat, text: "✅ CIMEA Helper connected successfully!" })
            });
            if (res.ok) {
                testTgBtn.innerText = "Success!";
            } else {
                testTgBtn.innerText = "Failed!";
            }
        } catch (err) {
            testTgBtn.innerText = "Error!";
        }
        setTimeout(() => testTgBtn.innerText = "Test Message", 2000);
    });
  }

  // Action button click
  if(startBtn) {
    startBtn.addEventListener('click', () => {
      const originalText = startBtn.innerHTML;
      startBtn.innerHTML = '<span class="btn-icon">⏳</span> Working...';
      startBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      
      // Communicate with content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'startAutomation',
            settings: {
              autoFill: autoFillToggle.checked,
              fastNav: fastNavToggle.checked,
              autoRetry: autoRetryToggle.checked,
              soundAlert: soundAlertToggle.checked
            }
          }, (response) => {
            setTimeout(() => {
              startBtn.innerHTML = '<span class="btn-icon">✓</span> Active on Page!';
              setTimeout(() => {
                startBtn.innerHTML = originalText;
                startBtn.style.background = '';
              }, 2000);
            }, 600);
          });
        }
      });
    });
  }
});
