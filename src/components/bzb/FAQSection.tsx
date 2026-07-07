"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const faqItems = [
  {
    question: "Are your projects legally approved?",
    answer:
      "Yes. Every BZB project complies with applicable legal regulations and approval requirements.",
  },
  {
    question: "Do you provide investment guidance?",
    answer:
      "Yes. Our team assists members in selecting suitable investment opportunities.",
  },
  {
    question: "Can I schedule a site visit?",
    answer:
      "Absolutely. Contact our sales team and schedule your preferred date.",
  },
  {
    question: "Do you offer customer support after purchase?",
    answer:
      "Yes. We provide dedicated customer support throughout your ownership journey.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#FAFAFA] py-24">

      <div className="max-w-[1250px] mx-auto px-8">

        <h2 className="text-[44px] font-black text-black mb-14">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">

          {faqItems.map((item, index) => (
            <div
              key={index}
              className="
                rounded-xl
                bg-white
                shadow-md
                border
                border-[#ECECEC]
                overflow-hidden
              "
            >

              <button
                onClick={() =>
                  setOpen(open === index ? -1 : index)
                }
                className="
                  w-full
                  flex
                  justify-between
                  items-center
                  px-10
                  py-8
                "
              >
                <div className="text-left">

                  <h3 className="text-[28px] font-bold text-black">
                    {item.question}
                  </h3>

                  {open === index && (
                    <p className="mt-3 text-[20px] leading-8 text-gray-500">
                      {item.answer}
                    </p>
                  )}

                </div>

                {open === index ? (
                  <ChevronDown size={38} strokeWidth={2.5} className="text-black" />
                ) : (
                  <ChevronRight size={38} strokeWidth={2.5} className="text-black" />
                )}
              </button>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}