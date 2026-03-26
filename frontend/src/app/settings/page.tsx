import PageShell from "@/components/PageShell";
import { User, Key, Bell, Clock, Shield } from "lucide-react";

const settings = [
  { icon: User, label: "Account", desc: "Manage your profile and subscription" },
  { icon: Key, label: "API Keys", desc: "Configure Groq, Reddit, and other API keys" },
  { icon: Bell, label: "Notifications", desc: "Set up email alerts for high-pain problems" },
  { icon: Clock, label: "Scrape Schedule", desc: "Configure automatic scraping frequency" },
  { icon: Shield, label: "Privacy", desc: "Data retention and export settings" },
];

export default function SettingsPage() {
  return (
    <PageShell title="Settings" subtitle="Configure your Problem Extractor instance.">
      <div className="divide-y divide-[rgba(255,255,255,0.04)]">
        {settings.map((s, i) => (
          <div key={i} className="flex items-center gap-4 px-4 sm:px-6 py-4 hover:bg-[#080808] transition-colors cursor-pointer">
            <div className="p-2.5 rounded-lg bg-[#111] text-[#888]"><s.icon size={18} /></div>
            <div>
              <h3 className="text-[14px] font-semibold text-white">{s.label}</h3>
              <p className="text-[12px] text-[#666]">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 sm:p-6">
        <div className="p-4 bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-xl">
          <p className="text-[12px] text-[#555]">Problem Extractor v1.0 · Built autonomously by Antigravity AI</p>
        </div>
      </div>
    </PageShell>
  );
}
