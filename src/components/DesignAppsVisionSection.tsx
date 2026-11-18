import {
  Building2,
  GraduationCap,
  Factory,
  Landmark,
  Trees,
  FlaskConical,
  Maximize2,
  Cpu,
  Leaf,
  Sprout,
  BookOpen,
  Sun,
} from 'lucide-react';

const DIFFERENTIATORS = [
  {
    index: '01',
    title: 'Vertical Design',
    body: 'Engineered to explore compact integration into space-constrained urban interiors and building exteriors.',
    icon: Maximize2,
  },
  {
    index: '02',
    title: 'Biological CO₂ Utilisation',
    body: 'Demonstrates the natural capability of living microalgae cultures to utilize dissolved carbon dioxide.',
    icon: Leaf,
  },
  {
    index: '03',
    title: 'Smart Monitoring',
    body: 'Pairs electronic CO₂ and O₂ sensors with Arduino-based signal processing for clear experimental observation.',
    icon: Cpu,
  },
  {
    index: '04',
    title: 'Sustainable Concept',
    body: 'Bridges biological photosynthesis with practical mechanical circulation and low-footprint enclosure engineering.',
    icon: Sun,
  },
  {
    index: '05',
    title: 'Biomass Production',
    body: 'Generates visible algal biomass in a dedicated collection tank that can be harvested, measured, and studied.',
    icon: Sprout,
  },
  {
    index: '06',
    title: 'Educational Innovation',
    body: 'Unites biology, electronics, fluid mechanics, and environmental science inside one tangible prototype.',
    icon: BookOpen,
  },
];

const APPLICATIONS = [
  {
    title: 'Building Facades',
    note: 'Vertical bio-skin panels explored for dense architectural envelopes where ground planting is limited.',
    icon: Building2,
  },
  {
    title: 'Schools & Educational Institutions',
    note: 'Hands-on STEM laboratory unit for teaching photosynthesis, electronics, and environmental engineering.',
    icon: GraduationCap,
  },
  {
    title: 'Factories',
    note: 'Potential future localized CO₂-capture research setups adjacent to controlled exhaust streams.',
    icon: Factory,
  },
  {
    title: 'Commercial Complexes',
    note: 'Atrium or lobby bio-installations pairing environmental education with sustainable architecture.',
    icon: Landmark,
  },
  {
    title: 'Public Spaces',
    note: 'Transit hubs and civic plazas exploring modular green infrastructure concepts.',
    icon: Trees,
  },
  {
    title: 'Urban Sustainability Research',
    note: 'Testbed for studying microalgae strain behavior, illumination cycles, and gas exchange rates.',
    icon: FlaskConical,
  },
];

const FUTURE_USES = [
  {
    num: '01',
    title: 'Educational Demonstration',
    body: 'Schools, colleges, and science laboratories can use the system to demonstrate photosynthesis, CO₂ utilisation, and oxygen release in real time.',
  },
  {
    num: '02',
    title: 'Environmental Research',
    body: 'The prototype helps students and researchers observe microalgae growth rates under varying light and circulation conditions.',
  },
  {
    num: '03',
    title: 'Algae Biomass Collection',
    body: 'The secondary collection tank enables easy culture sampling for observation, density measurement, and biomass research.',
  },
  {
    num: '04',
    title: 'Smart Environmental Monitoring',
    body: 'Integrated CO₂ and O₂ sensors let operators monitor gas trends across controlled classroom or lab experiments.',
  },
  {
    num: '05',
    title: 'Future Urban Integration',
    body: 'With further engineering, structural scaling, and safety testing, larger panels could be explored for building facades and urban infrastructure.',
  },
  {
    num: '06',
    title: 'Future Development Roadmap',
    body: 'Planned avenues include solar-powered operation, automated nutrient dosing, advanced sensor calibration, improved reactor geometry, and remote monitoring.',
  },
];

export default function DesignAppsVisionSection() {
  return (
    <>
      {/* SECTION 11: WHY IS OUR DESIGN DIFFERENT? */}
      <section
        id="differentiators"
        className="border-b border-[#143326] bg-[#050B09] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wider text-[#39FF88]">
              09 · Engineering Distinction
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#F4FFF8] sm:text-4xl">
              Small Footprint. Big Scientific Potential.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.index}
                  className="rounded-xl border border-[#163628] bg-[#08130F] p-6 transition-colors hover:border-[#39FF88]/45"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#39FF88]">
                      {item.index}
                    </span>
                    <Icon className="h-5 w-5 text-[#A0B3A8]" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-[#F4FFF8]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A0B3A8]">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 12: REAL-WORLD APPLICATIONS */}
      <section
        id="applications"
        className="border-b border-[#143326] bg-[#07100D] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium tracking-wider text-[#39FF88]">
                10 · Potential Deployment Contexts
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#F4FFF8] sm:text-4xl">
                Where Can This Technology Be Used?
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm leading-relaxed text-[#A0B3A8]">
                These represent potential future applications of photobioreactor
                panel concepts and would require further engineering, testing,
                and validation prior to large-scale deployment.
              </p>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-[#163628] bg-[#050B09]">
            <div className="relative aspect-[16/7] min-h-[220px] w-full overflow-hidden">
              <img
                src="/src/assets/images/urban_green_facade_1794930827733.jpg"
                alt="Conceptual architectural visualization of a modern building integrated with vertical green microalgae photobioreactor facade panels"
                referrerPolicy="no-referrer"
                className="animate-ken-burns h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B09] via-[#050B09]/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6">
                <div>
                  <p className="font-mono text-xs text-[#39FF88]">
                    Conceptual Architectural Visualization
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-[#F4FFF8] sm:text-2xl">
                    Bio-Integrated Building Facade Concept
                  </h3>
                </div>
                <p className="max-w-md text-xs text-[#A0B3A8]">
                  Illustrates a long-term architectural vision; requires
                  structural, thermal, and biological scaling validation beyond
                  the current 13 cm prototype.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {APPLICATIONS.map((app, idx) => {
              const Icon = app.icon;
              return (
                <article
                  key={app.title}
                  className="group overflow-hidden rounded-xl border border-[#163628] bg-[#050B09]"
                >
                  {/* Custom Minimalist Architectural Vector Header */}
                  <div className="relative flex h-32 items-center justify-between overflow-hidden border-b border-[#143326] bg-gradient-to-br from-[#09251B]/70 to-[#050B09] px-6">
                    <div>
                      <span className="font-mono text-[11px] text-[#39FF88]">
                        Potential Use · 0{idx + 1}
                      </span>
                      <h3 className="mt-1 font-display text-lg font-semibold text-[#F4FFF8]">
                        {app.title}
                      </h3>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#1E4735] bg-[#08130F] text-[#39FF88] transition-transform duration-200 group-hover:scale-105">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm leading-relaxed text-[#A0B3A8]">
                      {app.note}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 13: FINAL PROJECT USE AND FUTURE VISION */}
      <section
        id="vision"
        className="border-b border-[#143326] bg-[#050B09] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-wider text-[#39FF88]">
              11 · Practical Purpose & Roadmap
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#F4FFF8] sm:text-4xl">
              Beyond a Prototype — Towards a Greener Tomorrow
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#A0B3A8] sm:text-base">
              Our final project demonstrates a compact, vertical microalgae
              cultivation system that integrates air circulation, water
              circulation, artificial lighting, and electronic sensor monitoring
              within an accessible educational and research platform.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FUTURE_USES.map((item) => (
              <div
                key={item.num}
                className="rounded-xl border border-[#163628] bg-[#08130F] p-6"
              >
                <span className="font-mono text-xs font-semibold text-[#39FF88]">
                  {item.num}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-[#F4FFF8]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A0B3A8]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* Scientific Accuracy & Prototype Scope Box */}
          <div className="mt-10 grid gap-6 rounded-xl border border-[#1B4231] bg-[#08130F] p-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="font-mono text-xs text-[#39FF88]">
                Scientific Scope & Accuracy
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-[#F4FFF8]">
                Demonstrated Prototype vs. Scaled Possibilities
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#A0B3A8]">
                A single benchtop 13 cm prototype demonstrates core biological
                and electronic principles—it does not eliminate all urban
                pollution, independently clean an entire city, or produce
                commercially significant oxygen volumes on its own.
              </p>
            </div>
            <div className="border-t border-[#143326] pt-5 lg:col-span-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <blockquote className="font-display text-lg leading-relaxed font-medium text-[#F4FFF8] sm:text-xl">
                &ldquo;This project is not just about growing algae. It is about
                exploring how biology and engineering can work together to
                rethink our relationship with the urban environment.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
