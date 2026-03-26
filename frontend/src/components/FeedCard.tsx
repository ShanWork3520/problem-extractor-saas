"use client";
import React, { useState } from "react";
import { Lightbulb, Bookmark, Share2, Flame, CheckCircle, ExternalLink } from "lucide-react";
import PlatformIcon from "./PlatformIcon";

interface FeedCardProps {
  source: string;
  platform: string;
  timestamp: string;
  text: string;
  painScore: number;
  viability: "High" | "Medium" | "Low";
  aiIdea: string;
  url?: string;
}

export default function FeedCard({ source, platform, timestamp, text, painScore, viability, aiIdea, url }: FeedCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const viabilityColor = viability === "High" ? "text-emerald-400 bg-emerald-500/10" : viability === "Medium" ? "text-amber-400 bg-amber-500/10" : "text-red-400 bg-red-500/10";

  return (
    <article
      onClick={() => setExpanded(!expanded)}
      className="px-4 py-4 border-b border-[rgba(255,255,255,0.04)] hover:bg-[#080808] transition-colors duration-150 cursor-pointer select-none"
    >
      <div className="flex items-center gap-2.5 mb-2.5">
        <PlatformIcon platform={platform} size={22} />
        <span className="text-[13px] font-semibold text-[#888]">{source}</span>
        <span className="text-[12px] text-[#555]">·</span>
        <span className="text-[12px] text-[#555]">{timestamp}</span>
      </div>

      <p className="text-[15px] text-[#e8e8e8] leading-[1.55] mb-3">{text}</p>

      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="inline-flex items-center gap-1 text-[12px] font-semibold px-2.5 py-1 rounded-full bg-red-500/10 text-red-400">
          <Flame size={12} /> {painScore}/10
        </span>
        <span className={`inline-flex items-center gap-1 text-[12px] font-semibold px-2.5 py-1 rounded-full ${viabilityColor}`}>
          <CheckCircle size={12} /> {viability}
        </span>
        <div className="flex-1" />
        <button onClick={(e) => { e.stopPropagation(); setBookmarked(!bookmarked); }}
          className="p-1.5 rounded-full hover:bg-[#ffffff0f] transition-colors cursor-pointer">
          <Bookmark size={16} className={bookmarked ? "text-white fill-white" : "text-[#555]"} />
        </button>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-full hover:bg-[#ffffff0f] transition-colors cursor-pointer">
            <ExternalLink size={16} className="text-[#555]" />
          </a>
        )}
      </div>

      {/* AI Insight - auto shows on click */}
      <div className={`overflow-hidden transition-all duration-200 ${expanded ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
        <div className="p-3 bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-xl flex items-start gap-2.5">
          <Lightbulb size={14} className="text-amber-500 mt-0.5 shrink-0" />
          <div>
            <span className="text-[11px] font-bold text-[#555] uppercase tracking-wider">AI SaaS Idea</span>
            <p className="text-[13px] text-[#bbb] leading-relaxed mt-0.5">{aiIdea}</p>
          </div>
        </div>
      </div>

      {!expanded && (
        <div className="flex items-center gap-1.5 text-[12px] text-[#444] mt-1">
          <Lightbulb size={12} className="text-amber-600" />
          <span>Tap to reveal AI insight</span>
        </div>
      )}
    </article>
  );
}
