import type { ReactNode } from 'react';
import { use3DTilt } from '@/hooks/use3DTilt';

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  max?: number;
  lift?: number;
  scale?: number;
  glare?: boolean;
  as?: 'div';
}

export function Tilt3D({ children, className = '', max = 8, lift = 16, scale = 1.015, glare = true }: Tilt3DProps) {
  const tilt = use3DTilt<HTMLDivElement>({ max, lift, scale });

  return (
    <div
      className={`tilt-3d-wrap touch-pan-y ${className}`}
      style={{ perspective: '1000px' }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      onTouchMove={tilt.onTouchMove}
      onTouchEnd={tilt.onTouchEnd}
      onTouchCancel={tilt.onTouchEnd}
    >
      <div
        ref={tilt.ref}
        style={{ transformStyle: 'preserve-3d', ...tilt.style }}
        className="relative h-full transition-transform active:scale-[0.985]"
      >
        {children}
        {glare && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
            style={{
              opacity: tilt.glare.o,
              background: `radial-gradient(circle at ${tilt.glare.x}% ${tilt.glare.y}%, hsl(40 30% 100% / 0.8), transparent 55%)`,
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </div>
    </div>
  );
}
