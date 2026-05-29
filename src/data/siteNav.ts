import type { To } from 'react-router-dom';

/** Section anchors on the home page (fixed header offset via scroll-margin on each `<section>`). */
export const SITE_NAV: readonly { label: string; to: To }[] = [
  { label: 'Method', to: { pathname: '/', hash: '#method' } },
  { label: 'App', to: { pathname: '/', hash: '#app' } },
  { label: 'Results', to: { pathname: '/', hash: '#results' } },
  { label: 'About', to: { pathname: '/', hash: '#about' } },
  { label: 'FAQ', to: { pathname: '/', hash: '#faq' } },
];

export const FOOTER_LEGAL: { label: string; to: To }[] = [
  { label: 'Terms & Conditions', to: '/terms-and-conditions' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Disclaimers', to: '/disclaimers' },
];
