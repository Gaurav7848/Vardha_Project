import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, Filter, ChevronDown, Eye, Trash2, X } from 'lucide-react';
import { getAdminEnquiries, updateEnquiryStatus, deleteEnquiry } from '../../services/adminService';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const result = await getAdminEnquiries();
      setEnquiries(result.data || []);
    } catch (err) {
      setError('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    setUpdatingId(id);
    try {
      await updateEnquiryStatus(id, status);
      setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status } : e));
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await deleteEnquiry(id);
      setEnquiries(prev => prev.filter(e => e._id !== id));
      setSelectedEnquiry(null);
    } catch (err) {
      alert('Failed to delete enquiry');
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = enquiry.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.requestId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    contacted: 'bg-blue-100 text-blue-800',
    converted: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search by name, company, or request ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border border-stone-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-red-600 transition-all text-stone-900 font-sans"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-3 w-5 h-5 text-stone-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border border-stone-200 rounded-xl py-3 pl-12 pr-10 outline-none focus:border-red-600 transition-all text-stone-900 font-sans appearance-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-stone-400 pointer-events-none" />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-stone-500">Loading enquiries...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="text-center py-12 text-stone-500">No enquiries found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-stone-500">Request ID</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-stone-500">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-stone-500">Company</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-stone-500">Area</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-stone-500">Monthly</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-stone-500">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-stone-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="border-b border-stone-100 hover:bg-stone-50">
                    <td className="py-4 px-4 text-sm font-mono text-stone-900">{enquiry.requestId}</td>
                    <td className="py-4 px-4 text-sm text-stone-900">{enquiry.fullName}</td>
                    <td className="py-4 px-4 text-sm text-stone-600">{enquiry.companyName}</td>
                    <td className="py-4 px-4 text-sm text-stone-600">{enquiry.area} sq.ft.</td>
                    <td className="py-4 px-4 text-sm text-stone-900 font-medium">₹{enquiry.estimatedMonthlyAmount?.toLocaleString()}/mo</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[enquiry.status] || 'bg-stone-100 text-stone-800'}`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedEnquiry(enquiry)}
                          className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4 text-stone-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(enquiry._id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-stone-200 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-serif font-medium text-stone-900">Enquiry Details</h3>
              <button onClick={() => setSelectedEnquiry(null)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-stone-600" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Request ID</div>
                  <div className="text-stone-900 font-medium">{selectedEnquiry.requestId}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Status</div>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => handleStatusUpdate(selectedEnquiry._id, e.target.value)}
                    disabled={updatingId === selectedEnquiry._id}
                    className="mt-1 bg-transparent border border-stone-200 rounded-lg py-2 px-3 text-sm text-stone-900 outline-none focus:border-red-600"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Full Name</div>
                  <div className="text-stone-900 font-medium">{selectedEnquiry.fullName}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Company</div>
                  <div className="text-stone-900 font-medium">{selectedEnquiry.companyName}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Phone</div>
                  <div className="text-stone-900 font-medium">{selectedEnquiry.phone}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Email</div>
                  <div className="text-stone-900 font-medium">{selectedEnquiry.email}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Business Type</div>
                  <div className="text-stone-900 font-medium">{selectedEnquiry.businessType}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Area</div>
                  <div className="text-stone-900 font-medium">{selectedEnquiry.area} sq.ft.</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Dimensions</div>
                  <div className="text-stone-900 font-medium">{selectedEnquiry.length} × {selectedEnquiry.width} ft</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Height</div>
                  <div className="text-stone-900 font-medium">{selectedEnquiry.height} ft</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Rate</div>
                  <div className="text-stone-900 font-medium">₹{selectedEnquiry.pricingRate}/sq.ft.</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Monthly Amount</div>
                  <div className="text-stone-900 font-medium">₹{selectedEnquiry.estimatedMonthlyAmount?.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Start Date</div>
                  <div className="text-stone-900 font-medium">{new Date(selectedEnquiry.startDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Duration</div>
                  <div className="text-stone-900 font-medium">{selectedEnquiry.duration}</div>
                </div>
                {selectedEnquiry.gstNumber && (
                  <div>
                    <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">GST Number</div>
                    <div className="text-stone-900 font-medium">{selectedEnquiry.gstNumber}</div>
                  </div>
                )}
                {selectedEnquiry.additionalRequirements && (
                  <div className="col-span-2">
                    <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Additional Requirements</div>
                    <div className="text-stone-900 font-medium">{selectedEnquiry.additionalRequirements}</div>
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-4 border-t border-stone-200">
                <button
                  onClick={() => handleDelete(selectedEnquiry._id)}
                  className="px-4 py-2 bg-red-700 text-white rounded-xl text-sm font-bold hover:bg-red-800 transition-all"
                >
                  Delete Enquiry
                </button>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl text-sm font-bold hover:bg-stone-50 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enquiries;
