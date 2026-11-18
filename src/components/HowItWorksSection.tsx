import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, Power, Eye, Layers, Play, Pause } from 'lucide-react';

interface ComponentSpec {
  id: string;
  name: string;
  subsystem: string;
  summary: string;
  principle: string;
}

const COMPONENT_SPECS: Record<string, ComponentSpec> = {
  airInlet: {
    id: 'airInlet',
    name: 'Air Inlet (CO₂) Fan',
    subsystem: 'Gas Intake · Upper-Left Wall',
    summary:
      'Draws ambient CO₂-rich air into the upper chamber and supports internal air circulation.',
    principle:
      'Maintains positive airflow across the photobioreactor headspace while feeding air toward the submerged diffuser path.',
  },
  ledLight: {
    id: 'ledLight',
    name: 'Top LED Illumination Bar',
    subsystem: 'Photon Source · Chamber Roof',
    summary:
      'Supplies uniform artificial light directly downward through the transparent 13 cm cultivation tank.',
    principle:
      'Delivers photosynthetically active light energy so microalgae cells receive steady illumination regardless of indoor lighting.',
  },
  algaeChamber: {
    id: 'algaeChamber',
    name: 'Transparent Algae Chamber',
    subsystem: 'Core Photobioreactor · 13 cm Frame',
    summary:
      'Holds the suspended green microalgae culture where light, water, dissolved CO₂, and nutrients interact.',
    principle:
      'Clear acrylic/glass walls maximize light penetration while an internal diffuser stone generates rising gas bubbles for mixing.',
  },
  waterInlet: {
    id: 'waterInlet',
    name: 'Water Inlet Port',
    subsystem: 'Hydraulic Return · Lower-Left Wall',
    summary:
      'Returns recirculated water and culture medium into the primary reactor chamber via flexible clear tubing.',
    principle:
      'Keeps liquid level balanced and prevents stagnant zones at the bottom of the algae vessel.',
  },
  exhaustFan: {
    id: 'exhaustFan',
    name: 'CO₂ / Gas Exchange Fan',
    subsystem: 'Airflow Regulation · Upper-Right Wall',
    summary:
      'Regulates gas exchange at the upper-right wall so oxygen-enriched air exits cleanly without pressure buildup.',
    principle:
      'Works alongside the left inlet fan to sustain continuous convective movement above the bubbling algae medium.',
  },
  waterMotor: {
    id: 'waterMotor',
    name: 'Inline Water Motor (Pump)',
    subsystem: 'Fluid Circulation · External Line',
    summary:
      'Drives liquid flow out of the right-side blue outlet down through the tubing into the collection tank.',
    principle:
      'Provides controlled mechanical circulation so culture medium flows reliably through the closed loop.',
  },
  collectionTank: {
    id: 'collectionTank',
    name: 'Collection Tank',
    subsystem: 'Biomass & Recirculation Reservoir · Right',
    summary:
      'Receives algae-rich liquid from the water motor for biomass settling, observation, and loop recirculation.',
    principle:
      'Separates harvesting/observation access from the main illuminated photobioreactor chamber.',
  },
  o2Sensor: {
    id: 'o2Sensor',
    name: 'O₂ Sensor Module',
    subsystem: 'Electronic Base · Left Bay',
    summary:
      'Measures oxygen concentration at the designated sampling zone and outputs an electrical signal to Arduino.',
    principle:
      'Converts oxygen interaction at the sensing element into calibrated voltage values for LCD and dashboard display.',
  },
  co2Sensor: {
    id: 'co2Sensor',
    name: 'CO₂ Sensor Module',
    subsystem: 'Electronic Base · Center Bay',
    summary:
      'Monitors carbon dioxide concentration in parts per million (PPM) using optical infrared absorption.',
    principle:
      'Tracks CO₂ variation across experiments so users can observe biological uptake trends during illumination.',
  },
  powerSwitch: {
    id: 'powerSwitch',
    name: 'Main ON / OFF Rocker Switch',
    subsystem: 'Electronic Base · Right Bay',
    summary:
      'Controls primary electrical power to the LED grow bar, fans, water motor, and Arduino sensor electronics.',
    principle:
      'Provides safe, immediate manual hardware isolation during laboratory setup and demonstration.',
  },
};

const PROCESS_STEPS = [
  { step: '01', label: 'CO₂-Rich Air' },
  { step: '02', label: 'Air Pump' },
  { step: '03', label: 'Algae Chamber' },
  { step: '04', label: 'Photosynthesis' },
  { step: '05', label: 'O₂-Rich Air + Algal Biomass' },
];

const GUIDED_ORDER = [
  'airInlet',
  'ledLight',
  'algaeChamber',
  'waterMotor',
  'collectionTank',
  'o2Sensor',
  'co2Sensor',
];

export default function HowItWorksSection() {
  const [selectedId, setSelectedId] = useState<string>('algaeChamber');
  const [systemOn, setSystemOn] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'schematic' | 'reference'>('schematic');
  const [imgError, setImgError] = useState<boolean>(false);
  const [guidedTour, setGuidedTour] = useState<boolean>(false);

  useEffect(() => {
    if (!guidedTour) return;
    const timer = window.setInterval(() => {
      setSelectedId((prev) => {
        const idx = GUIDED_ORDER.indexOf(prev);
        return GUIDED_ORDER[(idx + 1) % GUIDED_ORDER.length];
      });
    }, 2800);
    return () => window.clearInterval(timer);
  }, [guidedTour]);

  const activeSpec = COMPONENT_SPECS[selectedId] ?? COMPONENT_SPECS.algaeChamber;

  return (
    <section
      id="how-it-works"
      className="border-b border-[#143326] bg-[#07100D] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wider text-[#39FF88]">
              04 · Prototype Architecture
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#F4FFF8] sm:text-4xl">
              From CO₂-Rich Air to Algae Biomass
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#A0B3A8] sm:text-base">
              Built directly around the physical Algae Green Panel prototype
              geometry: dual-wall ventilation fans, top LED array, submerged
              diffuser, external water motor, collection tank, and integrated
              base sensors.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Diagram view mode"
            className="flex items-center gap-1 rounded-lg border border-[#163628] bg-[#050B09] p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'schematic'}
              onClick={() => setViewMode('schematic')}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                viewMode === 'schematic'
                  ? 'bg-[#39FF88] text-[#050B09]'
                  : 'text-[#A0B3A8] hover:text-[#F4FFF8]'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Interactive Schematic</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'reference'}
              onClick={() => setViewMode('reference')}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                viewMode === 'reference'
                  ? 'bg-[#39FF88] text-[#050B09]'
                  : 'text-[#A0B3A8] hover:text-[#F4FFF8]'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Prototype Reference</span>
            </button>
          </div>
        </div>

        {/* Animated 5-Stage Process Strip */}
        <div className="mt-10 rounded-xl border border-[#163628] bg-[#050B09] p-4 sm:p-5">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            {PROCESS_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className="flex w-full flex-col items-center gap-3 md:w-auto md:flex-row"
              >
                <div className="flex w-full items-center justify-between rounded-lg border border-[#1A3E2E] bg-[#08130F] px-4 py-3 md:w-auto md:justify-start md:gap-3">
                  <span className="font-mono text-xs font-semibold text-[#39FF88]">
                    {item.step}
                  </span>
                  <span className="text-xs font-semibold text-[#F4FFF8] sm:text-sm whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
                {idx < PROCESS_STEPS.length - 1 && (
                  <>
                    <ArrowRight className="hidden h-4 w-4 shrink-0 text-[#39FF88] md:block" />
                    <ArrowDown className="h-4 w-4 shrink-0 text-[#39FF88] md:hidden" />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Interactive Technical Diagram + Inspection Sidebar */}
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="rounded-xl border border-[#163628] bg-[#050B09] p-4 sm:p-6 lg:col-span-8">
            {viewMode === 'schematic' ? (
              <div>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-[#A0B3A8]">
                    Hover or click any module to inspect · Click the red rocker switch to toggle power
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setGuidedTour((g) => !g)}
                      className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-mono text-xs font-medium transition-colors whitespace-nowrap ${
                        guidedTour
                          ? 'border-[#39FF88] bg-[#39FF88] text-[#050B09]'
                          : 'border-[#1E4735] bg-[#08130F] text-[#F4FFF8] hover:border-[#39FF88]/60'
                      }`}
                    >
                      {guidedTour ? (
                        <>
                          <Pause className="h-3.5 w-3.5" />
                          <span>Pause Tour</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5" />
                          <span>Play Guided Tour</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSystemOn((s) => !s)}
                      className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs font-medium transition-colors whitespace-nowrap ${
                        systemOn
                          ? 'border-[#39FF88]/60 bg-[#09251B] text-[#39FF88]'
                          : 'border-[#2D453B] bg-[#08130F] text-[#A0B3A8]'
                      }`}
                    >
                      <Power className="h-3.5 w-3.5" />
                      <span>{systemOn ? 'Prototype Power: ON' : 'Prototype Power: OFF'}</span>
                    </button>
                  </div>
                </div>

                {/* SVG Technical Schematic Matching Uploaded Prototype Layout */}
                <svg
                  viewBox="0 0 760 440"
                  className="h-auto w-full select-none"
                  role="img"
                  aria-label="Interactive Algae Green Panel technical schematic matching prototype layout"
                >
                  <defs>
                    <linearGradient id="chamberWater" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={systemOn ? '#159F58' : '#0D482B'}
                        stopOpacity="0.72"
                      />
                      <stop
                        offset="100%"
                        stopColor={systemOn ? '#074C2A' : '#052215'}
                        stopOpacity="0.92"
                      />
                    </linearGradient>
                    <linearGradient id="lightCone" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E9FFF2" stopOpacity="0.34" />
                      <stop offset="100%" stopColor="#39FF88" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Bench Surface */}
                  <rect x="20" y="388" width="720" height="32" rx="4" fill="#08130F" />
                  <line x1="20" y1="388" x2="740" y2="388" stroke="#183A2B" strokeWidth="1.5" />

                  {/* 13 cm Top Depth Dimension Line (from reference diagram) */}
                  <g opacity="0.8">
                    <line x1="395" y1="22" x2="455" y2="42" stroke="#A0B3A8" strokeWidth="1.2" />
                    <polygon points="395,22 403,21 401,27" fill="#A0B3A8" />
                    <polygon points="455,42 447,43 449,37" fill="#A0B3A8" />
                    <text
                      x="432"
                      y="24"
                      fill="#F4FFF8"
                      fontSize="12"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      13 cm
                    </text>
                  </g>

                  {/* Left Water Inlet Tubing */}
                  <g
                    className="cursor-pointer"
                    onMouseEnter={() => setSelectedId('waterInlet')}
                    onClick={() => setSelectedId('waterInlet')}
                  >
                    <path
                      d="M 48 344 C 85 335, 112 292, 134 268"
                      fill="none"
                      stroke="#2F80ED"
                      strokeWidth="8"
                      strokeLinecap="round"
                      opacity="0.3"
                    />
                    <path
                      d="M 48 344 C 85 335, 112 292, 134 268"
                      fill="none"
                      stroke={systemOn ? '#60A5FA' : '#3B5875'}
                      strokeWidth="2.5"
                      className={systemOn ? 'animate-flow-dash' : ''}
                    />
                    {/* Blue Water Inlet Fitting */}
                    <rect
                      x="130"
                      y="258"
                      width="16"
                      height="18"
                      rx="3"
                      fill="#2563EB"
                      stroke={selectedId === 'waterInlet' ? '#39FF88' : '#93C5FD'}
                      strokeWidth="1.5"
                    />
                    <text
                      x="28"
                      y="255"
                      fill="#F4FFF8"
                      fontSize="11"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      fontWeight="600"
                    >
                      Water Inlet
                    </text>
                    <line x1="94" y1="252" x2="127" y2="265" stroke="#60A5FA" strokeWidth="1.2" />
                  </g>

                  {/* Main Photobioreactor Chamber (3D-style Glass Box) */}
                  <g
                    className="cursor-pointer"
                    onMouseEnter={() => setSelectedId('algaeChamber')}
                    onClick={() => setSelectedId('algaeChamber')}
                  >
                    {/* Back 3D perspective edge */}
                    <polygon
                      points="146,54 180,34 452,34 418,54"
                      fill="#0A2218"
                      stroke="#2D5E47"
                      strokeWidth="1.5"
                    />
                    <polygon
                      points="418,54 452,34 452,290 418,310"
                      fill="#071912"
                      stroke="#2D5E47"
                      strokeWidth="1.5"
                    />

                    {/* Front Glass Frame */}
                    <rect
                      x="146"
                      y="54"
                      width="272"
                      height="256"
                      rx="4"
                      fill="#071510"
                      stroke={selectedId === 'algaeChamber' ? '#39FF88' : '#3C7A5D'}
                      strokeWidth="2"
                    />

                    {/* Green Algae Liquid Volume */}
                    <rect
                      x="152"
                      y="98"
                      width="260"
                      height="206"
                      rx="2"
                      fill="url(#chamberWater)"
                    />

                    {/* Light Rays from Top LED */}
                    {systemOn && (
                      <polygon
                        points="160,68 404,68 412,235 152,235"
                        fill="url(#lightCone)"
                      />
                    )}

                    {/* Submerged Diffuser Air Stone */}
                    <rect
                      x="252"
                      y="286"
                      width="60"
                      height="14"
                      rx="2"
                      fill="#12281F"
                      stroke="#39FF88"
                      strokeOpacity="0.4"
                    />

                    {/* Rising Bubbles inside Chamber */}
                    {systemOn &&
                      [264, 274, 282, 290, 300, 270, 286, 295].map((bx, i) => (
                        <circle
                          key={i}
                          cx={bx}
                          cy={270 - i * 22}
                          r={2.5 + (i % 3)}
                          fill="#D9FFF0"
                          fillOpacity="0.68"
                        >
                          <animate
                            attributeName="cy"
                            values="282;106"
                            dur={`${2.1 + (i % 4) * 0.4}s`}
                            begin={`${i * 0.25}s`}
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0.8;0.1"
                            dur={`${2.1 + (i % 4) * 0.4}s`}
                            begin={`${i * 0.25}s`}
                            repeatCount="indefinite"
                          />
                        </circle>
                      ))}
                  </g>

                  {/* Top LED Light Bar */}
                  <g
                    className="cursor-pointer"
                    onMouseEnter={() => setSelectedId('ledLight')}
                    onClick={() => setSelectedId('ledLight')}
                  >
                    <rect
                      x="162"
                      y="60"
                      width="240"
                      height="10"
                      rx="2"
                      fill={systemOn ? '#F4FFF8' : '#1E3C2E'}
                      stroke={selectedId === 'ledLight' ? '#39FF88' : '#2E624A'}
                      strokeWidth="1.5"
                    />
                  </g>

                  {/* Upper-Left Air Inlet (CO2) Fan */}
                  <g
                    className="cursor-pointer"
                    onMouseEnter={() => setSelectedId('airInlet')}
                    onClick={() => setSelectedId('airInlet')}
                  >
                    <rect
                      x="154"
                      y="78"
                      width="48"
                      height="48"
                      rx="5"
                      fill="#0D1914"
                      stroke={selectedId === 'airInlet' ? '#39FF88' : '#335947'}
                      strokeWidth="1.8"
                    />
                    <circle cx="178" cy="102" r="16" fill="#060D0A" stroke="#284A3A" />
                    <g
                      style={{
                        transformOrigin: '178px 102px',
                      }}
                      className={systemOn ? 'animate-spin-slow' : ''}
                    >
                      <line x1="178" y1="88" x2="178" y2="116" stroke="#A0B3A8" strokeWidth="3" strokeLinecap="round" />
                      <line x1="164" y1="102" x2="192" y2="102" stroke="#A0B3A8" strokeWidth="3" strokeLinecap="round" />
                    </g>
                    <text
                      x="26"
                      y="98"
                      fill="#F4FFF8"
                      fontSize="11"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      fontWeight="600"
                    >
                      Air Inlet (CO₂)
                    </text>
                    <line x1="106" y1="95" x2="150" y2="100" stroke="#39FF88" strokeWidth="1.4" />
                  </g>

                  {/* Upper-Right CO2 / Gas Exchange Fan */}
                  <g
                    className="cursor-pointer"
                    onMouseEnter={() => setSelectedId('exhaustFan')}
                    onClick={() => setSelectedId('exhaustFan')}
                  >
                    <rect
                      x="362"
                      y="78"
                      width="48"
                      height="48"
                      rx="5"
                      fill="#0D1914"
                      stroke={selectedId === 'exhaustFan' ? '#39FF88' : '#335947'}
                      strokeWidth="1.8"
                    />
                    <circle cx="386" cy="102" r="16" fill="#060D0A" stroke="#284A3A" />
                    <g
                      style={{
                        transformOrigin: '386px 102px',
                      }}
                      className={systemOn ? 'animate-spin-slow' : ''}
                    >
                      <line x1="386" y1="88" x2="386" y2="116" stroke="#39FF88" strokeWidth="3" strokeLinecap="round" />
                      <line x1="372" y1="102" x2="400" y2="102" stroke="#39FF88" strokeWidth="3" strokeLinecap="round" />
                    </g>
                    <text
                      x="485"
                      y="98"
                      fill="#F4FFF8"
                      fontSize="11"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      fontWeight="600"
                    >
                      CO₂ / Gas Fan
                    </text>
                    <line x1="414" y1="100" x2="480" y2="95" stroke="#39FF88" strokeWidth="1.4" />
                  </g>

                  {/* Right Water Outlet Tube -> Water Motor -> Collection Tank */}
                  <g
                    className="cursor-pointer"
                    onMouseEnter={() => setSelectedId('waterMotor')}
                    onClick={() => setSelectedId('waterMotor')}
                  >
                    {/* Blue outlet port on right wall */}
                    <rect x="438" y="138" width="16" height="16" rx="3" fill="#2563EB" />
                    {/* Tube path down to water motor and over to collection tank */}
                    <path
                      d="M 454 146 L 478 146 L 478 348 L 535 348 L 574 348"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="8"
                      strokeLinejoin="round"
                      opacity="0.25"
                    />
                    <path
                      d="M 454 146 L 478 146 L 478 348 L 574 348"
                      fill="none"
                      stroke={systemOn ? '#60A5FA' : '#3B5875'}
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                      className={systemOn ? 'animate-flow-dash' : ''}
                    />

                    {/* Water Motor Unit */}
                    <rect
                      x="496"
                      y="330"
                      width="44"
                      height="36"
                      rx="6"
                      fill="#111C17"
                      stroke={selectedId === 'waterMotor' ? '#39FF88' : '#355B4A'}
                      strokeWidth="1.8"
                    />
                    <circle cx="518" cy="348" r="9" fill="#07120D" stroke="#60A5FA" strokeWidth="1.5" />
                    <text
                      x="518"
                      y="300"
                      textAnchor="middle"
                      fill="#F4FFF8"
                      fontSize="11"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      fontWeight="600"
                    >
                      Water Motor
                    </text>
                    <line x1="518" y1="306" x2="518" y2="328" stroke="#60A5FA" strokeWidth="1.2" />
                  </g>

                  {/* Collection Tank on Right */}
                  <g
                    className="cursor-pointer"
                    onMouseEnter={() => setSelectedId('collectionTank')}
                    onClick={() => setSelectedId('collectionTank')}
                  >
                    <rect
                      x="576"
                      y="272"
                      width="116"
                      height="112"
                      rx="4"
                      fill="#071510"
                      stroke={selectedId === 'collectionTank' ? '#39FF88' : '#3C7A5D'}
                      strokeWidth="1.8"
                    />
                    <rect
                      x="581"
                      y="308"
                      width="106"
                      height="71"
                      rx="2"
                      fill="#0D6E3D"
                      fillOpacity="0.65"
                    />
                    <text
                      x="634"
                      y="344"
                      textAnchor="middle"
                      fill="#F4FFF8"
                      fontSize="11"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      fontWeight="600"
                    >
                      Collection Tank
                    </text>
                  </g>

                  {/* Black Electronic Base Housing */}
                  <rect
                    x="146"
                    y="310"
                    width="272"
                    height="78"
                    rx="3"
                    fill="#0A100D"
                    stroke="#284A3A"
                    strokeWidth="1.8"
                  />

                  {/* Base Module 1: O2 Sensor */}
                  <g
                    className="cursor-pointer"
                    onMouseEnter={() => setSelectedId('o2Sensor')}
                    onClick={() => setSelectedId('o2Sensor')}
                  >
                    <rect
                      x="164"
                      y="330"
                      width="74"
                      height="36"
                      rx="3"
                      fill="#050B09"
                      stroke={selectedId === 'o2Sensor' ? '#39FF88' : '#2F5544'}
                      strokeWidth="1.6"
                    />
                    <text
                      x="201"
                      y="352"
                      textAnchor="middle"
                      fill="#39FF88"
                      fontSize="11"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      O₂ Sensor
                    </text>
                  </g>

                  {/* Base Module 2: CO2 Sensor */}
                  <g
                    className="cursor-pointer"
                    onMouseEnter={() => setSelectedId('co2Sensor')}
                    onClick={() => setSelectedId('co2Sensor')}
                  >
                    <rect
                      x="248"
                      y="330"
                      width="82"
                      height="36"
                      rx="3"
                      fill="#050B09"
                      stroke={selectedId === 'co2Sensor' ? '#39FF88' : '#2F5544'}
                      strokeWidth="1.6"
                    />
                    <text
                      x="289"
                      y="352"
                      textAnchor="middle"
                      fill="#F4FFF8"
                      fontSize="11"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      CO₂ Sensor
                    </text>
                  </g>

                  {/* Base Module 3: Red ON/OFF Rocker Switch */}
                  <g
                    className="cursor-pointer"
                    onMouseEnter={() => setSelectedId('powerSwitch')}
                    onClick={() => {
                      setSelectedId('powerSwitch');
                      setSystemOn((prev) => !prev);
                    }}
                  >
                    <rect
                      x="342"
                      y="328"
                      width="60"
                      height="40"
                      rx="3"
                      fill="#050B09"
                      stroke={selectedId === 'powerSwitch' ? '#39FF88' : '#3C5449'}
                      strokeWidth="1.5"
                    />
                    <rect
                      x="349"
                      y="335"
                      width="20"
                      height="26"
                      rx="2"
                      fill={systemOn ? '#DC2626' : '#6B1D1D'}
                    />
                    <text
                      x="359"
                      y="347"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      I
                    </text>
                    <text
                      x="359"
                      y="358"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="8"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      O
                    </text>
                    <text
                      x="384"
                      y="346"
                      textAnchor="middle"
                      fill="#F4FFF8"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      ON
                    </text>
                    <text
                      x="384"
                      y="358"
                      textAnchor="middle"
                      fill="#A0B3A8"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      OFF
                    </text>
                  </g>
                </svg>
              </div>
            ) : (
              <div>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-sm font-semibold text-[#F4FFF8]">
                      Uploaded Prototype Architecture Reference
                    </h3>
                    <p className="text-xs text-[#A0B3A8]">
                      Original layout showing 13 cm chamber, dual fans, water
                      motor, collection tank, and base sensors
                    </p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg border border-[#1A3E2E] bg-[#08130F]">
                  {!imgError ? (
                    <img
                      src="/assets/aistudio/image_4fc44e89.png"
                      alt="Algae Green Panel prototype reference diagram showing air inlet, CO2 fan, water inlet, water motor, collection tank, O2 sensor, CO2 sensor, and ON/OFF switch"
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="h-auto w-full object-contain"
                    />
                  ) : (
                    <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
                      <p className="font-display text-base font-semibold text-[#F4FFF8]">
                        Prototype Reference Diagram
                      </p>
                      <p className="mt-2 max-w-md text-xs text-[#A0B3A8]">
                        Switch back to Interactive Schematic to explore all 10
                        mapped modules of the 13 cm prototype.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Inspection Panel */}
          <div className="flex flex-col justify-between rounded-xl border border-[#163628] bg-[#050B09] p-6 lg:col-span-4">
            <div>
              <p className="font-mono text-xs text-[#39FF88]">
                Component Inspector
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-[#F4FFF8]">
                {activeSpec.name}
              </h3>
              <p className="mt-1 text-xs text-[#A0B3A8]">
                {activeSpec.subsystem}
              </p>

              <div className="mt-6 space-y-4 border-t border-[#143326] pt-5">
                <div>
                  <p className="text-xs font-semibold text-[#F4FFF8]">
                    Functional Role
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#A0B3A8]">
                    {activeSpec.summary}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#F4FFF8]">
                    Engineering Principle
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#A0B3A8]">
                    {activeSpec.principle}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-[#143326] pt-5">
              <p className="mb-3 text-xs font-medium text-[#A0B3A8]">
                Quick Component Selector
              </p>
              <div className="flex flex-wrap gap-1.5">
                {Object.values(COMPONENT_SPECS).map((spec) => (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(spec.id);
                      setViewMode('schematic');
                    }}
                    className={`rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                      selectedId === spec.id
                        ? 'bg-[#39FF88] font-semibold text-[#050B09]'
                        : 'border border-[#183A2B] bg-[#08130F] text-[#A0B3A8] hover:text-[#F4FFF8]'
                    }`}
                  >
                    {spec.name.split(' (')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
