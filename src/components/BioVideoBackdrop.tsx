import { useEffect, useRef } from 'react';

interface BioVideoBackdropProps {
  intensity?: 'hero' | 'subtle';
  className?: string;
}

export default function BioVideoBackdrop({
  intensity = 'hero',
  className = '',
}: BioVideoBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = (canvas.width = canvas.offsetWidth || 1200);
    let height = (canvas.height = canvas.offsetHeight || 720);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 1200;
      height = canvas.height = canvas.offsetHeight || 720;
    };

    window.addEventListener('resize', handleResize);

    const bubbleCount = intensity === 'hero' ? 42 : 24;
    const sporeCount = intensity === 'hero' ? 28 : 18;

    const bubbles = Array.from({ length: bubbleCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.5 + (i % 5) * 1.4,
      speedY: 0.45 + (i % 6) * 0.22,
      swayPhase: i * 0.7,
      alpha: 0.16 + (i % 4) * 0.1,
    }));

    const spores = Array.from({ length: sporeCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.3,
      r: 1.8 + (i % 3) * 1.2,
      glow: 0.25 + (i % 4) * 0.12,
    }));

    let time = 0;
    let rafId = 0;

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.014;

      // Volumetric emerald caustic light beams
      const rayCount = 4;
      for (let i = 0; i < rayCount; i++) {
        const baseX = width * (0.2 + i * 0.22) + Math.sin(time * 0.6 + i) * 35;
        const grad = ctx.createLinearGradient(baseX, 0, baseX + 90, height);
        grad.addColorStop(0, 'rgba(57, 255, 136, 0.06)');
        grad.addColorStop(0.55, 'rgba(0, 200, 120, 0.025)');
        grad.addColorStop(1, 'rgba(5, 11, 9, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(baseX - 50, 0);
        ctx.lineTo(baseX + 70, 0);
        ctx.lineTo(baseX + 210, height);
        ctx.lineTo(baseX - 10, height);
        ctx.closePath();
        ctx.fill();
      }

      // Drifting microalgae plankton particles
      for (const s of spores) {
        if (!prefersReduced) {
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < -10) s.x = width + 10;
          if (s.x > width + 10) s.x = -10;
          if (s.y < -10) s.y = height + 10;
          if (s.y > height + 10) s.y = -10;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57, 255, 136, ${s.glow})`;
        ctx.fill();
      }

      // Rising specular oxygen micro-bubbles
      for (const b of bubbles) {
        if (!prefersReduced) {
          b.y -= b.speedY;
          b.x += Math.sin(time + b.swayPhase) * 0.25;
          if (b.y < -20) {
            b.y = height + 20;
            b.x = Math.random() * width;
          }
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(244, 255, 248, ${b.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.28, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57, 255, 136, ${b.alpha + 0.15})`;
        ctx.fill();
      }

      if (!prefersReduced) {
        rafId = requestAnimationFrame(drawFrame);
      }
    };

    drawFrame();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
