// /app/api/slots/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAnon } from "@/lib/supabase";
import { generateCandidateSlots, subtractBusy } from "@/lib/slots";

export async function POST(req: NextRequest) {
  const { therapist_id } = await req.json();

  // 1) pull consult windows
  const { data: windows } = await supabaseAnon
    .from("consult_windows").select("rrule,duration_minutes,timezone")
    .eq("therapist_id", therapist_id).eq("active", true);

  if (!windows || windows.length === 0) return NextResponse.json({ slots: [] });

  // 2) generate candidate slots
  const candidates = generateCandidateSlots(windows as any, 14);

  // 3) get busy blocks from Google (for now, assume none; you’ll wire OAuth later)
  const busy: {start:string; end:string}[] = [];

  // 4) subtract busy
  const available = subtractBusy(candidates, busy).slice(0, 20);
  return NextResponse.json({ slots: available });
}
