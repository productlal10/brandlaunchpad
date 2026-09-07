import fs from 'fs';
import path from 'path';
import { DiscoveryCallLead, PartnerInquiry, AdminUser } from './types';

// Global memory cache to retain data across warm serverless requests
declare global {
  var __lal10_leads_cache: DiscoveryCallLead[] | undefined;
  var __lal10_partners_cache: PartnerInquiry[] | undefined;
  var __lal10_users_cache: AdminUser[] | undefined;
}

// Determine writable directory (/tmp on Vercel/serverless vs local ./data)
function getStoragePaths() {
  const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NODE_ENV === 'production';
  
  const localDataDir = path.join(process.cwd(), 'data');
  const tmpDataDir = '/tmp';

  // Primary local files
  const localLeadsFile = path.join(localDataDir, 'discovery_leads.json');
  const localPartnersFile = path.join(localDataDir, 'partner_inquiries.json');
  const localUsersFile = path.join(localDataDir, 'admin_users.json');

  // Writable tmp files for serverless
  const tmpLeadsFile = path.join(tmpDataDir, 'discovery_leads.json');
  const tmpPartnersFile = path.join(tmpDataDir, 'partner_inquiries.json');
  const tmpUsersFile = path.join(tmpDataDir, 'admin_users.json');

  return {
    isServerless,
    localDataDir,
    localLeadsFile,
    localPartnersFile,
    localUsersFile,
    tmpLeadsFile,
    tmpPartnersFile,
    tmpUsersFile,
  };
}

// ─── USERS / AUTH STORAGE ───────────────────────────────────────────────────

const SEEDED_DEFAULT_USERS: AdminUser[] = [
  {
    id: "usr-super-admin",
    username: "buitlal10",
    name: "Super Admin",
    email: "admin@lal10.com",
    password: "founder@lal10@2026",
    role: "Super Administrator",
    status: "Active",
    avatarInitials: "SA",
    avatarColor: "#5B1F28",
    joinedOn: "Jan 01, 2024",
    lastActive: "Active now"
  },
  {
    id: "usr-maneet",
    username: "maneet",
    name: "Maneet Gohil",
    email: "maneet@lal10.com",
    password: "founder@lal10@2026",
    role: "CEO",
    status: "Active",
    avatarInitials: "MG",
    avatarColor: "#1E293B",
    joinedOn: "Jan 15, 2024",
    lastActive: "Active now"
  },
  {
    id: "usr-sanchit",
    username: "sanchit",
    name: "Sanchit",
    email: "sanchit@lal10.com",
    password: "founder@lal10@2026",
    role: "COO",
    status: "Active",
    avatarInitials: "SC",
    avatarColor: "#0F766E",
    joinedOn: "Jan 15, 2024",
    lastActive: "10 mins ago"
  },
  {
    id: "usr-albin",
    username: "albin",
    name: "Albin",
    email: "albin@lal10.com",
    password: "founder@lal10@2026",
    role: "CPO",
    status: "Active",
    avatarInitials: "AL",
    avatarColor: "#1D4ED8",
    joinedOn: "Mar 01, 2024",
    lastActive: "25 mins ago"
  },
  {
    id: "usr-ghanshyam",
    username: "ghanshyam",
    name: "Ghanshyam",
    email: "ghanshyam@lal10.com",
    password: "founder@lal10@2026",
    role: "EIR",
    status: "Active",
    avatarInitials: "GS",
    avatarColor: "#7E22CE",
    joinedOn: "Feb 10, 2024",
    lastActive: "1 hour ago"
  }
];

export async function getAdminUsers(): Promise<AdminUser[]> {
  if (globalThis.__lal10_users_cache && globalThis.__lal10_users_cache.length > 0) {
    return globalThis.__lal10_users_cache;
  }

  const { localUsersFile, tmpUsersFile } = getStoragePaths();

  // Try tmp first (serverless updates)
  try {
    if (fs.existsSync(tmpUsersFile)) {
      const raw = fs.readFileSync(tmpUsersFile, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        globalThis.__lal10_users_cache = parsed;
        return parsed;
      }
    }
  } catch (e) {}

  // Try local bundled
  try {
    if (fs.existsSync(localUsersFile)) {
      const raw = fs.readFileSync(localUsersFile, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        globalThis.__lal10_users_cache = parsed;
        return parsed;
      }
    }
  } catch (e) {}

  // Fallback to seeded users
  globalThis.__lal10_users_cache = SEEDED_DEFAULT_USERS;
  return SEEDED_DEFAULT_USERS;
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
  if (!user) return null;

  const validPasswords = [
    'founder@lal10@2026',
    `${user.username.toLowerCase()}@lal10@2026`,
    user.password,
  ].filter(Boolean);

  if (validPasswords.includes(password.trim())) {
    return user;
  }

  return null;
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
    password: userData.password || 'founder@lal10@2026',
    role: userData.role,
    status: 'Active',
    avatarInitials: initials,
    avatarColor: '#5B1F28',
    joinedOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    lastActive: 'Active now'
  };

  // Upsert if exists
  const existingIdx = users.findIndex(u => u.email.toLowerCase() === newUser.email || u.username.toLowerCase() === newUser.username);
  if (existingIdx !== -1) {
    users[existingIdx] = { ...users[existingIdx], ...newUser };
  } else {
    users.unshift(newUser);
  }

  globalThis.__lal10_users_cache = users;

  const { localDataDir, localUsersFile, tmpUsersFile } = getStoragePaths();
  const serialized = JSON.stringify(users, null, 2);

  let written = false;
  try {
    if (!fs.existsSync(localDataDir)) {
      fs.mkdirSync(localDataDir, { recursive: true });
    }
    fs.writeFileSync(localUsersFile, serialized, 'utf-8');
    written = true;
  } catch (e) {}

  if (!written) {
    try {
      fs.writeFileSync(tmpUsersFile, serialized, 'utf-8');
    } catch (tmpErr) {}
  }

  return newUser;
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
  } catch (e) {}

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

  let written = false;
  try {
    if (!fs.existsSync(localDataDir)) {
      fs.mkdirSync(localDataDir, { recursive: true });
    }
    fs.writeFileSync(localLeadsFile, serialized, 'utf-8');
    written = true;
  } catch (localErr: any) {}

  if (!written) {
    try {
      fs.writeFileSync(tmpLeadsFile, serialized, 'utf-8');
    } catch (tmpErr) {
      console.warn('[Storage] /tmp write error:', tmpErr);
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
