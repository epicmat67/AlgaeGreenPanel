import { useState } from 'react';
import { motion } from 'motion/react';
import { Wind, Leaf, Sprout, Cpu } from 'lucide-react';

const OVERVIEW_CARDS = [
  {
    index: '01',
    title: 'CO₂ Utilisation',
    description:
      'Microalgae use carbon dioxide dissolved in the culture medium as a carbon source during photosynthesis.',
    discipline: 'Biotechnology',
    icon: Wind,
  },
  {
    index: '02',
    title: 'Oxygen Production',
    description:
      'Oxygen is generated as a natural photosynthetic byproduct and released from the illuminated liquid chamber.',
    discipline: 'Environmental Science',
    icon: Leaf,
  },
  {
    index: '03',
    title: 'Algal Biomass',
    description:
      'Growing microalgae produce organic biomass that can be collected in the secondary tank and studied.',
    discipline: 'Bio-Resource Study',
    icon: Sprout,
  },
  {
    index: '04',
    title: 'Smart Monitoring',
    description:
      'Electronic sensors and an Arduino-based architecture help observe environmental gas and system parameters.',
    discipline: 'Electronics & Control',
    icon: Cpu,
  },
];

const URBAN_STRESS_FACTORS = [
  {
    label: 'Urban CO₂ Concentration Pressure',
    conceptualNote: 'Dense traffic corridors & fossil combustion',
    stressLevel: 86,
    greenLevel: 44,
  },
  {
    label: 'Airborne Particulate & Smog Load',
    conceptualNote: 'Industrial & vehicular exhaust buildup',
    stressLevel: 78,
    greenLevel: 38,
  },
  {
    label: 'Available Ground-Level Green Space',
    conceptualNote: 'High-density concrete footprints limit trees',
    stressLevel: 22,
    greenLevel: 74,
  },
];

export default function OverviewAndProblem() {
  const [cityBlend, setCityBlend] = useState(65);

  const greenRatio = cityBlend / 100;

  return (
    <>
      {/* SECTION 3: PROJECT OVERVIEW */}
      <section
        id="overview"
        className="border-b border-[#143326] bg-[#050B09] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium tracking-wider text-[#39FF88]">
                01 · Project Overview
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#F4FFF8] sm:text-4xl">
                Engineering a Greener Urban Future
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm leading-relaxed text-[#A0B3A8] sm:text-base">
                The Algae Green Panel is a vertical photobioreactor concept
                designed to demonstrate biological CO₂ utilization through
                microalgae—uniting five technical disciplines in one compact
                prototype.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-[#143326] py-4 text-xs text-[#A0B3A8]">
            <span className="font-medium text-[#F4FFF8]">Integrated Disciplines:</span>
            <span>Biotechnology</span>
            <span aria-hidden="true">·</span>
            <span>Environmental Science</span>
            <span aria-hidden="true">·</span>
            <span>Mechanical Engineering</span>
            <span aria-hidden="true">·</span>
            <span>Electronics</span>
            <span aria-hidden="true">·</span>
            <span>Sustainable Architecture</span>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OVERVIEW_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex flex-col justify-between rounded-xl border border-[#163628] bg-[#08130F] p-6 transition-colors duration-200 hover:border-[#39FF88]/45"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-[#39FF88]">
                        {card.index}
                      </span>
                      <Icon className="h-5 w-5 text-[#A0B3A8] transition-colors group-hover:text-[#39FF88]" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-[#F4FFF8]">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#A0B3A8]">
                      {card.description}
                    </p>
                  </div>
                  <p className="mt-6 border-t border-[#143326] pt-3 text-xs text-[#A0B3A8]">
                    {card.discipline}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: THE PROBLEM */}
      <section
        id="problem"
        className="border-b border-[#143326] bg-[#07100D] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium tracking-wider text-[#39FF88]">
                02 · Urban Challenge
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#F4FFF8] sm:text-4xl">
                Why Do We Need an Algae Green Wall?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#A0B3A8] sm:text-base">
                Modern cities concentrate emissions into dense vertical corridors
                where traditional ground-level trees have very little room to
                grow. Vertical biological systems offer a promising research
                direction alongside existing sustainability strategies.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-[#F4FFF8]/90">
                <li className="border-b border-[#143326] pb-3">
                  <span className="font-semibold text-[#39FF88]">
                    Rising CO₂ Emissions:
                  </span>{' '}
                  Concentrated transport and energy use elevate local carbon
                  dioxide levels.
                </li>
                <li className="border-b border-[#143326] pb-3">
                  <span className="font-semibold text-[#39FF88]">
                    Urban Air Pollution:
                  </span>{' '}
                  Built-up street canyons trap warm exhaust air and reduce
                  natural airflow.
                </li>
                <li className="border-b border-[#143326] pb-3">
                  <span className="font-semibold text-[#39FF88]">
                    Limited Green Spaces:
                  </span>{' '}
                  High land density leaves scarce horizontal area for parks and
                  urban forests.
                </li>
                <li>
                  <span className="font-semibold text-[#39FF88]">
                    Demand for Sustainable Tech:
                  </span>{' '}
                  Architecture increasingly seeks compact, bio-integrated
                  environmental solutions.
                </li>
              </ul>

              {/* Conceptual Visual Trend Elements (Explicitly Not Real Measurements) */}
              <div className="mt-8 rounded-xl border border-[#163628] bg-[#050B09] p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-medium text-[#F4FFF8]">
                    Conceptual Environmental Pressure Model
                  </span>
                  <span className="text-[11px] font-mono text-[#A0B3A8]">
                    Illustrative Trend
                  </span>
                </div>
                <div className="mt-4 space-y-4">
                  {URBAN_STRESS_FACTORS.map((item) => {
                    const currentVal = Math.round(
                      item.stressLevel + (item.greenLevel - item.stressLevel) * greenRatio
                    );
                    return (
                      <div key={item.label}>
                        <div className="flex items-baseline justify-between text-xs">
                          <span className="text-[#F4FFF8]">{item.label}</span>
                          <span className="font-mono text-[#A0B3A8]">
                            {item.conceptualNote}
                          </span>
                        </div>
                        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#09251B]">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${currentVal}%`,
                              backgroundColor:
                                greenRatio > 0.5 ? '#39FF88' : '#A0B3A8',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Interactive City Pollution-to-Green Transformation Illustration */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-[#163628] bg-[#050B09] p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#143326] pb-4">
                  <div>
                    <h3 className="font-display text-base font-semibold text-[#F4FFF8]">
                      Urban Transition Simulation
                    </h3>
                    <p className="text-xs text-[#A0B3A8]">
                      Slide to explore how bio-integrated facades shift a dense
                      skyline
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCityBlend(0)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                        cityBlend < 30
                          ? 'bg-[#1D352B] text-[#F4FFF8]'
                          : 'text-[#A0B3A8] hover:text-[#F4FFF8]'
                      }`}
                    >
                      High-Emission City
                    </button>
                    <button
                      type="button"
                      onClick={() => setCityBlend(100)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                        cityBlend > 70
                          ? 'bg-[#39FF88] text-[#050B09]'
                          : 'text-[#A0B3A8] hover:text-[#F4FFF8]'
                      }`}
                    >
                      Bio-Integrated City
                    </button>
                  </div>
                </div>

                {/* SVG Cityscape with dynamic smog vs emerald algae facade panels */}
                <div className="relative mt-5 overflow-hidden rounded-lg border border-[#143326]">
                  <svg
                    viewBox="0 0 720 380"
                    className="h-auto w-full"
                    role="img"
                    aria-label="Illustration of an urban skyline transitioning from smoggy air to algae green panel integration"
                  >
                    <defs>
                      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor={greenRatio > 0.5 ? '#061D14' : '#141716'}
                        />
                        <stop
                          offset="100%"
                          stopColor={greenRatio > 0.5 ? '#092B1E' : '#1F2321'}
                        />
                      </linearGradient>
                    </defs>

                    <rect width="720" height="380" fill="url(#skyGrad)" />

                    {/* Smog haze layer fades out as greenRatio increases */}
                    <g opacity={Math.max(0, 1 - greenRatio * 1.1)}>
                      <ellipse cx="180" cy="110" rx="160" ry="44" fill="#464E4A" opacity="0.4" />
                      <ellipse cx="470" cy="90" rx="190" ry="50" fill="#525B56" opacity="0.38" />
                      <ellipse cx="620" cy="135" rx="110" ry="34" fill="#3C4440" opacity="0.35" />
                    </g>

                    {/* Clean atmosphere glow fades in */}
                    <g opacity={greenRatio}>
                      <circle cx="580" cy="82" r="90" fill="#39FF88" opacity="0.09" />
                      <circle cx="240" cy="100" r="110" fill="#00C878" opacity="0.07" />
                    </g>

                    {/* Skyline Buildings */}
                    {[
                      { x: 40, y: 150, w: 85, h: 190, hasPanels: true },
                      { x: 140, y: 95, w: 96, h: 245, hasPanels: true },
                      { x: 255, y: 130, w: 80, h: 210, hasPanels: false },
                      { x: 350, y: 70, w: 112, h: 270, hasPanels: true },
                      { x: 480, y: 115, w: 92, h: 225, hasPanels: true },
                      { x: 590, y: 155, w: 88, h: 185, hasPanels: false },
                    ].map((b, i) => (
                      <g key={i}>
                        <rect
                          x={b.x}
                          y={b.y}
                          width={b.w}
                          height={b.h}
                          rx="3"
                          fill="#0A1913"
                          stroke="#1B3C2E"
                          strokeWidth="1.5"
                        />
                        {/* Windows */}
                        {[0, 1, 2, 3].map((row) => (
                          <rect
                            key={row}
                            x={b.x + 12}
                            y={b.y + 18 + row * 34}
                            width={b.w - 24}
                            height="12"
                            rx="1"
                            fill="#163628"
                          />
                        ))}
                        {/* Algae Green Facade Panels appearing with greenRatio */}
                        {b.hasPanels && (
                          <g opacity={0.15 + greenRatio * 0.85}>
                            <rect
                              x={b.x + 8}
                              y={b.y + 14}
                              width="14"
                              height={b.h - 32}
                              rx="2"
                              fill="#00C878"
                              fillOpacity={0.35 + greenRatio * 0.45}
                              stroke="#39FF88"
                              strokeWidth="1"
                            />
                            <rect
                              x={b.x + b.w - 22}
                              y={b.y + 14}
                              width="14"
                              height={b.h - 32}
                              rx="2"
                              fill="#00C878"
                              fillOpacity={0.35 + greenRatio * 0.45}
                              stroke="#39FF88"
                              strokeWidth="1"
                            />
                          </g>
                        )}
                      </g>
                    ))}

                    {/* Ground & Road */}
                    <rect x="0" y="335" width="720" height="45" fill="#050B09" />
                    <line
                      x1="0"
                      y1="335"
                      x2="720"
                      y2="335"
                      stroke="#1F4A37"
                      strokeWidth="2"
                    />

                    {/* Dynamic Street Trees */}
                    {[128, 342, 578].map((tx, idx) => (
                      <g key={idx} opacity={0.25 + greenRatio * 0.75}>
                        <rect x={tx - 2} y="314" width="4" height="21" fill="#3B5B4A" />
                        <circle
                          cx={tx}
                          cy="306"
                          r={8 + greenRatio * 6}
                          fill="#00C878"
                          fillOpacity="0.65"
                        />
                      </g>
                    ))}

                    {/* Rising Clean O2 / CO2 labels */}
                    <text
                      x="32"
                      y="36"
                      fill={greenRatio > 0.5 ? '#39FF88' : '#A0B3A8'}
                      fontSize="12"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {greenRatio > 0.5
                        ? 'Conceptual State: Bio-Integrated Urban Facades'
                        : 'Conceptual State: Unmitigated Urban Exhaust'}
                    </text>
                  </svg>
                </div>

                {/* Slider Control */}
                <div className="mt-5 flex items-center gap-4">
                  <label
                    htmlFor="urban-transition-slider"
                    className="text-xs font-medium text-[#A0B3A8] whitespace-nowrap"
                  >
                    Integration Level
                  </label>
                  <input
                    id="urban-transition-slider"
                    type="range"
                    min={0}
                    max={100}
                    value={cityBlend}
                    onChange={(e) => setCityBlend(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer accent-[#39FF88]"
                  />
                  <span className="w-12 text-right font-mono text-xs tabular-nums text-[#39FF88]">
                    {cityBlend}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
