import { Link } from 'react-router-dom';
import SocialIcons from '@/components/SocialIcons';
import { FOOTER_LEGAL, SITE_NAV } from '@/data/siteNav';
import logoWhite from '@/assets/logo-footer.png';

export default function SiteFooter() {
  return (
    <footer className="bg-[#0A0A0A] text-[#F5F5F3]/70 py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div>
          <img src={logoWhite} alt="The Barbell Ballerina" className="h-12 w-auto object-contain mb-3" />
          <p className="text-xs uppercase tracking-[0.2em] opacity-60">Strength training for ballet performance</p>
        </div>
        <nav className="flex flex-wrap gap-8 text-xs uppercase tracking-[0.2em]">
          {SITE_NAV.map((n) => (
            <Link key={n.label} to={n.to} className="hover:text-[#BB8966] transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>
        <SocialIcons />
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-[10px] uppercase tracking-[0.25em]">
        <p className="opacity-40">© 2026 The Barbell Ballerina. All rights reserved.</p>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 opacity-50 md:opacity-40">
          {FOOTER_LEGAL.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="hover:text-[#BB8966] hover:opacity-100 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
