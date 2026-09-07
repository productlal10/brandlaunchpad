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
  callStatus: 'Completed' | 'Scheduled' | 'Cancelled';
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

const INITIAL_CASE_STUDIES: CaseStudyItem[] = [
  { id: 'cs-1', title: 'How We Helped Aria Studio Scale from ₹1 Cr to ₹10 Cr', brandName: 'Aria Studio', brandCode: 'A', industry: 'D2C Fashion', status: 'Published', publishedOn: 'Active', views: 342, imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&auto=format&fit=crop&q=80' },
  { id: 'cs-2', title: 'Building Noma Living: Sourcing. Quality. Scale.', brandName: 'Noma Living', brandCode: 'N', industry: 'Home & Living', status: 'Published', publishedOn: 'Active', views: 278, imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&auto=format&fit=crop&q=80' },
  { id: 'cs-3', title: 'From First Collection to National Presence', brandName: 'Riya & Co.', brandCode: 'R', industry: 'Women\'s Wear', status: 'Published', publishedOn: 'Active', views: 210, imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&auto=format&fit=crop&q=80' },
  { id: 'cs-4', title: 'Urban Form: Building a Scalable Menswear Brand', brandName: 'Urban Form', brandCode: 'U', industry: 'Menswear', status: 'Draft', publishedOn: '–', views: 0, imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&auto=format&fit=crop&q=80' },
];

// Helper: Relative Time
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

  // Dynamic chart days for X axis
  const chartDays = useMemo(() => {
    const days: string[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      days.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    return days;
  }, []);

  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<string>('');
  const [showDateDropdown, setShowDateDropdown] = useState(false);

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
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>(INITIAL_CASE_STUDIES);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [stageFilter, setStageFilter] = useState('All Stages');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [hostFilter, setHostFilter] = useState('All Hosts');
  const [roleFilter, setRoleFilter] = useState('All Roles');

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

  const filteredUsers = useMemo(() => {
    return users.filter(item => {
      const matchesSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'All Roles' || item.role === roleFilter;
      const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  // Dynamic Category Breakdown & Donut Slices
  const categoryStats = useMemo(() => {
    const counts: Record<string, { count: number; color: string }> = {
      'Womenswear': { count: 0, color: '#5B1F28' },
      'Menswear': { count: 0, color: '#B07058' },
      'Kidswear': { count: 0, color: '#D19E75' },
      'Footwear & Accessories': { count: 0, color: '#DEC8B5' },
      'General / Multi': { count: 0, color: '#8A4A32' },
    };

    enquiries.forEach(e => {
      const cat = (e.category || '').toLowerCase();
      if (cat.includes('women')) counts['Womenswear'].count++;
      else if (cat.includes('men')) counts['Menswear'].count++;
      else if (cat.includes('kid')) counts['Kidswear'].count++;
      else if (cat.includes('footwear') || cat.includes('access')) counts['Footwear & Accessories'].count++;
      else counts['General / Multi'].count++;
    });

    const total = enquiries.length;
    const circumference = 339; // 2 * PI * 54

    let accumulatedOffset = 0;
    const slices = Object.entries(counts).map(([label, item]) => {
      const pct = total > 0 ? item.count / total : 0;
      const strokeDash = pct * circumference;
      const dashoffset = -accumulatedOffset;
      accumulatedOffset += strokeDash;
      return {
        label,
        count: item.count,
        percentage: total > 0 ? ((item.count / total) * 100).toFixed(1) : '0.0',
        color: item.color,
        dashArray: `${strokeDash.toFixed(1)} ${circumference}`,
        dashOffset: dashoffset.toFixed(1),
      };
    });

    return { total, counts, slices };
  }, [enquiries]);

  // Dynamic Daily Counts & Scaled SVG Line Chart
  const lineChartData = useMemo(() => {
    const now = new Date();
    const days: { label: string; dateStr: string; count: number }[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const count = enquiries.filter(e => e.date === dateStr).length;
      days.push({ label, dateStr, count });
    }

    const maxCount = Math.max(...days.map(d => d.count), 4);
    const points = days.map((d, idx) => {
      const x = 30 + idx * 90; // 30, 120, 210, 300, 390, 480, 570
      const y = 135 - (d.count / maxCount) * 95;
      return { x, y, count: d.count, label: d.label };
    });

    const pathD = points.length > 0
      ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
      : 'M 30 135 L 570 135';

    const areaD = points.length > 0
      ? `${pathD} L ${points[points.length - 1].x} 145 L ${points[0].x} 145 Z`
      : 'M 30 135 L 570 135 L 570 145 L 30 145 Z';

    return { days, points, pathD, areaD, maxCount };
  }, [enquiries]);

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
        { tab: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
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
              width: '100%', padding: '11px 14px', borderRadius: '8px', fontSize: '13px',
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
  // 1. LOGIN PORTAL
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
  // 2. AUTHENTICATED DASHBOARD (ORIGINAL RICH UI WITH DYNAMIC DATA)
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
              {activeTab === 'dashboard' ? (
                <>
                  <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1817', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Welcome back, {currentUser.name} <span style={{ fontSize: '22px' }}>👋</span>
                  </h1>
                  <p style={{ fontSize: '13.5px', color: '#7E766D', margin: '4px 0 0' }}>
                    Here&apos;s what&apos;s happening with LAL10 Fashions today.
                  </p>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#8A8279', marginBottom: '4px' }}>
                    <span>Dashboard</span>
                    <ChevronRight size={13} />
                    <span style={{ color: '#1A1817', fontWeight: 600, textTransform: 'capitalize' }}>
                      {activeTab === 'calls' ? 'Discovery Calls' : activeTab === 'casestudies' ? 'Case Studies' : activeTab}
                    </span>
                  </div>
                  <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1817', margin: 0, textTransform: 'capitalize' }}>
                    {activeTab === 'calls' ? 'Discovery Calls' : activeTab === 'casestudies' ? 'Case Studies' : activeTab}
                  </h1>
                </>
              )}
            </div>

            {/* Right Controls */}
            <div className="admin-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={fetchLiveLeads}
                disabled={isLoadingLeads}
                title="Sync live data"
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px', background: '#FFFFFF',
                  border: '1px solid #E4DDD4', borderRadius: '8px', padding: '9px 14px',
                  fontSize: '12px', fontWeight: 600, color: '#1A1817', cursor: 'pointer'
                }}
              >
                <RefreshCw size={14} className={isLoadingLeads ? 'animate-spin' : ''} color="#5B1F28" />
                <span>{isLoadingLeads ? 'Syncing...' : 'Sync Live'}</span>
              </button>

              {/* Dynamic Date Picker */}
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

              {activeTab === 'users' && (
                <button onClick={() => setActiveModal('add-user')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#3D1219', color: '#FFFFFF', padding: '9px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                  <Plus size={14} /><span>Add User</span>
                </button>
              )}
              {activeTab === 'calls' && (
                <button onClick={() => setActiveModal('book-call')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#3D1219', color: '#FFFFFF', padding: '9px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                  <Plus size={14} /><span>Book Call</span>
                </button>
              )}
              {activeTab === 'brands' && (
                <button onClick={() => setActiveModal('add-brand')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#3D1219', color: '#FFFFFF', padding: '9px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                  <Plus size={14} /><span>Add Brand</span>
                </button>
              )}
              {activeTab === 'dashboard' && (
                <button onClick={() => exportData('enquiries')} title="Export CSV" style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FFFFFF', border: '1px solid #E4DDD4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Share2 size={15} color="#57524B" />
                </button>
              )}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 1: DASHBOARD (ORIGINAL RICH UI RESTORED)
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* 4 Stat Cards with Sparklines */}
              <div className="admin-stats-grid">
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={17} color="#8A4A32" />
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500, marginTop: '12px' }}>Total Enquiries</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', lineHeight: 1 }}>
                      {enquiries.length > 0 ? enquiries.length : '0'}
                    </div>
                    <svg width="70" height="24" viewBox="0 0 80 26" fill="none">
                      <path d="M2 20L20 16L40 18L60 10L78 4" stroke="#C97A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '8px' }}>
                    ● Real-time live feed
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={17} color="#8A4A32" />
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500, marginTop: '12px' }}>New This Week</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', lineHeight: 1 }}>
                      {enquiries.filter(e => e.status === 'New').length}
                    </div>
                    <svg width="70" height="24" viewBox="0 0 80 26" fill="none">
                      <path d="M2 18L22 19L42 14L62 12L78 6" stroke="#C97A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '8px' }}>
                    {enquiries.filter(e => e.status === 'New').length > 0 ? 'Action required' : 'All leads reviewed'}
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PhoneCall size={17} color="#8A4A32" />
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500, marginTop: '12px' }}>Discovery Calls</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', lineHeight: 1 }}>
                      {calls.length}
                    </div>
                    <svg width="70" height="24" viewBox="0 0 80 26" fill="none">
                      <path d="M2 22L20 18L40 20L60 14L78 8" stroke="#C97A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '8px' }}>
                    {calls.filter(c => c.callStatus === 'Scheduled').length} scheduled
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={17} color="#8A4A32" />
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500, marginTop: '12px' }}>Active Brands</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', lineHeight: 1 }}>
                      {brands.length}
                    </div>
                    <svg width="70" height="24" viewBox="0 0 80 26" fill="none">
                      <path d="M2 22L20 20L40 16L60 18L78 6" stroke="#C97A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Middle Row: Inflow Line Chart & Category Donut */}
              <div className="admin-charts-grid">
                {/* 1. Inflow Trend Area Chart */}
                <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', padding: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1A1817', margin: 0 }}>Enquiry Inflow Trend</h3>
                      <p style={{ fontSize: '12px', color: '#8A7D71', margin: '2px 0 0' }}>Daily received leads over the last 7 days</p>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#5B1F28', background: '#F8EFEB', padding: '4px 10px', borderRadius: '6px' }}>
                      {lineChartData.days.reduce((acc, d) => acc + d.count, 0)} leads in 7d
                    </span>
                  </div>

                  <div style={{ height: '170px', width: '100%', position: 'relative' }}>
                    <svg width="100%" height="100%" viewBox="0 0 600 170" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="chartGradient2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#5B1F28" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#5B1F28" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Grid Horizontal Lines */}
                      <line x1="30" y1="35" x2="570" y2="35" stroke="#F3EFE9" strokeDasharray="3 3" />
                      <line x1="30" y1="87" x2="570" y2="87" stroke="#F3EFE9" strokeDasharray="3 3" />
                      <line x1="30" y1="140" x2="570" y2="140" stroke="#EAE4DC" />

                      {/* Y-axis Labels */}
                      <text x="20" y="38" fontSize="10" fill="#9C9287" textAnchor="end">{lineChartData.maxCount}</text>
                      <text x="20" y="90" fontSize="10" fill="#9C9287" textAnchor="end">{Math.round(lineChartData.maxCount / 2)}</text>
                      <text x="20" y="143" fontSize="10" fill="#9C9287" textAnchor="end">0</text>

                      {/* Dynamic Area and Line */}
                      <path d={lineChartData.areaD} fill="url(#chartGradient2)" />
                      <path d={lineChartData.pathD} stroke="#5B1F28" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

                      {/* SVG Points */}
                      {lineChartData.points.map((pt, i) => (
                        <g key={i}>
                          <circle cx={pt.x} cy={pt.y} r="4" fill="#FFFFFF" stroke="#5B1F28" strokeWidth="2.5" />
                          {pt.count > 0 && (
                            <text x={pt.x} y={pt.y - 8} fontSize="10.5" fontWeight="700" fill="#5B1F28" textAnchor="middle">
                              {pt.count}
                            </text>
                          )}
                        </g>
                      ))}

                      {/* X-axis Date Labels */}
                      {lineChartData.points.map((pt, i) => (
                        <text key={i} x={pt.x} y="162" fontSize="10" fill="#8A7D71" textAnchor="middle">
                          {pt.label}
                        </text>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* 2. Enquiries by Category Donut Chart & Breakdown */}
                <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', padding: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1A1817', margin: 0 }}>Enquiries by Category</h3>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#7E766D' }}>{categoryStats.total} Total</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '6px' }}>
                    {/* Donut Chart SVG */}
                    <div style={{ width: '130px', height: '130px', position: 'relative', flexShrink: 0 }}>
                      <svg width="130" height="130" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="70" cy="70" r="54" stroke="#F2EDE6" strokeWidth="18" fill="none" />
                        {categoryStats.slices.map((slice, i) => (
                          <circle
                            key={i}
                            cx="70"
                            cy="70"
                            r="54"
                            stroke={slice.color}
                            strokeWidth="18"
                            fill="none"
                            strokeDasharray={slice.dashArray}
                            strokeDashoffset={slice.dashOffset}
                            style={{ transition: 'stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease' }}
                          />
                        ))}
                      </svg>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#1A1817', lineHeight: 1 }}>{categoryStats.total}</div>
                        <div style={{ fontSize: '10px', color: '#8A7D71', fontWeight: 600, marginTop: '2px' }}>Total</div>
                      </div>
                    </div>

                    {/* Category Breakdown Progress List */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                      {categoryStats.slices.map(slice => (
                        <div key={slice.label}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '3px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3A3530', fontWeight: 500 }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: slice.color, display: 'inline-block' }} />
                              {slice.label}
                            </span>
                            <span style={{ fontWeight: 700, color: '#1A1817' }}>
                              {slice.count} <span style={{ color: '#8A7D71', fontWeight: 400, fontSize: '10.5px' }}>({slice.percentage}%)</span>
                            </span>
                          </div>
                          <div style={{ height: '4px', background: '#F4EFEA', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: `${slice.percentage}%`, background: slice.color, height: '100%', borderRadius: '2px', transition: 'width 0.5s ease' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="admin-bottom-grid">
                {/* Recent Enquiries Table Card */}
                <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', padding: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1A1817', margin: 0 }}>Recent Enquiries</h3>
                    <button onClick={() => setActiveTab('enquiries')} style={{ fontSize: '11.5px', fontWeight: 600, color: '#1A1817', background: '#FAF6F0', border: '1px solid #EBE4DA', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer' }}>
                      View all ({enquiries.length})
                    </button>
                  </div>

                  {enquiries.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '32px 10px', color: '#8A7D71' }}>
                      <Inbox size={32} color="#B8ADA2" style={{ margin: '0 auto 8px' }} />
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#1A1817' }}>No live inquiries received yet</div>
                      <div style={{ fontSize: '11.5px', marginTop: '4px' }}>Incoming leads will populate this table automatically.</div>
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                      <table style={{ width: '100%', minWidth: '550px', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11px', fontWeight: 600 }}>
                            <th style={{ padding: '8px 6px' }}>Name</th>
                            <th style={{ padding: '8px 6px' }}>Brand</th>
                            <th style={{ padding: '8px 6px' }}>Stage</th>
                            <th style={{ padding: '8px 6px' }}>Status</th>
                            <th style={{ padding: '8px 6px', textAlign: 'right' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {enquiries.slice(0, 5).map(enq => (
                            <tr key={enq.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                              <td style={{ padding: '10px 6px' }}>
                                <div style={{ fontWeight: 600, color: '#1A1817' }}>{enq.name}</div>
                                <div style={{ fontSize: '10.5px', color: '#8A7D71' }}>{enq.email}</div>
                              </td>
                              <td style={{ padding: '10px 6px', fontWeight: 600 }}>{enq.brand}</td>
                              <td style={{ padding: '10px 6px' }}>
                                <span style={{ fontSize: '10.5px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, ...getStageBadgeStyle(enq.stage) }}>
                                  {enq.stage}
                                </span>
                              </td>
                              <td style={{ padding: '10px 6px' }}>
                                <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 7px', borderRadius: '10px', ...getStatusBadgeStyle(enq.status) }}>
                                  {enq.status}
                                </span>
                              </td>
                              <td style={{ padding: '10px 6px', textAlign: 'right' }}>
                                <button onClick={() => { setSelectedEnquiry(enq); setActiveModal('view-enquiry'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7E766D' }}>
                                  <Eye size={15} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Right Widgets: Upcoming Calls & Recent Activity */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1A1817', margin: 0 }}>Upcoming Calls</h4>
                      <button onClick={() => setActiveTab('calls')} style={{ fontSize: '11px', fontWeight: 600, color: '#1A1817', background: 'none', border: 'none', cursor: 'pointer' }}>View all</button>
                    </div>
                    {calls.length === 0 ? (
                      <div style={{ fontSize: '12px', color: '#8A7D71', padding: '10px 0' }}>
                        No upcoming calls scheduled.
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {calls.slice(0, 3).map(c => (
                          <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ padding: '3px 6px', background: '#FAF5EE', border: '1px solid #EADDCF', borderRadius: '6px', textAlign: 'center', minWidth: '36px' }}>
                                <div style={{ fontSize: '8px', fontWeight: 700, color: '#8A5336' }}>CALL</div>
                                <div style={{ fontSize: '12px', fontWeight: 800, color: '#1A1817', lineHeight: 1 }}>{c.brandCode}</div>
                              </div>
                              <div>
                                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1A1817' }}>{c.brand}</div>
                                <div style={{ fontSize: '10.5px', color: '#8A7D71' }}>{c.contactName} • {c.callHost.split(' ')[0]}</div>
                              </div>
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: 600, color: '#57524B' }}>{c.callTime}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1A1817', margin: '0 0 12px' }}>Recent Activity</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11.5px' }}>
                      {enquiries.length > 0 ? (
                        enquiries.slice(0, 3).map(e => (
                          <div key={e.id}>
                            New inquiry from <strong>{e.brand}</strong> ({e.name})
                            <div style={{ fontSize: '10px', color: '#888' }}>{e.relativeTime}</div>
                          </div>
                        ))
                      ) : (
                        <div style={{ color: '#8A7D71' }}>System initialized and ready for live leads.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 2: USERS
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'users' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div className="admin-stats-grid">
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Total Team Users</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>{users.length}</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>● 100% active</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Active Administrators</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>{users.filter(u => u.role === 'Admin').length}</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>● Verified</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Managers &amp; Growth</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>{users.filter(u => u.role === 'Manager').length}</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>● Active</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>System Roles</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>2</div>
                  <div style={{ fontSize: '11px', color: '#7E766D', fontWeight: 600, marginTop: '6px' }}>Admin &amp; Manager</div>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', padding: '20px' }}>
                <div className="admin-filter-row" style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', gap: '10px', flex: 1, flexWrap: 'wrap' }}>
                    <input
                      type="text" placeholder="Search users by name, email or role..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '12.5px', border: '1px solid #E4DDD4', borderRadius: '6px', minWidth: '180px', flex: 1 }}
                    />
                    <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={{ padding: '8px 12px', fontSize: '12.5px', border: '1px solid #E4DDD4', borderRadius: '6px', background: '#FFF' }}>
                      <option>All Roles</option><option>Admin</option><option>Editor</option><option>Manager</option><option>Viewer</option>
                    </select>
                  </div>
                  <button onClick={() => setActiveModal('add-user')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#3D1219', color: '#FFFFFF', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                    <UserPlus size={13} /><span>Add User</span>
                  </button>
                </div>

                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                  <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11px', fontWeight: 600 }}>
                        <th style={{ padding: '10px 8px' }}>Name</th>
                        <th style={{ padding: '10px 8px' }}>Email Address</th>
                        <th style={{ padding: '10px 8px' }}>Role</th>
                        <th style={{ padding: '10px 8px' }}>Status</th>
                        <th style={{ padding: '10px 8px' }}>Last Activity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(usr => (
                        <tr key={usr.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                          <td style={{ padding: '12px 8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: usr.avatarColor, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }}>
                                {usr.avatarInitials}
                              </div>
                              <span style={{ fontWeight: 600, color: '#1A1817' }}>{usr.name}</span>
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
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 3: DISCOVERY CALLS
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'calls' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div className="admin-stats-grid">
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Total Calls</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>{calls.length}</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>● Real-time sync</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Scheduled</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>{calls.filter(c => c.callStatus === 'Scheduled').length}</div>
                  <div style={{ fontSize: '11px', color: '#185FA5', fontWeight: 600, marginTop: '6px' }}>Upcoming</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Completed</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>{calls.filter(c => c.callStatus === 'Completed').length}</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>Past meetings</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Active Hosts</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>{REAL_HOSTS.length}</div>
                  <div style={{ fontSize: '11px', color: '#7E766D', fontWeight: 600, marginTop: '6px' }}>Team Advisors</div>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', padding: '20px' }}>
                <div className="admin-filter-row" style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', gap: '10px', flex: 1, flexWrap: 'wrap' }}>
                    <input
                      type="text" placeholder="Search by brand, contact or host..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '12.5px', border: '1px solid #E4DDD4', borderRadius: '6px', minWidth: '180px', flex: 1 }}
                    />
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', fontSize: '12.5px', border: '1px solid #E4DDD4', borderRadius: '6px', background: '#FFF' }}>
                      <option>All Status</option><option>Scheduled</option><option>Completed</option><option>Cancelled</option>
                    </select>
                  </div>
                  <button onClick={() => setActiveModal('book-call')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#3D1219', color: '#FFFFFF', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                    <Plus size={13} /><span>Schedule Call</span>
                  </button>
                </div>

                {calls.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '36px 10px', color: '#8A7D71' }}>
                    <PhoneCall size={34} color="#B8ADA2" style={{ margin: '0 auto 8px' }} />
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1817' }}>No discovery calls scheduled yet</div>
                    <div style={{ fontSize: '12px', marginTop: '4px' }}>Click "Schedule Call" to book a discovery session with a prospective brand.</div>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', minWidth: '650px', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11px', fontWeight: 600 }}>
                          <th style={{ padding: '10px 8px' }}>Brand &amp; Contact</th>
                          <th style={{ padding: '10px 8px' }}>Stage</th>
                          <th style={{ padding: '10px 8px' }}>Date &amp; Time</th>
                          <th style={{ padding: '10px 8px' }}>Host</th>
                          <th style={{ padding: '10px 8px' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCalls.map(cl => (
                          <tr key={cl.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                            <td style={{ padding: '12px 8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#1A1817', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9.5px', fontWeight: 700 }}>
                                  {cl.brandCode}
                                </div>
                                <div>
                                  <div style={{ fontWeight: 700, color: '#1A1817' }}>{cl.brand}</div>
                                  <div style={{ fontSize: '11px', color: '#7E766D' }}>{cl.contactName} • {cl.contactEmail}</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '12px 8px' }}>
                              <span style={{ fontSize: '10.5px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, ...getStageBadgeStyle(cl.stage) }}>{cl.stage}</span>
                            </td>
                            <td style={{ padding: '12px 8px', color: '#1A1817' }}>{cl.callDate} at {cl.callTime}</td>
                            <td style={{ padding: '12px 8px', fontWeight: 600, color: '#5B1F28' }}>{cl.callHost}</td>
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
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 4: BRANDS
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'brands' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div className="admin-stats-grid">
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Total Registered Brands</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>{brands.length}</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>● Direct intake</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Active Portfolio</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>{brands.filter(b => b.status === 'Active').length}</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>Verified</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Sourcing Ready</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>{brands.filter(b => b.stage.includes('Production') || b.stage.includes('Scaling')).length}</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>High Intent</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Avg Order Volume</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>₹15L–35L</div>
                  <div style={{ fontSize: '11px', color: '#7E766D', fontWeight: 600, marginTop: '6px' }}>Average budget</div>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', padding: '20px' }}>
                <div className="admin-filter-row" style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', gap: '10px', flex: 1, flexWrap: 'wrap' }}>
                    <input
                      type="text" placeholder="Search brands by name or contact..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '12.5px', border: '1px solid #E4DDD4', borderRadius: '6px', minWidth: '180px', flex: 1 }}
                    />
                  </div>
                </div>

                {brands.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '36px 10px', color: '#8A7D71' }}>
                    <Building2 size={34} color="#B8ADA2" style={{ margin: '0 auto 8px' }} />
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1817' }}>No brands registered yet</div>
                    <div style={{ fontSize: '12px', marginTop: '4px' }}>Brands will automatically populate as new leads submit forms.</div>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', minWidth: '650px', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11px', fontWeight: 600 }}>
                          <th style={{ padding: '10px 8px' }}>Brand Name</th>
                          <th style={{ padding: '10px 8px' }}>Contact Person</th>
                          <th style={{ padding: '10px 8px' }}>Stage</th>
                          <th style={{ padding: '10px 8px' }}>Status</th>
                          <th style={{ padding: '10px 8px' }}>Onboarded</th>
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
                            </td>
                            <td style={{ padding: '12px 8px' }}>
                              <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', ...getStatusBadgeStyle(br.status) }}>{br.status}</span>
                            </td>
                            <td style={{ padding: '12px 8px', color: '#7E766D' }}>{br.onboardedOn}</td>
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
              TAB 5: CASE STUDIES
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'casestudies' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
                  {caseStudies.map(cs => (
                    <div key={cs.id} style={{ border: '1px solid #EFEAE3', borderRadius: '10px', overflow: 'hidden', background: '#FAF6F0' }}>
                      <img src={cs.imageUrl} alt={cs.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                      <div style={{ padding: '14px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: '#8A4A32', textTransform: 'uppercase' }}>{cs.industry}</div>
                        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1A1817', margin: '4px 0 8px', lineHeight: 1.3 }}>{cs.title}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#8A7D71' }}>
                          <span>{cs.brandName}</span>
                          <span style={{ color: '#137333', fontWeight: 600 }}>{cs.views} views</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 6: LIVE ENQUIRIES COMPLETE LIST
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'enquiries' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', padding: '20px' }}>
              <div className="admin-filter-row" style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', gap: '10px', flex: 1, flexWrap: 'wrap' }}>
                  <input
                    type="text" placeholder="Search enquiries..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    style={{ padding: '8px 12px', fontSize: '12.5px', border: '1px solid #E4DDD4', borderRadius: '6px', minWidth: '180px', flex: 1 }}
                  />
                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', fontSize: '12.5px', border: '1px solid #E4DDD4', borderRadius: '6px', background: '#FFF' }}>
                    <option>All Status</option><option>New</option><option>Contacted</option><option>Qualified</option><option>In Discussion</option><option>Discovery Call</option>
                  </select>
                </div>
                <button onClick={() => exportData('enquiries')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFF', border: '1px solid #E4DDD4', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                  <Download size={13} /><span>Export CSV</span>
                </button>
              </div>

              {filteredEnquiries.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '36px 10px', color: '#8A7D71' }}>
                  <Inbox size={34} color="#B8ADA2" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1817' }}>No live inquiries found</div>
                  <div style={{ fontSize: '12px', marginTop: '4px' }}>Incoming submissions will appear here in real-time.</div>
                </div>
              ) : (
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                  <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11px', fontWeight: 600 }}>
                        <th style={{ padding: '10px 8px' }}>Name &amp; Founder</th>
                        <th style={{ padding: '10px 8px' }}>Brand</th>
                        <th style={{ padding: '10px 8px' }}>Stage</th>
                        <th style={{ padding: '10px 8px' }}>Date Received</th>
                        <th style={{ padding: '10px 8px' }}>Status</th>
                        <th style={{ padding: '10px 8px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEnquiries.map(enq => (
                        <tr key={enq.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                          <td style={{ padding: '12px 8px' }}>
                            <div style={{ fontWeight: 600, color: '#1A1817' }}>{enq.name}</div>
                            <div style={{ fontSize: '11px', color: '#8A7D71' }}>{enq.email}</div>
                          </td>
                          <td style={{ padding: '12px 8px', fontWeight: 600 }}>{enq.brand}</td>
                          <td style={{ padding: '12px 8px' }}>
                            <span style={{ fontSize: '10.5px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, ...getStageBadgeStyle(enq.stage) }}>{enq.stage}</span>
                          </td>
                          <td style={{ padding: '12px 8px', color: '#1A1817' }}>
                            <div>{enq.date}</div>
                            <div style={{ fontSize: '10px', color: '#0F766E', fontWeight: 600 }}>{enq.relativeTime}</div>
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', ...getStatusBadgeStyle(enq.status) }}>{enq.status}</span>
                          </td>
                          <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                            <button onClick={() => { setSelectedEnquiry(enq); setActiveModal('view-enquiry'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7E766D' }}>
                              <Eye size={15} />
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
              TAB 7, 8, 9: INSIGHTS, SETTINGS, INTEGRATIONS
          ══════════════════════════════════════════════════════════════════════ */}
          {(activeTab === 'insights' || activeTab === 'settings' || activeTab === 'integrations') && (
            <div style={{ background: '#FFFFFF', padding: '36px 20px', borderRadius: '12px', border: '1px solid #EFEAE3', textAlign: 'center' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#F8EDE5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <Settings size={24} color="#5B1F28" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1A1817', margin: '0 0 8px', textTransform: 'capitalize' }}>
                {activeTab} Management
              </h3>
              <p style={{ fontSize: '13.5px', color: '#7E766D', maxWidth: '400px', margin: '0 auto 20px', lineHeight: 1.5 }}>
                Configure your system preferences, API endpoints, webhook subscriptions, and team permissions.
              </p>
              <button onClick={() => setActiveTab('dashboard')} style={{ background: '#5B1F28', color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                Back to Dashboard
              </button>
            </div>
          )}

        </main>
      </div>

      {/* ── MODALS ───────────────────────────────────────────────────────────── */}

      {/* 1. Modal: View Enquiry & Email Logs */}
      {activeModal === 'view-enquiry' && selectedEnquiry && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '500px', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #EFEAE3', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>{selectedEnquiry.brand}</h3>
                <div style={{ fontSize: '11px', color: '#8A7D71' }}>Lead ID: {selectedEnquiry.id}</div>
              </div>
              <button onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div><strong>Contact Founder:</strong> {selectedEnquiry.name}</div>
              <div><strong>Email:</strong> <a href={`mailto:${selectedEnquiry.email}`} style={{ color: '#5B1F28', fontWeight: 600 }}>{selectedEnquiry.email}</a></div>
              <div><strong>Phone:</strong> {selectedEnquiry.phone ? <a href={`tel:${selectedEnquiry.phone}`} style={{ color: '#185FA5' }}>{selectedEnquiry.phone}</a> : '–'}</div>
              <div><strong>Stage:</strong> {selectedEnquiry.stage}</div>
              <div><strong>Category:</strong> {selectedEnquiry.category}</div>
              <div><strong>Budget:</strong> {selectedEnquiry.budget}</div>
              <div><strong>Date Received:</strong> {selectedEnquiry.date} at {selectedEnquiry.time} ({selectedEnquiry.relativeTime})</div>
              {selectedEnquiry.notes && (
                <div style={{ background: '#FAF6F0', padding: '10px', borderRadius: '8px', border: '1px solid #EFEAE3' }}>
                  <strong>Notes:</strong>
                  <div style={{ marginTop: '4px', color: '#555', lineHeight: 1.4 }}>{selectedEnquiry.notes}</div>
                </div>
              )}

              {/* Nodemailer logs */}
              <div style={{ background: '#F0FDF4', padding: '12px', borderRadius: '8px', border: '1px solid #BBF7D0', fontSize: '11.5px', color: '#166534' }}>
                <div style={{ fontWeight: 700, marginBottom: '4px' }}>✓ AUTOMATED EMAIL DELIVERY LOGS</div>
                <div>• Team Notification: Dispatched to <code>alan@lal10.com</code></div>
                <div>• Client Receipt: Dispatched to <code>{selectedEnquiry.email}</code></div>
              </div>

              <div>
                <strong>Update Status:</strong>
                <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                  {(['New', 'Contacted', 'Qualified', 'In Discussion', 'Discovery Call'] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => handleUpdateLeadStatus(selectedEnquiry.id, st)}
                      style={{
                        padding: '5px 10px', borderRadius: '16px', fontSize: '11px', fontWeight: 600,
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={() => setActiveModal(null)} style={{ background: '#1A1817', color: '#FFF', padding: '9px 18px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal: Add User */}
      {activeModal === 'add-user' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <form onSubmit={handleAddUser} style={{ background: '#FFFFFF', width: '100%', maxWidth: '440px', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>Add New Team User</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Full Name *</label>
                <input required type="text" placeholder="e.g. Vikram Singhania" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '12.5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Email Address *</label>
                <input required type="email" placeholder="vikram@brand.com" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '12.5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Role</label>
                <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value as any })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '12.5px' }}>
                  <option>Admin</option><option>Editor</option><option>Manager</option><option>Viewer</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
              <button type="button" onClick={() => setActiveModal(null)} style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #DDD', background: '#FFF', cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
              <button type="submit" style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', background: '#5B1F28', color: '#FFF', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}>Save User</button>
            </div>
          </form>
        </div>
      )}

      {/* 3. Modal: Book Discovery Call */}
      {activeModal === 'book-call' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <form onSubmit={handleBookCall} style={{ background: '#FFFFFF', width: '100%', maxWidth: '460px', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>Schedule Discovery Call</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Select from Live Leads</label>
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
                  style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '12.5px', background: '#FFF' }}
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
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Brand Name *</label>
                <input required type="text" placeholder="e.g. AURELIA" value={newCall.brand} onChange={e => setNewCall({ ...newCall, brand: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '12.5px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Contact Person *</label>
                  <input required type="text" placeholder="Priya Sharma" value={newCall.contactName} onChange={e => setNewCall({ ...newCall, contactName: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '12.5px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Email *</label>
                  <input required type="email" placeholder="priya@brand.com" value={newCall.contactEmail} onChange={e => setNewCall({ ...newCall, contactEmail: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '12.5px' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Date *</label>
                  <input required type="date" value={newCall.callDate} onChange={e => setNewCall({ ...newCall, callDate: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '12.5px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Time Slot *</label>
                  <select value={newCall.callTime} onChange={e => setNewCall({ ...newCall, callTime: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '12.5px', background: '#FFF' }}>
                    <option>10:00 AM IST</option>
                    <option>11:00 AM IST</option>
                    <option>02:30 PM IST</option>
                    <option>04:00 PM IST</option>
                    <option>05:30 PM IST</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Assigned Host (From Team)</label>
                <select value={newCall.callHost} onChange={e => setNewCall({ ...newCall, callHost: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '12.5px', background: '#FFF' }}>
                  {REAL_HOSTS.map(host => (
                    <option key={host} value={host}>{host}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
              <button type="button" onClick={() => setActiveModal(null)} style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #DDD', background: '#FFF', cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
              <button type="submit" style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', background: '#5B1F28', color: '#FFF', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}>Book Call</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
