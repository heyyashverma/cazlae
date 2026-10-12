"use server";

import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { notificationEmail, subscriberEmail } from "../emails/waitlist";

// Off: the waitlist promises "One letter when the first collection opens.
// Nothing else." A welcome email on signup would break that promise.
const SEND_SUBSCRIBER_EMAIL = false;

type SubscribeState = {
  success: boolean;
  error: string | null;
};

export async function subscribe(
  _prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  // Honeypot: hidden from people, so only bots fill it. Pretend it worked.
  if (formData.get("company")) {
    return { success: true, error: null };
  }

  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const consent = formData.get("consent") === "on";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // Google Apps Script web app that appends the signup to the Google Sheet.
  const sheetWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!sheetWebhookUrl) {
    console.error("GOOGLE_SHEET_WEBHOOK_URL is not set");
    return { success: false, error: "Something went wrong. Please try again." };
  }

  try {
    const transportOptions: SMTPTransport.Options = {
      host: "smtp.zohocloud.ca",
      port: 465,
      secure: true,
      authMethod: "LOGIN",
      auth: {
        user: process.env.ZOHO_EMAIL!,
        pass: process.env.ZOHO_APP_PASSWORD!,
      },
    };
    const transporter = nodemailer.createTransport(transportOptions);

    // The Apps Script (google-apps-script/Code.gs) answers "duplicate" when the
    // address is already on the sheet; in that case no emails are sent again.
    const sheetResponse = await fetch(sheetWebhookUrl, {
      method: "POST",
      body: JSON.stringify({ email, consent }),
    });
    if ((await sheetResponse.text()).trim() === "duplicate") {
      return { success: true, error: null };
    }

    await transporter.sendMail({
      from: `"cazlae" <${process.env.ZOHO_EMAIL}>`,
      to: process.env.ZOHO_EMAIL,
      ...notificationEmail(email),
    });

    if (SEND_SUBSCRIBER_EMAIL) {
      // A bounce here shouldn't undo a signup that is already stored.
      await transporter
        .sendMail({
          from: `"cazlae" <${process.env.ZOHO_EMAIL}>`,
          to: email,
          ...subscriberEmail(process.env.ZOHO_EMAIL!),
        })
        .catch((err) => console.error("Subscriber email error:", err));
    }

    return { success: true, error: null };
  } catch (err) {
    console.error("Email send error:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
