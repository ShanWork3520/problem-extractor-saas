"use client";
import React, { useState } from "react";
import { Lightbulb, Bookmark, Flame, CheckCircle, ExternalLink, MessageCircle, ArrowUp } from "lucide-react";
import PlatformIcon from "./PlatformIcon";

interface FeedCardProps {
  source: string;
  platform: string;
  timestamp: string;
  title?: string;
  text: string;
  painScore: number;
  viability: "High" | "Medium" | "Low";
  aiIdea: string;
  url?: string;
  score?: number;
  comments?: number;
}

export default function FeedCard({ source, platform, timestamp, title, text, painScore, viability, aiIdea, url, score, comments }: FeedCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const viabilityColor = viability === "High"
    ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    : viability === "Medium"
    ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
    : "text-red-400 bg-red-500/10 border-red-500/20";

  // Show title if different from text, truncate body text
  const displayTitle = title && !text.startsWith(title) ? title : null;
  const bodyText = text.length > 180 ? text.slice(0, 180).trim() + "…" : text;

  return (
    <article
      onClick={() => setExpanded(!expanded)}
      className="group px-4 py-3.5 border-b border-[rgba(255,255,255,0.04)] hover:bg-[#060606] transition-colors duration-100 cursor-pointer"
    >
      {/* Top row: icon + source + time + engagement */}
      <div className="flex items-center gap-2 mb-2">
        <PlatformIcon platform={platform} size={18} />
        <span className="text-[13px] font-medium text-[#777]">{source}</span>
        <span className="text-[11px] text-[#444]">·</span>
        <span className="text-[11px] text-[#444]">{timestamp}</span>
        <div className="flex-1" />
        {score && score > 0 ? (
          <span className="flex items-center gap-0.5 text-[11px] text-[#555]">
            <ArrowUp size={11} /> {score}
          </span>
        ) : null}
        {comments && comments > 0 ? (
          <span className="flex items-center gap-0.5 text-[11px] text-[#555] ml-2">
            <MessageCircle size={11} /> {comments}
          </span>
        ) : null}
      </div>

      {/* Title (if exists) */}
      {displayTitle && (
        <h3 className="text-[15px] font-semibold text-white mb-1 leading-snug">{displayTitle}</h3>
      )}

      {/* Body — compact, truncated */}
      <p className="text-[14px] text-[#b0b0b0] leading-[1.5] mb-2.5">
        {expanded ? text : bodyText}
      </p>

      {/* Tags row */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-[3px] rounded-md bg-red-500/8 text-red-400 border border-red-500/15">
          <Flame size={10} /> {painScore}/10
        </span>
        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-[3px] rounded-md border ${viabilityColor}`}>
          <CheckCircle size={10} /> {viability}
        </span>
        <div className="flex-1" />
        <button onClick={(e) => { e.stopPropagation(); setBookmarked(!bookmarked); }}
          className="p-1 rounded hover:bg-[#ffffff0a] transition-colors cursor-pointer opacity-0 group-hover:opacity-100">
          <Bookmark size={14} className={bookmarked ? "text-white fill-white" : "text-[#444]"} />
        </button>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
            className="p-1 rounded hover:bg-[#ffffff0a] transition-colors cursor-pointer opacity-0 group-hover:opacity-100">
            <ExternalLink size={14} className="text-[#444]" />
          </a>
        )}
      </div>

      {/* AI Insight — expand on click */}
      <div className={`overflow-hidden transition-all duration-200 ease-out ${expanded ? "max-h-32 opacity-100 mt-2.5" : "max-h-0 opacity-0"}`}>
        <div className="p-2.5 bg-[#080808] border border-[rgba(255,255,255,0.06)] rounded-lg flex items-start gap-2">
          <Lightbulb size={13} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-[12px] text-[#999] leading-relaxed">{aiIdea}</p>
        </div>
      </div>
    </article>
  );
}
