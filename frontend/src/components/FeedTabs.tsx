"use client";
import React from "react";

interface FeedTabsProps {
  active: string;
  onTabChange: (tab: string) => void;
  platforms: string[];
  activePlatform: string;
  onPlatformChange: (p: string) => void;
}

export default function FeedTabs({ active, onTabChange, platforms, activePlatform, onPlatformChange }: FeedTabsProps) {
  return (
    <div className="sticky top-0 bg-black/80 backdrop-blur-xl z-20">
      {/* Main tabs */}
      <div className="flex border-b border-[rgba(255,255,255,0.04)]">
        {["foryou", "trending"].map((tab) => (
          <button key={tab} onClick={() => onTabChange(tab)}
            className={`flex-1 py-3.5 text-[14px] font-medium transition-colors relative cursor-pointer ${
              active === tab ? "text-white" : "text-[#888] hover:text-[#bbb]"}`}>
            {tab === "foryou" ? "For You" : "Trending"}
            {active === tab && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-[3px] bg-white rounded-full" />}
          </button>
        ))}
      </div>
      {/* Platform filter chips */}
      <div className="flex gap-2 px-4 py-2.5 overflow-x-auto border-b border-[rgba(255,255,255,0.04)]">
        {["All", ...platforms].map((p) => (
          <button key={p} onClick={() => onPlatformChange(p === "All" ? "" : p)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer border ${
              (p === "All" && !activePlatform) || activePlatform === p
                ? "bg-white text-black border-white"
                : "bg-transparent text-[#888] border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]"}`}>
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
