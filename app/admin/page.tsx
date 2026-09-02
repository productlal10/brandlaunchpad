'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, Calendar, Clock, ArrowLeft, RefreshCw, 
  Download, Filter, CheckCircle, Search, Mail, Phone, Tag 
} from 'lucide-react';
import { DiscoveryCallLead } from '@/lib/types';

export default function AdminPage() {
  const [leads, setLeads] = useState<DiscoveryCallLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/discovery-call');
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: DiscoveryCallLead['status']) => {
    try {
      const res = await fetch('/api/discovery-call', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Brand', 'Category', 'Stage', 'Budget', 'Track', 'Status'];
    const rows = leads.map((l) => [
      l.id,
      new Date(l.createdAt).toLocaleDateString(),
      `"${l.fullName}"`,
      l.email,
      l.phone || '',
      `"${l.brandName}"`,
      l.category,
      `"${l.stage}"`,
      `"${l.budget}"`,
      `"${l.trackInterest || ''}"`,
      l.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `lal10_discovery_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((l) => {
    const matchesCategory = filterCategory === 'ALL' || l.category === filterCategory;
    const matchesStatus = filterStatus === 'ALL' || l.status === filterStatus;
    const matchesSearch =
      !searchTerm ||
      l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.brandName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FBFAF7] text-[#171615]">
      {/* Top Bar */}
      <header className="bg-[#171615] text-[#F5F1EA] px-6 md:px-10 py-5 border-b border-[#E4DED3]">
        <div className="max-w-[1400px] mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-wider text-[#C9A16B] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Site</span>
            </Link>
            <div className="h-4 w-px bg-white/20" />
            <div>
              <span className="font-serif text-[22px] tracking-wide text-white">LAL10</span>{' '}
              <span className="text-[11px] tracking-[2px] text-[#C9A16B] uppercase font-mono">
                Advisory Admin Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              className="p-2 text-[#F5F1EA]/80 hover:text-white hover:bg-white/10 rounded transition-colors"
              title="Refresh leads"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={exportCSV}
              disabled={leads.length === 0}
              className="flex items-center gap-2 bg-[#C9A16B] text-[#171615] hover:bg-[#E4B889] px-4 py-2 text-[11px] uppercase tracking-wider font-bold transition-all disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-[#E4DED3] p-6 shadow-sm">
            <div className="text-[11px] uppercase tracking-wider text-[#8A837A] font-semibold mb-1">
              Total Inbound Calls
            </div>
            <div className="font-serif text-[36px] text-[#171615] leading-none">{leads.length}</div>
          </div>
          <div className="bg-white border border-[#E4DED3] p-6 shadow-sm">
            <div className="text-[11px] uppercase tracking-wider text-[#8A837A] font-semibold mb-1">
              New / Pending
            </div>
            <div className="font-serif text-[36px] text-[#5B1F28] leading-none">
              {leads.filter((l) => l.status === 'new').length}
            </div>
          </div>
          <div className="bg-white border border-[#E4DED3] p-6 shadow-sm">
            <div className="text-[11px] uppercase tracking-wider text-[#8A837A] font-semibold mb-1">
              Scheduled Calls
            </div>
            <div className="font-serif text-[36px] text-[#C9A16B] leading-none">
              {leads.filter((l) => l.status === 'scheduled').length}
            </div>
          </div>
          <div className="bg-white border border-[#E4DED3] p-6 shadow-sm">
            <div className="text-[11px] uppercase tracking-wider text-[#8A837A] font-semibold mb-1">
              Top Category
            </div>
            <div className="text-[18px] font-serif text-[#171615] mt-2">
              {leads.length > 0 ? leads[0].category : 'Womenswear'}
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white border border-[#E4DED3] p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-2 flex-1 min-w-[260px]">
            <Search className="w-4 h-4 text-[#8A837A]" />
            <input
              type="text"
              placeholder="Search founder, brand, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-[13.5px]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-[12px] text-[#8A837A]">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-[#FBFAF7] border border-[#E4DED3] px-3 py-1.5 text-[12.5px] outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="Womenswear">Womenswear</option>
              <option value="Menswear">Menswear</option>
              <option value="Kidswear">Kidswear</option>
              <option value="Footwear & Accessories">Footwear &amp; Accessories</option>
              <option value="Multi-category">Multi-category</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#FBFAF7] border border-[#E4DED3] px-3 py-1.5 text-[12.5px] outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="scheduled">Scheduled</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white border border-[#E4DED3] shadow-sm overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-[#8A837A]">Loading leads database...</div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-12 text-center text-[#8A837A]">
              No discovery requests matching your search/filters.
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="bg-[#F3EEE4] border-b border-[#E4DED3] text-[11px] uppercase tracking-wider text-[#57524B]">
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 font-semibold">Founder &amp; Brand</th>
                  <th className="py-3 px-4 font-semibold">Category &amp; Stage</th>
                  <th className="py-3 px-4 font-semibold">Budget &amp; Track</th>
                  <th className="py-3 px-4 font-semibold">Time Slot</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DED3]">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#FBFAF7] transition-colors">
                    <td className="py-3.5 px-4 text-[#8A837A] whitespace-nowrap font-mono text-[11.5px]">
                      {new Date(lead.createdAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#171615]">{lead.fullName}</div>
                      <div className="text-[12px] font-medium text-[#5B1F28]">{lead.brandName}</div>
                      <div className="flex items-center gap-3 text-[11.5px] text-[#8A837A] mt-0.5">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {lead.email}
                        </span>
                        {lead.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {lead.phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#171615]">{lead.category}</div>
                      <div className="text-[11.5px] text-[#8A837A]">{lead.stage}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#171615]">{lead.budget}</div>
                      <div className="text-[11.5px] text-[#C9A16B] font-semibold">{lead.trackInterest}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[12px] text-[#57524B]">
                      {lead.preferredTimeSlot || 'Standard IST Slot'}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead.id, e.target.value as DiscoveryCallLead['status'])
                        }
                        className={`text-[11.5px] font-semibold uppercase px-2 py-1 rounded border outline-none ${
                          lead.status === 'new'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : lead.status === 'contacted'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : lead.status === 'scheduled'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-gray-100 text-gray-700 border-gray-200'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`mailto:${lead.email}?subject=Lal10 FashionOS Discovery Call - ${lead.brandName}`}
                        className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold text-[#5B1F28] hover:text-[#7A2A34]"
                      >
                        <span>Email Founder</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
