import fs from 'fs';
import path from 'path';
import { DiscoveryCallLead, PartnerInquiry, AdminUser, InsightArticle } from './types';

// Global memory cache to retain data across warm serverless requests
declare global {
  var __lal10_leads_cache: DiscoveryCallLead[] | undefined;
  var __lal10_partners_cache: PartnerInquiry[] | undefined;
  var __lal10_users_cache: AdminUser[] | undefined;
  var __lal10_insights_cache: InsightArticle[] | undefined;
}

// Determine writable directory (/tmp on Vercel/serverless vs local ./data)
function getStoragePaths() {
  const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NODE_ENV === 'production';
  
  const localDataDir = path.join(process.cwd(), 'data');
  const tmpDataDir = '/tmp';

  // Primary local files
  const localLeadsFile = path.join(localDataDir, 'discovery_leads.json');
  const localPartnersFile = path.join(localDataDir, 'partner_inquiries.json');
  const localInsightsFile = path.join(localDataDir, 'insights.json');

  // Writable tmp files for serverless
  const tmpLeadsFile = path.join(tmpDataDir, 'discovery_leads.json');
  const tmpPartnersFile = path.join(tmpDataDir, 'partner_inquiries.json');
  const tmpInsightsFile = path.join(tmpDataDir, 'insights.json');

  return {
    isServerless,
    localDataDir,
    localLeadsFile,
    localPartnersFile,
    localInsightsFile,
    tmpLeadsFile,
    tmpPartnersFile,
    tmpInsightsFile,
  };
}

function resolveExternalInsightsUrl(includeDrafts = false) {
  const explicitUrl = process.env.EXTERNAL_INSIGHTS_URL;
  const baseUrl = process.env.EXTERNAL_API_BASE_URL;
  const base = explicitUrl || (baseUrl ? `${baseUrl.replace(/\/+$/, '')}/api/launchpad/insights` : null);

  if (!base) {
    return null;
  }

  const separator = base.includes('?') ? '&' : '?';
  return includeDrafts ? `${base}${separator}includeDrafts=1` : base;
}

async function fetchExternalInsights(includeDrafts = false): Promise<InsightArticle[] | null> {
  const targetUrl = resolveExternalInsightsUrl(includeDrafts);
  if (!targetUrl) {
    return null;
  }

  try {
    const response = await fetch(targetUrl, { cache: 'no-store' });
    if (!response.ok) {
      return null;
    }

    const payload = await response.json().catch(() => null);
    if (!payload?.success || !Array.isArray(payload.insights)) {
      return null;
    }

    return payload.insights as InsightArticle[];
  } catch (error) {
    console.warn('[Storage] Failed to read external insights:', error);
    return null;
  }
}

// ─── USERS / AUTH STORAGE ───────────────────────────────────────────────────

// ─── USERS / AUTH STORAGE ───────────────────────────────────────────────────
// All user authentication and admin access is handled centrally by the ERP backend API.
// Zero seeded users or hardcoded credentials exist in this frontend application.

export async function getAdminUsers(): Promise<AdminUser[]> {
  if (globalThis.__lal10_users_cache) {
    return globalThis.__lal10_users_cache;
  }
  globalThis.__lal10_users_cache = [];
  return [];
}

export async function findAdminUser(usernameOrEmail: string): Promise<AdminUser | null> {
  const users = await getAdminUsers();
  const query = usernameOrEmail.trim().toLowerCase();
  const found = users.find(u => 
    u.username.toLowerCase() === query || 
    u.email.toLowerCase() === query
  );
  return found || null;
}

export async function verifyAdminCredentials(usernameOrEmail: string, password: string): Promise<AdminUser | null> {
  const user = await findAdminUser(usernameOrEmail);
  if (!user || !user.password) return null;
  return user.password === password.trim() ? user : null;
}

export async function saveAdminUser(userData: {
  username: string;
  name: string;
  email: string;
  password?: string;
  role: 'Super Administrator' | 'CEO' | 'COO' | 'CPO' | 'EIR' | 'Admin' | 'Manager' | 'Editor' | string;
}): Promise<AdminUser> {
  const users = await getAdminUsers();
  const initials = userData.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U';

  const newUser: AdminUser = {
    id: `usr-${Date.now()}`,
    username: userData.username.toLowerCase(),
    name: userData.name,
    email: userData.email.toLowerCase(),
    password: userData.password || '',
    role: userData.role,
    status: 'Active',
    avatarInitials: initials,
    avatarColor: '#5B1F28',
    joinedOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    lastActive: 'Active now'
  };

  const existingIdx = users.findIndex(u => u.email.toLowerCase() === newUser.email || u.username.toLowerCase() === newUser.username);
  if (existingIdx !== -1) {
    users[existingIdx] = { ...users[existingIdx], ...newUser };
  } else {
    users.unshift(newUser);
  }

  globalThis.__lal10_users_cache = users;
  return newUser;
}


// ─── INSIGHTS STORAGE ────────────────────────────────────────────────────────

export async function getInsights(): Promise<InsightArticle[]> {
  const externalInsights = await fetchExternalInsights(true);
  if (externalInsights) {
    globalThis.__lal10_insights_cache = externalInsights;
    return externalInsights;
  }

  if (globalThis.__lal10_insights_cache && globalThis.__lal10_insights_cache.length > 0) {
    return globalThis.__lal10_insights_cache;
  }

  const { localInsightsFile, tmpInsightsFile } = getStoragePaths();

  try {
    if (fs.existsSync(localInsightsFile)) {
      const raw = fs.readFileSync(localInsightsFile, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        globalThis.__lal10_insights_cache = parsed;
        return parsed;
      }
    }
  } catch (e) {}

  try {
    if (fs.existsSync(tmpInsightsFile)) {
      const raw = fs.readFileSync(tmpInsightsFile, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        globalThis.__lal10_insights_cache = parsed;
        return parsed;
      }
    }
  } catch (e) {}

  globalThis.__lal10_insights_cache = [];
  return [];
}

export async function getPublishedInsights(): Promise<InsightArticle[]> {
  const insights = await getInsights();
  return insights
    .filter((item) => item.status === 'Published')
    .sort((a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime());
}

export async function getInsightBySlug(slug: string, includeDrafts = false): Promise<InsightArticle | null> {
  const insights = await getInsights();
  const found = insights.find((item) => item.slug === slug && (includeDrafts || item.status === 'Published'));
  return found || null;
}

function slugifyInsightTitle(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || `insight-${Date.now()}`;
}

export async function saveInsightArticle(input: Omit<InsightArticle, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) {
  const insights = await getInsights();
  const now = new Date().toISOString();
  const requestedSlug = input.slug || input.title;
  const baseSlug = slugifyInsightTitle(requestedSlug);

  const duplicate = insights.find((item) => item.slug === baseSlug && item.id !== input.id);
  const slug = duplicate ? `${baseSlug}-${Date.now().toString().slice(-6)}` : baseSlug;

  const existingIndex = input.id ? insights.findIndex((item) => item.id === input.id) : -1;
  const existing = existingIndex >= 0 ? insights[existingIndex] : null;

  const normalized: InsightArticle = {
    ...input,
    id: existing?.id || input.id || `ins-${Date.now()}`,
    slug,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };

  if (existingIndex >= 0) {
    insights[existingIndex] = normalized;
  } else {
    insights.unshift(normalized);
  }

  globalThis.__lal10_insights_cache = insights;

  const { localDataDir, localInsightsFile, tmpInsightsFile } = getStoragePaths();
  const serialized = JSON.stringify(insights, null, 2);

  try {
    if (!fs.existsSync(localDataDir)) {
      fs.mkdirSync(localDataDir, { recursive: true });
    }
    fs.writeFileSync(localInsightsFile, serialized, 'utf-8');
  } catch (e) {}

  try {
    fs.writeFileSync(tmpInsightsFile, serialized, 'utf-8');
  } catch (e) {}

  return normalized;
}

// ─── LEADS STORAGE ────────────────────────────────────────────────────────────

export async function getDiscoveryLeads(): Promise<DiscoveryCallLead[]> {
  // 1. Return in-memory cache if present
  if (globalThis.__lal10_leads_cache) {
    return globalThis.__lal10_leads_cache;
  }

  const { localLeadsFile, tmpLeadsFile } = getStoragePaths();

  // 2. Try reading from bundled ./data first
  try {
    if (fs.existsSync(localLeadsFile)) {
      const raw = fs.readFileSync(localLeadsFile, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        globalThis.__lal10_leads_cache = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.warn('[Storage] Could not read local leads file:', e);
  }

  // 3. Try reading from /tmp if local missing
  try {
    if (fs.existsSync(tmpLeadsFile)) {
      const raw = fs.readFileSync(tmpLeadsFile, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        globalThis.__lal10_leads_cache = parsed;
        return parsed;
      }
    }
  } catch (e) {}

  globalThis.__lal10_leads_cache = [];
  return [];
}

export async function saveDiscoveryLead(leadData: Omit<DiscoveryCallLead, 'id' | 'createdAt' | 'status'>): Promise<DiscoveryCallLead> {
  const newLead: DiscoveryCallLead = {
    ...leadData,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  const leads = await getDiscoveryLeads();
  leads.unshift(newLead);
  globalThis.__lal10_leads_cache = leads;

  const { localDataDir, localLeadsFile, tmpLeadsFile } = getStoragePaths();
  const serialized = JSON.stringify(leads, null, 2);

  try {
    if (!fs.existsSync(localDataDir)) {
      fs.mkdirSync(localDataDir, { recursive: true });
    }
    fs.writeFileSync(localLeadsFile, serialized, 'utf-8');
  } catch (localErr: any) {}

  try {
    fs.writeFileSync(tmpLeadsFile, serialized, 'utf-8');
  } catch (tmpErr) {}

  return newLead;
}

export async function updateLeadStatus(id: string, status: DiscoveryCallLead['status']): Promise<DiscoveryCallLead | null> {
  const leads = await getDiscoveryLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index === -1) return null;

  leads[index].status = status;
  globalThis.__lal10_leads_cache = leads;

  const { localDataDir, localLeadsFile, tmpLeadsFile } = getStoragePaths();
  const serialized = JSON.stringify(leads, null, 2);

  try {
    if (!fs.existsSync(localDataDir)) {
      fs.mkdirSync(localDataDir, { recursive: true });
    }
    fs.writeFileSync(localLeadsFile, serialized, 'utf-8');
  } catch (e) {}

  try {
    fs.writeFileSync(tmpLeadsFile, serialized, 'utf-8');
  } catch (tmpErr) {}

  return leads[index];
}

// ─── PARTNER INQUIRIES STORAGE ────────────────────────────────────────────────

export async function getPartnerInquiries(): Promise<PartnerInquiry[]> {
  if (globalThis.__lal10_partners_cache) {
    return globalThis.__lal10_partners_cache;
  }

  const { localPartnersFile, tmpPartnersFile } = getStoragePaths();

  try {
    if (fs.existsSync(localPartnersFile)) {
      const raw = fs.readFileSync(localPartnersFile, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        globalThis.__lal10_partners_cache = parsed;
        return parsed;
      }
    }
  } catch (e) {}

  try {
    if (fs.existsSync(tmpPartnersFile)) {
      const raw = fs.readFileSync(tmpPartnersFile, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        globalThis.__lal10_partners_cache = parsed;
        return parsed;
      }
    }
  } catch (e) {}

  globalThis.__lal10_partners_cache = [];
  return [];
}

export async function savePartnerInquiry(data: Omit<PartnerInquiry, 'id' | 'createdAt'>): Promise<PartnerInquiry> {
  const newInquiry: PartnerInquiry = {
    ...data,
    id: `partner_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };

  const inquiries = await getPartnerInquiries();
  inquiries.unshift(newInquiry);
  globalThis.__lal10_partners_cache = inquiries;

  const { localDataDir, localPartnersFile, tmpPartnersFile } = getStoragePaths();
  const serialized = JSON.stringify(inquiries, null, 2);

  try {
    if (!fs.existsSync(localDataDir)) {
      fs.mkdirSync(localDataDir, { recursive: true });
    }
    fs.writeFileSync(localPartnersFile, serialized, 'utf-8');
  } catch (e) {}

  try {
    fs.writeFileSync(tmpPartnersFile, serialized, 'utf-8');
  } catch (tmpErr) {}

  return newInquiry;
}
