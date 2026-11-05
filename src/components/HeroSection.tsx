import React, { useState } from 'react';
import { 
  Quotes, 
  PencilSimple, 
  CaretLeft, 
  CaretRight, 
  GraduationCap, 
  MapPin, 
  Compass, 
  Plus,
  Trash
} from '@phosphor-icons/react';
import { StudentProfile, Quote } from '../types/portfolio';

interface HeroSectionProps {
  profile: StudentProfile;
  quotes: Quote[];
  editMode: boolean;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onUpdateQuotes: (quotes: Quote[]) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  quotes,
  editMode,
  onUpdateProfile,
  onUpdateQuotes,
}) => {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editBio, setEditBio] = useState(profile.aboutAerospace);
  const [editName, setEditName] = useState(profile.name);
  const [editInstitution, setEditInstitution] = useState(profile.institution);

  const currentQuote = quotes[activeQuoteIndex] || quotes[0];

  const handleNextQuote = () => {
    setActiveQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const handlePrevQuote = () => {
    setActiveQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const handleSaveProfile = () => {
    onUpdateProfile({
      name: editName,
      institution: editInstitution,
      aboutAerospace: editBio,
    });
    setIsEditingProfile(false);
  };

  const handleUpdateCurrentQuote = (field: keyof Quote, value: string) => {
    const updated = [...quotes];
    updated[activeQuoteIndex] = {
      ...updated[activeQuoteIndex],
      [field]: value,
    };
    onUpdateQuotes(updated);
  };

  const handleAddQuote = () => {
    const newQuote: Quote = {
      id: `q-${Date.now()}`,
      text: 'New inspirational aerospace quote...',
      author: 'Aeronautical Pioneer',
      affiliation: 'Research / Space Agency',
    };
    onUpdateQuotes([...quotes, newQuote]);
    setActiveQuoteIndex(quotes.length);
  };

  const handleDeleteQuote = (idx: number) => {
    if (quotes.length <= 1) return;
    const updated = quotes.filter((_, i) => i !== idx);
    onUpdateQuotes(updated);
    setActiveQuoteIndex(0);
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 border-b border-slate-800/60 aerospace-grid-bg">
      <div className="absolute inset-0 aerospace-radar-gradient pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Telemetry Stamp */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-8 border-b border-slate-800/80 mb-10 text-xs font-mono-tech text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">PORTFOLIO LOG // ACTIVE REGISTRY</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <GraduationCap size={15} className="text-amber-400" />
              <span>{profile.institution}</span>
            </span>
            <span className="hidden sm:flex items-center space-x-1">
              <MapPin size={15} className="text-amber-400" />
              <span>{profile.location}</span>
            </span>
          </div>
        </div>

        {/* Hero Grid: Left = Statement & Bio; Right = Aerospace Quotes Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Student identity & Aerospace Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-400 font-mono-tech text-xs tracking-wider">
                <Compass size={14} weight="bold" />
                <span>FLIGHT MECHANICS & PROPULSION ARCHIVES</span>
              </div>

              {isEditingProfile ? (
                <div className="space-y-3 p-4 bg-slate-900/90 border border-amber-500/40 rounded-lg">
                  <div>
                    <label className="text-xs font-mono-tech text-slate-400">Student Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-slate-100 font-heading text-lg focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono-tech text-slate-400">College / Institution</label>
                    <input
                      type="text"
                      value={editInstitution}
                      onChange={(e) => setEditInstitution(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono-tech text-slate-400">About Aerospace & Focus</label>
                    <textarea
                      rows={4}
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-slate-200 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="px-3 py-1 text-xs text-slate-400 hover:text-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-1.5 bg-amber-500 text-slate-950 rounded text-xs font-bold hover:bg-amber-400"
                    >
                      Save Profile
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative group">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none">
                    {profile.name}
                  </h1>
                  <p className="mt-2 text-lg sm:text-xl text-amber-400 font-mono-tech font-medium">
                    {profile.title} &bull; {profile.department}
                  </p>
                  {editMode && (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="mt-2 inline-flex items-center space-x-1 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded hover:bg-amber-500/20"
                    >
                      <PencilSimple size={13} />
                      <span>Edit Info</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Aerospace Manifesto / Description */}
            <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800/90 relative">
              <div className="text-xs font-mono-tech text-amber-400/80 uppercase tracking-wider mb-2">
                AEROSPACE HORIZON // THE SCIENCE OF FLIGHT
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {profile.aboutAerospace}
              </p>
            </div>

            {/* Specialization Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {profile.specializations.map((spec, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs font-mono-tech bg-slate-900/80 text-slate-300 border border-slate-800 rounded-sm hover:border-slate-700 transition-colors"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: High-Impact Aerospace Quote Card */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-7 rounded-xl bg-slate-900/80 border border-slate-800 hud-corner-bracket shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 text-xs font-mono-tech text-slate-400">
                <div className="flex items-center space-x-2 text-amber-400">
                  <Quotes size={20} weight="fill" />
                  <span className="tracking-widest">AEROSPACE QUOTES // ARCHIVE</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>{activeQuoteIndex + 1}</span>
                  <span className="text-slate-600">/</span>
                  <span>{quotes.length}</span>
                </div>
              </div>

              {/* Quote Body */}
              <div className="py-6 min-h-[160px] flex flex-col justify-center">
                {editMode ? (
                  <div className="space-y-3">
                    <textarea
                      rows={3}
                      value={currentQuote.text}
                      onChange={(e) => handleUpdateCurrentQuote('text', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-100 font-heading"
                      placeholder="Quote text..."
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={currentQuote.author}
                        onChange={(e) => handleUpdateCurrentQuote('author', e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-amber-400 font-mono-tech"
                        placeholder="Author"
                      />
                      <input
                        type="text"
                        value={currentQuote.affiliation || ''}
                        onChange={(e) => handleUpdateCurrentQuote('affiliation', e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-slate-400 font-mono-tech"
                        placeholder="Affiliation / Title"
                      />
                    </div>
                  </div>
                ) : (
                  <blockquote className="space-y-4">
                    <p className="text-base sm:text-lg text-slate-100 font-heading font-medium leading-relaxed italic">
                      "{currentQuote.text}"
                    </p>
                    <footer className="pt-2">
                      <div className="font-mono-tech text-sm font-bold text-amber-400 tracking-wide">
                        &mdash; {currentQuote.author}
                      </div>
                      {currentQuote.affiliation && (
                        <div className="text-xs text-slate-400 font-mono-tech mt-0.5">
                          {currentQuote.affiliation}
                        </div>
                      )}
                    </footer>
                  </blockquote>
                )}
              </div>

              {/* Navigation Controls & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                <div className="flex items-center space-x-1">
                  {quotes.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveQuoteIndex(idx)}
                      className={`h-1.5 transition-all rounded-full ${
                        idx === activeQuoteIndex ? 'w-6 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Go to quote ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  {editMode && (
                    <>
                      <button
                        onClick={handleAddQuote}
                        title="Add New Quote"
                        className="p-1.5 rounded bg-slate-800 text-amber-400 hover:bg-amber-500/20"
                      >
                        <Plus size={14} weight="bold" />
                      </button>
                      {quotes.length > 1 && (
                        <button
                          onClick={() => handleDeleteQuote(activeQuoteIndex)}
                          title="Delete Quote"
                          className="p-1.5 rounded bg-slate-800 text-red-400 hover:bg-red-500/20"
                        >
                          <Trash size={14} />
                        </button>
                      )}
                    </>
                  )}

                  <button
                    onClick={handlePrevQuote}
                    className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                    aria-label="Previous quote"
                  >
                    <CaretLeft size={16} weight="bold" />
                  </button>
                  <button
                    onClick={handleNextQuote}
                    className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                    aria-label="Next quote"
                  >
                    <CaretRight size={16} weight="bold" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

