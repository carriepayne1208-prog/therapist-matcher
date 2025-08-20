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
export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Therapist Matcher (MVP)</h1>
      <p>Home is live.</p>
      <p><a href="/therapist/onboard">I'm a therapist → Onboard</a></p>
      <p><a href="/client/intake">I'm a client → Find matches</a></p>
    </main>
  );
}
