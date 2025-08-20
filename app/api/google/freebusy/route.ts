import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { access_token, calendarIds, timeMin, timeMax } = await req.json();
  const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: { "Authorization": `Bearer ${access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ timeMin, timeMax, items: calendarIds.map((id:string)=>({ id })) })
  });
  const data = await res.json();
  return NextResponse.json(data);
}
