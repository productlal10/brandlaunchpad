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
  Lock, Key
} from 'lucide-react';
import { DiscoveryCallLead } from '@/lib/types';

// ── TYPES & INTERFACES ───────────────────────────────────────────────────────
type TabType = 'dashboard' | 'enquiries' | 'brands' | 'calls' | 'users' | 'casestudies' | 'insights' | 'settings' | 'integrations';

interface EnquiryItem {
  id: string;
  name: string;
  email: string;
  brand: string;
  stage: string;
  source: 'Website' | 'LinkedIn' | 'Referral' | 'Instagram' | 'Other';
  date: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'In Discussion' | 'Discovery Call';
  phone?: string;
  notes?: string;
}

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Manager' | 'Viewer';
  status: 'Active' | 'Inactive';
  joinedOn: string;
  lastActive: string;
  avatarColor: string;
}

interface DiscoveryCallItem {
  id: string;
  brand: string;
  contactName: string;
  contactEmail: string;
  brandCode: string;
  stage: string;
  callDate: string;
  callTime: string;
  callHost: string;
  hostAvatar: string;
  callStatus: 'Completed' | 'Scheduled' | 'Cancelled';
  outcome: string;
}

interface BrandItem {
  id: string;
  name: string;
  code: string;
  website: string;
  contactName: string;
  contactEmail: string;
  stage: string;
  status: 'Active' | 'Inactive';
  discoveryCallDate: string;
  discoveryCallTime: string;
  onboardedOn: string;
}

interface CaseStudyItem {
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

// ── INITIAL MOCK DATA MATCHING EXACT SCREENSHOTS ─────────────────────────────
const INITIAL_ENQUIRIES: EnquiryItem[] = [
  { id: 'enq-1', name: 'Arjun Mehta', email: 'arjun@ariastudio.com', brand: 'Aria Studio', stage: '₹5 Cr+ revenue', source: 'Website', date: 'May 30, 2025', status: 'New', phone: '+91 98201 44102', notes: 'Looking for premium womenswear manufacturer with low MOQs and sustainable linen.' },
  { id: 'enq-2', name: 'Riya Shah', email: 'riya@houseriya.com', brand: 'House of Riya', stage: 'First collection live', source: 'LinkedIn', date: 'May 29, 2025', status: 'Contacted', phone: '+91 97112 88390', notes: 'Need supply chain partner for rapid replenishment and catalogue expansion.' },
  { id: 'enq-3', name: 'Karan Patel', email: 'karan@urbanform.com', brand: 'Urban Form', stage: 'Pre-launch', source: 'Referral', date: 'May 28, 2025', status: 'Qualified', phone: '+91 99304 11283', notes: 'Menswear streetwear capsule launch in Q3. Ready with tech packs.' },
  { id: 'enq-4', name: 'Neha Kapoor', email: 'neha@nomaliving.com', brand: 'Noma Living', stage: '₹1–5 Cr revenue', source: 'Website', date: 'May 27, 2025', status: 'In Discussion', phone: '+91 98103 77291', notes: 'Home textile and loungewear crossover line feasibility.' },
  { id: 'enq-5', name: 'Pooja Desai', email: 'pooja@thebareedit.com', brand: 'The Bare Edit', stage: 'First collection live', source: 'Instagram', date: 'May 26, 2025', status: 'Discovery Call', phone: '+91 98402 99182', notes: 'Seeking organic cotton certified vendors for accessories and apparel.' },
  { id: 'enq-6', name: 'Aarav Mehta', email: 'aarav@voyage.in', brand: 'Voyage', stage: '₹1–5 Cr revenue', source: 'Website', date: 'May 25, 2025', status: 'New', phone: '+91 98111 22334' },
  { id: 'enq-7', name: 'Simran Kaur', email: 'simran@eclat.com', brand: 'Éclat', stage: 'Pre-launch', source: 'LinkedIn', date: 'May 24, 2025', status: 'Qualified', phone: '+91 98222 33445' },
  { id: 'enq-8', name: 'Dhruv Malik', email: 'dhruv@dhruvandco.com', brand: 'Dhruv & Co.', stage: '₹5 Cr+ revenue', source: 'Referral', date: 'May 23, 2025', status: 'In Discussion', phone: '+91 98333 44556' },
];

const INITIAL_USERS: UserItem[] = [
  { id: 'usr-1', name: 'Aarav Mehta', email: 'aarav@voyage.in', role: 'Admin', status: 'Active', joinedOn: 'May 30, 2025 11:00 AM', lastActive: 'May 30, 2025 11:45 AM', avatarColor: '#F4E8D6' },
  { id: 'usr-2', name: 'Simran Kaur', email: 'simran@eclat.com', role: 'Editor', status: 'Active', joinedOn: 'May 30, 2025 09:30 AM', lastActive: 'May 30, 2025 10:15 AM', avatarColor: '#E6E8F2' },
  { id: 'usr-3', name: 'Rohit Kapoor', email: 'rohit@rawreal.com', role: 'Manager', status: 'Active', joinedOn: 'May 29, 2025 04:00 PM', lastActive: 'May 30, 2025 09:10 AM', avatarColor: '#FBE8E8' },
  { id: 'usr-4', name: 'Pooja Sharma', email: 'pooja@maison10.in', role: 'Editor', status: 'Active', joinedOn: 'May 29, 2025 10:30 AM', lastActive: 'May 29, 2025 07:20 PM', avatarColor: '#FDECE6' },
  { id: 'usr-5', name: 'Neha D\'souza', email: 'neha@noirtheory.com', role: 'Manager', status: 'Active', joinedOn: 'May 28, 2025 03:00 PM', lastActive: 'May 30, 2025 08:45 AM', avatarColor: '#E8F5E9' },
  { id: 'usr-6', name: 'Ananya Bansal', email: 'ananya@aya.in', role: 'Editor', status: 'Inactive', joinedOn: 'May 28, 2025 11:45 AM', lastActive: 'May 28, 2025 02:30 PM', avatarColor: '#EDE7F6' },
  { id: 'usr-7', name: 'Dhruv Malik', email: 'dhruv@dhruvandco.com', role: 'Viewer', status: 'Active', joinedOn: 'May 27, 2025 05:20 PM', lastActive: 'May 30, 2025 10:05 AM', avatarColor: '#E0F2F1' },
  { id: 'usr-8', name: 'Karan Thakur', email: 'karan@sthreads.com', role: 'Viewer', status: 'Inactive', joinedOn: 'May 27, 2025 12:15 PM', lastActive: 'May 29, 2025 01:10 PM', avatarColor: '#FFF3E0' },
];

const INITIAL_CALLS: DiscoveryCallItem[] = [
  { id: 'call-1', brand: 'VOYAGE', brandCode: 'V', contactName: 'Aarav Mehta', contactEmail: 'aarav@voyage.in', stage: '₹1–5 Cr revenue', callDate: 'May 30, 2025', callTime: '11:00 AM', callHost: 'Rohit Verma', hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', callStatus: 'Completed', outcome: 'Follow up email sent' },
  { id: 'call-2', brand: 'ÉCLAT', brandCode: 'É', contactName: 'Simran Kaur', contactEmail: 'simran@eclat.com', stage: 'Pre-launch', callDate: 'May 30, 2025', callTime: '02:30 PM', callHost: 'Ananya Rao', hostAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80', callStatus: 'Scheduled', outcome: '–' },
  { id: 'call-3', brand: 'RAW & REAL', brandCode: 'R&R', contactName: 'Rohit Kapoor', contactEmail: 'rohit@rawreal.com', stage: 'First collection live', callDate: 'May 29, 2025', callTime: '04:00 PM', callHost: 'Priya Nair', hostAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80', callStatus: 'Completed', outcome: 'Proposal shared' },
  { id: 'call-4', brand: 'MAISON 10', brandCode: 'M10', contactName: 'Pooja Sharma', contactEmail: 'pooja@maison10.in', stage: '₹5 Cr+ revenue', callDate: 'May 29, 2025', callTime: '10:30 AM', callHost: 'Rohit Verma', hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', callStatus: 'Completed', outcome: 'Interested – Next meeting' },
  { id: 'call-5', brand: 'NOIR THEORY', brandCode: 'NT', contactName: 'Neha D\'souza', contactEmail: 'neha@noirtheory.com', stage: '₹1–5 Cr revenue', callDate: 'May 28, 2025', callTime: '03:00 PM', callHost: 'Ananya Rao', hostAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80', callStatus: 'Cancelled', outcome: 'Rescheduled' },
  { id: 'call-6', brand: 'AYA', brandCode: 'AYA', contactName: 'Ananya Bansal', contactEmail: 'ananya@aya.in', stage: 'Pre-launch', callDate: 'May 28, 2025', callTime: '11:45 AM', callHost: 'Priya Nair', hostAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80', callStatus: 'Scheduled', outcome: '–' },
  { id: 'call-7', brand: 'DHRUV & CO.', brandCode: 'D&CO', contactName: 'Dhruv Malik', contactEmail: 'dhruv@dhruvandco.com', stage: '₹5 Cr+ revenue', callDate: 'May 27, 2025', callTime: '05:20 PM', callHost: 'Rohit Verma', hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', callStatus: 'Completed', outcome: 'Follow up next week' },
  { id: 'call-8', brand: 'STHREADS', brandCode: 'ST', contactName: 'Karan Thakur', contactEmail: 'karan@sthreads.com', stage: 'First collection live', callDate: 'May 27, 2025', callTime: '12:15 PM', callHost: 'Ananya Rao', hostAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80', callStatus: 'Completed', outcome: 'Sample requested' },
];

const INITIAL_BRANDS: BrandItem[] = [
  { id: 'br-1', name: 'VOYAGE', code: 'V', website: 'voyage.in', contactName: 'Aarav Mehta', contactEmail: 'aarav@voyage.in', stage: '₹1–5 Cr revenue', status: 'Active', discoveryCallDate: 'May 30, 2025', discoveryCallTime: '11:00 AM', onboardedOn: 'May 25, 2025' },
  { id: 'br-2', name: 'ÉCLAT', code: 'É', website: 'eclat.com', contactName: 'Simran Kaur', contactEmail: 'simran@eclat.com', stage: 'Pre-launch', status: 'Active', discoveryCallDate: 'May 30, 2025', discoveryCallTime: '02:30 PM', onboardedOn: 'May 24, 2025' },
  { id: 'br-3', name: 'RAW & REAL', code: 'R&R', website: 'rawandreal.com', contactName: 'Rohit Kapoor', contactEmail: 'rohit@rawreal.com', stage: 'First collection live', status: 'Active', discoveryCallDate: 'May 29, 2025', discoveryCallTime: '04:00 PM', onboardedOn: 'May 22, 2025' },
  { id: 'br-4', name: 'MAISON 10', code: 'M10', website: 'maison10.in', contactName: 'Pooja Sharma', contactEmail: 'pooja@maison10.in', stage: '₹5 Cr+ revenue', status: 'Active', discoveryCallDate: 'May 29, 2025', discoveryCallTime: '10:30 AM', onboardedOn: 'May 20, 2025' },
  { id: 'br-5', name: 'NOIR THEORY', code: 'NT', website: 'noirtheory.com', contactName: 'Neha D\'souza', contactEmail: 'neha@noirtheory.com', stage: '₹1–5 Cr revenue', status: 'Active', discoveryCallDate: 'May 28, 2025', discoveryCallTime: '03:00 PM', onboardedOn: 'May 21, 2025' },
  { id: 'br-6', name: 'AYA', code: 'AYA', website: 'aya.in', contactName: 'Ananya Bansal', contactEmail: 'ananya@aya.in', stage: 'Pre-launch', status: 'Inactive', discoveryCallDate: '–', discoveryCallTime: '', onboardedOn: 'May 18, 2025' },
  { id: 'br-7', name: 'DHRUV & CO.', code: 'D&CO', website: 'dhruvandco.com', contactName: 'Dhruv Malik', contactEmail: 'dhruv@dhruvandco.com', stage: '₹5 Cr+ revenue', status: 'Active', discoveryCallDate: 'May 27, 2025', discoveryCallTime: '05:20 PM', onboardedOn: 'May 17, 2025' },
  { id: 'br-8', name: 'STHREADS', code: 'ST', website: 'sthreads.com', contactName: 'Karan Thakur', contactEmail: 'karan@sthreads.com', stage: 'First collection live', status: 'Inactive', discoveryCallDate: '–', discoveryCallTime: '', onboardedOn: 'May 16, 2025' },
];

const INITIAL_CASE_STUDIES: CaseStudyItem[] = [
  { id: 'cs-1', title: 'How We Helped Aria Studio Scale from ₹1 Cr to ₹10 Cr', brandName: 'Aria Studio', brandCode: 'A', industry: 'D2C Fashion', status: 'Published', publishedOn: 'May 28, 2025', views: 342, imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&auto=format&fit=crop&q=80' },
  { id: 'cs-2', title: 'Building Noma Living: Sourcing. Quality. Scale.', brandName: 'Noma Living', brandCode: 'N', industry: 'Home & Living', status: 'Published', publishedOn: 'May 22, 2025', views: 278, imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&auto=format&fit=crop&q=80' },
  { id: 'cs-3', title: 'From First Collection to National Presence', brandName: 'Riya & Co.', brandCode: 'R', industry: 'Women\'s Wear', status: 'Published', publishedOn: 'May 18, 2025', views: 210, imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&auto=format&fit=crop&q=80' },
  { id: 'cs-4', title: 'Urban Form: Building a Scalable Menswear Brand', brandName: 'Urban Form', brandCode: 'U', industry: 'Menswear', status: 'Draft', publishedOn: '–', views: 0, imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&auto=format&fit=crop&q=80' },
  { id: 'cs-5', title: 'The Bare Edit: Creating a Premium Accessories Brand', brandName: 'The Bare Edit', brandCode: 'B', industry: 'Accessories', status: 'Draft', publishedOn: '–', views: 0, imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&auto=format&fit=crop&q=80' },
  { id: 'cs-6', title: 'Elevating Athleisure with Performance & Design', brandName: 'MoveAth', brandCode: 'M', industry: 'Athleisure', status: 'Published', publishedOn: 'May 10, 2025', views: 198, imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&auto=format&fit=crop&q=80' },
];

export default function AdminDashboardPage() {
  // Production Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Check auth session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lal10_auth_user');
      if (stored === 'buitlal10') {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.warn('localStorage access error', e);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    const user = loginUsername.trim().toLowerCase();
    const pass = loginPassword.trim();

    if ((user === 'buitlal10' || user === 'builtlal10' || user === 'admin@lal10.com') && pass === 'founder@lal10@2026') {
      try {
        localStorage.setItem('lal10_auth_user', 'buitlal10');
      } catch (err) {}
      setIsAuthenticated(true);
      setIsLoggingIn(false);
    } else {
      setTimeout(() => {
        setLoginError('Invalid username or password. Please verify credentials.');
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

  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState('May 24, 2025 – May 30, 2025');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(7);
  const [contentMenuOpen, setContentMenuOpen] = useState(true);

  // Dynamic Data States
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(INITIAL_ENQUIRIES);
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [calls, setCalls] = useState<DiscoveryCallItem[]>(INITIAL_CALLS);
  const [brands, setBrands] = useState<BrandItem[]>(INITIAL_BRANDS);
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>(INITIAL_CASE_STUDIES);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [stageFilter, setStageFilter] = useState('All Stages');
  const [revenueFilter, setRevenueFilter] = useState('All Revenue');
  const [hostFilter, setHostFilter] = useState('All Hosts');
  const [industryFilter, setIndustryFilter] = useState('All Industry');
  const [sortBy, setSortBy] = useState('Newest First');

  // Modals
  const [activeModal, setActiveModal] = useState<'view-enquiry' | 'add-user' | 'book-call' | 'add-brand' | 'add-casestudy' | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);

  // New Item Form States
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Editor' as const, status: 'Active' as const });
  const [newCall, setNewCall] = useState({ brand: '', contactName: '', contactEmail: '', stage: 'Pre-launch', callDate: '', callTime: '', callHost: 'Rohit Verma' });
  const [newBrand, setNewBrand] = useState({ name: '', website: '', contactName: '', contactEmail: '', stage: 'Pre-launch' });
  const [newCaseStudy, setNewCaseStudy] = useState({ title: '', brandName: '', industry: 'D2C Fashion', status: 'Published' as const });

  // Fetch real leads from /api/discovery-call on mount
  useEffect(() => {
    async function loadApiLeads() {
      try {
        const res = await fetch('/api/discovery-call');
        const data = await res.json();
        if (data.leads && Array.isArray(data.leads) && data.leads.length > 0) {
          const mapped: EnquiryItem[] = data.leads.map((l: DiscoveryCallLead) => ({
            id: l.id,
            name: l.fullName,
            email: l.email,
            brand: l.brandName,
            stage: l.stage || 'Pre-launch',
            source: 'Website',
            date: new Date(l.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: (String(l.status).toLowerCase() === 'new' ? 'New' : String(l.status).toLowerCase() === 'contacted' ? 'Contacted' : String(l.status).toLowerCase() === 'scheduled' ? 'Discovery Call' : 'Qualified') as EnquiryItem['status'],
            phone: l.phone,
            notes: l.notes,
          }));

          setEnquiries(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newOnes = mapped.filter(m => !existingIds.has(m.id));
            return [...newOnes, ...prev];
          });
        }
      } catch (err) {
        console.error('Failed to load API leads in admin:', err);
      }
    }
    loadApiLeads();
  }, []);

  // Filtered Lists
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter(item => {
      const matchesSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
      const matchesStage = stageFilter === 'All Stages' || item.stage === stageFilter;
      return matchesSearch && matchesStatus && matchesStage;
    });
  }, [enquiries, searchQuery, statusFilter, stageFilter]);

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

  const filteredCalls = useMemo(() => {
    return calls.filter(item => {
      const matchesSearch = !searchQuery || 
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All Status' || item.callStatus === statusFilter;
      const matchesHost = hostFilter === 'All Hosts' || item.callHost === hostFilter;
      const matchesStage = stageFilter === 'All Stages' || item.stage === stageFilter;
      return matchesSearch && matchesStatus && matchesHost && matchesStage;
    });
  }, [calls, searchQuery, statusFilter, hostFilter, stageFilter]);

  const filteredBrands = useMemo(() => {
    return brands.filter(item => {
      const matchesSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
      const matchesStage = stageFilter === 'All Stages' || item.stage === stageFilter;
      const matchesRevenue = revenueFilter === 'All Revenue' || item.stage === revenueFilter;
      return matchesSearch && matchesStatus && matchesStage && matchesRevenue;
    });
  }, [brands, searchQuery, statusFilter, stageFilter, revenueFilter]);

  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter(item => {
      const matchesSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.industry.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
      const matchesIndustry = industryFilter === 'All Industry' || item.industry === industryFilter;
      return matchesSearch && matchesStatus && matchesIndustry;
    });
  }, [caseStudies, searchQuery, statusFilter, industryFilter]);

  // Handlers for dynamic creation
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    const colors = ['#F4E8D6', '#E6E8F2', '#FBE8E8', '#FDECE6', '#E8F5E9', '#EDE7F6'];
    const created: UserItem = {
      id: `usr-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      joinedOn: 'Just now',
      lastActive: 'Just now',
      avatarColor: colors[Math.floor(Math.random() * colors.length)],
    };
    setUsers([created, ...users]);
    setNewUser({ name: '', email: '', role: 'Editor', status: 'Active' });
    setActiveModal(null);
  };

  const handleBookCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCall.brand || !newCall.contactName) return;
    const created: DiscoveryCallItem = {
      id: `call-${Date.now()}`,
      brand: newCall.brand.toUpperCase(),
      brandCode: newCall.brand.slice(0, 2).toUpperCase(),
      contactName: newCall.contactName,
      contactEmail: newCall.contactEmail,
      stage: newCall.stage,
      callDate: newCall.callDate,
      callTime: newCall.callTime,
      callHost: newCall.callHost,
      hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      callStatus: 'Scheduled',
      outcome: '–',
    };
    setCalls([created, ...calls]);
    setNewCall({ brand: '', contactName: '', contactEmail: '', stage: 'Pre-launch', callDate: 'Jun 05, 2025', callTime: '11:00 AM', callHost: 'Rohit Verma' });
    setActiveModal(null);
  };

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrand.name || !newBrand.contactName) return;
    const created: BrandItem = {
      id: `br-${Date.now()}`,
      name: newBrand.name.toUpperCase(),
      code: newBrand.name.slice(0, 2).toUpperCase(),
      website: newBrand.website || `${newBrand.name.toLowerCase().replace(/\s+/g, '')}.com`,
      contactName: newBrand.contactName,
      contactEmail: newBrand.contactEmail,
      stage: newBrand.stage,
      status: 'Active',
      discoveryCallDate: 'Jun 02, 2025',
      discoveryCallTime: '11:00 AM',
      onboardedOn: 'May 30, 2025',
    };
    setBrands([created, ...brands]);
    setNewBrand({ name: '', website: '', contactName: '', contactEmail: '', stage: '₹1–5 Cr revenue' });
    setActiveModal(null);
  };

  const handleAddCaseStudy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaseStudy.title || !newCaseStudy.brandName) return;
    const created: CaseStudyItem = {
      id: `cs-${Date.now()}`,
      title: newCaseStudy.title,
      brandName: newCaseStudy.brandName,
      brandCode: newCaseStudy.brandName.slice(0, 1).toUpperCase(),
      industry: newCaseStudy.industry,
      status: newCaseStudy.status,
      publishedOn: newCaseStudy.status === 'Published' ? 'May 30, 2025' : '–',
      views: newCaseStudy.status === 'Published' ? 12 : 0,
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&auto=format&fit=crop&q=80',
    };
    setCaseStudies([created, ...caseStudies]);
    setNewCaseStudy({ title: '', brandName: '', industry: 'D2C Fashion', status: 'Published' });
    setActiveModal(null);
  };

  // CSV Export
  const exportData = (type: string) => {
    let rows: string[][] = [];
    let headers: string[] = [];
    let filename = `lal10_${type}_${Date.now()}.csv`;

    if (type === 'enquiries') {
      headers = ['Name', 'Email', 'Brand', 'Stage', 'Source', 'Date', 'Status', 'Phone'];
      rows = filteredEnquiries.map(e => [e.name, e.email, e.brand, e.stage, e.source, e.date, e.status, e.phone || '']);
    } else if (type === 'users') {
      headers = ['Name', 'Email', 'Role', 'Status', 'Joined On', 'Last Active'];
      rows = filteredUsers.map(u => [u.name, u.email, u.role, u.status, u.joinedOn, u.lastActive]);
    } else if (type === 'calls') {
      headers = ['Brand', 'Contact', 'Email', 'Stage', 'Date', 'Time', 'Host', 'Status', 'Outcome'];
      rows = filteredCalls.map(c => [c.brand, c.contactName, c.contactEmail, c.stage, c.callDate, c.callTime, c.callHost, c.callStatus, c.outcome]);
    } else if (type === 'brands') {
      headers = ['Brand', 'Website', 'Contact', 'Email', 'Stage', 'Status', 'Discovery Call', 'Onboarded'];
      rows = filteredBrands.map(b => [b.name, b.website, b.contactName, b.contactEmail, b.stage, b.status, b.discoveryCallDate, b.onboardedOn]);
    } else {
      headers = ['Title', 'Brand', 'Industry', 'Status', 'Published On', 'Views'];
      rows = filteredCaseStudies.map(cs => [cs.title, cs.brandName, cs.industry, cs.status, cs.publishedOn, String(cs.views)]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.map(cell => `"${cell}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper styles
  const getStageBadgeStyle = (stage: string) => {
    if (stage.includes('5 Cr+')) return { background: '#F8EDE5', color: '#8A5336', border: '1px solid #EED8CA' };
    if (stage.includes('1–5 Cr') || stage.includes('1-5 Cr')) return { background: '#F9F1E6', color: '#94672B', border: '1px solid #EFE0CC' };
    if (stage.includes('First collection')) return { background: '#FDECE6', color: '#A04832', border: '1px solid #F5D3C7' };
    return { background: '#EAF2FB', color: '#2B6CB0', border: '1px solid #D1E3F6' };
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'New': return { background: '#EAF2FB', color: '#2B6CB0' };
      case 'Contacted': return { background: '#FFF4E5', color: '#B76E00' };
      case 'Qualified': return { background: '#E6F4EA', color: '#137333' };
      case 'In Discussion': return { background: '#F3E8FD', color: '#7B1FA2' };
      case 'Discovery Call':
      case 'Scheduled': return { background: '#E8F0FE', color: '#1A73E8' };
      case 'Active':
      case 'Completed':
      case 'Published': return { background: '#E6F4EA', color: '#137333' };
      case 'Inactive':
      case 'Cancelled': return { background: '#FDE8E8', color: '#C5221F' };
      case 'Draft': return { background: '#F1F3F4', color: '#5F6368' };
      default: return { background: '#F1F3F4', color: '#5F6368' };
    }
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case 'Admin': return { background: '#FBE8E8', color: '#C5221F' };
      case 'Editor': return { background: '#E8F0FE', color: '#1A73E8' };
      case 'Manager': return { background: '#FFF4E5', color: '#B76E00' };
      case 'Viewer': return { background: '#E6F4EA', color: '#137333' };
      default: return { background: '#F1F3F4', color: '#5F6368' };
    }
  };

  // Reusable Navigation List
  const renderNavLinks = () => (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <button
        onClick={() => { setActiveTab('dashboard'); setSearchQuery(''); setMobileSidebarOpen(false); }}
        style={{
          display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '11px 14px',
          borderRadius: '8px', fontSize: '13px', fontWeight: activeTab === 'dashboard' ? 700 : 500,
          color: activeTab === 'dashboard' ? '#5B1F28' : '#57524B',
          background: activeTab === 'dashboard' ? '#F7EDE6' : 'transparent',
          border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease'
        }}
      >
        <LayoutDashboard size={17} color={activeTab === 'dashboard' ? '#5B1F28' : '#7D756C'} />
        <span>Dashboard</span>
      </button>

      <button
        onClick={() => { setActiveTab('enquiries'); setSearchQuery(''); setMobileSidebarOpen(false); }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
          padding: '11px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: activeTab === 'enquiries' ? 700 : 500,
          color: activeTab === 'enquiries' ? '#5B1F28' : '#57524B',
          background: activeTab === 'enquiries' ? '#F7EDE6' : 'transparent',
          border: 'none', cursor: 'pointer', transition: 'all 0.15s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Users size={17} color={activeTab === 'enquiries' ? '#5B1F28' : '#7D756C'} />
          <span>Enquiries</span>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 7px', borderRadius: '10px', background: '#F1EBE4', color: '#685D52' }}>
          82
        </span>
      </button>

      <button
        onClick={() => { setActiveTab('brands'); setSearchQuery(''); setMobileSidebarOpen(false); }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
          padding: '11px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: activeTab === 'brands' ? 700 : 500,
          color: activeTab === 'brands' ? '#5B1F28' : '#57524B',
          background: activeTab === 'brands' ? '#F7EDE6' : 'transparent',
          border: 'none', cursor: 'pointer', transition: 'all 0.15s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Building2 size={17} color={activeTab === 'brands' ? '#5B1F28' : '#7D756C'} />
          <span>Brands</span>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 7px', borderRadius: '10px', background: '#F1EBE4', color: '#685D52' }}>
          32
        </span>
      </button>

      <button
        onClick={() => { setActiveTab('calls'); setSearchQuery(''); setMobileSidebarOpen(false); }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
          padding: '11px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: activeTab === 'calls' ? 700 : 500,
          color: activeTab === 'calls' ? '#5B1F28' : '#57524B',
          background: activeTab === 'calls' ? '#F7EDE6' : 'transparent',
          border: 'none', cursor: 'pointer', transition: 'all 0.15s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <PhoneCall size={17} color={activeTab === 'calls' ? '#5B1F28' : '#7D756C'} />
          <span>Discovery Calls</span>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 7px', borderRadius: '10px', background: '#F1EBE4', color: '#685D52' }}>
          18
        </span>
      </button>

      <button
        onClick={() => { setActiveTab('users'); setSearchQuery(''); setMobileSidebarOpen(false); }}
        style={{
          display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '11px 14px',
          borderRadius: '8px', fontSize: '13px', fontWeight: activeTab === 'users' ? 700 : 500,
          color: activeTab === 'users' ? '#5B1F28' : '#57524B',
          background: activeTab === 'users' ? '#F7EDE6' : 'transparent',
          border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease'
        }}
      >
        <Users size={17} color={activeTab === 'users' ? '#5B1F28' : '#7D756C'} />
        <span>Users</span>
      </button>

      <div>
        <button
          onClick={() => setContentMenuOpen(!contentMenuOpen)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
            padding: '11px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500,
            color: '#57524B', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FolderKanban size={17} color="#7D756C" />
            <span>Content Management</span>
          </div>
          <ChevronDown size={14} color="#7D756C" style={{ transform: contentMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
      </div>

      <button
        onClick={() => { setActiveTab('casestudies'); setSearchQuery(''); setMobileSidebarOpen(false); }}
        style={{
          display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '11px 14px',
          borderRadius: '8px', fontSize: '13px', fontWeight: activeTab === 'casestudies' ? 700 : 500,
          color: activeTab === 'casestudies' ? '#5B1F28' : '#57524B',
          background: activeTab === 'casestudies' ? '#F7EDE6' : 'transparent',
          border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease'
        }}
      >
        <BookOpen size={17} color={activeTab === 'casestudies' ? '#5B1F28' : '#7D756C'} />
        <span>Case Studies</span>
      </button>

      <Link
        href="/email-preview"
        style={{
          display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '11px 14px',
          borderRadius: '8px', fontSize: '13px', fontWeight: 600,
          color: '#8A5336', background: '#FDF4EB', border: '1px solid #EED8CA',
          textDecoration: 'none', transition: 'all 0.15s ease', marginTop: '6px'
        }}
      >
        <Mail size={17} color="#8A5336" />
        <span>Email Templates Preview ↗</span>
      </Link>

      <button
        onClick={() => { setActiveTab('insights'); setSearchQuery(''); setMobileSidebarOpen(false); }}
        style={{
          display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '11px 14px',
          borderRadius: '8px', fontSize: '13px', fontWeight: activeTab === 'insights' ? 700 : 500,
          color: activeTab === 'insights' ? '#5B1F28' : '#57524B',
          background: activeTab === 'insights' ? '#F7EDE6' : 'transparent',
          border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease'
        }}
      >
        <BarChart3 size={17} color={activeTab === 'insights' ? '#5B1F28' : '#7D756C'} />
        <span>Insights &amp; Reports</span>
      </button>

      <button
        onClick={() => { setActiveTab('settings'); setSearchQuery(''); setMobileSidebarOpen(false); }}
        style={{
          display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '11px 14px',
          borderRadius: '8px', fontSize: '13px', fontWeight: activeTab === 'settings' ? 700 : 500,
          color: activeTab === 'settings' ? '#5B1F28' : '#57524B',
          background: activeTab === 'settings' ? '#F7EDE6' : 'transparent',
          border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease'
        }}
      >
        <Settings size={17} color={activeTab === 'settings' ? '#5B1F28' : '#7D756C'} />
        <span>Settings</span>
      </button>

      <button
        onClick={() => { setActiveTab('integrations'); setSearchQuery(''); setMobileSidebarOpen(false); }}
        style={{
          display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '11px 14px',
          borderRadius: '8px', fontSize: '13px', fontWeight: activeTab === 'integrations' ? 700 : 500,
          color: activeTab === 'integrations' ? '#5B1F28' : '#57524B',
          background: activeTab === 'integrations' ? '#F7EDE6' : 'transparent',
          border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease'
        }}
      >
        <Compass size={17} color={activeTab === 'integrations' ? '#5B1F28' : '#7D756C'} />
        <span>Integrations</span>
      </button>
    </nav>
  );

  if (!authChecked) {
    return <div style={{ minHeight: '100vh', background: '#0F0E0D' }} />;
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at center, #1E1B18 0%, #0F0E0D 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: "'Manrope', system-ui, sans-serif",
        color: '#F5F1EA'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '430px',
          background: '#171615',
          border: '1px solid #2B2723',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
        }}>
          {/* Top Gold Accent Line */}
          <div style={{ height: '4px', background: 'linear-gradient(90deg, #A87944 0%, #D4AF37 50%, #8B5A2B 100%)' }} />

          <div style={{ padding: '40px 34px 34px' }}>
            
            {/* Logo & Subtitle */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', fontWeight: 600, letterSpacing: '6px', color: '#FAF8F5', lineHeight: 1 }}>
                LAL10
              </div>
              <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#A87944', fontWeight: 700, marginTop: '8px' }}>
                FASHION BRAND OPERATING SYSTEM
              </div>
              <div style={{ fontSize: '13px', color: '#8A8075', marginTop: '14px' }}>
                Sign in with authorized administrator credentials
              </div>
            </div>

            {/* Error Alert */}
            {loginError && (
              <div style={{
                marginBottom: '20px',
                padding: '12px 16px',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                borderRadius: '8px',
                color: '#FCA5A5',
                fontSize: '12.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <AlertCircle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '10.5px', letterSpacing: '1px', textTransform: 'uppercase', color: '#A09689', fontWeight: 600, marginBottom: '7px' }}>
                  Username
                </label>
                <input
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="Enter username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    background: '#24211E',
                    border: '1px solid #3D3832',
                    borderRadius: '8px',
                    color: '#FAF8F5',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '26px' }}>
                <label style={{ display: 'block', fontSize: '10.5px', letterSpacing: '1px', textTransform: 'uppercase', color: '#A09689', fontWeight: 600, marginBottom: '7px' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    placeholder="Enter password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '13px 44px 13px 16px',
                      background: '#24211E',
                      border: '1px solid #3D3832',
                      borderRadius: '8px',
                      color: '#FAF8F5',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
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
                      background: 'transparent',
                      border: 'none',
                      color: '#8A8075',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #A87944 100%)',
                  color: '#171615',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(184,134,11,0.25)',
                  transition: 'opacity 0.2s'
                }}
              >
                {isLoggingIn ? 'AUTHENTICATING...' : 'SIGN IN TO OPERATING SYSTEM →'}
              </button>
            </form>

            <div style={{ marginTop: '26px', paddingTop: '18px', borderTop: '1px solid #2B2723', textAlign: 'center', fontSize: '11px', color: '#6E675E', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Shield size={13} color="#A87944" />
              <span>Production Access · Encrypted Administrator Session</span>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FBF9F6', fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif", color: '#1E1E1E', flexDirection: 'column' }}>
      
      {/* ── MOBILE TOP NAVIGATION BAR (< 1024px) ─────────────────────────────── */}
      <header className="admin-mobile-nav" style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #EFEAE3',
        padding: '14px 20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
            aria-label="Open menu"
          >
            <Menu size={22} color="#1A1817" />
          </button>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 600, letterSpacing: '3px', color: '#1A1817', lineHeight: 1 }}>
              LAL10
            </div>
            <div style={{ fontSize: '8px', letterSpacing: '2px', color: '#9B9084', fontWeight: 600, textTransform: 'uppercase' }}>
              FASHIONS
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#FAF6F0', border: '1px solid #E4DDD4', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
          >
            <Bell size={15} color="#57524B" />
            {unreadNotifications > 0 && (
              <span style={{ position: 'absolute', top: '-3px', right: '-3px', background: '#5B1F28', color: '#FFF', fontSize: '9px', fontWeight: 700, width: '15px', height: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {unreadNotifications}
              </span>
            )}
          </button>
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80"
            alt="Admin User"
            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
      </header>

      {/* ── MOBILE DRAWER SIDEBAR (< 1024px) ─────────────────────────────────── */}
      {mobileSidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex' }}>
          {/* Backdrop */}
          <div
            onClick={() => setMobileSidebarOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)' }}
          />

          {/* Drawer Content */}
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
                    FASHIONS
                  </div>
                </div>
                <button onClick={() => setMobileSidebarOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                  <X size={20} color="#666" />
                </button>
              </div>

              {/* Profile Pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', margin: '16px 0', background: '#FAF6F0', borderRadius: '10px', border: '1px solid #EFE7DC' }}>
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                  alt="Admin User"
                  style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1A1817' }}>buitlal10</div>
                  <div style={{ fontSize: '11px', color: '#8A7D71' }}>Founder &amp; Administrator</div>
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
                FASHIONS
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', margin: '16px 0 20px', background: '#FAF6F0', borderRadius: '10px', border: '1px solid #EFE7DC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
                  alt="Admin User"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1A1817', lineHeight: 1.2 }}>buitlal10</div>
                  <div style={{ fontSize: '11px', color: '#8A7D71', marginTop: '2px' }}>Founder &amp; Administrator</div>
                </div>
              </div>
              <ChevronDown size={14} color="#8A7D71" />
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
        <main className="admin-main-container" style={{ flex: 1, overflowY: 'auto', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>

          {/* TOP HEADER ROW */}
          <div className="admin-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
            <div>
              {activeTab === 'dashboard' ? (
                <>
                  <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1817', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Welcome back, buitlal10 <span style={{ fontSize: '22px' }}>👋</span>
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

            {/* Right Header Controls */}
            <div className="admin-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Date Range Picker */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowDateDropdown(!showDateDropdown)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF',
                    border: '1px solid #E4DDD4', borderRadius: '8px', padding: '9px 12px',
                    fontSize: '12px', fontWeight: 600, color: '#1A1817', cursor: 'pointer'
                  }}
                >
                  <span style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{dateRange}</span>
                  <Calendar size={14} color="#7E766D" />
                </button>

                {showDateDropdown && (
                  <div style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: '6px',
                    background: '#FFFFFF', border: '1px solid #E4DDD4', borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)', padding: '8px 0', minWidth: '200px', zIndex: 50
                  }}>
                    {['Today', 'Last 7 Days', 'May 24, 2025 – May 30, 2025', 'This Month', 'All Time'].map(range => (
                      <button
                        key={range}
                        onClick={() => { setDateRange(range); setShowDateDropdown(false); }}
                        style={{
                          display: 'block', width: '100%', textAlign: 'left', padding: '8px 16px',
                          fontSize: '12.5px', color: range === dateRange ? '#5B1F28' : '#333',
                          fontWeight: range === dateRange ? 700 : 500,
                          background: range === dateRange ? '#FAF5F1' : 'transparent',
                          border: 'none', cursor: 'pointer'
                        }}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons specific to each tab */}
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
              {activeTab === 'casestudies' && (
                <button onClick={() => setActiveModal('add-casestudy')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#3D1219', color: '#FFFFFF', padding: '9px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                  <Plus size={14} /><span>Add Case Study</span>
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
              TAB 1: DASHBOARD
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* 4 Stat Cards */}
              <div className="admin-stats-grid">
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={17} color="#8A4A32" />
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500, marginTop: '12px' }}>Total Enquiries</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', lineHeight: 1 }}>248</div>
                    <svg width="70" height="24" viewBox="0 0 80 26" fill="none">
                      <path d="M2 20L20 16L40 18L60 10L78 4" stroke="#C97A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '8px' }}>↑ 18.6% vs May 17 – May 23</div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={17} color="#8A4A32" />
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500, marginTop: '12px' }}>New This Week</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', lineHeight: 1 }}>18</div>
                    <svg width="70" height="24" viewBox="0 0 80 26" fill="none">
                      <path d="M2 18L22 19L42 14L62 12L78 6" stroke="#C97A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '8px' }}>↑ 12.4% vs May 17 – May 23</div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PhoneCall size={17} color="#8A4A32" />
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500, marginTop: '12px' }}>Discovery Calls</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', lineHeight: 1 }}>12</div>
                    <svg width="70" height="24" viewBox="0 0 80 26" fill="none">
                      <path d="M2 22L20 18L40 20L60 14L78 8" stroke="#C97A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '8px' }}>↑ 9.1% vs May 17 – May 23</div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={17} color="#8A4A32" />
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500, marginTop: '12px' }}>Active Prospects</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', lineHeight: 1 }}>34</div>
                    <svg width="70" height="24" viewBox="0 0 80 26" fill="none">
                      <path d="M2 22L20 20L40 16L60 18L78 6" stroke="#C97A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '8px' }}>↑ 13.3% vs May 17 – May 23</div>
                </div>
              </div>

              {/* Middle Row: Charts */}
              <div className="admin-charts-grid">
                
                {/* Line Chart */}
                <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1A1817', margin: 0 }}>Enquiries Over Time</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#FAF6F0', padding: '4px 10px', borderRadius: '6px', border: '1px solid #EFEAE3', fontSize: '11.5px', fontWeight: 600 }}>
                      <span>Daily</span>
                      <ChevronDown size={12} color="#666" />
                    </div>
                  </div>

                  <div style={{ position: 'relative', width: '100%', height: '190px' }}>
                    <svg width="100%" height="150" viewBox="0 0 600 180" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8A4A32" stopOpacity="0.25"/>
                          <stop offset="100%" stopColor="#8A4A32" stopOpacity="0.0"/>
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="20" x2="600" y2="20" stroke="#F0EBE4" strokeDasharray="3 3" />
                      <line x1="0" y1="60" x2="600" y2="60" stroke="#F0EBE4" strokeDasharray="3 3" />
                      <line x1="0" y1="100" x2="600" y2="100" stroke="#F0EBE4" strokeDasharray="3 3" />
                      <line x1="0" y1="140" x2="600" y2="140" stroke="#F0EBE4" strokeDasharray="3 3" />
                      <path d="M 20 120 L 70 80 L 130 95 L 180 90 L 230 50 L 280 70 L 330 90 L 380 50 L 440 50 L 510 30 L 580 10 L 580 170 L 20 170 Z" fill="url(#chartGradient2)" />
                      <path d="M 20 120 L 70 80 L 130 95 L 180 90 L 230 50 L 280 70 L 330 90 L 380 50 L 440 50 L 510 30 L 580 10" fill="none" stroke="#5B1F28" strokeWidth="3" />
                      {[ [20, 120], [70, 80], [130, 95], [180, 90], [230, 50], [280, 70], [330, 90], [380, 50], [440, 50], [510, 30], [580, 10] ].map(([x, y], idx) => (
                        <circle key={idx} cx={x} cy={y} r="4.5" fill="#5B1F28" stroke="#FFFFFF" strokeWidth="2" />
                      ))}
                    </svg>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '10px', color: '#8A8279' }}>
                      <span>May 17</span><span>May 20</span><span>May 23</span><span>May 26</span><span>May 30</span>
                    </div>
                  </div>
                </div>

                {/* Donut Chart */}
                <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1A1817', margin: '0 0 12px' }}>Enquiries by Source</h3>

                  <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto' }}>
                    <svg width="140" height="140" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r="60" fill="transparent" stroke="#5B1F28" strokeWidth="22" strokeDasharray="194 377" strokeDashoffset="0" />
                      <circle cx="80" cy="80" r="60" fill="transparent" stroke="#B07058" strokeWidth="22" strokeDasharray="85 377" strokeDashoffset="-194" />
                      <circle cx="80" cy="80" r="60" fill="transparent" stroke="#D19E75" strokeWidth="22" strokeDasharray="57 377" strokeDashoffset="-279" />
                      <circle cx="80" cy="80" r="60" fill="transparent" stroke="#DEC8B5" strokeWidth="22" strokeDasharray="24 377" strokeDashoffset="-336" />
                      <circle cx="80" cy="80" r="60" fill="transparent" stroke="#EFE4D8" strokeWidth="22" strokeDasharray="17 377" strokeDashoffset="-360" />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ fontSize: '20px', fontWeight: 800, color: '#1A1817' }}>248</div>
                      <div style={{ fontSize: '10.5px', color: '#8A7D71' }}>Total</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px', fontSize: '11.5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Website</span><strong>128 (51.6%)</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>LinkedIn</span><strong>56 (22.6%)</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Referral</span><strong>38 (15.3%)</strong></div>
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
                      View all
                    </button>
                  </div>

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
                </div>

                {/* Right Widgets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1A1817', margin: 0 }}>Upcoming Calls</h4>
                      <button onClick={() => setActiveTab('calls')} style={{ fontSize: '11px', fontWeight: 600, color: '#1A1817', background: 'none', border: 'none', cursor: 'pointer' }}>View all</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ padding: '3px 6px', background: '#FAF5EE', border: '1px solid #EADDCF', borderRadius: '6px', textAlign: 'center', minWidth: '36px' }}>
                            <div style={{ fontSize: '8px', fontWeight: 700, color: '#8A5336' }}>MAY</div>
                            <div style={{ fontSize: '13px', fontWeight: 800, color: '#1A1817', lineHeight: 1 }}>31</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#1A1817' }}>Aria Studio</div>
                            <div style={{ fontSize: '10.5px', color: '#8A7D71' }}>Arjun Mehta</div>
                          </div>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#57524B' }}>11:00 AM</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1A1817', margin: '0 0 12px' }}>Recent Activity</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11.5px' }}>
                      <div>New enquiry from <strong>Aria Studio</strong> <div style={{ fontSize: '10px', color: '#888' }}>10 mins ago</div></div>
                      <div>Call completed with <strong>Noma Living</strong> <div style={{ fontSize: '10px', color: '#888' }}>1 hour ago</div></div>
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
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Total Users</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>142</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>↑ 12.5% vs May 17 – May 23</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Active Users</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>118</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>↑ 14.2% vs May 17 – May 23</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>New This Week</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>12</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>↑ 20.0% vs May 17 – May 23</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Admins</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>6</div>
                  <div style={{ fontSize: '11px', color: '#7E766D', fontWeight: 600, marginTop: '6px' }}>↑ 0% vs May 17 – May 23</div>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', padding: '20px' }}>
                <div className="admin-filter-row" style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', gap: '10px', flex: 1, flexWrap: 'wrap' }}>
                    <input
                      type="text" placeholder="Search by name, email..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '12.5px', border: '1px solid #E4DDD4', borderRadius: '6px', minWidth: '180px', flex: 1 }}
                    />
                    <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={{ padding: '8px 12px', fontSize: '12.5px', border: '1px solid #E4DDD4', borderRadius: '6px', background: '#FFF' }}>
                      <option>All Roles</option><option>Admin</option><option>Editor</option><option>Manager</option><option>Viewer</option>
                    </select>
                  </div>
                  <button onClick={() => exportData('users')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFF', border: '1px solid #E4DDD4', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                    <Download size={13} /><span>Export</span>
                  </button>
                </div>

                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                  <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11px', fontWeight: 600 }}>
                        <th style={{ padding: '10px 8px' }}>User</th>
                        <th style={{ padding: '10px 8px' }}>Email</th>
                        <th style={{ padding: '10px 8px' }}>Role</th>
                        <th style={{ padding: '10px 8px' }}>Status</th>
                        <th style={{ padding: '10px 8px' }}>Joined On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(usr => (
                        <tr key={usr.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                          <td style={{ padding: '12px 8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: usr.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }}>
                                {usr.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span style={{ fontWeight: 600 }}>{usr.name}</span>
                            </div>
                          </td>
                          <td style={{ padding: '12px 8px', color: '#57524B' }}>{usr.email}</td>
                          <td style={{ padding: '12px 8px' }}>
                            <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', ...getRoleBadgeStyle(usr.role) }}>{usr.role}</span>
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', ...getStatusBadgeStyle(usr.status) }}>{usr.status}</span>
                          </td>
                          <td style={{ padding: '12px 8px', color: '#7E766D' }}>{usr.joinedOn}</td>
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
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>156</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>↑ 12.4% vs May 17 – May 23</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Completed</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>98</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>↑ 8.7% vs May 17 – May 23</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Scheduled</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>42</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>↑ 15.2% vs May 17 – May 23</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Cancelled</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>16</div>
                  <div style={{ fontSize: '11px', color: '#C5221F', fontWeight: 600, marginTop: '6px' }}>↓ 5.6% vs May 17 – May 23</div>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', padding: '20px' }}>
                <div className="admin-filter-row" style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', gap: '10px', flex: 1, flexWrap: 'wrap' }}>
                    <input
                      type="text" placeholder="Search by brand or contact..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '12.5px', border: '1px solid #E4DDD4', borderRadius: '6px', minWidth: '180px', flex: 1 }}
                    />
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', fontSize: '12.5px', border: '1px solid #E4DDD4', borderRadius: '6px', background: '#FFF' }}>
                      <option>All Status</option><option>Completed</option><option>Scheduled</option><option>Cancelled</option>
                    </select>
                  </div>
                  <button onClick={() => exportData('calls')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFF', border: '1px solid #E4DDD4', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                    <Download size={13} /><span>Export</span>
                  </button>
                </div>

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
                                <div style={{ fontSize: '11px', color: '#7E766D' }}>{cl.contactName}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            <span style={{ fontSize: '10.5px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, ...getStageBadgeStyle(cl.stage) }}>{cl.stage}</span>
                          </td>
                          <td style={{ padding: '12px 8px', color: '#1A1817' }}>{cl.callDate} {cl.callTime}</td>
                          <td style={{ padding: '12px 8px', fontWeight: 600 }}>{cl.callHost}</td>
                          <td style={{ padding: '12px 8px' }}>
                            <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', ...getStatusBadgeStyle(cl.callStatus) }}>{cl.callStatus}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Total Brands</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>32</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>↑ 14.3% vs May 17 – May 23</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Active Brands</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>28</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>↑ 16.1% vs May 17 – May 23</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>New This Week</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>4</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>↑ 33.3% vs May 17 – May 23</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Onboarded to Call</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>18</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>↑ 12.5% vs May 17 – May 23</div>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', padding: '20px' }}>
                <div className="admin-filter-row" style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', gap: '10px', flex: 1, flexWrap: 'wrap' }}>
                    <input
                      type="text" placeholder="Search brands..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '12.5px', border: '1px solid #E4DDD4', borderRadius: '6px', minWidth: '180px', flex: 1 }}
                    />
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', fontSize: '12.5px', border: '1px solid #E4DDD4', borderRadius: '6px', background: '#FFF' }}>
                      <option>All Status</option><option>Active</option><option>Inactive</option>
                    </select>
                  </div>
                  <button onClick={() => exportData('brands')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFF', border: '1px solid #E4DDD4', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                    <Download size={13} /><span>Export</span>
                  </button>
                </div>

                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                  <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11px', fontWeight: 600 }}>
                        <th style={{ padding: '10px 8px' }}>Brand</th>
                        <th style={{ padding: '10px 8px' }}>Contact</th>
                        <th style={{ padding: '10px 8px' }}>Stage</th>
                        <th style={{ padding: '10px 8px' }}>Status</th>
                        <th style={{ padding: '10px 8px' }}>Onboarded</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBrands.map(br => (
                        <tr key={br.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                          <td style={{ padding: '12px 8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#1A1817', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9.5px', fontWeight: 700 }}>
                                {br.code}
                              </div>
                              <div>
                                <div style={{ fontWeight: 700, color: '#1A1817' }}>{br.name}</div>
                                <div style={{ fontSize: '10.5px', color: '#8A7D71' }}>{br.website}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            <div style={{ fontWeight: 600 }}>{br.contactName}</div>
                            <div style={{ fontSize: '10.5px', color: '#8A7D71' }}>{br.contactEmail}</div>
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
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 5: CASE STUDIES
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'casestudies' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div className="admin-stats-grid">
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Total Case Studies</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>24</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>↑ 14.3% vs May 17 – May 23</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Published</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>20</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>↑ 11.1% vs May 17 – May 23</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>In Draft</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>3</div>
                  <div style={{ fontSize: '11px', color: '#C5221F', fontWeight: 600, marginTop: '6px' }}>↓ 25.0% vs May 17 – May 23</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px 22px', borderRadius: '12px', border: '1px solid #EFEAE3' }}>
                  <div style={{ fontSize: '12.5px', color: '#7E766D', fontWeight: 500 }}>Total Views</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1817', marginTop: '4px' }}>1,248</div>
                  <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600, marginTop: '6px' }}>↑ 18.8% vs May 17 – May 23</div>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', padding: '20px' }}>
                <div className="admin-filter-row" style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', gap: '10px', flex: 1, flexWrap: 'wrap' }}>
                    <input
                      type="text" placeholder="Search case studies..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '12.5px', border: '1px solid #E4DDD4', borderRadius: '6px', minWidth: '180px', flex: 1 }}
                    />
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', fontSize: '12.5px', border: '1px solid #E4DDD4', borderRadius: '6px', background: '#FFF' }}>
                      <option>All Status</option><option>Published</option><option>Draft</option>
                    </select>
                  </div>
                  <button onClick={() => exportData('casestudies')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFF', border: '1px solid #E4DDD4', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                    <Download size={13} /><span>Export</span>
                  </button>
                </div>

                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                  <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11px', fontWeight: 600 }}>
                        <th style={{ padding: '10px 8px' }}>Case Study</th>
                        <th style={{ padding: '10px 8px' }}>Brand</th>
                        <th style={{ padding: '10px 8px' }}>Industry</th>
                        <th style={{ padding: '10px 8px' }}>Status</th>
                        <th style={{ padding: '10px 8px' }}>Views</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCaseStudies.map(cs => (
                        <tr key={cs.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                          <td style={{ padding: '12px 8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img src={cs.imageUrl} alt={cs.title} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                              <div style={{ fontWeight: 600, color: '#1A1817' }}>{cs.title}</div>
                            </div>
                          </td>
                          <td style={{ padding: '12px 8px', fontWeight: 600 }}>{cs.brandName}</td>
                          <td style={{ padding: '12px 8px', color: '#57524B' }}>{cs.industry}</td>
                          <td style={{ padding: '12px 8px' }}>
                            <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', ...getStatusBadgeStyle(cs.status) }}>{cs.status}</span>
                          </td>
                          <td style={{ padding: '12px 8px', fontWeight: 600 }}>{cs.views}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 6: ENQUIRIES / LEADS COMPLETE VIEW
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

              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11px', fontWeight: 600 }}>
                      <th style={{ padding: '10px 8px' }}>Name</th>
                      <th style={{ padding: '10px 8px' }}>Brand</th>
                      <th style={{ padding: '10px 8px' }}>Stage</th>
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

      {/* Modal: View / Edit Enquiry */}
      {activeModal === 'view-enquiry' && selectedEnquiry && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '480px', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>Enquiry Details</h3>
              <button onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div><strong>Name:</strong> {selectedEnquiry.name}</div>
              <div><strong>Email:</strong> <a href={`mailto:${selectedEnquiry.email}`} style={{ color: '#5B1F28' }}>{selectedEnquiry.email}</a></div>
              <div><strong>Phone:</strong> {selectedEnquiry.phone || '–'}</div>
              <div><strong>Brand:</strong> {selectedEnquiry.brand}</div>
              <div><strong>Stage:</strong> {selectedEnquiry.stage}</div>
              <div><strong>Source:</strong> {selectedEnquiry.source}</div>
              <div><strong>Date:</strong> {selectedEnquiry.date}</div>
              {selectedEnquiry.notes && (
                <div style={{ background: '#FAF6F0', padding: '10px', borderRadius: '8px' }}>
                  <strong>Notes:</strong>
                  <div style={{ marginTop: '4px', color: '#555' }}>{selectedEnquiry.notes}</div>
                </div>
              )}
              <div>
                <strong>Update Status:</strong>
                <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                  {(['New', 'Contacted', 'Qualified', 'In Discussion', 'Discovery Call'] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        setEnquiries(prev => prev.map(e => e.id === selectedEnquiry.id ? { ...e, status: st } : e));
                        setSelectedEnquiry({ ...selectedEnquiry, status: st });
                      }}
                      style={{
                        padding: '5px 10px', borderRadius: '16px', fontSize: '11px', fontWeight: 600,
                        border: selectedEnquiry.status === st ? '2px solid #5B1F28' : '1px solid #E4DDD4',
                        background: selectedEnquiry.status === st ? '#F7EDE6' : '#FFF',
                        color: selectedEnquiry.status === st ? '#5B1F28' : '#666', cursor: 'pointer'
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

      {/* Modal: Add User */}
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

      {/* Modal: Book Discovery Call */}
      {activeModal === 'book-call' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <form onSubmit={handleBookCall} style={{ background: '#FFFFFF', width: '100%', maxWidth: '440px', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>Schedule Discovery Call</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Assigned Host</label>
                <select value={newCall.callHost} onChange={e => setNewCall({ ...newCall, callHost: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '12.5px' }}>
                  <option>Rohit Verma</option><option>Ananya Rao</option><option>Priya Nair</option>
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

      {/* Modal: Add Brand */}
      {activeModal === 'add-brand' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <form onSubmit={handleAddBrand} style={{ background: '#FFFFFF', width: '100%', maxWidth: '440px', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>Add New Brand</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Brand Name *</label>
                <input required type="text" placeholder="e.g. MOIRAE" value={newBrand.name} onChange={e => setNewBrand({ ...newBrand, name: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '12.5px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Contact Person *</label>
                  <input required type="text" placeholder="Aman Gupta" value={newBrand.contactName} onChange={e => setNewBrand({ ...newBrand, contactName: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '12.5px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Email *</label>
                  <input required type="email" placeholder="aman@moirae.in" value={newBrand.contactEmail} onChange={e => setNewBrand({ ...newBrand, contactEmail: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '12.5px' }} />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
              <button type="button" onClick={() => setActiveModal(null)} style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #DDD', background: '#FFF', cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
              <button type="submit" style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', background: '#5B1F28', color: '#FFF', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}>Save Brand</button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Add Case Study */}
      {activeModal === 'add-casestudy' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <form onSubmit={handleAddCaseStudy} style={{ background: '#FFFFFF', width: '100%', maxWidth: '440px', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>Add New Case Study</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Headline / Title *</label>
                <input required type="text" placeholder="How Maison 10 Built On-Demand Sourcing" value={newCaseStudy.title} onChange={e => setNewCaseStudy({ ...newCaseStudy, title: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '12.5px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Brand Name *</label>
                  <input required type="text" placeholder="Maison 10" value={newCaseStudy.brandName} onChange={e => setNewCaseStudy({ ...newCaseStudy, brandName: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '12.5px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Industry</label>
                  <select value={newCaseStudy.industry} onChange={e => setNewCaseStudy({ ...newCaseStudy, industry: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '12.5px' }}>
                    <option>D2C Fashion</option><option>Home &amp; Living</option><option>Women&apos;s Wear</option><option>Menswear</option><option>Accessories</option><option>Athleisure</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
              <button type="button" onClick={() => setActiveModal(null)} style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #DDD', background: '#FFF', cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
              <button type="submit" style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', background: '#5B1F28', color: '#FFF', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}>Save Case Study</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
