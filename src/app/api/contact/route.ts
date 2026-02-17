import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Missing RESEND_API_KEY on server." },
        { status: 500 }
      );
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json().catch(() => null);
    const name = (body?.name ?? "").trim();
    const email = (body?.email ?? "").trim();
    const organization = (body?.organization ?? "").trim();
    const message = (body?.message ?? "").trim();

    const companyWebsite = (body?.companyWebsite ?? "").trim();
    if (companyWebsite) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !organization || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email, organization, and message are required." },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { ok: false, error: "Message is too long." },
        { status: 400 }
      );
    }

    const to = "jason@milemend.com";

    const from =
      process.env.CONTACT_FROM_EMAIL || "Milemend <onboarding@resend.dev>";

    const subject = `Website contact — ${name}${organization ? ` (${organization})` : ""}`;

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      organization ? `Organization: ${organization}` : null,
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="font-family: ui-sans-serif, system-ui; line-height: 1.5;">
        <h2>New website contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${organization ? `<p><strong>Organization:</strong> ${escapeHtml(organization)}</p>` : ""}
        <hr />
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap;">${escapeHtml(message)}</pre>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Email failed to send." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error." },
      { status: 500 }
    );
  }
}

// Minimal HTML escape to avoid injection in the email body
function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
