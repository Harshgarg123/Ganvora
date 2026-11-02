import { useEffect, useRef, useState } from 'react';

interface GemMarkProps {
  size?: number;
  className?: string;
  interactive?: boolean;
  spinSpeed?: number;
  /** Extra Y-rotation in degrees, e.g. driven by scroll progress */
  extraRotateY?: number;
  /** Soft ambient shadow beneath the gem — auto-disabled for small marks */
  shadow?: boolean;
}

// Six faces, each a distinct tone from the palette. Each is rendered as a
// gradient (not a flat fill) so the solid reads as cut, lit material rather
// than a plain colored box.
const FACE_DEFS: { h: number; s: number; l: number }[] = [
  { h: 150, s: 26, l: 30 }, // front — forest
  { h: 150, s: 22, l: 14 }, // back
  { h: 150, s: 24, l: 38 }, // right
  { h: 0, s: 0, l: 8 },      // left — ink
  { h: 150, s: 20, l: 46 }, // top
  { h: 355, s: 45, l: 32 }, // bottom — oxblood accent
];

function faceGradient({ h, s, l }: { h: number; s: number; l: number }) {
  const light = Math.min(l + 18, 94);
  const dark = Math.max(l - 16, 3);
  return `linear-gradient(135deg, hsl(${h} ${s}% ${light}%) 0%, hsl(${h} ${s}% ${l}%) 55%, hsl(${h} ${s}% ${dark}%) 100%)`;
}

export function GemMark({
  size = 220,
  className = '',
  interactive = true,
  spinSpeed = 0.014,
  extraRotateY = 0,
  shadow = true,
}: GemMarkProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spin, setSpin] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = t - last;
      last = t;
      setSpin((s) => (s + dt * spinSpeed) % 360);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [spinSpeed]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 22, y: px * 26 });
  };
  const onMouseLeave = () => setTilt({ x: 0, y: 0 });

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!interactive || !wrapRef.current) return;
    const touch = e.touches[0];
    if (!touch) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const px = (touch.clientX - rect.left) / rect.width - 0.5;
    const py = (touch.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 22, y: px * 26 });
  };
  const onTouchEnd = () => setTilt({ x: 0, y: 0 });

  // A cube inscribed in the container, rotated 45° on two axes so it reads
  // as a faceted gem/diamond rather than a plain box.
  const edge = size * 0.56;
  const half = edge / 2;

  const faceTransforms = [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];

  const showShadow = shadow && size >= 120;

  const cubeGroup = (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: edge,
        height: edge,
        marginLeft: -half,
        marginTop: -half,
        transformStyle: 'preserve-3d',
        transform: `rotateZ(45deg) rotateX(${35 + tilt.x}deg) rotateY(${45 + spin + tilt.y + extraRotateY}deg)`,
        transition: 'transform 140ms linear',
      }}
    >
      {faceTransforms.map((t, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            background: faceGradient(FACE_DEFS[i]),
            transform: t,
            transformStyle: 'preserve-3d',
            boxShadow:
              'inset 0 1px 0 hsl(0 0% 100% / 0.22), inset 0 0 22px hsl(0 0% 0% / 0.22), inset 0 0 0 1px hsl(0 0% 0% / 0.12)',
          }}
        >
          <div
            aria-hidden
            className="gem-shine"
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '-20%',
              width: '55%',
              background: 'linear-gradient(115deg, transparent, hsl(0 0% 100% / 0.32), transparent)',
              animationDelay: `${i * 0.35}s`,
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      className={`relative select-none touch-pan-y ${className}`}
      style={{ width: size, height: size, perspective: size * 3.2 }}
    >
      {showShadow && (
        <div
          aria-hidden
          className="absolute left-1/2 rounded-full blur-xl"
          style={{
            bottom: size * 0.02,
            width: edge * 1.15,
            height: edge * 0.22,
            marginLeft: -(edge * 1.15) / 2,
            background: 'radial-gradient(ellipse, hsl(0 0% 0% / 0.28), transparent 72%)',
          }}
        />
      )}
      {showShadow && (
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2"
          style={{
            width: edge,
            height: edge,
            marginLeft: -half,
            marginTop: half * 0.1,
            transformStyle: 'preserve-3d',
            transform: 'scaleY(-1)',
            opacity: 0.38,
            maskImage: 'linear-gradient(to bottom, hsl(0 0% 0%) 0%, hsl(0 0% 0% / 0.5) 35%, transparent 75%)',
            WebkitMaskImage: 'linear-gradient(to bottom, hsl(0 0% 0%) 0%, hsl(0 0% 0% / 0.5) 35%, transparent 75%)',
          }}
        >
          {cubeGroup}
        </div>
      )}
      {cubeGroup}
    </div>
  );
}

