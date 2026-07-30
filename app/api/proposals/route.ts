// app/api/proposals/route.ts
// Section 6.3 — Proposal Request Flow
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseServer } from '@/lib/supabase-server';

// ARCH: explicit — this route mutates live lead/proposal data and must
// never be statically cached or evaluated outside a real request.
export const dynamic = 'force-dynamic';

const budgetBands = ['under_1500','1500_3000','3000_5000','5000_10000','10000_plus','not_sure'] as const;

const proposalSchema = z.object({
  full_name: z.string().min(1).max(200),
  business_email: z.string().email(),
  company_name: z.string().min(1).max(200),
  country: z.string().min(1),
  website_url: z.string().url().optional().or(z.literal('')),
  industry: z.string().min(1),
  services_interested: z.array(z.string()).min(1),
  business_challenge: z.string().min(1).max(2000),
  primary_objective: z.string().min(1).max(1000),
  budget_band: z.enum(budgetBands),
  desired_timeline: z.string().min(1),
  project_details: z.string().max(4000).optional(),
  consent_given: z.boolean().refine((v) => v === true, 'Consent required'),
  landing_page: z.string(), referrer: z.string().optional(),
  utm_source: z.string().optional(), utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(), utm_term: z.string().optional(),
  utm_content: z.string().optional(), browser_timezone: z.string(),
  honeypot: z.string().max(0),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = proposalSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid submission', details: parsed.error.flatten() }, { status: 400 }
    );
  }
  if (parsed.data.honeypot.length > 0) {
    return NextResponse.json({ error: 'Rejected' }, { status: 400 });
  }

  const db = supabaseServer();
  const d = parsed.data;

  const { data: lead, error: leadErr } = await db.from('leads').insert({
    full_name: d.full_name, business_email: d.business_email,
    company_name: d.company_name, country: d.country, website_url: d.website_url,
    industry: d.industry, services_interested: d.services_interested,
    business_challenge: d.business_challenge, primary_objective: d.primary_objective,
    budget_band: d.budget_band, desired_timeline: d.desired_timeline,
    project_details: d.project_details, consent_given: d.consent_given,
    status: 'new', source: 'proposal_flow', landing_page: d.landing_page,
    referrer: d.referrer, utm_source: d.utm_source, utm_medium: d.utm_medium,
    utm_campaign: d.utm_campaign, utm_term: d.utm_term, utm_content: d.utm_content,
    browser_timezone: d.browser_timezone,
  }).select().single();

  if (leadErr || !lead) {
    return NextResponse.json({ error: 'Failed to save request' }, { status: 500 });
  }

  await db.from('proposal_requests').insert({
    lead_id: lead.id, requested_services: d.services_interested,
    budget_band: d.budget_band, timeline: d.desired_timeline, brief: d.project_details,
  });

  await db.from('consent_records').insert({
    session_ref: lead.id, consent_category: 'proposal_form', policy_version: 'v1',
  });

  await db.from('lead_activity').insert({
    lead_id: lead.id, action_type: 'proposal_submitted', actor: 'system',
  });

  try {
    const { sendProposalConfirmation, notifyTeamOfProposal } = await import('@/lib/notifications');
    await sendProposalConfirmation(d.business_email, d.full_name);
    await notifyTeamOfProposal(lead);
  } catch (e) {
    await db.from('notification_log').insert({
      event: 'proposal_confirmation', recipient: d.business_email,
      delivery_state: 'failed', failure_details: String(e),
    });
  }

  // Confirmation must restate 1-business-day expectation, never promise
  // a proposal before qualification — enforced in the UI copy, not here.
  return NextResponse.json({ lead_id: lead.id, status: 'received' });
}
