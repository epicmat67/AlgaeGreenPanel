import { useState } from 'react';
import {
  ArrowUp,
  Code2,
  Terminal,
  Layers,
  Cpu,
  ShieldCheck,
  Briefcase,
  Package,
  Coins,
} from 'lucide-react';
import BioVideoBackdrop from './BioVideoBackdrop';

type TeamCategory = 'all' | 'executive' | 'tech' | 'support';

interface TeamMember {
  id: string;
  name: string;
  initials: string;
  roleCode: string;
  roleTitle: string;
  category: Exclude<TeamCategory, 'all'>;
  responsibility: string;
  ownedSystems: string[];
  focusArea: string;
  isFeaturedTech?: boolean;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'krishan',
    name: 'KRISHAN',
    initials: 'KR',
    roleCode: 'CTO',
    roleTitle: 'Chief Technology Officer',
    category: 'tech',
    responsibility:
      'Engineering, Technology, Website Development & Digital Infrastructure.',
    ownedSystems: [
      'Website Design & Full-Stack Architecture',
      'Interactive Prototype Schematic & Data Visualizations',
      'Sensor-to-Dashboard Digital Interface',
    ],
    focusArea: 'Technical Architecture & Digital Experience',
    isFeaturedTech: true,
  },
  {
    id: 'shivam',
    name: 'SHIVAM',
    initials: 'SH',
    roleCode: 'CEO',
    roleTitle: 'Chief Executive Officer',
    category: 'executive',
    responsibility: 'Vision, Leadership & Project Direction.',
    ownedSystems: [
      'Project Vision & Sustainability Mission',
      'Cross-Team Strategic Alignment',
      'Concept Presentation & Roadmap Direction',
    ],
    focusArea: 'Leadership & Vision',
  },
  {
    id: 'kanish',
    name: 'KANISH',
    initials: 'KA',
    roleCode: 'COO',
    roleTitle: 'Chief Operating Officer',
    category: 'executive',
    responsibility: 'Technical Operations & Operational Management.',
    ownedSystems: [
      'Prototype Assembly & Workflow Execution',
      'Operational Scheduling & Testing Coordination',
      'System Integration Support',
    ],
    focusArea: 'Technical Operations',
  },
  {
    id: 'sahil',
    name: 'SAHIL.Y',
    initials: 'SY',
    roleCode: 'HR',
    roleTitle: 'Human Resources',
    category: 'support',
    responsibility:
      'Recruitment, Hiring, Team Coordination & Providing Required Project Materials.',
    ownedSystems: [
      'Team Coordination & Onboarding',
      'Hardware & Laboratory Material Sourcing',
      'Cross-Role Resource Readiness',
    ],
    focusArea: 'People & Material Coordination',
  },
  {
    id: 'jitender',
    name: 'JITENDER',
    initials: 'JI',
    roleCode: 'FM',
    roleTitle: 'Finance Manager',
    category: 'support',
    responsibility: 'Finance, Budget Planning & Financial Management.',
    ownedSystems: [
      'Component & Material Budget Planning',
      'Cost Tracking & Resource Allocation',
      'Prototype Financial Sustainability',
    ],
    focusArea: 'Budget & Financial Planning',
  },
];

const JOURNEY_STAGES = [
  {
    step: '01',
    title: 'Research & Planning',
    description:
      'Understanding urban environmental challenges and microalgae biology.',
  },
  {
    step: '02',
    title: 'Concept Development',
    description: 'Designing the compact vertical algae green panel architecture.',
  },
  {
    step: '03',
    title: 'Engineering & Construction',
    description:
      'Integrating the photobioreactor chamber, air circulation, water circulation, and LED lighting.',
  },
  {
    step: '04',
    title: 'Electronic Integration',
    description:
      'Working with O₂ and CO₂ sensors, switches, and Arduino-based monitoring.',
  },
  {
    step: '05',
    title: 'Testing & Observation',
    description:
      'Studying the working prototype and observing fluid mixing and illumination behavior.',
  },
  {
    step: '06',
    title: 'Future Improvements',
    description:
      'Exploring higher efficiency, solar power, automated nutrient dosing, and scalability.',
  },
];

const KRISHAN_TABS = [
  {
    id: 'frontend',
    label: 'Website Design & UI',
    detail:
      'Architected the responsive dark-biotech interface, custom animations, 3D hover perspectives, and cross-device layout.',
  },
  {
    id: 'diagrams',
    label: 'Interactive Visuals',
    detail:
      'Engineered the live microalgae microscope canvas, fluid circulation schematics, and prototype subsystem inspector.',
  },
  {
    id: 'digital',
    label: 'Digital Infrastructure',
    detail:
      'Built the interactive monitoring console, simulated sensor visualizations, and modular TypeScript architecture.',
  },
];

function HexAvatar({ initials, featured }: { initials: string; featured?: boolean }) {
  return (
    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
      <svg viewBox="0 0 64 64" className="h-16 w-16" aria-hidden="true">
        <polygon
          points="32,3 58,18 58,46 32,61 6,46 6,18"
          fill={featured ? '#0B2F21' : '#081D15'}
          stroke={featured ? '#39FF88' : '#255B43'}
          strokeWidth={featured ? '2' : '1.5'}
        />
        <polygon
          points="32,9 52,21 52,43 32,55 12,43 12,21"
          fill="none"
          stroke="#39FF88"
          strokeOpacity={featured ? '0.4' : '0.18'}
          strokeWidth="1"
        />
      </svg>
      <span
        className={`absolute font-display text-lg font-bold tracking-tight ${
          featured ? 'text-[#39FF88]' : 'text-[#F4FFF8]'
        }`}
      >
        {initials}
      </span>
    </div>
  );
}

export default function TeamTimelineFooter() {
  const [activeCategory, setActiveCategory] = useState<TeamCategory>('all');
  const [selectedMember, setSelectedMember] = useState<TeamMember>(TEAM_MEMBERS[0]);
  const [krishanTab, setKrishanTab] = useState(KRISHAN_TABS[0]);
  const [activeStage, setActiveStage] = useState(0);

  const filteredMembers =
    activeCategory === 'all'
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.category === activeCategory);

  const roleIcon = (code: string) => {
    if (code === 'CEO') return ShieldCheck;
    if (code === 'COO') return Briefcase;
    if (code === 'CTO') return Cpu;
    if (code === 'HR') return Package;
    return Coins;
  };

  return (
    <>
      {/* SECTION 14: HIGH-TECH TEAM GUI CONSOLE */}
      <section
        id="team"
        className="border-b border-[#143326] bg-[#07100D] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-wider text-[#39FF88]">
                12 · Leadership &amp; Engineering Roster
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#F4FFF8] sm:text-4xl">
                The Minds Behind the Project
              </h2>
              <p className="mt-3 text-base text-[#A0B3A8]">
                Different strengths. One sustainable vision.
              </p>
            </div>

            {/* Department Filter Controls */}
            <div
              role="tablist"
              aria-label="Filter team members by department"
              className="flex flex-wrap items-center gap-1 rounded-lg border border-[#163628] bg-[#050B09] p-1"
            >
              {[
                { id: 'all', label: 'All Members' },
                { id: 'executive', label: 'Executive & Ops' },
                { id: 'tech', label: 'Tech & Architecture' },
                { id: 'support', label: 'Resources & Finance' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === tab.id}
                  onClick={() => setActiveCategory(tab.id as TeamCategory)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                    activeCategory === tab.id
                      ? 'bg-[#39FF88] text-[#050B09]'
                      : 'text-[#A0B3A8] hover:text-[#F4FFF8]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Featured CTO Technical Architect Console (Krishan) */}
          {(activeCategory === 'all' || activeCategory === 'tech') && (
            <article className="relative mt-10 overflow-hidden rounded-xl border border-[#39FF88]/55 bg-[#050B09] p-6 sm:p-8 shadow-[0_0_52px_rgba(57,255,136,0.09)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(rgba(57,255,136,0.35) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center lg:col-span-6">
                  <HexAvatar initials="KR" featured />
                  <div>
                    <p className="font-mono text-xs font-semibold tracking-wider text-[#39FF88]">
                      WEBSITE DEVELOPER &amp; TECHNICAL ARCHITECT
                    </p>
                    <h3 className="mt-1.5 font-display text-2xl font-semibold text-[#F4FFF8] sm:text-3xl">
                      KRISHAN
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#A0B3A8]">
                      CTO · Chief Technology Officer
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#F4FFF8]/90">
                      Engineering, Technology, Website Development &amp; Digital
                      Infrastructure.
                    </p>
                  </div>
                </div>

                {/* Interactive Architecture Layer Inspector inside Krishan's Card */}
                <div className="rounded-xl border border-[#1B4231] bg-[#08130F]/90 p-5 lg:col-span-6">
                  <div className="flex flex-wrap gap-1.5 border-b border-[#143326] pb-3">
                    {KRISHAN_TABS.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setKrishanTab(t)}
                        className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                          krishanTab.id === t.id
                            ? 'bg-[#39FF88] text-[#050B09]'
                            : 'text-[#A0B3A8] hover:text-[#F4FFF8]'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-[#A0B3A8]">
                    {krishanTab.detail}
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#143326] pt-3 text-[11px] font-mono text-[#39FF88]">
                    <div className="flex items-center gap-1.5">
                      <Code2 className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">Web Design</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">Architecture</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">Implementation</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Interactive GUI Grid + System Ownership Matrix */}
          <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-stretch">
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {filteredMembers
                .filter((m) => !m.isFeaturedTech || activeCategory === 'tech')
                .map((member) => {
                  const Icon = roleIcon(member.roleCode);
                  const isSelected = selectedMember.id === member.id;
                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => setSelectedMember(member)}
                      className={`group flex flex-col justify-between rounded-xl border p-6 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                        isSelected
                          ? 'border-[#39FF88] bg-[#081A13] shadow-[0_0_24px_rgba(57,255,136,0.12)]'
                          : 'border-[#163628] bg-[#050B09] hover:border-[#39FF88]/45'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <HexAvatar
                            initials={member.initials}
                            featured={isSelected}
                          />
                          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#39FF88]">
                            <Icon className="h-4 w-4" />
                            <span>{member.roleCode}</span>
                          </div>
                        </div>

                        <h3 className="mt-5 font-display text-xl font-semibold text-[#F4FFF8]">
                          {member.name}
                        </h3>
                        <p className="mt-0.5 text-xs font-medium text-[#A0B3A8]">
                          {member.roleTitle}
                        </p>
                      </div>

                      <div className="mt-5 border-t border-[#143326] pt-4">
                        <p className="text-sm leading-relaxed text-[#A0B3A8]">
                          {member.responsibility}
                        </p>
                        <p className="mt-3 font-mono text-[11px] text-[#39FF88]">
                          {isSelected ? 'Active in Inspector →' : 'Click to inspect role'}
                        </p>
                      </div>
                    </button>
                  );
                })}
            </div>

            {/* Interactive Team Member Console Inspector */}
            <aside className="flex flex-col justify-between rounded-xl border border-[#1B4231] bg-[#050B09] p-6 lg:col-span-4">
              <div>
                <p className="font-mono text-xs text-[#39FF88]">
                  Team Role Inspector
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <HexAvatar initials={selectedMember.initials} featured />
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[#F4FFF8]">
                      {selectedMember.name}
                    </h3>
                    <p className="text-xs font-medium text-[#A0B3A8]">
                      {selectedMember.roleCode} · {selectedMember.roleTitle}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-[#143326] pt-5">
                  <p className="text-xs font-semibold text-[#F4FFF8]">
                    Primary Focus
                  </p>
                  <p className="mt-1 text-sm text-[#39FF88]">
                    {selectedMember.focusArea}
                  </p>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold text-[#F4FFF8]">
                    Key Responsibilities
                  </p>
                  <ul className="mt-2.5 space-y-2.5">
                    {selectedMember.ownedSystems.map((sys, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs leading-relaxed text-[#A0B3A8]"
                      >
                        <span className="font-mono font-semibold text-[#39FF88]">
                          0{idx + 1}
                        </span>
                        <span>{sys}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 border-t border-[#143326] pt-4">
                <p className="mb-2 text-[11px] text-[#A0B3A8]">
                  Quick Switch Profile
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {TEAM_MEMBERS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMember(m)}
                      className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors ${
                        selectedMember.id === m.id
                          ? 'bg-[#39FF88] font-semibold text-[#050B09]'
                          : 'border border-[#163628] bg-[#08130F] text-[#A0B3A8] hover:text-[#F4FFF8]'
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* SECTION 15: PROJECT DEVELOPMENT JOURNEY */}
      <section
        id="journey"
        className="border-b border-[#143326] bg-[#050B09] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wider text-[#39FF88]">
              13 · Engineering Timeline
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#F4FFF8] sm:text-4xl">
              Project Development Journey
            </h2>
          </div>

          {/* Desktop Horizontal Timeline */}
          <div className="mt-12 hidden lg:block">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute top-5 right-8 left-8 h-0.5 bg-[#163628]"
              />
              <div
                aria-hidden="true"
                className="absolute top-5 left-8 h-0.5 bg-[#39FF88] transition-all duration-300"
                style={{
                  width: `calc(${(activeStage / (JOURNEY_STAGES.length - 1)) * 100}% - 2rem)`,
                }}
              />

              <div className="relative grid grid-cols-6 gap-4">
                {JOURNEY_STAGES.map((stage, idx) => {
                  const isActive = idx === activeStage;
                  const isCompleted = idx <= activeStage;
                  return (
                    <button
                      key={stage.step}
                      type="button"
                      onClick={() => setActiveStage(idx)}
                      className="group flex flex-col items-start text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#39FF88]"
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs font-semibold transition-colors ${
                          isActive
                            ? 'border-[#39FF88] bg-[#39FF88] text-[#050B09]'
                            : isCompleted
                            ? 'border-[#39FF88]/70 bg-[#09251B] text-[#39FF88]'
                            : 'border-[#1E4735] bg-[#08130F] text-[#A0B3A8]'
                        }`}
                      >
                        {stage.step}
                      </div>
                      <h3
                        className={`mt-4 font-display text-sm font-semibold transition-colors ${
                          isActive
                            ? 'text-[#39FF88]'
                            : 'text-[#F4FFF8] group-hover:text-[#39FF88]'
                        }`}
                      >
                        {stage.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#A0B3A8]">
                        {stage.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile / Tablet Vertical Timeline */}
          <div className="mt-10 space-y-4 lg:hidden">
            {JOURNEY_STAGES.map((stage) => (
              <div
                key={stage.step}
                className="flex gap-4 rounded-xl border border-[#163628] bg-[#08130F] p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#39FF88]/60 bg-[#09251B] font-mono text-xs font-semibold text-[#39FF88]">
                  {stage.step}
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-[#F4FFF8]">
                    {stage.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#A0B3A8]">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 16: FINAL CALL TO ACTION */}
      <section className="relative overflow-hidden border-b border-[#143326] bg-[#07100D] py-24 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,255,136,0.12),transparent_62%)]"
        />
        <BioVideoBackdrop intensity="subtle" />

        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {Array.from({ length: 14 }, (_, i) => (
            <span
              key={i}
              className="animate-float-slow absolute rounded-full bg-[#39FF88]/30"
              style={{
                left: `${8 + ((i * 19) % 84)}%`,
                top: `${15 + ((i * 23) % 70)}%`,
                width: `${4 + (i % 3) * 3}px`,
                height: `${4 + (i % 3) * 3}px`,
                animationDuration: `${4 + (i % 4)}s`,
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="font-mono text-xs tracking-wider text-[#39FF88]">
            Algae Green Panel · Nature + Engineering + Innovation
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#F4FFF8] sm:text-5xl">
            THE FUTURE IS GREEN. THE FUTURE IS BIO-ENGINEERED.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#A0B3A8]">
            Combining the power of nature with the possibilities of modern
            engineering, one innovation at a time.
          </p>

          <div className="mt-9 flex justify-center">
            <a
              href="#hero"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#39FF88] px-7 py-3.5 text-sm font-semibold text-[#050B09] transition-colors hover:bg-[#00C878] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39FF88]"
            >
              <span>Explore Our Innovation</span>
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* QUIET FOOTER */}
      <footer className="bg-[#050B09] py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6">
          <div>
            <p className="font-display text-base font-semibold text-[#F4FFF8]">
              ALGAE GREEN PANEL PROJECT
            </p>
            <p className="mt-1 text-xs text-[#A0B3A8]">
              &ldquo;Turning Urban CO₂ into Cleaner Air&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-[#A0B3A8]">
            <a href="#overview" className="hover:text-[#F4FFF8]">
              Overview
            </a>
            <a href="#how-it-works" className="hover:text-[#F4FFF8]">
              Prototype
            </a>
            <a href="#interactive-lab" className="hover:text-[#F4FFF8]">
              Bio-Lab
            </a>
            <a href="#dashboard" className="hover:text-[#F4FFF8]">
              Dashboard
            </a>
            <a href="#team" className="hover:text-[#F4FFF8]">
              Team
            </a>
          </div>

          <p className="text-xs font-medium text-[#39FF88]">
            Designed &amp; Developed by Krishan — CTO
          </p>
        </div>
      </footer>
    </>
  );
}
