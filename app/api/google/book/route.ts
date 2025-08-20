import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { access_token, calendarId = "primary", startISO, endISO, therapistEmail, clientEmail, summary, description } = await req.json();

    if (!access_token) {
      // For first tests (before OAuth), just return a fake success so you can see the flow.
      return NextResponse.json({ eventId: "fake-event", meetLink: "https://meet.google.com/fake-link" });
    }

    const event = {
      summary: summary ?? "15-minute consultation",
      description: description ?? "Intro consult via Therapist Matcher.",
      start: { dateTime: startISO },
      end: { dateTime: endISO },
      attendees: [{ email: therapistEmail }, { email: clientEmail }],
      conferenceData: { createRequest: { requestId: crypto.randomUUID() } },
    };

    const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify(event)
    });
    const data = await res.json();
    return NextResponse.json({ eventId: data.id, meetLink: data.hangoutLink });
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
