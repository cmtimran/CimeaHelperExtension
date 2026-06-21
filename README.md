# CIMEA Payment Helper V2 🚀

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/cmtimran/CimeaHelperExtension)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/cmtimran/CimeaHelperExtension)

The **CIMEA Payment Helper V2** is a robust Google Chrome Extension paired with a powerful Next.js Admin Dashboard designed to automate form filling, page navigation, and payment retries on the CIMEA portal.

*CIMEA পেমেন্টের ঝামেলা এখন শেষ! আমাদের এই এক্সটেনশনটি স্বয়ংক্রিয়ভাবে আপনার পেমেন্ট এবং ফর্ম পূরণ সম্পূর্ণ করবে।*

---

## 🌟 Features (ফিচারসমূহ)

1. **Auto Navigation & Form Fill (অটো নেভিগেশন ও ফর্ম ফিলাপ)**
   Instantly clicks 'Next' and automatically fills up repetitive form inputs. No more manual clicking.
2. **Auto-Retry on Failure (সার্ভার সমস্যায় অটো রিট্রাই)**
   Server crashed? The extension will detect the failure and automatically click the retry button for you.
3. **Success Sound Alert (সাকসেস সাউন্ড)**
   Plays an automatic beep sound when a payment is processed successfully.
4. **No Login Required (লগইন বা পাসওয়ার্ডের প্রয়োজন নেই)**
   100% Free and Public. No license keys, no accounts, and no passwords required to use.
5. **Owner Tracking Dashboard (ইউজার ট্র্যাকিং ড্যাশবোর্ড)**
   Includes a live Next.js Vercel dashboard to track usage, successful payments, and user locations by IP and Country.

---

## 🛠️ Installation Guide (কীভাবে ইন্সটল করবেন)

### 1. Install Chrome Extension
1. **Download & Extract**: Clone or download this repository and extract it to your desktop.
2. **Enable Developer Mode**: Open Google Chrome, go to `chrome://extensions/` and turn on **"Developer mode"** in the top right corner.
3. **Load Extension**: Click the **"Load unpacked"** button and select the extracted folder (the root folder containing `manifest.json`).
4. **Pin the Extension**: Click the puzzle icon in Chrome and pin the CIMEA Helper Tool for easy access.

*বাংলায় নির্দেশনা:* 
প্রথমে রিপোজিটরিটি ডাউনলোড করে আনজিপ করুন। এরপর ক্রোমের এক্সটেনশন পেজে (`chrome://extensions/`) গিয়ে "Developer mode" চালু করুন এবং "Load unpacked"-এ ক্লিক করে আনজিপ করা ফোল্ডারটি সিলেক্ট করুন।

### 2. Setup Admin Dashboard & Tracking (Vercel)
If you want to view the live analytics of who is using the extension:
1. Upload this repository to your GitHub account.
2. Go to [Vercel.com](https://vercel.com/new) and create a new project.
3. Import your GitHub repository. Select `dashboard` as the **Root Directory** and click **Deploy**.
4. Once deployed, navigate to your Vercel project's **Storage** tab.
5. Create a new **Postgres** database and link it to the project.
6. Open your local `background.js` file, and update the `WEBHOOK_URL` to point to your new Vercel domain (e.g., `https://your-app.vercel.app/api/track`).
7. Save the file, reload the extension in Chrome, and you're good to go!

---

## 📂 Project Structure

```
├── manifest.json       # Chrome Extension Manifest
├── background.js       # Background service worker & Tracking API caller
├── content.js          # On-page automation logic (Auto-fill, Auto-retry)
├── popup.html          # Extension UI
├── popup.css           # Premium Glassmorphic Dark UI styles
├── popup.js            # Extension UI logic and settings saver
└── dashboard/          # Next.js Analytics Dashboard (Vercel Backend)
    ├── app/page.tsx    # Public Landing Page
    ├── app/dashboard/  # Owner Live Tracking Dashboard
    └── app/api/track/  # Vercel Postgres API Endpoint for logs
```

---

## 🤝 Support
If you need any help modifying the form inputs, adjusting the automation click speeds, or updating the target buttons, feel free to open an issue or modify `content.js`.

**Developed for automation, ease, and speed.**
