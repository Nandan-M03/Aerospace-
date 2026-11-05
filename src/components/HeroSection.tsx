import React, { useState } from 'react';
import {
  PencilSimple,
  Play,
  RocketLaunch,
  Wind,
  Cpu,
  Stack,
  Compass
} from '@phosphor-icons/react';
import { StudentProfile, Quote } from '../types/portfolio';
import { QuoteCarousel } from './QuoteCarousel';
import heroBgImage from '../assets/hero-fighter-jet.jpg';

interface HeroSectionProps {
  profile: StudentProfile;
  quotes: Quote[];
  editMode: boolean;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onUpdateQuotes: (quotes: Quote[]) => void;
  onScrollToProjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  quotes,
  editMode,
  onUpdateProfile,
  onUpdateQuotes,
  onScrollToProjects,
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editBio, setEditBio] = useState(profile.aboutAerospace);
  const [editName, setEditName] = useState(profile.name);
  const [editInstitution, setEditInstitution] = useState(profile.institution);
  const [editTitle, setEditTitle] = useState(profile.title);
  const [editDepartment, setEditDepartment] = useState(profile.department);

  const handleSaveProfile = () => {
    onUpdateProfile({
      name: editName,
      title: editTitle,
      department: editDepartment,
      institution: editInstitution,
      aboutAerospace: editBio,
    });
    setIsEditingProfile(false);
  };

  return (
    <section className="relative min-h-[88vh] lg:min-h-[94vh] flex items-center overflow-hidden border-b border-slate-800/60 aerospace-grid-bg">

      {/* Cinematic Full-Bleed Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Large-Scale Stealth Fighter Image */}
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-right opacity-90 transition-opacity duration-700"
          style={{
            backgroundImage: `url(${heroBgImage})`,
            backgroundPosition: 'right 22% center'
          }}
        />

        {/* Left Dark Gradient Overlay: Preserves High-Contrast Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/95 md:via-[#000000]/70 to-transparent md:w-3/4" />

        {/* Top Vignette (Blends into Floating Navbar) */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#000000] via-[#000000]/80 to-transparent" />

        {/* Bottom Vignette (Blends Generously into the Systems Showcase) */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#000000] via-[#000000]/70 to-transparent" />

        {/* Delicate Technical Crosshair & Coordinate Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#38bdf8" strokeDasharray="4,12" />
          <line x1="0" y1="48%" x2="100%" y2="48%" stroke="#38bdf8" strokeDasharray="4,12" />
          <circle cx="60%" cy="48%" r="160" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,8" />
          <circle cx="60%" cy="48%" r="320" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="1,10" />
        </svg>
      </div>

      {/* Main Hero Container with Generous Spacing */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Editorial Headline, Manifesto & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">

            {/* Editorial Eyebrow with Beacon */}
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-none bg-cyan-400 animate-ping" />
              <span className="text-[11px] sm:text-xs font-mono-tech text-cyan-400 tracking-[0.3em] uppercase font-semibold">
                AEROSPACE / FLIGHT / PROPULSION
              </span>
            </div>

            {/* Massive Heading & Title */}
            <div>
              {isEditingProfile ? (
                  <div className="space-y-3 p-5 rounded-none skeuo-panel">
                    <div>
                      <label className="text-[10px] font-mono-tech text-slate-400 uppercase">Scholar Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full skeuo-debossed px-3.5 py-2 rounded-none text-3xl font-bold font-heading text-white focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono-tech text-slate-400 uppercase">Title</label>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full skeuo-debossed px-3 py-1.5 rounded-none text-base sm:text-xs font-mono-tech text-slate-200 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono-tech text-slate-400 uppercase">Department</label>
                        <input
                          type="text"
                          value={editDepartment}
                          onChange={(e) => setEditDepartment(e.target.value)}
                          className="w-full skeuo-debossed px-3 py-1.5 rounded-none text-base sm:text-xs font-mono-tech text-slate-200 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono-tech text-slate-400 uppercase">Institution</label>
                      <input
                        type="text"
                        value={editInstitution}
                        onChange={(e) => setEditInstitution(e.target.value)}
                        className="w-full skeuo-debossed px-3 py-1.5 rounded-none text-base sm:text-xs font-mono-tech text-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono-tech text-slate-400 uppercase">Bio / Statement</label>
                      <textarea
                        rows={3}
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                        className="w-full skeuo-debossed px-3 py-1.5 rounded-none text-base sm:text-xs font-mono-tech text-slate-300 focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-end space-x-2.5 pt-1">
                      <button
                        onClick={() => setIsEditingProfile(false)}
                        className="px-3 py-1 text-xs text-slate-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="btn-afterburner-blue px-4 py-1.5 rounded-none text-xs font-bold text-white uppercase tracking-wider"
                      >
                        Save Info
                      </button>
                    </div>
                  </div>
                  ) : (
                  <div className="space-y-3">
                    <h1 className="hero-title-clamp font-extrabold text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
                      {profile.name}
                    </h1>
                    <div className="space-y-1">
                      <p className="text-xl sm:text-2xl font-semibold text-slate-200 font-heading">
                        {profile.title}
                      </p>
                      <p className="text-xs sm:text-sm font-mono-tech text-slate-400 tracking-wide">
                        {profile.department} &bull; {profile.institution}
                      </p>
                    </div>
                  </div>
              )}
                </div>

            {/* Narrative Manifesto */}
              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-sans font-normal drop-shadow-sm">
                {profile.aboutAerospace}
              </p>

              {/* High-Impact Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onScrollToProjects}
                  className="btn-afterburner-blue inline-flex items-center space-x-3 px-7 py-3.5 rounded-none text-white text-sm font-mono-tech font-bold cursor-pointer uppercase tracking-wider"
                >
                  <RocketLaunch size={19} weight="fill" />
                  <span>Explore Portfolio &rarr;</span>
                </button>

                <button
                  onClick={onScrollToProjects}
                  className="skeuo-button inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-none text-slate-200 hover:text-white text-sm font-mono-tech transition-all cursor-pointer uppercase tracking-wider"
                >
                  <Play size={14} weight="fill" className="text-blue-400" />
                  <span>View Projects</span>
                </button>

                {editMode && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 text-xs font-mono-tech text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-none hover:bg-amber-500/20 inline-flex items-center space-x-1.5"
                  >
                    <PencilSimple size={13} />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

              {/* 5 Technical Specialization Badges (Box Chips) */}
              <div className="pt-3 flex flex-wrap items-center gap-2.5 text-xs font-mono-tech">
                  <div className="px-3.5 py-1.5 rounded-none bg-slate-900/90 border border-slate-700/80 text-slate-200 flex items-center space-x-2 shadow-sm backdrop-blur-md hover:border-cyan-400/50 transition-colors">
                    <Wind size={15} className="text-cyan-400" />
                    <span>CFD</span>
                  </div>
                    <div className="px-3.5 py-1.5 rounded-none bg-slate-900/90 border border-slate-700/80 text-slate-200 flex items-center space-x-2 shadow-sm backdrop-blur-md hover:border-blue-400/50 transition-colors">
                      <Compass size={15} className="text-blue-400" />
                      <span>UAV Systems</span>
                    </div>
                      <div className="px-3.5 py-1.5 rounded-none bg-slate-900/90 border border-slate-700/80 text-slate-200 flex items-center space-x-2 shadow-sm backdrop-blur-md hover:border-amber-400/50 transition-colors">
                        <RocketLaunch size={15} className="text-amber-400" />
                        <span>Propulsion</span>
                      </div>
                        <div className="px-3.5 py-1.5 rounded-none bg-slate-900/90 border border-slate-700/80 text-slate-200 flex items-center space-x-2 shadow-sm backdrop-blur-md hover:border-indigo-400/50 transition-colors">
                          <Cpu size={15} className="text-indigo-400" />
                          <span>Avionics</span>
                        </div>
                          <div className="px-3.5 py-1.5 rounded-none bg-slate-900/90 border border-slate-700/80 text-slate-200 flex items-center space-x-2 shadow-sm backdrop-blur-md hover:border-purple-400/50 transition-colors">
                            <Stack size={15} className="text-purple-400" />
                            <span>FEA & Composites</span>
                          </div>
                        </div>

                      </div>

                      {/* Right Column: Floating Aerospace Quote Carousel */}
                      <div className="lg:col-span-5 flex justify-end">
                        <QuoteCarousel
                          quotes={quotes}
                          editMode={editMode}
                          onUpdateQuotes={onUpdateQuotes}
                        />
                      </div>

                    </div>
                  </div>
                </section>
                );
};
