import { useSearchParams, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import TermsArticle from '@/pages/legal/TermsArticle';
import PrivacyArticle from '@/pages/legal/PrivacyArticle';
import DisclaimersArticle from '@/pages/legal/DisclaimersArticle';
import LegalTableOfContents from '@/pages/legal/LegalTableOfContents';
import ContentsMenuScroll from '@/pages/legal/ContentsMenuScroll';
import {
  DISCLAIMERS_TOC,
  PRIVACY_TOC,
  TERMS_TOC,
  type LegalTocItem,
} from '@/pages/legal/legalToc';
import { useActiveSection } from '@/pages/legal/useActiveSection';
import { cn } from '@/lib/utils';

export type LegalDocView = 'terms' | 'privacy' | 'disclaimers';

function docFromSearchParams(searchParams: URLSearchParams): LegalDocView {
  const doc = searchParams.get('doc');
  if (doc === 'privacy') return 'privacy';
  if (doc === 'disclaimers') return 'disclaimers';
  return 'terms';
}

export type TermsAndConditionsProps = {
  /** When set (dedicated routes), ignores `?doc=` and uses this document. */
  forcedDoc?: LegalDocView;
};

export default function TermsAndConditions(props: TermsAndConditionsProps = {}) {
  const { forcedDoc } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const activeDoc = forcedDoc ?? docFromSearchParams(searchParams);
  const initialTitleRef = useRef(document.title);
  const [showFloatingScrollTop, setShowFloatingScrollTop] = useState(false);

  const tocItems: LegalTocItem[] = useMemo(() => {
    if (activeDoc === 'privacy') return PRIVACY_TOC;
    if (activeDoc === 'disclaimers') return DISCLAIMERS_TOC;
    return TERMS_TOC;
  }, [activeDoc]);

  const sectionIds = useMemo(() => tocItems.map((t) => t.id), [tocItems]);

  const scrollActiveId = useActiveSection({ sectionIds });

  const [tocPinnedId, setTocPinnedId] = useState<string | null>(null);

  const handleLegalTocSelect = useCallback(
    (id: string) => {
      setTocPinnedId(id);
      navigate(
        { pathname: location.pathname, search: location.search, hash: `#${id}` },
        { replace: true, preventScrollReset: true },
      );
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    },
    [navigate, location.pathname, location.search],
  );

  /** Drop manual TOC highlight once scroll-spy matches the anchored section */
  useEffect(() => {
    if (tocPinnedId != null && scrollActiveId === tocPinnedId) {
      setTocPinnedId(null);
    }
  }, [scrollActiveId, tocPinnedId]);

  const activeId = tocPinnedId ?? scrollActiveId;

  useEffect(() => {
    const title =
      activeDoc === 'privacy'
        ? 'Privacy Policy'
        : activeDoc === 'disclaimers'
          ? 'Disclaimers'
          : 'Terms & Conditions';
    document.title = title;
  }, [activeDoc]);

  useEffect(() => {
    return () => {
      document.title = initialTitleRef.current;
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowFloatingScrollTop(false);
    setTocPinnedId(null);
  }, [activeDoc]);

  useEffect(() => {
    const threshold = 380;
    const onScroll = () => {
      setShowFloatingScrollTop(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const mainHeading =
    activeDoc === 'privacy'
      ? 'Privacy Policy'
      : activeDoc === 'disclaimers'
        ? 'Disclaimers'
        : 'Terms & Conditions';

  const lastUpdatedDisplay = useMemo(
    () =>
      new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    []
  );

  const body =
    activeDoc === 'terms' ? (
      <TermsArticle />
    ) : activeDoc === 'privacy' ? (
      <PrivacyArticle />
    ) : (
      <DisclaimersArticle />
    );

  if (forcedDoc === undefined && searchParams.get('doc') === 'privacy') {
    return <Navigate to={`/privacy-policy${location.hash}`} replace />;
  }
  if (forcedDoc === undefined && searchParams.get('doc') === 'disclaimers') {
    return <Navigate to={`/disclaimers${location.hash}`} replace />;
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#0A0A0A] font-sans">
      <SiteHeader
        variant="legal"
        waitlistOpen={waitlistOpen}
        onOpenWaitlist={() => setWaitlistOpen(true)}
        onCloseWaitlist={() => setWaitlistOpen(false)}
      />

      <main className="pt-24 md:pt-28 pb-16 px-5 sm:px-8 md:px-10">
        <div className="max-w-6xl mx-auto w-full">
          <header className="text-center mb-12 md:mb-16 mx-auto max-w-3xl px-2">
            <p className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] mb-3 text-[#BB8966]">
              The Barbell Ballerina LLC
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#0A0A0A] tracking-tight leading-tight">
              {mainHeading}
            </h1>
            <p className="text-sm sm:text-[15px] text-neutral-500 mt-4 font-sans">
              Last updated · {lastUpdatedDisplay}
            </p>
          </header>

          <div className="lg:grid lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-x-14 xl:gap-x-20 lg:items-stretch">
            <aside className="hidden lg:block shrink-0 min-h-0">
              <ContentsMenuScroll className="sticky top-28 border-r border-neutral-200/80 pr-4">
                <LegalTableOfContents items={tocItems} activeId={activeId} onTocSelect={handleLegalTocSelect} />
              </ContentsMenuScroll>
            </aside>

            <div className="min-w-0 lg:border-l lg:border-neutral-200/40 lg:pl-10 xl:pl-14 lg:-ml-px">
              <div className="lg:hidden mb-10 pb-8 border-b border-neutral-200/80">
                <LegalTableOfContents items={tocItems} activeId={activeId} onTocSelect={handleLegalTocSelect} />
              </div>

              {body}
            </div>
          </div>

          <div className="flex justify-center pt-14">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 border-0 text-[#BB8966] bg-transparent px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] rounded-md hover:text-[#A87856] transition-colors font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BB8966] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F8F6]"
            >
              <ChevronUp className="w-4 h-4 shrink-0" strokeWidth={2} aria-hidden />
              <span>Back to top</span>
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn(
          'fixed bottom-8 right-5 md:bottom-10 md:right-10 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#0A0A0A] text-white shadow-lg ring-1 ring-black/5 transition-all duration-300 ease-out md:h-12 md:w-12 hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BB8966] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F8F6]',
          showFloatingScrollTop
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0'
        )}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5 md:h-[22px] md:w-[22px]" strokeWidth={2} aria-hidden />
      </button>
    </div>
  );
}
