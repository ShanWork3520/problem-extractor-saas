"use client";
import React from "react";
import { Home, Compass, Lightbulb, BarChart3, User } from "lucide-react";

const tabs = [
  { icon: Home, label: "Home", active: true },
  { icon: Compass, label: "Explore" },
  { icon: Lightbulb, label: "Ideas" },
  { icon: BarChart3, label: "Stats" },
  { icon: User, label: "Profile" },
];

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-[rgba(255,255,255,0.06)] z-50 px-4 safe-bottom">
      <div className="flex justify-between items-center py-2.5 max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`flex flex-col items-center gap-0.5 p-2 cursor-pointer transition-colors ${
              tab.active ? "text-white" : "text-[#555] active:text-white"
            }`}
          >
            <tab.icon size={22} strokeWidth={tab.active ? 2.2 : 1.6} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
