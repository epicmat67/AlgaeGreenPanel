import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Search, X } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question:
      'What primary gas do microalgae absorb as their carbon source during photosynthesis?',
    options: ['Nitrogen (N₂)', 'Carbon Dioxide (CO₂)', 'Argon (Ar)', 'Methane (CH₄)'],
    correctIndex: 1,
    explanation:
      'Dissolved CO₂ acts as the inorganic carbon input converted into organic algal biomass using light energy.',
  },
  {
    question:
      'How does the prototype CO₂ sensor determine carbon dioxide concentration in PPM?',
    options: [
      'Measuring infrared light absorbed at a specific wavelength',
      'Weighing air samples on a micro-scale',
      'Counting water bubbles manually',
      'Detecting sound frequency changes',
    ],
    correctIndex: 0,
    explanation:
      'NDIR CO₂ sensors emit infrared light; CO₂ molecules absorb a specific wavelength, and the detector calculates concentration from remaining light.',
  },
  {
    question:
      'Why does the Algae Green Panel continuously circulate liquid through the Water Motor and Collection Tank?',
    options: [
      'To freeze the algae culture',
      'To turn off the LED light automatically',
      'To distribute nutrients, prevent settling, and improve light exposure',
      'To block oxygen from escaping',
    ],
    correctIndex: 2,
    explanation:
      'Continuous circulation mixes cells evenly, prevents sedimentation at the tank bottom, and rotates cells toward the illuminated glass surface.',
  },
  {
    question:
      'Which microcontroller processes electrical signals from the O₂ and CO₂ sensors in this prototype?',
    options: ['Arduino', 'Hydraulic Valve', 'Acrylic Tank', 'Air Stone'],
    correctIndex: 0,
    explanation:
      'An Arduino microcontroller reads sensor signals, converts them into readable % and PPM values, and displays them on an LCD.',
  },
  {
    question:
      'What does the prototype realistically demonstrate in its current 13 cm benchtop form?',
    options: [
      'Eliminating all pollution across an entire city',
      'Biological CO₂ utilisation, O₂ release, biomass growth, and smart monitoring',
      'Powering an entire commercial skyscraper grid',
      'Replacing all municipal parks immediately',
    ],
    correctIndex: 1,
    explanation:
      'The benchtop prototype demonstrates core biological and sensor principles; large-scale urban deployment requires further engineering and testing.',
  },
];

const JUMP_SECTIONS = [
  { label: 'Hero & 3D Reactor Preview', href: '#hero' },
  { label: '01 · Project Overview', href: '#overview' },
  { label: '02 · The Urban Problem', href: '#problem' },
  { label: '03 · Microalgae Microscope', href: '#microalgae' },
  { label: '04 · Interactive Prototype Schematic', href: '#how-it-works' },
  { label: '05 · Continuous Water Loop', href: '#water-loop' },
  { label: '06 · Photosynthesis Equation', href: '#photosynthesis' },
  { label: '07 · Smart Sensor Technology', href: '#sensors' },
  { label: '08 · Simulated Monitoring Dashboard', href: '#dashboard' },
  { label: '09 · Interactive Bio-Engineering Lab', href: '#interactive-lab' },
  { label: '10 · Real-World Applications & Vision', href: '#applications' },
  { label: '11 · Bio-Engineering Knowledge Quiz', href: '#quiz' },
  { label: '12 · Meet the Team', href: '#team' },
  { label: '13 · Development Journey', href: '#journey' },
];

export function ScrollProgressAndRail() {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total > 0) {
        setScrollPct(Math.min(100, Math.round((window.scrollY / total) * 100)));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-16 right-0 left-0 z-30 h-[2px] bg-transparent"
    >
      <div
        className="h-full bg-[#39FF88] transition-[width] duration-75"
        style={{ width: `${scrollPct}%` }}
      />
    </div>
  );
}

export function QuickJumpPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  if (!open) return null;

  const filtered = JUMP_SECTIONS.filter((s) =>
    s.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick section navigator"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 px-4 pt-24 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-[#22523B] bg-[#08130F] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[#163628] px-4 py-3">
          <Search className="h-4 w-4 text-[#39FF88]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to any section or interactive tool..."
            className="w-full bg-transparent text-sm text-[#F4FFF8] placeholder:text-[#A0B3A8] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick jump"
            className="rounded p-1 text-[#A0B3A8] hover:text-[#F4FFF8]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto p-2">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex min-h-[42px] items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-[#F4FFF8] transition-colors hover:bg-[#09251B] hover:text-[#39FF88]"
              >
                <span>{item.label}</span>
                <span className="font-mono text-[10px] text-[#A0B3A8]">
                  Go →
                </span>
              </a>
            ))
          ) : (
            <p className="p-4 text-center text-xs text-[#A0B3A8]">
              No matching section found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ScienceQuizSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (idx === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((i) => i + 1);
      setSelectedOption(null);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <section
      id="quiz"
      className="border-b border-[#143326] bg-[#050B09] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-wider text-[#39FF88]">
              11 · Interactive Knowledge Check
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#F4FFF8] sm:text-4xl">
              Test Your Bio-Engineering Understanding
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#A0B3A8] sm:text-base">
              Quickly review the key scientific and engineering principles
              behind microalgae photosynthesis, fluid mixing, and smart sensor
              monitoring.
            </p>
            <div className="mt-6 flex items-center gap-6 border-t border-[#143326] pt-4 text-xs font-mono">
              <div>
                <span className="text-[#A0B3A8]">Progress: </span>
                <span className="text-[#39FF88] tabular-nums">
                  {finished ? QUIZ_QUESTIONS.length : currentIdx + 1} / {QUIZ_QUESTIONS.length}
                </span>
              </div>
              <div>
                <span className="text-[#A0B3A8]">Score: </span>
                <span className="text-[#F4FFF8] tabular-nums">
                  {score} / {QUIZ_QUESTIONS.length}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#163628] bg-[#08130F] p-6 sm:p-8 lg:col-span-7">
            {!finished ? (
              <div>
                <p className="font-mono text-xs text-[#39FF88]">
                  Question 0{currentIdx + 1}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-[#F4FFF8]">
                  {currentQ.question}
                </h3>

                <div className="mt-5 space-y-2.5">
                  {currentQ.options.map((opt, idx) => {
                    const isPicked = selectedOption === idx;
                    const isCorrect = idx === currentQ.correctIndex;
                    const showResult = selectedOption !== null;

                    let styleClass =
                      'border-[#163628] bg-[#050B09] text-[#F4FFF8] hover:border-[#39FF88]/50';
                    if (showResult && isCorrect) {
                      styleClass =
                        'border-[#39FF88] bg-[#09251B] text-[#39FF88]';
                    } else if (showResult && isPicked && !isCorrect) {
                      styleClass =
                        'border-rose-500/70 bg-rose-950/30 text-rose-200';
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelect(idx)}
                        className={`flex min-h-[44px] w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${styleClass}`}
                      >
                        <span>{opt}</span>
                        {showResult && isCorrect && (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#39FF88]" />
                        )}
                        {showResult && isPicked && !isCorrect && (
                          <XCircle className="h-4 w-4 shrink-0 text-rose-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <div className="mt-5 rounded-lg border border-[#1B4231] bg-[#050B09] p-4">
                    <p className="text-xs leading-relaxed text-[#A0B3A8]">
                      {currentQ.explanation}
                    </p>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="mt-4 rounded-lg bg-[#39FF88] px-4 py-2 text-xs font-semibold text-[#050B09] transition-colors hover:bg-[#00C878]"
                    >
                      {currentIdx + 1 < QUIZ_QUESTIONS.length
                        ? 'Next Question'
                        : 'View Summary'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 text-center">
                <p className="font-mono text-xs text-[#39FF88]">
                  Knowledge Check Complete
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold text-[#F4FFF8]">
                  You scored {score} out of {QUIZ_QUESTIONS.length}
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm text-[#A0B3A8]">
                  Every core subsystem—photosynthesis, hydraulic mixing, and
                  electronic gas sensing—works together to make this compact
                  biotech prototype tick.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#39FF88] px-5 py-2.5 text-xs font-semibold text-[#050B09] transition-colors hover:bg-[#00C878]"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Try Quiz Again</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
