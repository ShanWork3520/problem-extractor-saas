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
    <div className="sticky top-0 bg-black/90 backdrop-blur-xl z-20">
      <div className="flex border-b border-[rgba(255,255,255,0.04)]">
        {[
          { key: "foryou", label: "For You" },
          { key: "trending", label: "Most Discussed" },
        ].map((t) => (
          <button key={t.key} onClick={() => onTabChange(t.key)}
            className={`flex-1 py-3 text-[13px] font-medium transition-colors relative cursor-pointer ${
              active === t.key ? "text-white" : "text-[#666] hover:text-[#aaa]"}`}>
            {t.label}
            {active === t.key && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-white rounded-full" />}
          </button>
        ))}
      </div>
      {/* Platform chips */}
      <div className="flex gap-1.5 px-4 py-2 overflow-x-auto">
        {["All", ...platforms].map((p) => {
          const isActive = (p === "All" && !activePlatform) || activePlatform === p;
          return (
            <button key={p} onClick={() => onPlatformChange(p === "All" ? "" : p)}
              className={`shrink-0 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-white text-black"
                  : "bg-[#111] text-[#777] hover:bg-[#1a1a1a] hover:text-[#aaa]"}`}>
              {p}
            </button>
          );
        })}
      </div>
    </div>
  );
}
