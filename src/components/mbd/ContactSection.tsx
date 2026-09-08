"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
}

export default function ContactSection() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Enquiry submitted successfully.");

        resetForm();
      } else {
        toast.error(result.message || "Unable to submit enquiry.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#FAFAFA] py-28">
      <div className="max-w-[1500px] mx-auto px-8 lg:px-12">

        {/* Heading */}

        <h2
          className="
            text-[50px]
            font-semibold
            text-[#111]
            leading-tight
          "
        >
          Let's Build Your Future Together
        </h2>

        <p
          className="
            mt-6
            max-w-[760px]
            text-[20px]
            leading-6
            text-[#666]
          "
        >
          Whether you're searching for your dream home,
          a commercial property, or a rewarding investment
          opportunity, our team is ready to assist you
          every step of the way.
        </p>

        {/* Contact Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >

          <div className="grid lg:grid-cols-2 gap-x-20 gap-y-10">
                        {/* ================= First Name ================= */}

            <div>

              <label className="block text-[22px] font-semibold mb-4">
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

              <label className="block text-[22px] font-semibold mb-4">
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

              <label className="block text-[22px] font-semibold mb-4">
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

              <label className="block text-[22px] font-semibold mb-4">
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

              <label className="block text-[22px] font-semibold mb-4">
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
{/* <textarea
  name="message"
  value={formData.message}
  onChange={handleChange}
  placeholder="Enter your message"
  rows={6}
  className="..."
/> */}
              </div>

            </div>

            {/* ================= Submit Button ================= */}

            <div className="flex items-end">

              <button
                type="submit"
                disabled={loading}
                className="
                  h-[72px]

                  px-12

                  rounded-xl

                  bg-[#D4AF11]

                  hover:bg-[#E1BE16]

                  disabled:bg-[#B8B8B8]

                  disabled:cursor-not-allowed

                  text-white

                  text-[20px]

                  font-semibold

                  transition-all
                  duration-300

                  hover:scale-105
                "
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>

            </div>

          </div>

        </form>

      </div>

    </section>
  );
}