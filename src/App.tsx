/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import OverviewAndProblem from './components/OverviewAndProblem';
import MicroalgaeSection from './components/MicroalgaeSection';
import HowItWorksSection from './components/HowItWorksSection';
import WaterLoopAndPhotosynthesis from './components/WaterLoopAndPhotosynthesis';
import SensorsAndDashboard from './components/SensorsAndDashboard';
import InteractiveLabHub from './components/InteractiveLabHub';
import DesignAppsVisionSection from './components/DesignAppsVisionSection';
import ScienceQuizSection, {
  QuickJumpPalette,
  ScrollProgressAndRail,
} from './components/ScienceQuizAndPalette';
import TeamTimelineFooter from './components/TeamTimelineFooter';

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [quickJumpOpen, setQuickJumpOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setQuickJumpOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setQuickJumpOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#050B09] text-[#F4FFF8]">
        {!introDone && <LoadingScreen onComplete={() => setIntroDone(true)} />}
        <CustomCursor />
        <Navbar onOpenQuickJump={() => setQuickJumpOpen(true)} />
        <ScrollProgressAndRail />
        <QuickJumpPalette
          open={quickJumpOpen}
          onClose={() => setQuickJumpOpen(false)}
        />
        <main>
          <HeroSection />
          <OverviewAndProblem />
          <MicroalgaeSection />
          <HowItWorksSection />
          <WaterLoopAndPhotosynthesis />
          <SensorsAndDashboard />
          <InteractiveLabHub />
          <DesignAppsVisionSection />
          <ScienceQuizSection />
          <TeamTimelineFooter />
        </main>
      </div>
    </MotionConfig>
  );
}
