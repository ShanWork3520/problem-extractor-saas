"use client";
import React from "react";

interface PlatformIconProps {
  platform: string;
  size?: number;
}

export default function PlatformIcon({ platform, size = 20 }: PlatformIconProps) {
  const s = size;

  switch (platform) {
    case "reddit":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#FF4500" />
          <path d="M19.5 12a1.5 1.5 0 0 0-2.55-1.07 7.36 7.36 0 0 0-4-1.15l.68-3.19 2.2.47a1.07 1.07 0 1 0 .11-.52l-2.46-.52a.27.27 0 0 0-.32.2l-.76 3.56a7.4 7.4 0 0 0-4.08 1.15A1.5 1.5 0 1 0 6.2 13a3 3 0 0 0 0 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a3 3 0 0 0 0-.44A1.5 1.5 0 0 0 19.5 12zM9 13.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5.64 2.72a3.76 3.76 0 0 1-2.61.73 3.76 3.76 0 0 1-2.61-.73.18.18 0 0 1 .26-.26 3.38 3.38 0 0 0 2.35.65 3.38 3.38 0 0 0 2.35-.65.18.18 0 0 1 .26.26zM14 14.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill="#fff"/>
        </svg>
      );
    case "hackernews":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#FF6600" />
          <text x="12" y="17" textAnchor="middle" fill="#fff" fontFamily="Arial" fontWeight="bold" fontSize="14">Y</text>
        </svg>
      );
    case "producthunt":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#DA552F" />
          <path d="M13.5 7H10v10h2v-3h1.5a3.5 3.5 0 1 0 0-7zm0 5H12V9h1.5a1.5 1.5 0 0 1 0 3z" fill="#fff"/>
        </svg>
      );
    case "quora":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#B92B27" />
          <text x="12" y="17" textAnchor="middle" fill="#fff" fontFamily="Georgia, serif" fontWeight="bold" fontSize="15">Q</text>
        </svg>
      );
    case "indiehackers":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#1F6BFF" />
          <text x="12" y="17" textAnchor="middle" fill="#fff" fontFamily="Arial" fontWeight="bold" fontSize="13">IH</text>
        </svg>
      );
    case "googleplay":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#414141" />
          <path d="M5 3l8.5 9L5 21V3z" fill="#4CAF50"/>
          <path d="M5 3l11 6.5-2.5 2.5L5 3z" fill="#F44336"/>
          <path d="M5 21l8.5-9L16 14.5 5 21z" fill="#2196F3"/>
          <path d="M16 9.5L19 12l-3 2.5-2.5-2.5L16 9.5z" fill="#FFC107"/>
        </svg>
      );
    default:
      return (
        <div className="w-5 h-5 rounded-full bg-[#333] flex items-center justify-center text-[10px] font-bold text-white">?</div>
      );
  }
}
