import type { ReactNode } from 'react';

type DocSectionProps = {
  id: string;
  /** 1-based index shown as 01, 02, … */
  index: number;
  title: string;
  children: ReactNode;
};

export default function DocSection({ id, index, title, children }: DocSectionProps) {
  const num = String(index).padStart(2, '0');

  return (
    <section id={id} className="scroll-mt-28 md:scroll-mt-36 pt-10 mt-12">
      <div className="flex items-end gap-3 sm:gap-4 mb-4">
        <span className="text-[11px] font-sans uppercase tracking-[0.12em] text-[#BB8966] tabular-nums shrink-0 leading-none pb-0.5">
          {num}
        </span>
        <div className="h-px flex-1 bg-neutral-200/90 min-w-0 mb-1" aria-hidden />
      </div>
      <h2 className="font-serif text-[22px] md:text-[26px] text-[#0A0A0A] tracking-tight leading-snug mb-6">{title}</h2>
      <div className="space-y-4 break-words text-[15px] leading-[1.65] text-neutral-700 font-sans [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:break-all [&_a]:underline [&_a]:underline-offset-[3px] [&_a]:decoration-1 [&_a]:text-inherit">
        {children}
      </div>
    </section>
  );
}
