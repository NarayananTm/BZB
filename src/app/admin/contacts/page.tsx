'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function ContactsAdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contact');
      const data = await response.json();

      if (data.success) {
        setContacts(data.data);
      } else {
        toast.error('Failed to load contacts');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Contact Submissions</h1>
          <p className="text-slate-400">View all messages from your website visitors</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>Loading contacts...</span>
            </div>
          </div>
        )}

        {/* No Contacts */}
        {!loading && contacts.length === 0 && (
          <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700">
            <p className="text-slate-400 text-lg">No contact submissions yet</p>
          </div>
        )}

        {/* Contacts Grid */}
        {!loading && contacts.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contacts List */}
            <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    selectedContact?.id === contact.id
                      ? 'bg-yellow-400/10 border-yellow-400 shadow-lg shadow-yellow-400/20'
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-semibold text-sm text-yellow-400 mb-1 truncate">
                    {contact.name}
                  </div>
                  <div className="text-xs text-slate-400 mb-2 truncate">{contact.email}</div>
                  <div className="text-xs text-slate-500 font-medium truncate">{contact.subject}</div>
                  <div className="text-xs text-slate-600 mt-2">{formatDate(contact.created_at)}</div>
                </div>
              ))}
            </div>

            {/* Contact Detail */}
            {selectedContact && (
              <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl p-6 sticky top-8">
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{selectedContact.name}</h2>
                      <p className="text-slate-400 text-sm">{selectedContact.email}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Submitted</div>
                      <div className="text-sm text-yellow-400 font-semibold">
                        {formatDate(selectedContact.created_at)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Contact Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">
                        Phone
                      </label>
                      <p className="text-white font-medium">{selectedContact.phone}</p>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">
                        Subject
                      </label>
                      <p className="text-white font-medium">{selectedContact.subject}</p>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-wide mb-2 block">
                      Message
                    </label>
                    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 max-h-[300px] overflow-y-auto">
                      <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">
                        {selectedContact.message}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-slate-700">
                    <button
                      onClick={() => {
                        const mailtoLink = `mailto:${selectedContact.email}?subject=Re: ${encodeURIComponent(selectedContact.subject)}`;
                        window.location.href = mailtoLink;
                      }}
                      className="w-full px-4 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors duration-200"
                    >
                      Reply via Email
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        {!loading && contacts.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="text-sm text-slate-400 mb-2">Total Submissions</div>
              <div className="text-3xl font-bold text-yellow-400">{contacts.length}</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="text-sm text-slate-400 mb-2">Unique Emails</div>
              <div className="text-3xl font-bold text-yellow-400">
                {new Set(contacts.map((c) => c.email)).size}
              </div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="text-sm text-slate-400 mb-2">Latest Submission</div>
              <div className="text-sm text-yellow-400">
                {contacts.length > 0 ? formatDate(contacts[0].created_at) : 'N/A'}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
