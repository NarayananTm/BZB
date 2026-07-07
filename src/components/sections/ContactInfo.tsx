'use client';

import type { FC } from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const ContactInfo: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Contact Details */}
      <div className="space-y-8">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-dark-900" />
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Address</h3>
            <p className="text-gray-400">4-A East Cross Road, Gandhi Nagar, Vellore - 632007</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Phone className="w-6 h-6 text-dark-900" />
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Phone</h3>
            <div className="space-y-1">
              <p className="text-gray-400">+91 77320 05003</p>
              <p className="text-gray-400">+91 98417 68255</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Mail className="w-6 h-6 text-dark-900" />
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Email</h3>
            <a
              href="mailto:bzb000777@gmail.com"
              className="text-primary-500 hover:text-primary-600 transition-colors"
            >
              bzb000777@gmail.com
            </a>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-6 h-6 text-dark-900" />
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Live Chat</h3>
            <p className="text-gray-400">Available Mon-Fri, 10 AM - 6 PM IST</p>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="rounded-xl overflow-hidden bg-dark-800 h-96 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <p className="text-gray-400">Map Integration Coming Soon</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
