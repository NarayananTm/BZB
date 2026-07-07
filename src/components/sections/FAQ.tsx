'use client';

import type { FC, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: ReactNode;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  description?: string;
}

const FAQ: FC<FAQProps> = ({ items, title, description }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {title && (
        <div className="text-center mb-12">
          <h2 className="section-title">{title}</h2>
          {description && <p className="text-gray-400 text-lg max-w-2xl mx-auto">{description}</p>}
        </div>
      )}

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border-2 border-dark-700 rounded-xl overflow-hidden hover:border-primary-500 transition-colors"
          >
            <button
              className="w-full px-6 py-4 flex items-center justify-between bg-dark-800 hover:bg-dark-700 transition-colors"
              onClick={() => toggleItem(index)}
              aria-expanded={activeIndex === index}
            >
              <span className="text-lg font-semibold text-white text-left">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-primary-500 transition-transform duration-300 flex-shrink-0 ml-4 ${
                  activeIndex === index ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            {activeIndex === index && (
              <div className="px-6 py-4 bg-dark-900 border-t border-dark-700">
                <div className="text-gray-400 leading-relaxed">{item.answer}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
