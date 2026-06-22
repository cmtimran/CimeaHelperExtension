// Replace this URL with your Vercel deployment URL
const WEBHOOK_URL = "https://dashboard-xi-eight-52.vercel.app/api/track"; // Vercel API Endpoint

// ==========================================
// 1. Listen for extension installation
// ==========================================
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log("CIMEA Helper Extension Installed.");
  chrome.storage.local.set({
    autoFill: true,
    fastNav: true,
    autoRetry: true,
    soundAlert: true
  });

  if (details.reason === "install") {
    // Only track new installs, not updates
    const ipData = await fetchIPAndLocation();
    
    sendTrackingData({
      event: "extension_installed",
      message: "User installed the CIMEA helper extension",
      ...ipData
    });
  }
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'trackEvent') {
    // fetchIPAndLocation cannot easily be called synchronously in listener without returning true, 
    // but we can make it async.
    (async () => {
      const ipData = await fetchIPAndLocation();
      sendTrackingData({
        event: request.event,
        ...request.data,
        ...ipData
      });
      sendResponse({ status: 'tracked' });
    })();
    return true; // Keep message channel open for async response
  }
});

// Helper function to send data to our Next.js Vercel backend
async function sendTrackingData(payload) {
  try {
    console.log("Sending Tracking Payload:", payload);

    if (WEBHOOK_URL.includes("your-vercel-app-url")) {
      console.warn("Tracking skipped: Please set your WEBHOOK_URL in background.js to your actual Vercel domain.");
      return;
    }

    // Send to Webhook
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

  } catch (error) {
    console.error("Tracking Error:", error);
  }
}

// Fetch IP and Location data
async function fetchIPAndLocation() {
  try {
    const locationResponse = await fetch('https://freeipapi.com/api/json');
    const text = await locationResponse.text();
    let locationData = {};
    try {
      locationData = JSON.parse(text);
    } catch (parseError) {
      throw new Error('Invalid JSON response from IP API');
    }

    return {
      user_info: {
        ip: locationData.ipAddress || "Unknown",
        country: locationData.countryName || "Unknown",
        city: locationData.cityName || "Unknown",
        isp: "Unknown" // freeipapi doesn't provide ISP
      }
    };
  } catch (e) {
    console.warn("Could not fetch IP, continuing with Unknown.", e.message);
    return {
      user_info: {
        ip: "Unknown",
        country: "Unknown",
        city: "Unknown",
        isp: "Unknown"
      }
    };
  }
}
