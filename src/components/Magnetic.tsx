import type { ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

export function Magnetic({ children, className = '' }: { children: ReactNode; className?: string }) {
  const magnetic = useMagnetic(0.25);

  return (
    <span
      ref={(el) => {
        magnetic.ref.current = el;
      }}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      style={magnetic.style}
      className={`inline-block ${className}`}
    >
      {children}
    </span>
  );
}
