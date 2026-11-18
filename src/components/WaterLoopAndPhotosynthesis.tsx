import { useState } from 'react';
import { Droplets, Sun, ArrowRight } from 'lucide-react';

type FlowSpeed = 'slow' | 'standard' | 'high';

const WATER_STAGES = [
  'Water Tank',
  'Water Pump',
  'Algae Panel',
  'Collection Tank',
  'Recirculation',
];

const CIRCULATION_BENEFITS = [
  'Helps distribute dissolved nutrients uniformly throughout the liquid medium.',
  'Supports continuous mixing so microalgae cells do not settle at the base.',
  'Improves light exposure by rotating cells near the illuminated glass surfaces.',
  'Helps maintain a more uniform thermal and chemical culture environment.',
  'Supports continuous prototype operation alongside collection tank sampling.',
];

interface EquationTerm {
  id: 'co2' | 'h2o' | 'light' | 'biomass' | 'o2';
  symbol: string;
  name: string;
  explanation: string;
  accent: string;
}

const EQUATION_TERMS: EquationTerm[] = [
  {
    id: 'co2',
    symbol: 'CO₂',
    name: 'Carbon Dioxide',
    explanation:
      'Ambient CO₂ enters the photobioreactor and dissolves into the culture medium, providing carbon atoms for organic synthesis.',
    accent: '#A0B3A8',
  },
  {
    id: 'h2o',
    symbol: 'H₂O',
    name: 'Water Medium',
    explanation:
      'Water serves as both the liquid suspension habitat and the electron donor split during light-dependent reactions.',
    accent: '#60A5FA',
  },
  {
    id: 'light',
    symbol: 'Light Energy',
    name: 'LED / Solar Photons',
    explanation:
      'Photons strike chlorophyll molecules inside the chloroplast, energizing electrons that drive carbon fixation.',
    accent: '#FACC15',
  },
  {
    id: 'biomass',
    symbol: 'Organic Matter',
    name: 'Algal Biomass',
    explanation:
      'Fixed carbon builds carbohydrates, lipids, and proteins—forming collectable microalgae biomass.',
    accent: '#00C878',
  },
  {
    id: 'o2',
    symbol: 'O₂',
    name: 'Oxygen Gas',
    explanation:
      'Oxygen molecules formed during water photolysis diffuse out of cells and rise as bubbles toward the exhaust port.',
    accent: '#39FF88',
  },
];

export default function WaterLoopAndPhotosynthesis() {
  const [flowSpeed, setFlowSpeed] = useState<FlowSpeed>('standard');
  const [activeTerm, setActiveTerm] = useState<EquationTerm>(EQUATION_TERMS[2]);
  const [photonIntensity, setPhotonIntensity] = useState<number>(85);

  const animDuration =
    flowSpeed === 'slow' ? '3.4s' : flowSpeed === 'standard' ? '2s' : '1.1s';
  const photonDur = `${Math.max(0.5, 2.2 - (photonIntensity / 100) * 1.4).toFixed(2)}s`;

  return (
    <>
      {/* SECTION 7: WATER AND ALGAE CIRCULATION */}
      <section
        id="water-loop"
        className="border-b border-[#143326] bg-[#050B09] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium tracking-wider text-[#39FF88]">
                05 · Fluid Dynamics
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#F4FFF8] sm:text-4xl">
                The Continuous Water Loop
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#A0B3A8] sm:text-base">
                Static water causes algae sedimentation and uneven light
                exposure. The Algae Green Panel uses a continuous hydraulic
                circuit powered by an inline water motor to circulate culture
                between the main panel and the collection tank.
              </p>

              <ul className="mt-6 space-y-3">
                {CIRCULATION_BENEFITS.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-[#F4FFF8]/90"
                  >
                    <span className="mt-0.5 font-mono text-xs font-semibold text-[#39FF88]">
                      0{idx + 1}
                    </span>
                    <span className="text-[#A0B3A8]">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#163628] bg-[#08130F] p-5 sm:p-6 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#143326] pb-4">
                <div className="flex items-center gap-2.5">
                  <Droplets className="h-5 w-5 text-[#60A5FA]" />
                  <div>
                    <h3 className="font-display text-base font-semibold text-[#F4FFF8]">
                      Closed Hydraulic Recirculation Diagram
                    </h3>
                    <p className="text-xs text-[#A0B3A8]">
                      Adjust pump circulation speed to observe fluid velocity
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 rounded-lg border border-[#163628] bg-[#050B09] p-1">
                  {(['slow', 'standard', 'high'] as FlowSpeed[]).map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => setFlowSpeed(spd)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                        flowSpeed === spd
                          ? 'bg-[#39FF88] text-[#050B09]'
                          : 'text-[#A0B3A8] hover:text-[#F4FFF8]'
                      }`}
                    >
                      {spd === 'high' ? 'High Mixing' : spd}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5-Stage Sequence Pills -> Clean Connected Nodes */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
                {WATER_STAGES.map((stage, idx) => (
                  <div key={stage} className="flex items-center gap-2">
                    <span className="rounded-md border border-[#1C4332] bg-[#050B09] px-3 py-1.5 font-medium text-[#F4FFF8]">
                      {stage}
                    </span>
                    {idx < WATER_STAGES.length - 1 && (
                      <ArrowRight className="h-3.5 w-3.5 text-[#39FF88]" />
                    )}
                  </div>
                ))}
              </div>

              {/* Animated SVG Hydraulic Loop */}
              <div className="mt-5 overflow-hidden rounded-lg border border-[#143326] bg-[#050B09] p-4">
                <svg
                  viewBox="0 0 640 260"
                  className="h-auto w-full"
                  role="img"
                  aria-label="Animated continuous water and microalgae circulation loop"
                >
                  <defs>
                    <linearGradient id="fluidGlow" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="50%" stopColor="#00C878" />
                      <stop offset="100%" stopColor="#39FF88" />
                    </linearGradient>
                  </defs>

                  {/* Continuous Pipe Path */}
                  <path
                    id="loopTrack"
                    d="M 95 190 L 95 72 L 320 72 L 545 72 L 545 190 L 320 190 Z"
                    fill="none"
                    stroke="#0F2D21"
                    strokeWidth="12"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 95 190 L 95 72 L 320 72 L 545 72 L 545 190 L 320 190 Z"
                    fill="none"
                    stroke="url(#fluidGlow)"
                    strokeWidth="4"
                    strokeLinejoin="round"
                    strokeDasharray="12 10"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="44"
                      to="0"
                      dur={animDuration}
                      repeatCount="indefinite"
                    />
                  </path>

                  {/* Water Tank (Bottom-Left) */}
                  <rect x="44" y="152" width="104" height="72" rx="6" fill="#081A14" stroke="#38BDF8" strokeWidth="1.6" />
                  <rect x="48" y="174" width="96" height="46" rx="3" fill="#0E4B63" fillOpacity="0.65" />
                  <text x="96" y="198" textAnchor="middle" fill="#F4FFF8" fontSize="11" fontWeight="600">
                    Water Tank
                  </text>

                  {/* Water Pump (Top-Left) */}
                  <circle cx="95" cy="72" r="24" fill="#092118" stroke="#39FF88" strokeWidth="1.8" />
                  <text x="95" y="76" textAnchor="middle" fill="#39FF88" fontSize="10" fontFamily="JetBrains Mono, monospace">
                    PUMP
                  </text>

                  {/* Algae Panel (Top-Center) */}
                  <rect x="230" y="34" width="180" height="76" rx="6" fill="#082419" stroke="#39FF88" strokeWidth="1.8" />
                  <rect x="236" y="42" width="168" height="60" rx="3" fill="#0B5B34" fillOpacity="0.6" />
                  <text x="320" y="68" textAnchor="middle" fill="#F4FFF8" fontSize="12" fontWeight="600">
                    Algae Panel
                  </text>
                  <text x="320" y="85" textAnchor="middle" fill="#39FF88" fontSize="10" fontFamily="JetBrains Mono, monospace">
                    Mixing + Light Exposure
                  </text>

                  {/* Collection Tank (Bottom-Right) */}
                  <rect x="492" y="152" width="108" height="72" rx="6" fill="#081A14" stroke="#00C878" strokeWidth="1.6" />
                  <rect x="496" y="176" width="100" height="44" rx="3" fill="#0D6339" fillOpacity="0.7" />
                  <text x="546" y="198" textAnchor="middle" fill="#F4FFF8" fontSize="11" fontWeight="600">
                    Collection Tank
                  </text>

                  {/* Recirculation Label (Bottom-Center) */}
                  <rect x="252" y="174" width="136" height="30" rx="4" fill="#050B09" stroke="#1E4735" />
                  <text x="320" y="193" textAnchor="middle" fill="#A0B3A8" fontSize="11" fontFamily="JetBrains Mono, monospace">
                    Recirculation Return
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: THE SCIENCE — PHOTOSYNTHESIS */}
      <section
        id="photosynthesis"
        className="border-b border-[#143326] bg-[#07100D] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wider text-[#39FF88]">
              06 · Biochemical Mechanism
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#F4FFF8] sm:text-4xl">
              The Power of Photosynthesis
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#A0B3A8] sm:text-base">
              Select any component in the simplified biochemical equation below
              to inspect its physical role inside illuminated microalgae cells.
            </p>
          </div>

          {/* Interactive Equation Bar */}
          <div className="mt-10 rounded-xl border border-[#163628] bg-[#050B09] p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-center gap-3 text-center">
              {EQUATION_TERMS.map((term, idx) => {
                const isSelected = activeTerm.id === term.id;
                return (
                  <div key={term.id} className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTerm(term)}
                      className={`rounded-lg border px-4 py-3 font-mono text-sm font-semibold transition-all sm:text-base ${
                        isSelected
                          ? 'border-[#39FF88] bg-[#09251B] text-[#F4FFF8] shadow-[0_0_24px_rgba(57,255,136,0.18)]'
                          : 'border-[#1A3B2C] bg-[#08130F] text-[#A0B3A8] hover:border-[#39FF88]/45 hover:text-[#F4FFF8]'
                      }`}
                    >
                      {term.symbol}
                    </button>
                    {idx < 2 && (
                      <span className="font-mono text-lg text-[#A0B3A8]">+</span>
                    )}
                    {idx === 2 && (
                      <span className="font-mono text-xl font-bold text-[#39FF88]">
                        →
                      </span>
                    )}
                    {idx === 3 && (
                      <span className="font-mono text-lg text-[#A0B3A8]">+</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Reaction Stage + Explanation */}
            <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="overflow-hidden rounded-lg border border-[#163628] bg-[#08130F] p-4 lg:col-span-7">
                <svg
                  viewBox="0 0 600 260"
                  className="h-auto w-full"
                  role="img"
                  aria-label="Animated photosynthesis reaction inside a microalgae cell"
                >
                  {/* Photon Rays */}
                  <g opacity={photonIntensity / 100}>
                    {[150, 210, 270].map((lx, i) => (
                      <line
                        key={i}
                        x1={lx - 35}
                        y1="14"
                        x2={lx + 20}
                        y2="92"
                        stroke="#FACC15"
                        strokeWidth={activeTerm.id === 'light' ? '3.2' : '2'}
                        strokeDasharray="6 6"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          from="24"
                          to="0"
                          dur={photonDur}
                          repeatCount="indefinite"
                        />
                      </line>
                    ))}
                    <text x="115" y="28" fill="#FACC15" fontSize="11" fontFamily="JetBrains Mono, monospace">
                      Light Energy ({photonIntensity}% Photons)
                    </text>
                  </g>

                  {/* Microalgae Cell Membrane */}
                  <ellipse
                    cx="300"
                    cy="148"
                    rx="118"
                    ry="78"
                    fill="#09291C"
                    stroke={activeTerm.id === 'biomass' ? '#39FF88' : '#256146'}
                    strokeWidth="2.5"
                  />
                  {/* Inner Chloroplast Thylakoid Stacks */}
                  <ellipse
                    cx="292"
                    cy="150"
                    rx="74"
                    ry="46"
                    fill="#0E4A31"
                    stroke="#39FF88"
                    strokeOpacity="0.45"
                    strokeWidth="1.5"
                  />
                  <text
                    x="292"
                    y="146"
                    textAnchor="middle"
                    fill="#F4FFF8"
                    fontSize="12"
                    fontWeight="600"
                  >
                    Microalgae Chloroplast
                  </text>
                  <text
                    x="292"
                    y="165"
                    textAnchor="middle"
                    fill="#39FF88"
                    fontSize="10"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    Carbon Fixation → Biomass
                  </text>

                  {/* CO2 Intake Arrow */}
                  <path
                    d="M 48 118 L 172 132"
                    stroke="#A0B3A8"
                    strokeWidth={activeTerm.id === 'co2' ? '3' : '1.8'}
                    strokeDasharray="6 4"
                  />
                  <text x="42" y="108" fill="#F4FFF8" fontSize="12" fontFamily="JetBrains Mono, monospace">
                    CO₂ In
                  </text>

                  {/* H2O Intake Arrow */}
                  <path
                    d="M 48 188 L 176 168"
                    stroke="#60A5FA"
                    strokeWidth={activeTerm.id === 'h2o' ? '3' : '1.8'}
                    strokeDasharray="6 4"
                  />
                  <text x="42" y="206" fill="#60A5FA" fontSize="12" fontFamily="JetBrains Mono, monospace">
                    H₂O In
                  </text>

                  {/* O2 Release Arrow */}
                  <path
                    d="M 424 128 L 548 106"
                    stroke="#39FF88"
                    strokeWidth={activeTerm.id === 'o2' ? '3.2' : '2'}
                    strokeDasharray="6 4"
                  />
                  <text x="478" y="96" fill="#39FF88" fontSize="12" fontFamily="JetBrains Mono, monospace">
                    O₂ Released
                  </text>

                  {/* Organic Biomass Output */}
                  <path
                    d="M 418 172 L 548 192"
                    stroke="#00C878"
                    strokeWidth={activeTerm.id === 'biomass' ? '3.2' : '2'}
                  />
                  <text x="448" y="214" fill="#F4FFF8" fontSize="11" fontFamily="JetBrains Mono, monospace">
                    Organic Biomass
                  </text>
                </svg>
              </div>

              <div className="rounded-lg border border-[#163628] bg-[#08130F] p-6 lg:col-span-5">
                <div className="flex items-center gap-2 text-xs font-mono text-[#39FF88]">
                  <Sun className="h-4 w-4" />
                  <span>Active Reaction Step</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold text-[#F4FFF8]">
                  {activeTerm.symbol} — {activeTerm.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#A0B3A8]">
                  {activeTerm.explanation}
                </p>

                <div className="mt-5 rounded-lg border border-[#143326] bg-[#050B09] p-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor="photon-slider" className="font-medium text-[#F4FFF8]">
                      Simulated Light Photon Energy
                    </label>
                    <span className="font-mono text-[#FACC15] tabular-nums">
                      {photonIntensity}%
                    </span>
                  </div>
                  <input
                    id="photon-slider"
                    type="range"
                    min={10}
                    max={100}
                    value={photonIntensity}
                    onChange={(e) => setPhotonIntensity(Number(e.target.value))}
                    className="mt-2 h-2 w-full cursor-pointer accent-[#39FF88]"
                  />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#143326] pt-4 text-xs text-[#A0B3A8]">
                  <div>
                    <p className="font-semibold text-[#F4FFF8]">Light-Dependent</p>
                    <p className="mt-0.5">Photons split H₂O &amp; release O₂</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#F4FFF8]">Carbon Fixation</p>
                    <p className="mt-0.5">CO₂ forms algal organic matter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
