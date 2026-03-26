#!/usr/bin/env python3
"""
Problem Extractor — Autonomous Scraping Engine
Scrapes old.reddit.com and HackerNews for user complaints,
then uses Groq LLaMA to score pain and generate SaaS ideas.
"""

import json
import os
import time
import requests
from datetime import datetime
from pathlib import Path

HEADERS = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

SUBREDDITS = [
    "SaaS", "Entrepreneur", "smallbusiness", "startups",
    "webdev", "selfhosted", "freelance", "digitalnomad"
]

# ─── REDDIT SCRAPER (old.reddit.com, no API key) ─────────────────────
def scrape_reddit(subreddit: str, limit: int = 25) -> list[dict]:
    """Scrape hot posts from old.reddit.com using JSON endpoint."""
    url = f"https://old.reddit.com/r/{subreddit}/hot.json?limit={limit}"
    posts = []
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        for child in data.get("data", {}).get("children", []):
            post = child.get("data", {})
            title = post.get("title", "")
            selftext = post.get("selftext", "")[:500]
            score = post.get("score", 0)
            num_comments = post.get("num_comments", 0)
            created = post.get("created_utc", 0)
            permalink = post.get("permalink", "")

            # Only grab posts with actual text content and engagement
            if len(selftext) > 50 and score > 2:
                posts.append({
                    "source": f"r/{subreddit}",
                    "platform": "reddit",
                    "title": title,
                    "text": f"{title}. {selftext}",
                    "score": score,
                    "comments": num_comments,
                    "url": f"https://reddit.com{permalink}",
                    "timestamp": datetime.utcfromtimestamp(created).isoformat() + "Z",
                })
        time.sleep(1)  # Rate limiting
    except Exception as e:
        print(f"[Reddit] Error scraping r/{subreddit}: {e}")
    return posts


# ─── HACKERNEWS SCRAPER (free API) ───────────────────────────────────
def scrape_hackernews(limit: int = 30) -> list[dict]:
    """Scrape top stories from HackerNews API."""
    posts = []
    try:
        top_ids = requests.get(
            "https://hacker-news.firebaseio.com/v0/topstories.json",
            timeout=10
        ).json()[:limit]

        for story_id in top_ids:
            try:
                story = requests.get(
                    f"https://hacker-news.firebaseio.com/v0/item/{story_id}.json",
                    timeout=10
                ).json()
                if story and story.get("type") == "story" and story.get("score", 0) > 5:
                    title = story.get("title", "")
                    text = story.get("text", "") or title
                    posts.append({
                        "source": "HackerNews",
                        "platform": "hackernews",
                        "title": title,
                        "text": text[:500],
                        "score": story.get("score", 0),
                        "comments": story.get("descendants", 0),
                        "url": story.get("url", f"https://news.ycombinator.com/item?id={story_id}"),
                        "timestamp": datetime.utcfromtimestamp(story.get("time", 0)).isoformat() + "Z",
                    })
            except Exception:
                continue
            time.sleep(0.2)
    except Exception as e:
        print(f"[HN] Error: {e}")
    return posts


# ─── GROQ AI ANALYSIS ────────────────────────────────────────────────
def analyze_with_groq(posts: list[dict]) -> list[dict]:
    """Send posts to Groq LLaMA for pain scoring and SaaS idea generation."""
    from groq import Groq

    api_key = os.environ.get("GROQ_API_KEY", "")
    if not api_key:
        # Try loading from .env file
        env_path = Path(__file__).parent / ".env"
        if env_path.exists():
            for line in env_path.read_text().splitlines():
                if line.startswith("GROQ_API_KEY="):
                    api_key = line.split("=", 1)[1].strip()

    if not api_key:
        print("[Groq] No API key found!")
        return posts

    client = Groq(api_key=api_key)
    analyzed = []

    for post in posts:
        try:
            prompt = f"""You are an expert SaaS analyst. Analyze this user complaint and respond with ONLY valid JSON:

Complaint from {post['source']}:
"{post['text'][:400]}"

Respond with exactly this JSON format, nothing else:
{{
  "painScore": <1-10 integer>,
  "viability": "<High|Medium|Low>",
  "aiIdea": "<one sentence SaaS product idea to solve this problem>"
}}"""

            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3,
                max_completion_tokens=200,
            )

            result_text = response.choices[0].message.content.strip()
            # Extract JSON from response
            start = result_text.find("{")
            end = result_text.rfind("}") + 1
            if start >= 0 and end > start:
                result = json.loads(result_text[start:end])
                post["painScore"] = min(10, max(1, int(result.get("painScore", 5))))
                post["viability"] = result.get("viability", "Medium")
                post["aiIdea"] = result.get("aiIdea", "No idea generated.")
                analyzed.append(post)

            time.sleep(0.5)  # Rate limit Groq free tier

        except Exception as e:
            print(f"[Groq] Error analyzing post: {e}")
            post["painScore"] = 5
            post["viability"] = "Medium"
            post["aiIdea"] = "Analysis pending."
            analyzed.append(post)

    return analyzed


# ─── RELATIVE TIME HELPER ────────────────────────────────────────────
def relative_time(iso_timestamp: str) -> str:
    """Convert ISO timestamp to relative time string."""
    try:
        dt = datetime.fromisoformat(iso_timestamp.replace("Z", "+00:00"))
        now = datetime.now(dt.tzinfo)
        diff = now - dt
        hours = int(diff.total_seconds() / 3600)
        if hours < 1:
            return f"{int(diff.total_seconds() / 60)}m ago"
        elif hours < 24:
            return f"{hours}h ago"
        else:
            return f"{hours // 24}d ago"
    except:
        return "recently"


# ─── MAIN PIPELINE ───────────────────────────────────────────────────
def run_pipeline():
    """Run the full scrape → analyze → save pipeline."""
    print("=" * 50)
    print("PROBLEM EXTRACTOR — AUTONOMOUS SCRAPING ENGINE")
    print("=" * 50)

    # Step 1: Scrape
    all_posts = []
    for sub in SUBREDDITS:
        print(f"[Scraping] r/{sub}...")
        posts = scrape_reddit(sub, limit=15)
        all_posts.extend(posts)
        print(f"  → Found {len(posts)} qualifying posts")

    print(f"[Scraping] HackerNews...")
    hn_posts = scrape_hackernews(limit=20)
    all_posts.extend(hn_posts)
    print(f"  → Found {len(hn_posts)} qualifying stories")

    print(f"\n[Total] {len(all_posts)} raw posts collected")

    # Step 2: Analyze with Groq AI
    print(f"\n[AI] Sending {len(all_posts)} posts to Groq LLaMA...")
    analyzed = analyze_with_groq(all_posts)
    print(f"[AI] Successfully analyzed {len(analyzed)} posts")

    # Step 3: Sort by pain score (highest first)
    analyzed.sort(key=lambda x: x.get("painScore", 0), reverse=True)

    # Step 4: Add relative timestamps
    for post in analyzed:
        post["relativeTime"] = relative_time(post.get("timestamp", ""))

    # Step 5: Save to JSON file for the frontend API
    output_path = Path(__file__).parent / "results.json"
    with open(output_path, "w") as f:
        json.dump(analyzed, f, indent=2)

    print(f"\n[Saved] {len(analyzed)} analyzed problems → {output_path}")
    print("=" * 50)

    return analyzed


if __name__ == "__main__":
    run_pipeline()
