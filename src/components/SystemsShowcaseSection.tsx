import React from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import flightMechanicsImg from '../assets/sys-flight-mechanics.jpg';
import propulsionImg from '../assets/sys-propulsion.jpg';
import uavImg from '../assets/sys-uav.jpg';
import spaceImg from '../assets/sys-space.jpg';

interface SystemsShowcaseSectionProps {
  onSelectCategory: (id: string) => void;
}

export const SystemsShowcaseSection: React.FC<SystemsShowcaseSectionProps> = ({ onSelectCategory }) => {
  const systems = [
    {
      id: 'sec-fighter-jets',
      sysCode: 'SYS-01 // MACH',
      title: 'Flight Mechanics',
      description: 'Aerodynamic lift distributions, compound delta-wing vortex stability, and high-AoA control.',
      image: flightMechanicsImg,
      borderClass: 'border-cyan-500/30 hover:border-cyan-400',
      badgeClass: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30',
      titleHover: 'group-hover:text-cyan-300',
      btnClass: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950',
    },
    {
      id: 'sec-others',
      sysCode: 'SYS-02 // THRUST',
      title: 'Propulsion Systems',
      description: 'Compressor blade aerodynamics, de Laval nozzle expansion ratios, and high-impulse solid motors.',
      image: propulsionImg,
      borderClass: 'border-amber-500/30 hover:border-amber-400',
      badgeClass: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
      titleHover: 'group-hover:text-amber-300',
      btnClass: 'bg-amber-500/15 border-amber-500/40 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950',
    },
    {
      id: 'sec-drones',
      sysCode: 'SYS-03 // SENSOR',
      title: 'Autonomous UAVs',
      description: 'GPS-denied Kalman filtering, multirotor adaptive LQR controllers, and real-time sensory fusion.',
      image: uavImg,
      borderClass: 'border-emerald-500/30 hover:border-emerald-400',
      badgeClass: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
      titleHover: 'group-hover:text-emerald-300',
      btnClass: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950',
    },
    {
      id: 'sec-others',
      sysCode: 'SYS-04 // ORBIT',
      title: 'Space Systems',
      description: 'Orbital mechanics, photovoltaic solar array power management, and cubesat communication telemetry.',
      image: spaceImg,
      borderClass: 'border-purple-500/30 hover:border-purple-400',
      badgeClass: 'text-purple-400 bg-purple-950/40 border-purple-500/30',
      titleHover: 'group-hover:text-purple-300',
      btnClass: 'bg-purple-500/15 border-purple-500/40 text-purple-400 group-hover:bg-purple-500 group-hover:text-slate-950',
    },
  ];

  return (
    <section className="py-20 sm:py-28 lg:py-32 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Generous Whitespace */}
        <div className="pb-10 sm:pb-14 border-b border-slate-800/60 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-none bg-blue-400 animate-pulse" />
              <span className="text-xs font-mono-tech text-blue-400 font-bold tracking-widest uppercase">
                SYSTEMS ARCHITECTURE // CORE PLATFORMS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight font-heading">
              Aerospace Systems Showcase
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed font-sans">
              Specialized research and engineering disciplines spanning high-agility atmospheric aircraft, autonomous aerial robotics, and orbital spacecraft.
            </p>
          </div>

          <div className="text-xs font-mono-tech text-slate-400 shrink-0">
            SELECT A SYSTEM TO INSPECT DATA &darr;
          </div>
        </div>

        {/* 4 Premium Module Cards Grid (Sharp Box Aesthetic) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mt-10 sm:mt-14">
          {systems.map((sys, idx) => (
            <div
              key={idx}
              onClick={() => onSelectCategory(sys.id)}
              className={`rounded-none p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 relative group overflow-hidden bg-[#000000]/95 border border-slate-800 hover:-translate-y-1.5 ${sys.borderClass}`}
            >
              {/* Top Bar: System Code Badge */}
              <div className="flex items-center justify-between pb-3.5">
                  <span className={`text-[10px] font-mono-tech uppercase tracking-widest px-2.5 py-1 rounded-none border ${sys.badgeClass}`}>
                    {sys.sysCode}
                  </span>
                  <span className="text-[11px] font-mono-tech text-slate-400 group-hover:text-slate-300 transition-colors">
                    MODULE 0{idx + 1}
                  </span>
              </div>

              {/* Large Visual Render */}
                <div className="h-44 w-full my-4 relative rounded-none overflow-hidden bg-slate-950/80 border border-slate-800/80 group-hover:border-slate-700 transition-colors">
                  <img
                    src={sys.image}
                    alt={sys.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070C18] via-transparent to-transparent opacity-50" />
                </div>

                {/* Title, Description & Action Button */}
                <div className="pt-3 border-t border-slate-800/80 flex items-end justify-between">
                  <div className="pr-2 space-y-1">
                    <h3 className={`text-lg font-bold text-slate-100 font-heading transition-colors ${sys.titleHover}`}>
                      {sys.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2">
                      {sys.description}
                    </p>
                  </div>
                  <div
                    className={`w-9 h-9 rounded-none border flex items-center justify-center transition-all shrink-0 ml-2 shadow-sm ${sys.btnClass}`}
                    aria-label={`View ${sys.title}`}
                  >
                    <ArrowRight size={16} weight="bold" />
                  </div>
                </div>
              </div>
          ))}
            </div>

      </div>
    </section>
  );
};

