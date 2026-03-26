import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const resultsPath = join(process.cwd(), "..", "backend", "results.json");

  if (!existsSync(resultsPath)) {
    return NextResponse.json({ problems: [], status: "no_data" });
  }

  try {
    const raw = readFileSync(resultsPath, "utf-8");
    const problems = JSON.parse(raw);
    return NextResponse.json({ problems, status: "ok" });
  } catch (e) {
    return NextResponse.json({ problems: [], status: "error" });
  }
}
