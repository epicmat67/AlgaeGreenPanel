import { useEffect, useRef, useState } from 'react';
import { Microscope, Camera, Download, Sparkles } from 'lucide-react';

type Magnification = 100 | 400 | 1000;
type IlluminationMode = 'brightfield' | 'fluorescence';
type SpecimenView = 'live' | 'macro';

interface OrganelleInfo {
  id: string;
  label: string;
  role: string;
  xPercent: number;
  yPercent: number;
}

const ORGANELLES: OrganelleInfo[] = [
  {
    id: 'chloroplast',
    label: 'Cup-Shaped Chloroplast',
    role: 'Houses chlorophyll pigments that absorb light energy to drive CO₂ fixation and oxygen release.',
    xPercent: 46,
    yPercent: 48,
  },
  {
    id: 'pyrenoid',
    label: 'Pyrenoid Matrix',
    role: 'Concentrates RuBisCO enzymes inside the chloroplast to accelerate inorganic carbon conversion.',
    xPercent: 56,
    yPercent: 56,
  },
  {
    id: 'cellwall',
    label: 'Cell Wall Membrane',
    role: 'Permits dissolved CO₂ and mineral nutrients to diffuse inward while releasing O₂ to surrounding water.',
    xPercent: 34,
    yPercent: 38,
  },
  {
    id: 'vacuole',
    label: 'Gas & Nutrient Vacuole',
    role: 'Helps regulate buoyancy and store metabolic compounds produced during active illumination.',
    xPercent: 64,
    yPercent: 36,
  },
];

const MICROALGAE_FACTS = [
  {
    title: 'What Are Microalgae?',
    body: 'Microscopic photosynthetic organisms that thrive in suitable water, nutrient, and light conditions without needing arable land.',
  },
  {
    title: 'Photosynthesis',
    body: 'They capture photons using chlorophyll to convert dissolved carbon dioxide and water into organic matter.',
  },
  {
    title: 'CO₂ Utilisation',
    body: 'Carbon dioxide dissolved in the culture water serves directly as the inorganic carbon source for cell growth.',
  },
  {
    title: 'Oxygen & Biomass',
    body: 'Oxygen gas is released as bubbles while growing microalgae generate organic biomass for laboratory observation.',
  },
];

export default function MicroalgaeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [magnification, setMagnification] = useState<Magnification>(400);
  const [mode, setMode] = useState<IlluminationMode>('fluorescence');
  const [specimenView, setSpecimenView] = useState<SpecimenView>('live');
  const [cellDivision, setCellDivision] = useState<boolean>(false);
  const [macroError, setMacroError] = useState(false);
  const [selectedOrganelle, setSelectedOrganelle] = useState<OrganelleInfo>(
    ORGANELLES[0]
  );

  useEffect(() => {
    if (specimenView !== 'live') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = 520;
    const height = 380;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const scaleFactor =
      magnification === 100 ? 0.65 : magnification === 400 ? 1 : 1.55;

    const count = cellDivision ? 40 : 22;
    const cells = Array.from({ length: count }, (_, i) => ({
      x: ((i * 97) % (width - 60)) + 30,
      y: ((i * 61) % (height - 60)) + 30,
      vx: (i % 2 === 0 ? 1 : -1) * (0.18 + (i % 4) * 0.06),
      vy: (i % 3 === 0 ? 1 : -1) * (0.14 + (i % 3) * 0.05),
      radius: (10 + (i % 5) * 3.5) * scaleFactor,
      angle: i * 0.7,
    }));

    let rafId = 0;

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        24,
        width / 2,
        height / 2,
        width * 0.6
      );
      if (mode === 'fluorescence') {
        bgGrad.addColorStop(0, '#0B2B1E');
        bgGrad.addColorStop(1, '#040A08');
      } else {
        bgGrad.addColorStop(0, '#17372A');
        bgGrad.addColorStop(1, '#091712');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(57, 255, 136, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.arc(width / 2, height / 2, 130, 0, Math.PI * 2);
      ctx.stroke();

      for (const cell of cells) {
        if (!prefersReduced) {
          cell.x += cell.vx;
          cell.y += cell.vy;
          cell.angle += 0.004;

          if (cell.x < -30) cell.x = width + 30;
          if (cell.x > width + 30) cell.x = -30;
          if (cell.y < -30) cell.y = height + 30;
          if (cell.y > height + 30) cell.y = -30;
        }

        ctx.save();
        ctx.translate(cell.x, cell.y);
        ctx.rotate(cell.angle);

        ctx.beginPath();
        ctx.ellipse(0, 0, cell.radius, cell.radius * 0.86, 0, 0, Math.PI * 2);
        ctx.fillStyle =
          mode === 'fluorescence'
            ? 'rgba(57, 255, 136, 0.22)'
            : 'rgba(0, 200, 120, 0.34)';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle =
          mode === 'fluorescence'
            ? 'rgba(57, 255, 136, 0.8)'
            : 'rgba(160, 224, 188, 0.7)';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(
          -cell.radius * 0.12,
          0,
          cell.radius * 0.54,
          0.35,
          Math.PI * 1.65
        );
        ctx.strokeStyle =
          mode === 'fluorescence'
            ? 'rgba(57, 255, 136, 0.95)'
            : 'rgba(13, 125, 76, 0.9)';
        ctx.lineWidth = Math.max(2, cell.radius * 0.24);
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(
          cell.radius * 0.22,
          cell.radius * 0.08,
          cell.radius * 0.16,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = '#F4FFF8';
        ctx.globalAlpha = 0.7;
        ctx.fill();

        ctx.restore();
      }

      if (!prefersReduced) {
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();
    return () => cancelAnimationFrame(rafId);
  }, [magnification, mode, specimenView, cellDivision]);

  const handleSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `microalgae-specimen-${magnification}x.png`;
    link.href = url;
    link.click();
  };

  return (
    <section
      id="microalgae"
      className="border-b border-[#143326] bg-[#050B09] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wider text-[#39FF88]">
            03 · Biological Engine
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#F4FFF8] sm:text-4xl">
            The Tiny Organism with a Big Potential
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#A0B3A8] sm:text-base">
            Inside the photobioreactor, microscopic photosynthetic algae cells
            perform rapid gas exchange across a high surface-area-to-volume
            liquid suspension.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left: Scientific Breakdown */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {MICROALGAE_FACTS.map((fact, idx) => (
              <div
                key={fact.title}
                className="rounded-xl border border-[#163628] bg-[#08130F] p-5"
              >
                <p className="font-mono text-xs text-[#39FF88]">
                  0{idx + 1} · Core Biology
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-[#F4FFF8]">
                  {fact.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#A0B3A8]">
                  {fact.body}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Interactive Microscope Stage + Darkfield Macro Photo */}
          <div className="rounded-xl border border-[#163628] bg-[#08130F] p-5 sm:p-6 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#143326] pb-4">
              <div className="flex items-center gap-2.5">
                <Microscope className="h-5 w-5 text-[#39FF88]" />
                <div>
                  <h3 className="font-display text-base font-semibold text-[#F4FFF8]">
                    Microalgae Specimen Viewer
                  </h3>
                  <p className="text-xs text-[#A0B3A8]">
                    Adjust zoom, simulate cell division, or capture a specimen snapshot
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 rounded-lg border border-[#1A3E2E] bg-[#050B09] p-1">
                <button
                  type="button"
                  onClick={() => setSpecimenView('live')}
                  className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    specimenView === 'live'
                      ? 'bg-[#39FF88] text-[#050B09]'
                      : 'text-[#A0B3A8] hover:text-[#F4FFF8]'
                  }`}
                >
                  <Microscope className="h-3.5 w-3.5" />
                  <span>Live Scope</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSpecimenView('macro')}
                  className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    specimenView === 'macro'
                      ? 'bg-[#39FF88] text-[#050B09]'
                      : 'text-[#A0B3A8] hover:text-[#F4FFF8]'
                  }`}
                >
                  <Camera className="h-3.5 w-3.5" />
                  <span>Macro Render</span>
                </button>
              </div>
            </div>

            {specimenView === 'live' && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {([100, 400, 1000] as Magnification[]).map((mag) => (
                    <button
                      key={mag}
                      type="button"
                      onClick={() => setMagnification(mag)}
                      className={`rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
                        magnification === mag
                          ? 'bg-[#39FF88] text-[#050B09]'
                          : 'border border-[#1A3E2E] bg-[#050B09] text-[#A0B3A8] hover:text-[#F4FFF8]'
                      }`}
                    >
                      {mag}×
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCellDivision((d) => !d)}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      cellDivision
                        ? 'border-[#39FF88] bg-[#09251B] text-[#39FF88]'
                        : 'border-[#1A3E2E] bg-[#050B09] text-[#A0B3A8] hover:text-[#F4FFF8]'
                    }`}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{cellDivision ? '2× Culture Density' : 'Simulate Division'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setMode((m) =>
                        m === 'fluorescence' ? 'brightfield' : 'fluorescence'
                      )
                    }
                    className="rounded-md border border-[#1A3E2E] bg-[#050B09] px-3 py-1.5 text-xs font-medium text-[#F4FFF8] transition-colors hover:border-[#39FF88]/50"
                  >
                    {mode === 'fluorescence' ? 'Chlorophyll Glow' : 'Brightfield'}
                  </button>

                  <button
                    type="button"
                    onClick={handleSnapshot}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#1A3E2E] bg-[#050B09] px-2.5 py-1.5 text-xs font-medium text-[#F4FFF8] transition-colors hover:border-[#39FF88]/50"
                  >
                    <Download className="h-3.5 w-3.5 text-[#39FF88]" />
                    <span>Snapshot</span>
                  </button>
                </div>
              </div>
            )}

            {/* Viewport */}
            <div className="relative mt-4 overflow-hidden rounded-lg border border-[#163628]">
              {specimenView === 'live' ? (
                <>
                  <canvas
                    ref={canvasRef}
                    className="block h-auto w-full cursor-crosshair"
                    aria-label="Animated microalgae cells under microscope"
                  />

                  {ORGANELLES.map((org) => {
                    const isActive = selectedOrganelle.id === org.id;
                    return (
                      <button
                        key={org.id}
                        type="button"
                        onClick={() => setSelectedOrganelle(org)}
                        style={{
                          left: `${org.xPercent}%`,
                          top: `${org.yPercent}%`,
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-md border px-2.5 py-1 font-mono text-[11px] transition-all whitespace-nowrap ${
                          isActive
                            ? 'border-[#39FF88] bg-[#050B09]/95 text-[#39FF88] shadow-[0_0_16px_rgba(57,255,136,0.3)]'
                            : 'border-[#25553E] bg-[#050B09]/80 text-[#F4FFF8] hover:border-[#39FF88]'
                        }`}
                      >
                        {org.label}
                      </button>
                    );
                  })}

                  <div className="pointer-events-none absolute right-3 bottom-3 rounded bg-[#050B09]/85 px-2.5 py-1 font-mono text-[11px] text-[#A0B3A8]">
                    Scale:{' '}
                    {magnification === 100
                      ? '50 µm'
                      : magnification === 400
                      ? '10 µm'
                      : '2 µm'}
                  </div>
                </>
              ) : (
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#050B09]">
                  {!macroError ? (
                    <img
                      src="/src/assets/images/microalgae_macro_photo_1794930827053.jpg"
                      alt="Photorealistic darkfield microscopy visualization of spherical emerald microalgae cells and oxygen micro-bubbles"
                      referrerPolicy="no-referrer"
                      onError={() => setMacroError(true)}
                      className="animate-ken-burns h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-6 text-xs text-[#A0B3A8]">
                      Switch to Live Scope for real-time animated microalgae cells.
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050B09]/90 via-[#050B09]/40 to-transparent p-4">
                    <p className="font-mono text-xs text-[#39FF88]">
                      Illustrative Darkfield Optical View · Chlorella-type Cells &amp; O₂ Micro-Bubbles
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Selected Organelle Readout */}
            <div className="mt-4 rounded-lg border border-[#143326] bg-[#050B09] p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="font-display text-sm font-semibold text-[#39FF88]">
                  {selectedOrganelle.label}
                </p>
                <span className="font-mono text-[11px] text-[#A0B3A8]">
                  Active Specimen Annotation
                </span>
              </div>
              <p className="mt-1.5 text-sm text-[#A0B3A8]">
                {selectedOrganelle.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
