import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { X, Check } from 'lucide-react';
import { apiFetch } from '@/lib/api';

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSubmitted(false);
        setFirstName('');
        setEmail('');
        setSubmitting(false);
      }, 300);
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = firstName.trim();
    const trimmed = email.trim().toLowerCase();
    if (!trimmedName) {
      toast.error('Please enter your first name');
      return;
    }
    if (!trimmed) {
      toast.error('Please enter your email');
      return;
    }
    setSubmitting(true);
    try {
      const res = await apiFetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: trimmedName, email: trimmed }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(err.message ?? 'Could not join the list');
      }
      setSubmitted(true);
    } catch (err) {
      const message =
        err instanceof TypeError
          ? 'Could not reach the server. Run npm run server alongside npm run dev.'
          : err instanceof Error
            ? err.message
            : 'Could not join the list';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-[#F5F5F3] text-[#0A0A0A] rounded-lg shadow-2xl p-8 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!submitted ? (
              <>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#BB8966] mb-4">Early Access</p>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight mb-3">Be first to train</h3>
                <p className="text-sm text-black/60 leading-relaxed mb-8">
                  Join early access and be the first to experience The Barbell Ballerina.
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    name="first_name"
                    autoComplete="given-name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full px-4 py-3.5 bg-white border border-black/10 rounded-md text-sm placeholder:text-black/30 focus:outline-none focus:border-[#BB8966] transition-colors"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3.5 bg-white border border-black/10 rounded-md text-sm placeholder:text-black/30 focus:outline-none focus:border-[#BB8966] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center bg-[#0A0A0A] text-[#F5F5F3] py-3.5 text-xs uppercase tracking-[0.25em] rounded-md hover:bg-[#BB8966] transition-colors disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {submitting ? 'Joining…' : 'Get early access'}
                  </button>
                </form>
                <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-black/40 text-center">
                  No spam. Just early access.
                </p>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-[#BB8966]/15 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-6 h-6 text-[#BB8966]" strokeWidth={1.75} />
                </div>
                <h3 className="font-serif text-3xl mb-3">You’re on the list</h3>
                <p className="text-sm text-black/60 leading-relaxed max-w-xs mx-auto">
                  We’ll be in touch as soon as access opens. Train with intention.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
