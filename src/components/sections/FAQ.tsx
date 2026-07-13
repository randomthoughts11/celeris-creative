"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function FaqItem({
  faq,
  index,
  open,
  onToggle,
}: {
  faq: (typeof FAQS)[number];
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <Reveal delay={index * 0.05}>
      <div
        className={`overflow-hidden rounded-card border transition-colors duration-500 ${
          open ? "border-iris/40 bg-ink-2" : "border-line bg-transparent hover:border-line-strong"
        }`}
      >
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left"
        >
          <span className="font-display text-lg font-medium text-snow sm:text-xl">
            {faq.question}
          </span>
          <span
            aria-hidden
            className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
              open ? "rotate-180 border-iris bg-iris/10" : "border-line"
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 4L6 8L10 4"
                stroke={open ? "#a89eff" : "#a3a3b2"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="px-7 pb-7 text-sm leading-relaxed text-fog sm:text-base">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-28 sm:py-36" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 lg:grid-cols-[1fr_1.4fr] lg:px-10">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions,"
            accent="answered honestly."
            description="Everything founders usually ask before a first call. Something else on your mind? Ask us directly — you'll get a straight answer."
          />
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
