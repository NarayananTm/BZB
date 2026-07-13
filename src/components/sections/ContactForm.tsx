'use client';

import { useState, type ChangeEvent, type FC, type FormEvent } from 'react';
import { ChevronRight } from 'lucide-react';
import { toast } from "sonner";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactForm: FC = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Enquiry submitted successfully.');
        resetForm();
      } else {
        toast.error(result.message || 'Unable to submit enquiry.');
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5"
    >

      <div className="grid lg:grid-cols-2 gap-x-20 gap-y-12">
                {/* ================= First Name ================= */}

        <div>

          <label className="block text-[#343434] text-[22px] font-semibold mb-4">
            First Name
          </label>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="
              w-full
              h-[72px]

              rounded-xl

              bg-[#353535]

              text-white

              px-8

              text-[20px]

              placeholder:text-gray-400

              outline-none

              border
              border-transparent

              transition-all
              duration-300

              focus:border-[#D4AF11]
            "
          />

        </div>

        {/* ================= Last Name ================= */}

        <div>

          <label className="block text-[#343434] text-[22px] font-semibold mb-4">
            Last Name
          </label>

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="
              w-full
              h-[72px]

              rounded-xl

              bg-[#353535]

              text-white

              px-8

              text-[20px]

              placeholder:text-gray-400

              outline-none

              border
              border-transparent

              transition-all
              duration-300

              focus:border-[#D4AF11]
            "
          />

        </div>

        {/* ================= Email ================= */}

        <div>

          <label className="block text-[#343434] text-[22px] font-semibold mb-4">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="
              w-full
              h-[72px]

              rounded-xl

              bg-[#353535]

              text-white

              px-8

              text-[20px]

              placeholder:text-gray-400

              outline-none

              border
              border-transparent

              transition-all
              duration-300

              focus:border-[#D4AF11]
            "
          />

        </div>

        {/* ================= Phone ================= */}

        <div>

          <label className="block text-[#343434] text-[22px] font-semibold mb-4">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="
              w-full
              h-[72px]

              rounded-xl

              bg-[#353535]

              text-white

              px-8

              text-[20px]

              placeholder:text-gray-400

              outline-none

              border
              border-transparent

              transition-all
              duration-300

              focus:border-[#D4AF11]
            "
          />

        </div>
                {/* ================= Subject ================= */}

        <div>

          <label className="block text-[#343434] text-[22px] font-semibold mb-4">
            Subject
          </label>

          <div className="relative">

            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="
                appearance-none

                w-full
                h-[72px]

                rounded-xl

                bg-[#353535]

                text-white

                px-8

                text-[20px]

                outline-none

                border
                border-transparent

                transition-all
                duration-300

                focus:border-[#D4AF11]
              "
            >

              <option value="">
                Choose your enquiry topic
              </option>

              <option value="Residential Projects">
                Residential Projects
              </option>

              <option value="Commercial Developments">
                Commercial Developments
              </option>

              <option value="Land Development">
                Land Development
              </option>

              <option value="Investment">
                Investment
              </option>

              <option value="Referral">
                Referral
              </option>

              <option value="General">
                General
              </option>

            </select>

            <ChevronRight
              size={28}
              className="
                absolute
                right-6
                top-1/2
                -translate-y-1/2

                rotate-90

                text-white

                pointer-events-none
              "
            />

          </div>

        </div>

        {/* ================= Message ================= */}

        <div>

          <label className="block text-[#343434] text-[22px] font-semibold mb-4">
            Message
          </label>

          <textarea
            name="message"
            rows={6}
            placeholder="Write your enquiry..."

            value={formData.message}

            onChange={handleChange}

            required

            className="
              w-full

              rounded-xl

              bg-[#353535]

              text-white

              px-8
              py-6

              text-[20px]

              placeholder:text-gray-400

              outline-none

              resize-none

              border
              border-transparent

              transition-all
              duration-300

              focus:border-[#D4AF11]
            "
          />

        </div>

        {/* ================= Submit ================= */}

        <div className="lg:col-span-2 flex justify-center lg:justify-end">

          <button
            type="submit"

            disabled={loading}

            className="
              h-[72px]

              min-w-[260px]

              rounded-xl

              bg-[#BEA311]

              text-white

              text-[20px]

              font-semibold

              transition-all
              duration-300

              hover:bg-[#E1BE16]

              hover:scale-105

              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>

        </div>

      </div>

    </form>
  );
};

export default ContactForm;