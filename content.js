// Content script runs on the actual web pages
console.log("CIMEA Helper Content Script Loaded.");

let autoRetryInterval = null;
let isNavigating = false;
let isPaused = false; // Global pause state

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
      <span id="cimea-status-indicator" style="display: inline-block; width: 10px; height: 10px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; transition: background 0.3s;"></span>
      CIMEA Helper Live
    </h2>
    <div style="margin-bottom: 15px; display: flex; gap: 10px;">
      <button id="cimea-pause-btn" style="flex: 1; padding: 10px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; transition: background 0.2s;">Pause Automation</button>
    </div>
    <div id="cimea-log-container" style="display: flex; flex-direction: column; gap: 10px; font-size: 13px;"></div>
  `;
  document.body.appendChild(drawer);

  // Inject CSS for animation
  const style = document.createElement('style');
  style.textContent = `@keyframes cimeaFadeIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
                       #cimea-pause-btn:hover { opacity: 0.9; }`;
  document.head.appendChild(style);

  // Pause button logic
  document.getElementById('cimea-pause-btn').addEventListener('click', (e) => {
    isPaused = !isPaused;
    const btn = e.target;
    const indicator = document.getElementById('cimea-status-indicator');
    if (isPaused) {
      btn.innerText = "Resume Automation";
      btn.style.background = "#10b981"; // Green to resume
      indicator.style.background = "#ef4444";
      indicator.style.boxShadow = "0 0 8px #ef4444";
      logToDrawer("⏸️ Automation Paused.");
    } else {
      btn.innerText = "Pause Automation";
      btn.style.background = "#ef4444"; // Red to pause
      indicator.style.background = "#10b981";
      indicator.style.boxShadow = "0 0 8px #10b981";
      logToDrawer("▶️ Automation Resumed.");
    }
  });
}

function logToDrawer(message) {
  injectDrawer();
  const container = document.getElementById('cimea-log-container');
  if (!container) return;
  const logEntry = document.createElement('div');
  logEntry.style.cssText = 'background: rgba(255,255,255,0.05); padding: 10px; border-radius: 6px; border-left: 3px solid #10b981; animation: cimeaFadeIn 0.3s ease; line-height: 1.4;';
  
  if (isPaused && !message.includes("Automation")) {
    logEntry.style.borderLeftColor = "#ef4444";
  }

  const time = new Date().toLocaleTimeString();
  logEntry.innerHTML = `<span style="color: #94a3b8; font-size: 11px; display: block; margin-bottom: 4px;">${time}</span>${message}`;
  container.appendChild(logEntry);
  
  // Keep only last 20 logs
  if (container.children.length > 20) {
    container.removeChild(container.firstChild);
  }
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

function checkPageState() {
  if (isNavigating || isPaused) return;
  const pageText = document.body.innerText.toLowerCase();
  const currentHash = window.location.hash.toLowerCase();

  // ----------------------------------------------------------------------
  // CONTEXT 0: SERVER CRASH / 502 RECOVERY
  // ----------------------------------------------------------------------
  if (pageText.includes('502 bad gateway') || pageText.includes('504 gateway time-out') || pageText.includes('service unavailable') || pageText.includes('internal server error')) {
      logToDrawer("⚠️ Server crash detected (502/503/504). Auto-refreshing in 3 seconds...");
      isNavigating = true;
      setTimeout(() => location.reload(), 3000);
      return;
  }

  // ----------------------------------------------------------------------
  // CONTEXT 1: PAYMENT / SERVICE PAGE
  // ----------------------------------------------------------------------
  if (currentHash.includes('#/service') || currentHash.includes('#/request') || pageText.includes('billing address') || pageText.includes('purchase a service')) {
    
    // Check for Error First
    if (pageText.includes('the maximum limit of daily requests has been reached') || pageText.includes('il limite massimo di richieste giornaliere è stato raggiunto')) {
      logToDrawer("Step 2: Daily limit reached! Navigating to Home...");
      isNavigating = true;
      
      const homeLink = Array.from(document.querySelectorAll('a, div, span, li')).find(el => el.innerText.trim().toLowerCase() === 'homepage' || el.innerText.trim().toLowerCase() === 'home');
      if (homeLink) {
          homeLink.click();
      } else {
          window.location.hash = '#/';
      }

      setTimeout(() => { isNavigating = false; }, 3000);
      return;
    }

    // If no error, try to submit
    const saveNextBtn = Array.from(document.querySelectorAll('button')).find(el => 
       el.innerText.toLowerCase().includes('save and next') || el.innerText.toLowerCase().includes('salva e continua')
    );
    if (saveNextBtn && !saveNextBtn.disabled && saveNextBtn.offsetParent !== null) {
       logToDrawer("Step 1: On Payment Page. Clicking 'Save and next'...");
       isNavigating = true;
       saveNextBtn.click();
       setTimeout(() => { isNavigating = false; }, 3000);
       return;
    }
  }

  // ----------------------------------------------------------------------
  // CONTEXT 2: HOMEPAGE (DASHBOARD)
  // ----------------------------------------------------------------------
  if (currentHash === '#/' || currentHash.includes('#/home') || pageText.includes('my requests')) {
    const draftBadge = Array.from(document.querySelectorAll('*')).find(el => 
        el.innerText.trim().toLowerCase() === 'draft' || el.innerText.trim().toLowerCase() === 'bozza'
    );
    
    if (draftBadge && draftBadge.offsetParent !== null) {
        const row = draftBadge.closest('tr') || draftBadge.closest('div.row') || draftBadge.parentElement.parentElement;
        if (row) {
            const btns = row.querySelectorAll('button, [role="button"]');
            let actionBtn = Array.from(btns).find(btn => btn.innerText.includes('...'));
            if (!actionBtn && btns.length > 0) actionBtn = btns[btns.length - 1];

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
                logToDrawer("Step 3: On Homepage. Opening Draft menu...");
                isNavigating = true;
                actionBtn.click();
                setTimeout(() => { isNavigating = false; }, 1500);
                return;
            }
        }
    }
  }

  // ----------------------------------------------------------------------
  // CONTEXT 3: LOGIN PAGE (SESSION EXPIRY)
  // ----------------------------------------------------------------------
  if (currentHash.includes('#/login') || (document.querySelector('input[type="password"]') && (pageText.includes('login') || pageText.includes('sign in')))) {
      const loginBtn = Array.from(document.querySelectorAll('button')).find(el => el.innerText.toLowerCase().includes('login') || el.innerText.toLowerCase().includes('sign in') || el.innerText.toLowerCase().includes('accedi'));
      if (loginBtn && !loginBtn.disabled) {
          logToDrawer("🔑 Logged out! Attempting Auto-Login in 2s...");
          isNavigating = true;
          setTimeout(() => {
              loginBtn.click();
              isNavigating = false;
          }, 2000); // Give browser time to autofill passwords
          return;
      }
  }

  // ----------------------------------------------------------------------
  // SUCCESS DETECTION
  // ----------------------------------------------------------------------
  if (pageText.includes('payment successful') || pageText.includes('pagamento riuscito')) {
    chrome.storage.local.get(['soundAlert'], (result) => {
      if (result.soundAlert !== false) {
        playSound();
      }
    });
    chrome.runtime.sendMessage({ action: 'trackEvent', event: 'payment_success' });
    logToDrawer("🎉 PAYMENT SUCCESSFUL! Stopping loop.");
    if (observer) observer.disconnect();
  }
}

const observer = new MutationObserver(checkPageState);
observer.observe(document.body, { childList: true, subtree: true });

// Run once immediately on load
setTimeout(checkPageState, 1000);
setInterval(checkPageState, 2000); // Failsafe interval


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
