"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const documents = [
  { name: "PAN CARD", accent: "bg-sky-100", url: "/images/about/legal/PAN%20Card.svg" },
  { name: "MCA", accent: "bg-slate-100", url: "/images/about/legal/MCA.svg" },
  { name: "MOA", accent: "bg-stone-100", url: "/images/about/legal/MOA.svg" },
  { name: "AOA", accent: "bg-zinc-100", url: "/images/about/legal/AOA.svg" },
  { name: "MSME", accent: "bg-indigo-100", url: "/images/about/legal/MSME.svg" },
];

function DocumentPreview({ accent, url, name }: { accent: string; url: string; name: string }) {
  return (
    <div className="flex h-[180px] w-full items-center justify-center bg-white px-8 py-4 sm:h-[190px]">
      <div className={`relative h-full w-full max-w-[150px] overflow-hidden border border-slate-200 ${accent} shadow-sm`}>
        <Image src={url} alt={`${name} document`} fill sizes="150px" className="object-contain" />
      </div>
    </div>
  );
}

export default function LegalDocuments() {
  const [selectedDocument, setSelectedDocument] = useState<(typeof documents)[number] | null>(null);

  useEffect(() => {
    if (!selectedDocument) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedDocument(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedDocument]);

  return (
    <section className="overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <h2 className="mb-8 text-center text-[22px] font-semibold text-[#111111] sm:mb-10 sm:text-[24px]">
          Legal Documents
        </h2>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {documents.map((document) => (
            <button
              type="button"
              onClick={() => setSelectedDocument(document)}
              aria-label={`Preview ${document.name}`}
              key={document.name}
              className="w-full max-w-[190px] cursor-zoom-in overflow-hidden rounded-[16px] border border-slate-200 bg-white text-left shadow-[0_3px_12px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#B79C10] focus:ring-offset-2 sm:max-w-[200px]"
            >
              <DocumentPreview accent={document.accent} url={document.url} name={document.name} />
              <div className="px-5 pb-3">
                <div className="flex h-8 items-center justify-center rounded-[5px] bg-[#B79C10] text-xs font-bold text-white sm:text-sm">
                  {document.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedDocument && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedDocument.name} document preview`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-8"
          onClick={() => setSelectedDocument(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col rounded-xl bg-white p-4 shadow-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-[#111111] sm:text-xl">{selectedDocument.name}</h3>
              <button
                type="button"
                onClick={() => setSelectedDocument(null)}
                aria-label="Close document preview"
                className="flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#B79C10]"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="flex min-h-0 flex-1 justify-center overflow-auto rounded-lg bg-slate-50 p-2 sm:p-4">
              <Image
                src={selectedDocument.url}
                alt={`${selectedDocument.name} document preview`}
                width={1200}
                height={1200}
                className="h-auto max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}