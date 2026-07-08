"use client";

import { ChevronRight } from "lucide-react";

export default function   ContactSection() {
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
          Whether you're searching for your dream home, a commercial
          property, or a rewarding investment opportunity, our team is
          ready to assist you every step of the way.
        </p>

        {/* Form */}

        <form className="mt-8">

          <div className="grid lg:grid-cols-2 gap-x-20 gap-y-10">

            {/* First Name */}

            <div>

              <label className="block text-[22px] font-semibold mb-4">
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

              <label className="block text-[22px] font-semibold mb-4">
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

              <label className="block text-[22px] font-semibold mb-4">
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

              <label className="block text-[22px] font-semibold mb-4">
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

              <label className="block text-[22px] font-semibold mb-4">
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
                  bg-[#D4AF11]
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

      </div>

    </section>
  );
}