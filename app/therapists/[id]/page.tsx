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
