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
          setProblems(data.problems);
          setIsLive(true);
        }
      } catch {}
      setLoading(false);
    })();
  }, []);

  const platforms = useMemo(() => [...new Set(problems.map(p => p.source.startsWith("r/") ? "Reddit" : p.source))], [problems]);

  const filtered = useMemo(() => {
    let list = [...problems];
    if (platformFilter) {
      list = list.filter(p =>
        platformFilter === "Reddit" ? p.platform === "reddit" : p.source === platformFilter
      );
    }
    if (tab === "trending") {
      list.sort((a, b) => b.painScore - a.painScore);
    }
    return list;
  }, [problems, tab, platformFilter]);

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5]">
      <Sidebar /><TrendingPanel /><MobileNav />
      <main className="lg:ml-[220px] xl:mr-[300px] min-h-screen border-x border-[rgba(255,255,255,0.04)]">
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.04)] sticky top-0 bg-black/80 backdrop-blur-xl z-30">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center"><Flame size={14} className="text-black" /></div>
          <span className="text-[16px] font-bold">Problem Extractor</span>
          <div className="w-7 h-7 rounded-full bg-[#222] flex items-center justify-center text-[11px] font-bold">S</div>
        </header>

        <FeedTabs active={tab} onTabChange={setTab} platforms={platforms} activePlatform={platformFilter} onPlatformChange={setPlatformFilter} />

        <div className="px-4 py-2 border-b border-[rgba(255,255,255,0.04)] flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-400 shadow-[0_0_6px_rgba(34,197,94,0.5)]" : "bg-amber-400"}`} />
          <span className="text-[12px] text-[#666]">
            {loading ? "Fetching live data..." : isLive
              ? `Live — ${filtered.length} of ${problems.length} problems${platformFilter ? ` from ${platformFilter}` : ""}${tab === "trending" ? " · Sorted by pain score" : ""}`
              : "No data yet — run the scraper"}
          </span>
          {loading && <Loader2 size={12} className="text-[#666] animate-spin" />}
        </div>

        <div className="pb-24 lg:pb-0">
          {filtered.map((p, i) => (
            <FeedCard key={i} source={p.source} platform={p.platform} timestamp={p.relativeTime || "recently"}
              text={p.text} painScore={p.painScore} viability={p.viability} aiIdea={p.aiIdea} url={p.url} />
          ))}
          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-[#444]">
              <p className="text-[14px]">No problems match this filter.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
