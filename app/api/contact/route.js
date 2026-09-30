import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  // Honeypot: real visitors never fill this hidden field, bots often do.
  if (body.company) return Response.json({ ok: true });

  if (!name || !email || !message) {
    return Response.json({ error: "Please fill in all fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return Response.json({ error: "Your message is too long." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL,
    replyTo: email, // hitting Reply in Gmail goes straight to the visitor
    subject: `Portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><b>Name:</b> ${escapeHtml(name)}<br><b>Email:</b> ${escapeHtml(email)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Couldn't send your message. Please try again." }, { status: 500 });
  }
  return Response.json({ ok: true });
}