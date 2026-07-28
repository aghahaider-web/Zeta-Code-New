// src/lib/notifications.ts
// Resend transactional email — Section 6.2, 6.3, 6.5
// All mail originates from verified ZetaCode domain sender (Section 12.2)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = 'ZetaCode <hello@zetacode.tech>';
const TEAM_EMAIL = process.env.INTERNAL_ALERT_EMAIL!;

export async function sendBookingConfirmation(
  to: string, name: string, slot: { start_utc: string; end_utc: string }
) {
  await resend.emails.send({
    from: FROM, to,
    subject: 'Your discovery call is confirmed — ZetaCode',
    html: `
      <p>Hi ${name},</p>
      <p>Your discovery call is confirmed for <strong>${slot.start_utc}</strong> (UTC).</p>
      <p>We'll be in touch with meeting details shortly. If you need to make
      any changes, reply to this email.</p>
      <p>— ZetaCode</p>
    `,
  });
}

export async function notifyTeamOfBooking(
  lead: { id: string; full_name: string; business_email: string },
  slot: { start_utc: string }
) {
  await resend.emails.send({
    from: FROM, to: TEAM_EMAIL,
    subject: `New booking: ${lead.full_name}`,
    html: `
      <p>New discovery call booked.</p>
      <p><strong>Name:</strong> ${lead.full_name}<br>
      <strong>Email:</strong> ${lead.business_email}<br>
      <strong>Slot (UTC):</strong> ${slot.start_utc}<br>
      <strong>Lead ID:</strong> ${lead.id}</p>
    `,
  });
}

export async function sendProposalConfirmation(to: string, name: string) {
  await resend.emails.send({
    from: FROM, to,
    subject: 'We received your proposal request — ZetaCode',
    html: `
      <p>Hi ${name},</p>
      <p>We've received your proposal request and will respond within
      <strong>one business day</strong>.</p>
      <p>If you need to make any corrections, reply to this email.</p>
      <p>Note: receiving this message confirms receipt only — it is not a
      proposal or commitment to a specific scope or investment.</p>
      <p>— ZetaCode</p>
    `,
  });
}

export async function notifyTeamOfProposal(
  lead: { id: string; full_name: string; business_email: string; budget_band: string | null }
) {
  await resend.emails.send({
    from: FROM, to: TEAM_EMAIL,
    subject: `New proposal request: ${lead.full_name}`,
    html: `
      <p>New proposal request received.</p>
      <p><strong>Name:</strong> ${lead.full_name}<br>
      <strong>Email:</strong> ${lead.business_email}<br>
      <strong>Budget band:</strong> ${lead.budget_band ?? 'not stated'}<br>
      <strong>Lead ID:</strong> ${lead.id}</p>
    `,
  });
}
