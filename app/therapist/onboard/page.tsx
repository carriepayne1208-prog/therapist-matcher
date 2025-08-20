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
// /app/therapist/onboard/page.tsx
import TherapistOnboardingForm from "@/components/TherapistOnboardingForm";

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Therapist Onboarding</h1>
      <TherapistOnboardingForm />
    </main>
  );
}
