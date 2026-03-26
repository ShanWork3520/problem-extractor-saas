"use client";
import React, { useState } from "react";
import { Lightbulb, Bookmark, Share2, ChevronDown, ChevronUp, Flame, CheckCircle } from "lucide-react";

interface FeedCardProps {
  source: string;
  sourceIcon: string;
  timestamp: string;
  text: string;
  painScore: number;
  viability: "High" | "Medium" | "Low";
  aiIdea: string;
}

export default function FeedCard({ source, sourceIcon, timestamp, text, painScore, viability, aiIdea }: FeedCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const viabilityColor = viability === "High" ? "text-emerald-400 bg-emerald-500/10" : viability === "Medium" ? "text-amber-400 bg-amber-500/10" : "text-red-400 bg-red-500/10";

  return (
    <article className="px-4 py-4 border-b border-[rgba(255,255,255,0.04)] hover:bg-[#080808] transition-colors duration-150 cursor-pointer">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-[16px]">{sourceIcon}</span>
        <span className="text-[13px] font-semibold text-[#888]">{source}</span>
        <span className="text-[12px] text-[#555]">·</span>
        <span className="text-[12px] text-[#555]">{timestamp}</span>
      </div>

      {/* Body */}
      <p className="text-[15px] text-[#e8e8e8] leading-[1.55] mb-3">
        {text}
      </p>

      {/* Metrics Row */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="inline-flex items-center gap-1 text-[12px] font-semibold px-2.5 py-1 rounded-full bg-red-500/10 text-red-400">
          <Flame size={12} /> {painScore}/10
        </span>
        <span className={`inline-flex items-center gap-1 text-[12px] font-semibold px-2.5 py-1 rounded-full ${viabilityColor}`}>
          <CheckCircle size={12} /> {viability}
        </span>
        <div className="flex-1" />
        <button
          onClick={(e) => { e.stopPropagation(); setBookmarked(!bookmarked); }}
          className="p-1.5 rounded-full hover:bg-[#ffffff0f] transition-colors cursor-pointer"
        >
          <Bookmark size={16} className={bookmarked ? "text-white fill-white" : "text-[#555]"} />
        </button>
        <button className="p-1.5 rounded-full hover:bg-[#ffffff0f] transition-colors cursor-pointer">
          <Share2 size={16} className="text-[#555]" />
        </button>
      </div>

      {/* AI Insight Toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
        className="flex items-center gap-1.5 text-[12px] text-[#666] hover:text-[#aaa] transition-colors mt-1 cursor-pointer"
      >
        <Lightbulb size={13} className="text-amber-500" />
        <span className="font-medium">AI Insight</span>
        {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>

      {expanded && (
        <div className="mt-2.5 ml-5 p-3 bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-xl">
          <p className="text-[13px] text-[#bbb] leading-relaxed">{aiIdea}</p>
        </div>
      )}
    </article>
  );
}
