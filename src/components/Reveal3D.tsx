import type { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Reveal3DProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}

export function Reveal3D({ children, className = '', delay = 0, direction = 'up' }: Reveal3DProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const hiddenTransform =
    direction === 'left'
      ? 'perspective(1200px) rotateY(-18deg) translateX(-30px) translateZ(-60px)'
      : direction === 'right'
        ? 'perspective(1200px) rotateY(18deg) translateX(30px) translateZ(-60px)'
        : 'perspective(1200px) rotateX(14deg) translateY(24px) translateZ(-60px)';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'perspective(1200px) rotateX(0deg) rotateY(0deg) translate(0,0) translateZ(0)' : hiddenTransform,
        transition: `opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
