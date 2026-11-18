import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Bio-Lab', href: '#interactive-lab' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Team', href: '#team' },
];

interface NavbarProps {
  onOpenQuickJump?: () => void;
}

export default function Navbar({ onOpenQuickJump }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#163125] bg-[#050B09]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-8 px-4 sm:px-6">
        <a
          href="#hero"
          className="font-display text-lg font-semibold tracking-tight text-[#F4FFF8] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#39FF88]"
        >
          Algae Green Panel
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#A0B3A8]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#F4FFF8] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#39FF88] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#39FF88]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {onOpenQuickJump ? (
            <button
              type="button"
              onClick={onOpenQuickJump}
              className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#39FF88] px-4 py-2 text-xs font-semibold text-[#050B09] whitespace-nowrap shrink-0 transition-colors hover:bg-[#00C878] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39FF88]"
            >
              Quick Jump (Ctrl+K)
            </button>
          ) : (
            <a
              href="#how-it-works"
              className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#39FF88] px-4 py-2 text-xs font-semibold text-[#050B09] whitespace-nowrap shrink-0 transition-colors hover:bg-[#00C878] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39FF88]"
            >
              Explore Prototype
            </a>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#1B3A2C] bg-[#09251B]/50 text-[#F4FFF8] md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39FF88]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[#163125] bg-[#050B09] px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-[#A0B3A8] transition-colors hover:bg-[#09251B] hover:text-[#F4FFF8]"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                handleLinkClick();
                onOpenQuickJump?.();
              }}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-lg bg-[#39FF88] px-4 text-sm font-semibold text-[#050B09]"
            >
              Quick Jump
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
