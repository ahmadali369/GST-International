import { useRef, useState, type CSSProperties, type ReactNode } from "react";

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** max rotation in degrees */
  max?: number;
  /** lift on hover in px */
  lift?: number;
  glare?: boolean;
  style?: CSSProperties;
};

/**
 * Mouse-tracking 3D tilt wrapper with a moving specular glare.
 * Purely presentational — wrap any card with it.
 */
export function Tilt({ children, className = "", max = 10, lift = 10, glare = true, style }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({
      rx: (0.5 - py) * max * 2,
      ry: (px - 0.5) * max * 2,
      gx: px * 100,
      gy: py * 100,
      active: true,
    });
  };

  const onLeave = () => setT({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  return (
    <div className="tilt-perspective" style={style}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`tilt-inner ${t.active ? "tilt-active" : ""} ${className}`}
        style={{
          transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateZ(0) translateY(${t.active ? -lift : 0}px)`,
        }}
      >
        {children}
        {glare && (
          <span
            aria-hidden
            className="tilt-glare"
            style={{
              opacity: t.active ? 1 : 0,
              background: `radial-gradient(420px circle at ${t.gx}% ${t.gy}%, oklch(1 0 0 / 0.16), transparent 60%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}
