"use client";
import React from "react";
import { TrendingUp, Zap } from "lucide-react";

const trends = [
  { label: "API Integration", count: 847, pct: 100 },
  { label: "Billing/Payments", count: 632, pct: 75 },
  { label: "Data Migration", count: 519, pct: 61 },
  { label: "Onboarding UX", count: 411, pct: 49 },
  { label: "Support Tooling", count: 388, pct: 46 },
];

const stats = [
  { label: "Scraped", value: "136", color: "text-white" },
  { label: "High Pain", value: "42", color: "text-red-400" },
  { label: "Viable", value: "89", color: "text-emerald-400" },
];

export default function TrendingPanel() {
  return (
    <aside className="hidden xl:flex flex-col fixed right-0 top-0 h-screen w-[280px] border-l border-[rgba(255,255,255,0.04)] bg-black z-40 p-3 gap-3 overflow-y-auto">
      {/* Quick stats */}
      <div className="flex gap-2">
        {stats.map((s, i) => (
          <div key={i} className="flex-1 bg-[#0a0a0a] border border-[rgba(255,255,255,0.05)] rounded-lg p-2.5 text-center">
            <p className={`text-[16px] font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-[#555] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Trending */}
      <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.05)] rounded-xl p-3.5">
        <div className="flex items-center gap-1.5 mb-3">
          <TrendingUp size={13} className="text-[#888]" />
          <h3 className="text-[12px] font-semibold text-[#888] uppercase tracking-wider">Trending</h3>
        </div>
        <div className="space-y-2.5">
          {trends.map((t, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[12px] text-[#ccc]">{t.label}</span>
                <span className="text-[10px] text-[#555] font-mono">{t.count}</span>
              </div>
              <div className="h-[3px] bg-[#151515] rounded-full overflow-hidden">
                <div className="h-full bg-[#333] rounded-full" style={{ width: `${t.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <input type="text" placeholder="Search problems..."
        className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-lg px-3.5 py-2.5 text-[12px] text-white placeholder-[#444] outline-none focus:border-[rgba(255,255,255,0.15)] transition-colors" />
    </aside>
  );
}
