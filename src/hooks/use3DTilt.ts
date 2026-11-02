import { useCallback, useRef, useState } from 'react';

interface TiltOptions {
  /** Max rotation in degrees */
  max?: number;
  /** Scale applied on hover */
  scale?: number;
  /** How much translateZ "lift" the element gets on hover */
  lift?: number;
  disabled?: boolean;
}

export function use3DTilt<T extends HTMLElement = HTMLDivElement>(options: TiltOptions = {}) {
  const { max = 10, scale = 1.02, lift = 24, disabled = false } = options;
  const ref = useRef<T>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glare, setGlare] = useState<{ x: number; y: number; o: number }>({ x: 50, y: 50, o: 0 });

  const applyFromPoint = useCallback(
    (clientX: number, clientY: number, instant: boolean) => {
      if (disabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * max * 2;
      const rotateX = -(py - 0.5) * max * 2;

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${lift}px) scale(${scale})`,
        transition: instant ? 'transform 80ms linear' : 'transform 120ms linear',
      });
      setGlare({ x: px * 100, y: py * 100, o: 0.12 });
    },
    [disabled, max, lift, scale]
  );

  const reset = useCallback(() => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)',
      transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
    });
    setGlare((g) => ({ ...g, o: 0 }));
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => applyFromPoint(e.clientX, e.clientY, true),
    [applyFromPoint]
  );
  const onMouseLeave = useCallback(() => reset(), [reset]);

  const onTouchMove = useCallback(
    (e: React.TouchEvent<T>) => {
      const touch = e.touches[0];
      if (!touch) return;
      applyFromPoint(touch.clientX, touch.clientY, true);
    },
    [applyFromPoint]
  );
  const onTouchEnd = useCallback(() => reset(), [reset]);

  return { ref, style, glare, onMouseMove, onMouseLeave, onTouchMove, onTouchEnd };
}

