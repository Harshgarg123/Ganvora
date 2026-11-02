import { useCallback, useRef, useState } from 'react';

export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const isFinePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isFinePointer || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      setStyle({ transform: `translate(${x}px, ${y}px)`, transition: 'transform 100ms linear' });
    },
    [isFinePointer, strength]
  );

  const onMouseLeave = useCallback(() => {
    setStyle({ transform: 'translate(0px, 0px)', transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)' });
  }, []);

  return { ref, style, onMouseMove, onMouseLeave };
}
