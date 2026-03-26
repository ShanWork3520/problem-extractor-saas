"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import FeedTabs from "@/components/FeedTabs";
import FeedCard from "@/components/FeedCard";
import TrendingPanel from "@/components/TrendingPanel";
import MobileNav from "@/components/MobileNav";
import { Flame, Loader2 } from "lucide-react";

interface Problem {
  source: string;
  platform: string;
  title?: string;
  text: string;
  painScore: number;
  viability: "High" | "Medium" | "Low";
  aiIdea: string;
  relativeTime?: string;
  timestamp?: string;
}

const MOCK_PROBLEMS: Problem[] = [
  {
    source: "r/SaaS",
    platform: "reddit",
    text: "I am literally losing my mind manually mapping JSON webhooks in Zapier and paying $100/mo for basic logic that should take 5 lines of code. Every time I add a new integration, I have to rebuild from scratch.",
    painScore: 9, viability: "High",
    aiIdea: "Build a lightweight, developer-first webhook router with visual JSON mapping — charge $15/mo for unlimited flows.",
    relativeTime: "2h ago",
  },
  {
    source: "HackerNews",
    platform: "hackernews",
    text: "It's 2026 and we still don't have a reliable automated code reviewer that actually catches security flaws before merge. Every tool I've tried either flags everything or misses the dangerous stuff.",
    painScore: 8, viability: "Medium",
    aiIdea: "An AI PR reviewer fine-tuned on CVE databases and OWASP patterns. Focus on security-only reviews.",
    relativeTime: "4h ago",
  },
  {
    source: "Product Hunt",
    platform: "producthunt",
    text: "Why is wrapping a simple React app into a desktop app still so tedious? I just want to ship on Mac, Windows, and Linux without learning 3 different build systems.",
    painScore: 7, viability: "High",
    aiIdea: "One-click cross-platform desktop wrapper for web apps. Drop in your build folder, get signed installers in 2 minutes.",
    relativeTime: "5h ago",
  },
];

export default function Dashboard() {
  const [problems, setProblems] = useState<Problem[]>(MOCK_PROBLEMS);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function fetchProblems() {
      setLoading(true);
      try {
        const res = await fetch("/api/problems");
        const data = await res.json();
        if (data.status === "ok" && data.problems.length > 0) {
          setProblems(data.problems);
          setIsLive(true);
        }
      } catch {
        // Fall back to mock data silently
      } finally {
        setLoading(false);
      }
    }
    fetchProblems();
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5]">
      <Sidebar />
      <TrendingPanel />
      <MobileNav />

      <main className="lg:ml-[220px] xl:mr-[300px] min-h-screen border-x border-[rgba(255,255,255,0.04)]">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.04)] sticky top-0 bg-black/80 backdrop-blur-xl z-30">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
              <Flame size={14} className="text-black" />
            </div>
          </div>
          <span className="text-[16px] font-bold">Problem Extractor</span>
          <div className="w-7 h-7 rounded-full bg-[#222] flex items-center justify-center text-[11px] font-bold">S</div>
        </header>

        <FeedTabs />

        {/* Status Bar */}
        <div className="px-4 py-2 border-b border-[rgba(255,255,255,0.04)] flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-400 shadow-[0_0_6px_rgba(34,197,94,0.5)]" : "bg-amber-400"}`} />
          <span className="text-[12px] text-[#666]">
            {loading ? "Fetching live data..." : isLive ? `Live — ${problems.length} problems extracted` : `Demo mode — ${problems.length} sample problems`}
          </span>
          {loading && <Loader2 size={12} className="text-[#666] animate-spin" />}
        </div>

        {/* Feed */}
        <div className="pb-24 lg:pb-0">
          {problems.map((p, i) => (
            <FeedCard
              key={i}
              source={p.source}
              platform={p.platform}
              timestamp={p.relativeTime || "recently"}
              text={p.text}
              painScore={p.painScore}
              viability={p.viability}
              aiIdea={p.aiIdea}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
