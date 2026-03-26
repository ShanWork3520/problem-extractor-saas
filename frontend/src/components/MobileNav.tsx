"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Lightbulb, BarChart3, User } from "lucide-react";

const tabs = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Compass, label: "Explore", href: "/explore" },
  { icon: Lightbulb, label: "Ideas", href: "/ideas" },
  { icon: BarChart3, label: "Stats", href: "/analytics" },
  { icon: User, label: "Profile", href: "/settings" },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-[rgba(255,255,255,0.06)] z-50 px-4">
      <div className="flex justify-between items-center py-2.5 max-w-md mx-auto">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link key={tab.label} href={tab.href}
              className={`flex flex-col items-center gap-0.5 p-2 transition-colors ${active ? "text-white" : "text-[#555]"}`}>
              <tab.icon size={22} strokeWidth={active ? 2.2 : 1.6} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
