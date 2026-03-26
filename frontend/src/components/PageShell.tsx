"use client";
import React from "react";
import Sidebar from "./Sidebar";
import TrendingPanel from "./TrendingPanel";
import MobileNav from "./MobileNav";
import { Flame } from "lucide-react";

export default function PageShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-[#f5f5f5]">
      <Sidebar /><TrendingPanel /><MobileNav />
      <main className="lg:ml-[220px] xl:mr-[300px] min-h-screen border-x border-[rgba(255,255,255,0.04)]">
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.04)] sticky top-0 bg-black/80 backdrop-blur-xl z-30">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center"><Flame size={14} className="text-black" /></div>
          <span className="text-[16px] font-bold">{title}</span>
          <div className="w-7 h-7 rounded-full bg-[#222] flex items-center justify-center text-[11px] font-bold">S</div>
        </header>
        <div className="px-4 sm:px-6 py-6 border-b border-[rgba(255,255,255,0.04)]">
          <h1 className="text-[22px] font-bold text-white">{title}</h1>
          <p className="text-[14px] text-[#666] mt-1">{subtitle}</p>
        </div>
        <div className="pb-24 lg:pb-0">{children}</div>
      </main>
    </div>
  );
}
