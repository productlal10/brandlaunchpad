import fs from 'fs';
import path from 'path';
import { DiscoveryCallLead, PartnerInquiry } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'discovery_leads.json');
const PARTNERS_FILE = path.join(DATA_DIR, 'partner_inquiries.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
  if (!fs.existsSync(PARTNERS_FILE)) {
    fs.writeFileSync(PARTNERS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

// Leads
export async function getDiscoveryLeads(): Promise<DiscoveryCallLead[]> {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading leads:', error);
    return [];
  }
}

export async function saveDiscoveryLead(leadData: Omit<DiscoveryCallLead, 'id' | 'createdAt' | 'status'>): Promise<DiscoveryCallLead> {
  ensureDataDir();
  const leads = await getDiscoveryLeads();
  const newLead: DiscoveryCallLead = {
    ...leadData,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  leads.unshift(newLead);
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  return newLead;
}

export async function updateLeadStatus(id: string, status: DiscoveryCallLead['status']): Promise<DiscoveryCallLead | null> {
  ensureDataDir();
  const leads = await getDiscoveryLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index === -1) return null;
  leads[index].status = status;
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  return leads[index];
}

// Partner Inquiries
export async function getPartnerInquiries(): Promise<PartnerInquiry[]> {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(PARTNERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading partner inquiries:', error);
    return [];
  }
}

export async function savePartnerInquiry(data: Omit<PartnerInquiry, 'id' | 'createdAt'>): Promise<PartnerInquiry> {
  ensureDataDir();
  const inquiries = await getPartnerInquiries();
  const newInquiry: PartnerInquiry = {
    ...data,
    id: `partner_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };

  inquiries.unshift(newInquiry);
  fs.writeFileSync(PARTNERS_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  return newInquiry;
}
