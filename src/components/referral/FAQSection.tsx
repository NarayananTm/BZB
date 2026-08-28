"use client";

import { useState } from "react";
import FAQItem from "./FAQItem";

const faqs = [
  {
    question: "Is joining the referral program free?",
    answer:
      "The referral program is available for registered BZB members.",
  },
  {
    question: "How do I share my referral?",
    answer:
      "Use your QR Code or referral link available in your member dashboard.",
  },
  {
    question: "Can I track my referrals?",
    answer:
      "Yes. You can monitor referrals, team members, and referral progress directly from your dashboard.",
  },
  {
    question: "When do I receive rewards?",
    answer:
      "Rewards are unlocked after completing each referral level and meeting the required milestones.",
  },
];

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
    <section className="bg-[#F7F7F7] py-16 lg:py-28 overflow-hidden">

      <div className="mx-auto max-w-[1300px] px-5 sm:px-8">

        <div className="mb-14">

          <h2
            className="
              font-semibold

              text-[#222]

              text-[30px]
              sm:text-[30px]
              lg:text-[30px]

              animate-[fadeInLeft_1s_ease]
            "
          >
            Frequently Asked Questions
          </h2>

        </div>

        <div className="space-y-5">

          {faqs.map((faq, index) => (

            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFAQ === index}
              onToggle={() =>
                setOpenFAQ(openFAQ === index ? null : index)
              }
              delay={index * 120}
            />

          ))}

        </div>

      </div>

    </section>
  );
}