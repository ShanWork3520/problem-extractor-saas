#!/usr/bin/env python3
"""
Problem Extractor — Autonomous Scraping Engine v2
Reddit via RSS (bypasses 403), HackerNews API, ProductHunt trending.
Groq LLaMA for AI pain scoring.
"""
import json, os, re, time, requests, xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
from html import unescape

HEADERS = {"User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"}

SUBREDDITS = ["SaaS", "Entrepreneur", "smallbusiness", "startups", "webdev", "selfhosted", "freelance", "digitalnomad"]

def clean_html(raw):
    clean = re.sub(r'<[^>]+>', ' ', unescape(raw or ''))
    return re.sub(r'\s+', ' ', clean).strip()

# ── REDDIT via RSS (bypasses 403) ──────────────────────
def scrape_reddit(subreddit, limit=20):
    url = f"https://www.reddit.com/r/{subreddit}/hot/.rss?limit={limit}"
    posts = []
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        root = ET.fromstring(resp.text)
        ns = {'atom': 'http://www.w3.org/2005/Atom'}
        for entry in root.findall('atom:entry', ns):
            title = entry.find('atom:title', ns)
            content = entry.find('atom:content', ns)
            link = entry.find('atom:link', ns)
            updated = entry.find('atom:updated', ns)
            title_text = title.text if title is not None else ""
            content_text = clean_html(content.text if content is not None else "")
            if len(content_text) > 60:
                posts.append({
                    "source": f"r/{subreddit}",
                    "platform": "reddit",
                    "title": title_text,
                    "text": f"{title_text}. {content_text[:500]}",
                    "url": link.get('href', '') if link is not None else "",
                    "timestamp": (updated.text if updated is not None else ""),
                })
        time.sleep(1)
    except Exception as e:
        print(f"[Reddit] Error r/{subreddit}: {e}")
    return posts

# ── HACKERNEWS ─────────────────────────────────────────
def scrape_hackernews(limit=30):
    posts = []
    try:
        ids = requests.get("https://hacker-news.firebaseio.com/v0/topstories.json", timeout=10).json()[:limit]
        for sid in ids:
            try:
                s = requests.get(f"https://hacker-news.firebaseio.com/v0/item/{sid}.json", timeout=10).json()
                if s and s.get("type") == "story" and s.get("score", 0) > 5:
                    title = s.get("title", "")
                    text = clean_html(s.get("text", "")) or title
                    posts.append({
                        "source": "HackerNews", "platform": "hackernews",
                        "title": title, "text": text[:500],
                        "url": s.get("url", f"https://news.ycombinator.com/item?id={sid}"),
                        "timestamp": datetime.fromtimestamp(s.get("time", 0), tz=timezone.utc).isoformat(),
                    })
            except: continue
            time.sleep(0.15)
    except Exception as e:
        print(f"[HN] Error: {e}")
    return posts

# ── PRODUCT HUNT (public page scrape) ──────────────────
def scrape_producthunt():
    posts = []
    try:
        resp = requests.get("https://www.producthunt.com", headers=HEADERS, timeout=15)
        # Extract basic product names from the page
        titles = re.findall(r'"name":"([^"]{5,80})"', resp.text)
        taglines = re.findall(r'"tagline":"([^"]{10,200})"', resp.text)
        for i, title in enumerate(titles[:10]):
            tagline = taglines[i] if i < len(taglines) else title
            posts.append({
                "source": "Product Hunt", "platform": "producthunt",
                "title": title, "text": f"{title}. {tagline}",
                "url": "https://www.producthunt.com",
                "timestamp": datetime.now(tz=timezone.utc).isoformat(),
            })
    except Exception as e:
        print(f"[PH] Error: {e}")
    return posts

# ── GROQ AI ANALYSIS ──────────────────────────────────
def analyze_with_groq(posts):
    from groq import Groq
    api_key = os.environ.get("GROQ_API_KEY", "")
    if not api_key:
        env_path = Path(__file__).parent / ".env"
        if env_path.exists():
            for line in env_path.read_text().splitlines():
                if line.startswith("GROQ_API_KEY="):
                    api_key = line.split("=", 1)[1].strip()
    if not api_key:
        print("[Groq] No API key!"); return posts

    client = Groq(api_key=api_key)
    analyzed = []
    for post in posts:
        try:
            prompt = f"""Analyze this user complaint and respond ONLY with valid JSON:
Complaint from {post['source']}: "{post['text'][:400]}"
JSON format: {{"painScore": <1-10>, "viability": "<High|Medium|Low>", "aiIdea": "<1 sentence SaaS idea>"}}"""
            r = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3, max_completion_tokens=200,
            )
            txt = r.choices[0].message.content.strip()
            start, end = txt.find("{"), txt.rfind("}") + 1
            if start >= 0 and end > start:
                res = json.loads(txt[start:end])
                post["painScore"] = min(10, max(1, int(res.get("painScore", 5))))
                post["viability"] = res.get("viability", "Medium")
                post["aiIdea"] = res.get("aiIdea", "Analysis pending.")
                analyzed.append(post)
            time.sleep(0.3)
        except Exception as e:
            print(f"[Groq] Error: {e}")
            post.update({"painScore": 5, "viability": "Medium", "aiIdea": "Analysis pending."})
            analyzed.append(post)
    return analyzed

def relative_time(ts):
    try:
        if not ts: return "recently"
        ts = ts.replace("Z", "+00:00") if "+" not in ts and "Z" in ts else ts
        dt = datetime.fromisoformat(ts)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        diff = datetime.now(tz=timezone.utc) - dt
        h = int(diff.total_seconds() / 3600)
        if h < 1: return f"{max(1, int(diff.total_seconds()/60))}m ago"
        elif h < 24: return f"{h}h ago"
        else: return f"{h//24}d ago"
    except: return "recently"

def run_pipeline():
    print("=" * 50)
    print("PROBLEM EXTRACTOR v2 — MULTI-PLATFORM SCRAPER")
    print("=" * 50)
    all_posts = []
    for sub in SUBREDDITS:
        print(f"[Scraping] r/{sub}...")
        p = scrape_reddit(sub, 15)
        all_posts.extend(p)
        print(f"  -> {len(p)} posts")
    print("[Scraping] HackerNews...")
    hn = scrape_hackernews(20)
    all_posts.extend(hn)
    print(f"  -> {len(hn)} stories")
    print("[Scraping] Product Hunt...")
    ph = scrape_producthunt()
    all_posts.extend(ph)
    print(f"  -> {len(ph)} products")
    print(f"\n[Total] {len(all_posts)} raw posts")
    print(f"[AI] Analyzing with Groq LLaMA...")
    analyzed = analyze_with_groq(all_posts)
    analyzed.sort(key=lambda x: x.get("painScore", 0), reverse=True)
    for p in analyzed:
        p["relativeTime"] = relative_time(p.get("timestamp", ""))
    out = Path(__file__).parent / "results.json"
    with open(out, "w") as f:
        json.dump(analyzed, f, indent=2)
    print(f"[Saved] {len(analyzed)} problems -> {out}")
    return analyzed

if __name__ == "__main__":
    run_pipeline()
