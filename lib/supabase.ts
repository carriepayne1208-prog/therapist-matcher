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
// /lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
export const supabaseAnon = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
