"use client";
import React from "react";
import { TrendingUp, Zap } from "lucide-react";

const trends = [
  { label: "API Integration Pain", count: 847, pct: 100 },
  { label: "Billing/Payments", count: 632, pct: 75 },
  { label: "Data Migration", count: 519, pct: 61 },
  { label: "Onboarding UX", count: 411, pct: 49 },
  { label: "Customer Support", count: 388, pct: 46 },
];

const stats = [
  { label: "Problems Found", value: "2,847", color: "text-red-400" },
  { label: "Viable Ideas", value: "189", color: "text-emerald-400" },
  { label: "Sources Active", value: "6/6", color: "text-blue-400" },
];

export default function TrendingPanel() {
  return (
    <aside className="hidden xl:flex flex-col fixed right-0 top-0 h-screen w-[300px] border-l border-[rgba(255,255,255,0.04)] bg-black z-40 p-4 gap-4 overflow-y-auto">
      {/* Trending */}
      <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-white" />
          <h3 className="text-[14px] font-bold text-white">Trending Pain Points</h3>
        </div>
        <div className="space-y-3">
          {trends.map((t, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[13px] text-[#ccc]">{t.label}</span>
                <span className="text-[11px] text-[#666] font-mono">{t.count}</span>
              </div>
              <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#333] to-[#555] rounded-full transition-all" style={{ width: `${t.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-white" />
          <h3 className="text-[14px] font-bold text-white">This Week</h3>
        </div>
        <div className="space-y-3">
          {stats.map((s, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="text-[13px] text-[#888]">{s.label}</span>
              <span className={`text-[14px] font-bold ${s.color}`}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search Widget */}
      <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-2xl p-4">
        <input
          type="text"
          placeholder="Search problems..."
          className="w-full bg-[#111] border border-[rgba(255,255,255,0.08)] rounded-full px-4 py-2.5 text-[13px] text-white placeholder-[#555] outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors"
        />
      </div>
    </aside>
  );
}
