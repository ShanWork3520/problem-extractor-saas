import PageShell from "@/components/PageShell";
import { BarChart3, TrendingUp, Zap, Target } from "lucide-react";

const metrics = [
  { icon: Target, label: "Total Problems", value: "2,847", change: "+340 this week", color: "text-red-400" },
  { icon: Zap, label: "AI Ideas Generated", value: "189", change: "+42 this week", color: "text-amber-400" },
  { icon: TrendingUp, label: "High Viability", value: "67%", change: "+5% vs last week", color: "text-emerald-400" },
  { icon: BarChart3, label: "Avg Pain Score", value: "7.2", change: "+0.3 vs last week", color: "text-blue-400" },
];

export default function AnalyticsPage() {
  return (
    <PageShell title="Analytics" subtitle="Performance metrics and trend analysis.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 sm:p-6">
        {metrics.map((m, i) => (
          <div key={i} className="p-5 bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <m.icon size={16} className={m.color} />
              <span className="text-[12px] text-[#666] uppercase tracking-wider font-medium">{m.label}</span>
            </div>
            <p className={`text-[28px] font-bold ${m.color}`}>{m.value}</p>
            <p className="text-[12px] text-[#555] mt-1">{m.change}</p>
          </div>
        ))}
      </div>
      <div className="px-4 sm:px-6 py-4">
        <div className="p-5 bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-xl">
          <h3 className="text-[14px] font-bold text-white mb-4">Pain Score Distribution</h3>
          <div className="space-y-2">
            {[{s: "9-10", w: "85%", c: "bg-red-500"}, {s: "7-8", w: "65%", c: "bg-amber-500"}, {s: "5-6", w: "40%", c: "bg-yellow-500"}, {s: "1-4", w: "15%", c: "bg-emerald-500"}].map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[12px] text-[#888] w-10 text-right font-mono">{b.s}</span>
                <div className="flex-1 h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className={`h-full ${b.c} rounded-full transition-all`} style={{ width: b.w }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
