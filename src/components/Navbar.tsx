import React from 'react';
import {
  PencilSimple,
  Check,
  ArrowsClockwise,
  DownloadSimple,
  UploadSimple,
  AirplaneTilt
} from '@phosphor-icons/react';
import { PortfolioSection } from '../types/portfolio';

interface NavbarProps {
  editMode: boolean;
  onToggleEditMode: () => void;
  sections: PortfolioSection[];
  onResetData: () => void;
  onExportData: () => void;
  onImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  editMode,
  onToggleEditMode,
  sections,
  onResetData,
  onExportData,
  onImportData,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080C14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Callsign */}
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <AirplaneTilt size={20} weight="bold" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-bold text-slate-100 tracking-wider text-sm sm:text-base">
                NANDAN M.
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono-tech uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">
                AERO // DSCE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono-tech hidden sm:block">
              Dayananda Sagar College of Engineering
            </p>
          </div>
        </div>

        {/* Section Navigation Quick Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="px-2.5 py-1 text-xs font-mono-tech text-slate-400 hover:text-amber-400 hover:bg-slate-800/50 rounded transition-colors"
            >
              {sec.title}
            </button>
          ))}
        </nav>

        {/* Actions & Edit Mode Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Hidden File Input for JSON Restore */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImportData}
            accept=".json"
            className="hidden"
          />

          {editMode && (
            <div className="flex items-center space-x-1 border-r border-slate-800 pr-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Import / Restore Portfolio Data"
                className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors"
              >
                <UploadSimple size={16} />
              </button>
              <button
                onClick={onExportData}
                title="Export / Backup Portfolio Data"
                className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors"
              >
                <DownloadSimple size={16} />
              </button>
              <button
                onClick={onResetData}
                title="Reset to Original Defaults"
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
              >
                <ArrowsClockwise size={16} />
              </button>
            </div>
          )}

          {/* Edit Mode Master Switch */}
          <button
            onClick={onToggleEditMode}
            className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-mono-tech font-semibold transition-all border ${editMode
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-500/50 hover:text-amber-300'
              }`}
          >
            {editMode ? (
              <>
                <Check size={14} weight="bold" />
                <span>EDITING ACTIVE</span>
              </>
            ) : (
              <>
                <PencilSimple size={14} weight="bold" />
                <span>EDIT PORTFOLIO</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};