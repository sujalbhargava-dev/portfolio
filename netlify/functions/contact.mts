import type { Config } from "@netlify/functions";
import { createTransport } from "nodemailer";
import { db } from "../../db/index.js";
import { contactMessages } from "../../db/schema.js";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

const limits = {
  name: 120,
  email: 320,
  subject: 200,
  message: 5000,
};

const contactRecipient = "sujalbhargava2341@gmail.com";

function readText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;

  const text = value.trim();
  if (!text || text.length > maxLength) return null;

  return text;
}

async function sendGmailNotification(details: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const appPassword = Netlify.env.get("GMAIL_APP_PASSWORD");

  if (!appPassword) {
    console.warn("Gmail notification is not configured");
    return false;
  }

  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: contactRecipient,
      pass: appPassword,
    },
  });

  await transporter.sendMail({
    from: `Portfolio Contact <${contactRecipient}>`,
    to: contactRecipient,
    replyTo: {
      name: details.name,
      address: details.email,
    },
    subject: `Portfolio message: ${details.subject.replace(/[\r\n]+/g, " ")}`,
    text: [
      "A new message was submitted through your portfolio.",
      "",
      `Name: ${details.name}`,
      `Email: ${details.email}`,
      `Subject: ${details.subject}`,
      "",
      "Message:",
      details.message,
    ].join("\n"),
  });

  return true;
}

export default async (request: Request) => {
  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed." },
      { status: 405, headers: { Allow: "POST" } },
    );
  }

  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = readText(payload.name, limits.name);
  const email = readText(payload.email, limits.email);
  const subject = readText(payload.subject, limits.subject);
  const message = readText(payload.message, limits.message);

  if (!name || !email || !subject || !message) {
    return Response.json(
      { error: "All fields are required and must fit the allowed lengths." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const [savedMessage] = await db
      .insert(contactMessages)
      .values({ name, email, subject, message })
      .returning({
        id: contactMessages.id,
        createdAt: contactMessages.createdAt,
      });

    let notificationSent = false;

    try {
      notificationSent = await sendGmailNotification({
        name,
        email,
        subject,
        message,
      });
    } catch {
      console.error("Unable to send Gmail notification");
    }

    return Response.json(
      {
        success: true,
        message: "Message saved successfully!",
        submission: savedMessage,
        notificationSent,
      },
      { status: 201 },
    );
  } catch {
    console.error("Unable to save contact message");
    return Response.json(
      { error: "Failed to save message." },
      { status: 500 },
    );
  }
};

export const config: Config = {
  path: "/api/contact",
};
