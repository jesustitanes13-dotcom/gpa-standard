import { NextResponse } from "next/server";
import { Resend } from "resend";

type Deadline = {
  title: string;
  date: string;
};

const daysUntil = (date: Date) => {
  const diff = date.getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.PROCTOR_FROM_EMAIL ?? "proctor@resend.dev";

  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "Missing RESEND_API_KEY" }, { status: 500 });
  }

  const payload = (await request.json()) as { email?: string; deadlines?: Deadline[] };
  const email = payload.email ?? process.env.PROCTOR_TO_EMAIL;

  if (!email || !payload.deadlines?.length) {
    return NextResponse.json({ ok: false, error: "Missing email or deadlines" }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const dueSoon = payload.deadlines.filter((deadline) => {
    const days = daysUntil(new Date(deadline.date));
    return days === 1 || days === 2 || days === 3;
  });

  if (dueSoon.length === 0) {
    return NextResponse.json({ ok: true, sent: 0 }, { status: 200 });
  }

  const subject = "Senior Partner Alert: Upcoming Deadlines";
  const body = dueSoon
    .map((deadline) => `- ${deadline.title} · ${deadline.date}`)
    .join("\n");

  const { error } = await resend.emails.send({
    from,
    to: email,
    subject,
    text: `The Senior Partner reports the following deadlines approaching in 3 days or less:\n\n${body}`
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, sent: dueSoon.length }, { status: 200 });
}
