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
  drawer.style.cssText = 'position: fixed; bottom: 30px; right: 30px; width: 320px; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; color: #f8fafc; z-index: 999999; padding: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.4); font-family: "Segoe UI", system-ui, sans-serif; display: flex; flex-direction: column; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-sizing: border-box; overflow: hidden;';
  
  drawer.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
      <h2 style="font-size: 15px; margin: 0; display: flex; align-items: center; gap: 8px; font-weight: 600;">
        <span id="cimea-status-indicator" style="display: inline-block; width: 10px; height: 10px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; transition: background 0.3s;"></span>
        CIMEA Helper
      </h2>
      <button id="cimea-toggle-btn" style="background: transparent; border: none; color: #94a3b8; cursor: pointer; font-size: 18px; padding: 0 5px; line-height: 1;">−</button>
    </div>
    
    <div id="cimea-drawer-content" style="display: flex; flex-direction: column; transition: max-height 0.3s ease;">
      <div style="margin-bottom: 12px; display: flex;">
        <button id="cimea-pause-btn" style="flex: 1; padding: 8px; background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid rgba(239,68,68,0.3); border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 13px; transition: all 0.2s;">Pause Automation</button>
      </div>
      <div id="cimea-log-container" style="display: flex; flex-direction: column; gap: 8px; font-size: 12px; max-height: 250px; overflow-y: auto; padding-right: 5px;"></div>
    </div>
  `;
  document.body.appendChild(drawer);

  // Inject CSS for animation and custom scrollbar
  const style = document.createElement('style');
  style.textContent = `
    @keyframes cimeaFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    #cimea-pause-btn:hover { background: rgba(239, 68, 68, 0.4) !important; }
    #cimea-log-container::-webkit-scrollbar { width: 4px; }
    #cimea-log-container::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 4px; }
    #cimea-log-container::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
  `;
  document.head.appendChild(style);

  // Toggle Minimize/Maximize logic
  let isMinimized = false;
  document.getElementById('cimea-toggle-btn').addEventListener('click', (e) => {
    isMinimized = !isMinimized;
    const content = document.getElementById('cimea-drawer-content');
    if (isMinimized) {
      content.style.display = 'none';
      e.target.innerText = '+';
      drawer.style.width = '180px';
      drawer.style.padding = '12px 16px';
    } else {
      content.style.display = 'flex';
      e.target.innerText = '−';
      drawer.style.width = '320px';
      drawer.style.padding = '16px';
    }
  });

  // Pause button logic
  document.getElementById('cimea-pause-btn').addEventListener('click', (e) => {
    isPaused = !isPaused;
    const btn = e.target;
    const indicator = document.getElementById('cimea-status-indicator');
    if (isPaused) {
      btn.innerText = "Resume Automation";
      btn.style.background = "rgba(16, 185, 129, 0.2)"; // Green tint
      btn.style.color = "#6ee7b7";
      btn.style.borderColor = "rgba(16, 185, 129, 0.3)";
      indicator.style.background = "#ef4444";
      indicator.style.boxShadow = "0 0 8px #ef4444";
      logToDrawer("⏸️ Automation Paused.");
    } else {
      btn.innerText = "Pause Automation";
      btn.style.background = "rgba(239, 68, 68, 0.2)"; // Red tint
      btn.style.color = "#fca5a5";
      btn.style.borderColor = "rgba(239, 68, 68, 0.3)";
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
