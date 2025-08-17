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
// /app/page.tsx
export default function Home() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Therapist Matcher (MVP)</h1>
      <a className="block bg-black text-white p-3 w-64 text-center" href="/therapist/onboard">I'm a therapist → Onboard</a>
      <a className="block bg-black text-white p-3 w-64 text-center" href="/client/intake">I'm a client → Find matches</a>
    </main>
  );
}
