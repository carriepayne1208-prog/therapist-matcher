export type Therapist = {
  therapist_id: string;
  full_name?: string | null;
  states: string[];
  modalities: string[];
  specialties: string[];
  telehealth: boolean;
  languages: string[];
  fee_min?: number | null;
  fee_max?: number | null;
  years_experience?: number | null;
  timezone?: string | null;
};

export type Intake = {
  state: string;
  telehealth: boolean;
  concerns: string[];
  modality_prefs?: string[];
  budget_min?: number;
  budget_max?: number;
  languages?: string[];
};

export function scoreTherapist(t: Therapist, i: Intake) {
  if (!t.states?.includes(i.state)) return null;
  if (i.telehealth && !t.telehealth) return null;

  let score = 0;
  const reasons: string[] = [];

  // Concern fit (30)
  const concernOverlap = i.concerns.filter(c => t.specialties?.includes(c));
  const concernScore = Math.min(30, concernOverlap.length * 15);
  if (concernScore > 0) { score += concernScore; reasons.push(...concernOverlap); }

  // Modality (20)
  const modOverlap = (i.modality_prefs ?? []).filter(m => t.modalities?.includes(m));
  const modScore = Math.min(20, modOverlap.length * 10);
  if (modScore > 0) { score += modScore; reasons.push(...modOverlap); }

  // Budget (15)
  if (i.budget_min != null && i.budget_max != null && t.fee_min != null && t.fee_max != null) {
    const overlap = !(t.fee_max < i.budget_min || t.fee_min > i.budget_max);
    if (overlap) { score += 15; reasons.push("Budget fit"); }
  }

  // Language (10)
  if ((i.languages ?? []).some(l => t.languages?.includes(l))) {
    score += 10; reasons.push("Language match");
  }

  // Format/location (10) — simplified
  score += 10; reasons.push(i.telehealth ? "Telehealth" : "In-person");

  // Experience (5)
  if ((t.years_experience ?? 0) >= 5) { score += 5; reasons.push("5+ yrs exp"); }

  return { score, reasons };
}
