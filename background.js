// Replace this URL with your Vercel deployment URL (e.g., https://your-app.vercel.app/api/track)
const WEBHOOK_URL = "https://your-vercel-app-url.vercel.app/api/track";

// Helper function to send tracking data
async function sendTrackingEvent(eventType, additionalData = {}) {
  try {
    // Fetch IP and Location data
    const locationResponse = await fetch('http://ip-api.com/json/');
    const locationData = await locationResponse.json();

    const payload = {
      event: eventType,
      timestamp: new Date().toISOString(),
      user_info: {
        ip: locationData.query || "Unknown",
        country: locationData.country || "Unknown",
        city: locationData.city || "Unknown",
        isp: locationData.isp || "Unknown"
      },
      ...additionalData
    };

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

// Track when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log("CIMEA Helper Extension Installed.");
  chrome.storage.local.set({
    autoFill: true,
    fastNav: true,
    autoRetry: true,
    soundAlert: true
  });
  
  sendTrackingEvent("extension_installed");
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'trackEvent') {
    sendTrackingEvent(request.event, request.data);
    sendResponse({ status: 'tracked' });
  }
  return true;
});
