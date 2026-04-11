"use server";

import nodemailer from "nodemailer";

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
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        type: "LOGIN",
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"cazlae" <${process.env.ZOHO_EMAIL}>`,
      to: process.env.ZOHO_EMAIL,
      subject: "New waitlist signup — cazlae",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
          <h2 style="font-size:16px;font-weight:600;margin-bottom:8px">New waitlist signup</h2>
          <p style="font-size:14px;color:#555;margin:0">
            <strong>${email}</strong> just joined the cazlae waitlist.
          </p>
        </div>
      `,
    });

    return { success: true, error: null };
  } catch (err) {
    console.error("Email send error:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
