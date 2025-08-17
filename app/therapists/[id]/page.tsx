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
// /app/therapists/[id]/page.tsx
import TherapistCard from "@/components/TherapistCard";

export default function Page({ params }:{ params:{ id:string }}) {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Therapist</h1>
      <p>Therapist ID: {params.id}</p>
      <h2 className="font-semibold">Available 15-min consults</h2>
      <TherapistCard therapistId={params.id} />
    </main>
  );
}
