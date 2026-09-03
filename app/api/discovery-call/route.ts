import { NextRequest, NextResponse } from 'next/server';
import { saveDiscoveryLead, getDiscoveryLeads, updateLeadStatus } from '@/lib/storage';
import nodemailer from 'nodemailer';

// ─── Email Transport ─────────────────────────────────────────────────────────
// Uses Gmail SMTP. Set GMAIL_USER and GMAIL_APP_PASS in .env.local
// If env vars are missing, email is skipped gracefully (lead is still saved).
function createTransport() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });
}

function buildEmailHtml(data: {
  fullName: string;
  email: string;
  phone: string;
  brandName: string;
  category: string;
  stage: string;
  budget: string;
  preferredTimeSlot: string;
  notes: string;
  trackInterest: string;
}) {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:10px 16px;border-bottom:1px solid #F0EBE4;font-size:12px;color:#8C7B6E;text-transform:uppercase;letter-spacing:1.5px;width:160px;white-space:nowrap;">${label}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #F0EBE4;font-size:14px;color:#1A1A1A;font-weight:500;">${value}</td>
        </tr>`
      : '';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Discovery Call – ${data.brandName}</title></head>
<body style="margin:0;padding:0;background:#F5F1EA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1A1A1A 0%,#2E2E2E 100%);padding:32px 36px;">
            <p style="margin:0 0 4px 0;font-size:10px;color:#C4956A;letter-spacing:3px;text-transform:uppercase;font-weight:600;">Lal10 FashionOS</p>
            <h1 style="margin:0;font-size:24px;color:#FFFFFF;font-weight:400;line-height:1.3;">New Discovery Call Request</h1>
            <p style="margin:6px 0 0 0;font-size:13px;color:rgba(255,255,255,0.55);">Submitted on ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </td>
        </tr>

        <!-- Founder Badge -->
        <tr>
          <td style="padding:28px 36px 4px;">
            <table cellpadding="0" cellspacing="0" style="background:#FAF6F1;border:1px solid #EDE5D8;border-radius:10px;width:100%;">
              <tr>
                <td style="padding:18px 20px;">
                  <p style="margin:0 0 2px 0;font-size:18px;color:#1A1A1A;font-weight:600;">${data.fullName}</p>
                  <p style="margin:0;font-size:13px;color:#6B5D51;">${data.brandName}</p>
                </td>
                <td style="padding:18px 20px;text-align:right;vertical-align:top;">
                  <a href="mailto:${data.email}" style="font-size:13px;color:#6B1F2A;text-decoration:none;">${data.email}</a>
                  ${data.phone ? `<br/><span style="font-size:13px;color:#8C7B6E;">${data.phone}</span>` : ''}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Details Table -->
        <tr>
          <td style="padding:20px 36px 8px;">
            <p style="margin:0 0 10px 0;font-size:10.5px;color:#8C7B6E;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Lead Details</p>
            <table cellpadding="0" cellspacing="0" style="width:100%;border:1px solid #F0EBE4;border-radius:10px;overflow:hidden;border-collapse:collapse;">
              ${row('Track Interest', data.trackInterest)}
              ${row('Brand Stage', data.stage)}
              ${row('Category', data.category)}
              ${row('Budget', data.budget)}
              ${row('Preferred Time', data.preferredTimeSlot)}
            </table>
          </td>
        </tr>

        <!-- Notes -->
        ${data.notes ? `
        <tr>
          <td style="padding:8px 36px 20px;">
            <p style="margin:0 0 10px 0;font-size:10.5px;color:#8C7B6E;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Sourcing Challenge / Notes</p>
            <div style="background:#FAF6F1;border:1px solid #EDE5D8;border-radius:10px;padding:16px 20px;font-size:14px;color:#1A1A1A;line-height:1.7;">${data.notes.replace(/\n/g, '<br/>')}</div>
          </td>
        </tr>` : ''}

        <!-- CTA -->
        <tr>
          <td style="padding:8px 36px 36px;text-align:center;">
            <a href="mailto:${data.email}?subject=Re: Discovery Call – ${encodeURIComponent(data.brandName)}"
               style="display:inline-block;background:linear-gradient(135deg,#6B1F2A 0%,#8B2A38 100%);color:#FFFFFF;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:12px;letter-spacing:1.8px;text-transform:uppercase;font-weight:600;">
              Reply to ${data.fullName} →
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F5F1EA;padding:20px 36px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#A09080;">This is an automated notification from <strong>Lal10 FashionOS</strong>.<br/>Sent to alan@lal10.com</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, brandName, category, stage, budget, preferredDate, preferredTimeSlot, notes, trackInterest } = body;

    // Basic Validation
    if (!fullName || !email || !brandName) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and brand name are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Save lead to storage
    const newLead = await saveDiscoveryLead({
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone || '').trim(),
      brandName: String(brandName).trim(),
      category: category || 'General',
      stage: stage || 'Not specified',
      budget: budget || 'Not specified',
      preferredDate: preferredDate || '',
      preferredTimeSlot: preferredTimeSlot || 'To be confirmed',
      notes: notes || '',
      trackInterest: trackInterest || 'Launch Sprint',
    });

    // Send email to alan@lal10.com
    const transporter = createTransport();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"Lal10 FashionOS" <${process.env.GMAIL_USER}>`,
          to: 'alan@lal10.com',
          replyTo: String(email).trim(),
          subject: `🗓 New Discovery Call – ${String(brandName).trim()} (${String(fullName).trim()})`,
          html: buildEmailHtml({
            fullName: String(fullName).trim(),
            email: String(email).trim(),
            phone: String(phone || '').trim(),
            brandName: String(brandName).trim(),
            category: category || 'General',
            stage: stage || 'Not specified',
            budget: budget || 'Not specified',
            preferredTimeSlot: preferredTimeSlot || 'To be confirmed',
            notes: notes || '',
            trackInterest: trackInterest || 'Launch Sprint',
          }),
        });
        console.log(`[Discovery] Email sent to alan@lal10.com for ${brandName}`);
      } catch (emailErr) {
        // Email failure is non-fatal – lead is already saved
        console.error('[Discovery] Email send error (non-fatal):', emailErr);
      }
    } else {
      console.warn('[Discovery] GMAIL_USER / GMAIL_APP_PASS not set – email skipped.');
    }

    return NextResponse.json({
      success: true,
      message: 'Discovery call request received. Our advisory team will reach out within 24 hours.',
      lead: newLead,
    });
  } catch (error: any) {
    console.error('Discovery Call API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error processing request.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const leads = await getDiscoveryLeads();
    return NextResponse.json({ success: true, count: leads.length, leads });
  } catch (error: any) {
    console.error('Discovery Call GET Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve leads.' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Lead ID and status required.' }, { status: 400 });
    }

    const updated = await updateLeadStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
