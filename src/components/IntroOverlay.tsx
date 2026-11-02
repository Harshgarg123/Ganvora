import { useEffect, useState } from 'react';
import { GemMark } from '@/components/GemMark';

const SESSION_KEY = 'ganvora-intro-shown';

export function IntroOverlay() {
  const [phase, setPhase] = useState<'hidden' | 'showing' | 'leaving'>('hidden');

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadyShown = typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY);

    if (prefersReduced || alreadyShown) return;

    sessionStorage.setItem(SESSION_KEY, '1');
    setPhase('showing');
    document.body.style.overflow = 'hidden';

    const leaveTimer = setTimeout(() => setPhase('leaving'), 1500);
    const doneTimer = setTimeout(() => {
      setPhase('hidden');
      document.body.style.overflow = '';
    }, 2200);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = '';
    };
  }, []);

  const skip = () => {
    setPhase('leaving');
    setTimeout(() => {
      setPhase('hidden');
      document.body.style.overflow = '';
    }, 700);
  };

  if (phase === 'hidden') return null;

  return (
    <div
      onClick={skip}
      className={`fixed inset-0 z-[300] flex flex-col items-center justify-center gap-6 bg-paper transition-opacity duration-700 ${
        phase === 'leaving' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className={`transition-all duration-700 ${phase === 'leaving' ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
        <GemMark size={140} interactive={false} spinSpeed={0.16} />
      </div>
      <p className="font-display text-xl font-500 tracking-[0.08em] text-ink animate-fade-in" style={{ animationDelay: '0.3s' }}>
        GANVORA
      </p>
      <p className="text-xs text-ink-400 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        Tap to skip
      </p>
    </div>
  );
}
