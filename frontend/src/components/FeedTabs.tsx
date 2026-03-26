"use client";
import React, { useState } from "react";

export default function FeedTabs() {
  const [active, setActive] = useState<"foryou" | "trending">("foryou");

  return (
    <div className="flex border-b border-[rgba(255,255,255,0.04)] sticky top-0 bg-black/80 backdrop-blur-xl z-20">
      <button
        onClick={() => setActive("foryou")}
        className={`flex-1 py-3.5 text-[14px] font-medium transition-colors relative cursor-pointer ${
          active === "foryou" ? "text-white" : "text-[#888] hover:text-[#bbb]"
        }`}
      >
        For You
        {active === "foryou" && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-[3px] bg-white rounded-full" />
        )}
      </button>
      <button
        onClick={() => setActive("trending")}
        className={`flex-1 py-3.5 text-[14px] font-medium transition-colors relative cursor-pointer ${
          active === "trending" ? "text-white" : "text-[#888] hover:text-[#bbb]"
        }`}
      >
        Trending
        {active === "trending" && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-[3px] bg-white rounded-full" />
        )}
      </button>
    </div>
  );
}
