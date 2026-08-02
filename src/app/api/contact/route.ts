import { NextResponse } from "next/server";
import { Resend } from "resend";

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (!name || name.length > 120) {
    return NextResponse.json(
      { error: "Please provide your name." },
      { status: 400 }
    );
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }
  if (!message || message.length < 8) {
    return NextResponse.json(
      { error: "Message should be at least 8 characters." },
      { status: 400 }
    );
  }
  if (message.length > 4000) {
    return NextResponse.json(
      { error: "Message is too long (max 4000 characters)." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    return NextResponse.json(
      {
        error:
          "Contact form is not configured yet. Set RESEND_API_KEY and CONTACT_TO_EMAIL in .env.local.",
      },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio contact · ${name}`,
      html: `
        <div style="font-family:Inter,system-ui,sans-serif;line-height:1.6;padding:24px;background:#05070D;color:#fff;">
          <h2 style="color:#60A5FA;margin:0 0 16px 0;">New message from your portfolio</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:16px 0;" />
          <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message ?? "Email failed to send." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Unexpected error.",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}