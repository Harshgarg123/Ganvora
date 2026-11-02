import { useState, type ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function FlipCard({ front, back, className = '', ariaLabel = 'Flip card' }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((f) => !f);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className={`perspective-1600 ${className}`}>
      <div
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-pressed={flipped}
        onClick={toggle}
        onKeyDown={onKeyDown}
        className="group relative h-full w-full cursor-pointer text-left"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${flipped ? 180 : 0}deg)`,
            transition: 'transform 650ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="flip-card-face relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
            {front}
            <span className="absolute bottom-4 right-4 flex h-7 w-7 items-center justify-center rounded-full border border-ink-100 bg-paper-50 text-ink-400 opacity-0 transition-opacity group-hover:opacity-100">
              <RotateCcw size={12} />
            </span>
          </div>
          <div
            className="flip-card-face absolute inset-0 h-full w-full"
            style={{ transform: 'rotateY(180deg)', transformStyle: 'preserve-3d' }}
          >
            {back}
          </div>
        </div>
      </div>
    </div>
  );
}
