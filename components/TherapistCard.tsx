"use client";
import { useEffect, useState } from "react";

export default function TherapistCard({ therapistId }:{ therapistId:string }) {
  const [slots, setSlots] = useState<{start:string; end:string}[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/slots", { method: "POST", body: JSON.stringify({ therapist_id: therapistId })});
      const data = await res.json();
      setSlots(data.slots || []);
    })();
  }, [therapistId]);

  async function book(start:string, end:string) {
    if (!email) { alert("Enter your email first."); return; }
    const body = { startISO: start, endISO: end, therapistEmail: "t1@example.com", clientEmail: email, calendarId: "primary" };
    const res = await fetch("/api/google/book", { method: "POST", body: JSON.stringify(body) });
    const data = await res.json();
    if (data.error) { alert(data.error); return; }

    await fetch("/api/consults/create", { method: "POST", body: JSON.stringify({
      therapist_id: therapistId, client_id: "client-anon",
      start_at: start, end_at: end, calendar_event_id: data.eventId, video_url: data.meetLink
    })});
    alert("Booked! Check your calendar/email.");
  }

  return (
    <div className="space-y-3">
      <input className="border p-2" placeholder="Your email to send invite" value={email} onChange={e=>setEmail(e.target.value)} />
      <div className="grid grid-cols-2 gap-2">
        {slots.length === 0 && <div>No slots in next 14 days.</div>}
        {slots.map(s => (
          <button key={s.start} onClick={()=>book(s.start, s.end)} className="border p-2">
            {new Date(s.start).toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  );
}
