import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.PROCTOR_FROM_EMAIL ?? "proctor@resend.dev";

  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "Missing RESEND_API_KEY" }, { status: 500 });
  }

  const payload = (await request.json()) as { email?: string };
  const email = payload.email ?? process.env.PROCTOR_TO_EMAIL;

  if (!email) {
    return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "Senior Partner Test: Alert Channel Check",
    text: "This is a test email from the Senior Partner. Your alert channel is active."
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
