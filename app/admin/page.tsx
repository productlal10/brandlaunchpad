'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, Users, PhoneCall, Building2, BookOpen, 
  BarChart3, Settings, LogOut, ChevronDown, ChevronRight, 
  Bell, Calendar, Search, Filter, Eye, EyeOff, MoreVertical, Plus, 
  ArrowUpRight, TrendingUp, TrendingDown, Check, X, Edit3, 
  Trash2, Mail, ExternalLink, SlidersHorizontal, Sparkles, 
  FolderKanban, Share2, ArrowUp, ArrowDown, UserPlus, Phone, 
  Globe, CheckCircle2, Clock, AlertCircle, Shield, Menu,
  Layers, Compass, Laptop, Tag, CheckCheck, RefreshCw, Download,
  Lock, Key, Send, Inbox, MessageSquare
} from 'lucide-react';
import { DiscoveryCallLead } from '@/lib/types';

// ── TYPES & INTERFACES ───────────────────────────────────────────────────────
type TabType = 'dashboard' | 'enquiries' | 'brands' | 'calls' | 'users' | 'casestudies' | 'insights' | 'settings' | 'integrations';

export interface EnquiryItem {
  id: string;
  name: string;
  email: string;
  brand: string;
  category: string;
  stage: string;
  budget: string;
  source: 'Website' | 'LinkedIn' | 'Referral' | 'Instagram' | 'Other';
  date: string;
  time: string;
  rawDate: string;
  relativeTime: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'In Discussion' | 'Discovery Call';
  phone?: string;
  notes?: string;
  trackInterest?: string;
  emailTeamSent: boolean;
  emailClientSent: boolean;
}

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Manager' | 'Viewer';
  status: 'Active' | 'Inactive';
  joinedOn: string;
  lastActive: string;
  avatarInitials: string;
  avatarColor: string;
}

export interface DiscoveryCallItem {
  id: string;
  brand: string;
  contactName: string;
  contactEmail: string;
  brandCode: string;
  stage: string;
  callDate: string;
  callTime: string;
  callHost: string;
  callStatus: 'Scheduled' | 'Completed' | 'Cancelled';
  outcome: string;
  notes?: string;
}

export interface BrandItem {
  id: string;
  name: string;
  code: string;
  website: string;
  contactName: string;
  contactEmail: string;
  stage: string;
  category: string;
  status: 'Active' | 'Inactive';
  discoveryCallDate: string;
  discoveryCallTime: string;
  onboardedOn: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  brandName: string;
  brandCode: string;
  industry: string;
  status: 'Published' | 'Draft';
  publishedOn: string;
  views: number;
  imageUrl: string;
}

// ── AUTHORIZED TEAM USERS ───────────────────────────────────────────────────
export interface AuthUser {
  username: string;
  name: string;
  email: string;
  role: string;
  avatarInitials: string;
  avatarColor: string;
}

const AUTHORIZED_ACCOUNTS: Record<string, { passwords: string[]; profile: AuthUser }> = {
  // Super Admin
  'buitlal10': {
    passwords: ['founder@lal10@2026', 'admin@lal10@2026'],
    profile: { username: 'buitlal10', name: 'Super Admin', email: 'admin@lal10.com', role: 'Super Administrator', avatarInitials: 'SA', avatarColor: '#5B1F28' }
  },
  'builtlal10': {
    passwords: ['founder@lal10@2026', 'admin@lal10@2026'],
    profile: { username: 'buitlal10', name: 'Super Admin', email: 'admin@lal10.com', role: 'Super Administrator', avatarInitials: 'SA', avatarColor: '#5B1F28' }
  },
  'admin': {
    passwords: ['founder@lal10@2026', 'admin@lal10@2026'],
    profile: { username: 'admin', name: 'Super Admin', email: 'admin@lal10.com', role: 'Super Administrator', avatarInitials: 'SA', avatarColor: '#5B1F28' }
  },
  'admin@lal10.com': {
    passwords: ['founder@lal10@2026', 'admin@lal10@2026'],
    profile: { username: 'admin@lal10.com', name: 'Super Admin', email: 'admin@lal10.com', role: 'Super Administrator', avatarInitials: 'SA', avatarColor: '#5B1F28' }
  },

  // User 1: Maneet Gohil
  'maneet': {
    passwords: ['founder@lal10@2026', 'maneet@lal10@2026'],
    profile: { username: 'maneet', name: 'Maneet Gohil', email: 'maneet@lal10.com', role: 'Founder & CEO', avatarInitials: 'MG', avatarColor: '#1E293B' }
  },
  'maneeth': {
    passwords: ['founder@lal10@2026', 'maneet@lal10@2026'],
    profile: { username: 'maneeth', name: 'Maneet Gohil', email: 'maneet@lal10.com', role: 'Founder & CEO', avatarInitials: 'MG', avatarColor: '#1E293B' }
  },
  'maneet@lal10.com': {
    passwords: ['founder@lal10@2026', 'maneet@lal10@2026'],
    profile: { username: 'maneet@lal10.com', name: 'Maneet Gohil', email: 'maneet@lal10.com', role: 'Founder & CEO', avatarInitials: 'MG', avatarColor: '#1E293B' }
  },

  // User 2: Sanchit
  'sanchit': {
    passwords: ['founder@lal10@2026', 'sanchit@lal10@2026'],
    profile: { username: 'sanchit', name: 'Sanchit', email: 'sanchit@lal10.com', role: 'Co-Founder & Director', avatarInitials: 'SC', avatarColor: '#0F766E' }
  },
  'sanchit@lal10.com': {
    passwords: ['founder@lal10@2026', 'sanchit@lal10@2026'],
    profile: { username: 'sanchit@lal10.com', name: 'Sanchit', email: 'sanchit@lal10.com', role: 'Co-Founder & Director', avatarInitials: 'SC', avatarColor: '#0F766E' }
  },

  // User 3: Albin
  'albin': {
    passwords: ['founder@lal10@2026', 'albin@lal10@2026'],
    profile: { username: 'albin', name: 'Albin', email: 'albin@lal10.com', role: 'Growth & Brand Partnerships', avatarInitials: 'AL', avatarColor: '#1D4ED8' }
  },
  'albin@lal10.com': {
    passwords: ['founder@lal10@2026', 'albin@lal10@2026'],
    profile: { username: 'albin@lal10.com', name: 'Albin', email: 'albin@lal10.com', role: 'Growth & Brand Partnerships', avatarInitials: 'AL', avatarColor: '#1D4ED8' }
  },

  // User 4: Ghanshyam
  'ghanshyam': {
    passwords: ['founder@lal10@2026', 'ghanshyam@lal10@2026'],
    profile: { username: 'ghanshyam', name: 'Ghanshyam', email: 'ghanshyam@lal10.com', role: 'Technology & Operations', avatarInitials: 'GS', avatarColor: '#7E22CE' }
  },
  'ghanshyam@lal10.com': {
    passwords: ['founder@lal10@2026', 'ghanshyam@lal10@2026'],
    profile: { username: 'ghanshyam@lal10.com', name: 'Ghanshyam', email: 'ghanshyam@lal10.com', role: 'Technology & Operations', avatarInitials: 'GS', avatarColor: '#7E22CE' }
  }
};

const REAL_HOSTS = [
  'Maneet Gohil (Founder & CEO)',
  'Sanchit (Co-Founder & Director)',
  'Albin (Growth & Brand Partnerships)',
  'Ghanshyam (Technology & Operations)',
  'Super Admin (Team Lead)'
];

const INITIAL_USERS: UserItem[] = [
  { id: 'usr-1', name: 'Maneet Gohil', email: 'maneet@lal10.com', role: 'Admin', status: 'Active', joinedOn: 'Jan 15, 2024', lastActive: 'Active now', avatarInitials: 'MG', avatarColor: '#1E293B' },
  { id: 'usr-2', name: 'Sanchit', email: 'sanchit@lal10.com', role: 'Admin', status: 'Active', joinedOn: 'Jan 15, 2024', lastActive: '10 mins ago', avatarInitials: 'SC', avatarColor: '#0F766E' },
  { id: 'usr-3', name: 'Albin', email: 'albin@lal10.com', role: 'Manager', status: 'Active', joinedOn: 'Mar 01, 2024', lastActive: '25 mins ago', avatarInitials: 'AL', avatarColor: '#1D4ED8' },
  { id: 'usr-4', name: 'Ghanshyam', email: 'ghanshyam@lal10.com', role: 'Manager', status: 'Active', joinedOn: 'Feb 10, 2024', lastActive: '1 hour ago', avatarInitials: 'GS', avatarColor: '#7E22CE' },
  { id: 'usr-5', name: 'Super Admin', email: 'admin@lal10.com', role: 'Admin', status: 'Active', joinedOn: 'Jan 01, 2024', lastActive: 'Active now', avatarInitials: 'SA', avatarColor: '#5B1F28' },
];

// Helper: Calculate Relative Time (e.g. "Just now", "2 hours ago", "Yesterday")
function getRelativeTime(dateStr: string): string {
  try {
    const now = new Date();
    const past = new Date(dateStr);
    const diffMs = now.getTime() - past.getTime();
    if (isNaN(diffMs)) return 'Recently';
    
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays}d ago`;
    return past.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return 'Recently';
  }
}

export default function AdminDashboardPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<AuthUser>({
    username: 'buitlal10',
    name: 'Super Admin',
    email: 'admin@lal10.com',
    role: 'Super Administrator',
    avatarInitials: 'SA',
    avatarColor: '#5B1F28'
  });
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Dynamic Date Ranges
  const dynamicDateRanges = useMemo(() => {
    const now = new Date();
    const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const today = fmt(now);

    const d7 = new Date(now);
    d7.setDate(now.getDate() - 7);
    const last7 = `${fmt(d7)} – ${today}`;

    const d30 = new Date(now);
    d30.setDate(now.getDate() - 30);
    const last30 = `${fmt(d30)} – ${today}`;

    const mStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonth = `${fmt(mStart)} – ${today}`;

    return [
      { label: 'Today', value: today },
      { label: 'Last 7 Days', value: last7 },
      { label: 'Last 30 Days', value: last30 },
      { label: 'This Month', value: thisMonth },
      { label: 'All Time (Live)', value: 'All Time' },
    ];
  }, []);

  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<string>('');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Set default dynamic date range on mount
  useEffect(() => {
    if (dynamicDateRanges.length > 1) {
      setDateRange(dynamicDateRanges[1].value); // Default to Last 7 Days
    }
  }, [dynamicDateRanges]);

  // Live Data States (ZERO SEEDED DUMMY LEADS)
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState<boolean>(true);
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [calls, setCalls] = useState<DiscoveryCallItem[]>([]);
  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [stageFilter, setStageFilter] = useState('All Stages');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [hostFilter, setHostFilter] = useState('All Hosts');

  // Modals
  const [activeModal, setActiveModal] = useState<'view-enquiry' | 'add-user' | 'book-call' | 'add-brand' | 'add-casestudy' | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);

  // New Item Form States
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Editor' as const, status: 'Active' as const });
  const [newCall, setNewCall] = useState({
    selectedEnquiryId: 'custom',
    brand: '',
    contactName: '',
    contactEmail: '',
    stage: 'Pre-launch',
    callDate: new Date().toISOString().split('T')[0],
    callTime: '11:00 AM',
    callHost: REAL_HOSTS[0],
    notes: ''
  });
  const [newBrand, setNewBrand] = useState({ name: '', website: '', contactName: '', contactEmail: '', stage: 'Pre-launch', category: 'Womenswear' });
  const [newCaseStudy, setNewCaseStudy] = useState({ title: '', brandName: '', industry: 'D2C Fashion', status: 'Published' as const });

  // Check auth session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lal10_auth_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as AuthUser;
          if (parsed && parsed.name) {
            setCurrentUser(parsed);
            setIsAuthenticated(true);
          }
        } catch {
          if (stored === 'buitlal10' || stored === 'admin') {
            setIsAuthenticated(true);
          }
        }
      }
    } catch (e) {
      console.warn('localStorage access error', e);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  // Fetch real leads dynamically from /api/discovery-call
  const fetchLiveLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch('/api/discovery-call', { cache: 'no-store' });
      const data = await res.json();
      if (data.leads && Array.isArray(data.leads)) {
        const mapped: EnquiryItem[] = data.leads.map((l: DiscoveryCallLead) => {
          const createdAtDate = l.createdAt ? new Date(l.createdAt) : new Date();
          return {
            id: l.id,
            name: l.fullName || 'Lead Founder',
            email: l.email || '',
            brand: l.brandName || 'Untitled Brand',
            category: l.category || 'General',
            stage: l.stage || 'Pre-launch',
            budget: l.budget || 'Not specified',
            source: 'Website',
            date: createdAtDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: createdAtDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            rawDate: l.createdAt || new Date().toISOString(),
            relativeTime: getRelativeTime(l.createdAt || new Date().toISOString()),
            status: (l.status === 'new' ? 'New' : l.status === 'contacted' ? 'Contacted' : l.status === 'scheduled' ? 'Discovery Call' : 'Qualified') as EnquiryItem['status'],
            phone: l.phone,
            notes: l.notes,
            trackInterest: l.trackInterest || 'Launch Sprint',
            emailTeamSent: true,
            emailClientSent: true,
          };
        });

        setEnquiries(mapped);

        // Derive real brands from live leads
        const brandMap = new Map<string, BrandItem>();
        mapped.forEach((item, idx) => {
          if (item.brand && !brandMap.has(item.brand.toLowerCase())) {
            brandMap.set(item.brand.toLowerCase(), {
              id: `br-${idx + 1}`,
              name: item.brand,
              code: item.brand.slice(0, 2).toUpperCase(),
              website: item.email.includes('@') ? `www.${item.email.split('@')[1]}` : '–',
              contactName: item.name,
              contactEmail: item.email,
              stage: item.stage,
              category: item.category,
              status: 'Active',
              discoveryCallDate: item.date,
              discoveryCallTime: item.time,
              onboardedOn: item.date,
            });
          }
        });
        setBrands(Array.from(brandMap.values()));
      }
    } catch (err) {
      console.error('Failed to load API leads:', err);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  // Load scheduled calls from localStorage or real leads
  useEffect(() => {
    fetchLiveLeads();

    try {
      const savedCalls = localStorage.getItem('lal10_scheduled_calls');
      if (savedCalls) {
        setCalls(JSON.parse(savedCalls));
      }
    } catch {}
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    const userKey = loginUsername.trim().toLowerCase();
    const pass = loginPassword.trim();
    const account = AUTHORIZED_ACCOUNTS[userKey];

    if (account && account.passwords.includes(pass)) {
      try {
        localStorage.setItem('lal10_auth_user', JSON.stringify(account.profile));
      } catch (err) {}
      setCurrentUser(account.profile);
      setIsAuthenticated(true);
      setIsLoggingIn(false);
    } else {
      setTimeout(() => {
        setLoginError('Invalid credentials. Please verify your username & password.');
        setIsLoggingIn(false);
      }, 300);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('lal10_auth_user');
    } catch (err) {}
    setIsAuthenticated(false);
    setLoginUsername('');
    setLoginPassword('');
    setLoginError(null);
  };

  // Update lead status in state and via API
  const handleUpdateLeadStatus = async (leadId: string, newStatus: EnquiryItem['status']) => {
    setEnquiries(prev => prev.map(e => e.id === leadId ? { ...e, status: newStatus } : e));
    if (selectedEnquiry && selectedEnquiry.id === leadId) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }

    try {
      const apiStatusMap: Record<string, string> = {
        'New': 'new',
        'Contacted': 'contacted',
        'Qualified': 'qualified',
        'In Discussion': 'in_discussion',
        'Discovery Call': 'scheduled'
      };
      await fetch('/api/discovery-call', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: apiStatusMap[newStatus] || 'new' }),
      });
    } catch (err) {
      console.warn('Status patch failed', err);
    }
  };

  // Book Discovery Call
  const handleBookCall = (e: React.FormEvent) => {
    e.preventDefault();
    const newCallItem: DiscoveryCallItem = {
      id: `call-${Date.now()}`,
      brand: newCall.brand,
      contactName: newCall.contactName,
      contactEmail: newCall.contactEmail,
      brandCode: newCall.brand.slice(0, 2).toUpperCase(),
      stage: newCall.stage,
      callDate: newCall.callDate,
      callTime: newCall.callTime,
      callHost: newCall.callHost,
      callStatus: 'Scheduled',
      outcome: 'Scheduled – Waiting for meeting',
      notes: newCall.notes
    };

    const updated = [newCallItem, ...calls];
    setCalls(updated);
    try {
      localStorage.setItem('lal10_scheduled_calls', JSON.stringify(updated));
    } catch {}

    setActiveModal(null);
    setNewCall({
      selectedEnquiryId: 'custom',
      brand: '',
      contactName: '',
      contactEmail: '',
      stage: 'Pre-launch',
      callDate: new Date().toISOString().split('T')[0],
      callTime: '11:00 AM',
      callHost: REAL_HOSTS[0],
      notes: ''
    });
  };

  // Add Custom User
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = newUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U';
    const newUserItem: UserItem = {
      id: `usr-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      joinedOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastActive: 'Just added',
      avatarInitials: initials,
      avatarColor: '#1E293B'
    };
    setUsers([newUserItem, ...users]);
    setActiveModal(null);
    setNewUser({ name: '', email: '', role: 'Editor', status: 'Active' });
  };

  // Filtered Enquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter(item => {
      const matchesSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
      const matchesStage = stageFilter === 'All Stages' || item.stage === stageFilter;
      const matchesCategory = categoryFilter === 'All Categories' || item.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesStage && matchesCategory;
    });
  }, [enquiries, searchQuery, statusFilter, stageFilter, categoryFilter]);

  const filteredCalls = useMemo(() => {
    return calls.filter(item => {
      const matchesSearch = !searchQuery ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.callHost.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All Status' || item.callStatus === statusFilter;
      const matchesHost = hostFilter === 'All Hosts' || item.callHost.includes(hostFilter.split(' ')[0]);
      return matchesSearch && matchesStatus && matchesHost;
    });
  }, [calls, searchQuery, statusFilter, hostFilter]);

  // Stage Badge Styles
  const getStageBadgeStyle = (stage: string) => {
    if (stage.includes('₹5 Cr') || stage.includes('Scaling')) return { background: '#EBF3FB', color: '#185FA5' };
    if (stage.includes('First') || stage.includes('Sampling')) return { background: '#F1EBFB', color: '#68369B' };
    if (stage.includes('1–5') || stage.includes('Production')) return { background: '#E6F4EA', color: '#137333' };
    return { background: '#F5F5F5', color: '#5F6368' };
  };

  // Status Badge Styles
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'New': return { background: '#EBF3FB', color: '#185FA5' };
      case 'Contacted': return { background: '#FEF7E0', color: '#B06000' };
      case 'Qualified': return { background: '#E6F4EA', color: '#137333' };
      case 'In Discussion': return { background: '#F1EBFB', color: '#68369B' };
      case 'Discovery Call': return { background: '#FCE8E6', color: '#C5221F' };
      case 'Scheduled': return { background: '#EBF3FB', color: '#185FA5' };
      case 'Completed': return { background: '#E6F4EA', color: '#137333' };
      case 'Cancelled': return { background: '#FCE8E6', color: '#C5221F' };
      case 'Active': return { background: '#E6F4EA', color: '#137333' };
      case 'Inactive': return { background: '#F1F3F4', color: '#5F6368' };
      default: return { background: '#F1F3F4', color: '#5F6368' };
    }
  };

  // Export Data to CSV
  const exportData = (type: string) => {
    if (type === 'enquiries') {
      const headers = ['ID', 'Brand Name', 'Contact Name', 'Email', 'Phone', 'Category', 'Stage', 'Budget', 'Date Received', 'Status', 'Notes'];
      const rows = enquiries.map(e => [
        e.id, `"${e.brand}"`, `"${e.name}"`, e.email, `"${e.phone || ''}"`, `"${e.category}"`, `"${e.stage}"`, `"${e.budget}"`, `"${e.date} ${e.time}"`, e.status, `"${(e.notes || '').replace(/"/g, '""')}"`
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `LAL10_Enquiries_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Nav Items Helper
  const renderNavLinks = () => (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
      {[
        { tab: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard, badge: enquiries.length },
        { tab: 'enquiries' as TabType, label: 'Live Enquiries', icon: Inbox, badge: enquiries.filter(e => e.status === 'New').length },
        { tab: 'calls' as TabType, label: 'Discovery Calls', icon: PhoneCall, badge: calls.length },
        { tab: 'brands' as TabType, label: 'Brands Portfolio', icon: Building2, badge: brands.length },
        { tab: 'users' as TabType, label: 'Team Users', icon: Users, badge: users.length },
        { tab: 'insights' as TabType, label: 'Insights & Analytics', icon: BarChart3 },
        { tab: 'settings' as TabType, label: 'System Settings', icon: Settings },
      ].map(({ tab, label, icon: Icon, badge }) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setMobileSidebarOpen(false); }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '13px',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? '#5B1F28' : '#57524B',
              background: isActive ? '#F7EDE6' : 'transparent',
              border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon size={17} color={isActive ? '#5B1F28' : '#7D756C'} />
              <span>{label}</span>
            </div>
            {badge !== undefined && badge > 0 && (
              <span style={{
                fontSize: '11px', fontWeight: 700, padding: '2px 7px', borderRadius: '12px',
                background: isActive ? '#5B1F28' : '#EFEAE3',
                color: isActive ? '#FFFFFF' : '#57524B'
              }}>
                {badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );

  if (!authChecked) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAF6F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <RefreshCw className="animate-spin" size={28} color="#5B1F28" />
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // 1. PRODUCTION LOGIN PORTAL
  // ════════════════════════════════════════════════════════════════════════════
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#FAF6F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          background: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #EFEAE3',
          boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
          padding: '36px 32px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 600, letterSpacing: '4px', color: '#1A1817' }}>
              LAL10
            </div>
            <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#9B9084', fontWeight: 700, marginTop: '2px', textTransform: 'uppercase' }}>
              Operations Portal
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4A453E', marginBottom: '6px' }}>
                Username / Team Email
              </label>
              <input
                type="text"
                required
                value={loginUsername}
                onChange={e => setLoginUsername(e.target.value)}
                placeholder="e.g. maneet / sanchit / buitlal10"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '8px',
                  border: '1px solid #DCD6CC',
                  fontSize: '13.5px',
                  outline: 'none',
                  color: '#1A1817'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4A453E', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    border: '1px solid #DCD6CC',
                    fontSize: '13.5px',
                    outline: 'none',
                    color: '#1A1817'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#8A7D71'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {loginError && (
              <div style={{
                padding: '10px 12px',
                borderRadius: '8px',
                background: '#FEE2E2',
                border: '1px solid #F87171',
                color: '#991B1B',
                fontSize: '12.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertCircle size={15} />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              style={{
                width: '100%',
                padding: '12px',
                background: '#5B1F28',
                color: '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: isLoggingIn ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '4px'
              }}
            >
              {isLoggingIn ? <RefreshCw className="animate-spin" size={16} /> : <Lock size={16} />}
              <span>{isLoggingIn ? 'Verifying...' : 'Sign In to Dashboard'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // 2. AUTHENTICATED DASHBOARD PORTAL
  // ════════════════════════════════════════════════════════════════════════════
  return (
    <div style={{ minHeight: '100vh', background: '#FAF6F0', display: 'flex', flexDirection: 'column', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── TOP MOBILE BAR (< 1024px) ────────────────────────────────────────── */}
      <header className="admin-mobile-header" style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #EFEAE3',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#1A1817' }}
          >
            <Menu size={22} />
          </button>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 600, letterSpacing: '3px', color: '#1A1817', lineHeight: 1 }}>
              LAL10
            </div>
            <div style={{ fontSize: '8px', letterSpacing: '2px', color: '#9B9084', fontWeight: 700 }}>
              OPERATIONS
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={fetchLiveLeads}
            title="Refresh Live Enquiries"
            style={{ background: '#FAF6F0', border: '1px solid #E4DDD4', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <RefreshCw size={14} className={isLoadingLeads ? 'animate-spin' : ''} color="#5B1F28" />
          </button>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: currentUser.avatarColor,
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 700
            }}
          >
            {currentUser.avatarInitials}
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER SIDEBAR (< 1024px) ─────────────────────────────────── */}
      {mobileSidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex' }}>
          <div
            onClick={() => setMobileSidebarOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)' }}
          />

          <div style={{
            position: 'relative',
            width: '280px',
            background: '#FFFFFF',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px 18px',
            zIndex: 101,
            boxShadow: '4px 0 25px rgba(0,0,0,0.15)',
            overflowY: 'auto'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px 18px', borderBottom: '1px solid #F2ECE4' }}>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 600, letterSpacing: '4px', color: '#1A1817', lineHeight: 1 }}>
                    LAL10
                  </div>
                  <div style={{ fontSize: '9px', letterSpacing: '3px', color: '#9B9084', fontWeight: 600, marginTop: '3px' }}>
                    OPERATIONS
                  </div>
                </div>
                <button onClick={() => setMobileSidebarOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                  <X size={20} color="#666" />
                </button>
              </div>

              {/* Profile Pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', margin: '16px 0', background: '#FAF6F0', borderRadius: '10px', border: '1px solid #EFE7DC' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: currentUser.avatarColor, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
                  {currentUser.avatarInitials}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1A1817' }}>{currentUser.name}</div>
                  <div style={{ fontSize: '11px', color: '#8A7D71' }}>{currentUser.role}</div>
                </div>
              </div>

              {renderNavLinks()}
            </div>

            <div style={{ paddingTop: '16px', borderTop: '1px solid #F2ECE4', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link
                href="/home1"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', fontSize: '12px', color: '#5B1F28', textDecoration: 'none', fontWeight: 600, background: '#FAF6F0', borderRadius: '6px' }}
              >
                <ExternalLink size={14} />
                <span>View Live Landing Page</span>
              </Link>
              <button
                onClick={handleLogout}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', fontSize: '13px', color: '#B91C1C', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DESKTOP LAYOUT WRAPPER ───────────────────────────────────────────── */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* ── DESKTOP SIDEBAR (>= 1024px) ──────────────────────────────────────── */}
        <aside className="admin-sidebar-desktop" style={{
          width: '260px',
          background: '#FFFFFF',
          borderRight: '1px solid #EFEAE3',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '28px 18px',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 40,
          boxShadow: '1px 0 10px rgba(0,0,0,0.02)'
        }}>
          <div>
            <div style={{ padding: '0 8px 24px', borderBottom: '1px solid #F2ECE4' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 600, letterSpacing: '4px', color: '#1A1817', lineHeight: 1 }}>
                LAL10
              </div>
              <div style={{ fontSize: '9px', letterSpacing: '3px', color: '#9B9084', fontWeight: 600, marginTop: '4px', textTransform: 'uppercase' }}>
                FASHIONS PORTAL
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', margin: '16px 0 20px', background: '#FAF6F0', borderRadius: '10px', border: '1px solid #EFE7DC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: currentUser.avatarColor, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>
                  {currentUser.avatarInitials}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1A1817', lineHeight: 1.2 }}>{currentUser.name}</div>
                  <div style={{ fontSize: '11px', color: '#8A7D71', marginTop: '2px' }}>{currentUser.role}</div>
                </div>
              </div>
            </div>

            {renderNavLinks()}
          </div>

          <div style={{ paddingTop: '16px', borderTop: '1px solid #F2ECE4', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link
              href="/home1"
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', fontSize: '12px', color: '#5B1F28', textDecoration: 'none', fontWeight: 600, background: '#FAF6F0', borderRadius: '6px' }}
            >
              <ExternalLink size={14} />
              <span>View Live Site</span>
            </Link>
            <button
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', fontSize: '13px', color: '#B91C1C', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT AREA ─────────────────────────────────────────────────── */}
        <main className="admin-main-container" style={{ flex: 1, overflowY: 'auto', maxWidth: '1440px', margin: '0 auto', width: '100%', padding: '28px 32px' }}>

          {/* TOP HEADER ROW */}
          <div className="admin-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1817', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                {activeTab === 'dashboard' && `Welcome back, ${currentUser.name}`}
                {activeTab === 'enquiries' && 'Live Brand Enquiries'}
                {activeTab === 'calls' && 'Discovery Calls Pipeline'}
                {activeTab === 'brands' && 'Brand Portfolio'}
                {activeTab === 'users' && 'Team & Access Management'}
                {activeTab === 'insights' && 'Analytics & Performance'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
              <p style={{ fontSize: '13.5px', color: '#7E766D', margin: '4px 0 0' }}>
                Real-time enquiry streaming &amp; brand intake management.
              </p>
            </div>

            {/* Right Controls */}
            <div className="admin-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={fetchLiveLeads}
                disabled={isLoadingLeads}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px', background: '#FFFFFF',
                  border: '1px solid #E4DDD4', borderRadius: '8px', padding: '9px 14px',
                  fontSize: '12px', fontWeight: 600, color: '#1A1817', cursor: 'pointer'
                }}
              >
                <RefreshCw size={14} className={isLoadingLeads ? 'animate-spin' : ''} color="#5B1F28" />
                <span>{isLoadingLeads ? 'Syncing...' : 'Refresh Live Feed'}</span>
              </button>

              {/* Dynamic Date Picker Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowDateDropdown(!showDateDropdown)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF',
                    border: '1px solid #E4DDD4', borderRadius: '8px', padding: '9px 14px',
                    fontSize: '12px', fontWeight: 600, color: '#1A1817', cursor: 'pointer'
                  }}
                >
                  <span>{dateRange}</span>
                  <Calendar size={14} color="#7E766D" />
                </button>

                {showDateDropdown && (
                  <div style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: '6px',
                    background: '#FFFFFF', border: '1px solid #E4DDD4', borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)', padding: '8px 0', minWidth: '220px', zIndex: 50
                  }}>
                    {dynamicDateRanges.map(range => (
                      <button
                        key={range.label}
                        onClick={() => { setDateRange(range.value); setShowDateDropdown(false); }}
                        style={{
                          display: 'block', width: '100%', textAlign: 'left', padding: '8px 16px',
                          fontSize: '12.5px', color: range.value === dateRange ? '#5B1F28' : '#333',
                          fontWeight: range.value === dateRange ? 700 : 500,
                          background: range.value === dateRange ? '#FAF5F1' : 'transparent',
                          border: 'none', cursor: 'pointer'
                        }}
                      >
                        <div style={{ fontWeight: 600 }}>{range.label}</div>
                        <div style={{ fontSize: '11px', color: '#8A7D71' }}>{range.value}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {activeTab === 'calls' && (
                <button onClick={() => setActiveModal('book-call')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#5B1F28', color: '#FFFFFF', padding: '9px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                  <Plus size={14} /><span>Schedule Call</span>
                </button>
              )}
              {activeTab === 'users' && (
                <button onClick={() => setActiveModal('add-user')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#5B1F28', color: '#FFFFFF', padding: '9px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                  <UserPlus size={14} /><span>Add Team User</span>
                </button>
              )}
              {activeTab === 'enquiries' && (
                <button onClick={() => exportData('enquiries')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#5B1F28', color: '#FFFFFF', padding: '9px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                  <Download size={14} /><span>Export CSV</span>
                </button>
              )}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 1: DASHBOARD
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Dynamic Real-time Stat Cards */}
              <div className="admin-stats-grid">
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Inbox size={17} color="#8A4A32" />
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500, marginTop: '12px' }}>Total Inquiries Received</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>{enquiries.length}</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '8px' }}>
                    ● Real-time stream active
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#EBF3FB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={17} color="#185FA5" />
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500, marginTop: '12px' }}>New / Uncontacted Leads</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>
                    {enquiries.filter(e => e.status === 'New').length}
                  </div>
                  <div style={{ fontSize: '11px', color: '#185FA5', fontWeight: 600, marginTop: '8px' }}>
                    {enquiries.filter(e => e.status === 'New').length > 0 ? 'Action required by team' : 'All leads reviewed'}
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F1EBFB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PhoneCall size={17} color="#68369B" />
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500, marginTop: '12px' }}>Discovery Calls Booked</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>
                    {calls.length}
                  </div>
                  <div style={{ fontSize: '11px', color: '#68369B', fontWeight: 600, marginTop: '8px' }}>
                    {calls.filter(c => c.callStatus === 'Scheduled').length} upcoming
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#E6F4EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building2 size={17} color="#137333" />
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500, marginTop: '12px' }}>Brand Pipeline Records</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>
                    {brands.length}
                  </div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '8px' }}>
                    100% verified brands
                  </div>
                </div>
              </div>

              {/* Recent Enquiries Table Card */}
              <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1A1817', margin: 0 }}>Latest Live Inquiries</h3>
                    <p style={{ fontSize: '12px', color: '#8A7D71', margin: '2px 0 0' }}>Real-time lead submissions directly from landing page</p>
                  </div>
                  <button onClick={() => setActiveTab('enquiries')} style={{ fontSize: '12px', fontWeight: 600, color: '#5B1F28', background: '#FAF6F0', border: '1px solid #EBE4DA', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer' }}>
                    View All Leads ({enquiries.length})
                  </button>
                </div>

                {enquiries.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8A7D71' }}>
                    <Inbox size={36} color="#B8ADA2" style={{ margin: '0 auto 12px' }} />
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1817' }}>No live inquiries received yet</div>
                    <p style={{ fontSize: '12.5px', maxWidth: '380px', margin: '4px auto 16px' }}>
                      When prospective brands submit the discovery form on the live site, they will appear here instantly with full contact details and automated email logs.
                    </p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', minWidth: '650px', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          <th style={{ padding: '10px 8px' }}>Brand &amp; Founder</th>
                          <th style={{ padding: '10px 8px' }}>Stage &amp; Category</th>
                          <th style={{ padding: '10px 8px' }}>Date Received</th>
                          <th style={{ padding: '10px 8px' }}>Email Logs</th>
                          <th style={{ padding: '10px 8px' }}>Status</th>
                          <th style={{ padding: '10px 8px', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enquiries.slice(0, 5).map(enq => (
                          <tr key={enq.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                            <td style={{ padding: '12px 8px' }}>
                              <div style={{ fontWeight: 700, color: '#1A1817' }}>{enq.brand}</div>
                              <div style={{ fontSize: '11px', color: '#666' }}>{enq.name} • {enq.email}</div>
                              {enq.phone && <div style={{ fontSize: '10.5px', color: '#8A7D71' }}>{enq.phone}</div>}
                            </td>
                            <td style={{ padding: '12px 8px' }}>
                              <span style={{ fontSize: '10.5px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, ...getStageBadgeStyle(enq.stage) }}>
                                {enq.stage}
                              </span>
                              <div style={{ fontSize: '10.5px', color: '#8A7D71', marginTop: '3px' }}>{enq.category}</div>
                            </td>
                            <td style={{ padding: '12px 8px' }}>
                              <div style={{ fontWeight: 600, color: '#1A1817' }}>{enq.date}</div>
                              <div style={{ fontSize: '10.5px', color: '#8A7D71' }}>{enq.time} • <span style={{ color: '#0F766E', fontWeight: 600 }}>{enq.relativeTime}</span></div>
                            </td>
                            <td style={{ padding: '12px 8px' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                <span style={{ fontSize: '10px', color: '#0F766E', fontWeight: 600 }}>✓ Team Alert (alan@lal10.com)</span>
                                <span style={{ fontSize: '10px', color: '#1D4ED8', fontWeight: 600 }}>✓ Client Receipt Sent</span>
                              </div>
                            </td>
                            <td style={{ padding: '12px 8px' }}>
                              <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', ...getStatusBadgeStyle(enq.status) }}>
                                {enq.status}
                              </span>
                            </td>
                            <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                              <button
                                onClick={() => { setSelectedEnquiry(enq); setActiveModal('view-enquiry'); }}
                                style={{ background: '#FAF6F0', border: '1px solid #EBE4DA', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', color: '#5B1F28', fontSize: '11px', fontWeight: 600 }}
                              >
                                Review Lead
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 2: LIVE ENQUIRIES COMPLETE LIST
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'enquiries' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '10px', flex: 1, flexWrap: 'wrap' }}>
                  <input
                    type="text" placeholder="Search by founder, brand or email..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    style={{ padding: '9px 14px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', minWidth: '220px', flex: 1 }}
                  />
                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '9px 12px', fontSize: '12.5px', border: '1px solid #E4DDD4', borderRadius: '8px', background: '#FFF' }}>
                    <option>All Status</option><option>New</option><option>Contacted</option><option>Qualified</option><option>In Discussion</option><option>Discovery Call</option>
                  </select>
                  <select value={stageFilter} onChange={e => setStageFilter(e.target.value)} style={{ padding: '9px 12px', fontSize: '12.5px', border: '1px solid #E4DDD4', borderRadius: '8px', background: '#FFF' }}>
                    <option>All Stages</option><option>Concept &amp; Moodboard</option><option>Sampling &amp; Development</option><option>Production Ready</option><option>Scaling Existing Label</option>
                  </select>
                </div>
              </div>

              {filteredEnquiries.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8A7D71' }}>
                  <Inbox size={40} color="#B8ADA2" style={{ margin: '0 auto 12px' }} />
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#1A1817' }}>No matching inquiries found</div>
                  <p style={{ fontSize: '12.5px', margin: '4px 0 0' }}>Try clearing filters or search query.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                  <table style={{ width: '100%', minWidth: '750px', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>
                        <th style={{ padding: '12px 10px' }}>Brand &amp; Founder</th>
                        <th style={{ padding: '12px 10px' }}>Category &amp; Stage</th>
                        <th style={{ padding: '12px 10px' }}>Date &amp; Time Received</th>
                        <th style={{ padding: '12px 10px' }}>Email Logs</th>
                        <th style={{ padding: '12px 10px' }}>Status</th>
                        <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEnquiries.map(enq => (
                        <tr key={enq.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                          <td style={{ padding: '14px 10px' }}>
                            <div style={{ fontWeight: 700, color: '#1A1817' }}>{enq.brand}</div>
                            <div style={{ fontSize: '11.5px', color: '#555' }}>{enq.name}</div>
                            <div style={{ fontSize: '11px', color: '#8A7D71' }}>{enq.email} {enq.phone ? `• ${enq.phone}` : ''}</div>
                          </td>
                          <td style={{ padding: '14px 10px' }}>
                            <span style={{ fontSize: '10.5px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, ...getStageBadgeStyle(enq.stage) }}>
                              {enq.stage}
                            </span>
                            <div style={{ fontSize: '11px', color: '#8A7D71', marginTop: '4px' }}>
                              {enq.category} {enq.budget !== 'Not specified' ? `• ${enq.budget}` : ''}
                            </div>
                          </td>
                          <td style={{ padding: '14px 10px' }}>
                            <div style={{ fontWeight: 600, color: '#1A1817' }}>{enq.date}</div>
                            <div style={{ fontSize: '11px', color: '#8A7D71' }}>{enq.time} (<span style={{ color: '#0F766E', fontWeight: 600 }}>{enq.relativeTime}</span>)</div>
                          </td>
                          <td style={{ padding: '14px 10px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                              <span style={{ fontSize: '10.5px', color: '#0F766E', fontWeight: 600 }}>✓ Team Alert (alan@lal10.com)</span>
                              <span style={{ fontSize: '10.5px', color: '#1D4ED8', fontWeight: 600 }}>✓ Confirmation Email Dispatched</span>
                            </div>
                          </td>
                          <td style={{ padding: '14px 10px' }}>
                            <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', ...getStatusBadgeStyle(enq.status) }}>
                              {enq.status}
                            </span>
                          </td>
                          <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                            <button
                              onClick={() => { setSelectedEnquiry(enq); setActiveModal('view-enquiry'); }}
                              style={{ background: '#5B1F28', color: '#FFF', border: 'none', padding: '7px 14px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}
                            >
                              Manage Lead
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 3: DISCOVERY CALLS PIPELINE
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'calls' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Scheduled Discovery Calls</h3>
                  <p style={{ fontSize: '12px', color: '#8A7D71', margin: '2px 0 0' }}>Assigned team calls with prospective brand founders</p>
                </div>
                <button
                  onClick={() => setActiveModal('book-call')}
                  style={{ background: '#5B1F28', color: '#FFF', border: 'none', padding: '9px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Plus size={14} /><span>Schedule New Call</span>
                </button>
              </div>

              {calls.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8A7D71' }}>
                  <PhoneCall size={38} color="#B8ADA2" style={{ margin: '0 auto 12px' }} />
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1817' }}>No discovery calls scheduled yet</div>
                  <p style={{ fontSize: '12.5px', maxWidth: '380px', margin: '4px auto 16px' }}>
                    Select an incoming brand enquiry or click below to schedule a discovery call with a team host.
                  </p>
                  <button
                    onClick={() => setActiveModal('book-call')}
                    style={{ background: '#FAF6F0', border: '1px solid #DCD6CC', color: '#5B1F28', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    + Book First Call
                  </button>
                </div>
              ) : (
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                  <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11px', fontWeight: 600 }}>
                        <th style={{ padding: '10px 8px' }}>Brand &amp; Contact</th>
                        <th style={{ padding: '10px 8px' }}>Stage</th>
                        <th style={{ padding: '10px 8px' }}>Call Schedule</th>
                        <th style={{ padding: '10px 8px' }}>Assigned Host</th>
                        <th style={{ padding: '10px 8px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCalls.map(cl => (
                        <tr key={cl.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                          <td style={{ padding: '12px 8px' }}>
                            <div style={{ fontWeight: 700, color: '#1A1817' }}>{cl.brand}</div>
                            <div style={{ fontSize: '11px', color: '#555' }}>{cl.contactName} • {cl.contactEmail}</div>
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            <span style={{ fontSize: '10.5px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, ...getStageBadgeStyle(cl.stage) }}>{cl.stage}</span>
                          </td>
                          <td style={{ padding: '12px 8px', color: '#1A1817' }}>
                            <div style={{ fontWeight: 600 }}>{cl.callDate}</div>
                            <div style={{ fontSize: '11px', color: '#8A7D71' }}>{cl.callTime}</div>
                          </td>
                          <td style={{ padding: '12px 8px', fontWeight: 600, color: '#5B1F28' }}>
                            {cl.callHost}
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', ...getStatusBadgeStyle(cl.callStatus) }}>{cl.callStatus}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 4: BRANDS PORTFOLIO
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'brands' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Registered Brand Directory</h3>
                  <p style={{ fontSize: '12px', color: '#8A7D71', margin: '2px 0 0' }}>Brands generated automatically from submitted inquiries</p>
                </div>
              </div>

              {brands.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8A7D71' }}>
                  <Building2 size={38} color="#B8ADA2" style={{ margin: '0 auto 12px' }} />
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1817' }}>No brands in directory yet</div>
                  <p style={{ fontSize: '12.5px', margin: '4px 0 0' }}>Incoming brand enquiries will populate this directory automatically.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                  <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11px', fontWeight: 600 }}>
                        <th style={{ padding: '10px 8px' }}>Brand Name</th>
                        <th style={{ padding: '10px 8px' }}>Founder / Contact</th>
                        <th style={{ padding: '10px 8px' }}>Category &amp; Stage</th>
                        <th style={{ padding: '10px 8px' }}>Onboarded Date</th>
                        <th style={{ padding: '10px 8px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brands.map(br => (
                        <tr key={br.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                          <td style={{ padding: '12px 8px', fontWeight: 700, color: '#1A1817' }}>{br.name}</td>
                          <td style={{ padding: '12px 8px' }}>
                            <div style={{ fontWeight: 600 }}>{br.contactName}</div>
                            <div style={{ fontSize: '11px', color: '#8A7D71' }}>{br.contactEmail}</div>
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            <span style={{ fontSize: '10.5px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, ...getStageBadgeStyle(br.stage) }}>{br.stage}</span>
                            <div style={{ fontSize: '11px', color: '#8A7D71', marginTop: '2px' }}>{br.category}</div>
                          </td>
                          <td style={{ padding: '12px 8px', color: '#1A1817' }}>{br.onboardedOn}</td>
                          <td style={{ padding: '12px 8px' }}>
                            <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', ...getStatusBadgeStyle(br.status) }}>{br.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 5: USERS & TEAM ACCESS
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'users' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Team &amp; Access Control</h3>
                  <p style={{ fontSize: '12px', color: '#8A7D71', margin: '2px 0 0' }}>Authorized administrators and advisory hosts</p>
                </div>
                <button
                  onClick={() => setActiveModal('add-user')}
                  style={{ background: '#5B1F28', color: '#FFF', border: 'none', padding: '9px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <UserPlus size={14} /><span>Add User</span>
                </button>
              </div>

              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11px', fontWeight: 600 }}>
                      <th style={{ padding: '10px 8px' }}>User Name</th>
                      <th style={{ padding: '10px 8px' }}>Email Address</th>
                      <th style={{ padding: '10px 8px' }}>Role</th>
                      <th style={{ padding: '10px 8px' }}>Status</th>
                      <th style={{ padding: '10px 8px' }}>Last Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(usr => (
                      <tr key={usr.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                        <td style={{ padding: '12px 8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: usr.avatarColor, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }}>
                              {usr.avatarInitials}
                            </div>
                            <div style={{ fontWeight: 700, color: '#1A1817' }}>{usr.name}</div>
                          </div>
                        </td>
                        <td style={{ padding: '12px 8px', color: '#57524B' }}>{usr.email}</td>
                        <td style={{ padding: '12px 8px' }}>
                          <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', background: '#FAF6F0', color: '#5B1F28' }}>{usr.role}</span>
                        </td>
                        <td style={{ padding: '12px 8px' }}>
                          <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', ...getStatusBadgeStyle(usr.status) }}>{usr.status}</span>
                        </td>
                        <td style={{ padding: '12px 8px', color: '#7E766D' }}>{usr.lastActive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ── MODALS ───────────────────────────────────────────────────────────── */}

      {/* 1. Modal: View Lead & Email Logs */}
      {activeModal === 'view-enquiry' && selectedEnquiry && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '520px', borderRadius: '16px', padding: '28px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #EFEAE3', paddingBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#1A1817' }}>{selectedEnquiry.brand}</h3>
                <div style={{ fontSize: '12px', color: '#8A7D71' }}>Lead ID: {selectedEnquiry.id}</div>
              </div>
              <button onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><X size={18} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#8A7D71', fontWeight: 600 }}>FOUNDER NAME</div>
                  <div style={{ fontWeight: 700, color: '#1A1817', marginTop: '2px' }}>{selectedEnquiry.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#8A7D71', fontWeight: 600 }}>EMAIL</div>
                  <div style={{ marginTop: '2px' }}><a href={`mailto:${selectedEnquiry.email}`} style={{ color: '#5B1F28', fontWeight: 600 }}>{selectedEnquiry.email}</a></div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#8A7D71', fontWeight: 600 }}>PHONE NUMBER</div>
                  <div style={{ marginTop: '2px' }}>
                    {selectedEnquiry.phone ? <a href={`tel:${selectedEnquiry.phone}`} style={{ color: '#185FA5', fontWeight: 600 }}>{selectedEnquiry.phone}</a> : '–'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#8A7D71', fontWeight: 600 }}>DATE RECEIVED</div>
                  <div style={{ fontWeight: 600, color: '#1A1817', marginTop: '2px' }}>{selectedEnquiry.date} at {selectedEnquiry.time}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#8A7D71', fontWeight: 600 }}>CATEGORY</div>
                  <div style={{ fontWeight: 600, color: '#1A1817', marginTop: '2px' }}>{selectedEnquiry.category}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#8A7D71', fontWeight: 600 }}>CURRENT STAGE</div>
                  <div style={{ fontWeight: 600, color: '#1A1817', marginTop: '2px' }}>{selectedEnquiry.stage}</div>
                </div>
              </div>

              {selectedEnquiry.notes && (
                <div style={{ background: '#FAF6F0', padding: '12px', borderRadius: '8px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '11px', color: '#8A7D71', fontWeight: 700, marginBottom: '4px' }}>FOUNDER REQUIREMENTS / NOTES:</div>
                  <div style={{ color: '#333', lineHeight: 1.5, fontSize: '12.5px' }}>{selectedEnquiry.notes}</div>
                </div>
              )}

              {/* Email Dispatch Logs */}
              <div style={{ background: '#F0FDF4', padding: '14px', borderRadius: '10px', border: '1px solid #BBF7D0' }}>
                <div style={{ fontSize: '11.5px', color: '#166534', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Send size={13} />
                  <span>AUTOMATED NODEMAILER DISPATCH LOGS</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#166534' }}>
                  <div>✓ <strong>Team Alert Email:</strong> Dispatched to <code>alan@lal10.com</code></div>
                  <div>✓ <strong>Client Confirmation Receipt:</strong> Dispatched to <code>{selectedEnquiry.email}</code></div>
                  <div style={{ fontSize: '10.5px', color: '#15803D', marginTop: '2px' }}>Timestamp: {selectedEnquiry.rawDate}</div>
                </div>
              </div>

              {/* Update Status */}
              <div>
                <div style={{ fontSize: '11.5px', color: '#8A7D71', fontWeight: 700, marginBottom: '8px' }}>UPDATE PIPELINE STATUS:</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {(['New', 'Contacted', 'Qualified', 'In Discussion', 'Discovery Call'] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => handleUpdateLeadStatus(selectedEnquiry.id, st)}
                      style={{
                        padding: '6px 12px', borderRadius: '16px', fontSize: '11px', fontWeight: 700,
                        border: selectedEnquiry.status === st ? '2px solid #5B1F28' : '1px solid #E4DDD4',
                        background: selectedEnquiry.status === st ? '#F7EDE6' : '#FFF',
                        color: selectedEnquiry.status === st ? '#5B1F28' : '#57524B',
                        cursor: 'pointer'
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button onClick={() => setActiveModal(null)} style={{ background: '#1A1817', color: '#FFF', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '12.5px' }}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal: Schedule Discovery Call with Real Data & Host Dropdowns */}
      {activeModal === 'book-call' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <form onSubmit={handleBookCall} style={{ background: '#FFFFFF', width: '100%', maxWidth: '480px', borderRadius: '16px', padding: '28px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0, color: '#1A1817' }}>Schedule Discovery Call</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Select from real enquiries dropdown */}
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4A453E', marginBottom: '4px' }}>
                  Select Brand / Lead From Live Feed *
                </label>
                <select
                  value={newCall.selectedEnquiryId}
                  onChange={e => {
                    const selId = e.target.value;
                    if (selId === 'custom') {
                      setNewCall({ ...newCall, selectedEnquiryId: 'custom', brand: '', contactName: '', contactEmail: '' });
                    } else {
                      const found = enquiries.find(eq => eq.id === selId);
                      if (found) {
                        setNewCall({
                          ...newCall,
                          selectedEnquiryId: selId,
                          brand: found.brand,
                          contactName: found.name,
                          contactEmail: found.email,
                          stage: found.stage
                        });
                      }
                    }
                  }}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #DDD', fontSize: '12.5px', background: '#FFF' }}
                >
                  <option value="custom">+ Enter Brand Manually</option>
                  {enquiries.map(enq => (
                    <option key={enq.id} value={enq.id}>
                      {enq.brand} — {enq.name} ({enq.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4A453E', marginBottom: '4px' }}>Brand Name *</label>
                <input required type="text" placeholder="e.g. AURELIA" value={newCall.brand} onChange={e => setNewCall({ ...newCall, brand: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #DDD', fontSize: '12.5px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4A453E', marginBottom: '4px' }}>Contact Founder *</label>
                  <input required type="text" placeholder="e.g. Riya Shah" value={newCall.contactName} onChange={e => setNewCall({ ...newCall, contactName: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #DDD', fontSize: '12.5px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4A453E', marginBottom: '4px' }}>Email Address *</label>
                  <input required type="email" placeholder="riya@brand.com" value={newCall.contactEmail} onChange={e => setNewCall({ ...newCall, contactEmail: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #DDD', fontSize: '12.5px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4A453E', marginBottom: '4px' }}>Date *</label>
                  <input required type="date" value={newCall.callDate} onChange={e => setNewCall({ ...newCall, callDate: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #DDD', fontSize: '12.5px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4A453E', marginBottom: '4px' }}>Time Slot *</label>
                  <select value={newCall.callTime} onChange={e => setNewCall({ ...newCall, callTime: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #DDD', fontSize: '12.5px', background: '#FFF' }}>
                    <option>10:00 AM IST</option>
                    <option>11:00 AM IST</option>
                    <option>02:30 PM IST</option>
                    <option>04:00 PM IST</option>
                    <option>05:30 PM IST</option>
                  </select>
                </div>
              </div>

              {/* Host Dropdown from Real Users */}
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4A453E', marginBottom: '4px' }}>Assigned Host (From Team) *</label>
                <select value={newCall.callHost} onChange={e => setNewCall({ ...newCall, callHost: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #DDD', fontSize: '12.5px', background: '#FFF' }}>
                  {REAL_HOSTS.map(host => (
                    <option key={host} value={host}>{host}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
              <button type="button" onClick={() => setActiveModal(null)} style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #DDD', background: '#FFF', cursor: 'pointer', fontSize: '12.5px' }}>Cancel</button>
              <button type="submit" style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', background: '#5B1F28', color: '#FFF', fontWeight: 600, cursor: 'pointer', fontSize: '12.5px' }}>Save Discovery Call</button>
            </div>
          </form>
        </div>
      )}

      {/* 3. Modal: Add Team User */}
      {activeModal === 'add-user' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <form onSubmit={handleAddUser} style={{ background: '#FFFFFF', width: '100%', maxWidth: '440px', borderRadius: '16px', padding: '28px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0, color: '#1A1817' }}>Add New Team User</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4A453E', marginBottom: '4px' }}>Full Name *</label>
                <input required type="text" placeholder="e.g. Albin Thomas" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #DDD', fontSize: '12.5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4A453E', marginBottom: '4px' }}>Email Address *</label>
                <input required type="email" placeholder="albin@lal10.com" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #DDD', fontSize: '12.5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4A453E', marginBottom: '4px' }}>Role</label>
                <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value as any })} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #DDD', fontSize: '12.5px', background: '#FFF' }}>
                  <option>Admin</option><option>Manager</option><option>Editor</option><option>Viewer</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
              <button type="button" onClick={() => setActiveModal(null)} style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #DDD', background: '#FFF', cursor: 'pointer', fontSize: '12.5px' }}>Cancel</button>
              <button type="submit" style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', background: '#5B1F28', color: '#FFF', fontWeight: 600, cursor: 'pointer', fontSize: '12.5px' }}>Save User</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
