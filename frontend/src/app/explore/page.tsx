"use client";
import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import PlatformIcon from "@/components/PlatformIcon";
import FeedCard from "@/components/FeedCard";
import { Globe, ArrowLeft, TrendingUp, Flame } from "lucide-react";

interface Problem {
  source: string; platform: string; text: string;
  painScore: number; viability: "High" | "Medium" | "Low";
  aiIdea: string; relativeTime?: string; url?: string;
}

const platformGroups = [
  { key: "reddit", label: "Reddit", desc: "Complaints from r/SaaS, r/Entrepreneur, r/webdev and more" },
  { key: "hackernews", label: "Hacker News", desc: "Pain points from the top HN stories and discussions" },
  { key: "producthunt", label: "Product Hunt", desc: "Frustrations from Product Hunt trending products" },
  { key: "quora", label: "Quora", desc: "Coming soon — user questions revealing software needs" },
  { key: "indiehackers", label: "Indie Hackers", desc: "Coming soon — solo founder struggles and wishes" },
  { key: "googleplay", label: "Google Play", desc: "Coming soon — app store review complaints" },
];

export default function ExplorePage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/problems");
        const data = await res.json();
        if (data.status === "ok") setProblems(data.problems);
      } catch {}
    })();
  }, []);

  const filtered = selected ? problems.filter(p => p.platform === selected) : [];
  const countByPlatform = (key: string) => problems.filter(p => p.platform === key).length;

  if (selected) {
    const group = platformGroups.find(g => g.key === selected);
    return (
      <PageShell title={group?.label || "Explore"} subtitle={group?.desc || ""}>
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 px-4 sm:px-6 py-3 text-[13px] text-[#888] hover:text-white transition-colors cursor-pointer">
          <ArrowLeft size={14} /> Back to all platforms
        </button>
        <div className="pb-24 lg:pb-0">
          {filtered.length > 0 ? filtered.map((p, i) => (
            <FeedCard key={i} source={p.source} platform={p.platform} timestamp={p.relativeTime || "recently"}
              text={p.text} painScore={p.painScore} viability={p.viability} aiIdea={p.aiIdea} url={p.url} />
          )) : (
            <p className="text-[#444] text-center py-16 text-[14px]">No data from this platform yet.</p>
          )}
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Explore" subtitle="Browse problems by platform source.">
      <div className="divide-y divide-[rgba(255,255,255,0.04)]">
        {platformGroups.map((g, i) => {
          const count = countByPlatform(g.key);
          return (
            <button key={i} onClick={() => count > 0 && setSelected(g.key)}
              className={`w-full flex items-center gap-4 px-4 sm:px-6 py-4 transition-colors text-left ${count > 0 ? "hover:bg-[#080808] cursor-pointer" : "opacity-40 cursor-not-allowed"}`}>
              <PlatformIcon platform={g.key} size={32} />
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold text-white">{g.label}</h3>
                <p className="text-[12px] text-[#666] mt-0.5">{g.desc}</p>
              </div>
              <div className="text-right">
                {count > 0 ? (
                  <>
                    <p className="text-[16px] font-bold text-white">{count}</p>
                    <p className="text-[11px] text-[#555]">problems</p>
                  </>
                ) : (
                  <span className="text-[12px] text-[#444]">Coming soon</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </PageShell>
  );
}
