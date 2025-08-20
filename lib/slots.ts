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
// /lib/slots.ts
import { rrulestr } from "rrule";
import dayjs from "dayjs";

export type Window = { rrule: string; duration_minutes: number; timezone: string };
export type BusyBlock = { start: string; end: string }; // ISO strings

export function generateCandidateSlots(
  windows: Window[],
  horizonDays = 14
) {
  const now = dayjs();
  const until = now.add(horizonDays, "day");
  const slots: { start: string; end: string }[] = [];

  for (const w of windows) {
    const rule = rrulestr(w.rrule);
    const occ = rule.between(now.toDate(), until.toDate(), true);
    for (const o of occ) {
      const startISO = dayjs(o).toISOString();
      const endISO = dayjs(o).add(w.duration_minutes, "minute").toISOString();
      slots.push({ start: startISO, end: endISO });
    }
  }
  return slots.sort((a, b) => a.start.localeCompare(b.start));
}

export function subtractBusy(
  slots: { start: string; end: string }[],
  busy: BusyBlock[]
) {
  return slots.filter(s => {
    const sS = dayjs(s.start), sE = dayjs(s.end);
    return !busy.some(b => {
      const bS = dayjs(b.start), bE = dayjs(b.end);
      return sS.isBefore(bE) && sE.isAfter(bS);
    });
  });
}
