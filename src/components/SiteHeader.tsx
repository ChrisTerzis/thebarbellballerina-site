import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import WaitlistModal from '@/components/WaitlistModal';
import { SITE_NAV } from '@/data/siteNav';
import Logo from '@/assets/Logo.png';

const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-2 bg-[#BB8966] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] rounded-md shadow-sm hover:bg-[#A87856] hover:-translate-y-0.5 transition-all';

type SiteHeaderProps = {
  waitlistOpen: boolean;
  onOpenWaitlist: () => void;
  onCloseWaitlist: () => void;
  /** Hide Method / App / Results / About / FAQ links (e.g. on legal pages). */
  hidePrimaryNav?: boolean;
  /** Minimal header: logo + back link only (legal / editorial pages). */
  variant?: 'default' | 'legal';
};

export default function SiteHeader({
  waitlistOpen,
  onOpenWaitlist,
  onCloseWaitlist,
  hidePrimaryNav = false,
  variant = 'default',
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          variant === 'legal'
            ? 'bg-[#F9F8F6]/95 backdrop-blur-md border-b border-neutral-200/80'
            : scrolled
              ? 'bg-[#F5F5F3]/80 backdrop-blur-xl border-b border-black/5'
              : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center shrink-0">
            <img src={Logo} alt="The Barbell Ballerina" className="h-12 md:h-14 w-auto object-contain" />
          </Link>
          {variant === 'legal' ? (
            <Link
              to="/"
              className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.16em] md:tracking-[0.2em] text-neutral-500 hover:text-[#BB8966] transition-colors shrink-0"
            >
              ← Back to site
            </Link>
          ) : (
            <>
              {!hidePrimaryNav && (
                <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em]">
                  {SITE_NAV.map((n) => (
                    <Link key={n.label} to={n.to} className="hover:text-[#BB8966] transition-colors">
                      {n.label}
                    </Link>
                  ))}
                </nav>
              )}
              <button
                type="button"
                onClick={onOpenWaitlist}
                className={`hidden md:inline-flex ${BTN_PRIMARY.replace('px-8 py-4', 'px-6 py-3')}`}
              >
                Get early access
              </button>
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open menu"
                className="md:hidden p-2 -mr-2 text-[#0A0A0A] hover:text-[#BB8966] transition-colors"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </>
          )}
        </div>
      </header>

      {mobileNavOpen && variant !== 'legal' && (
        <div className="fixed inset-0 z-[90] md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setMobileNavOpen(false)}
            aria-hidden
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 right-0 h-full w-[82%] max-w-sm bg-[#F5F5F3] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-black/5">
              <img src={Logo} alt="The Barbell Ballerina" className="h-10 w-auto object-contain" />
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close menu"
                className="p-2 -mr-2 text-[#0A0A0A] hover:text-[#BB8966] transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
            {!hidePrimaryNav && (
              <nav className="flex flex-col px-8 py-10 gap-1">
                {SITE_NAV.map((n, i) => (
                  <Link
                    key={n.label}
                    to={n.to}
                    onClick={() => setMobileNavOpen(false)}
                    className="font-serif text-3xl py-3 border-b border-black/5 hover:text-[#BB8966] transition-colors"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            )}
            <div className="mt-auto p-6 border-t border-black/5">
              <button
                type="button"
                onClick={() => {
                  setMobileNavOpen(false);
                  onOpenWaitlist();
                }}
                className={`w-full ${BTN_PRIMARY}`}
              >
                Get early access <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-black/40 text-center">
                Strength for ballet performance
              </p>
            </div>
          </motion.div>
        </div>
      )}

      <WaitlistModal open={waitlistOpen} onClose={onCloseWaitlist} />
    </>
  );
}
