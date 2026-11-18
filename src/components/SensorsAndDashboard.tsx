import { useEffect, useState } from 'react';
import {
  Activity,
  Cpu,
  Pause,
  Play,
  Radio,
  Thermometer,
  Wind,
  AlertCircle,
  Download,
  Zap,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type LightPreset = 'low' | 'standard' | 'peak';

interface TelemetryPoint {
  tick: string;
  co2Ppm: number;
  o2Pct: number;
  tempC: number;
}

const O2_STEPS = [
  'Air reaches the sensor’s electrochemical sensing element.',
  'The sensing membrane responds chemically to oxygen molecules.',
  'The transducer generates a proportional electrical voltage signal.',
  'Arduino reads and processes the analog/digital input signal.',
  'Oxygen concentration (%) is formatted and displayed on an LCD.',
];

const CO2_STEPS = [
  'Ambient air enters the optical measuring chamber.',
  'An infrared emitter projects light across the chamber.',
  'CO₂ molecules absorb infrared light at a specific 4.26 µm wavelength.',
  'An optical detector measures the remaining unabsorbed infrared light.',
  'The microcontroller calculates CO₂ concentration in PPM.',
];

function CircularGauge({
  value,
  min,
  max,
  label,
  unit,
  accent,
  displayValue,
}: {
  value: number;
  min: number;
  max: number;
  label: string;
  unit: string;
  accent: string;
  displayValue: string;
}) {
  const ratio = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - ratio);

  return (
    <div className="flex flex-col items-center rounded-xl border border-[#163628] bg-[#08130F] p-5">
      <p className="text-xs font-medium text-[#A0B3A8]">{label}</p>
      <div className="relative mt-3 flex h-24 w-24 items-center justify-center">
        <svg viewBox="0 0 96 96" className="h-24 w-24 -rotate-90" aria-hidden="true">
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="#0D281D"
            strokeWidth="7"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke={accent}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-lg font-bold tabular-nums text-[#F4FFF8]">
            {displayValue}
          </span>
          <span className="font-mono text-[10px] text-[#A0B3A8]">{unit}</span>
        </div>
      </div>
      <span className="mt-2 font-mono text-[11px] text-[#A0B3A8]">
        Simulated Demo
      </span>
    </div>
  );
}

export default function SensorsAndDashboard() {
  const [activeO2Step, setActiveO2Step] = useState(0);
  const [activeCo2Step, setActiveCo2Step] = useState(0);

  // Dashboard simulation state (clearly labeled as SIMULATED DATA)
  const [isStreaming, setIsStreaming] = useState(true);
  const [lightPreset, setLightPreset] = useState<LightPreset>('standard');
  const [pumpActive, setPumpActive] = useState(true);

  const [history, setHistory] = useState<TelemetryPoint[]>(() => {
    const base: TelemetryPoint[] = [];
    for (let i = 9; i >= 0; i--) {
      base.push({
        tick: `-${i * 2}s`,
        co2Ppm: 545 - (9 - i) * 6 + (i % 3) * 4,
        o2Pct: Number((20.88 + (9 - i) * 0.03).toFixed(2)),
        tempC: Number((24.2 + (i % 2) * 0.2).toFixed(1)),
      });
    }
    return base;
  });

  useEffect(() => {
    if (!isStreaming) return;

    const interval = window.setInterval(() => {
      setHistory((prev) => {
        const last = prev[prev.length - 1];
        const targetCo2 =
          lightPreset === 'peak'
            ? pumpActive
              ? 435
              : 495
            : lightPreset === 'standard'
            ? pumpActive
              ? 485
              : 540
            : 585;

        const targetO2 =
          lightPreset === 'peak'
            ? pumpActive
              ? 21.45
              : 21.15
            : lightPreset === 'standard'
            ? pumpActive
              ? 21.18
              : 20.98
            : 20.86;

        const targetTemp =
          lightPreset === 'peak' ? 26.4 : lightPreset === 'standard' ? 24.6 : 22.8;

        const jitter = (Math.random() - 0.5) * 6;
        const nextCo2 = Math.round(
          last.co2Ppm + (targetCo2 - last.co2Ppm) * 0.22 + jitter
        );
        const nextO2 = Number(
          (
            last.o2Pct +
            (targetO2 - last.o2Pct) * 0.22 +
            (Math.random() - 0.5) * 0.03
          ).toFixed(2)
        );
        const nextTemp = Number(
          (
            last.tempC +
            (targetTemp - last.tempC) * 0.2 +
            (Math.random() - 0.5) * 0.1
          ).toFixed(1)
        );

        const nowLabel = new Date().toLocaleTimeString([], {
          minute: '2-digit',
          second: '2-digit',
        });

        return [
          ...prev.slice(1),
          {
            tick: nowLabel,
            co2Ppm: Math.max(380, Math.min(800, nextCo2)),
            o2Pct: Math.max(20.5, Math.min(22.0, nextO2)),
            tempC: Math.max(20.0, Math.min(30.0, nextTemp)),
          },
        ];
      });
    }, 1800);

    return () => window.clearInterval(interval);
  }, [isStreaming, lightPreset, pumpActive]);

  const latest = history[history.length - 1];

  const handleSimulateCo2Spike = () => {
    const nowLabel = new Date().toLocaleTimeString([], {
      minute: '2-digit',
      second: '2-digit',
    });
    setHistory((prev) => [
      ...prev.slice(1),
      {
        tick: nowLabel,
        co2Ppm: 720,
        o2Pct: Number(Math.max(20.6, prev[prev.length - 1].o2Pct - 0.12).toFixed(2)),
        tempC: prev[prev.length - 1].tempC,
      },
    ]);
  };

  const handleExportCsv = () => {
    const header = 'Time,Simulated_CO2_PPM,Simulated_O2_Pct,Simulated_Temp_C\n';
    const rows = history
      .map((pt) => `${pt.tick},${pt.co2Ppm},${pt.o2Pct},${pt.tempC}`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'algae-panel-simulated-telemetry.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* SECTION 9: SMART SENSOR TECHNOLOGY */}
      <section
        id="sensors"
        className="border-b border-[#143326] bg-[#050B09] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-wider text-[#39FF88]">
                07 · Electronic Instrumentation
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#F4FFF8] sm:text-4xl">
                Intelligence Behind the Green Panel
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#A0B3A8] sm:text-base">
                Electronic sensing modules integrated into the prototype base
                translate gas composition into structured digital readings via an
                Arduino microcontroller. All live numerals below are simulated
                demonstrations.
              </p>
            </div>
            <p className="font-mono text-xs text-[#A0B3A8]">
              Sensor Display Mode · Simulated Demonstration
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-[#163628] bg-[#08130F]">
            <div className="grid lg:grid-cols-12 lg:items-center">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#050B09] lg:col-span-5 lg:aspect-auto lg:h-full">
                <img
                  src="/src/assets/images/arduino_sensor_rig_1794930828223.jpg"
                  alt="Studio hardware setup showing Arduino Uno wired to infrared CO2 sensor, electrochemical O2 sensor, and green 16x2 LCD display"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050B09]/90 via-[#050B09]/40 to-transparent p-4">
                  <p className="font-mono text-[11px] text-[#39FF88]">
                    Illustrative Hardware Bench · Simulated Values Shown on LCD
                  </p>
                </div>
              </div>
              <div className="p-6 lg:col-span-7">
                <p className="font-mono text-xs text-[#39FF88]">
                  Arduino Sensing Architecture
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[#F4FFF8]">
                  How Physical Sensors Connect to the Panel
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#A0B3A8]">
                  Both the oxygen sensor and the NDIR infrared CO₂ module feed
                  signal lines into an Arduino microcontroller mounted inside
                  the base housing. The Arduino samples each channel, converts
                  raw signals into readable percentages and PPM values, and
                  outputs live readouts to a backlit 16×2 LCD.
                </p>
                <div className="mt-5 grid gap-3 border-t border-[#143326] pt-4 sm:grid-cols-3 text-xs">
                  <div>
                    <p className="font-semibold text-[#F4FFF8]">1. Gas Sampling</p>
                    <p className="mt-0.5 text-[#A0B3A8]">Air reaches O₂ &amp; CO₂ cells</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#F4FFF8]">2. Arduino ADC</p>
                    <p className="mt-0.5 text-[#A0B3A8]">Signal calibration &amp; scaling</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#F4FFF8]">3. LCD Output</p>
                    <p className="mt-0.5 text-[#A0B3A8]">Instant local readability</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* A. OXYGEN SENSOR CARD */}
            <article className="flex flex-col justify-between rounded-xl border border-[#163628] bg-[#08130F] p-6">
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-[#143326] pb-4">
                  <div>
                    <p className="font-mono text-xs text-[#39FF88]">
                      Module A · Oxygen Sensor
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-[#F4FFF8]">
                      Electrochemical O₂ Sensing & LCD Output
                    </h3>
                  </div>
                  <Cpu className="h-5 w-5 shrink-0 text-[#39FF88]" />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#A0B3A8]">
                  The oxygen sensor measures oxygen concentration in the
                  surrounding air or designated sampling point and relays
                  calibrated voltage signals to Arduino.
                </p>

                {/* Animated O2 Sensing + Arduino 16x2 LCD Visualization */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-[#143326] bg-[#050B09] p-4">
                    <svg
                      viewBox="0 0 240 130"
                      className="h-auto w-full"
                      role="img"
                      aria-label="Oxygen sensor sensing element to Arduino signal diagram"
                    >
                      {/* Sensor Housing */}
                      <rect x="14" y="25" width="74" height="80" rx="6" fill="#09251B" stroke="#39FF88" strokeWidth="1.5" />
                      <circle cx="51" cy="58" r="18" fill="#050B09" stroke="#00C878" strokeWidth="1.5" />
                      <text x="51" y="62" textAnchor="middle" fill="#39FF88" fontSize="11" fontFamily="JetBrains Mono, monospace">
                        O₂
                      </text>
                      <text x="51" y="95" textAnchor="middle" fill="#A0B3A8" fontSize="9" fontFamily="JetBrains Mono, monospace">
                        Sensing Cell
                      </text>

                      {/* Signal Pulse Line */}
                      <path
                        d="M 92 65 L 148 65"
                        stroke="#39FF88"
                        strokeWidth="2"
                        strokeDasharray="6 6"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          from="24"
                          to="0"
                          dur="1.4s"
                          repeatCount="indefinite"
                        />
                      </path>

                      {/* Arduino Board Block */}
                      <rect x="150" y="32" width="76" height="66" rx="5" fill="#0B1F2E" stroke="#38BDF8" strokeWidth="1.5" />
                      <text x="188" y="62" textAnchor="middle" fill="#F4FFF8" fontSize="10" fontWeight="600">
                        Arduino
                      </text>
                      <text x="188" y="78" textAnchor="middle" fill="#38BDF8" fontSize="9" fontFamily="JetBrains Mono, monospace">
                        ADC Read
                      </text>
                    </svg>
                  </div>

                  {/* Simulated 16x2 Arduino LCD Screen */}
                  <div className="flex flex-col justify-between rounded-lg border border-[#1B4231] bg-[#050B09] p-4">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#A0B3A8]">
                      <span>16×2 LCD Interface</span>
                      <span>SIMULATED DEMO</span>
                    </div>
                    <div className="my-3 rounded border-2 border-[#1E3B2B] bg-[#0B3B1E] p-3 font-mono text-xs leading-relaxed text-[#A7FFCB] shadow-inner">
                      <div>AGP O2 MONITOR</div>
                      <div className="tabular-nums">
                        O2 CONC: {latest.o2Pct.toFixed(2)} %
                      </div>
                    </div>
                    <p className="text-[11px] text-[#A0B3A8]">
                      Demonstrates how processed Arduino values render on hardware.
                    </p>
                  </div>
                </div>

                {/* 5-Step Interactive Working Process */}
                <div className="mt-5">
                  <p className="mb-2.5 text-xs font-semibold text-[#F4FFF8]">
                    5-Step Working Process (Click step to highlight)
                  </p>
                  <div className="space-y-2">
                    {O2_STEPS.map((step, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveO2Step(idx)}
                        className={`flex w-full items-start gap-3 rounded-lg border px-3.5 py-2.5 text-left text-xs transition-colors ${
                          activeO2Step === idx
                            ? 'border-[#39FF88]/60 bg-[#09251B]/80 text-[#F4FFF8]'
                            : 'border-[#143326] bg-[#050B09] text-[#A0B3A8] hover:text-[#F4FFF8]'
                        }`}
                      >
                        <span className="font-mono font-semibold text-[#39FF88]">
                          0{idx + 1}
                        </span>
                        <span>{step}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* B. CO2 SENSOR CARD */}
            <article className="flex flex-col justify-between rounded-xl border border-[#163628] bg-[#08130F] p-6">
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-[#143326] pb-4">
                  <div>
                    <p className="font-mono text-xs text-[#39FF88]">
                      Module B · CO₂ Sensor (NDIR)
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-[#F4FFF8]">
                      Infrared Absorption & PPM Calculation
                    </h3>
                  </div>
                  <Wind className="h-5 w-5 shrink-0 text-[#39FF88]" />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#A0B3A8]">
                  A CO₂ sensor measures carbon dioxide concentration in air by
                  detecting how much specific-wavelength infrared light is
                  absorbed by CO₂ molecules inside the optical chamber.
                </p>

                {/* Animated Infrared Beam + CO2 Molecules + Digital PPM */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-[#143326] bg-[#050B09] p-4">
                    <svg
                      viewBox="0 0 240 130"
                      className="h-auto w-full"
                      role="img"
                      aria-label="NDIR infrared beam passing through CO2 molecules to detector"
                    >
                      {/* Chamber Box */}
                      <rect x="14" y="20" width="212" height="90" rx="6" fill="#071611" stroke="#1E4735" strokeWidth="1.5" />
                      {/* IR Emitter */}
                      <rect x="20" y="45" width="22" height="40" rx="3" fill="#7C2D12" stroke="#FB923C" strokeWidth="1.4" />
                      <text x="31" y="102" textAnchor="middle" fill="#FB923C" fontSize="9" fontFamily="JetBrains Mono, monospace">
                        IR LED
                      </text>

                      {/* Infrared Waves */}
                      <line x1="46" y1="65" x2="194" y2="65" stroke="#FB923C" strokeWidth="2.5" strokeDasharray="8 6">
                        <animate
                          attributeName="stroke-dashoffset"
                          from="28"
                          to="0"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </line>

                      {/* CO2 Molecules */}
                      {[88, 122, 156].map((cx, idx) => (
                        <g key={idx}>
                          <circle cx={cx} cy={52 + (idx % 2) * 24} r="7" fill="#1F3D30" stroke="#A0B3A8" strokeWidth="1.2" />
                          <text
                            x={cx}
                            y={55 + (idx % 2) * 24}
                            textAnchor="middle"
                            fill="#F4FFF8"
                            fontSize="7"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            CO₂
                          </text>
                        </g>
                      ))}

                      {/* Optical Detector */}
                      <rect x="198" y="45" width="22" height="40" rx="3" fill="#09251B" stroke="#39FF88" strokeWidth="1.4" />
                      <text x="206" y="102" textAnchor="middle" fill="#39FF88" fontSize="9" fontFamily="JetBrains Mono, monospace">
                        Detector
                      </text>
                    </svg>
                  </div>

                  {/* Simulated Digital PPM Display */}
                  <div className="flex flex-col justify-between rounded-lg border border-[#1B4231] bg-[#050B09] p-4">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#A0B3A8]">
                      <span>Arduino Serial Monitor</span>
                      <span>SIMULATED DEMO</span>
                    </div>
                    <div className="my-3 rounded border border-[#1E3B2B] bg-[#030806] p-3">
                      <p className="text-[11px] font-mono text-[#A0B3A8]">
                        CALCULATED CONCENTRATION
                      </p>
                      <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#39FF88]">
                        {latest.co2Ppm}{' '}
                        <span className="text-xs font-normal text-[#A0B3A8]">
                          PPM
                        </span>
                      </p>
                    </div>
                    <p className="text-[11px] text-[#A0B3A8]">
                      Simulated readout illustrating PPM scaling from IR absorption.
                    </p>
                  </div>
                </div>

                {/* 5-Step Working Process */}
                <div className="mt-5">
                  <p className="mb-2.5 text-xs font-semibold text-[#F4FFF8]">
                    5-Step Infrared Detection Process (Click step to highlight)
                  </p>
                  <div className="space-y-2">
                    {CO2_STEPS.map((step, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveCo2Step(idx)}
                        className={`flex w-full items-start gap-3 rounded-lg border px-3.5 py-2.5 text-left text-xs transition-colors ${
                          activeCo2Step === idx
                            ? 'border-[#39FF88]/60 bg-[#09251B]/80 text-[#F4FFF8]'
                            : 'border-[#143326] bg-[#050B09] text-[#A0B3A8] hover:text-[#F4FFF8]'
                        }`}
                      >
                        <span className="font-mono font-semibold text-[#39FF88]">
                          0{idx + 1}
                        </span>
                        <span>{step}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SECTION 10: INTERACTIVE LIVE MONITORING DASHBOARD */}
      <section
        id="dashboard"
        className="border-b border-[#143326] bg-[#07100D] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-wider text-[#39FF88]">
                08 · Simulated Control Console
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#F4FFF8] sm:text-4xl">
                Interactive Environmental Monitoring Dashboard
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#A0B3A8] sm:text-base">
                Explore how the Arduino sensor suite and web telemetry UI model
                gas and thermal dynamics under different illumination and pump
                conditions.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-amber-400/35 bg-amber-950/30 px-3.5 py-2 text-xs text-amber-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
              <span>
                SIMULATED DATA · Physical Arduino sensors not connected
              </span>
            </div>
          </div>

          {/* Industrial Console Frame */}
          <div className="mt-10 rounded-xl border border-[#1B3E2E] bg-[#050B09] p-5 sm:p-6">
            {/* Top Telemetry Ribbon & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#143326] pb-5">
              <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
                <div className="flex items-center gap-2">
                  {isStreaming && (
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-[#39FF88]"
                    />
                  )}
                  <span className="text-[#F4FFF8]">
                    System Status:{' '}
                    <span className="text-[#39FF88]">
                      {isStreaming ? 'Simulated Stream Active' : 'Stream Paused'}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#A0B3A8]">
                  <Radio className="h-3.5 w-3.5 text-amber-400" />
                  <span>Sensor Link: Simulated Demo Mode (Hardware Offline)</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 rounded-lg border border-[#163628] bg-[#08130F] p-1">
                  {(
                    [
                      { id: 'low', label: 'Low Light' },
                      { id: 'standard', label: 'Standard LED' },
                      { id: 'peak', label: 'Peak LED' },
                    ] as const
                  ).map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setLightPreset(preset.id)}
                      className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                        lightPreset === preset.id
                          ? 'bg-[#39FF88] text-[#050B09]'
                          : 'text-[#A0B3A8] hover:text-[#F4FFF8]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setPumpActive((p) => !p)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                    pumpActive
                      ? 'border-[#39FF88]/50 bg-[#09251B] text-[#39FF88]'
                      : 'border-[#253D33] bg-[#08130F] text-[#A0B3A8]'
                  }`}
                >
                  {pumpActive ? 'Circulation: On' : 'Circulation: Off'}
                </button>

                <button
                  type="button"
                  onClick={handleSimulateCo2Spike}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/40 bg-amber-950/30 px-3 py-2 text-xs font-medium text-amber-200 transition-colors hover:border-amber-300 whitespace-nowrap"
                >
                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                  <span>Simulate CO₂ Spike</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E4735] bg-[#08130F] px-3 py-2 text-xs font-medium text-[#F4FFF8] hover:border-[#39FF88]/60 whitespace-nowrap"
                >
                  <Download className="h-3.5 w-3.5 text-[#39FF88]" />
                  <span>Export Demo CSV</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsStreaming((s) => !s)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E4735] bg-[#08130F] px-3 py-2 text-xs font-medium text-[#F4FFF8] hover:border-[#39FF88]/60 whitespace-nowrap"
                >
                  {isStreaming ? (
                    <>
                      <Pause className="h-3.5 w-3.5" />
                      <span>Pause Stream</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" />
                      <span>Resume Stream</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Gauges Row */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <CircularGauge
                value={latest.co2Ppm}
                min={350}
                max={750}
                label="CO₂ Concentration"
                unit="PPM"
                accent="#A0B3A8"
                displayValue={`${latest.co2Ppm}`}
              />
              <CircularGauge
                value={latest.o2Pct}
                min={20.0}
                max={22.0}
                label="Oxygen Concentration"
                unit="%"
                accent="#39FF88"
                displayValue={latest.o2Pct.toFixed(2)}
              />
              <CircularGauge
                value={latest.tempC}
                min={18}
                max={34}
                label="Culture Temperature"
                unit="°C"
                accent="#38BDF8"
                displayValue={latest.tempC.toFixed(1)}
              />

              <div className="flex flex-col justify-between rounded-xl border border-[#163628] bg-[#08130F] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#A0B3A8]">
                    Hardware & Telemetry
                  </span>
                  <Activity className="h-4 w-4 text-[#39FF88]" />
                </div>
                <div className="my-3 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#A0B3A8]">Mode</span>
                    <span className="font-mono text-amber-300">DEMO DATA</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A0B3A8]">LED Array</span>
                    <span className="font-mono text-[#F4FFF8] capitalize">
                      {lightPreset}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A0B3A8]">Water Motor</span>
                    <span className="font-mono text-[#39FF88]">
                      {pumpActive ? 'Active' : 'Standby'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-[#143326] pt-3 text-[11px] text-[#A0B3A8]">
                  <Thermometer className="h-3.5 w-3.5 text-[#38BDF8]" />
                  <span>Preset adjusts simulated curve</span>
                </div>
              </div>
            </div>

            {/* Recharts Dual-Series Time-Series Chart */}
            <div className="mt-6 rounded-xl border border-[#163628] bg-[#08130F] p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-base font-semibold text-[#F4FFF8]">
                    Simulated CO₂ (PPM) & O₂ (%) Trend Window
                  </h3>
                  <p className="text-xs text-[#A0B3A8]">
                    Illustrative inverse correlation model — clearly marked as
                    simulated demonstration data
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-[#A0B3A8]">— CO₂ (PPM)</span>
                  <span className="text-[#39FF88]">— O₂ (%)</span>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={history}
                    margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="co2Area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A0B3A8" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#A0B3A8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="o2Area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#39FF88" stopOpacity={0.28} />
                        <stop offset="95%" stopColor="#39FF88" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#133023" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="tick"
                      stroke="#A0B3A8"
                      fontSize={11}
                      tickLine={false}
                    />
                    <YAxis
                      yAxisId="left"
                      domain={[360, 700]}
                      stroke="#A0B3A8"
                      fontSize={11}
                      tickLine={false}
                      width={40}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      domain={[20.5, 22.0]}
                      stroke="#39FF88"
                      fontSize={11}
                      tickLine={false}
                      width={44}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#050B09',
                        border: '1px solid #1E4735',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#F4FFF8',
                      }}
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="co2Ppm"
                      name="Simulated CO₂ (PPM)"
                      stroke="#A0B3A8"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#co2Area)"
                      isAnimationActive={false}
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="o2Pct"
                      name="Simulated O₂ (%)"
                      stroke="#39FF88"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#o2Area)"
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
