import { Instagram, Youtube } from 'lucide-react';

// Consistent outline social icons (1.75 stroke), used in footer.
// Spotify, TikTok are custom SVGs to match Lucide's outline style.

const STROKE = 1.75;

const Spotify = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={STROKE}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M7 10c3.5-1 7.5-.7 10.5 1" />
    <path d="M7.5 13.2c2.8-.8 6-.6 8.5 1" />
    <path d="M8 16.2c2.2-.6 4.7-.5 6.7.7" />
  </svg>
);

const TikTok = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={STROKE}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
    <path d="M14 4c.3 2.4 2 4.2 4.5 4.5" />
  </svg>
);

const LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/the.barbell.ballerina/?hl=en',
    Icon: ({ className }: { className?: string }) => (
      <Instagram className={className} strokeWidth={STROKE} />
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@the.barbell.ballerina',
    iconClassName: 'w-6 h-6',
    Icon: ({ className }: { className?: string }) => (
      <Youtube className={className} strokeWidth={STROKE} />
    ),
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/show/3JAFEGOMLC3YGqEIqRPbnm',
    Icon: Spotify,
  },
  {
    label: 'TikTok',
    href: ' https://www.tiktok.com/@the.barbell.ballerinaa',
    Icon: TikTok,
  },
];

export default function SocialIcons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 md:gap-5 ${className}`}>
      {LINKS.map(({ label, href, Icon, iconClassName = 'w-5 h-5' }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-[#EAE6E1]/80 hover:text-[#BB8966] hover:-translate-y-0.5 hover:scale-110 transition-all duration-200 ease-out"
        >
          <Icon className={iconClassName} />
        </a>
      ))}
    </div>
  );
}
