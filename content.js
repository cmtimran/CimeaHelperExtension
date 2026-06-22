// Content script runs on the actual web pages
console.log("CIMEA Helper Content Script Loaded.");

let autoRetryInterval = null;

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startAutomation') {
    console.log("Received start signal with settings:", request.settings);
    
    // Track usage
    chrome.runtime.sendMessage({
      action: 'trackEvent',
      event: 'automation_started',
      data: { url: window.location.href }
    });
    
    // Simulate auto-fill
    if (request.settings.autoFill) {
      console.log("Auto-filling forms...");
      const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
      inputs.forEach(input => {
        if (!input.value) {
          // Add your logic to autofill specific CIMEA fields
          input.style.backgroundColor = "rgba(16, 185, 129, 0.2)";
          input.style.border = "2px solid #10b981";
        }
      });
    }

    // Simulate fast navigation
    if (request.settings.fastNav) {
      console.log("Attempting fast navigation...");
      const nextBtn = document.querySelector('button[type="submit"], button.next, a.next');
      if (nextBtn) {
        setTimeout(() => {
          nextBtn.click();
        }, 500);
      }
    }

    sendResponse({ status: "success" });
  }
  return true;
});

// Observe page changes to detect Payment Success or Failure automatically
const observer = new MutationObserver(() => {
  const pageText = document.body.innerText.toLowerCase();

  // Detect Payment Success
  if (pageText.includes('payment successful') || pageText.includes('pagamento riuscito')) {
    chrome.storage.local.get(['soundAlert'], (result) => {
      if (result.soundAlert !== false) {
        playSound();
      }
    });

    // Notify backend
    chrome.runtime.sendMessage({
      action: 'trackEvent',
      event: 'payment_success',
      data: { url: window.location.href }
    });
    
    // Stop observer to prevent multiple pings
    observer.disconnect();
  }

  // Detect Payment Failure & Auto Retry
  if (pageText.includes('payment failed') || pageText.includes('pagamento fallito')) {
    chrome.storage.local.get(['autoRetry'], (result) => {
      if (result.autoRetry !== false && !autoRetryInterval) {
        console.log("Payment failed. Auto-retrying...");
        // Track failure
        chrome.runtime.sendMessage({
          action: 'trackEvent',
          event: 'payment_failed_retry',
          data: { url: window.location.href }
        });

        // Click retry button if it exists
        const retryBtn = Array.from(document.querySelectorAll('button, a')).find(el => el.innerText.toLowerCase().includes('retry') || el.innerText.toLowerCase().includes('riprova'));
        if (retryBtn) {
          setTimeout(() => retryBtn.click(), 2000); // Wait 2s then retry
        }
      }
    });
  }
});

// Start observing the body for changes
observer.observe(document.body, { childList: true, subtree: true });

function playSound() {
  // A simple synthesized beep sound so no external files are needed
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(880, context.currentTime); // High pitch success sound
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  
  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);
  oscillator.stop(context.currentTime + 1);
}
