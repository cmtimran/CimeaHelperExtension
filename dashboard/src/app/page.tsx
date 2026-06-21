"use client";

import React, { useState } from 'react';
import { ArrowRight, Zap, Shield, Activity, Heart, Globe } from 'lucide-react';
import Link from 'next/link';

const translations = {
  en: {
    titlePrefix: "Automate Your",
    titleHighlight: "CIMEA Payment",
    subtitle: "The ultimate Chrome extension to bypass the manual wait times, auto-fill your documents, and secure your CIMEA payment effortlessly.",
    download: "Download Extension",
    featuresTitle: "Powerful Automation Features",
    featuresSub: "Everything you need to successfully pay on the CIMEA portal.",
    f1Title: "Auto Navigation & Fill",
    f1Desc: "Instantly clicks 'Next' and automatically fills up repetitive form inputs. No more manual clicking.",
    f2Title: "Auto-Retry on Failure",
    f2Desc: "Server crashed? The extension will detect the failure and automatically click the retry button for you.",
    f3Title: "No Login Required",
    f3Desc: "100% Free and Public. No license keys, no accounts, and no passwords required to use.",
    installTitle: "How to Install",
    s1Title: "Download & Unzip",
    s1Desc: "Download the extension files from the source and extract the folder to your desktop.",
    s2Title: "Enable Developer Mode",
    s2Desc: "Go to chrome://extensions/ in Chrome and enable 'Developer mode' on the top right.",
    s3Title: "Load Unpacked",
    s3Desc: "Click on 'Load unpacked' and select your extracted folder. The extension is now ready!",
    supportTitle: "Support the Developer",
    supportDesc: "This extension is 100% free for everyone. If this tool saved you time and money, consider supporting the developer!",
    bkashTitle: "bKash / Nagad (Personal)",
    bkashDesc: "Send Money / Cash In",
    coffeeBtn: "Buy me a Coffee",
    coffeeSub: "PayPal / Card",
    dashboardBtn: "Owner Dashboard"
  },
  bn: {
    titlePrefix: "অটোমেট করুন আপনার",
    titleHighlight: "CIMEA পেমেন্ট",
    subtitle: "CIMEA পেমেন্টের ঝামেলা এখন শেষ! আমাদের এই এক্সটেনশনটি স্বয়ংক্রিয়ভাবে আপনার পেমেন্ট এবং ফর্ম পূরণ সম্পূর্ণ করবে।",
    download: "ডাউনলোড এক্সটেনশন",
    featuresTitle: "পাওয়ারফুল অটোমেশন ফিচার",
    featuresSub: "CIMEA পোর্টালে পেমেন্ট সফল করার জন্য প্রয়োজনীয় সকল স্বয়ংক্রিয় ফিচার।",
    f1Title: "অটো নেভিগেশন এবং ফিল",
    f1Desc: "অটোমেটিক নেক্সট বাটনে ক্লিক করবে এবং আপনার প্রয়োজনীয় তথ্যগুলো নিজে নিজেই ফর্মে বসিয়ে দিবে।",
    f2Title: "ফেইল হলে অটো রিট্রাই",
    f2Desc: "সার্ভার সমস্যার কারণে পেমেন্ট ফেইল হলে, এটি স্বয়ংক্রিয়ভাবে ২ সেকেন্ড পর আবার চেষ্টা (Retry) করবে।",
    f3Title: "লগইন প্রয়োজন নেই",
    f3Desc: "এটি ব্যবহার করতে কোনো লাইসেন্স কি, আইডি বা পাসওয়ার্ডের প্রয়োজন নেই। সবার জন্য সম্পূর্ণ ফ্রী!",
    installTitle: "কীভাবে ইন্সটল করবেন",
    s1Title: "ডাউনলোড ও আনজিপ করুন",
    s1Desc: "এক্সটেনশন ফাইলটি ডাউনলোড করে আপনার ডেস্কটপে আনজিপ (Extract) করুন।",
    s2Title: "ডেভেলপার মোড অন করুন",
    s2Desc: "ক্রোমের chrome://extensions/ পেজে যান এবং ডানদিকের কোনা থেকে 'Developer mode' চালু করুন।",
    s3Title: "ফোল্ডারটি সিলেক্ট করুন",
    s3Desc: "'Load unpacked' বাটনে ক্লিক করে আনজিপ করা ফোল্ডারটি সিলেক্ট করুন। ব্যাস, কাজ শেষ!",
    supportTitle: "ডেভেলপারকে সাপোর্ট করুন",
    supportDesc: "এই টুলটি সম্পূর্ণ ফ্রী! যদি এটি আপনার সময় ও টাকা বাঁচিয়ে থাকে, তবে আপনি চাইলে ডেভেলপারকে কিছু ডোনেট করতে পারেন।",
    bkashTitle: "বিকাশ / নগদ (পার্সোনাল)",
    bkashDesc: "সেন্ড মানি / ক্যাশ ইন",
    coffeeBtn: "কফি কিনে দিন",
    coffeeSub: "পেপ্যাল / কার্ড",
    dashboardBtn: "ওনার ড্যাশবোর্ড"
  }
};

type LangType = 'en' | 'bn';

export default function LandingPage() {
  const [lang, setLang] = useState<LangType>('bn'); // Defaulting to Bangla based on conversation

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
      {/* Navbar */}
      <nav className="fixed w-full border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-bold">
              C
            </div>
            <span className="font-semibold text-lg tracking-tight hidden sm:block">CIMEA Helper</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
              <Globe className="w-4 h-4 text-slate-400 ml-2" />
              <select 
                className="bg-transparent text-sm font-medium text-slate-200 outline-none cursor-pointer pl-1 pr-2 py-1"
                value={lang}
                onChange={(e) => setLang(e.target.value as LangType)}
              >
                <option value="bn" className="bg-slate-900">বাংলা</option>
                <option value="en" className="bg-slate-900">English</option>
              </select>
            </div>
            
            <Link href="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              {t.dashboardBtn}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Version 1.1 Released - Free & Open
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            {t.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{t.titleHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com/cmtimran/CimeaHelperExtension/archive/refs/heads/main.zip" className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all transform hover:scale-105 flex items-center gap-2">
              {t.download} <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.featuresTitle}</h2>
            <p className="text-slate-400">{t.featuresSub}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-emerald-400" />}
              title={t.f1Title}
              desc={t.f1Desc}
            />
            <FeatureCard 
              icon={<Activity className="w-6 h-6 text-cyan-400" />}
              title={t.f2Title}
              desc={t.f2Desc}
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6 text-purple-400" />}
              title={t.f3Title}
              desc={t.f3Desc}
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.installTitle}</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
            <Step number="1" title={t.s1Title}>
              {t.s1Desc}
            </Step>
            <Step number="2" title={t.s2Title}>
              {t.s2Desc}
            </Step>
            <Step number="3" title={t.s3Title}>
              {t.s3Desc}
            </Step>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-500/10 mb-6">
            <Heart className="w-8 h-8 text-rose-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">{t.supportTitle}</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t.supportDesc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="bg-slate-800/50 border border-rose-500/30 p-6 rounded-2xl w-full sm:w-auto hover:border-rose-500/50 transition-colors">
              <h3 className="text-lg font-bold text-rose-400 mb-2">{t.bkashTitle}</h3>
              <p className="text-2xl font-mono tracking-widest text-white mb-2">01X-XXXX-XXXX</p>
              <p className="text-sm text-slate-400">{t.bkashDesc}</p>
            </div>
            
            <a href="#" className="bg-[#FFDD00] hover:bg-[#FFEA4C] text-black p-6 rounded-2xl w-full sm:w-auto transition-transform transform hover:scale-105 flex flex-col items-center justify-center gap-2 font-bold">
              <span className="text-xl">{t.coffeeBtn}</span>
              <span className="text-sm font-medium opacity-80">{t.coffeeSub}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-slate-800/50 text-slate-500">
        <p>© 2026 CIMEA Payment Helper V2. Developed for Automation.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-2xl hover:bg-slate-800 transition-colors">
      <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 border border-slate-700">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({ number, title, children }: { number: string, title: string, children: React.ReactNode }) {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-emerald-400 font-bold z-10">
        {number}
      </div>
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
        <div className="flex flex-col mb-2">
          <span className="font-bold text-lg text-slate-200">{title}</span>
        </div>
        <div className="text-slate-400 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
