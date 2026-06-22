"use client";

import React, { useState } from 'react';
import { ArrowRight, Zap, Shield, Activity, Heart, Globe, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
    coffeeBtn: "Donate via Card",
    coffeeSub: "Powered by Stripe",
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
    coffeeBtn: "কার্ড দিয়ে পেমেন্ট করুন",
    coffeeSub: "Stripe পেমেন্ট",
    dashboardBtn: "ওনার ড্যাশবোর্ড"
  }
};

type LangType = 'en' | 'bn';

export default function LandingPage() {
  const [lang, setLang] = useState<LangType>('bn'); 

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* Background Ambient Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-600/20 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[150px] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="fixed w-full border-b border-slate-800/50 bg-[#030712]/70 backdrop-blur-xl z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center font-bold text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
              C
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">CIMEA Helper</span>
          </div>
          <div className="flex items-center gap-6">
            {/* Language Selector */}
            <div className="flex items-center bg-slate-900/80 rounded-full p-1.5 border border-slate-800 shadow-inner">
              <Globe className="w-4 h-4 text-emerald-400 ml-2" />
              <select 
                className="bg-transparent text-sm font-semibold text-slate-200 outline-none cursor-pointer pl-2 pr-3 py-1 appearance-none"
                value={lang}
                onChange={(e) => setLang(e.target.value as LangType)}
              >
                <option value="bn" className="bg-slate-900">বাংলা</option>
                <option value="en" className="bg-slate-900">English</option>
              </select>
            </div>
            
            <Link href="/dashboard" className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors">
              {t.dashboardBtn}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-8 shadow-[0_0_20px_rgba(52,211,153,0.1)]">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                Version 1.1 Released
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                {t.titlePrefix} <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 drop-shadow-sm">{t.titleHighlight}</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
                {t.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                <a href="https://github.com/cmtimran/CimeaHelperExtension/archive/refs/heads/main.zip" 
                   className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(52,211,153,0.4)] flex items-center gap-2 w-full sm:w-auto justify-center">
                  {t.download} <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* 3D Illustration */}
            <div className="order-1 lg:order-2 flex justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-full blur-[80px]"></div>
              <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/3]" style={{ animation: "float 6s ease-in-out infinite" }}>
                <Image 
                  src="/cimea_diploma.jpg" 
                  alt="CIMEA Diplo-me Portal Automation" 
                  fill
                  className="object-cover rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700/50"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative border-t border-slate-800/50 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.featuresTitle}</h2>
            <p className="text-lg text-slate-400 font-medium">{t.featuresSub}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-7 h-7 text-emerald-400" />}
              title={t.f1Title}
              desc={t.f1Desc}
              glowColor="emerald"
            />
            <FeatureCard 
              icon={<Activity className="w-7 h-7 text-cyan-400" />}
              title={t.f2Title}
              desc={t.f2Desc}
              glowColor="cyan"
            />
            <FeatureCard 
              icon={<Shield className="w-7 h-7 text-purple-400" />}
              title={t.f3Title}
              desc={t.f3Desc}
              glowColor="purple"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">{t.installTitle}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-6">
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-900/10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl p-12 rounded-[2.5rem] shadow-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-rose-500/10 mb-8 border border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.15)]">
            <Heart className="w-10 h-10 text-rose-500 animate-pulse" />
          </div>
          <h2 className="text-4xl font-bold mb-6 text-white">{t.supportTitle}</h2>
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.supportDesc}
          </p>

          <div className="flex flex-col items-center justify-center gap-6 mt-8">
            <a href="#" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-[#635BFF] to-[#4338CA] hover:to-[#312E81] text-white px-12 py-6 rounded-3xl transition-all transform hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(99,91,255,0.3)] flex items-center justify-center gap-4 font-bold max-w-md w-full mx-auto">
              <span className="text-2xl">{t.coffeeBtn}</span>
              <span className="text-sm font-semibold opacity-90 bg-white/20 px-3 py-1 rounded-full">{t.coffeeSub}</span>
            </a>
            <p className="text-slate-500 text-sm">Accepts all major Credit Cards, Apple Pay, and Google Pay worldwide.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center border-t border-slate-800/80 text-slate-500 bg-slate-950">
        <p className="font-medium text-sm">© 2026 CIMEA Payment Helper V2. Developed for Automation.</p>
      </footer>
      
      {/* Add Floating Keyframes dynamically */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}} />
    </div>
  );
}

function FeatureCard({ icon, title, desc, glowColor }: { icon: React.ReactNode, title: string, desc: string, glowColor: string }) {
  const glowClasses: Record<string, string> = {
    emerald: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(52,211,153,0.1)]",
    cyan: "group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]",
    purple: "group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
  };

  return (
    <div className={`bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] transition-all duration-300 group hover:-translate-y-2 ${glowClasses[glowColor]}`}>
      <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mb-8 border border-slate-800 group-hover:scale-110 transition-transform shadow-inner">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-50 transition-colors">{title}</h3>
      <p className="text-slate-400 text-base leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({ number, title, children }: { number: string, title: string, children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-6 bg-slate-900/30 p-6 md:p-8 rounded-[2rem] border border-slate-800/50 hover:bg-slate-800/40 transition-colors">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-black text-xl shrink-0 shadow-[0_0_20px_rgba(52,211,153,0.1)]">
        {number}
      </div>
      <div className="flex flex-col pt-3">
        <h3 className="font-bold text-2xl text-slate-100 mb-3">{title}</h3>
        <p className="text-slate-400 text-lg leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
