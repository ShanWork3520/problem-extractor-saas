"use client";
import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import { Lightbulb, Flame, CheckCircle, ExternalLink } from "lucide-react";

interface Idea { source: string; painScore: number; viability: string; aiIdea: string; url?: string; }

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/problems");
        const data = await res.json();
        if (data.status === "ok") {
          setIdeas(data.problems.filter((p: Idea) => p.painScore >= 7).sort((a: Idea, b: Idea) => b.painScore - a.painScore));
        }
      } catch {}
    })();
  }, []);

  return (
    <PageShell title="Top Ideas" subtitle="Highest-scoring SaaS opportunities from AI analysis.">
      <div className="divide-y divide-[rgba(255,255,255,0.04)]">
        {ideas.map((idea, i) => (
          <div key={i} className="px-4 sm:px-6 py-4 hover:bg-[#080808] transition-colors">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-2 rounded-lg bg-amber-500/10"><Lightbulb size={16} className="text-amber-400" /></div>
              <div className="flex-1">
                <p className="text-[14px] text-white leading-relaxed mb-2">{idea.aiIdea}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] text-[#666]">From {idea.source}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400">
                    <Flame size={10} /> {idea.painScore}/10
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                    <CheckCircle size={10} /> {idea.viability}
                  </span>
                  {idea.url && <a href={idea.url} target="_blank" rel="noopener noreferrer" className="text-[#444] hover:text-white"><ExternalLink size={12} /></a>}
                </div>
              </div>
            </div>
          </div>
        ))}
        {ideas.length === 0 && <p className="text-[#444] text-center py-16 text-[14px]">Run the scraper to generate ideas.</p>}
      </div>
    </PageShell>
  );
}
