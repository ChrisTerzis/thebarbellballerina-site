import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------------------------------------------------------------------
// Data — source: TheBarbellBallerina_GeoLocationAllPlatforms_all-time
// Values are % of total social/podcast reach
// ---------------------------------------------------------------------------
const COUNTRY_DATA: Record<string, number> = {
  'United States of America': 46.6031,
  'United Kingdom': 8.3146,
  Canada: 6.2028,
  Australia: 5.9691,
  Germany: 5.7263,
  Spain: 2.8128,
  France: 1.5072,
  Greece: 1.4430,
  Finland: 1.2277,
  Poland: 1.1636,
  Switzerland: 1.1224,
  Belgium: 1.0995,
  Mexico: 1.0582,
  Sweden: 1.0445,
  Czechia: 1.0124,
  Norway: 0.9620,
  Austria: 0.8704,
  'South Africa': 0.7925,
  Portugal: 0.7742,
  Netherlands: 1.1544,
  Italy: 0.6505,
  'Saudi Arabia': 0.6001,
  Denmark: 0.5314,
  Ireland: 0.4352,
  India: 0.4169,
  'New Zealand': 0.4077,
  Latvia: 0.3940,
  Luxembourg: 0.3390,
  Singapore: 0.3298,
  Japan: 0.3115,
  Brazil: 0.2611,
  Philippines: 0.2291,
  Hungary: 0.2199,
  Israel: 0.2199,
  Croatia: 0.2153,
  Argentina: 0.2061,
  Slovakia: 0.1878,
  Bolivia: 0.1741,
  Chile: 0.1695,
  Bahamas: 0.1695,
  Taiwan: 0.1649,
  Slovenia: 0.1649,
  Panama: 0.1420,
  Bulgaria: 0.1374,
  Mongolia: 0.1374,
  Indonesia: 0.1329,
  Guatemala: 0.1054,
  Colombia: 0.1008,
  Turkey: 0.0916,
  'Puerto Rico': 0.0779,
  Iceland: 0.0779,
  Malta: 0.0779,
  Romania: 0.0641,
  Russia: 0.0596,
  Libya: 0.0596,
  Cyprus: 0.0596,
  Vietnam: 0.0504,
  Estonia: 0.0504,
  Tunisia: 0.0458,
  'Dominican Republic': 0.0366,
  'United Arab Emirates': 0.0366,
  Malaysia: 0.0321,
  'Costa Rica': 0.0321,
  Ukraine: 0.0321,
  Pakistan: 0.0321,
  'South Korea': 0.0275,
  Egypt: 0.0275,
  Algeria: 0.0275,
  Lithuania: 0.0321,
  Serbia: 0.0275,
  Paraguay: 0.0229,
  Honduras: 0.0229,
  Peru: 0.0183,
  Ecuador: 0.0183,
  Namibia: 0.0183,
  Jamaica: 0.0183,
  'El Salvador': 0.0137,
  Thailand: 0.0137,
  Armenia: 0.0137,
  Morocco: 0.0092,
  Nigeria: 0.0046,
  Ghana: 0.0046,
  Angola: 0.0046,
  Venezuela: 0.0046,
  Greenland: 0.0046,
  'Sri Lanka': 0.0046,
  Lebanon: 0.0046,
  Gambia: 0.0046,
  'Trinidad and Tobago': 0.0092,
};

// Alternate names from different GeoJSON sources → canonical COUNTRY_DATA key
const NAME_ALIASES: Record<string, string> = {
  'USA': 'United States of America',
  'United States': 'United States of America',
  'US': 'United States of America',
  'UK': 'United Kingdom',
  'Great Britain': 'United Kingdom',
  'England': 'United Kingdom',
  'UAE': 'United Arab Emirates',
  'Republic of Korea': 'South Korea',
  'Korea, Republic of': 'South Korea',
  'Korea': 'South Korea',
  'Viet Nam': 'Vietnam',
  'Czech Republic': 'Czechia',
  'Slovak Republic': 'Slovakia',
  'Türkiye': 'Turkey',
  'Chinese Taipei': 'Taiwan',
  'Taiwan, Province of China': 'Taiwan',
  'Bolivia (Plurinational State of)': 'Bolivia',
  'Venezuela, Bolivarian Republic of': 'Venezuela',
  'Trinidad and Tobago': 'Trinidad and Tobago',
  'Dominican Republic': 'Dominican Republic',
};

function resolveCountryName(raw: string): string {
  return NAME_ALIASES[raw] ?? raw;
}

const BUCKETS = [
  { max: 0.05,     color: '#F2DDBE' },
  { max: 0.2,      color: '#E2BE8E' },
  { max: 0.5,      color: '#CC9A65' },
  { max: 1.5,      color: '#B07A45' },
  { max: 5,        color: '#8E5A2E' },
  { max: 15,       color: '#6B3E1C' },
  { max: Infinity, color: '#4A2810' },
];
const NO_DATA = '#2C2218';

function colorFor(count: number): string {
  if (count <= 0) return NO_DATA;
  for (const b of BUCKETS) if (count <= b.max) return b.color;
  return BUCKETS[BUCKETS.length - 1].color;
}

const STATS = [
  { value: '100+',    label: 'Countries reached' },
  { value: '65,000+', label: 'Social reach' },
  { value: '6',       label: 'Continents' },
];

// ---------------------------------------------------------------------------
// Projection helpers
// ---------------------------------------------------------------------------
const MAP_W = 960;
const MAP_H = 480;

function project(lng: number, lat: number): [number, number] {
  return [
    ((lng + 180) / 360) * MAP_W,
    ((90 - lat) / 180) * MAP_H,
  ];
}

function ringsToPath(rings: number[][][]): string {
  return rings
    .map(ring => {
      const pts = ring.map(([lng, lat]) => {
        const [x, y] = project(lng, lat);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      });
      return `M${pts.join('L')}Z`;
    })
    .join(' ');
}

// ---------------------------------------------------------------------------
// GeoJSON types (minimal)
// ---------------------------------------------------------------------------
interface GeoFeature {
  type: 'Feature';
  properties: { name?: string; NAME?: string; ADMIN?: string } & Record<string, unknown>;
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  } | null;
}

function featureName(f: GeoFeature): string {
  return (
    (f.properties.name as string) ??
    (f.properties.NAME as string) ??
    (f.properties.ADMIN as string) ??
    ''
  );
}

function featurePath(f: GeoFeature): string {
  if (!f.geometry) return '';
  if (f.geometry.type === 'Polygon') {
    return ringsToPath(f.geometry.coordinates as number[][][]);
  }
  if (f.geometry.type === 'MultiPolygon') {
    return (f.geometry.coordinates as number[][][][])
      .map(ringsToPath)
      .join(' ');
  }
  return '';
}

// ---------------------------------------------------------------------------
// Tooltip type
// ---------------------------------------------------------------------------
type Tip = { x: number; y: number; name: string; count: number } | null;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface Props {
  open: boolean;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function CommunityMapModal({ open, onClose }: Props) {
  const [features, setFeatures] = useState<GeoFeature[]>([]);
  const [loading, setLoading] = useState(false);
  const [tip, setTip] = useState<Tip>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Keyboard close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // Fetch GeoJSON once when modal first opens
  const fetchGeo = useCallback(async () => {
    if (features.length > 0) return;
    setLoading(true);
    try {
      const res = await fetch(
        'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson',
      );
      const json = await res.json() as { features: GeoFeature[] };
      setFeatures(json.features.filter(f => f.geometry !== null));
    } catch {
      // silently fail — map stays empty
    } finally {
      setLoading(false);
    }
  }, [features.length]);

  useEffect(() => {
    if (open) fetchGeo();
  }, [open, fetchGeo]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl max-h-[80vh] rounded-lg overflow-y-scroll shadow-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ backgroundColor: '#0A0A0A' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="px-8 pt-10 pb-8 md:px-12 md:pt-12">
              {/* Header */}
              <div className="text-center mb-8">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#BB8966] mb-4">
                  The Global Studio
                </p>
                <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-white leading-tight">
                  TBB around <span className="italic font-light">the world.</span>
                </h2>
                <p className="mt-4 text-white/55 text-sm leading-relaxed max-w-lg mx-auto">
                  Ballet athletes across the globe are connecting with TBB, building strength,
                  and redefining what dancers are capable of.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 max-w-xl mx-auto mb-8 border-y border-[#BB8966]/15 divide-x divide-[#BB8966]/15">
                {STATS.map(s => (
                  <div key={s.label} className="px-3 py-5 text-center">
                    <div className="font-serif text-2xl md:text-3xl text-[#E8D7BD]">{s.value}</div>
                    <div className="mt-1 text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-white/40">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="relative w-full">
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 animate-pulse">
                      Loading map…
                    </span>
                  </div>
                )}
                <svg
                  viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                >
                  {features.map((f, i) => {
                    const rawName = featureName(f);
                    const name = resolveCountryName(rawName);
                    const count = COUNTRY_DATA[name] ?? 0;
                    const isHovered = hoveredIdx === i && count > 0;
                    const fill = colorFor(count);
                    const d = featurePath(f);
                    if (!d) return null;
                    return (
                      <path
                        key={i}
                        d={d}
                        fill={fill}
                        stroke={count > 0 ? 'rgba(20,14,10,0.85)' : 'rgba(187,137,102,0.15)'}
                        strokeWidth={count > 0 ? 0.6 : 0.45}
                        style={{
                          cursor: count > 0 ? 'pointer' : 'default',
                          transformBox: 'fill-box',
                          transformOrigin: 'center',
                          transform: isHovered ? 'scale(1.12)' : 'scale(1)',
                          transition: 'transform 0.2s ease, filter 0.2s ease',
                          filter: isHovered
                            ? 'drop-shadow(0 0 8px rgba(187,137,102,0.6))'
                            : count > 0
                            ? 'drop-shadow(0 0 4px rgba(187,137,102,0.2))'
                            : 'none',
                        }}
                        onMouseEnter={e => { setHoveredIdx(i); setTip({ x: e.clientX, y: e.clientY, name: rawName, count }); }}
                        onMouseMove={e => setTip(t => t ? { ...t, x: e.clientX, y: e.clientY } : t)}
                        onMouseLeave={() => { setHoveredIdx(null); setTip(null); }}
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[9px] md:text-[10px] uppercase tracking-[0.28em] text-white/50">
                <span className="text-[#BB8966]">Global Reach</span>
                <div className="flex items-center gap-2">
                  <span className="text-white/30 normal-case tracking-normal">fewer</span>
                  <div className="flex">
                    {BUCKETS.map(b => (
                      <span
                        key={b.color}
                        className="w-6 h-2.5 inline-block"
                        style={{ backgroundColor: b.color }}
                      />
                    ))}
                  </div>
                  <span className="text-white/30 normal-case tracking-normal">more</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-6 h-2.5 inline-block border border-[#BB8966]/15"
                    style={{ backgroundColor: NO_DATA }}
                  />
                  <span className="text-white/30 normal-case tracking-normal">no data</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tooltip — rendered outside the modal div so it's not clipped */}
          {tip && (
            <div
              className="pointer-events-none fixed z-[200] px-4 py-3 bg-[#0E0B09]/95 border border-[#BB8966]/25 text-[#F2E9DC] shadow-2xl backdrop-blur-sm"
              style={{ left: tip.x + 14, top: tip.y + 14 }}
            >
              <div className="font-serif text-sm">{tip.name}</div>
              <div className="text-[#BB8966] uppercase tracking-[0.25em] text-[10px] mt-1">
                {tip.count > 0
                  ? `${tip.count < 0.01 ? '<0.01' : tip.count.toFixed(2)}% of reach`
                  : 'No data yet'}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
