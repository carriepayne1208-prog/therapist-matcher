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
// /components/ClientIntakeForm.tsx
"use client";
import { useState } from "react";

export default function ClientIntakeForm() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const f = new FormData(e.currentTarget);
    const payload = {
      state: String(f.get("state") || "MA"),
      telehealth: true,
      concerns: [String(f.get("concern") || "sexual_trauma")],
      modality_prefs: [String(f.get("modality") || "EMDR")],
      budget_min: Number(f.get("budget_min") || 100),
      budget_max: Number(f.get("budget_max") || 200),
      languages: ["English"]
    };
    const res = await fetch("/api/match", { method: "POST", body: JSON.stringify(payload) });
    const data = await res.json();
    setResults(data.matches || []);
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="space-y-2 max-w-md">
        <input name="state" defaultValue="MA" className="border p-2 w-full" placeholder="Your state (e.g., MA)" />
        <input name="concern" defaultValue="sexual_trauma" className="border p-2 w-full" placeholder="Main concern" />
        <input name="modality" defaultValue="EMDR" className="border p-2 w-full" placeholder="Preferred modality" />
        <input name="budget_min" type="number" defaultValue={100} className="border p-2 w-full" placeholder="Budget min" />
        <input name="budget_max" type="number" defaultValue={200} className="border p-2 w-full" placeholder="Budget max" />
        <button className="bg-black text-white px-4 py-2">{loading ? "Finding…" : "Find matches"}</button>
      </form>

      <div className="space-y-3">
        {results.map((m:any) => (
          <a key={m.therapist.therapist_id} href={`/therapists/${m.therapist.therapist_id}`} className="block border p-3">
            <div className="font-semibold">{m.therapist.full_name || "Therapist"}</div>
            <div>Score: {m.score}</div>
            <div className="text-sm">Why: {m.reasons.join(" • ")}</div>
            <button className="mt-2 underline">See times →</button>
          </a>
        ))}
      </div>
    </div>
  );
}
