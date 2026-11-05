import React from 'react';
import {
  GraduationCap,
  MapPin,
  Compass,
  RocketLaunch,
  CheckCircle
} from '@phosphor-icons/react';
import { StudentProfile } from '../types/portfolio';

interface AboutSectionProps {
  profile: StudentProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const stats = [
    { label: 'Academic Institution', value: 'DSCE Bengaluru', detail: 'Dept. of Aerospace Engineering' },
    { label: 'Research Specializations', value: '4 Core Domains', detail: 'CFD, Propulsion, UAVs, Orbiters' },
    { label: 'Computational Tools', value: 'OpenFOAM & Fluent', detail: 'Transient Compressible Solvers' },
    { label: 'Hardware Focus', value: 'Pixhawk / Autonomous', detail: 'Custom Carbon UAV Airframes' },
  ];

  const competencies = [
    { title: 'Aerodynamic Simulation', detail: 'OpenFOAM, Ansys Fluent, XFLR5 transient compressible flow modeling' },
    { title: 'Autonomous Flight Control', detail: 'Pixhawk ArduPilot/PX4, LQR state-space control, sensory fusion' },
    { title: 'Propulsion Engineering', detail: 'Internal ballistics, de Laval nozzle expansion, star-grain solid motors' },
    { title: 'Structural FEA & Composites', detail: 'Carbon fiber spar sizing, modal analysis, stress-strain tensor validation' },
  ];

  return (
    <section id="sec-about-nandan" className="py-20 sm:py-28 lg:py-32 border-b border-slate-800/60 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="pb-10 sm:pb-14 border-b border-slate-800/60">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-none bg-amber-400" />
            <span className="text-xs font-mono-tech text-amber-400 font-bold tracking-widest uppercase">
              BIOGRAPHICAL DOSSIER // DSCE-AERO
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight font-heading mt-2">
            About {profile.name}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed font-sans">
            Aerospace engineering scholar at {profile.institution}, combining numerical modeling with prototype flight validation.
          </p>
        </div>

        {/* Large Stats Ribbon (Apple-style presentation) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-12 border-b border-slate-800/60">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider">{stat.label}</div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-heading tabular-nums">{stat.value}</div>
              <div className="text-xs font-mono-tech text-blue-400">{stat.detail}</div>
            </div>
          ))}
        </div>

        {/* Narrative & Engineering Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 items-start">

          {/* Left Column: Academic Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
                <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-none bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono-tech uppercase">
                  <GraduationCap size={16} />
                  <span>B.E. Aerospace Engineering</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 font-heading">
                  Engineering at the Intersection of Physics and Flight
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                  My academic and experimental work focuses on synthesizing theoretical fluid dynamics—such as delta-wing vortex stability at critical angles of attack—with field-proven autonomous UAV systems and high-impulse rocketry.
                </p>
              </div>

              <div className="pt-2 space-y-3 text-xs font-mono-tech text-slate-400 border-t border-slate-800/60">
                <div className="flex items-center space-x-2 text-slate-300">
                  <MapPin size={16} className="text-amber-400" />
                  <span>Dayananda Sagar College of Engineering &bull; Bengaluru, India</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <Compass size={16} className="text-cyan-400" />
                  <span>Department of Aerospace Engineering</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <RocketLaunch size={16} className="text-indigo-400" />
                  <span>Active Research in UAV Autonomy & Compressible CFD</span>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Technical Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {competencies.map((comp, i) => (
                <div
                  key={i}
                  className="p-6 rounded-none bg-[#000000] border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors"
                >
                    <div className="w-8 h-8 rounded-none bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <CheckCircle size={18} weight="fill" />
                    </div>
                    <h4 className="text-base font-bold text-slate-100 font-heading pt-1">
                      {comp.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                      {comp.detail}
                    </p>
                  </div>
            ))}
                </div>

        </div>

          </div>
        </section>
        );
};
