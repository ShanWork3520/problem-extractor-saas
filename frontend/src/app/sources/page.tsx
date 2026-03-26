import PageShell from "@/components/PageShell";
import PlatformIcon from "@/components/PlatformIcon";
import { CheckCircle, XCircle } from "lucide-react";

const sources = [
  { platform: "reddit", name: "Reddit", method: "RSS Feed", status: true, subs: "r/SaaS, r/Entrepreneur, +6 more" },
  { platform: "hackernews", name: "Hacker News", method: "Firebase API", status: true, subs: "Top Stories" },
  { platform: "producthunt", name: "Product Hunt", method: "Web Scrape", status: true, subs: "Homepage Trending" },
  { platform: "quora", name: "Quora", method: "Coming Soon", status: false, subs: "—" },
  { platform: "indiehackers", name: "Indie Hackers", method: "Coming Soon", status: false, subs: "—" },
  { platform: "googleplay", name: "Google Play", method: "Coming Soon", status: false, subs: "—" },
];

export default function SourcesPage() {
  return (
    <PageShell title="Sources" subtitle="Platforms being scraped for user complaints.">
      <div className="divide-y divide-[rgba(255,255,255,0.04)]">
        {sources.map((s, i) => (
          <div key={i} className="flex items-center gap-4 px-4 sm:px-6 py-4 hover:bg-[#080808] transition-colors">
            <PlatformIcon platform={s.platform} size={28} />
            <div className="flex-1">
              <h3 className="text-[14px] font-semibold text-white">{s.name}</h3>
              <p className="text-[12px] text-[#666]">{s.method} · {s.subs}</p>
            </div>
            {s.status
              ? <span className="flex items-center gap-1 text-[12px] text-emerald-400"><CheckCircle size={14} /> Active</span>
              : <span className="flex items-center gap-1 text-[12px] text-[#555]"><XCircle size={14} /> Pending</span>
            }
          </div>
        ))}
      </div>
    </PageShell>
  );
}
