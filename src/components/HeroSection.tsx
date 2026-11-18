import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowRight, Users } from 'lucide-react';
import BioVideoBackdrop from './BioVideoBackdrop';

type GasFocusMode = 'full' | 'co2' | 'o2';

const BUBBLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: 16 + ((i * 37) % 68),
  size: 4 + (i % 4) * 2.5,
  delay: (i * 0.35) % 4,
  duration: 3.4 + (i % 5) * 0.65,
}));

const ALGAE_CELLS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  cx: 18 + ((i * 29) % 64),
  cy: 18 + ((i * 41) % 66),
  r: 2 + (i % 3) * 1.1,
  duration: 4.5 + (i % 4),
}));

export default function HeroSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [chamberIlluminated, setChamberIlluminated] = useState(true);
  const [gasMode, setGasMode] = useState<GasFocusMode>('full');
  const [bgError, setBgError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -ny * 8, y: nx * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-[#143326] bg-[#050B09]"
    >
      {/* Photorealistic Lab Backdrop with Cinematic Slow Ken Burns Motion */}
      {!bgError && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <img
            src="/src/assets/images/hero_bioreactor_lab_1794930826127.jpg"
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setBgError(true)}
            className="animate-ken-burns h-full w-full object-cover opacity-35"
          />
        </div>
      )}

      {/* Measured Dark Gradient Scrim for Guaranteed WCAG AA Contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050B09]/95 via-[#050B09]/82 to-[#050B09]/65"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050B09] via-transparent to-[#050B09]/60"
      />

      {/* Real-time Living Fluid & Bubble Canvas Backdrop */}
      <BioVideoBackdrop intensity="hero" />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1200px] items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:py-16">
        {/* Left column: Typography, Interactive 3-Step Strip, & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <p className="text-xs font-medium tracking-wider text-[#39FF88]">
            Environmental Biotechnology · Vertical Photobioreactor Prototype
          </p>

          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-[#F4FFF8] sm:text-5xl lg:text-6xl">
            Algae Green
            <span className="mt-1 block text-[#39FF88]">Panel</span>
          </h1>

          <p className="mt-4 font-display text-xl font-medium text-[#F4FFF8]/90 sm:text-2xl">
            &ldquo;Turning Urban CO₂ into Cleaner Air&rdquo;
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#A0B3A8]">
            An innovative biotechnology and engineering concept exploring how
            microalgae can utilize carbon dioxide through photosynthesis while
            producing oxygen and valuable algal biomass.
          </p>

          {/* Interactive 3-Step Reactor Sync Strip */}
          <div className="mt-6 grid grid-cols-1 gap-2.5 rounded-xl border border-[#1B4231] bg-[#081510]/85 p-3 backdrop-blur-sm sm:grid-cols-3">
            <button
              type="button"
              onClick={() => setGasMode('co2')}
              className={`rounded-lg border p-3 text-left transition-colors ${
                gasMode === 'co2'
                  ? 'border-[#39FF88] bg-[#09251B]'
                  : 'border-transparent hover:border-[#1E4735]'
              }`}
            >
              <p className="font-mono text-[11px] text-[#39FF88]">01 · Air In</p>
              <p className="mt-0.5 text-xs font-medium text-[#F4FFF8]">
                CO₂-rich air enters the illuminated chamber
              </p>
            </button>
            <button
              type="button"
              onClick={() => {
                setGasMode('full');
                setChamberIlluminated(true);
              }}
              className={`rounded-lg border p-3 text-left transition-colors ${
                gasMode === 'full'
                  ? 'border-[#39FF88] bg-[#09251B]'
                  : 'border-transparent hover:border-[#1E4735]'
              }`}
            >
              <p className="font-mono text-[11px] text-[#39FF88]">02 · Algae Action</p>
              <p className="mt-0.5 text-xs font-medium text-[#F4FFF8]">
                Microalgae absorb CO₂ using light energy
              </p>
            </button>
            <button
              type="button"
              onClick={() => setGasMode('o2')}
              className={`rounded-lg border p-3 text-left transition-colors ${
                gasMode === 'o2'
                  ? 'border-[#39FF88] bg-[#09251B]'
                  : 'border-transparent hover:border-[#1E4735]'
              }`}
            >
              <p className="font-mono text-[11px] text-[#39FF88]">03 · Clean Output</p>
              <p className="mt-0.5 text-xs font-medium text-[#F4FFF8]">
                Oxygen gas &amp; algal biomass are produced
              </p>
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#how-it-works"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#39FF88] px-6 py-3 text-sm font-semibold text-[#050B09] transition-transform duration-150 hover:bg-[#00C878] active:scale-[0.98] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39FF88]"
            >
              <span>Explore the Technology</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#team"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#1E4735] bg-[#09251B]/75 px-6 py-3 text-sm font-semibold text-[#F4FFF8] backdrop-blur-sm transition-colors duration-150 hover:border-[#39FF88]/60 hover:bg-[#09251B] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39FF88]"
            >
              <Users className="h-4 w-4 text-[#39FF88]" />
              <span>Meet the Team</span>
            </a>
          </div>
        </motion.div>

        {/* Right column: Interactive 3D-Perspective Photobioreactor Showcase */}
        <motion.div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative flex flex-col items-center lg:col-span-6"
        >
          <div className="mb-4 flex w-full max-w-md flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#A0B3A8]">
            <div className="flex items-center gap-1 rounded-md border border-[#1C4332] bg-[#09251B]/85 p-0.5">
              {(['full', 'co2', 'o2'] as GasFocusMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setGasMode(mode)}
                  className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    gasMode === mode
                      ? 'bg-[#39FF88] text-[#050B09]'
                      : 'text-[#A0B3A8] hover:text-[#F4FFF8]'
                  }`}
                >
                  {mode === 'full' ? 'Full Cycle' : mode === 'co2' ? 'CO₂ In' : 'O₂ Out'}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setChamberIlluminated((prev) => !prev)}
              className="rounded-md border border-[#1C4332] bg-[#09251B]/85 px-3 py-1.5 text-xs font-medium text-[#F4FFF8] backdrop-blur-sm transition-colors hover:border-[#39FF88]/60"
            >
              {chamberIlluminated ? 'LED Grow Light: On' : 'LED Grow Light: Dim'}
            </button>
          </div>

          <div
            className="relative w-full max-w-[440px] transition-transform duration-200 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            {/* Transparent Photobioreactor Chamber */}
            <div className="relative mx-auto aspect-[4/4.3] w-full overflow-hidden rounded-xl border border-[#2C6B4F] bg-[#071510]/85 backdrop-blur-md shadow-[0_24px_80px_rgba(0,200,120,0.18)]">
              {/* Top LED Array + Light Rays */}
              <div
                className={`absolute inset-x-4 top-3 h-2.5 rounded-sm transition-opacity duration-300 ${
                  chamberIlluminated
                    ? 'bg-[#E9FFF2] shadow-[0_0_24px_rgba(57,255,136,0.75)] opacity-100'
                    : 'bg-[#1D3C2E] opacity-40'
                }`}
              />
              {chamberIlluminated && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-4 top-5 h-56 bg-gradient-to-b from-[#39FF88]/22 via-[#00C878]/8 to-transparent transition-opacity duration-300"
                />
              )}

              {/* Left Air Inlet (CO2) Port */}
              <div
                className={`absolute top-12 left-0 flex items-center gap-2 transition-opacity ${
                  gasMode === 'o2' ? 'opacity-40' : 'opacity-100'
                }`}
              >
                <div className="flex h-12 w-4 items-center justify-center rounded-r border border-l-0 border-[#2D5E47] bg-[#0A1E16]">
                  <span className="h-6 w-0.5 rounded-full bg-[#A0B3A8]" />
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#F4FFF8]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-300" />
                  <span>CO₂ In →</span>
                </div>
              </div>

              {/* Right Exhaust / O2 Outlet Port */}
              <div
                className={`absolute top-12 right-0 flex items-center gap-2 transition-opacity ${
                  gasMode === 'co2' ? 'opacity-40' : 'opacity-100'
                }`}
              >
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#39FF88]">
                  <span>→ O₂ Out</span>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#39FF88]" />
                </div>
                <div className="flex h-12 w-4 items-center justify-center rounded-l border border-r-0 border-[#2D5E47] bg-[#0A1E16]">
                  <span className="h-6 w-0.5 rounded-full bg-[#39FF88]" />
                </div>
              </div>

              {/* Liquid Microalgae Medium */}
              <div
                className={`absolute inset-x-3 top-20 bottom-16 overflow-hidden rounded-lg border border-[#39FF88]/25 transition-all duration-500 ${
                  chamberIlluminated
                    ? 'bg-gradient-to-b from-[#0C4C30]/85 via-[#073622]/90 to-[#042115]/95'
                    : 'bg-gradient-to-b from-[#07261A]/85 to-[#04140D]/95'
                }`}
              >
                {ALGAE_CELLS.map((cell) => (
                  <span
                    key={cell.id}
                    aria-hidden="true"
                    className="animate-float-slow absolute rounded-full bg-[#39FF88]/70"
                    style={{
                      left: `${cell.cx}%`,
                      top: `${cell.cy}%`,
                      width: `${cell.r * 2}px`,
                      height: `${cell.r * 2}px`,
                      animationDuration: `${cell.duration}s`,
                    }}
                  />
                ))}

                {/* Diffuser Air Stone */}
                <div className="absolute bottom-2 left-1/2 h-3.5 w-16 -translate-x-1/2 rounded-sm border border-[#2D5E47] bg-[#10261D]" />

                {BUBBLES.map((bubble) => (
                  <span
                    key={bubble.id}
                    aria-hidden="true"
                    className="animate-rise-bubble absolute bottom-5 rounded-full border border-[#F4FFF8]/45 bg-[#39FF88]/25"
                    style={{
                      left: `${bubble.left}%`,
                      width: `${bubble.size}px`,
                      height: `${bubble.size}px`,
                      animationDelay: `${bubble.delay}s`,
                      animationDuration: `${bubble.duration}s`,
                    }}
                  />
                ))}
              </div>

              {/* Electronic Base Housing */}
              <div className="absolute inset-x-0 bottom-0 flex h-16 items-center justify-between border-t border-[#1D4031] bg-[#08120E] px-5">
                <div className="flex items-center gap-3">
                  <div className="rounded border border-[#1B3A2C] bg-[#050B09] px-2.5 py-1 font-mono text-[11px] text-[#39FF88]">
                    O₂ Sensor
                  </div>
                  <div className="rounded border border-[#1B3A2C] bg-[#050B09] px-2.5 py-1 font-mono text-[11px] text-[#A0B3A8]">
                    CO₂ Sensor
                  </div>
                </div>
                <div className="font-mono text-[11px] text-[#A0B3A8]">
                  Prototype Unit · 13 cm
                </div>
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-[#A0B3A8]">
              Interactive conceptual preview · Move cursor across reactor for 3D perspective
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative flex justify-center pb-6">
        <a
          href="#overview"
          aria-label="Scroll to Project Overview"
          className="inline-flex flex-col items-center gap-1.5 text-xs text-[#A0B3A8] transition-colors hover:text-[#39FF88]"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
