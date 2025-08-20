// /app/api/consults/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAnon } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const { data, error } = await supabaseAnon
    .from("consults").insert([payload]).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ consult: data });
}
