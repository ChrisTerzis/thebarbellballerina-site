import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, X, Dumbbell, LineChart, CalendarDays, Sparkles, ClipboardList, Smartphone, TrendingUp, Plus, Minus } from 'lucide-react';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import imgStrength from '@/assets/visual-strength.jpg';
import imgArabesque from '@/assets/visual-arabesque.jpg';
import imgArms from '@/assets/The Barbell Ballerina by Mycah Bain Photography-299 (1).jpg';
import imgWindow from '@/assets/visual-window.jpg';
import imgFounder from '@/assets/founder-portrait.jpg';
import imgSmile from '@/assets/lifestyle-smile.png';
import imgAppHomePreview from '@/assets/app-home-preview.png';
import imgChapter01 from '@/assets/2BF427D7-1DF6-43EA-95D0-531B3932FAD1.png';
import imgCertifications from '@/assets/certifications.png';
import { HERO_VIDEO_SRC } from '@/data/siteMedia';

// Brand button styles — primary: solid beige, secondary: outlined beige
const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2 bg-[#BB8966] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] rounded-md shadow-sm hover:bg-[#A87856] hover:-translate-y-0.5 transition-all";
const BTN_SECONDARY =
  "inline-flex items-center justify-center gap-2 border border-[#BB8966] text-[#BB8966] bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] rounded-md hover:bg-[#BB8966]/10 transition-all";

// Grey image placeholder
const Placeholder = ({ label, className = '' }: { label: string; className?: string }) => (
  <div
    className={`w-full h-full bg-[#D9D7D2] flex items-center justify-center text-[10px] uppercase tracking-[0.3em] text-black/40 ${className}`}
  >
    {label}
  </div>
);

function HeroVideoFrame({
  className = '',
  showEstPlaque = true,
}: {
  className?: string;
  showEstPlaque?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative aspect-[3/4] overflow-hidden bg-[#0A0A0A]">
        <video
          src={HERO_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/30 pointer-events-none" />
      </div>
      {showEstPlaque ? (
        <div className="absolute -bottom-4 left-4 md:-left-6 bg-[#F5F5F3] px-4 py-3 border-l-2 border-[#BB8966]">
          <p className="text-[10px] uppercase tracking-[0.25em] text-black/50">Est.</p>
          <p className="font-serif text-xl">2020</p>
        </div>
      ) : null}
    </div>
  );
}

// Full-width editorial visual panel with subtle parallax background
const VisualPanel = ({
  image,
  alt,
  overlay,
  height = 'h-[60vh] md:h-[80vh]',
  tone = 'light',
  position = 'center',
}: {
  image?: string;
  alt: string;
  overlay?: string;
  height?: string;
  tone?: 'light' | 'dark';
  position?: string;
}) => (
  <section className={`relative w-full ${height} overflow-hidden bg-[#0A0A0A]`}>
    {image ? (
      <div
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: position,
          backgroundAttachment: 'fixed',
        }}
        role="img"
        aria-label={alt}
      />
    ) : (
      <Placeholder label={alt} />
    )}
    {overlay && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-end justify-start p-8 md:p-16"
      >
        <p
          className={`font-serif italic text-2xl md:text-4xl max-w-md leading-snug drop-shadow-md ${tone === 'dark' ? 'text-white/90' : 'text-white/95'
            }`}
        >
          {overlay}
        </p>
      </motion.div>
    )}
  </section>
);

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

function Chapter00PainCard({
  index,
  span,
  children,
}: {
  index: number;
  span: 'wide' | 'narrow';
  children: React.ReactNode;
}) {
  const colClass =
    span === 'wide' ? 'md:col-span-7 lg:col-span-7' : 'md:col-span-5 lg:col-span-5';

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative border border-white/10 bg-white/[0.025] backdrop-blur-[2px] p-8 md:p-10 lg:p-11 flex flex-col min-h-[160px] hover:border-[#BB8966]/40 hover:bg-white/[0.045] transition-all duration-500 ${colClass}`}
    >
      <span className="font-display text-[11px] tracking-[0.38em] text-[#BB8966]">{String(index).padStart(2, '0')}</span>
      <span className="mt-3 block h-px w-9 shrink-0 bg-[#BB8966]" aria-hidden />
      <h3 className="mt-8 font-serif text-2xl md:text-[1.75rem] lg:text-[1.85rem] leading-[1.15] tracking-tight text-white">{children}</h3>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#BB8966] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />
    </motion.article>
  );
}

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Is this only for ballet dancers?',
    a: (
      <>
        <p>The Barbell Ballerina is built for ballet dancers first.</p>
        <p>
          But the method has helped performers across many disciplines improve strength, resilience, and performance, including contemporary, modern, and other movement-based athletes.
        </p>
      </>
    ),
  },
  {
    q: 'What equipment do I need?',
    a: (
      <>
        <p>
          <span className="font-medium text-[#0A0A0A]">For gym training:</span><br />
          Dumbbells, barbells, kettlebells, cables, and basic machines.
        </p>
        <p>
          <span className="font-medium text-[#0A0A0A]">For home training:</span><br />
          Dumbbells or kettlebells, a resistance band, and a bench or chair.
        </p>
        <p>Programs are designed to be flexible depending on your setup.</p>
      </>
    ),
  },
  {
    q: 'I’m worried about getting bulky. Will this happen?',
    a: (
      <>
        <p>No.</p>
        <p>These programs are designed
          specifically for dancers. The goal is athletic performance, not bulk.</p>
        <p>You will build strength that supports technique, improves control, and enhances movement quality without sacrificing your line.</p>
      </>
    ),
  },
  {
    q: 'How quickly will I see results?',
    a: (
      <>
        <p>Many dancers notice changes within weeks.</p>
        <p>Improved strength, more stable landings, better control, and reduced pain often come early when training is applied consistently.</p>
      </>
    ),
  },
  {
    q: 'I still need help. Who can I contact?',
    a: (
      <>
        <p>
          You can reach out anytime at:{' '}
          <a href="mailto: support@thebarbellballerina.com" className="text-[#BB8966] underline underline-offset-4 hover:text-[#0A0A0A] transition-colors">
            support@thebarbellballerina.com
          </a>
        </p>
        <p>Include your name, email used for your account, and a short description of your issue.</p>
      </>
    ),
  },
];

const PAIN_POINTS = [
  'Injuries that keep coming back',
  'Always sore and tired',
  'Technique that never quite clicks',
  'Eating less, running on empty',
  'Quietly losing confidence',
  'Working hard, yet seeing little results',
  'Wondering if you are cut out for this',
  'Thinking about walking away',
];

type MembershipBilling =
  | { mode: 'single'; priceMain: string; priceAlt: string }
  | {
      mode: 'toggle';
      monthly: { priceMain: string; priceAlt: string };
      annual: { priceMain: string; priceAlt: string };
    };

type MembershipTier = {
  index: string;
  title: string;
  subtitle: string;
  featured: boolean;
  features: readonly string[];
  ctaVariant: 'outline' | 'solid';
  badge?: string;
  billing: MembershipBilling;
};

const MEMBERSHIP_TIERS: readonly MembershipTier[] = [
  {
    index: '01',
    title: 'Strength Athlete',
    subtitle: 'Begin Building Strength.',
    featured: false,
    features: [
      'Limited program access',
      'Basic logging and progress',
      'Community read-only access',
      'Limited new features',
    ],
    ctaVariant: 'outline' as const,
    billing: {
      mode: 'toggle' as const,
      monthly: {
        priceMain: '$24.99',
        priceAlt: 'Save $50 with the annual plan.',
      },
      annual: {
        priceMain: '$249',
        priceAlt: 'Save $50 with the annual plan.',
      },
    },
  },
  {
    index: '02',
    title: 'Performance Athlete',
    subtitle: 'Train at your highest level.',
    badge: 'Most complete',
    featured: true,
    features: [
      'All program access',
      'Personalized logging and performance dashboard',
      'Full community access',
      'Access to all new features',
    ],
    ctaVariant: 'solid' as const,
    billing: {
      mode: 'toggle' as const,
      monthly: {
        priceMain: '$39.99',
        priceAlt: 'Save $80 with the annual plan.',
      },
      annual: {
        priceMain: '$399',
        priceAlt: 'Save $80 with the annual plan.',
      },
    },
  },
];

export default function Landing() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [membershipBilling, setMembershipBilling] = useState<'monthly' | 'annual'>('annual');
  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <div className="min-h-screen bg-[#F5F5F3] text-[#0A0A0A] font-sans">
      <SiteHeader
        waitlistOpen={waitlistOpen}
        onOpenWaitlist={openWaitlist}
        onCloseWaitlist={() => setWaitlistOpen(false)}
      />

      {/* HERO */}
      <section className="relative min-h-screen flex items-start md:items-center pt-24 pb-16 px-6 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-x-12 xl:gap-x-14 w-full md:items-start">
          <div className="md:col-span-6 z-10 flex flex-col gap-8 md:gap-10 md:pt-10 lg:pt-14">
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs uppercase tracking-[0.3em] text-[#BB8966]"
            >Redefining how ballet dancers train</motion.p>
            <div className="flex flex-col gap-6 md:block">
              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight-brand flex-1 min-w-0 md:mb-8"
              >
                Build a body<br />
                <span className="italic font-light">and career</span><br />
                that lasts.
              </motion.h1>
              <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 md:hidden">
                <HeroVideoFrame showEstPlaque={false} />
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg text-black/65 max-w-md leading-relaxed mb-10"
            >
              Ballet dancers are expected to perform like elite athletes, without the tools to train like them.
              <br />
              <span className="text-black/80">The Barbell Ballerina changes that.</span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={openWaitlist}
                className={`${BTN_PRIMARY} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg`}
              >
                Get early access <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href="#method"
                className={`${BTN_SECONDARY} transition-all duration-300 hover:-translate-y-0.5`}
              >
                See how it works
              </a>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-6 text-[11px] uppercase tracking-[0.25em] text-black/40"
            >
              Strength that translates directly to your technique.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block md:col-span-6 relative"
          >
            <HeroVideoFrame />
          </motion.div>
        </div>
      </section>

      {/* VISUAL PANEL — after hero (visual strength) */}
      <VisualPanel
        image={imgStrength}
        alt="Dancer training in the gym"
        position="center 25%"
        tone="light"
      />

      {/* CHAPTER 00 — headline, numbered cards & closing line (single band) */}
      <section
        aria-labelledby="chapter-00-heading"
        className="relative overflow-hidden px-6 pb-[4.75rem] pt-28 text-[#F5F5F3] md:px-10 md:pb-28 md:pt-36 lg:pb-36"
      >
        <img
          src={imgArms}
          alt=""
          decoding="async"
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] h-full min-h-[32rem] w-full bg-[#0a0a0a] object-cover object-[center_top] sm:min-h-[40rem]"
        />
        {/* Dark scrim (radials + linear); layer opacity so base photo can still read */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] opacity-[0.94]"
          style={{
            background:
              'radial-gradient(95% 60% at 100% 100%, rgba(255,255,255,0.04), transparent 55%), radial-gradient(88% 55% at 100% 32%, rgba(255,255,255,0.035), transparent 52%), linear-gradient(165deg, #161412 0%, #0a0a0a 42%, #12100e 100%)',
          }}
        />
        {/* Original muted texture pass */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[3] bg-cover bg-center bg-no-repeat opacity-[0.048] mix-blend-luminosity"
          style={{ backgroundImage: `url(${imgArms})` }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[4] bg-black/13" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl lg:max-w-2xl pb-14 md:pb-20 lg:pb-24"
          >
            <p className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#BB8966] md:text-xs md:tracking-[0.34em]">
              Chapter 00 / The Reality
            </p>
            <h2 id="chapter-00-heading" className="font-serif text-[2.375rem] font-normal leading-[1.06] tracking-tight text-white sm:text-[2.75rem] md:text-6xl lg:text-[3.85rem]">
              Your work ethic was{' '}
              <span className="italic font-light">
                never the issue.
              </span>
            </h2>
            <p className="mt-7 max-w-xl font-sans text-base leading-relaxed text-white/70 md:text-lg md:leading-relaxed">
              Ballet demands superhuman athleticism. Yet most dancers are not given the tools and training to build and maintain
              that level of strength and resilience.
            </p>
          </motion.div>

          <div className="space-y-6 md:space-y-8">
            {Array.from({ length: Math.ceil(PAIN_POINTS.length / 2) }).map((_, rowIdx) => {
              const leftIdx = rowIdx * 2;
              const left = PAIN_POINTS[leftIdx];
              const right = PAIN_POINTS[leftIdx + 1];
              const leftWide = rowIdx % 2 === 0;
              const leftSpan: 'wide' | 'narrow' = leftWide ? 'wide' : 'narrow';
              const rightSpan: 'wide' | 'narrow' = leftWide ? 'narrow' : 'wide';
              return (
                <div key={rowIdx} className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
                  <Chapter00PainCard index={leftIdx + 1} span={leftSpan}>
                    {left}
                  </Chapter00PainCard>
                  {right !== undefined ? (
                    <Chapter00PainCard index={leftIdx + 2} span={rightSpan}>
                      {right}
                    </Chapter00PainCard>
                  ) : (
                    <div className="hidden md:block md:col-span-5 lg:col-span-5" aria-hidden />
                  )}
                </div>
              );
            })}
          </div>

          <motion.div {...fadeUp} className="mt-14 max-w-4xl md:mt-[4.75rem] lg:max-w-3xl">
            <span className="mb-9 block h-px w-12 bg-[#BB8966]" aria-hidden />
            <p className="font-serif text-[1.4rem] italic leading-snug tracking-tight text-[#BB8966] md:text-3xl md:leading-snug lg:text-[2.45rem]">
              The problem is not discipline. It is a lack of the right training.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHY THIS MATTERS */}
      <section className="py-32 md:py-48 px-6 md:px-10 bg-[#0A0A0A] text-[#F5F5F3]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          <motion.div {...fadeUp} className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-[#BB8966] mb-8">Chapter 01 / Why now</p>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] mb-10 tracking-tight-brand">
              Your training determines your longevity.
            </h2>
            <div className="space-y-6 text-white/65 max-w-xl text-lg leading-relaxed">
              <p>
                Ballet dancers are expected to perform at a high level without being given the tools to train like athletes.
              </p>
              <p>
                Without structured strength training, performance plateaus, injuries repeat, and potential is left untapped.
              </p>
              <p>
                With the right system, strength, control, and resilience can be built proactively, supporting both performance and longevity.
              </p>
            </div>
            <div className="mt-14 pt-10 border-t border-white/10 flex items-center gap-6">
              <span className="font-display text-7xl md:text-8xl text-[#BB8966] leading-none">80%</span>
              <span className="text-xs uppercase tracking-[0.25em] text-white/50 max-w-[200px] leading-relaxed">of dancers experience injury each year</span>
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="md:col-span-5">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={imgChapter01}
                alt="Dancer training"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* METHOD COMPARISON */}
      <section id="method" className="scroll-mt-24 md:scroll-mt-28 py-32 md:py-48 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-20 max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-[#BB8966] mb-6">Chapter 02 / The Method</p>
            <h2 className="font-serif text-5xl md:text-7xl tracking-tight-brand mb-6">A new standard for training.</h2>
            <p className="text-lg text-black/55 leading-relaxed">
              Traditional cross-training tries to preserve the ballet body. <br className="hidden md:block" />
              <span className="italic">The Barbell Ballerina builds the body that ballet actually requires.</span>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-px bg-black/10">
            <motion.div {...fadeUp} className="bg-[#EDEDEA] p-10 md:p-14 hover:bg-[#E5E5E2] transition-colors">
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 mb-8">The Old Way</p>
              <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-10 text-black/60">Traditional Training</h3>
              <ul className="space-y-5">
                {['Light weights or bodyweight only', 'No progressive overload', 'Focus on aesthetics', 'Unstructured or generalized', 'Reactive approach to injury', 'Plateaus in strength and performance'].map((t) => (
                  <li key={t} className="flex items-start gap-4 text-black/55">
                    <X className="w-4 h-4 mt-1 shrink-0 text-black/30" strokeWidth={1.5} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp} className="bg-[#0A0A0A] text-[#F5F5F3] p-10 md:p-14 relative hover:bg-[#141414] transition-colors">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#BB8966] to-transparent" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#BB8966] mb-8">The New Standard</p>
              <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-10 leading-[1.05] tracking-tight-brand">
                TBB
                <br />
                Method
              </h3>
              <ul className="space-y-5">
                {['Structured progressive overload', 'Performance-focused training', 'Rooted in sports science', 'Clear phases and progression', 'Proactive injury prevention', 'Builds strength, power, and resilience'].map((t) => (
                  <li key={t} className="flex items-start gap-4 text-white/80">
                    <Check className="w-4 h-4 mt-1 shrink-0 text-[#BB8966]" strokeWidth={1.5} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VISUAL PANEL — after Why (arabesque, strength vs elegance) */}
      <VisualPanel
        image={imgArabesque}
        alt="Ballet dancer in arabesque"
        position="center"
        tone="light"
      />

      {/* TRAIN WITH INTENTION */}
      <section className="py-32 md:py-48 bg-[#EDEDEA]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="mb-16 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[#BB8966] mb-6">Chapter 03 / Principles</p>
            <h2 className="font-serif text-5xl md:text-7xl tracking-tight-brand mb-6">Train with intention.</h2>
            <p className="text-lg text-black/55 leading-relaxed">
              Designed to improve how you move, perform, and execute technique on stage.
            </p>
          </motion.div>

          <div className="relative overflow-hidden border border-black/10 bg-black/10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-px">
              {[
                { icon: Sparkles, title: 'Built for Ballet Dancers', body: 'Created specifically for the demands of ballet technique and performance.' },
                { icon: CalendarDays, title: 'Structured Programs', body: 'Follow clear training phases designed for progression and measurable results.' },
                { icon: Dumbbell, title: 'Performance Focus', body: 'Improve turns, jumps, extensions, and overall control.' },
                { icon: LineChart, title: 'Progress Tracking', body: 'Measure consistency, strength, and performance over time.' },
              ].map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[#F5F5F3] p-10 hover:bg-white transition-colors group min-h-[280px] lg:min-h-[340px] flex flex-col"
                >
                  <c.icon className="w-6 h-6 text-[#BB8966] mb-10" strokeWidth={1.25} />
                  <h3 className="font-serif text-2xl mb-4 group-hover:text-[#BB8966] transition-colors">{c.title}</h3>
                  <p className="text-sm text-black/55 leading-relaxed">{c.body}</p>
                  <p className="font-display text-xs tracking-[0.3em] text-black/25 mt-auto pt-12">0{i + 1}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — dark band, copper rules, left-aligned */}
      <section id="how" className="scroll-mt-24 md:scroll-mt-28 py-32 md:py-48 px-6 md:px-10 bg-[#0A0A0A] text-[#F5F5F3]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-16 md:mb-24 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[#BB8966] mb-6">Chapter 04 / Process</p>
            <h2 className="font-serif text-5xl md:text-7xl tracking-tight-brand mb-6 text-white">How it works.</h2>
            <p className="text-lg text-white/60 leading-relaxed">
              A simple, structured system designed for real progress.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-8 lg:gap-12">
            {[
              { icon: ClipboardList, title: 'Choose your program', body: 'Select a program designed for your level, goals, and training needs as a ballet dancer.' },
              { icon: Smartphone, title: 'Train inside the app', body: 'Follow guided workouts with a clear weekly structure built around performance and progression.' },
              { icon: TrendingUp, title: 'Improve your performance', body: 'Build strength that directly translates to your technique, from more consistent turns to stronger jumps and extensions.' },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="border-t border-[#BB8966] pt-8 md:pt-10"
              >
                <p className="font-display text-[11px] md:text-xs tracking-[0.25em] text-[#BB8966] mb-8 uppercase">
                  Step 0{i + 1}
                </p>
                <s.icon className="w-7 h-7 text-[#BB8966] mb-8" strokeWidth={1.25} />
                <h3 className="font-serif text-2xl md:text-3xl mb-5 text-white">{s.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APP EXPERIENCE */}
      <section id="app" className="scroll-mt-24 md:scroll-mt-28 py-32 md:py-48 px-6 md:px-10 bg-[#EDEDEA]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp} className="relative order-2 md:order-1">
            <div className="aspect-[4/5] overflow-hidden bg-[#D9D7D2]">
              <img
                src={imgSmile}
                alt="Lifestyle portrait"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <motion.img
              src={imgAppHomePreview}
              alt="App preview"
              className="absolute -right-4 sm:-right-6 md:-right-10 -bottom-6 sm:-bottom-8 md:-bottom-12 w-32 sm:w-40 md:w-56 lg:w-64 drop-shadow-2xl pointer-events-none select-none"
              loading="lazy"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          <motion.div {...fadeUp} className="order-1 md:order-2">
            <p className="text-xs uppercase tracking-[0.3em] text-[#BB8966] mb-6">Chapter 05 / The App</p>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] mb-6 tracking-tight-brand">
              Your training,<br />structured inside the app.
            </h2>
            <p className="text-lg text-black/60 leading-relaxed mb-10 max-w-md">
              Every program is designed to support performance, consistency, and long-term progress.
            </p>
            <ul className="space-y-5 mb-12">
              {['Guided workouts', 'Weekly training structure', 'Progress tracking', 'Consistent, performance-focused system'].map((t) => (
                <li key={t} className="flex items-center gap-4 text-base text-black/70 border-b border-black/10 pb-5">
                  <span className="font-display text-[#BB8966] text-sm tracking-widest">/</span>
                  {t}
                </li>
              ))}
            </ul>
            <button onClick={openWaitlist} className={BTN_SECONDARY}>
              Get early access <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* VISUAL PANEL — before testimonials (lifestyle window pose) */}
      <VisualPanel
        image={imgWindow}
        alt="Dancer at the window"
        position="center 30%"
        tone="dark"
      />

      {/* RESULTS */}
      <section id="results" className="scroll-mt-24 md:scroll-mt-28 py-32 md:py-48 px-6 md:px-10 bg-[#0A0A0A] text-[#F5F5F3]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#BB8966] mb-6">Chapter 06 / Results</p>
              <h2 className="font-serif text-5xl md:text-7xl tracking-tight-brand">Built in the gym.<br /><span className="italic font-light">Proven onstage.</span></h2>
            </div>
            <p className="text-white/55 text-sm max-w-sm leading-relaxed">
              Real results from ballet dancers applying structured strength training to their performance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-6 gap-8 md:gap-10">
            {[
              { quote: 'I have gained so much strength and noticed an extreme decrease in injury and pain. I even avoided hip replacement surgery.', name: 'Avalyn P.', tag: 'Stronger, safer', span: 'md:col-span-3', featured: true },
              { quote: 'I am not afraid to go to the gym anymore, confident in my body, and secure in my mindset.', name: 'Kristen D.', tag: 'Confidence', span: 'md:col-span-3', featured: true },
              { quote: 'Before TBB, I was about to retire due to constant pain (I’m 38). Now I feel stronger than ever and excited to keep dancing for many years.', name: 'Jessica M.', tag: 'A new chapter', span: 'md:col-span-2' },
              { quote: 'My jumps have completely changed. My footwork, jump height, power and stamina have all improved drastically', name: 'Hannah A.', tag: 'Power & control', span: 'md:col-span-2' },
              { quote: 'Before TBB, I really struggled with routines and accountability. I finally have structure, confidence, and a clear path forward.', name: 'Lauren W.', tag: 'Clarity', span: 'md:col-span-2' },
              { quote: 'I have never been a turner and have always struggled hopping in doubles. Using TBB, I am suddenly doing consistent clean triples.', name: 'Shenandoah H.', tag: 'Cleaner turns', span: 'md:col-span-3' },
              { quote: 'My extensions are stronger than ever, and I feel so solid in auditions even during tricky combinations.', name: 'Alexa A.', tag: 'Audition-ready', span: 'md:col-span-3' },
            ].map((t, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className={`bg-white/[0.03] border border-white/10 p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-black/40 ${t.span}`}
              >
                <blockquote className={`font-serif leading-snug mb-10 ${t.featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center justify-between text-xs uppercase tracking-[0.2em] gap-4">
                  <span className="text-white/70">{t.name}</span>
                  <span className="text-[#BB8966] text-right">{t.tag}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section id="about" className="scroll-mt-24 md:scroll-mt-28 py-32 md:py-48 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 md:sticky md:top-28"
          >
            <div className="aspect-[2/3] overflow-hidden bg-[#EDEDEA]">
              <img
                src={imgFounder}
                alt="Founder, The Barbell Ballerina"
                className="h-full w-full object-contain object-top"
                loading="lazy"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#BB8966] mb-6">Chapter 07 / About</p>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] mb-12 tracking-tight-brand">
              The dream I almost<br /><span className="italic font-light">didn’t chase.</span>
            </h2>
            <div className="space-y-7 text-black/70 text-lg leading-[1.85] max-w-xl">
              <p>
                I founded The Barbell Ballerina at a pivotal moment in my life. At 22, I was accepted to medical
                school while simultaneously pursuing a professional ballet career. Ultimately, I chose the
                unconventional path and committed fully to ballet.
              </p>
              <p>
                During my pre-med years, I discovered strength training as a way to manage stress, but I
                quickly fell in love with the confidence, resilience, and athleticism it gave me. Later, while
                training in ballet at an intense level (often more than 30 hours per week) I experienced the same
                cycle of repetitive injuries that so many dancers face. Through strength training in the gym, I
                was able not only to recover, but to build a body capable of sustaining the demands of a
                professional career.
              </p>
              <p>
                As I began sharing this journey online, it became clear that there was a major gap in the ballet
                industry. Injury rates remain alarmingly high, with research showing that nearly all professional
                dancers experience at least one injury each year. Yet dancers are rarely given the tools or
                training systems to support the physical demands placed on their bodies.
              </p>
              <p className="font-serif italic text-base md:text-xl leading-relaxed text-black/85 border-l-[3px] border-[#D4AF37] pl-6 md:pl-8 py-2 max-w-xl">
                The Barbell Ballerina was created to help solve this problem.
              </p>
              <p>
                We bridge the gap between
                traditional ballet training and athletic performance by providing structured strength training
                programs specifically designed for dancers. Through performance-focused programming
                tailored to the biomechanics and demands of dance, we help dancers improve performance,
                reduce injury risk, and build careers that last.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 pt-10 border-t border-black/10 max-w-xl"
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-black/40 mb-6">
                Certified &amp; Qualified
              </p>
              <img
                src={imgCertifications}
                alt="NASM Certified Personal Trainer, Corrective Exercise Specialist, Certified Nutrition Coach"
                className="h-16 md:h-20 w-auto object-contain opacity-80 grayscale"
                loading="lazy"
              />
              <ul className="mt-6 space-y-1.5 text-[11px] uppercase tracking-[0.25em] text-black/45">
                <li>NASM Certified Personal Trainer</li>
                <li>Corrective Exercise Specialist</li>
                <li>Certified Nutrition Coach</li>
              </ul>
            </motion.div>

            <p className="mt-10 font-serif italic text-black/40">Founder, The Barbell Ballerina</p>
          </motion.div>
        </div>
      </section>

      {/* MEMBERSHIP — pricing (above Chapter 08) */}
      <section id="membership" className="scroll-mt-24 md:scroll-mt-28 bg-[#0b0a09] px-6 py-24 text-[#F5F5F3] md:px-10 md:py-32">
        <div className="relative mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mb-14 max-w-3xl md:mb-20">
            <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-[#BB8966] md:text-xs">Chapter 08 / Membership</p>
            <h2 className="mb-6 font-serif text-4xl tracking-tight text-white md:text-6xl lg:text-7xl">
              Choose your training path.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
              Structured strength training for ballet athletes — from seasonal programming to advanced performance tracking.
            </p>
          </motion.div>

          <div className="mx-auto mb-10 flex max-w-5xl flex-col items-center gap-4 md:mb-12">
            <div
              className="inline-flex rounded-md border border-white/15 bg-[#141210]/90 p-1 shadow-inner shadow-black/20"
              role="group"
              aria-label="Billing period"
            >
              <button
                type="button"
                onClick={() => setMembershipBilling('monthly')}
                aria-pressed={membershipBilling === 'monthly'}
                className={`rounded px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors md:px-9 md:text-xs ${
                  membershipBilling === 'monthly'
                    ? 'bg-[#BB8966] text-[#0b0a09]'
                    : 'text-white/55 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setMembershipBilling('annual')}
                aria-pressed={membershipBilling === 'annual'}
                className={`rounded px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors md:px-9 md:text-xs ${
                  membershipBilling === 'annual'
                    ? 'bg-[#BB8966] text-[#0b0a09]'
                    : 'text-white/55 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                Annual
              </button>
            </div>
            {membershipBilling === 'annual' ? (
              <p className="text-center font-display text-base tracking-[0.14em] text-[#BB8966] md:text-lg">
                2 Months Free
              </p>
            ) : null}
          </div>

          <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch md:gap-x-12 md:gap-y-0 md:overflow-visible lg:gap-x-16 xl:gap-x-20">
            {MEMBERSHIP_TIERS.map((tier, i) => {
              const prices =
                tier.billing.mode === 'toggle'
                  ? tier.billing[membershipBilling]
                  : {
                      priceMain: tier.billing.priceMain,
                      priceAlt: tier.billing.priceAlt,
                    };
              return (
                <motion.div
                key={tier.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="relative flex h-full min-h-0 flex-col md:overflow-visible"
              >
                <div
                  className={`flex h-full min-h-0 flex-1 flex-col border p-8 md:p-9 lg:p-10 ${tier.featured
                    ? 'border-[#BB8966] bg-[#1e1c18] border-r-0 border-l-0 border-b-3 border-t-3'
                    : 'border-white/[0.12] bg-[#141210]/70'
                    }`}
                >
                  {tier.badge !== undefined ? (
                    <p className="mb-4 text-right font-display text-[10px] uppercase tracking-[0.14em] text-[#BB8966] md:text-xs">{tier.badge}</p>
                  ) : (
                    <span className="mb-4 block h-[14px]" aria-hidden />
                  )}
                  <span className="font-display text-base leading-none tracking-wide text-[#BB8966] md:text-lg">{tier.index}</span>
                  <h3 className="mt-5 font-serif text-2xl tracking-tight text-white md:text-[1.65rem]">{tier.title}</h3>
                  <p className="mt-2 text-sm text-white/55">{tier.subtitle}</p>
                  <div className="mt-8 border-t border-white/10 pt-8">
                    <p className="font-serif text-2xl tracking-tight text-white md:text-5xl">
                      {prices.priceMain}
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/45">{prices.priceAlt}</p>
                  </div>
                  <ul className="mt-8 flex flex-1 flex-col gap-4">
                    {tier.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm leading-snug text-white/75">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#BB8966]" strokeWidth={2} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={openWaitlist}
                    className={`mt-10 inline-flex w-full items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-[0.22em] transition-colors ${tier.ctaVariant === 'solid'
                      ? 'rounded-md bg-[#BB8966] text-[#0A0A0A] hover:bg-[#A87856]'
                      : 'rounded-md border border-white/35 bg-transparent text-white hover:bg-white/[0.06]'
                      }`}
                  >
                    Join the waitlist <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
              );
            })}
          </div>

          <p className="mx-auto mt-14 max-w-3xl text-center text-[10px] uppercase tracking-[0.28em] text-white/45 md:mt-16 md:text-[11px]">
            Change plans or cancel anytime • 100% Lili’s method • 0% generic fitness
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 md:scroll-mt-28 py-32 md:py-44 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#BB8966] mb-6">Chapter 09 / FAQ</p>
            <h2 className="font-serif text-5xl md:text-6xl tracking-tight-brand">Frequently asked questions.</h2>
          </motion.div>
          <motion.div {...fadeUp} className="border-t border-black/10">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q} className="border-b border-black/10">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-7 text-left group transition-colors"
                  >
                    <span className="font-serif text-xl md:text-2xl group-hover:text-[#BB8966] transition-colors">
                      {f.q}
                    </span>
                    {isOpen ? (
                      <Minus className="w-5 h-5 shrink-0 text-[#BB8966]" strokeWidth={1.5} />
                    ) : (
                      <Plus className="w-5 h-5 shrink-0 text-black/50" strokeWidth={1.5} />
                    )}
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-8' : 'grid-rows-[0fr] opacity-0'
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-4 text-base text-black/60 leading-[1.8] max-w-2xl pr-8">
                        {f.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="join" className="py-40 md:py-56 px-6 md:px-10 bg-[#1A1714] text-[#F5F5F3]">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-5xl md:text-8xl leading-[0.95] tracking-tight-brand mb-10">
            Be first to train.
          </h2>
          <p className="text-lg opacity-75 max-w-lg mx-auto mb-12 leading-relaxed">
            Join early access and be the first to experience The Barbell Ballerina.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={openWaitlist} className="inline-flex items-center justify-center gap-3 bg-[#BB8966] text-[#0A0A0A] px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] rounded-md shadow-md hover:bg-[#c79475] hover:-translate-y-0.5 transition-all">
              Get early access <ArrowRight className="w-4 h-4" />
            </button>
            <a href="#method" className="inline-flex items-center justify-center gap-3 border border-white/20 text-white bg-transparent px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] rounded-md hover:border-[#BB8966] hover:text-[#BB8966] hover:-translate-y-0.5 transition-all">
              See how it works
            </a>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.25em] opacity-60">Strength that translates directly to your technique</p>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
