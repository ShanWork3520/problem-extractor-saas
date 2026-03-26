"use client";
import React from "react";
import { Home, Lightbulb, Search, Settings, Flame, Code, Menu, Bell } from "lucide-react";

export default function Dashboard() {
  const problems = [
    { source: "Reddit (/r/SaaS)", painScore: 9, viablity: "High", idea: "A unified AI webhook router to stop Zapier from charging $100/mo for simple JSON mapping.", text: "I am literally losing my mind manually mapping JSON webhooks in Zapier and paying huge fees for basic logic." },
    { source: "HackerNews", painScore: 8, viablity: "Medium", idea: "An automated GitHub PR reviewer that actually catches security flaws before merge.", text: "It's 2026 and we still don't have a reliable code reviewer that acts like a senior dev and doesn't just complain about syntax." },
    { source: "Product Hunt", painScore: 7, viablity: "High", idea: "One-click cross-platform desktop wrapper for Next.js apps.", text: "Why is wrapping a simple React app into Electron still so incredibly tedious? Someone just make it 1 click." }
  ];

  return (
    <div className="flex w-full h-screen overflow-hidden bg-[#050505]">
      
      {/* Desktop Sidebar (AMOLED Pitch Black with subtle border) */}
      <aside className="hidden sm:flex flex-col w-64 h-full border-r border-[#ffffff0a] p-4 justify-between bg-[#000]">
        <div>
          <div className="flex items-center gap-3 px-2 mb-8 mt-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center border border-[#ffffff15]">
              <Flame size={18} className="text-white" />
            </div>
            <span className="font-semibold tracking-tight text-white text-lg">SaasExtractor</span>
          </div>

          <nav className="space-y-1">
            <NavItem icon={<Home size={18} />} label="Live Feed" active />
            <NavItem icon={<Lightbulb size={18} />} label="Validated Ideas" />
            <NavItem icon={<Search size={18} />} label="Scraper Config" />
          </nav>
        </div>
        
        <NavItem icon={<Settings size={18} />} label="Settings" />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full bg-[#050505] relative overflow-hidden">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="sm:hidden flex items-center justify-between p-4 border-b border-[#ffffff0a] bg-[#000]/80 backdrop-blur-md z-10 sticky top-0">
          <div className="flex items-center gap-2">
            <Flame size={20} className="text-white" />
            <span className="font-semibold text-white">Extract</span>
          </div>
          <Menu size={20} className="text-neutral-400" />
        </header>

        {/* Feed Header */}
        <div className="px-4 sm:px-8 pt-8 pb-4 border-b border-[#ffffff05]">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Real-Time Problems</h1>
          <p className="text-neutral-500 mt-1 text-sm sm:text-base">Autonomous AI analyzing complaints across 6 major platforms.</p>
        </div>

        {/* Scrollable Problem Feed */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-4 pb-24 sm:pb-8">
          {problems.map((prob, i) => (
            <div key={i} className="bg-[#ffffff03] border border-[#ffffff0a] hover:border-[#ffffff1a] transition-colors rounded-2xl p-5 sm:p-6 backdrop-blur-xl group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono px-2.5 py-1 bg-white/10 text-neutral-300 rounded-md uppercase tracking-wider">
                  {prob.source}
                </span>
                
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-xs font-semibold px-2 py-1 bg-red-500/10 text-red-400 rounded-md">
                    Pain: <span className="text-white">{prob.painScore}/10</span>
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md">
                    <Code size={12} /> {prob.viablity} MVP
                  </span>
                </div>
              </div>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-4">"{prob.text}"</p>
              
              <div className="p-4 bg-[#0a0a0a] border border-[#ffffff0a] rounded-xl flex items-start gap-3">
                <Lightbulb size={18} className="text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">AI Generated SaaS Idea</h4>
                  <p className="text-white text-sm font-medium">{prob.idea}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </main>

      {/* Mobile Bottom Navigation (Hidden on Desktop) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#000]/90 backdrop-blur-xl border-t border-[#ffffff10] px-6 py-4 flex justify-between items-center z-50">
        <Home size={22} className="text-white" />
        <Lightbulb size={22} className="text-neutral-500 hover:text-white transition" />
        <Search size={22} className="text-neutral-500 hover:text-white transition" />
        <Settings size={22} className="text-neutral-500 hover:text-white transition" />
      </nav>

    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${active ? 'bg-[#ffffff10] text-white' : 'text-neutral-400 hover:bg-[#ffffff05] hover:text-neutral-200'}`}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
      {active && <div className="ml-auto w-1 h-1 rounded-full bg-white shadow-[0_0_8px_white]"></div>}
    </div>
  );
}
