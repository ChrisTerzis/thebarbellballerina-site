import { motion, AnimatePresence } from 'framer-motion';
import { X, Apple, Play } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DownloadAppModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // Simple inline SVG QR placeholder
  const qrCells = Array.from({ length: 21 * 21 }, (_, i) => {
    const x = i % 21;
    const y = Math.floor(i / 21);
    // Position squares (corners)
    const inCorner =
      (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
    if (inCorner) {
      const lx = x > 13 ? x - 14 : x;
      const ly = y > 13 ? y - 14 : y;
      const onEdge = lx === 0 || lx === 6 || ly === 0 || ly === 6;
      const inInner = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4;
      return onEdge || inInner;
    }
    // Pseudo-random pattern
    return ((x * 31 + y * 17 + x * y) % 3) === 0;
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="download-title"
            className="relative bg-[#F5F5F3] text-[#0A0A0A] w-full max-w-md rounded-2xl shadow-2xl p-8 md:p-10"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>

            <p className="text-[10px] uppercase tracking-[0.3em] text-[#BB8966] mb-4">The Barbell Ballerina</p>
            <h3 id="download-title" className="font-serif text-3xl md:text-4xl tracking-tight-brand mb-3">
              Start your training.
            </h3>
            <p className="text-sm text-black/60 leading-relaxed mb-8 max-w-sm">
              Download The Barbell Ballerina app to access your programs and begin training.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              <a
                href="#"
                className="group flex items-center gap-3 bg-[#0A0A0A] text-[#F5F5F3] rounded-xl px-5 py-3.5 hover:bg-black transition-all hover:-translate-y-0.5"
              >
                <Apple className="w-6 h-6" strokeWidth={1.5} />
                <div className="flex flex-col leading-tight text-left">
                  <span className="text-[9px] uppercase tracking-[0.2em] opacity-70">Download on the</span>
                  <span className="text-sm font-medium">App Store</span>
                </div>
              </a>
              <a
                href="#"
                className="group flex items-center gap-3 bg-[#0A0A0A] text-[#F5F5F3] rounded-xl px-5 py-3.5 hover:bg-black transition-all hover:-translate-y-0.5"
              >
                <Play className="w-6 h-6" strokeWidth={1.5} />
                <div className="flex flex-col leading-tight text-left">
                  <span className="text-[9px] uppercase tracking-[0.2em] opacity-70">Get it on</span>
                  <span className="text-sm font-medium">Google Play</span>
                </div>
              </a>
            </div>

            <div className="flex flex-col items-center pt-6 border-t border-black/10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/50 mb-4">Scan to download</p>
              <div className="bg-white p-3 rounded-lg border border-black/10">
                <svg viewBox="0 0 21 21" className="w-28 h-28" shapeRendering="crispEdges" aria-label="QR code">
                  {qrCells.map((on, i) => on ? (
                    <rect key={i} x={i % 21} y={Math.floor(i / 21)} width={1} height={1} fill="#0A0A0A" />
                  ) : null)}
                </svg>
              </div>
              <p className="text-xs text-black/50 mt-3">Open on your phone instantly</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-black/35 mt-4">Available on iOS & Android</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
