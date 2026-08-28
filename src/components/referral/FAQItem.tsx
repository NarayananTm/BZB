"use client";

import { ChevronDown, ChevronRight } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  delay?: number;
}

export default function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  delay = 0,
}: FAQItemProps) {
  return (
    <div
      style={{
        animationDelay: `${delay}ms`,
      }}
      className="
        overflow-hidden

        rounded-2xl

        border
        border-[#ECECEC]

        bg-white

        shadow-[0_8px_20px_rgba(0,0,0,.06)]

        transition-all
        duration-300

        hover:shadow-[0_15px_35px_rgba(0,0,0,.10)]

        opacity-0
        animate-[fadeInUp_.8s_ease_forwards]
      "
    >
      <button
        onClick={onToggle}
        className="
          flex
          w-full
          items-center
          justify-between

          px-6
          py-6

          text-left

          transition-colors
          duration-300

          hover:bg-gray-50
        "
      >
        <span
          className="
            pr-5

            font-semibold

            text-[#222]

            text-[25px]
            sm:text-[25px]
            lg:text-[25px]
          "
        >
          {question}
        </span>

        {isOpen ? (
          <ChevronDown className="h-6 w-6 text-[#B5970C]" />
        ) : (
          <ChevronRight className="h-6 w-6 text-[#666]" />
        )}
      </button>

      <div
        className={`
          transition-all
          duration-500
          overflow-hidden

          ${
            isOpen
              ? "max-h-[300px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div
          className="
            px-6
            pb-6

            text-[#666]

            leading-7

            text-[20px]
            sm:text-[20px]
            lg:text-[20px]
          "
        >
          {answer}
        </div>
      </div>
    </div>
  );
}