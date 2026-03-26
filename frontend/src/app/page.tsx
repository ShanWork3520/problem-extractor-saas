import Sidebar from "@/components/Sidebar";
import FeedTabs from "@/components/FeedTabs";
import FeedCard from "@/components/FeedCard";
import TrendingPanel from "@/components/TrendingPanel";
import MobileNav from "@/components/MobileNav";
import { Flame } from "lucide-react";

const problems = [
  {
    source: "r/SaaS",
    sourceIcon: "🔴",
    timestamp: "2h ago",
    text: "I am literally losing my mind manually mapping JSON webhooks in Zapier and paying \$100/mo for basic logic that should take 5 lines of code. Every time I add a new integration, I have to rebuild from scratch.",
    painScore: 9,
    viability: "High" as const,
    aiIdea: "Build a lightweight, developer-first webhook router with visual JSON mapping — charge \$15/mo for unlimited flows. Target frustrated Zapier power users migrating away from no-code.",
  },
  {
    source: "HackerNews",
    sourceIcon: "🟠",
    timestamp: "4h ago",
    text: "It's 2026 and we still don't have a reliable automated code reviewer that actually catches security flaws before merge. Every tool I've tried either flags everything or misses the dangerous stuff entirely.",
    painScore: 8,
    viability: "Medium" as const,
    aiIdea: "An AI PR reviewer fine-tuned specifically on CVE databases and OWASP patterns. Focus on security-only reviews rather than style/linting. Sell to security-conscious startups as a GitHub App.",
  },
  {
    source: "Product Hunt",
    sourceIcon: "🟤",
    timestamp: "5h ago",
    text: "Why is wrapping a simple React app into a desktop app still so incredibly tedious? I just want to ship on Mac, Windows, and Linux without learning 3 different build systems.",
    painScore: 7,
    viability: "High" as const,
    aiIdea: "One-click cross-platform desktop wrapper for web apps. Drop in your URL or build folder, choose platforms, and get signed installers in 2 minutes. Freemium with paid code-signing.",
  },
  {
    source: "r/Entrepreneur",
    sourceIcon: "🔴",
    timestamp: "6h ago",
    text: "Spent 3 weeks trying to set up a proper invoicing system for my freelance clients. QuickBooks is overkill, Wave shut down, and everything else charges per invoice. I just need something dead simple.",
    painScore: 8,
    viability: "High" as const,
    aiIdea: "Ultra-minimal invoicing SaaS for solo freelancers: create invoice in 30 seconds, send via link, get paid via Stripe. Free up to 10 invoices/mo, \$9/mo unlimited.",
  },
  {
    source: "Quora",
    sourceIcon: "🔵",
    timestamp: "7h ago",
    text: "Is there any tool that can automatically monitor my competitors' pricing pages and alert me when they change their plans? I'm tired of manually checking 15 websites every week.",
    painScore: 7,
    viability: "High" as const,
    aiIdea: "Competitive pricing intelligence bot: monitor unlimited competitor pricing pages via DOM diffing, send Slack/email alerts on any change. \$29/mo for startups.",
  },
  {
    source: "Indie Hackers",
    sourceIcon: "🟢",
    timestamp: "9h ago",
    text: "I run a small newsletter with 5k subscribers and ConvertKit charges me \$79/mo. I don't need automations or landing pages. I literally just need to send one email per week to my list.",
    painScore: 6,
    viability: "Medium" as const,
    aiIdea: "Barebones newsletter tool for creators who only send weekly dispatches. No automations, no funnels — just compose, send, done. Free up to 5k subs, \$5/mo after.",
  },
  {
    source: "Google Play",
    sourceIcon: "🟣",
    timestamp: "11h ago",
    text: "This expense tracker app crashes every time I try to export my data to CSV. I've been using it for 2 years and now all my financial data is basically trapped inside this broken app.",
    painScore: 9,
    viability: "Medium" as const,
    aiIdea: "Data liberation SaaS: connect any app account, automatically export and back up all your data to your own cloud storage in standard formats. Insurance against vendor lock-in.",
  },
  {
    source: "r/webdev",
    sourceIcon: "🔴",
    timestamp: "12h ago",
    text: "Client asked me to add a simple contact form to their WordPress site. 4 hours later I'm debugging PHP mail functions, dealing with spam, and fighting with SMTP plugins. This should not be this hard.",
    painScore: 7,
    viability: "High" as const,
    aiIdea: "Drop-in form backend API: paste a single script tag, get a working contact form with spam filtering, email delivery, and a submission dashboard. Free tier for 100 submissions/mo.",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-[#f5f5f5]">
      <Sidebar />
      <TrendingPanel />
      <MobileNav />

      {/* Main Feed Column */}
      <main className="lg:ml-[220px] xl:mr-[300px] min-h-screen border-x border-[rgba(255,255,255,0.04)]">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.04)] sticky top-0 bg-black/80 backdrop-blur-xl z-30">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
              <Flame size={14} className="text-black" />
            </div>
          </div>
          <span className="text-[16px] font-bold">Problem Extractor</span>
          <div className="w-7 h-7 rounded-full bg-[#222] flex items-center justify-center text-[11px] font-bold">S</div>
        </header>

        <FeedTabs />

        {/* Feed */}
        <div className="pb-24 lg:pb-0">
          {problems.map((p, i) => (
            <FeedCard key={i} {...p} />
          ))}
        </div>
      </main>
    </div>
  );
}
