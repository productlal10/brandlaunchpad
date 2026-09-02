# LAL10 FashionOS · Brand Launchpad

> **Your fashion brand, built on supply-chain intelligence.**
> An operating system for founders entering fashion — from market intelligence, product strategy, and assortment planning to sourcing advisory and marketplace readiness.

---

## 🚀 Overview

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Styling**: Tailwind CSS + Custom Design System
- **Typography**: Cormorant Garamond & Manrope
- **Backend API**: Next.js Serverless Route Handlers
  - `POST /api/discovery-call` — Capture inbound discovery bookings
  - `POST /api/partner-inquiry` — Affiliate network referral inquiries
  - `GET /api/trends` — SKU-level market intelligence dataset
- **Admin Portal**: `/admin` — Inbound lead management, status updates, and CSV export

---

## 🛠️ Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run dev server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

3. **Production build**:
   ```bash
   npm run build
   npm start
   ```

---

## 🌐 Production Deployment

- **Target Domain**: `brandlaunchpad.lal10.com`
- **DNS Record**: `CNAME` pointing `brandlaunchpad` $\rightarrow$ `cname.vercel-dns.com`
