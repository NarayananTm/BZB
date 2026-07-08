'use client';

import type { FC } from 'react';
// import Button from '@/components/common/Button';
// import Input from '@/components/common/Input';
// import TextArea from '@/components/common/TextArea';
// import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const ContactForm: FC = () => {
  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: '',
  //   subject: '',
  //   message: '',
  // });

  // const [submitted, setSubmitted] = useState(false);

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle form submission
  //   console.log('Form submitted:', formData);
  //   setSubmitted(true);
  //   setTimeout(() => setSubmitted(false), 3000);
  // };

  return (
    // <form onSubmit={handleSubmit} className="space-y-6 w-full">
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //     <Input
    //       label="First Name"
    //       name="firstName"
    //       placeholder="First Name"
    //       value={formData.firstName}
    //       onChange={handleChange}
    //       required
    //     />
    //     <Input
    //       label="Last Name"
    //       name="lastName"
    //       placeholder="Last Name"
    //       value={formData.lastName}
    //       onChange={handleChange}
    //       required
    //     />
    //   </div>

    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //     <Input
    //       label="Email Address"
    //       name="email"
    //       type="email"
    //       placeholder="Email"
    //       value={formData.email}
    //       onChange={handleChange}
    //       required
    //     />
    //     <Input
    //       label="Phone Number"
    //       name="phone"
    //       type="tel"
    //       placeholder="Phone Number"
    //       value={formData.phone}
    //       onChange={handleChange}
    //     />
    //   </div>

    //   <div>
    //     <label className="block text-sm font-medium text-dark-900 mb-2">Subject</label>
    //     <select
    //       name="subject"
    //       value={formData.subject}
    //       onChange={handleChange}
    //       className="w-full px-4 py-3 bg-dark-900 border-2 border-dark-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
    //       required
    //     >
    //       <option value="">Choose your enquiry topic</option>
    //       <option value="property">Property Inquiry</option>
    //       <option value="referral">Referral Program</option>
    //       <option value="investment">Investment</option>
    //       <option value="general">General Inquiry</option>
    //     </select>
    //   </div>

    //   <TextArea
    //     label="Message"
    //     name="message"
    //     placeholder="Message"
    //     value={formData.message}
    //     onChange={handleChange}
    //     maxChars={1000}
    //     required
    //   />

    //   <Button type="submit" fullWidth className="py-3 bg-primary-500 text-dark-900 hover:bg-primary-600">
    //     {submitted ? 'Message Sent! ✓' : 'Submit Enquiry'}
    //   </Button>
    // </form>
<form className="mt-5">

          <div className="grid lg:grid-cols-2 gap-x-20 gap-y-12">

            {/* First Name */}

            <div>

              <label className="block text-[#343434] text-[22px] font-semibold mb-4">
                First Name
              </label>

              <input
                type="text"
                placeholder="First Name"
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
                  focus:border-[#D4AF11]
                "
              />

            </div>

            {/* Last Name */}

            <div>

              <label className="block text-[22px] text-[#343434] font-semibold mb-4">
                Last Name
              </label>

              <input
                type="text"
                placeholder="Last Name"
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
                  focus:border-[#D4AF11]
                "
              />

            </div>

            {/* Email */}

            <div>

              <label className="block text-[22px] text-[#343434] font-semibold mb-4">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Email Address"
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
                  focus:border-[#D4AF11]
                "
              />

            </div>

            {/* Phone */}

            <div>

              <label className="block text-[22px] text-[#343434] font-semibold mb-4">
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="Phone Number"
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
                  focus:border-[#D4AF11]
                "
              />

            </div>

            {/* Subject */}

            <div>

              <label className="block text-[22px]  text-[#343434]   font-semibold mb-4">
                Subject
              </label>

              <div className="relative">

                <select
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
                    focus:border-[#D4AF11]
                  "
                >
                  <option>
                    Choose your enquiry topic.
                  </option>

                  <option>Residential Projects</option>

                  <option>Commercial Developments</option>

                  <option>Land Development</option>

                  <option>Investment</option>

                  <option>General</option>

                </select>

                <ChevronRight
                  className="
                    absolute
                    right-6
                    top-1/2
                    -translate-y-1/2
                    text-white
                    pointer-events-none
                  "
                  size={28}
                />

              </div>

            </div>

            {/* Button */}

            <div className="flex items-end">

              <button
                type="submit"
                className="
                  h-[72px]
                  px-12
                  rounded-xl
                  bg-[#BEA311]
                  hover:bg-[#E1BE16]
                  text-white
                  text-[20px]
                  font-semibold
                  transition
                "
              >
                Submit Enquiry
              </button>

            </div>

          </div>

        </form>

  );
};

export default ContactForm;
