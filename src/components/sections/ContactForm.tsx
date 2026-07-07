'use client';

import type { FC } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import { useState } from 'react';

const ContactForm: FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-900 mb-2">Subject</label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-dark-900 border-2 border-dark-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
          required
        >
          <option value="">Choose your enquiry topic</option>
          <option value="property">Property Inquiry</option>
          <option value="referral">Referral Program</option>
          <option value="investment">Investment</option>
          <option value="general">General Inquiry</option>
        </select>
      </div>

      <TextArea
        label="Message"
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        maxChars={1000}
        required
      />

      <Button type="submit" fullWidth className="py-3 bg-primary-500 text-dark-900 hover:bg-primary-600">
        {submitted ? 'Message Sent! ✓' : 'Submit Enquiry'}
      </Button>
    </form>
  );
};

export default ContactForm;
