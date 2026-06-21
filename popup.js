document.addEventListener('DOMContentLoaded', () => {
  const autoFillToggle = document.getElementById('autoFillToggle');
  const fastNavToggle = document.getElementById('fastNavToggle');
  const autoRetryToggle = document.getElementById('autoRetryToggle');
  const soundAlertToggle = document.getElementById('soundAlertToggle');
  const startBtn = document.getElementById('startBtn');

  // Load saved settings
  chrome.storage.local.get(['autoFill', 'fastNav', 'autoRetry', 'soundAlert'], (result) => {
    autoFillToggle.checked = result.autoFill !== false; // default true
    fastNavToggle.checked = result.fastNav !== false; // default true
    autoRetryToggle.checked = result.autoRetry !== false; // default true
    soundAlertToggle.checked = result.soundAlert !== false; // default true
  });

  // Save settings on change
  const saveSettings = () => {
    chrome.storage.local.set({ 
      autoFill: autoFillToggle.checked,
      fastNav: fastNavToggle.checked,
      autoRetry: autoRetryToggle.checked,
      soundAlert: soundAlertToggle.checked
    });
  };

  autoFillToggle.addEventListener('change', saveSettings);
  fastNavToggle.addEventListener('change', saveSettings);
  autoRetryToggle.addEventListener('change', saveSettings);
  soundAlertToggle.addEventListener('change', saveSettings);

  // Action button click
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
});
