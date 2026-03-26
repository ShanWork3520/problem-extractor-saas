"use client";
import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import FeedTabs from "@/components/FeedTabs";
import FeedCard from "@/components/FeedCard";
import TrendingPanel from "@/components/TrendingPanel";
import MobileNav from "@/components/MobileNav";
import { Flame, Loader2 } from "lucide-react";

interface Problem {
  source: string; platform: string; title?: string; text: string;
  painScore: number; viability: "High" | "Medium" | "Low";
  aiIdea: string; relativeTime?: string; url?: string;
  score?: number; comments?: number;
}

export default function Dashboard() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [tab, setTab] = useState("foryou");
  const [platformFilter, setPlatformFilter] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/problems");
        const data = await res.json();
        if (data.status === "ok" && data.problems.length > 0) {
          setProblems(data.problems); setIsLive(true);
        }
      } catch {}
      setLoading(false);
    })();
  }, []);

  const platforms = useMemo(() => [...new Set(problems.map(p => p.source.startsWith("r/") ? "Reddit" : p.source))], [problems]);

  const filtered = useMemo(() => {
    let list = [...problems];
    // Platform filter
    if (platformFilter) {
      list = list.filter(p => platformFilter === "Reddit" ? p.platform === "reddit" : p.source === platformFilter);
    }
    // Tab sort
    if (tab === "trending") {
      // Sort by user traction: upvotes + comments (engagement)
      list.sort((a, b) => ((b.score || 0) + (b.comments || 0)) - ((a.score || 0) + (a.comments || 0)));
    }
    return list;
  }, [problems, tab, platformFilter]);

  const statusText = () => {
    if (loading) return "Fetching live data...";
    if (!isLive) return "No data yet";
    const base = `${filtered.length} problems`;
    const parts = [base];
    if (platformFilter) parts.push(`from ${platformFilter}`);
    if (tab === "trending") parts.push("by engagement");
    return parts.join(" · ");
  };

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5]">
      <Sidebar /><TrendingPanel /><MobileNav />
      <main className="lg:ml-[220px] xl:mr-[300px] min-h-screen border-x border-[rgba(255,255,255,0.04)]">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.04)] sticky top-0 bg-black/80 backdrop-blur-xl z-30">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center"><Flame size={14} className="text-black" /></div>
          <span className="text-[16px] font-bold">Extractor</span>
          <div className="w-7 h-7 rounded-full bg-[#222] flex items-center justify-center text-[11px] font-bold">S</div>
        </header>

        <FeedTabs active={tab} onTabChange={setTab} platforms={platforms} activePlatform={platformFilter} onPlatformChange={setPlatformFilter} />

        {/* Status bar */}
        <div className="px-4 py-2 flex items-center gap-2 border-b border-[rgba(255,255,255,0.04)]">
          <div className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-emerald-400" : "bg-amber-400"}`} />
          <span className="text-[11px] text-[#555] tracking-wide">{statusText()}</span>
          {loading && <Loader2 size={11} className="text-[#555] animate-spin" />}
        </div>

        {/* Feed */}
        <div className="pb-24 lg:pb-0">
          {filtered.map((p, i) => (
            <FeedCard key={i} source={p.source} platform={p.platform} timestamp={p.relativeTime || "recently"}
              title={p.title} text={p.text} painScore={p.painScore} viability={p.viability}
              aiIdea={p.aiIdea} url={p.url} score={p.score} comments={p.comments} />
          ))}
          {!loading && filtered.length === 0 && (
            <p className="text-[#444] text-center py-20 text-[13px]">No problems match this filter.</p>
          )}
        </div>
      </main>
    </div>
  );
}
