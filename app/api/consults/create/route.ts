/lib/supabase.ts
/lib/matching.ts
/lib/slots.ts
/components/TherapistOnboardingForm.tsx
/components/ClientIntakeForm.tsx
/components/TherapistCard.tsx
/app/page.tsx
/app/therapist/onboard/page.tsx
/app/client/intake/page.tsx
/app/therapists/[id]/page.tsx
/app/api/match/route.ts
/app/api/slots/route.ts
/app/api/google/freebusy/route.ts
/app/api/google/book/route.ts
/app/api/consults/create/route.ts
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
