"use client";
import { useState } from "react";
import PageShell from "@/components/PageShell";
import { User, Key, Bell, Clock, Shield, ChevronDown, ChevronUp } from "lucide-react";

const settings = [
  { icon: User, label: "Account", desc: "Manage your profile and subscription", content: "Configure your display name, email, and manage your freemium subscription plan. Upgrade to Pro for unlimited scraping and priority AI analysis." },
  { icon: Key, label: "API Keys", desc: "Configure Groq, Reddit, and other API keys", content: "Current AI Engine: Groq LLaMA-3.3-70b-versatile. Your API key is securely stored in the server environment. To update, modify the .env file on the server." },
  { icon: Bell, label: "Notifications", desc: "Set up email alerts for high-pain problems", content: "Get instant email alerts when a problem scores 9/10 or higher. Configure Slack webhooks for team notifications. Coming soon." },
  { icon: Clock, label: "Scrape Schedule", desc: "Configure automatic scraping frequency", content: "The scraper currently runs manually. Set up a cron job to run every 6, 12, or 24 hours. Configure which subreddits and platforms to scrape. Current sources: 8 subreddits + HackerNews + Product Hunt." },
  { icon: Shield, label: "Privacy", desc: "Data retention and export settings", content: "All scraped data is stored locally on your Azure server. No data is sent to third parties. Export all data as JSON or CSV for your records. Delete all scraped data with one click." },
];

export default function SettingsPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <PageShell title="Settings" subtitle="Configure your Problem Extractor instance.">
      <div className="divide-y divide-[rgba(255,255,255,0.04)]">
        {settings.map((s, i) => (
          <div key={i}>
            <button onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center gap-4 px-4 sm:px-6 py-4 hover:bg-[#080808] transition-colors cursor-pointer text-left">
              <div className="p-2.5 rounded-lg bg-[#111] text-[#888]"><s.icon size={18} /></div>
              <div className="flex-1">
                <h3 className="text-[14px] font-semibold text-white">{s.label}</h3>
                <p className="text-[12px] text-[#666]">{s.desc}</p>
              </div>
              {open === i ? <ChevronUp size={16} className="text-[#555]" /> : <ChevronDown size={16} className="text-[#555]" />}
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${open === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="px-4 sm:px-6 pb-4 pl-[72px] sm:pl-[88px]">
                <p className="text-[13px] text-[#999] leading-relaxed">{s.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 sm:p-6">
        <div className="p-4 bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-xl">
          <p className="text-[12px] text-[#555]">Problem Extractor v1.0 · Powered by Groq LLaMA-3.3-70b · Built by Antigravity AI</p>
        </div>
      </div>
    </PageShell>
  );
}
