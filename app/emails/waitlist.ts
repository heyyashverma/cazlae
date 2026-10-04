// Branded 600px email shell — matches "06 Email (600 wide)" in the brand Figma
// file. Table layout and inline styles only, so it survives Outlook/Gmail.
// Web fonts often fail there: serif falls back to Georgia, sans to Arial.

import { SITE_URL } from "../site";
import { WORDMARK_PNG_BASE64 } from "./wordmark";


const WORDMARK_CID = "wordmark@cazlae.com";
const attachments = [
  {
    filename: "cazlae.png",
    content: Buffer.from(WORDMARK_PNG_BASE64, "base64"),
    contentType: "image/png",
    cid: WORDMARK_CID,
  },
];

const GREEN = "#1E3328";
const IVORY = "#F5F0E8";
const STONE = "#D8CFC0";
const ESPRESSO = "#3D3935";
const INK = "#121613";

const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";
const SANS = "'Hanken Grotesk', Arial, Helvetica, sans-serif";

// TODO: replace with the full business mailing address once there is one —
// a city alone doesn't meet the CASL mailing-address requirement.
const MAILING_ADDRESS = "Toronto, Canada";
// TODO: add a Privacy link to the subscriber footer once a privacy page exists.

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Shell = {
  preheader: string;
  label: string;
  headline: string;
  /** Trusted HTML — escape any user input before passing it in. */
  bodyHtml: string;
  cta?: { label: string; href: string };
  footerHtml: string;
};

function shell({ preheader, label, headline, bodyHtml, cta, footerHtml }: Shell) {
  const button = cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px">
                <tr>
                  <td bgcolor="${GREEN}" style="background:${GREEN}">
                    <a href="${cta.href}" style="display:inline-block;padding:18px 24px;font-family:${SANS};font-size:14px;line-height:14px;font-weight:500;letter-spacing:0.04em;color:${IVORY};text-decoration:none">${cta.label}</a>
                  </td>
                </tr>
              </table>`
    : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light only">
    <meta name="supported-color-schemes" content="light only">
    <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500&family=Instrument+Serif&display=swap" rel="stylesheet">
  </head>
  <body style="margin:0;padding:0;background:${STONE}">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${STONE}" style="background:${STONE}">
      <tr>
        <td align="center" style="padding:24px 0">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="width:100%;max-width:600px;margin:0 auto">
            <tr>
              <td align="center" bgcolor="${GREEN}" style="background:${GREEN};padding:34px 24px">
                <a href="${SITE_URL}" style="text-decoration:none">
                  <img src="cid:${WORDMARK_CID}" width="71" height="28" alt="cazlae" style="display:block;border:0;font-family:${SERIF};font-size:28px;line-height:28px;letter-spacing:-0.02em;color:${IVORY}">
                </a>
              </td>
            </tr>
            <tr>
              <td bgcolor="${IVORY}" style="background:${IVORY};padding:48px 48px 44px">
                <p style="margin:0;font-family:${SANS};font-size:11px;line-height:15px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:${ESPRESSO}">${label}</p>
                <h1 style="margin:20px 0 0;font-family:${SERIF};font-size:40px;line-height:44px;font-weight:400;color:${INK}">${headline}</h1>
                <p style="margin:20px 0 0;font-family:${SANS};font-size:16px;line-height:26px;color:${ESPRESSO}">${bodyHtml}</p>
                ${button}
              </td>
            </tr>
            <tr>
              <td bgcolor="${STONE}" style="background:${STONE};padding:28px 48px;font-family:${SANS};font-size:12px;line-height:22px;color:${ESPRESSO}">
                ${footerHtml}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Sent to a new subscriber. Not switched on yet — see subscribe.ts. */
export function subscriberEmail(replyAddress: string) {
  // Interim unsubscribe: a reply to the brand inbox, handled by hand.
  const unsubscribeUrl = `mailto:${replyAddress}?subject=Unsubscribe`;
  const subject = "The first drop is almost here.";
  const body =
    "Three essentials in cotton. You’re on the list, so you’ll hear before anyone else.";
  return {
    subject,
    text: `${subject}\n\n${body}\n\nPreview the collection: ${SITE_URL}\n\nCazlae · ${MAILING_ADDRESS}\nTo unsubscribe, reply to this email with "Unsubscribe".`,
    attachments,
    html: shell({
      preheader: body,
      label: "Drop 01",
      headline: subject,
      bodyHtml: body,
      cta: { label: "Preview the collection", href: SITE_URL },
      footerHtml: `Cazlae · ${MAILING_ADDRESS}<br>
                <a href="${unsubscribeUrl}" style="color:${ESPRESSO};text-decoration:underline">Unsubscribe</a>`,
    }),
  };
}

/** Internal notification to the brand inbox. */
export function notificationEmail(email: string) {
  const safeEmail = escapeHtml(email);
  return {
    subject: "New waitlist signup — cazlae",
    text: `${email} just joined the cazlae waitlist.`,
    attachments,
    html: shell({
      preheader: `${safeEmail} just joined the cazlae waitlist.`,
      label: "Waitlist",
      headline: "New waitlist signup",
      bodyHtml: `<strong style="font-weight:500;color:${INK}">${safeEmail}</strong> just joined the cazlae waitlist.`,
      footerHtml: "Internal notification from cazlae.com",
    }),
  };
}
