// /components/TherapistOnboardingForm.tsx
"use client";
import { useState } from "react";
import { supabaseAnon } from "@/lib/supabase";

export default function TherapistOnboardingForm() {
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);

    // minimal: single-state, single-modality, single-specialty to start
    const row = {
      therapist_id: (f.get("therapist_id") as string) || crypto.randomUUID(),
      bio: f.get("bio"),
      states: [String(f.get("state"))],
      modalities: [String(f.get("modality"))],
      specialties: [String(f.get("specialty"))],
      telehealth: true,
      languages: ["English"],
      fee_min: Number(f.get("fee_min") || 120),
      fee_max: Number(f.get("fee_max") || 180),
      years_experience: Number(f.get("years") || 5),
      timezone: "America/New_York",
    };

    const { error } = await supabaseAnon.from("therapists").upsert(row);
    if (error) { setMsg(error.message); return; }

    // add a simple consult window: Mon & Wed at 12:00 and 12:15, 15-minute each
    const { error: wErr } = await supabaseAnon.from("consult_windows").insert([{
      therapist_id: row.therapist_id,
      rrule: "FREQ=WEEKLY;BYDAY=MO,WE;BYHOUR=12;BYMINUTE=0,15",
      duration_minutes: 15,
      timezone: "America/New_York"
    }]);
    if (wErr) { setMsg(wErr.message); return; }

    setMsg("Saved! Copy your Therapist ID: " + row.therapist_id);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={submit} className="space-y-2 max-w-md">
      <input name="therapist_id" placeholder="(Optional) Therapist ID" className="border p-2 w-full" />
      <input name="state" defaultValue="MA" className="border p-2 w-full" placeholder="Licensed state code (e.g., MA)" />
      <input name="modality" defaultValue="EMDR" className="border p-2 w-full" placeholder="Modality (e.g., EMDR)" />
      <input name="specialty" defaultValue="sexual_trauma" className="border p-2 w-full" placeholder="Specialty (e.g., sexual_trauma)" />
      <input name="fee_min" type="number" defaultValue={120} className="border p-2 w-full" placeholder="Fee min" />
      <input name="fee_max" type="number" defaultValue={180} className="border p-2 w-full" placeholder="Fee max" />
      <input name="years" type="number" defaultValue={5} className="border p-2 w-full" placeholder="Years experience" />
      <textarea name="bio" className="border p-2 w-full" placeholder="Short bio" />
      <button className="bg-black text-white px-4 py-2">Save therapist</button>
      <div className="text-sm">{msg}</div>
    </form>
  );
}
