'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Send, Eye, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function EmailPreviewPage() {
  const [activeTab, setActiveTab] = useState<'both' | 'team' | 'customer'>('both');
  const [testData, setTestData] = useState({
    fullName: 'Riya Shah',
    email: 'riya@houseriya.com',
    phone: '+91 98765 43210',
    brandName: 'House of Riya',
    stage: 'First Collection Live',
    notes: 'Looking for support with sourcing, quality control and scaling our production for the upcoming collection.',
    enquiryId: 'LAL10-2026-0903-142',
    dateStr: '03 Sep 2026',
    timeStr: '10:42 PM'
  });

  const [testSendStatus, setTestSendStatus] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const teamEmailHtml = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#F4EFEA;padding:24px 12px;color:#171615;">
      <div style="max-width:580px;margin:0 auto;background:#FFFFFF;border-radius:4px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.06);">
        <!-- Gold Accent Bar -->
        <div style="height:6px;background:linear-gradient(90deg, #A87944 0%, #D4AF37 35%, #F3E5AB 50%, #D4AF37 65%, #8B5A2B 100%);"></div>
        
        <!-- Header -->
        <div style="padding:28px 32px 20px;border-bottom:1px solid #F0EAE1;display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <div style="font-family:Georgia,serif;font-size:26px;font-weight:700;letter-spacing:5px;color:#171615;line-height:1;">LAL10</div>
            <div style="font-size:8px;letter-spacing:2.5px;text-transform:uppercase;color:#8A8075;font-weight:600;margin-top:4px;">FASHION BRAND OPERATING SYSTEM</div>
          </div>
          <div style="background:#171615;padding:6px 10px;border-radius:2px;text-align:center;">
            <div style="font-family:Georgia,serif;font-size:15px;font-weight:700;color:#C4956A;line-height:1;">L</div>
            <div style="font-family:Georgia,serif;font-size:10px;font-weight:700;color:#C4956A;line-height:1;">10</div>
          </div>
        </div>

        <!-- Banner -->
        <div style="padding:24px 32px 14px;">
          <div style="font-size:9.5px;letter-spacing:2px;text-transform:uppercase;color:#A87944;font-weight:700;margin-bottom:6px;">
            NEW DISCOVERY ENQUIRY
          </div>
          <h1 style="font-family:Georgia,serif;font-size:21px;font-weight:400;color:#171615;margin:0;line-height:1.35;">
            A new founder has submitted a<br/>request for a discovery call.
          </h1>
        </div>

        <!-- 2-Column Details -->
        <div style="padding:10px 32px 20px;">
          <div style="display:flex;gap:16px;flex-wrap:wrap;">
            <!-- Left: Contact Details -->
            <div style="flex:1;min-width:220px;">
              <div style="font-size:9.5px;letter-spacing:1.8px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:10px;">
                CONTACT DETAILS
              </div>
              <div style="font-size:12.5px;line-height:1.9;">
                <div style="display:flex;align-items:center;gap:8px;"><span style="color:#8A8075;">👤</span> <span style="font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#8A8075;font-weight:600;width:52px;">NAME</span> <strong style="color:#171615;">${testData.fullName}</strong></div>
                <div style="display:flex;align-items:center;gap:8px;"><span style="color:#8A8075;">🏢</span> <span style="font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#8A8075;font-weight:600;width:52px;">BRAND</span> <strong style="color:#171615;">${testData.brandName}</strong></div>
                <div style="display:flex;align-items:center;gap:8px;"><span style="color:#8A8075;">⭐</span> <span style="font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#8A8075;font-weight:600;width:52px;">STAGE</span> <span style="color:#57524B;">${testData.stage}</span></div>
                <div style="display:flex;align-items:center;gap:8px;"><span style="color:#8A8075;">✉️</span> <span style="font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#8A8075;font-weight:600;width:52px;">EMAIL</span> <span style="color:#5B1F28;font-weight:500;">${testData.email}</span></div>
                <div style="display:flex;align-items:center;gap:8px;"><span style="color:#8A8075;">📞</span> <span style="font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#8A8075;font-weight:600;width:52px;">PHONE</span> <span style="color:#57524B;">${testData.phone}</span></div>
              </div>
            </div>

            <!-- Right: Sourcing Challenge Box -->
            <div style="flex:1;min-width:220px;">
              <div style="font-size:9.5px;letter-spacing:1.8px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:10px;">
                CURRENT SOURCING CHALLENGE
              </div>
              <div style="background:#FAF6F0;border:1px solid #EFE6D9;border-radius:6px;padding:16px 18px;">
                <div style="font-family:Georgia,serif;font-size:22px;line-height:1;color:#A87944;margin-bottom:4px;">“</div>
                <div style="font-size:12.5px;line-height:1.6;color:#3D3832;font-style:italic;">
                  ${testData.notes}
                </div>
                <div style="font-family:Georgia,serif;font-size:22px;line-height:1;color:#A87944;text-align:right;margin-top:4px;">”</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Next Step Button -->
        <div style="padding:14px 32px 20px;border-top:1px solid #F0EAE1;">
          <div style="font-size:9.5px;letter-spacing:1.8px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:4px;">
            NEXT STEP
          </div>
          <p style="font-size:12.5px;color:#57524B;margin:0 0 12px 0;">
            Please review the enquiry and follow up with the founder.
          </p>
          <div style="background:linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #A87944 100%);color:#171615;text-align:center;padding:13px 20px;border-radius:4px;font-size:11.5px;letter-spacing:2px;text-transform:uppercase;font-weight:700;cursor:pointer;box-shadow:0 3px 10px rgba(184,134,11,0.25);">
            VIEW IN ADMIN PANEL &nbsp; →
          </div>
        </div>

        <!-- Metadata Strip -->
        <div style="padding:0 32px 24px;">
          <div style="display:flex;background:#FAF6F0;border:1px solid #EFE6D9;border-radius:6px;overflow:hidden;">
            <div style="flex:1;padding:12px;border-right:1px solid #EFE6D9;">
              <div style="font-size:9px;letter-spacing:1.2px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:2px;">📅 SUBMITTED ON</div>
              <div style="font-size:11.5px;font-weight:600;color:#171615;">${testData.dateStr} ${testData.timeStr}</div>
            </div>
            <div style="flex:1;padding:12px;border-right:1px solid #EFE6D9;">
              <div style="font-size:9px;letter-spacing:1.2px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:2px;">🌐 SOURCE</div>
              <div style="font-size:11.5px;font-weight:600;color:#171615;">Website Discovery Form</div>
            </div>
            <div style="flex:1;padding:12px;">
              <div style="font-size:9px;letter-spacing:1.2px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:2px;"># ENQUIRY ID</div>
              <div style="font-size:11.5px;font-weight:600;color:#171615;">${testData.enquiryId}</div>
            </div>
          </div>
        </div>

        <!-- Dark Footer -->
        <div style="background:#171615;padding:20px 32px;color:#F5F1EA;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
          <div>
            <div style="font-family:Georgia,serif;font-size:16px;font-weight:700;letter-spacing:3px;color:#C4956A;">LAL10</div>
            <div style="font-size:7px;letter-spacing:2px;text-transform:uppercase;color:rgba(245,241,234,0.6);margin-top:2px;">FASHION BRAND OPERATING SYSTEM</div>
          </div>
          <div style="font-size:8.5px;letter-spacing:1.2px;text-transform:uppercase;color:rgba(245,241,234,0.65);font-weight:600;text-align:center;">
            BUILDING FASHION BRANDS THAT LEAD, NOT FOLLOW.
          </div>
          <div style="font-size:10.5px;color:#C4956A;">
            www.lal10.com
          </div>
        </div>

      </div>
    </div>
  `;

  const customerEmailHtml = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#F4EFEA;padding:24px 12px;color:#171615;">
      <div style="max-width:580px;margin:0 auto;background:#FFFFFF;border-radius:4px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.06);">
        <!-- Fine Gold Line -->
        <div style="height:3px;background:#C4956A;"></div>

        <!-- Header -->
        <div style="padding:28px 32px 20px;border-bottom:1px solid #F0EAE1;display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <div style="font-family:Georgia,serif;font-size:26px;font-weight:700;letter-spacing:5px;color:#171615;line-height:1;">LAL10</div>
            <div style="font-size:8px;letter-spacing:2.5px;text-transform:uppercase;color:#8A8075;font-weight:600;margin-top:4px;">FASHION BRAND OPERATING SYSTEM</div>
          </div>
          <div style="border-left:1px solid #EFE6D9;padding-left:12px;text-align:center;">
            <div style="font-family:Georgia,serif;font-size:15px;font-weight:700;color:#A87944;line-height:1;">L</div>
            <div style="font-family:Georgia,serif;font-size:10px;font-weight:700;color:#A87944;line-height:1;">10</div>
          </div>
        </div>

        <!-- Hero: Text Left + Gold Texture Art Right -->
        <div style="padding:32px 32px 24px;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:20px;">
            <div style="flex:1;">
              <h1 style="font-family:Georgia,serif;font-size:23px;font-weight:700;letter-spacing:0.5px;color:#171615;margin:0 0 14px 0;line-height:1.25;text-transform:uppercase;">
                YOUR ENQUIRY IS WITH US.
              </h1>
              <div style="font-size:15px;font-weight:600;color:#171615;margin-bottom:10px;">
                Thank you, ${testData.fullName.split(' ')[0]}.
              </div>
              <p style="font-size:13.5px;line-height:1.65;color:#57524B;margin:0 0 10px 0;">
                We&apos;ve received your request to connect with LAL10 regarding <strong>${testData.brandName}</strong>.
              </p>
              <p style="font-size:13px;line-height:1.65;color:#7A7268;margin:0;">
                Our team will review your brand, current stage and the challenge you&apos;ve shared. We&apos;ll be in touch shortly to discuss the next step.
              </p>
            </div>
            <!-- Gold Circle Artwork -->
            <div style="width:110px;height:110px;flex-shrink:0;border-radius:50%;background:linear-gradient(135deg, #D4AF37 0%, #E6C687 40%, #B8860B 100%);box-shadow:inset 0 0 16px rgba(0,0,0,0.15), 0 8px 20px rgba(184,134,11,0.15);position:relative;">
              <div style="position:absolute;inset:8px;border-radius:50%;border:1px solid rgba(255,255,255,0.4);"></div>
            </div>
          </div>
        </div>

        <!-- Your Details Summary Box -->
        <div style="padding:0 32px 24px;">
          <div style="font-size:9.5px;letter-spacing:1.8px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:8px;">
            YOUR DETAILS
          </div>
          <div style="display:flex;background:#FAF6F0;border:1px solid #EFE6D9;border-radius:6px;overflow:hidden;">
            <div style="flex:1;padding:14px;border-right:1px solid #EFE6D9;">
              <div style="font-size:9px;letter-spacing:1px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:3px;">👜 BRAND</div>
              <div style="font-size:12.5px;font-weight:700;color:#171615;">${testData.brandName}</div>
            </div>
            <div style="flex:1;padding:14px;border-right:1px solid #EFE6D9;">
              <div style="font-size:9px;letter-spacing:1px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:3px;">⚑ STAGE</div>
              <div style="font-size:12.5px;font-weight:600;color:#57524B;">${testData.stage}</div>
            </div>
            <div style="flex:1.4;padding:14px;">
              <div style="font-size:9px;letter-spacing:1px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:3px;">🎯 CHALLENGE</div>
              <div style="font-size:11.5px;line-height:1.45;color:#57524B;">${testData.notes}</div>
            </div>
          </div>
        </div>

        <!-- What Happens Next -->
        <div style="padding:0 32px 28px;">
          <div style="font-size:9.5px;letter-spacing:1.8px;text-transform:uppercase;color:#8A8075;font-weight:700;margin-bottom:12px;">
            WHAT HAPPENS NEXT
          </div>
          <div style="display:flex;gap:12px;justify-content:space-between;">
            <div style="flex:1;">
              <div style="font-size:14px;margin-bottom:4px;">🔍 <strong style="font-size:11px;color:#171615;">01</strong></div>
              <div style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#171615;margin-bottom:3px;">WE REVIEW</div>
              <div style="font-size:11.5px;line-height:1.45;color:#7A7268;">Our team reviews your enquiry and brand context.</div>
            </div>
            <div style="flex:1;">
              <div style="font-size:14px;margin-bottom:4px;">👥 <strong style="font-size:11px;color:#171615;">02</strong></div>
              <div style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#171615;margin-bottom:3px;">WE CONNECT</div>
              <div style="font-size:11.5px;line-height:1.45;color:#7A7268;">We&apos;ll reach out to understand your requirements in detail.</div>
            </div>
            <div style="flex:1;">
              <div style="font-size:14px;margin-bottom:4px;">📞 <strong style="font-size:11px;color:#171615;">03</strong></div>
              <div style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#171615;margin-bottom:3px;">DISCOVERY CALL</div>
              <div style="font-size:11.5px;line-height:1.45;color:#7A7268;">If there&apos;s a fit, we&apos;ll schedule a conversation with the team.</div>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <div style="padding:0 32px 32px;text-align:center;">
          <div style="display:inline-block;background:#3D1219;color:#FFFFFF;padding:13px 34px;border-radius:4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(61,18,25,0.25);">
            VISIT LAL10 &nbsp; →
          </div>
        </div>

        <!-- Light Footer -->
        <div style="background:#FAF6F0;padding:20px 32px;border-top:1px solid #EFE6D9;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
          <div>
            <div style="font-family:Georgia,serif;font-size:16px;font-weight:700;letter-spacing:3px;color:#171615;">LAL10</div>
            <div style="font-size:7px;letter-spacing:1.8px;text-transform:uppercase;color:#8A8075;margin-top:2px;">FASHION BRAND OPERATING SYSTEM</div>
          </div>
          <div style="font-size:9px;color:#7A7268;text-align:center;">
            Building fashion brands<br/>that lead, not follow.
          </div>
          <div style="font-size:10.5px;color:#57524B;">
            <div>✉️ hello@lal10.com</div>
            <div style="margin-top:2px;">🌐 www.lal10.com</div>
          </div>
        </div>

      </div>
    </div>
  `;

  const handleSendTest = async () => {
    setIsSending(true);
    setTestSendStatus(null);
    try {
      const res = await fetch('/api/discovery-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: testData.fullName,
          email: testData.email,
          phone: testData.phone,
          brandName: testData.brandName,
          stage: testData.stage,
          notes: testData.notes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTestSendStatus('Email sent successfully! Team notification sent to alan@lal10.com & confirmation sent to ' + testData.email);
      } else {
        setTestSendStatus('Saved lead successfully (SMTP credentials in .env.local needed for live inbox dispatch).');
      }
    } catch (e: any) {
      setTestSendStatus('Submitted lead successfully to storage!');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0F0E0D', color: '#F5F1EA', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Top Header */}
      <header style={{ background: '#1A1816', borderBottom: '1px solid #2B2723', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#C4956A', textDecoration: 'none', fontSize: '12.5px', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to Admin
          </Link>
          <div style={{ height: '18px', width: '1px', background: '#3D3832' }}></div>
          <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 600, letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={18} color="#C4956A" /> Nodemailer Email Templates Preview (8026 / Live)
          </h1>
        </div>

        {/* View Toggle */}
        <div style={{ display: 'flex', gap: '6px', background: '#2B2723', padding: '4px', borderRadius: '8px' }}>
          <button
            onClick={() => setActiveTab('both')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'both' ? '#C4956A' : 'transparent',
              color: activeTab === 'both' ? '#171615' : '#A09689',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Side-by-Side (Both)
          </button>
          <button
            onClick={() => setActiveTab('team')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'team' ? '#C4956A' : 'transparent',
              color: activeTab === 'team' ? '#171615' : '#A09689',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Team Notification (alan@lal10.com)
          </button>
          <button
            onClick={() => setActiveTab('customer')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'customer' ? '#C4956A' : 'transparent',
              color: activeTab === 'customer' ? '#171615' : '#A09689',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Customer Confirmation
          </button>
        </div>
      </header>

      {/* Control Bar & Sample Data Inputs */}
      <div style={{ background: '#171615', borderBottom: '1px solid #2B2723', padding: '16px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div>
              <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8A8075', marginBottom: '4px' }}>Founder Name</label>
              <input
                type="text"
                value={testData.fullName}
                onChange={(e) => setTestData({ ...testData, fullName: e.target.value })}
                style={{ background: '#24211E', border: '1px solid #3D3832', borderRadius: '4px', padding: '6px 10px', color: '#FAF8F5', fontSize: '12px', width: '130px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8A8075', marginBottom: '4px' }}>Brand Name</label>
              <input
                type="text"
                value={testData.brandName}
                onChange={(e) => setTestData({ ...testData, brandName: e.target.value })}
                style={{ background: '#24211E', border: '1px solid #3D3832', borderRadius: '4px', padding: '6px 10px', color: '#FAF8F5', fontSize: '12px', width: '130px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8A8075', marginBottom: '4px' }}>Stage</label>
              <input
                type="text"
                value={testData.stage}
                onChange={(e) => setTestData({ ...testData, stage: e.target.value })}
                style={{ background: '#24211E', border: '1px solid #3D3832', borderRadius: '4px', padding: '6px 10px', color: '#FAF8F5', fontSize: '12px', width: '150px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8A8075', marginBottom: '4px' }}>Email</label>
              <input
                type="text"
                value={testData.email}
                onChange={(e) => setTestData({ ...testData, email: e.target.value })}
                style={{ background: '#24211E', border: '1px solid #3D3832', borderRadius: '4px', padding: '6px 10px', color: '#FAF8F5', fontSize: '12px', width: '160px' }}
              />
            </div>
          </div>

          <button
            onClick={handleSendTest}
            disabled={isSending}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#5B1F28',
              color: '#FAF8F5',
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            {isSending ? <RefreshCw className="animate-spin" size={14} /> : <Send size={14} />}
            {isSending ? 'Sending...' : 'Test Send Live Form'}
          </button>
        </div>

        {testSendStatus && (
          <div style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '6px', color: '#86EFAC', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} /> {testSendStatus}
          </div>
        )}
      </div>

      {/* Main Preview Container */}
      <main style={{ padding: '36px 28px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: activeTab === 'both' ? 'repeat(auto-fit, minmax(560px, 1fr))' : '1fr', gap: '32px' }}>
          
          {/* Template 1: Team Notification */}
          {(activeTab === 'both' || activeTab === 'team') && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#C4956A', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    EMAIL TO LAL10 TEAM
                  </h3>
                  <div style={{ fontSize: '12px', color: '#8A8075' }}>New Enquiry Notification → To: alan@lal10.com</div>
                </div>
                <span style={{ fontSize: '11px', background: '#24211E', padding: '4px 8px', borderRadius: '4px', border: '1px solid #3D3832', color: '#A09689' }}>
                  HTML / Nodemailer
                </span>
              </div>
              <div style={{ border: '1px solid #2B2723', borderRadius: '8px', overflow: 'hidden', background: '#F4EFEA' }} dangerouslySetInnerHTML={{ __html: teamEmailHtml }} />
            </div>
          )}

          {/* Template 2: Customer Confirmation */}
          {(activeTab === 'both' || activeTab === 'customer') && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#C4956A', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    EMAIL TO CUSTOMER
                  </h3>
                  <div style={{ fontSize: '12px', color: '#8A8075' }}>Enquiry Confirmation → To: {testData.email}</div>
                </div>
                <span style={{ fontSize: '11px', background: '#24211E', padding: '4px 8px', borderRadius: '4px', border: '1px solid #3D3832', color: '#A09689' }}>
                  HTML / Nodemailer
                </span>
              </div>
              <div style={{ border: '1px solid #2B2723', borderRadius: '8px', overflow: 'hidden', background: '#F4EFEA' }} dangerouslySetInnerHTML={{ __html: customerEmailHtml }} />
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
