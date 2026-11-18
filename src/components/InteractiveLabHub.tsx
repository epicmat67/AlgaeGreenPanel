import { useState } from 'react';
import {
  Sliders,
  Sun,
  TrendingUp,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type LabTab = 'spectrum' | 'scaling' | 'growth' | 'diagnostics';

const SPECTRUMS = [
  {
    id: 'white',
    name: 'Full-Spectrum White LED',
    wavelength: '400–700 nm',
    color: '#E9FFF2',
    beamColor: 'rgba(233, 255, 242, 0.3)',
    absorption: 'Balanced Broad Absorption',
    note: 'Matches the prototype top LED bar—provides balanced blue and red photons while allowing easy visual observation of culture density.',
  },
  {
    id: 'blue',
    name: '450 nm Blue Peak',
    wavelength: '450 nm',
    color: '#38BDF8',
    beamColor: 'rgba(56, 189, 248, 0.35)',
    absorption: 'High Chlorophyll A & B Uptake',
    note: 'Strongly absorbed by chlorophyll pigments to drive early photon energy capture inside shallow transparent chambers.',
  },
  {
    id: 'red',
    name: '660 nm Deep Red Peak',
    wavelength: '660 nm',
    color: '#FB7185',
    beamColor: 'rgba(251, 113, 133, 0.35)',
    absorption: 'Peak Photosystem II Efficiency',
    note: 'Red photons align directly with chlorophyll absorption peaks, supporting active carbon fixation with lower heat output.',
  },
  {
    id: 'green',
    name: '530 nm Green Wavelength',
    wavelength: '530 nm',
    color: '#39FF88',
    beamColor: 'rgba(57, 255, 136, 0.25)',
    absorption: 'Mostly Reflected (Why Algae Look Green)',
    note: 'Chlorophyll reflects most green wavelengths instead of absorbing them, giving the photobioreactor its bright emerald color.',
  },
];

const GROWTH_CURVE_DATA = [
  { day: 'Day 1', density: 12, phase: 'Lag Phase' },
  { day: 'Day 2', density: 18, phase: 'Lag Phase' },
  { day: 'Day 4', density: 42, phase: 'Exponential Phase' },
  { day: 'Day 6', density: 74, phase: 'Exponential Phase' },
  { day: 'Day 8', density: 90, phase: 'Linear Growth' },
  { day: 'Day 10', density: 96, phase: 'Stationary Harvest' },
  { day: 'Day 12', density: 95, phase: 'Stationary Harvest' },
];

const GROWTH_PHASES = [
  {
    id: 'Lag Phase',
    title: '01. Lag Phase (Acclimation)',
    summary:
      'Inoculated microalgae adapt to water temperature, dissolved CO₂, and LED illumination before rapid division begins.',
  },
  {
    id: 'Exponential Phase',
    title: '02. Exponential Phase (Peak Division)',
    summary:
      'Cells divide rapidly while light penetrates the clear medium; oxygen bubble output and CO₂ demand climb steadily.',
  },
  {
    id: 'Linear Growth',
    title: '03. Linear Growth (Self-Shading)',
    summary:
      'As culture becomes deeper green, water pump mixing becomes essential so inner cells rotate toward the outer light zone.',
  },
  {
    id: 'Stationary Harvest',
    title: '04. Stationary Phase (Collection Tank Harvest)',
    summary:
      'Culture reaches high density and can be partially drawn into the Collection Tank for biomass study while replenishing fresh medium.',
  },
];

const DIAGNOSTIC_SCENARIOS = [
  {
    id: 'bubbles',
    symptom: 'Low Bubble Column in Tank',
    subsystem: 'Air Inlet & Diffuser Line',
    cause: 'Air tubing pinch or clogged porous diffuser stone at the chamber floor.',
    action: [
      'Verify rocker switch power and inlet fan rotation.',
      'Inspect flexible clear air line for kinks.',
      'Rinse submerged diffuser stone to restore fine bubble dispersion.',
    ],
  },
  {
    id: 'settling',
    symptom: 'Algae Settling at Bottom',
    subsystem: 'Water Motor & Recirculation Loop',
    cause: 'Insufficient water motor flow or paused recirculation between panel and collection tank.',
    action: [
      'Confirm water motor power supply and inlet priming.',
      'Check right-side blue outlet fitting for airlocks.',
      'Increase circulation duty cycle to keep cells suspended.',
    ],
  },
  {
    id: 'light',
    symptom: 'Slow Culture Color Deepening',
    subsystem: 'Top LED Illumination Bar',
    cause: 'Short daily illumination window or misaligned top LED strip.',
    action: [
      'Ensure top LED bar sits flush above the 13 cm acrylic lid.',
      'Maintain consistent illumination intervals during trials.',
      'Wipe condensation on upper glass face for clear light transmission.',
    ],
  },
  {
    id: 'sensor',
    symptom: 'Unstable LCD Sensor Readout',
    subsystem: 'O₂ / CO₂ Base Bay & Arduino',
    cause: 'Sensor warm-up period incomplete or loose breadboard jumper header.',
    action: [
      'Allow NDIR CO₂ sensor 60–90 seconds warm-up after powering on.',
      'Inspect Arduino analog/serial pin headers inside the base housing.',
      'Verify ambient baseline calibration in fresh room air.',
    ],
  },
];

export default function InteractiveLabHub() {
  const [activeTab, setActiveTab] = useState<LabTab>('spectrum');
  const [spectrum, setSpectrum] = useState(SPECTRUMS[0]);

  // Conceptual scaling state
  const [panelCount, setPanelCount] = useState(4);
  const [lightHours, setLightHours] = useState(12);
  const [mixingMode, setMixingMode] = useState<'low' | 'medium' | 'high'>('medium');

  // Growth phase state
  const [selectedPhase, setSelectedPhase] = useState(GROWTH_PHASES[1]);

  // Diagnostics state
  const [selectedDiag, setSelectedDiag] = useState(DIAGNOSTIC_SCENARIOS[0]);

  const mixingFactor = mixingMode === 'low' ? 0.72 : mixingMode === 'medium' ? 1.0 : 1.24;
  const conceptualUptakeIndex = Math.round(
    panelCount * (lightHours / 12) * mixingFactor * 25
  );
  const conceptualO2Index = Math.round(conceptualUptakeIndex * 0.92);
  const mixingUniformity = mixingMode === 'low' ? 64 : mixingMode === 'medium' ? 86 : 96;

  return (
    <section
      id="interactive-lab"
      className="border-b border-[#143326] bg-[#050B09] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wider text-[#39FF88]">
              09 · Interactive Bio-Engineering Workbench
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#F4FFF8] sm:text-4xl">
              Explore, Tune &amp; Simulate the System
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#A0B3A8] sm:text-base">
              Four hands-on tools to understand light absorption, conceptual
              module scaling, algae growth cycles, and prototype troubleshooting.
            </p>
          </div>
        </div>

        {/* Segmented Tab Switcher */}
        <div
          role="tablist"
          aria-label="Interactive engineering tools"
          className="mt-8 grid grid-cols-2 gap-2 rounded-xl border border-[#163628] bg-[#08130F] p-1.5 sm:grid-cols-4"
        >
          {[
            { id: 'spectrum', label: 'Light Spectrum Tuner', icon: Sun },
            { id: 'scaling', label: 'Scaling Simulator', icon: Sliders },
            { id: 'growth', label: 'Growth Phase Curve', icon: TrendingUp },
            { id: 'diagnostics', label: 'Diagnostic Tester', icon: Wrench },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id as LabTab)}
                className={`flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-[#39FF88] text-[#050B09]'
                    : 'text-[#A0B3A8] hover:bg-[#09251B]/60 hover:text-[#F4FFF8]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Workspace */}
        <div className="mt-6 rounded-xl border border-[#163628] bg-[#08130F] p-5 sm:p-8">
          {/* TAB 1: LIGHT SPECTRUM TUNER */}
          {activeTab === 'spectrum' && (
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <p className="font-mono text-xs text-[#39FF88]">
                  Photosynthetic Wavelength Explorer
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[#F4FFF8]">
                  {spectrum.name}
                </h3>
                <p className="mt-1 font-mono text-xs text-[#A0B3A8]">
                  Band: {spectrum.wavelength} · {spectrum.absorption}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#A0B3A8]">
                  {spectrum.note}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  {SPECTRUMS.map((sp) => (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => setSpectrum(sp)}
                      className={`flex items-center gap-2.5 rounded-lg border px-3.5 py-3 text-left text-xs font-medium transition-colors ${
                        spectrum.id === sp.id
                          ? 'border-[#39FF88] bg-[#09251B] text-[#F4FFF8]'
                          : 'border-[#163628] bg-[#050B09] text-[#A0B3A8] hover:text-[#F4FFF8]'
                      }`}
                    >
                      <span
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: sp.color }}
                      />
                      <span className="truncate">{sp.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[#163628] bg-[#050B09] p-5 lg:col-span-6">
                <svg
                  viewBox="0 0 420 260"
                  className="h-auto w-full"
                  role="img"
                  aria-label="Photobioreactor light wavelength penetration visualization"
                >
                  <rect
                    x="60"
                    y="24"
                    width="300"
                    height="12"
                    rx="3"
                    fill={spectrum.color}
                  />
                  <polygon
                    points="70,36 350,36 370,224 50,224"
                    fill={spectrum.beamColor}
                  />
                  <rect
                    x="50"
                    y="62"
                    width="320"
                    height="168"
                    rx="6"
                    fill="#083A22"
                    fillOpacity="0.65"
                    stroke="#2B674B"
                    strokeWidth="2"
                  />
                  {[110, 175, 240, 305].map((cx, idx) => (
                    <circle
                      key={idx}
                      cx={cx}
                      cy={138 + (idx % 2) * 28}
                      r="16"
                      fill="#0E5A35"
                      stroke={spectrum.color}
                      strokeWidth="1.8"
                    />
                  ))}
                  <text
                    x="210"
                    y="248"
                    textAnchor="middle"
                    fill="#A0B3A8"
                    fontSize="11"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    Active Spectrum: {spectrum.wavelength}
                  </text>
                </svg>
              </div>
            </div>
          )}

          {/* TAB 2: CONCEPTUAL SCALING SIMULATOR */}
          {activeTab === 'scaling' && (
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="space-y-5 lg:col-span-6">
                <div>
                  <p className="font-mono text-xs text-[#39FF88]">
                    Conceptual Scaling Model · Educational Estimate
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-[#F4FFF8]">
                    Multi-Panel Architecture Sandbox
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#A0B3A8]">
                    Adjust array size, lighting schedule, and fluid mixing to
                    explore relative scaling behavior. Values represent
                    illustrative dimensionless indices, not physical lab outputs.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <label htmlFor="panel-count-slider" className="text-[#F4FFF8]">
                      Number of Modular Panels
                    </label>
                    <span className="font-mono text-[#39FF88] tabular-nums">
                      {panelCount} Panels
                    </span>
                  </div>
                  <input
                    id="panel-count-slider"
                    type="range"
                    min={1}
                    max={12}
                    value={panelCount}
                    onChange={(e) => setPanelCount(Number(e.target.value))}
                    className="mt-2 h-2 w-full cursor-pointer accent-[#39FF88]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <label htmlFor="light-hours-slider" className="text-[#F4FFF8]">
                      Daily Illumination Cycle
                    </label>
                    <span className="font-mono text-[#39FF88] tabular-nums">
                      {lightHours} hrs/day
                    </span>
                  </div>
                  <input
                    id="light-hours-slider"
                    type="range"
                    min={4}
                    max={16}
                    value={lightHours}
                    onChange={(e) => setLightHours(Number(e.target.value))}
                    className="mt-2 h-2 w-full cursor-pointer accent-[#39FF88]"
                  />
                </div>

                <div>
                  <p className="text-xs text-[#F4FFF8]">Circulation Mixing Rate</p>
                  <div className="mt-2 flex gap-2">
                    {(['low', 'medium', 'high'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setMixingMode(lvl)}
                        className={`flex-1 rounded-lg border py-2 text-xs font-medium capitalize transition-colors ${
                          mixingMode === lvl
                            ? 'border-[#39FF88] bg-[#09251B] text-[#39FF88]'
                            : 'border-[#163628] bg-[#050B09] text-[#A0B3A8]'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:col-span-6">
                <div className="rounded-xl border border-[#163628] bg-[#050B09] p-5">
                  <p className="text-xs text-[#A0B3A8]">Relative CO₂ Uptake Index</p>
                  <p className="mt-3 font-mono text-3xl font-bold tabular-nums text-[#39FF88]">
                    {conceptualUptakeIndex}
                  </p>
                  <p className="mt-2 text-[11px] text-[#A0B3A8]">
                    Conceptual Index Units
                  </p>
                </div>
                <div className="rounded-xl border border-[#163628] bg-[#050B09] p-5">
                  <p className="text-xs text-[#A0B3A8]">Relative O₂ Output Index</p>
                  <p className="mt-3 font-mono text-3xl font-bold tabular-nums text-[#F4FFF8]">
                    {conceptualO2Index}
                  </p>
                  <p className="mt-2 text-[11px] text-[#A0B3A8]">
                    Conceptual Index Units
                  </p>
                </div>
                <div className="rounded-xl border border-[#163628] bg-[#050B09] p-5">
                  <p className="text-xs text-[#A0B3A8]">Mixing Uniformity</p>
                  <p className="mt-3 font-mono text-3xl font-bold tabular-nums text-[#38BDF8]">
                    {mixingUniformity}%
                  </p>
                  <p className="mt-2 text-[11px] text-[#A0B3A8]">
                    Simulated Suspension Score
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CULTURE GROWTH PHASE EXPLORER */}
          {activeTab === 'growth' && (
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="mb-3 font-mono text-xs text-[#39FF88]">
                  Conceptual Microalgae Culture Growth Trajectory
                </p>
                <div className="h-64 w-full rounded-xl border border-[#163628] bg-[#050B09] p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={GROWTH_CURVE_DATA}>
                      <CartesianGrid stroke="#133023" strokeDasharray="3 3" />
                      <XAxis dataKey="day" stroke="#A0B3A8" fontSize={11} />
                      <YAxis stroke="#A0B3A8" fontSize={11} width={34} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#050B09',
                          border: '1px solid #1E4735',
                          borderRadius: '8px',
                          fontSize: '12px',
                          color: '#F4FFF8',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="density"
                        name="Relative Optical Density"
                        stroke="#39FF88"
                        strokeWidth={2.5}
                        dot={{ fill: '#39FF88', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-3 lg:col-span-5">
                <div className="flex flex-wrap gap-1.5">
                  {GROWTH_PHASES.map((phase) => (
                    <button
                      key={phase.id}
                      type="button"
                      onClick={() => setSelectedPhase(phase)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                        selectedPhase.id === phase.id
                          ? 'bg-[#39FF88] text-[#050B09]'
                          : 'border border-[#163628] bg-[#050B09] text-[#A0B3A8] hover:text-[#F4FFF8]'
                      }`}
                    >
                      {phase.id}
                    </button>
                  ))}
                </div>
                <div className="rounded-xl border border-[#163628] bg-[#050B09] p-5">
                  <h3 className="font-display text-lg font-semibold text-[#F4FFF8]">
                    {selectedPhase.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A0B3A8]">
                    {selectedPhase.summary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROTOTYPE DIAGNOSTIC TESTER */}
          {activeTab === 'diagnostics' && (
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="space-y-2.5 lg:col-span-5">
                <p className="mb-2 font-mono text-xs text-[#39FF88]">
                  Select Observed Prototype Symptom
                </p>
                {DIAGNOSTIC_SCENARIOS.map((diag) => (
                  <button
                    key={diag.id}
                    type="button"
                    onClick={() => setSelectedDiag(diag)}
                    className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-xs font-medium transition-colors ${
                      selectedDiag.id === diag.id
                        ? 'border-[#39FF88] bg-[#09251B] text-[#F4FFF8]'
                        : 'border-[#163628] bg-[#050B09] text-[#A0B3A8] hover:text-[#F4FFF8]'
                    }`}
                  >
                    <span>{diag.symptom}</span>
                    <span className="font-mono text-[11px] text-[#39FF88]">
                      Inspect
                    </span>
                  </button>
                ))}
              </div>

              <div className="rounded-xl border border-[#163628] bg-[#050B09] p-6 lg:col-span-7">
                <p className="font-mono text-xs text-[#39FF88]">
                  Affected Subsystem: {selectedDiag.subsystem}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-[#F4FFF8]">
                  {selectedDiag.symptom}
                </h3>
                <p className="mt-2 text-sm text-[#A0B3A8]">
                  <span className="font-semibold text-[#F4FFF8]">Likely Cause: </span>
                  {selectedDiag.cause}
                </p>
                <div className="mt-5 space-y-2.5 border-t border-[#143326] pt-4">
                  <p className="text-xs font-semibold text-[#F4FFF8]">
                    Recommended Bench Verification Steps:
                  </p>
                  {selectedDiag.action.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#A0B3A8]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#39FF88]" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
