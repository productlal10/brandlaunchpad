import { NextRequest, NextResponse } from 'next/server';
import { saveDiscoveryLead, getDiscoveryLeads, updateLeadStatus } from '@/lib/storage';
import nodemailer from 'nodemailer';

// ─── Email Transport ─────────────────────────────────────────────────────────
// Uses Gmail SMTP. Set GMAIL_USER and GMAIL_APP_PASS in .env.local
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

// ─── 1. TEMPLATE: EMAIL TO LAL10 TEAM (alan@lal10.com) ─────────────────────────
function buildTeamNotificationEmailHtml(data: {
  id: string;
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
  createdAt?: string;
}) {
  const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const enquiryId = `LAL10-${new Date().getFullYear()}-${data.id.slice(-6).toUpperCase()}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Discovery Enquiry – ${data.brandName}</title>
</head>
<body style="margin:0;padding:0;background:#F4EFEA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#171615;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;background:#F4EFEA;">
    <tr>
      <td align="center">
        <!-- Main Email Card -->
        <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;background:#FFFFFF;border-radius:4px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.06);">
          
          <!-- Top Gold Metallic Accent Bar -->
          <tr>
            <td style="height:6px;background:linear-gradient(90deg, #A87944 0%, #D4AF37 35%, #F3E5AB 50%, #D4AF37 65%, #8B5A2B 100%);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid #F0EAE1;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-family:Georgia,serif;font-size:28px;font-weight:700;letter-spacing:5px;color:#171615;line-height:1;">LAL10</div>
                    <div style="font-size:8.5px;letter-spacing:2.5px;text-transform:uppercase;color:#8A8075;font-weight:600;margin-top:5px;">FASHION BRAND OPERATING SYSTEM</div>
                  </td>
                  <td align="right" valign="top">
                    <!-- Black Monogram Badge -->
                    <table cellpadding="0" cellspacing="0" style="background:#171615;border-radius:2px;">
                      <tr>
                        <td style="padding:8px 12px;text-align:center;">
                          <span style="font-family:Georgia,serif;font-size:16px;font-weight:700;color:#C4956A;line-height:1;display:block;">L</span>
                          <span style="font-family:Georgia,serif;font-size:11px;font-weight:700;color:#C4956A;line-height:1;display:block;">10</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Subject Banner -->
          <tr>
            <td style="padding:28px 40px 16px;">
              <div style="display:inline-block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#A87944;font-weight:700;margin-bottom:8px;">
                NEW DISCOVERY ENQUIRY
              </div>
              <h1 style="font-family:Georgia,serif;font-size:23px;font-weight:400;color:#171615;margin:0;line-height:1.35;">
                A new founder has submitted a<br/>request for a discovery call.
              </h1>
            </td>
          </tr>

          <!-- 2-Column Details (Contact Details + Sourcing Challenge) -->
          <tr>
            <td style="padding:12px 40px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <!-- Left: Contact Details -->
                  <td width="48%" valign="top" style="padding-right:12px;">
                    <div style="font-size:10px;letter-spacing:1.8px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:12px;">
                      CONTACT DETAILS
                    </div>
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;color:#171615;">
                      <tr>
                        <td style="padding:6px 0;width:24px;color:#8A8075;font-size:14px;">👤</td>
                        <td style="padding:6px 0;font-size:10.5px;letter-spacing:1px;text-transform:uppercase;color:#8A8075;font-weight:600;width:60px;">NAME</td>
                        <td style="padding:6px 0;font-weight:600;color:#171615;">${data.fullName}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#8A8075;font-size:14px;">🏢</td>
                        <td style="padding:6px 0;font-size:10.5px;letter-spacing:1px;text-transform:uppercase;color:#8A8075;font-weight:600;">BRAND</td>
                        <td style="padding:6px 0;font-weight:600;color:#171615;">${data.brandName}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#8A8075;font-size:14px;">⭐</td>
                        <td style="padding:6px 0;font-size:10.5px;letter-spacing:1px;text-transform:uppercase;color:#8A8075;font-weight:600;">STAGE</td>
                        <td style="padding:6px 0;color:#57524B;">${data.stage}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#8A8075;font-size:14px;">✉️</td>
                        <td style="padding:6px 0;font-size:10.5px;letter-spacing:1px;text-transform:uppercase;color:#8A8075;font-weight:600;">EMAIL</td>
                        <td style="padding:6px 0;"><a href="mailto:${data.email}" style="color:#5B1F28;text-decoration:none;font-weight:500;">${data.email}</a></td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#8A8075;font-size:14px;">📞</td>
                        <td style="padding:6px 0;font-size:10.5px;letter-spacing:1px;text-transform:uppercase;color:#8A8075;font-weight:600;">PHONE</td>
                        <td style="padding:6px 0;color:#57524B;">${data.phone || '+91 Not provided'}</td>
                      </tr>
                    </table>
                  </td>

                  <!-- Right: Current Sourcing Challenge Box -->
                  <td width="52%" valign="top" style="padding-left:12px;">
                    <div style="font-size:10px;letter-spacing:1.8px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:12px;">
                      CURRENT SOURCING CHALLENGE
                    </div>
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF6F0;border:1px solid #EFE6D9;border-radius:6px;">
                      <tr>
                        <td style="padding:20px 22px;">
                          <div style="font-family:Georgia,serif;font-size:24px;line-height:1;color:#A87944;margin-bottom:6px;">“</div>
                          <div style="font-size:13.5px;line-height:1.65;color:#3D3832;font-style:italic;">
                            ${data.notes ? data.notes.replace(/\n/g, '<br/>') : 'Looking for support with sourcing, quality control and scaling our production for the upcoming collection.'}
                          </div>
                          <div style="font-family:Georgia,serif;font-size:24px;line-height:1;color:#A87944;text-align:right;margin-top:6px;">”</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Next Step Action -->
          <tr>
            <td style="padding:16px 40px 24px;border-top:1px solid #F0EAE1;">
              <div style="font-size:10px;letter-spacing:1.8px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:6px;">
                NEXT STEP
              </div>
              <p style="font-size:13.5px;color:#57524B;margin:0 0 16px 0;">
                Please review the enquiry and follow up with the founder.
              </p>
              <a href="https://brandlaunchpad.lal10.com/admin" style="display:inline-block;width:100%;box-sizing:border-box;background:linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #A87944 100%);color:#171615;text-align:center;padding:15px 24px;border-radius:4px;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;text-decoration:none;box-shadow:0 3px 12px rgba(184,134,11,0.25);">
                VIEW IN ADMIN PANEL &nbsp; →
              </a>
            </td>
          </tr>

          <!-- Metadata Strip -->
          <tr>
            <td style="padding:0 40px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF6F0;border:1px solid #EFE6D9;border-radius:6px;">
                <tr>
                  <td width="33%" style="padding:14px 16px;border-right:1px solid #EFE6D9;">
                    <div style="font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:3px;">📅 SUBMITTED ON</div>
                    <div style="font-size:12px;font-weight:600;color:#171615;">${dateStr} ${timeStr}</div>
                  </td>
                  <td width="33%" style="padding:14px 16px;border-right:1px solid #EFE6D9;">
                    <div style="font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:3px;">🌐 SOURCE</div>
                    <div style="font-size:12px;font-weight:600;color:#171615;">Website Discovery Form</div>
                  </td>
                  <td width="34%" style="padding:14px 16px;">
                    <div style="font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:3px;"># ENQUIRY ID</div>
                    <div style="font-size:12px;font-weight:600;color:#171615;">${enquiryId}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Dark Footer Strip -->
          <tr>
            <td style="background:#171615;padding:24px 40px;color:#F5F1EA;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="35%">
                    <div style="font-family:Georgia,serif;font-size:18px;font-weight:700;letter-spacing:3px;color:#C4956A;">LAL10</div>
                    <div style="font-size:7.5px;letter-spacing:2px;text-transform:uppercase;color:rgba(245,241,234,0.6);margin-top:2px;">FASHION BRAND OPERATING SYSTEM</div>
                  </td>
                  <td width="40%" align="center" style="font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(245,241,234,0.65);font-weight:600;line-height:1.4;">
                    BUILDING FASHION BRANDS<br/>THAT LEAD, NOT FOLLOW.
                  </td>
                  <td width="25%" align="right">
                    <a href="https://www.lal10.com" style="font-size:11px;color:#C4956A;text-decoration:none;">www.lal10.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── 2. TEMPLATE: EMAIL TO CUSTOMER (Confirmation Email) ───────────────────────
function buildCustomerConfirmationEmailHtml(data: {
  fullName: string;
  email: string;
  brandName: string;
  stage: string;
  notes: string;
}) {
  const firstName = data.fullName.split(' ')[0] || data.fullName;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your enquiry is with us – Lal10</title>
</head>
<body style="margin:0;padding:0;background:#F4EFEA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#171615;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;background:#F4EFEA;">
    <tr>
      <td align="center">
        <!-- Main Email Card -->
        <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;background:#FFFFFF;border-radius:4px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.06);">
          
          <!-- Top Fine Gold Line -->
          <tr>
            <td style="height:3px;background:#C4956A;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid #F0EAE1;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-family:Georgia,serif;font-size:28px;font-weight:700;letter-spacing:5px;color:#171615;line-height:1;">LAL10</div>
                    <div style="font-size:8.5px;letter-spacing:2.5px;text-transform:uppercase;color:#8A8075;font-weight:600;margin-top:5px;">FASHION BRAND OPERATING SYSTEM</div>
                  </td>
                  <td align="right" valign="top">
                    <!-- Gold Monogram -->
                    <table cellpadding="0" cellspacing="0" style="border-left:1px solid #EFE6D9;padding-left:14px;">
                      <tr>
                        <td style="text-align:center;">
                          <span style="font-family:Georgia,serif;font-size:16px;font-weight:700;color:#A87944;line-height:1;display:block;">L</span>
                          <span style="font-family:Georgia,serif;font-size:11px;font-weight:700;color:#A87944;line-height:1;display:block;">10</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Section: Text on Left + Abstract Gold Graphic on Right -->
          <tr>
            <td style="padding:36px 40px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="68%" valign="top" style="padding-right:16px;">
                    <h1 style="font-family:Georgia,serif;font-size:26px;font-weight:700;letter-spacing:0.5px;color:#171615;margin:0 0 16px 0;line-height:1.25;text-transform:uppercase;">
                      YOUR ENQUIRY IS WITH US.
                    </h1>
                    <div style="font-size:16px;font-weight:600;color:#171615;margin-bottom:12px;">
                      Thank you, ${firstName}.
                    </div>
                    <p style="font-size:14px;line-height:1.65;color:#57524B;margin:0 0 12px 0;">
                      We&apos;ve received your request to connect with LAL10 regarding <strong>${data.brandName}</strong>.
                    </p>
                    <p style="font-size:13.5px;line-height:1.65;color:#7A7268;margin:0;">
                      Our team will review your brand, current stage and the challenge you&apos;ve shared. We&apos;ll be in touch shortly to discuss the next step.
                    </p>
                  </td>
                  <!-- Right Gold Texture Arc Graphic -->
                  <td width="32%" valign="middle" align="center">
                    <div style="width:130px;height:130px;border-radius:50%;background:linear-gradient(135deg, #D4AF37 0%, #E6C687 40%, #B8860B 100%);box-shadow:inset 0 0 20px rgba(0,0,0,0.15), 0 8px 20px rgba(184,134,11,0.15);position:relative;overflow:hidden;">
                      <div style="position:absolute;inset:10px;border-radius:50%;border:1px solid rgba(255,255,255,0.4);"></div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Your Details Summary Box -->
          <tr>
            <td style="padding:0 40px 28px;">
              <div style="font-size:10px;letter-spacing:1.8px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:10px;">
                YOUR DETAILS
              </div>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF6F0;border:1px solid #EFE6D9;border-radius:6px;">
                <tr>
                  <td width="28%" valign="top" style="padding:18px 16px;border-right:1px solid #EFE6D9;">
                    <div style="font-size:9.5px;letter-spacing:1.2px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:4px;">👜 BRAND</div>
                    <div style="font-size:13px;font-weight:700;color:#171615;">${data.brandName}</div>
                  </td>
                  <td width="32%" valign="top" style="padding:18px 16px;border-right:1px solid #EFE6D9;">
                    <div style="font-size:9.5px;letter-spacing:1.2px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:4px;">⚑ STAGE</div>
                    <div style="font-size:13px;font-weight:600;color:#57524B;">${data.stage}</div>
                  </td>
                  <td width="40%" valign="top" style="padding:18px 16px;">
                    <div style="font-size:9.5px;letter-spacing:1.2px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:4px;">🎯 CHALLENGE</div>
                    <div style="font-size:12.5px;line-height:1.5;color:#57524B;">${data.notes || 'Looking for support with sourcing, quality control and scaling our production for the upcoming collection.'}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What Happens Next -->
          <tr>
            <td style="padding:0 40px 32px;">
              <div style="font-size:10px;letter-spacing:1.8px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:14px;">
                WHAT HAPPENS NEXT
              </div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <!-- Step 1 -->
                  <td width="33%" valign="top" style="padding-right:12px;">
                    <div style="font-size:16px;margin-bottom:6px;">🔍 <strong style="font-size:12px;color:#171615;letter-spacing:0.5px;">01</strong></div>
                    <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#171615;margin-bottom:4px;">WE REVIEW</div>
                    <div style="font-size:12px;line-height:1.5;color:#7A7268;">Our team reviews your enquiry and brand context.</div>
                  </td>
                  <!-- Step 2 -->
                  <td width="33%" valign="top" style="padding-right:6px;padding-left:6px;">
                    <div style="font-size:16px;margin-bottom:6px;">👥 <strong style="font-size:12px;color:#171615;letter-spacing:0.5px;">02</strong></div>
                    <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#171615;margin-bottom:4px;">WE CONNECT</div>
                    <div style="font-size:12px;line-height:1.5;color:#7A7268;">We&apos;ll reach out to understand your requirements in detail.</div>
                  </td>
                  <!-- Step 3 -->
                  <td width="34%" valign="top" style="padding-left:12px;">
                    <div style="font-size:16px;margin-bottom:6px;">📞 <strong style="font-size:12px;color:#171615;letter-spacing:0.5px;">03</strong></div>
                    <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#171615;margin-bottom:4px;">DISCOVERY CALL</div>
                    <div style="font-size:12px;line-height:1.5;color:#7A7268;">If there&apos;s a strong fit, we&apos;ll schedule a conversation with the team.</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding:0 40px 36px;text-align:center;">
              <a href="https://www.lal10.com" style="display:inline-block;background:#3D1219;color:#FFFFFF;padding:14px 38px;border-radius:4px;font-size:11.5px;letter-spacing:2px;text-transform:uppercase;font-weight:700;text-decoration:none;box-shadow:0 4px 14px rgba(61,18,25,0.25);">
                VISIT LAL10 &nbsp; →
              </a>
            </td>
          </tr>

          <!-- Light Cream Footer Strip -->
          <tr>
            <td style="background:#FAF6F0;padding:24px 40px;border-top:1px solid #EFE6D9;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="35%">
                    <div style="font-family:Georgia,serif;font-size:17px;font-weight:700;letter-spacing:3px;color:#171615;">LAL10</div>
                    <div style="font-size:7.5px;letter-spacing:1.8px;text-transform:uppercase;color:#8A8075;margin-top:2px;">FASHION BRAND OPERATING SYSTEM</div>
                  </td>
                  <td width="35%" align="center" style="font-size:9.5px;color:#7A7268;line-height:1.4;">
                    Building fashion brands<br/>that lead, not follow.
                  </td>
                  <td width="30%" align="right" style="font-size:11px;color:#57524B;">
                    <div>✉️ <a href="mailto:hello@lal10.com" style="color:#57524B;text-decoration:none;">hello@lal10.com</a></div>
                    <div style="margin-top:3px;">🌐 <a href="https://www.lal10.com" style="color:#57524B;text-decoration:none;">www.lal10.com</a></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── API ROUTE HANDLERS ──────────────────────────────────────────────────────
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

    // 1. Save lead to local JSON storage
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

    // 2. Send emails via Nodemailer
    const transporter = createTransport();
    if (transporter) {
      try {
        // Email 1: Send Internal Notification to LAL10 Team (alan@lal10.com)
        await transporter.sendMail({
          from: `"Lal10 FashionOS" <${process.env.GMAIL_USER}>`,
          to: 'alan@lal10.com',
          replyTo: String(email).trim(),
          subject: `⚡ New Discovery Enquiry – ${String(brandName).trim()} (${String(fullName).trim()})`,
          html: buildTeamNotificationEmailHtml({
            id: newLead.id,
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
        console.log(`[Discovery] Team email sent to alan@lal10.com for ${brandName}`);

        // Email 2: Send Confirmation Email to Customer / Founder
        await transporter.sendMail({
          from: `"Lal10 FashionOS" <${process.env.GMAIL_USER}>`,
          to: String(email).trim(),
          replyTo: 'hello@lal10.com',
          subject: `Your enquiry is with us – Lal10 FashionOS`,
          html: buildCustomerConfirmationEmailHtml({
            fullName: String(fullName).trim(),
            email: String(email).trim(),
            brandName: String(brandName).trim(),
            stage: stage || 'Pre-launch',
            notes: notes || '',
          }),
        });
        console.log(`[Discovery] Customer confirmation email sent to ${email}`);
      } catch (emailErr) {
        console.error('[Discovery] Email send error (non-fatal):', emailErr);
      }
    } else {
      console.warn('[Discovery] GMAIL_USER / GMAIL_APP_PASS not configured in .env.local – email dispatch skipped.');
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
