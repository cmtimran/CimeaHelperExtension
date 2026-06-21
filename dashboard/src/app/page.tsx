import React from 'react';
import { ArrowRight, CheckCircle, Zap, Globe, Shield, Activity } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
      {/* Navbar */}
      <nav className="fixed w-full border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-bold">
              C
            </div>
            <span className="font-semibold text-lg tracking-tight">CIMEA Helper V2</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Owner Dashboard
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
            Version 1.1 Released - Free & Open for Everyone
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            Automate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">CIMEA Payment</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The ultimate Chrome extension to bypass the manual wait times, auto-fill your documents, and secure your CIMEA payment effortlessly.
            <br/><br/>
            <span className="text-slate-300">CIMEA পেমেন্টের ঝামেলা এখন শেষ! আমাদের এই এক্সটেনশনটি স্বয়ংক্রিয়ভাবে আপনার পেমেন্ট এবং ফর্ম পূরণ সম্পূর্ণ করবে।</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com/cmtimran/CimeaHelperExtension/archive/refs/heads/main.zip" className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all transform hover:scale-105 flex items-center gap-2">
              Download Extension <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Automation Features</h2>
            <p className="text-slate-400">Everything you need to successfully pay on the CIMEA portal.</p>
            <p className="text-slate-300 mt-2">CIMEA পোর্টালে পেমেন্ট সফল করার জন্য প্রয়োজনীয় সকল স্বয়ংক্রিয় ফিচার।</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-emerald-400" />}
              title="Auto Navigation & Fill"
              desc="Instantly clicks 'Next' and automatically fills up repetitive form inputs. No more manual clicking."
              bnDesc="অটোমেটিক নেক্সট বাটনে ক্লিক করবে এবং আপনার প্রয়োজনীয় তথ্যগুলো নিজে নিজেই ফর্মে বসিয়ে দিবে।"
            />
            <FeatureCard 
              icon={<Activity className="w-6 h-6 text-cyan-400" />}
              title="Auto-Retry on Failure"
              desc="Server crashed? The extension will detect the failure and automatically click the retry button for you."
              bnDesc="সার্ভার সমস্যার কারণে পেমেন্ট ফেইল হলে, এটি স্বয়ংক্রিয়ভাবে ২ সেকেন্ড পর আবার চেষ্টা (Retry) করবে।"
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6 text-purple-400" />}
              title="No Login Required"
              desc="100% Free and Public. No license keys, no accounts, and no passwords required to use."
              bnDesc="এটি ব্যবহার করতে কোনো লাইসেন্স কি, আইডি বা পাসওয়ার্ডের প্রয়োজন নেই। সবার জন্য সম্পূর্ণ ফ্রী!"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">How to Install (কিভাবে ইন্সটল করবেন)</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
            
            <Step number="1" title="Download & Unzip" bnTitle="ফাইলটি ডাউনলোড করে আনজিপ করুন">
              Download the extension files from the source and extract the folder to your desktop.
            </Step>
            <Step number="2" title="Enable Developer Mode" bnTitle="ডেভেলপার মোড অন করুন">
              Go to <code className="bg-slate-800 px-2 py-1 rounded text-emerald-400">chrome://extensions/</code> in Chrome and enable "Developer mode" on the top right.
            </Step>
            <Step number="3" title="Load Unpacked" bnTitle="ফোল্ডারটি সিলেক্ট করুন">
              Click on "Load unpacked" and select your extracted folder. The extension is now ready!
            </Step>

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

function FeatureCard({ icon, title, desc, bnDesc }: { icon: React.ReactNode, title: string, desc: string, bnDesc: string }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-2xl hover:bg-slate-800 transition-colors">
      <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 border border-slate-700">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400 text-sm mb-4 leading-relaxed">{desc}</p>
      <p className="text-slate-300 text-sm leading-relaxed border-t border-slate-700/50 pt-4 font-medium">{bnDesc}</p>
    </div>
  );
}

function Step({ number, title, bnTitle, children }: { number: string, title: string, bnTitle: string, children: React.ReactNode }) {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-emerald-400 font-bold z-10">
        {number}
      </div>
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
        <div className="flex flex-col mb-2">
          <span className="font-bold text-lg text-slate-200">{title}</span>
          <span className="text-emerald-400 text-sm font-medium">{bnTitle}</span>
        </div>
        <div className="text-slate-400 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
