// Content script runs on the actual web pages
console.log("CIMEA Helper Content Script Loaded.");

let autoRetryInterval = null;
let isNavigating = false;

// ---------------------------------------------------------
// 1. Drawer UI Logic
// ---------------------------------------------------------
function injectDrawer() {
  if (document.getElementById('cimea-helper-drawer')) return;
  const drawer = document.createElement('div');
  drawer.id = 'cimea-helper-drawer';
  drawer.style.cssText = 'position: fixed; right: 0; top: 0; height: 100vh; width: 300px; background: #0f172a; color: #f8fafc; z-index: 999999; padding: 20px; box-shadow: -5px 0 15px rgba(0,0,0,0.5); font-family: sans-serif; overflow-y: auto; transition: transform 0.3s ease; box-sizing: border-box;';
  drawer.innerHTML = `
    <h2 style="font-size: 16px; margin: 0 0 15px 0; border-bottom: 1px solid #334155; padding-bottom: 10px; display: flex; align-items: center; gap: 8px; font-weight: 600;">
      <span style="display: inline-block; width: 10px; height: 10px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981;"></span>
      CIMEA Helper Live
    </h2>
    <div id="cimea-log-container" style="display: flex; flex-direction: column; gap: 10px; font-size: 13px;"></div>
  `;
  document.body.appendChild(drawer);

  // Inject CSS for animation
  const style = document.createElement('style');
  style.textContent = `@keyframes cimeaFadeIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }`;
  document.head.appendChild(style);
}

function logToDrawer(message) {
  injectDrawer();
  const container = document.getElementById('cimea-log-container');
  if (!container) return;
  const logEntry = document.createElement('div');
  logEntry.style.cssText = 'background: rgba(255,255,255,0.05); padding: 10px; border-radius: 6px; border-left: 3px solid #10b981; animation: cimeaFadeIn 0.3s ease; line-height: 1.4;';
  
  const time = new Date().toLocaleTimeString();
  logEntry.innerHTML = `<span style="color: #94a3b8; font-size: 11px; display: block; margin-bottom: 4px;">${time}</span>${message}`;
  container.appendChild(logEntry);
  
  // Keep only last 20 logs to prevent memory leaks
  if (container.children.length > 20) {
    container.removeChild(container.firstChild);
  }
  // Scroll to bottom
  const drawer = document.getElementById('cimea-helper-drawer');
  drawer.scrollTop = drawer.scrollHeight;
  console.log("[CIMEA Helper]", message);
}

// ---------------------------------------------------------
// 2. Messaging & Manual Triggers
// ---------------------------------------------------------
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startAutomation') {
    logToDrawer("Automation started by user.");
    chrome.runtime.sendMessage({ action: 'trackEvent', event: 'automation_started', data: { url: window.location.href } });
    
    // Auto-fill logic
    if (request.settings.autoFill) {
      logToDrawer("Auto-filling form fields...");
      const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
      inputs.forEach(input => {
        if (!input.value) {
          input.style.backgroundColor = "rgba(16, 185, 129, 0.2)";
          input.style.border = "2px solid #10b981";
        }
      });
    }

    sendResponse({ status: "success" });
  }
  return true;
});

// ---------------------------------------------------------
// 3. Automated Observers (The Loop)
// ---------------------------------------------------------
const observer = new MutationObserver(() => {
  if (isNavigating) return;
  const pageText = document.body.innerText.toLowerCase();

  // ----- Step 1: Click "Save and next" on Payment/Billing page -----
  if (pageText.includes('billing address') || pageText.includes('processing time') || pageText.includes('purchase a service')) {
    const saveNextBtn = Array.from(document.querySelectorAll('button')).find(el => 
       el.innerText.toLowerCase().includes('save and next') || el.innerText.toLowerCase().includes('salva e continua')
    );
    if (saveNextBtn && !saveNextBtn.disabled && saveNextBtn.offsetParent !== null) {
       logToDrawer("Step 1: Found 'Save and next'. Clicking...");
       isNavigating = true;
       saveNextBtn.click();
       setTimeout(() => { isNavigating = false; }, 3000); // Throttle
       return;
    }
  }

  // ----- Step 2: Daily Limit Reached -> Go to Home -----
  if (pageText.includes('the maximum limit of daily requests has been reached') || pageText.includes('il limite massimo di richieste giornaliere è stato raggiunto')) {
    logToDrawer("Step 2: Daily limit reached error detected! Navigating to Home...");
    isNavigating = true;
    window.location.hash = '#/home';
    setTimeout(() => { isNavigating = false; }, 3000);
    return;
  }

  // ----- Step 3 & 4: On Home Page -> Click 3 dots -> Click Complete -----
  if (window.location.hash.includes('home') || window.location.hash === '#/' || pageText.includes('your requests')) {
    const draftBadge = Array.from(document.querySelectorAll('*')).find(el => 
        el.innerText.trim().toLowerCase() === 'draft' || el.innerText.trim().toLowerCase() === 'bozza'
    );
    
    if (draftBadge && draftBadge.offsetParent !== null) {
        // Find parent row
        const row = draftBadge.closest('tr') || draftBadge.closest('div.row') || draftBadge.parentElement.parentElement;
        if (row) {
            // Find action menu button (usually the last button in the row or contains ...)
            const btns = row.querySelectorAll('button, [role="button"]');
            let actionBtn = Array.from(btns).find(btn => btn.innerText.includes('...'));
            if (!actionBtn && btns.length > 0) {
               actionBtn = btns[btns.length - 1]; // Fallback to last button
            }

            // Check if dropdown is already open by looking for 'Complete' text
            const completeOption = Array.from(document.querySelectorAll('button, a, div, span, li')).find(el => 
                (el.innerText.toLowerCase().includes('complete') || el.innerText.toLowerCase().includes('completa')) && 
                el.offsetParent !== null && !el.innerText.toLowerCase().includes('completed')
            );

            if (completeOption) {
                logToDrawer("Step 4: Clicking 'Complete'...");
                isNavigating = true;
                completeOption.click();
                setTimeout(() => { isNavigating = false; }, 3000);
                return;
            } else if (actionBtn && actionBtn.offsetParent !== null) {
                logToDrawer("Step 3: Found Draft request. Opening action menu (...)");
                isNavigating = true;
                actionBtn.click();
                setTimeout(() => { isNavigating = false; }, 1500); // Wait for menu to open
                return;
            }
        }
    }
  }

  // ----- Success Detection -----
  if (pageText.includes('payment successful') || pageText.includes('pagamento riuscito')) {
    chrome.storage.local.get(['soundAlert'], (result) => {
      if (result.soundAlert !== false) {
        playSound();
      }
    });
    chrome.runtime.sendMessage({ action: 'trackEvent', event: 'payment_success' });
    logToDrawer("🎉 PAYMENT SUCCESSFUL! Stopping loop.");
    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// Play success sound
function playSound() {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(880, context.currentTime);
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);
  oscillator.stop(context.currentTime + 1);
}
