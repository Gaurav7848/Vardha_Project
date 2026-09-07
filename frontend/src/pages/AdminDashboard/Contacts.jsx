import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Search, Trash2, X } from 'lucide-react';
import { getAdminContacts, deleteContact } from '../../services/adminService';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const result = await getAdminContacts();
      setContacts(result.data || []);
    } catch (err) {
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    setDeletingId(id);
    try {
      await deleteContact(id);
      setContacts(prev => prev.filter(c => c._id !== id));
      setSelectedContact(null);
    } catch (err) {
      alert('Failed to delete contact');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search by name, company, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border border-stone-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-red-600 transition-all text-stone-900 font-sans"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-stone-500">Loading contacts...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center py-12 text-stone-500">No contacts found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-stone-500">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-stone-500">Company</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-stone-500">Phone</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-stone-500">Email</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-stone-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact._id} className="border-b border-stone-100 hover:bg-stone-50">
                    <td className="py-4 px-4 text-sm text-stone-900">{contact.name}</td>
                    <td className="py-4 px-4 text-sm text-stone-600">{contact.company}</td>
                    <td className="py-4 px-4 text-sm text-stone-600">{contact.phone}</td>
                    <td className="py-4 px-4 text-sm text-stone-600">{contact.email}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <Mail className="w-4 h-4 text-stone-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(contact._id)}
                          disabled={deletingId === contact._id}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
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

      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-stone-200 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-serif font-medium text-stone-900">Contact Details</h3>
              <button onClick={() => setSelectedContact(null)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-stone-600" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Name</div>
                  <div className="text-stone-900 font-medium">{selectedContact.name}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Company</div>
                  <div className="text-stone-900 font-medium">{selectedContact.company}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Phone</div>
                  <div className="text-stone-900 font-medium">{selectedContact.phone}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Email</div>
                  <div className="text-stone-900 font-medium">{selectedContact.email}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">Message</div>
                  <div className="text-stone-900 font-medium whitespace-pre-wrap">{selectedContact.message}</div>
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-stone-200">
                <button
                  onClick={() => handleDelete(selectedContact._id)}
                  disabled={deletingId === selectedContact._id}
                  className="px-4 py-2 bg-red-700 text-white rounded-xl text-sm font-bold hover:bg-red-800 transition-all disabled:opacity-50"
                >
                  Delete Contact
                </button>
                <button
                  onClick={() => setSelectedContact(null)}
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

export default Contacts;
