import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, FileText, DollarSign, TrendingUp, Users, Warehouse, Mail } from 'lucide-react';
import { getAdminEnquiries, getAdminFAQs, getPricingSettings, getAdminContacts } from '../../services/adminService';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    enquiries: 0,
    faqs: 0,
    pricing: null,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [enquiriesRes, faqsRes, pricingRes, contactsRes] = await Promise.all([
          getAdminEnquiries(),
          getAdminFAQs(),
          getPricingSettings(),
          getAdminContacts(),
        ]);
        setStats({
          enquiries: enquiriesRes.data?.length || 0,
          faqs: faqsRes.data?.length || 0,
          pricing: pricingRes.data,
          contacts: contactsRes.data?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Enquiries',
      value: stats.enquiries,
      icon: Package,
      color: 'bg-red-700',
    },
    {
      title: 'Total Contacts',
      value: stats.contacts,
      icon: Mail,
      color: 'bg-purple-700',
    },
    {
      title: 'FAQs',
      value: stats.faqs,
      icon: FileText,
      color: 'bg-orange-600',
    },
    {
      title: 'Current Pricing',
      value: stats.pricing ? `₹${stats.pricing.smallRate}/${stats.pricing.largeRate}` : '—',
      icon: DollarSign,
      color: 'bg-green-700',
    },
   
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-medium text-stone-900 mb-2">Dashboard Overview</h1>
        <p className="text-stone-600 font-sans font-light">Welcome to Vardha Warehousing Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-serif font-semibold text-stone-900 mb-1">
              {loading ? '...' : stat.value}
            </div>
            <div className="text-sm text-stone-500 font-sans font-light">{stat.title}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <Warehouse className="w-10 h-10 text-red-700 mx-auto mb-3" />
            <div className="text-sm font-bold text-stone-900 mb-1">Manage Enquiries</div>
            <div className="text-xs text-stone-500">View and update enquiry status</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
            <FileText className="w-10 h-10 text-orange-700 mx-auto mb-3" />
            <div className="text-sm font-bold text-stone-900 mb-1">Manage FAQs</div>
            <div className="text-xs text-stone-500">Add, edit, or remove FAQs</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <DollarSign className="w-10 h-10 text-green-700 mx-auto mb-3" />
            <div className="text-sm font-bold text-stone-900 mb-1">Update Pricing</div>
            <div className="text-xs text-stone-500">Modify warehouse rates</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
