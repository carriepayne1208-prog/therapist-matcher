// /app/api/match/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAnon } from "@/lib/supabase";
import { scoreTherapist, Intake } from "@/lib/matching";

export async function POST(req: NextRequest) {
  const intake: Intake = await req.json();

  const { data: therapists, error } = await supabaseAnon
    .from("therapists").select("*");

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const scored = (therapists || [])
    .map((t:any) => ({ t, s: scoreTherapist(t, intake) }))
    .filter(x => x.s)
    .map(x => ({ therapist: x.t, score: x.s!.score, reasons: x.s!.reasons }))
    .sort((a,b)=>b.score - a.score)
    .slice(0,5);

  return NextResponse.json({ matches: scored });
}
