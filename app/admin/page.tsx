'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, Users, PhoneCall, Building2, BookOpen, 
  BarChart3, Settings, LogOut, ChevronDown, ChevronRight, 
  Bell, Calendar, Search, Filter, Eye, MoreVertical, Plus, 
  ArrowUpRight, TrendingUp, TrendingDown, Check, X, Edit3, 
  Trash2, Mail, ExternalLink, SlidersHorizontal, Sparkles, 
  FolderKanban, Share2, ArrowUp, ArrowDown, UserPlus, Phone, 
  Globe, CheckCircle2, Clock, AlertCircle, Shield, Menu,
  Layers, Compass, Laptop, Tag, CheckCheck, RefreshCw, Download
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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modals
  const [activeModal, setActiveModal] = useState<'view-enquiry' | 'add-user' | 'book-call' | 'add-brand' | 'add-casestudy' | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [selectedCall, setSelectedCall] = useState<DiscoveryCallItem | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<BrandItem | null>(null);

  // New Item Form States
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Editor' as const, status: 'Active' as const });
  const [newCall, setNewCall] = useState({ brand: '', contactName: '', contactEmail: '', stage: 'Pre-launch', callDate: 'Jun 05, 2025', callTime: '11:00 AM', callHost: 'Rohit Verma' });
  const [newBrand, setNewBrand] = useState({ name: '', website: '', contactName: '', contactEmail: '', stage: '₹1–5 Cr revenue' });
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

          // Merge without duplicates
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
    return { background: '#EAF2FB', color: '#2B6CB0', border: '1px solid #D1E3F6' }; // Pre-launch
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'New':
        return { background: '#EAF2FB', color: '#2B6CB0' };
      case 'Contacted':
        return { background: '#FFF4E5', color: '#B76E00' };
      case 'Qualified':
        return { background: '#E6F4EA', color: '#137333' };
      case 'In Discussion':
        return { background: '#F3E8FD', color: '#7B1FA2' };
      case 'Discovery Call':
      case 'Scheduled':
        return { background: '#E8F0FE', color: '#1A73E8' };
      case 'Active':
      case 'Completed':
      case 'Published':
        return { background: '#E6F4EA', color: '#137333' };
      case 'Inactive':
      case 'Cancelled':
        return { background: '#FDE8E8', color: '#C5221F' };
      case 'Draft':
        return { background: '#F1F3F4', color: '#5F6368' };
      default:
        return { background: '#F1F3F4', color: '#5F6368' };
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

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FBF9F6', fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif", color: '#1E1E1E' }}>
      
      {/* ── LEFT SIDEBAR ──────────────────────────────────────────────────────── */}
      <aside style={{
        width: '260px',
        background: '#FFFFFF',
        borderRight: '1px solid #EFEAE3',
        display: 'flex',
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
          {/* Brand Logo Header */}
          <div style={{ padding: '0 8px 24px', borderBottom: '1px solid #F2ECE4' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 600, letterSpacing: '4px', color: '#1A1817', lineHeight: 1 }}>
              LAL10
            </div>
            <div style={{ fontSize: '9px', letterSpacing: '3px', color: '#9B9084', fontWeight: 600, marginTop: '4px', textTransform: 'uppercase' }}>
              FASHIONS
            </div>
          </div>

          {/* User Profile Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
            margin: '16px 0 20px',
            background: '#FAF6F0',
            borderRadius: '10px',
            border: '1px solid #EFE7DC'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
                alt="Admin User"
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1A1817', lineHeight: 1.2 }}>Admin User</div>
                <div style={{ fontSize: '11px', color: '#8A7D71', marginTop: '2px' }}>Super Admin</div>
              </div>
            </div>
            <ChevronDown size={14} color="#8A7D71" />
          </div>

          {/* Main Navigation Menu */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {/* Dashboard */}
            <button
              onClick={() => { setActiveTab('dashboard'); setSearchQuery(''); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '11px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'dashboard' ? 700 : 500,
                color: activeTab === 'dashboard' ? '#5B1F28' : '#57524B',
                background: activeTab === 'dashboard' ? '#F7EDE6' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <LayoutDashboard size={17} color={activeTab === 'dashboard' ? '#5B1F28' : '#7D756C'} />
              <span>Dashboard</span>
            </button>

            {/* Enquiries / Leads */}
            <button
              onClick={() => { setActiveTab('enquiries'); setSearchQuery(''); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '11px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'enquiries' ? 700 : 500,
                color: activeTab === 'enquiries' ? '#5B1F28' : '#57524B',
                background: activeTab === 'enquiries' ? '#F7EDE6' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
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

            {/* Brands */}
            <button
              onClick={() => { setActiveTab('brands'); setSearchQuery(''); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '11px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'brands' ? 700 : 500,
                color: activeTab === 'brands' ? '#5B1F28' : '#57524B',
                background: activeTab === 'brands' ? '#F7EDE6' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
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

            {/* Discovery Calls */}
            <button
              onClick={() => { setActiveTab('calls'); setSearchQuery(''); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '11px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'calls' ? 700 : 500,
                color: activeTab === 'calls' ? '#5B1F28' : '#57524B',
                background: activeTab === 'calls' ? '#F7EDE6' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
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

            {/* Users */}
            <button
              onClick={() => { setActiveTab('users'); setSearchQuery(''); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '11px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'users' ? 700 : 500,
                color: activeTab === 'users' ? '#5B1F28' : '#57524B',
                background: activeTab === 'users' ? '#F7EDE6' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <Users size={17} color={activeTab === 'users' ? '#5B1F28' : '#7D756C'} />
              <span>Users</span>
            </button>

            {/* Content Management (Collapsible) */}
            <div>
              <button
                onClick={() => setContentMenuOpen(!contentMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#57524B',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FolderKanban size={17} color="#7D756C" />
                  <span>Content Management</span>
                </div>
                <ChevronDown size={14} color="#7D756C" style={{ transform: contentMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
            </div>

            {/* Case Studies */}
            <button
              onClick={() => { setActiveTab('casestudies'); setSearchQuery(''); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '11px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'casestudies' ? 700 : 500,
                color: activeTab === 'casestudies' ? '#5B1F28' : '#57524B',
                background: activeTab === 'casestudies' ? '#F7EDE6' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <BookOpen size={17} color={activeTab === 'casestudies' ? '#5B1F28' : '#7D756C'} />
              <span>Case Studies</span>
            </button>

            {/* Insights & Reports */}
            <button
              onClick={() => { setActiveTab('insights'); setSearchQuery(''); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '11px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'insights' ? 700 : 500,
                color: activeTab === 'insights' ? '#5B1F28' : '#57524B',
                background: activeTab === 'insights' ? '#F7EDE6' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <BarChart3 size={17} color={activeTab === 'insights' ? '#5B1F28' : '#7D756C'} />
              <span>Insights &amp; Reports</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => { setActiveTab('settings'); setSearchQuery(''); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '11px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'settings' ? 700 : 500,
                color: activeTab === 'settings' ? '#5B1F28' : '#57524B',
                background: activeTab === 'settings' ? '#F7EDE6' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <Settings size={17} color={activeTab === 'settings' ? '#5B1F28' : '#7D756C'} />
              <span>Settings</span>
            </button>

            {/* Integrations */}
            <button
              onClick={() => { setActiveTab('integrations'); setSearchQuery(''); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '11px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'integrations' ? 700 : 500,
                color: activeTab === 'integrations' ? '#5B1F28' : '#57524B',
                background: activeTab === 'integrations' ? '#F7EDE6' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <Compass size={17} color={activeTab === 'integrations' ? '#5B1F28' : '#7D756C'} />
              <span>Integrations</span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions: Log out & Return to Live Website */}
        <div style={{ paddingTop: '16px', borderTop: '1px solid #F2ECE4', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link
            href="/home1"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 12px',
              fontSize: '12px',
              color: '#5B1F28',
              textDecoration: 'none',
              fontWeight: 600,
              background: '#FAF6F0',
              borderRadius: '6px'
            }}
          >
            <ExternalLink size={14} />
            <span>View Live Site</span>
          </Link>
          <button
            onClick={() => alert('Logged out successfully.')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 12px',
              fontSize: '13px',
              color: '#6E675E',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ─────────────────────────────────────────────────── */}
      <main style={{ flex: 1, padding: '32px 40px 60px', overflowY: 'auto', maxWidth: '1440px', margin: '0 auto' }}>

        {/* TOP HEADER ROW */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            {activeTab === 'dashboard' ? (
              <>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1817', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Welcome back, Admin <span style={{ fontSize: '22px' }}>👋</span>
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

          {/* Right Header Controls: Date Range, Search Icon, Bell, Action Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Date Range Picker */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowDateDropdown(!showDateDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#FFFFFF',
                  border: '1px solid #E4DDD4',
                  borderRadius: '8px',
                  padding: '9px 14px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: '#1A1817',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                <span>{dateRange}</span>
                <Calendar size={15} color="#7E766D" />
              </button>

              {showDateDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '6px',
                  background: '#FFFFFF',
                  border: '1px solid #E4DDD4',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                  padding: '8px 0',
                  minWidth: '220px',
                  zIndex: 50
                }}>
                  {['Today', 'Last 7 Days', 'May 24, 2025 – May 30, 2025', 'This Month', 'All Time'].map(range => (
                    <button
                      key={range}
                      onClick={() => { setDateRange(range); setShowDateDropdown(false); }}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 16px',
                        fontSize: '12.5px',
                        color: range === dateRange ? '#5B1F28' : '#333',
                        fontWeight: range === dateRange ? 700 : 500,
                        background: range === dateRange ? '#FAF5F1' : 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Search */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  const input = document.getElementById('admin-filter-search');
                  if (input) input.focus();
                }}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: '#FFFFFF',
                  border: '1px solid #E4DDD4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Search size={16} color="#57524B" />
              </button>
            </div>

            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: '#FFFFFF',
                  border: '1px solid #E4DDD4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <Bell size={16} color="#57524B" />
                {unreadNotifications > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: '#5B1F28',
                    color: '#FFF',
                    fontSize: '10px',
                    fontWeight: 700,
                    width: '17px',
                    height: '17px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '6px',
                  background: '#FFFFFF',
                  border: '1px solid #E4DDD4',
                  borderRadius: '10px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  padding: '14px',
                  width: '320px',
                  zIndex: 50
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700 }}>Notifications</span>
                    <button onClick={() => setUnreadNotifications(0)} style={{ fontSize: '11px', color: '#5B1F28', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Mark read</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '12px', padding: '8px', background: '#FAF6F0', borderRadius: '6px' }}>
                      <strong>Arjun Mehta</strong> booked a discovery call for <strong>Aria Studio</strong>.
                      <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>10 mins ago</div>
                    </div>
                    <div style={{ fontSize: '12px', padding: '8px', background: '#FAF6F0', borderRadius: '6px' }}>
                      Discovery call completed with <strong>Noma Living</strong>.
                      <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>1 hour ago</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons specific to each tab */}
            {activeTab === 'users' && (
              <button
                onClick={() => setActiveModal('add-user')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#3D1219',
                  color: '#FFFFFF',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Plus size={15} />
                <span>Add User</span>
              </button>
            )}

            {activeTab === 'calls' && (
              <button
                onClick={() => setActiveModal('book-call')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#3D1219',
                  color: '#FFFFFF',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Plus size={15} />
                <span>Book Call</span>
              </button>
            )}

            {activeTab === 'brands' && (
              <button
                onClick={() => setActiveModal('add-brand')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#3D1219',
                  color: '#FFFFFF',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Plus size={15} />
                <span>Add Brand</span>
              </button>
            )}

            {activeTab === 'casestudies' && (
              <button
                onClick={() => setActiveModal('add-casestudy')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#3D1219',
                  color: '#FFFFFF',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Plus size={15} />
                <span>Add Case Study</span>
              </button>
            )}

            {activeTab === 'dashboard' && (
              <button
                onClick={() => exportData('enquiries')}
                title="Export Enquiries CSV"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: '#FFFFFF',
                  border: '1px solid #E4DDD4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Share2 size={16} color="#57524B" />
              </button>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            TAB 1: DASHBOARD
        ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* 4 Top Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
              {/* Card 1: Total Enquiries */}
              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={18} color="#8A4A32" />
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>Total Enquiries</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '6px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', lineHeight: 1 }}>248</div>
                  {/* Mini Sparkline SVG */}
                  <svg width="80" height="26" viewBox="0 0 80 26" fill="none">
                    <path d="M2 20L20 16L40 18L60 10L78 4" stroke="#C97A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: '11.5px', color: '#137333', fontWeight: 600, marginTop: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>↑ 18.6%</span>
                  <span style={{ color: '#9B9084', fontWeight: 400 }}>vs May 17 – May 23</span>
                </div>
              </div>

              {/* Card 2: New This Week */}
              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Plus size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>New This Week</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '6px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', lineHeight: 1 }}>18</div>
                  <svg width="80" height="26" viewBox="0 0 80 26" fill="none">
                    <path d="M2 18L22 19L42 14L62 12L78 6" stroke="#C97A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: '11.5px', color: '#137333', fontWeight: 600, marginTop: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>↑ 12.4%</span>
                  <span style={{ color: '#9B9084', fontWeight: 400 }}>vs May 17 – May 23</span>
                </div>
              </div>

              {/* Card 3: Discovery Calls */}
              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PhoneCall size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>Discovery Calls</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '6px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', lineHeight: 1 }}>12</div>
                  <svg width="80" height="26" viewBox="0 0 80 26" fill="none">
                    <path d="M2 22L20 18L40 20L60 14L78 8" stroke="#C97A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: '11.5px', color: '#137333', fontWeight: 600, marginTop: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>↑ 9.1%</span>
                  <span style={{ color: '#9B9084', fontWeight: 400 }}>vs May 17 – May 23</span>
                </div>
              </div>

              {/* Card 4: Active Prospects */}
              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>Active Prospects</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '6px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', lineHeight: 1 }}>34</div>
                  <svg width="80" height="26" viewBox="0 0 80 26" fill="none">
                    <path d="M2 22L20 20L40 16L60 18L78 6" stroke="#C97A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: '11.5px', color: '#137333', fontWeight: 600, marginTop: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>↑ 13.3%</span>
                  <span style={{ color: '#9B9084', fontWeight: 400 }}>vs May 17 – May 23</span>
                </div>
              </div>
            </div>

            {/* Middle Row: Enquiries Over Time (Line Chart) & Enquiries by Source (Donut Chart) */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              
              {/* Line Chart Card */}
              <div style={{ background: '#FFFFFF', padding: '24px 28px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1A1817', margin: 0 }}>Enquiries Over Time</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FAF6F0', padding: '6px 12px', borderRadius: '6px', border: '1px solid #EFEAE3', fontSize: '12px', fontWeight: 600 }}>
                    <span>Daily</span>
                    <ChevronDown size={13} color="#666" />
                  </div>
                </div>

                {/* SVG Line Chart with Tooltip */}
                <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                  <svg width="100%" height="180" viewBox="0 0 600 180" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8A4A32" stopOpacity="0.25"/>
                        <stop offset="100%" stopColor="#8A4A32" stopOpacity="0.0"/>
                      </linearGradient>
                    </defs>

                    {/* Grid horizontal lines */}
                    <line x1="0" y1="20" x2="600" y2="20" stroke="#F0EBE4" strokeDasharray="3 3" />
                    <line x1="0" y1="60" x2="600" y2="60" stroke="#F0EBE4" strokeDasharray="3 3" />
                    <line x1="0" y1="100" x2="600" y2="100" stroke="#F0EBE4" strokeDasharray="3 3" />
                    <line x1="0" y1="140" x2="600" y2="140" stroke="#F0EBE4" strokeDasharray="3 3" />

                    {/* Filled Area */}
                    <path
                      d="M 20 120 L 70 80 L 130 95 L 180 90 L 230 50 L 280 70 L 330 90 L 380 50 L 440 50 L 510 30 L 580 10 L 580 170 L 20 170 Z"
                      fill="url(#chartGradient)"
                    />

                    {/* Line */}
                    <path
                      d="M 20 120 L 70 80 L 130 95 L 180 90 L 230 50 L 280 70 L 330 90 L 380 50 L 440 50 L 510 30 L 580 10"
                      fill="none"
                      stroke="#5B1F28"
                      strokeWidth="3"
                    />

                    {/* Data Points */}
                    {[
                      [20, 120], [70, 80], [130, 95], [180, 90], [230, 50],
                      [280, 70], [330, 90], [380, 50], [440, 50], [510, 30], [580, 10]
                    ].map(([x, y], idx) => (
                      <circle key={idx} cx={x} cy={y} r="4.5" fill="#5B1F28" stroke="#FFFFFF" strokeWidth="2" />
                    ))}
                  </svg>

                  {/* Tooltip Box over latest point */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '10px',
                    background: '#FFFFFF',
                    border: '1px solid #E5DFD7',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    fontSize: '11.5px',
                    zIndex: 10
                  }}>
                    <div style={{ color: '#8A7D71', fontWeight: 600 }}>May 30, 2025</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#5B1F28' }}></span>
                      <span style={{ fontWeight: 700, color: '#1A1817' }}>Enquiries: 42</span>
                    </div>
                  </div>

                  {/* X Axis Dates */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '10.5px', color: '#8A8279' }}>
                    <span>May 17</span><span>May 18</span><span>May 19</span><span>May 20</span>
                    <span>May 21</span><span>May 22</span><span>May 23</span><span>May 24</span>
                    <span>May 25</span><span>May 26</span><span>May 27</span><span>May 28</span>
                    <span>May 29</span><span>May 30</span>
                  </div>
                </div>
              </div>

              {/* Donut Chart Card: Enquiries by Source */}
              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1A1817', margin: '0 0 16px' }}>Enquiries by Source</h3>

                {/* Donut Graphic */}
                <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto' }}>
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="60" fill="transparent" stroke="#5B1F28" strokeWidth="24" strokeDasharray="194 377" strokeDashoffset="0" />
                    <circle cx="80" cy="80" r="60" fill="transparent" stroke="#B07058" strokeWidth="24" strokeDasharray="85 377" strokeDashoffset="-194" />
                    <circle cx="80" cy="80" r="60" fill="transparent" stroke="#D19E75" strokeWidth="24" strokeDasharray="57 377" strokeDashoffset="-279" />
                    <circle cx="80" cy="80" r="60" fill="transparent" stroke="#DEC8B5" strokeWidth="24" strokeDasharray="24 377" strokeDashoffset="-336" />
                    <circle cx="80" cy="80" r="60" fill="transparent" stroke="#EFE4D8" strokeWidth="24" strokeDasharray="17 377" strokeDashoffset="-360" />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: '#1A1817' }}>248</div>
                    <div style={{ fontSize: '11px', color: '#8A7D71' }}>Total</div>
                  </div>
                </div>

                {/* Source Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#5B1F28' }}></span>
                      <span>Website</span>
                    </div>
                    <strong>128 (51.6%)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#B07058' }}></span>
                      <span>LinkedIn</span>
                    </div>
                    <strong>56 (22.6%)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#D19E75' }}></span>
                      <span>Referral</span>
                    </div>
                    <strong>38 (15.3%)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#DEC8B5' }}></span>
                      <span>Instagram</span>
                    </div>
                    <strong>16 (6.5%)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#EFE4D8' }}></span>
                      <span>Other</span>
                    </div>
                    <strong>10 (4.0%)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Recent Enquiries Table (Left) + Upcoming Calls & Activity (Right) */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              
              {/* Recent Enquiries Table Card */}
              <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1A1817', margin: 0 }}>Recent Enquiries</h3>
                    <button
                      onClick={() => setActiveTab('enquiries')}
                      style={{ fontSize: '12px', fontWeight: 600, color: '#1A1817', background: '#FAF6F0', border: '1px solid #EBE4DA', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      View all
                    </button>
                  </div>

                  {/* Table */}
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11.5px', fontWeight: 600, textTransform: 'none' }}>
                          <th style={{ padding: '10px 8px' }}>Name</th>
                          <th style={{ padding: '10px 8px' }}>Brand</th>
                          <th style={{ padding: '10px 8px' }}>Stage / Revenue</th>
                          <th style={{ padding: '10px 8px' }}>Source</th>
                          <th style={{ padding: '10px 8px' }}>Enquiry Date</th>
                          <th style={{ padding: '10px 8px' }}>Status</th>
                          <th style={{ padding: '10px 8px', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enquiries.slice(0, 5).map(enq => (
                          <tr key={enq.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                            <td style={{ padding: '12px 8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#FBE8D6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: '#8A4A32' }}>
                                  {enq.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <div style={{ fontWeight: 600, color: '#1A1817' }}>{enq.name}</div>
                                  <div style={{ fontSize: '11px', color: '#8A7D71' }}>{enq.email}</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '12px 8px', fontWeight: 600, color: '#1A1817' }}>{enq.brand}</td>
                            <td style={{ padding: '12px 8px' }}>
                              <span style={{ fontSize: '11.5px', padding: '3px 8px', borderRadius: '6px', fontWeight: 600, ...getStageBadgeStyle(enq.stage) }}>
                                {enq.stage}
                              </span>
                            </td>
                            <td style={{ padding: '12px 8px', color: '#57524B', fontSize: '12px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                {enq.source === 'Website' && <Globe size={13} color="#666" />}
                                {enq.source === 'LinkedIn' && <Share2 size={13} color="#0077b5" />}
                                {enq.source === 'Referral' && <Users size={13} color="#888" />}
                                {enq.source === 'Instagram' && <Tag size={13} color="#E1306C" />}
                                <span>{enq.source}</span>
                              </div>
                            </td>
                            <td style={{ padding: '12px 8px', color: '#7E766D', fontSize: '12px' }}>{enq.date}</td>
                            <td style={{ padding: '12px 8px' }}>
                              <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', ...getStatusBadgeStyle(enq.status) }}>
                                {enq.status}
                              </span>
                            </td>
                            <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                <button
                                  onClick={() => { setSelectedEnquiry(enq); setActiveModal('view-enquiry'); }}
                                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7E766D' }}
                                  title="View Enquiry"
                                >
                                  <Eye size={15} />
                                </button>
                                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7E766D' }}>
                                  <MoreVertical size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Table Footer / Pagination */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #F0EBE4', fontSize: '12px', color: '#7E766D' }}>
                  <div>Showing 1 to 5 of 82 enquiries</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>10 per page</span>
                      <ChevronDown size={12} />
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF', cursor: 'pointer' }}>&lt;</button>
                      <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: 'none', background: '#5B1F28', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>1</button>
                      <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF', cursor: 'pointer' }}>2</button>
                      <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF', cursor: 'pointer' }}>3</button>
                      <span>...</span>
                      <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF', cursor: 'pointer' }}>9</button>
                      <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF', cursor: 'pointer' }}>&gt;</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Widgets: Upcoming Discovery Calls & Recent Activity */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Upcoming Discovery Calls Widget */}
                <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#1A1817', margin: 0 }}>Upcoming Discovery Calls</h4>
                    <button onClick={() => setActiveTab('calls')} style={{ fontSize: '11.5px', fontWeight: 600, color: '#1A1817', background: 'none', border: 'none', cursor: 'pointer' }}>View all</button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* Call Item 1 */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ padding: '4px 8px', background: '#FAF5EE', border: '1px solid #EADDCF', borderRadius: '6px', textAlign: 'center', minWidth: '40px' }}>
                          <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#8A5336', letterSpacing: '0.5px' }}>MAY</div>
                          <div style={{ fontSize: '14px', fontWeight: 800, color: '#1A1817', lineHeight: 1 }}>31</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#1A1817' }}>Aria Studio</div>
                          <div style={{ fontSize: '11px', color: '#8A7D71' }}>Arjun Mehta</div>
                        </div>
                      </div>
                      <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#57524B' }}>11:00 AM</span>
                    </div>

                    {/* Call Item 2 */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ padding: '4px 8px', background: '#FAF5EE', border: '1px solid #EADDCF', borderRadius: '6px', textAlign: 'center', minWidth: '40px' }}>
                          <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#8A5336', letterSpacing: '0.5px' }}>JUN</div>
                          <div style={{ fontSize: '14px', fontWeight: 800, color: '#1A1817', lineHeight: 1 }}>01</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#1A1817' }}>House of Riya</div>
                          <div style={{ fontSize: '11px', color: '#8A7D71' }}>Riya Shah</div>
                        </div>
                      </div>
                      <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#57524B' }}>02:30 PM</span>
                    </div>

                    {/* Call Item 3 */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ padding: '4px 8px', background: '#FAF5EE', border: '1px solid #EADDCF', borderRadius: '6px', textAlign: 'center', minWidth: '40px' }}>
                          <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#8A5336', letterSpacing: '0.5px' }}>JUN</div>
                          <div style={{ fontSize: '14px', fontWeight: 800, color: '#1A1817', lineHeight: 1 }}>02</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#1A1817' }}>Urban Form</div>
                          <div style={{ fontSize: '11px', color: '#8A7D71' }}>Karan Patel</div>
                        </div>
                      </div>
                      <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#57524B' }}>04:00 PM</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('calls')}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '16px', fontSize: '12px', fontWeight: 700, color: '#5B1F28', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <span>View full calendar</span>
                    <ArrowRightIcon />
                  </button>
                </div>

                {/* Recent Activity Widget */}
                <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#1A1817', margin: '0 0 14px' }}>Recent Activity</h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#F7EDE6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Users size={13} color="#8A4A32" />
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#1A1817' }}>New enquiry from <strong>Aria Studio</strong></div>
                        <div style={{ fontSize: '10.5px', color: '#8A7D71', marginTop: '2px' }}>May 30, 2025 at 10:15 AM</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#F7EDE6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <PhoneCall size={13} color="#8A4A32" />
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#1A1817' }}>Discovery call completed with <strong>Noma Living</strong></div>
                        <div style={{ fontSize: '10.5px', color: '#8A7D71', marginTop: '2px' }}>May 29, 2025 at 04:30 PM</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#F7EDE6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <BookOpen size={13} color="#8A4A32" />
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#1A1817' }}>Proposal sent to <strong>Urban Form</strong></div>
                        <div style={{ fontSize: '10.5px', color: '#8A7D71', marginTop: '2px' }}>May 29, 2025 at 11:20 AM</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('enquiries')}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '16px', fontSize: '12px', fontWeight: 700, color: '#5B1F28', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <span>View all activity</span>
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            TAB 2: USERS (Screenshot 2 Match)
        ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'users' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* 4 Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>Total Users</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', marginTop: '6px' }}>142</div>
                <div style={{ fontSize: '11.5px', color: '#137333', fontWeight: 600, marginTop: '10px' }}>↑ 12.5% vs May 17 – May 23</div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SlidersHorizontal size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>Active Users</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', marginTop: '6px' }}>118</div>
                <div style={{ fontSize: '11.5px', color: '#137333', fontWeight: 600, marginTop: '10px' }}>↑ 14.2% vs May 17 – May 23</div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserPlus size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>New This Week</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', marginTop: '6px' }}>12</div>
                <div style={{ fontSize: '11.5px', color: '#137333', fontWeight: 600, marginTop: '10px' }}>↑ 20.0% vs May 17 – May 23</div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>Admins</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', marginTop: '6px' }}>6</div>
                <div style={{ fontSize: '11.5px', color: '#7E766D', fontWeight: 600, marginTop: '10px' }}>↑ 0% vs May 17 – May 23</div>
              </div>
            </div>

            {/* Filter Bar & Table Card */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', padding: '24px' }}>
              
              {/* Filter Controls Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
                  <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
                    <Search size={15} color="#8A8279" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      id="admin-filter-search"
                      type="text"
                      placeholder="Search by name, email or role..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px 9px 36px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', outline: 'none' }}
                    />
                  </div>

                  {/* Role Dropdown */}
                  <div>
                    <select
                      value={roleFilter}
                      onChange={e => setRoleFilter(e.target.value)}
                      style={{ padding: '9px 14px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', background: '#FFF', cursor: 'pointer', outline: 'none' }}
                    >
                      <option>All Roles</option>
                      <option>Admin</option>
                      <option>Editor</option>
                      <option>Manager</option>
                      <option>Viewer</option>
                    </select>
                  </div>

                  {/* Status Dropdown */}
                  <div>
                    <select
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value)}
                      style={{ padding: '9px 14px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', background: '#FFF', cursor: 'pointer', outline: 'none' }}
                    >
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => exportData('users')}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFF', border: '1px solid #E4DDD4', padding: '9px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    <Download size={14} />
                    <span>Export</span>
                  </button>
                  <button
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FAF6F0', border: '1px solid #EAE2D8', padding: '9px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    <Filter size={14} />
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              {/* Users Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11.5px', fontWeight: 600 }}>
                      <th style={{ padding: '12px 10px' }}>User</th>
                      <th style={{ padding: '12px 10px' }}>Email</th>
                      <th style={{ padding: '12px 10px' }}>Role</th>
                      <th style={{ padding: '12px 10px' }}>Status</th>
                      <th style={{ padding: '12px 10px' }}>Joined On ↓</th>
                      <th style={{ padding: '12px 10px' }}>Last Active</th>
                      <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(usr => (
                      <tr key={usr.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                        <td style={{ padding: '14px 10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: usr.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#57524B' }}>
                              {usr.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span style={{ fontWeight: 600, color: '#1A1817' }}>{usr.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '14px 10px', color: '#57524B' }}>{usr.email}</td>
                        <td style={{ padding: '14px 10px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '12px', ...getRoleBadgeStyle(usr.role) }}>
                            {usr.role}
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '12px', ...getStatusBadgeStyle(usr.status) }}>
                            {usr.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px', color: '#7E766D', fontSize: '12.5px' }}>{usr.joinedOn}</td>
                        <td style={{ padding: '14px 10px', color: '#7E766D', fontSize: '12.5px' }}>{usr.lastActive}</td>
                        <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7E766D' }}><Eye size={15} /></button>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7E766D' }}><MoreVertical size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F0EBE4', fontSize: '12px', color: '#7E766D' }}>
                <div>Showing 1 to {filteredUsers.length} of 142 users</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>10 per page</span>
                    <ChevronDown size={12} />
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>&lt;</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: 'none', background: '#5B1F28', color: '#FFF', fontWeight: 700 }}>1</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>2</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>3</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>4</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>5</button>
                    <span>...</span>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>15</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>&gt;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            TAB 3: DISCOVERY CALLS (Screenshot 3 Match)
        ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'calls' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* 4 Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PhoneCall size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>Total Calls</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', marginTop: '6px' }}>156</div>
                <div style={{ fontSize: '11.5px', color: '#137333', fontWeight: 600, marginTop: '10px' }}>↑ 12.4% vs May 17 – May 23</div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>Completed</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', marginTop: '6px' }}>98</div>
                <div style={{ fontSize: '11.5px', color: '#137333', fontWeight: 600, marginTop: '10px' }}>↑ 8.7% vs May 17 – May 23</div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>Scheduled</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', marginTop: '6px' }}>42</div>
                <div style={{ fontSize: '11.5px', color: '#137333', fontWeight: 600, marginTop: '10px' }}>↑ 15.2% vs May 17 – May 23</div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>Cancelled</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', marginTop: '6px' }}>16</div>
                <div style={{ fontSize: '11.5px', color: '#C5221F', fontWeight: 600, marginTop: '10px' }}>↓ 5.6% vs May 17 – May 23</div>
              </div>
            </div>

            {/* Filter Bar & Table */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
                  <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
                    <Search size={15} color="#8A8279" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      placeholder="Search by brand, name or email..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px 9px 36px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', outline: 'none' }}
                    />
                  </div>

                  <select
                    value={stageFilter}
                    onChange={e => setStageFilter(e.target.value)}
                    style={{ padding: '9px 14px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', background: '#FFF' }}
                  >
                    <option>All Stages</option>
                    <option>Pre-launch</option>
                    <option>First collection live</option>
                    <option>₹1–5 Cr revenue</option>
                    <option>₹5 Cr+ revenue</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    style={{ padding: '9px 14px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', background: '#FFF' }}
                  >
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>Scheduled</option>
                    <option>Cancelled</option>
                  </select>

                  <select
                    value={hostFilter}
                    onChange={e => setHostFilter(e.target.value)}
                    style={{ padding: '9px 14px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', background: '#FFF' }}
                  >
                    <option>All Hosts</option>
                    <option>Rohit Verma</option>
                    <option>Ananya Rao</option>
                    <option>Priya Nair</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => exportData('calls')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFF', border: '1px solid #E4DDD4', padding: '9px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                    <Download size={14} />
                    <span>Export</span>
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FAF6F0', border: '1px solid #EAE2D8', padding: '9px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                    <Filter size={14} />
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              {/* Calls Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11.5px', fontWeight: 600 }}>
                      <th style={{ padding: '12px 10px' }}>Brand &amp; Contact</th>
                      <th style={{ padding: '12px 10px' }}>Stage / Revenue Band</th>
                      <th style={{ padding: '12px 10px' }}>Call Date &amp; Time ↓</th>
                      <th style={{ padding: '12px 10px' }}>Call Host</th>
                      <th style={{ padding: '12px 10px' }}>Call Status</th>
                      <th style={{ padding: '12px 10px' }}>Outcome</th>
                      <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCalls.map(cl => (
                      <tr key={cl.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                        <td style={{ padding: '14px 10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#1A1817', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }}>
                              {cl.brandCode}
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, color: '#1A1817', fontSize: '12.5px', letterSpacing: '0.5px' }}>{cl.brand}</div>
                              <div style={{ fontSize: '12px', color: '#57524B' }}>{cl.contactName}</div>
                              <div style={{ fontSize: '11px', color: '#8A7D71' }}>{cl.contactEmail}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '14px 10px' }}>
                          <span style={{ fontSize: '11.5px', padding: '3px 8px', borderRadius: '6px', fontWeight: 600, ...getStageBadgeStyle(cl.stage) }}>
                            {cl.stage}
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px', color: '#1A1817', fontSize: '12.5px' }}>
                          <div style={{ fontWeight: 600 }}>{cl.callDate}</div>
                          <div style={{ fontSize: '11.5px', color: '#7E766D' }}>{cl.callTime}</div>
                        </td>
                        <td style={{ padding: '14px 10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img src={cl.hostAvatar} alt={cl.callHost} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                            <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#1A1817' }}>{cl.callHost}</span>
                          </div>
                        </td>
                        <td style={{ padding: '14px 10px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '12px', ...getStatusBadgeStyle(cl.callStatus) }}>
                            {cl.callStatus}
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px', color: '#57524B', fontSize: '12.5px' }}>{cl.outcome}</td>
                        <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7E766D' }}><Eye size={15} /></button>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7E766D' }}><MoreVertical size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F0EBE4', fontSize: '12px', color: '#7E766D' }}>
                <div>Showing 1 to {filteredCalls.length} of 156 calls</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>10 per page</span>
                    <ChevronDown size={12} />
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>&lt;</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: 'none', background: '#5B1F28', color: '#FFF', fontWeight: 700 }}>1</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>2</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>3</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>4</button>
                    <span>...</span>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>16</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>&gt;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            TAB 4: BRANDS (Screenshot 4 Match)
        ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'brands' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* 4 Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>Total Brands</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', marginTop: '6px' }}>32</div>
                <div style={{ fontSize: '11.5px', color: '#137333', fontWeight: 600, marginTop: '10px' }}>↑ 14.3% vs May 17 – May 23</div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>Active Brands</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', marginTop: '6px' }}>28</div>
                <div style={{ fontSize: '11.5px', color: '#137333', fontWeight: 600, marginTop: '10px' }}>↑ 16.1% vs May 17 – May 23</div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>New This Week</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', marginTop: '6px' }}>4</div>
                <div style={{ fontSize: '11.5px', color: '#137333', fontWeight: 600, marginTop: '10px' }}>↑ 33.3% vs May 17 – May 23</div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCheck size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>Onboarded to Call</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', marginTop: '6px' }}>18</div>
                <div style={{ fontSize: '11.5px', color: '#137333', fontWeight: 600, marginTop: '10px' }}>↑ 12.5% vs May 17 – May 23</div>
              </div>
            </div>

            {/* Filter Bar & Table */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
                  <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
                    <Search size={15} color="#8A8279" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      placeholder="Search by brand name, contact or email..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px 9px 36px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', outline: 'none' }}
                    />
                  </div>

                  <select
                    value={stageFilter}
                    onChange={e => setStageFilter(e.target.value)}
                    style={{ padding: '9px 14px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', background: '#FFF' }}
                  >
                    <option>All Stages</option>
                    <option>Pre-launch</option>
                    <option>First collection live</option>
                    <option>₹1–5 Cr revenue</option>
                    <option>₹5 Cr+ revenue</option>
                  </select>

                  <select
                    value={revenueFilter}
                    onChange={e => setRevenueFilter(e.target.value)}
                    style={{ padding: '9px 14px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', background: '#FFF' }}
                  >
                    <option>All Revenue</option>
                    <option>₹1–5 Cr revenue</option>
                    <option>₹5 Cr+ revenue</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    style={{ padding: '9px 14px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', background: '#FFF' }}
                  >
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => exportData('brands')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFF', border: '1px solid #E4DDD4', padding: '9px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                    <Download size={14} />
                    <span>Export</span>
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FAF6F0', border: '1px solid #EAE2D8', padding: '9px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                    <Filter size={14} />
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              {/* Brands Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11.5px', fontWeight: 600 }}>
                      <th style={{ padding: '12px 10px' }}>Brand</th>
                      <th style={{ padding: '12px 10px' }}>Contact</th>
                      <th style={{ padding: '12px 10px' }}>Stage / Revenue Band</th>
                      <th style={{ padding: '12px 10px' }}>Status</th>
                      <th style={{ padding: '12px 10px' }}>Discovery Call</th>
                      <th style={{ padding: '12px 10px' }}>Onboarded On</th>
                      <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBrands.map(br => (
                      <tr key={br.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                        <td style={{ padding: '14px 10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#1A1817', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }}>
                              {br.code}
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, color: '#1A1817', fontSize: '13px' }}>{br.name}</div>
                              <div style={{ fontSize: '11.5px', color: '#8A7D71' }}>{br.website}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '14px 10px' }}>
                          <div style={{ fontWeight: 600, color: '#1A1817' }}>{br.contactName}</div>
                          <div style={{ fontSize: '11.5px', color: '#8A7D71' }}>{br.contactEmail}</div>
                        </td>
                        <td style={{ padding: '14px 10px' }}>
                          <span style={{ fontSize: '11.5px', padding: '3px 8px', borderRadius: '6px', fontWeight: 600, ...getStageBadgeStyle(br.stage) }}>
                            {br.stage}
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '12px', ...getStatusBadgeStyle(br.status) }}>
                            {br.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px', color: '#57524B', fontSize: '12px' }}>
                          {br.discoveryCallDate !== '–' ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Calendar size={13} color="#8A7D71" />
                              <span>{br.discoveryCallDate} {br.discoveryCallTime}</span>
                            </div>
                          ) : (
                            <span>–</span>
                          )}
                        </td>
                        <td style={{ padding: '14px 10px', color: '#7E766D', fontSize: '12px' }}>{br.onboardedOn}</td>
                        <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7E766D' }}><Eye size={15} /></button>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7E766D' }}><MoreVertical size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F0EBE4', fontSize: '12px', color: '#7E766D' }}>
                <div>Showing 1 to {filteredBrands.length} of 32 brands</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>10 per page</span>
                    <ChevronDown size={12} />
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>&lt;</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: 'none', background: '#5B1F28', color: '#FFF', fontWeight: 700 }}>1</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>2</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>3</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>4</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>&gt;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            TAB 5: CASE STUDIES (Screenshot 5 Match)
        ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'casestudies' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* 4 Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>Total Case Studies</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', marginTop: '6px' }}>24</div>
                <div style={{ fontSize: '11.5px', color: '#137333', fontWeight: 600, marginTop: '10px' }}>↑ 14.3% vs May 17 – May 23</div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>Published</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', marginTop: '6px' }}>20</div>
                <div style={{ fontSize: '11.5px', color: '#137333', fontWeight: 600, marginTop: '10px' }}>↑ 11.1% vs May 17 – May 23</div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Edit3 size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>In Draft</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', marginTop: '6px' }}>3</div>
                <div style={{ fontSize: '11.5px', color: '#C5221F', fontWeight: 600, marginTop: '10px' }}>↓ 25.0% vs May 17 – May 23</div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Eye size={18} color="#8A4A32" />
                </div>
                <div style={{ fontSize: '13px', color: '#7E766D', fontWeight: 500, marginTop: '14px' }}>Total Views</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1A1817', marginTop: '6px' }}>1,248</div>
                <div style={{ fontSize: '11.5px', color: '#137333', fontWeight: 600, marginTop: '10px' }}>↑ 18.8% vs May 17 – May 23</div>
              </div>
            </div>

            {/* Filter Bar & Table */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
                  <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
                    <Search size={15} color="#8A8279" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      placeholder="Search case studies by title, brand or tag..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px 9px 36px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', outline: 'none' }}
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    style={{ padding: '9px 14px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', background: '#FFF' }}
                  >
                    <option>All Status</option>
                    <option>Published</option>
                    <option>Draft</option>
                  </select>

                  <select
                    value={industryFilter}
                    onChange={e => setIndustryFilter(e.target.value)}
                    style={{ padding: '9px 14px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', background: '#FFF' }}
                  >
                    <option>All Industry</option>
                    <option>D2C Fashion</option>
                    <option>Home &amp; Living</option>
                    <option>Women&apos;s Wear</option>
                    <option>Menswear</option>
                    <option>Accessories</option>
                    <option>Athleisure</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    style={{ padding: '9px 14px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', background: '#FFF' }}
                  >
                    <option>Newest First</option>
                    <option>Most Viewed</option>
                    <option>Alphabetical</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => exportData('casestudies')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFF', border: '1px solid #E4DDD4', padding: '9px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                    <Download size={14} />
                    <span>Export</span>
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FAF6F0', border: '1px solid #EAE2D8', padding: '9px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                    <Filter size={14} />
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              {/* Case Studies Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11.5px', fontWeight: 600 }}>
                      <th style={{ padding: '12px 10px' }}>Case Study</th>
                      <th style={{ padding: '12px 10px' }}>Brand</th>
                      <th style={{ padding: '12px 10px' }}>Industry</th>
                      <th style={{ padding: '12px 10px' }}>Status</th>
                      <th style={{ padding: '12px 10px' }}>Published On</th>
                      <th style={{ padding: '12px 10px' }}>Views</th>
                      <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCaseStudies.map(cs => (
                      <tr key={cs.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                        <td style={{ padding: '14px 10px', maxWidth: '300px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img src={cs.imageUrl} alt={cs.title} style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover' }} />
                            <div style={{ fontWeight: 600, color: '#1A1817', lineHeight: 1.3 }}>{cs.title}</div>
                          </div>
                        </td>
                        <td style={{ padding: '14px 10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#FAF0E6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10.5px', fontWeight: 700, color: '#8A4A32' }}>
                              {cs.brandCode}
                            </div>
                            <span style={{ fontWeight: 600, color: '#1A1817' }}>{cs.brandName}</span>
                          </div>
                        </td>
                        <td style={{ padding: '14px 10px', color: '#57524B', fontSize: '12.5px' }}>{cs.industry}</td>
                        <td style={{ padding: '14px 10px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '12px', ...getStatusBadgeStyle(cs.status) }}>
                            {cs.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px', color: '#7E766D', fontSize: '12.5px' }}>{cs.publishedOn}</td>
                        <td style={{ padding: '14px 10px', color: '#1A1817', fontWeight: 600, fontSize: '12.5px' }}>{cs.views}</td>
                        <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7E766D' }}><Eye size={15} /></button>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7E766D' }}><Edit3 size={15} /></button>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7E766D' }}><MoreVertical size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F0EBE4', fontSize: '12px', color: '#7E766D' }}>
                <div>Showing 1 to {filteredCaseStudies.length} of 24 case studies</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>10 per page</span>
                    <ChevronDown size={12} />
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>&lt;</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: 'none', background: '#5B1F28', color: '#FFF', fontWeight: 700 }}>1</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>2</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>3</button>
                    <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #E4DDD4', background: '#FFF' }}>&gt;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            TAB 6: ENQUIRIES / LEADS COMPLETE VIEW
        ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'enquiries' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EFEAE3', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', padding: '24px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
                  <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
                    <Search size={15} color="#8A8279" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      placeholder="Search enquiries..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px 9px 36px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', outline: 'none' }}
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    style={{ padding: '9px 14px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', background: '#FFF' }}
                  >
                    <option>All Status</option>
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                    <option>In Discussion</option>
                    <option>Discovery Call</option>
                  </select>

                  <select
                    value={stageFilter}
                    onChange={e => setStageFilter(e.target.value)}
                    style={{ padding: '9px 14px', fontSize: '13px', border: '1px solid #E4DDD4', borderRadius: '8px', background: '#FFF' }}
                  >
                    <option>All Stages</option>
                    <option>Pre-launch</option>
                    <option>First collection live</option>
                    <option>₹1–5 Cr revenue</option>
                    <option>₹5 Cr+ revenue</option>
                  </select>
                </div>

                <button onClick={() => exportData('enquiries')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFF', border: '1px solid #E4DDD4', padding: '9px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #F0EBE4', textAlign: 'left', color: '#7E766D', fontSize: '11.5px', fontWeight: 600 }}>
                      <th style={{ padding: '12px 10px' }}>Name</th>
                      <th style={{ padding: '12px 10px' }}>Brand</th>
                      <th style={{ padding: '12px 10px' }}>Stage / Revenue</th>
                      <th style={{ padding: '12px 10px' }}>Source</th>
                      <th style={{ padding: '12px 10px' }}>Enquiry Date</th>
                      <th style={{ padding: '12px 10px' }}>Status</th>
                      <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnquiries.map(enq => (
                      <tr key={enq.id} style={{ borderBottom: '1px solid #FAF6F0' }}>
                        <td style={{ padding: '14px 10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FBE8D6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#8A4A32' }}>
                              {enq.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: '#1A1817' }}>{enq.name}</div>
                              <div style={{ fontSize: '11.5px', color: '#8A7D71' }}>{enq.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '14px 10px', fontWeight: 600, color: '#1A1817' }}>{enq.brand}</td>
                        <td style={{ padding: '14px 10px' }}>
                          <span style={{ fontSize: '11.5px', padding: '3px 8px', borderRadius: '6px', fontWeight: 600, ...getStageBadgeStyle(enq.stage) }}>
                            {enq.stage}
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px', color: '#57524B' }}>{enq.source}</td>
                        <td style={{ padding: '14px 10px', color: '#7E766D' }}>{enq.date}</td>
                        <td style={{ padding: '14px 10px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '12px', ...getStatusBadgeStyle(enq.status) }}>
                            {enq.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                          <button
                            onClick={() => { setSelectedEnquiry(enq); setActiveModal('view-enquiry'); }}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7E766D' }}
                          >
                            <Eye size={16} />
                          </button>
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
            TAB 7, 8, 9: INSIGHTS, SETTINGS, INTEGRATIONS
        ══════════════════════════════════════════════════════════════════════ */}
        {(activeTab === 'insights' || activeTab === 'settings' || activeTab === 'integrations') && (
          <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '12px', border: '1px solid #EFEAE3', textAlign: 'center' }}>
            <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: '#F8EDE5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Settings size={26} color="#5B1F28" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1A1817', margin: '0 0 8px', textTransform: 'capitalize' }}>
              {activeTab} Management
            </h3>
            <p style={{ fontSize: '14px', color: '#7E766D', maxWidth: '440px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              Configure your system preferences, API endpoints, webhook subscriptions, and team role permissions.
            </p>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{ background: '#5B1F28', color: '#FFF', border: 'none', padding: '11px 24px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}
            >
              Back to Dashboard
            </button>
          </div>
        )}

      </main>

      {/* ── MODALS ───────────────────────────────────────────────────────────── */}

      {/* Modal: View / Edit Enquiry */}
      {activeModal === 'view-enquiry' && selectedEnquiry && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '520px', borderRadius: '16px', padding: '28px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Enquiry Details</h3>
              <button onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13.5px' }}>
              <div><strong>Name:</strong> {selectedEnquiry.name}</div>
              <div><strong>Email:</strong> <a href={`mailto:${selectedEnquiry.email}`} style={{ color: '#5B1F28' }}>{selectedEnquiry.email}</a></div>
              <div><strong>Phone:</strong> {selectedEnquiry.phone || '–'}</div>
              <div><strong>Brand:</strong> {selectedEnquiry.brand}</div>
              <div><strong>Stage:</strong> {selectedEnquiry.stage}</div>
              <div><strong>Source:</strong> {selectedEnquiry.source}</div>
              <div><strong>Date:</strong> {selectedEnquiry.date}</div>
              {selectedEnquiry.notes && (
                <div style={{ background: '#FAF6F0', padding: '12px', borderRadius: '8px' }}>
                  <strong>Notes:</strong>
                  <div style={{ marginTop: '4px', color: '#555' }}>{selectedEnquiry.notes}</div>
                </div>
              )}
              <div>
                <strong>Update Status:</strong>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                  {(['New', 'Contacted', 'Qualified', 'In Discussion', 'Discovery Call'] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        setEnquiries(prev => prev.map(e => e.id === selectedEnquiry.id ? { ...e, status: st } : e));
                        setSelectedEnquiry({ ...selectedEnquiry, status: st });
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        border: selectedEnquiry.status === st ? '2px solid #5B1F28' : '1px solid #E4DDD4',
                        background: selectedEnquiry.status === st ? '#F7EDE6' : '#FFF',
                        color: selectedEnquiry.status === st ? '#5B1F28' : '#666',
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
              <button onClick={() => setActiveModal(null)} style={{ background: '#1A1817', color: '#FFF', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add User */}
      {activeModal === 'add-user' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <form onSubmit={handleAddUser} style={{ background: '#FFFFFF', width: '100%', maxWidth: '480px', borderRadius: '16px', padding: '28px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Add New Team User</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Full Name *</label>
                <input required type="text" placeholder="e.g. Vikram Singhania" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '13px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Email Address *</label>
                <input required type="email" placeholder="vikram@brand.com" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '13px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Role</label>
                <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value as any })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '13px' }}>
                  <option>Admin</option>
                  <option>Editor</option>
                  <option>Manager</option>
                  <option>Viewer</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
              <button type="button" onClick={() => setActiveModal(null)} style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid #DDD', background: '#FFF', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#5B1F28', color: '#FFF', fontWeight: 600, cursor: 'pointer' }}>Save User</button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Book Discovery Call */}
      {activeModal === 'book-call' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <form onSubmit={handleBookCall} style={{ background: '#FFFFFF', width: '100%', maxWidth: '480px', borderRadius: '16px', padding: '28px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Schedule Discovery Call</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Brand Name *</label>
                <input required type="text" placeholder="e.g. AURELIA" value={newCall.brand} onChange={e => setNewCall({ ...newCall, brand: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '13px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Contact Person *</label>
                  <input required type="text" placeholder="Priya Sharma" value={newCall.contactName} onChange={e => setNewCall({ ...newCall, contactName: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '13px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Email *</label>
                  <input required type="email" placeholder="priya@aurelia.com" value={newCall.contactEmail} onChange={e => setNewCall({ ...newCall, contactEmail: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '13px' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Call Date</label>
                  <input type="text" value={newCall.callDate} onChange={e => setNewCall({ ...newCall, callDate: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '13px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Time Slot</label>
                  <input type="text" value={newCall.callTime} onChange={e => setNewCall({ ...newCall, callTime: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '13px' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Assigned Host</label>
                <select value={newCall.callHost} onChange={e => setNewCall({ ...newCall, callHost: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '13px' }}>
                  <option>Rohit Verma</option>
                  <option>Ananya Rao</option>
                  <option>Priya Nair</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
              <button type="button" onClick={() => setActiveModal(null)} style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid #DDD', background: '#FFF', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#5B1F28', color: '#FFF', fontWeight: 600, cursor: 'pointer' }}>Book Call</button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Add Brand */}
      {activeModal === 'add-brand' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <form onSubmit={handleAddBrand} style={{ background: '#FFFFFF', width: '100%', maxWidth: '480px', borderRadius: '16px', padding: '28px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Add New Brand</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Brand Name *</label>
                <input required type="text" placeholder="e.g. MOIRAE" value={newBrand.name} onChange={e => setNewBrand({ ...newBrand, name: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '13px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Website Domain</label>
                <input type="text" placeholder="moirae.in" value={newBrand.website} onChange={e => setNewBrand({ ...newBrand, website: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '13px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Founder / Contact *</label>
                  <input required type="text" placeholder="Aman Gupta" value={newBrand.contactName} onChange={e => setNewBrand({ ...newBrand, contactName: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '13px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Email *</label>
                  <input required type="email" placeholder="aman@moirae.in" value={newBrand.contactEmail} onChange={e => setNewBrand({ ...newBrand, contactEmail: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '13px' }} />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
              <button type="button" onClick={() => setActiveModal(null)} style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid #DDD', background: '#FFF', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#5B1F28', color: '#FFF', fontWeight: 600, cursor: 'pointer' }}>Save Brand</button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Add Case Study */}
      {activeModal === 'add-casestudy' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <form onSubmit={handleAddCaseStudy} style={{ background: '#FFFFFF', width: '100%', maxWidth: '480px', borderRadius: '16px', padding: '28px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Add New Case Study</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Headline / Title *</label>
                <input required type="text" placeholder="e.g. How Maison 10 Built a 100% On-Demand Supply Chain" value={newCaseStudy.title} onChange={e => setNewCaseStudy({ ...newCaseStudy, title: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '13px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Brand Name *</label>
                <input required type="text" placeholder="Maison 10" value={newCaseStudy.brandName} onChange={e => setNewCaseStudy({ ...newCaseStudy, brandName: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '13px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Industry</label>
                  <select value={newCaseStudy.industry} onChange={e => setNewCaseStudy({ ...newCaseStudy, industry: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '13px' }}>
                    <option>D2C Fashion</option>
                    <option>Home &amp; Living</option>
                    <option>Women&apos;s Wear</option>
                    <option>Menswear</option>
                    <option>Accessories</option>
                    <option>Athleisure</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Status</label>
                  <select value={newCaseStudy.status} onChange={e => setNewCaseStudy({ ...newCaseStudy, status: e.target.value as any })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '13px' }}>
                    <option>Published</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
              <button type="button" onClick={() => setActiveModal(null)} style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid #DDD', background: '#FFF', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#5B1F28', color: '#FFF', fontWeight: 600, cursor: 'pointer' }}>Save Case Study</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

// Inline Sub-Icon helper
function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11" stroke="#5B1F28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
