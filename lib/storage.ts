import fs from 'fs';
import path from 'path';
import { DiscoveryCallLead, PartnerInquiry } from './types';

// Global memory cache to retain data across warm serverless requests
declare global {
  var __lal10_leads_cache: DiscoveryCallLead[] | undefined;
  var __lal10_partners_cache: PartnerInquiry[] | undefined;
}

// Determine writable directory (/tmp on Vercel/serverless vs local ./data)
function getStoragePaths() {
  const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NODE_ENV === 'production';
  
  const localDataDir = path.join(process.cwd(), 'data');
  const tmpDataDir = '/tmp';

  // Primary local files
  const localLeadsFile = path.join(localDataDir, 'discovery_leads.json');
  const localPartnersFile = path.join(localDataDir, 'partner_inquiries.json');

  // Writable tmp files for serverless
  const tmpLeadsFile = path.join(tmpDataDir, 'discovery_leads.json');
  const tmpPartnersFile = path.join(tmpDataDir, 'partner_inquiries.json');

  return {
    isServerless,
    localDataDir,
    localLeadsFile,
    localPartnersFile,
    tmpLeadsFile,
    tmpPartnersFile,
  };
}

// ─── LEADS STORAGE ────────────────────────────────────────────────────────────

export async function getDiscoveryLeads(): Promise<DiscoveryCallLead[]> {
  // 1. Return in-memory cache if present
  if (globalThis.__lal10_leads_cache && globalThis.__lal10_leads_cache.length > 0) {
    return globalThis.__lal10_leads_cache;
  }

  const { localLeadsFile, tmpLeadsFile } = getStoragePaths();

  // 2. Try reading from /tmp if it exists
  try {
    if (fs.existsSync(tmpLeadsFile)) {
      const raw = fs.readFileSync(tmpLeadsFile, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        globalThis.__lal10_leads_cache = parsed;
        return parsed;
      }
    }
  } catch (e) {
    // ignore read error and try local
  }

  // 3. Try reading from bundled ./data
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

  // Try writing to local project folder first (dev)
  let written = false;
  try {
    if (!fs.existsSync(localDataDir)) {
      fs.mkdirSync(localDataDir, { recursive: true });
    }
    fs.writeFileSync(localLeadsFile, serialized, 'utf-8');
    written = true;
  } catch (localErr: any) {
    // EROFS (Read-only file system on Vercel/serverless) -> write to /tmp
  }

  // If local write failed or in serverless, write to /tmp
  if (!written) {
    try {
      fs.writeFileSync(tmpLeadsFile, serialized, 'utf-8');
    } catch (tmpErr) {
      console.warn('[Storage] /tmp write error (retaining in-memory):', tmpErr);
    }
  }

  return newLead;
}

export async function updateLeadStatus(id: string, status: DiscoveryCallLead['status']): Promise<DiscoveryCallLead | null> {
  const leads = await getDiscoveryLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index === -1) return null;

  leads[index].status = status;
  globalThis.__lal10_leads_cache = leads;

  const { localLeadsFile, tmpLeadsFile } = getStoragePaths();
  const serialized = JSON.stringify(leads, null, 2);

  try {
    fs.writeFileSync(localLeadsFile, serialized, 'utf-8');
  } catch (e) {
    try {
      fs.writeFileSync(tmpLeadsFile, serialized, 'utf-8');
    } catch (tmpErr) {
      console.warn('[Storage] Status update write error:', tmpErr);
    }
  }

  return leads[index];
}

// ─── PARTNER INQUIRIES STORAGE ────────────────────────────────────────────────

export async function getPartnerInquiries(): Promise<PartnerInquiry[]> {
  if (globalThis.__lal10_partners_cache && globalThis.__lal10_partners_cache.length > 0) {
    return globalThis.__lal10_partners_cache;
  }

  const { localPartnersFile, tmpPartnersFile } = getStoragePaths();

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

  let written = false;
  try {
    if (!fs.existsSync(localDataDir)) {
      fs.mkdirSync(localDataDir, { recursive: true });
    }
    fs.writeFileSync(localPartnersFile, serialized, 'utf-8');
    written = true;
  } catch (e) {}

  if (!written) {
    try {
      fs.writeFileSync(tmpPartnersFile, serialized, 'utf-8');
    } catch (tmpErr) {}
  }

  return newInquiry;
}
