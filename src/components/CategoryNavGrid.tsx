import React from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import flightMechanicsImg from '../assets/sys-flight-mechanics.jpg';
import propulsionImg from '../assets/sys-propulsion.jpg';
import uavImg from '../assets/sys-uav.jpg';
import spaceImg from '../assets/sys-space.jpg';

interface CategoryNavGridProps {
  onSelectCategory: (id: string) => void;
}

export const CategoryNavGrid: React.FC<CategoryNavGridProps> = ({ onSelectCategory }) => {
  const systems = [
    {
      id: 'sec-fighter-jets',
      sysCode: 'SYS-01 // MACH',
      title: 'Flight Mechanics',
      description: 'Aerodynamics, stability & control',
      image: flightMechanicsImg,
      accentClass: 'border-cyan-500/40 hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]',
      codeClass: 'text-cyan-400/80',
      titleHover: 'group-hover:text-cyan-300',
      btnClass: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950',
      glowOverlay: 'from-cyan-950/20 to-transparent',
    },
    {
      id: 'sec-others',
      sysCode: 'SYS-02 // THRUST',
      title: 'Propulsion Systems',
      description: 'From subsonic to supersonic',
      image: propulsionImg,
      accentClass: 'border-amber-500/40 hover:border-amber-400 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.35)]',
      codeClass: 'text-amber-400/80',
      titleHover: 'group-hover:text-amber-300',
      btnClass: 'bg-amber-500/15 border-amber-500/40 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950',
      glowOverlay: 'from-amber-950/20 to-transparent',
    },
    {
      id: 'sec-drones',
      sysCode: 'SYS-03 // SENSOR',
      title: 'Autonomous UAVs',
      description: 'Navigation, control & AI',
      image: uavImg,
      accentClass: 'border-emerald-500/40 hover:border-emerald-400 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]',
      codeClass: 'text-emerald-400/80',
      titleHover: 'group-hover:text-emerald-300',
      btnClass: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950',
      glowOverlay: 'from-emerald-950/20 to-transparent',
    },
    {
      id: 'sec-others',
      sysCode: 'SYS-04 // ORBIT',
      title: 'Space Systems',
      description: 'Orbits, payloads & mission design',
      image: spaceImg,
      accentClass: 'border-purple-500/40 hover:border-purple-400 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]',
      codeClass: 'text-purple-400/80',
      titleHover: 'group-hover:text-purple-300',
      btnClass: 'bg-purple-500/15 border-purple-500/40 text-purple-400 group-hover:bg-purple-500 group-hover:text-slate-950',
      glowOverlay: 'from-purple-950/20 to-transparent',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-4">
      {systems.map((sys, idx) => (
        <div
          key={idx}
          onClick={() => onSelectCategory(sys.id)}
          className={`rounded-none p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 relative group overflow-hidden bg-[#070C18]/90 border backdrop-blur-sm ${sys.accentClass}`}
        >
          {/* Subtle Accent Glow Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${sys.glowOverlay} pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`} />

          {/* Technical System Code Tag */}
          <div className="flex items-center justify-between relative z-10">
            <span className={`text-[10px] font-mono-tech uppercase tracking-widest ${sys.codeClass}`}>
              {sys.sysCode}
            </span>
            <span className="w-1.5 h-1.5 rounded-none bg-slate-600 group-hover:bg-white transition-colors" />
          </div>

          {/* High-Resolution System Illustration */}
            <div className="h-32 w-full my-2.5 relative rounded-none overflow-hidden bg-slate-950/60 border border-slate-800/80 group-hover:border-slate-700/80 transition-colors">
              <img
                src={sys.image}
                alt={sys.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Subtle Gradient Edge Blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070C18] via-transparent to-transparent opacity-40" />
            </div>

            {/* Text Details & Interactive Action Button */}
            <div className="pt-2 border-t border-slate-800/80 flex items-end justify-between relative z-10">
              <div className="pr-2">
                <h4 className={`text-base font-bold text-slate-100 font-heading transition-colors ${sys.titleHover}`}>
                  {sys.title}
                </h4>
                <p className="text-xs text-slate-400 font-mono-tech mt-0.5 line-clamp-1">
                  {sys.description}
                </p>
              </div>
              <div
                className={`w-8 h-8 rounded-none border flex items-center justify-center transition-all shrink-0 ml-2 shadow-sm ${sys.btnClass}`}
                aria-label={`View ${sys.title}`}
              >
                <ArrowRight size={15} weight="bold" />
              </div>
            </div>
          </div>
      ))}
        </div>
      );
};
