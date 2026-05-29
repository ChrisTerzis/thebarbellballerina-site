import type { LegalTocItem } from './legalToc';

type LegalTableOfContentsProps = {
  items: LegalTocItem[];
  activeId: string;
  /** Called when a section link is chosen (before default hash navigation). */
  onTocSelect?: (id: string) => void;
};

export default function LegalTableOfContents({ items, activeId, onTocSelect }: LegalTableOfContentsProps) {
  return (
    <>
      <p className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#BB8966] mb-5">Contents</p>
      <nav aria-label="Document sections" className="flex flex-col gap-3.5">
        {items.map((item, i) => {
          const n = String(i + 1).padStart(2, '0');
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                if (!onTocSelect) return;
                if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                onTocSelect(item.id);
              }}
              aria-current={isActive ? 'location' : undefined}
              className={`group flex gap-3 text-left text-[12px] sm:text-[13px] leading-snug font-sans transition-colors ${
                isActive ? 'text-[#0A0A0A] font-semibold' : 'text-neutral-500 hover:text-[#0A0A0A]'
              }`}
            >
              <span className="text-neutral-400 tabular-nums shrink-0 w-6 sm:w-7 pt-0.5">{n}</span>
              <span className="min-w-0">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
