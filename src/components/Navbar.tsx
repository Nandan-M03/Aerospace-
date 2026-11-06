import React, { useState, useEffect, useRef } from 'react';
import {
  LockKey,
  LockKeyOpen,
  ArrowsClockwise,
  DownloadSimple,
  UploadSimple,
  MagnifyingGlass,
  CaretDown,
  X,
  List,
  AirplaneTakeoff,
  Rocket,
  ShieldCheck
} from '@phosphor-icons/react';
import { PortfolioSection } from '../types/portfolio';

interface NavbarProps {
  editMode: boolean;
  isAuthenticated: boolean;
  onTriggerEditMode: () => void;
  onLockSession: () => void;
  sections: PortfolioSection[];
  onResetData: () => void;
  onExportData: () => void;
  onImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  editMode,
  isAuthenticated,
  onTriggerEditMode,
  onLockSession,
  sections,
  onResetData,
  onExportData,
  onImportData,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [flightDropdownOpen, setFlightDropdownOpen] = useState(false);
  const [spaceDropdownOpen, setSpaceDropdownOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
      setFlightDropdownOpen(false);
      setSpaceDropdownOpen(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.toLowerCase();
    const matchedSec = sections.find(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.projects.some(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.summary.toLowerCase().includes(query) ||
            p.tags.some((t) => t.toLowerCase().includes(query))
        )
    );
    if (matchedSec) {
      scrollToSection(matchedSec.id);
      setSearchOpen(false);
    } else {
      alert(`No results matching "${searchQuery}" found.`);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.nav-dropdown-container')) {
        setFlightDropdownOpen(false);
        setSpaceDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/60 bg-[#000000]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">

        {/* Brand without leftside icon */}
        <div
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveNav('home');
          }}
          className="cursor-pointer shrink-0 space-y-0.5"
        >
          <span className="font-heading font-extrabold text-white tracking-wider text-base sm:text-lg block">
            NANDAN M.
          </span>
          <p className="text-[11px] text-slate-400 font-mono-tech hidden sm:block leading-tight">
            Aerospace Engineering Scholar
          </p>
        </div>

        {/* Center Navigation Pill Group (Matching Reference) */}
          <nav className="hidden lg:flex items-center space-x-1 p-1 bg-slate-900/80 border border-slate-800 rounded-none text-xs font-mono-tech nav-dropdown-container">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveNav('home');
              }}
              className={`px-3.5 py-1.5 rounded-none transition-colors cursor-pointer ${
                activeNav === 'home'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              Home
            </button>
            
            <button
              onClick={() => {
                scrollToSection('sec-projects-all');
                setActiveNav('projects');
              }}
              className={`px-3.5 py-1.5 rounded-none transition-colors cursor-pointer ${
                activeNav === 'projects'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              Projects
            </button>

            <button
              onClick={() => {
                scrollToSection('sec-research-archive');
                setActiveNav('research');
              }}
              className={`px-3.5 py-1.5 rounded-none transition-colors cursor-pointer ${
                activeNav === 'research'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              Research
            </button>

          {/* Flight Systems Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setFlightDropdownOpen(!flightDropdownOpen);
                setSpaceDropdownOpen(false);
              }}
              className="px-3.5 py-1.5 rounded-none text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors inline-flex items-center space-x-1 cursor-pointer"
            >
              <span>Flight Systems</span>
              <CaretDown size={12} className={`transition-transform ${flightDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {flightDropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 rounded-none bg-[#080808] border border-slate-700/80 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => scrollToSection('sec-fighter-jets')}
                  className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-cyan-300 hover:bg-slate-900 flex items-center space-x-2"
                >
                  <AirplaneTakeoff size={14} className="text-cyan-400" />
                  <span>Fighter Jets & Combat</span>
                </button>
                <button
                  onClick={() => scrollToSection('sec-drones')}
                  className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-emerald-300 hover:bg-slate-900 flex items-center space-x-2"
                >
                  <AirplaneTakeoff size={14} className="text-emerald-400" />
                  <span>Multirotor Drones</span>
                </button>
              </div>
            )}
          </div>

          {/* Space Systems Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setSpaceDropdownOpen(!spaceDropdownOpen);
                setFlightDropdownOpen(false);
              }}
              className="px-3.5 py-1.5 rounded-none text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors inline-flex items-center space-x-1 cursor-pointer"
            >
              <span>Space Systems</span>
              <CaretDown size={12} className={`transition-transform ${spaceDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {spaceDropdownOpen && (
              <div className="absolute left-0 mt-2 w-60 rounded-none bg-[#080808] border border-slate-700/80 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => scrollToSection('sec-uavs')}
                  className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-purple-300 hover:bg-slate-900 flex items-center space-x-2"
                >
                  <Rocket size={14} className="text-purple-400" />
                  <span>Tactical UAVs & High-Altitude</span>
                </button>
                <button
                  onClick={() => scrollToSection('sec-others')}
                  className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-amber-300 hover:bg-slate-900 flex items-center space-x-2"
                >
                  <Rocket size={14} className="text-amber-400" />
                  <span>Solid Rocketry & Hypersonics</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              scrollToSection('sec-about-nandan');
              setActiveNav('about');
            }}
            className="px-3.5 py-1.5 rounded-none text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            Archive
          </button>
        </nav>

        {/* Right Actions: Search + Master "NANDAN EDIT" Button */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImportData}
            accept=".json"
            className="hidden"
          />

          {/* Quick Search Button / Input */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search flight telemetry…"
                  className="w-40 sm:w-56 bg-slate-900 border border-slate-700 rounded-none px-3 py-1.5 text-base sm:text-xs text-slate-100 font-mono-tech focus:outline-none focus:border-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white ml-1"
                >
                  <X size={15} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                title="Search aerospace projects"
                className="w-9 h-9 rounded-none bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              >
                <MagnifyingGlass size={16} />
              </button>
            )}
          </div>

          {/* Edit Mode Administrative Controls */}
          {editMode && (
            <div className="hidden sm:flex items-center space-x-1 border-r border-slate-800 pr-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Import / Restore Portfolio Data"
                className="w-8 h-8 rounded-none skeuo-button flex items-center justify-center text-slate-400 hover:text-slate-100 cursor-pointer"
              >
                <UploadSimple size={15} />
              </button>
              <button
                onClick={onExportData}
                title="Export / Backup Portfolio Data"
                className="w-8 h-8 rounded-none skeuo-button flex items-center justify-center text-slate-400 hover:text-slate-100 cursor-pointer"
              >
                <DownloadSimple size={15} />
              </button>
              <button
                onClick={onResetData}
                title="Reset to Original Defaults"
                className="w-8 h-8 rounded-none skeuo-button flex items-center justify-center text-slate-400 hover:text-red-400 cursor-pointer"
              >
                <ArrowsClockwise size={15} />
              </button>
              <button
                onClick={onLockSession}
                title="Lock Terminal"
                className="px-2.5 py-1 rounded-none skeuo-button text-red-400 text-xs font-mono-tech cursor-pointer"
              >
                Lock
              </button>
            </div>
          )}

          {/* Master "NANDAN EDIT" Button (Clean, Non-Glowing) */}
          <button
            onClick={onTriggerEditMode}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-none text-xs font-mono-tech border flex items-center space-x-2 transition-all cursor-pointer ${
              editMode
                ? 'bg-blue-600 text-white border-blue-400'
                : 'bg-slate-900/90 text-slate-200 border-slate-700 hover:border-slate-500'
            }`}
          >
            {editMode ? (
              <>
                <LockKeyOpen size={15} weight="bold" />
                <span className="tracking-wider">EDITING ARMED</span>
              </>
            ) : isAuthenticated ? (
              <>
                <ShieldCheck size={15} weight="bold" className="text-emerald-400" />
                <span className="tracking-wider">NANDAN EDIT</span>
              </>
            ) : (
              <>
                <LockKey size={15} weight="bold" className="text-blue-400" />
                <span className="tracking-wider">NANDAN EDIT</span>
              </>
            )}
          </button>

          {/* Mobile Navigation Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-none bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#000000] px-4 py-4 space-y-2 font-mono-tech text-xs">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-none bg-blue-600 text-white font-bold"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('sec-projects-all')}
            className="w-full text-left px-3 py-2 rounded-none text-slate-300 hover:bg-slate-800"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('sec-research-archive')}
            className="w-full text-left px-3 py-2 rounded-none text-slate-300 hover:bg-slate-800"
          >
            Research
          </button>
          <div className="pt-2 pb-1 border-t border-slate-800 text-[10px] text-slate-500 uppercase tracking-widest px-3">
            Flight Systems
          </div>
          <button
            onClick={() => scrollToSection('sec-fighter-jets')}
            className="w-full text-left px-5 py-1.5 text-slate-300 hover:text-cyan-300"
          >
            Fighter Jets & Combat
          </button>
          <button
            onClick={() => scrollToSection('sec-drones')}
            className="w-full text-left px-5 py-1.5 text-slate-300 hover:text-emerald-300"
          >
            Multirotor Drones
          </button>
          <div className="pt-2 pb-1 border-t border-slate-800 text-[10px] text-slate-500 uppercase tracking-widest px-3">
            Space Systems
          </div>
          <button
            onClick={() => scrollToSection('sec-uavs')}
            className="w-full text-left px-5 py-1.5 text-slate-300 hover:text-purple-300"
          >
            Tactical UAVs
          </button>
          <button
            onClick={() => scrollToSection('sec-others')}
            className="w-full text-left px-5 py-1.5 text-slate-300 hover:text-amber-300"
          >
            Solid Rocketry & Hypersonics
          </button>
          <button
            onClick={() => scrollToSection('sec-about-nandan')}
            className="w-full text-left px-3 py-2 rounded-none text-slate-300 hover:bg-slate-800 border-t border-slate-800"
          >
            Archive & Scholar Bio
          </button>
          {editMode && (
            <div className="pt-2 flex items-center justify-between border-t border-slate-800 px-3">
              <span className="text-amber-400">Terminal Unlocked</span>
              <button
                onClick={onLockSession}
                className="px-2.5 py-1 bg-red-500/20 text-red-400 rounded-none border border-red-500/40"
              >
                Lock Terminal
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
