"use server";

import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { notificationEmail, subscriberEmail } from "../emails/waitlist";

// TODO: switch on once the real mailing address is in emails/waitlist.ts
// (required under CASL).
const SEND_SUBSCRIBER_EMAIL = false;

type SubscribeState = {
  success: boolean;
  error: string | null;
};

export async function subscribe(
  _prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
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

    await Promise.all([
      transporter.sendMail({
        from: `"cazlae" <${process.env.ZOHO_EMAIL}>`,
        to: process.env.ZOHO_EMAIL,
        ...notificationEmail(email),
      }),
      fetch("https://script.google.com/macros/s/AKfycbw2mV9OJxG9BKdhIhgwYtgJ_KctJVxxRPfK_EWRDAczi5T7hi-iW_veuL5MqWhPaD84Sg/exec", {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
    ]);

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
