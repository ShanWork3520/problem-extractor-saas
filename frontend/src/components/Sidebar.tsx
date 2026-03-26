"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Lightbulb, Globe, BarChart3, Settings, Flame, Plus } from "lucide-react";

const nav = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Compass, label: "Explore", href: "/explore" },
  { icon: Lightbulb, label: "Ideas", href: "/ideas" },
  { icon: Globe, label: "Sources", href: "/sources" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-[220px] border-r border-[rgba(255,255,255,0.04)] bg-black z-40 px-3 py-5 justify-between">
      <div>
        <Link href="/" className="flex items-center gap-2.5 px-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <Flame size={16} className="text-black" />
          </div>
          <span className="text-[15px] font-bold text-white tracking-tight">Extractor</span>
        </Link>
        <nav className="space-y-0.5">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.label} href={item.href}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-full text-[14px] transition-all duration-150 ${
                  active ? "font-bold text-white bg-[#ffffff0f]" : "font-medium text-[#888] hover:text-white hover:bg-[#ffffff08]"
                }`}>
                <item.icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <Link href="/" className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold text-[14px] py-3 rounded-full hover:bg-neutral-200 transition-colors">
        <Plus size={18} strokeWidth={2.5} /> New Search
      </Link>
    </aside>
  );
}
