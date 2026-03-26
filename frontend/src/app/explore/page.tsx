import PageShell from "@/components/PageShell";
import { Globe, TrendingUp, Users, Code, DollarSign, Headphones, ShoppingCart, Mail } from "lucide-react";

const categories = [
  { icon: Code, label: "Developer Tools", count: 847, color: "text-blue-400" },
  { icon: DollarSign, label: "Billing & Payments", count: 632, color: "text-emerald-400" },
  { icon: Users, label: "Team Collaboration", count: 519, color: "text-purple-400" },
  { icon: Headphones, label: "Customer Support", count: 411, color: "text-amber-400" },
  { icon: ShoppingCart, label: "E-Commerce", count: 388, color: "text-pink-400" },
  { icon: Mail, label: "Email & Marketing", count: 356, color: "text-red-400" },
  { icon: Globe, label: "Web Hosting", count: 298, color: "text-cyan-400" },
  { icon: TrendingUp, label: "Analytics & Data", count: 245, color: "text-orange-400" },
];

export default function ExplorePage() {
  return (
    <PageShell title="Explore" subtitle="Browse pain points by category across all platforms.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 sm:p-6">
        {categories.map((cat, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-xl hover:border-[rgba(255,255,255,0.12)] transition-colors cursor-pointer">
            <div className={`p-2.5 rounded-lg bg-[#111] ${cat.color}`}><cat.icon size={20} /></div>
            <div className="flex-1">
              <h3 className="text-[14px] font-semibold text-white">{cat.label}</h3>
              <p className="text-[12px] text-[#666]">{cat.count} complaints found</p>
            </div>
            <TrendingUp size={14} className="text-[#333]" />
          </div>
        ))}
      </div>
    </PageShell>
  );
}
