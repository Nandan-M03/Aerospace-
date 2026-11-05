import React from 'react';
import {
  Atom,
  Cpu,
  Wind,
  ChartLineUp,
  ShieldCheck
} from '@phosphor-icons/react';

export const ResearchSection: React.FC = () => {
  const researchDomains = [
    {
      index: '01',
      title: 'High-Angle-of-Attack Vortex Aerodynamics',
      domain: 'Computational Fluid Dynamics // Mach 0.3–1.4',
      description: 'Numerical modeling of leading-edge vortex stability and breakdown delay over compound delta wings. Transient OpenFOAM compressible simulations resolving pressure gradients across critical pitch attitudes up to 38° AoA.',
      focus: 'Vortex Burst Mitigation & High-AoA Combat Agility',
      icon: Wind,
      accentText: 'text-cyan-400',
      tag: 'CFD & COMPRESSIBLE FLOW',
    },
    {
      index: '02',
      title: 'Neural-Guided Sensory Fusion for Autonomous UAVs',
      domain: 'Avionics & Adaptive Flight Control Systems',
      description: 'LQR state feedback architectures coupled with Extended Kalman Filter sensor fusion across dual IMUs, optical flow cameras, and RTK GNSS for precision GPS-denied navigation and dynamic trajectory re-planning.',
      focus: 'Precision Hovering (±2.5 cm) & Low-Latency State Estimation',
      icon: Cpu,
      accentText: 'text-emerald-400',
      tag: 'ADAPTIVE CONTROL',
    },
    {
      index: '03',
      title: 'Solid Propellant Grain Geometry & Ballistics',
      domain: 'Aero-Propulsion & Combustion Dynamics',
      description: 'Internal ballistics simulation calculating progressive-regressive burn area evolution in star-grain configurations, de Laval nozzle erosion dynamics, and chamber pressure limits validated on static test firing rigs.',
      focus: 'Grain Burn Optimization & Impulse Delivery Under 4.8 MPa',
      icon: Atom,
      accentText: 'text-amber-400',
      tag: 'PROPULSION DYNAMICS',
    },
    {
      index: '04',
      title: 'Hypersonic Shock-Wave Boundary Layer Interaction',
      domain: 'Scramjet Aerodynamics // Mach 5.0+',
      description: 'Parametric compression-bump and diverterless supersonic intake (DSI) modeling for boundary layer diversion, shock-on-lip optimization, and localized stagnation heating at Mach 5.5.',
      focus: 'Intake Pressure Recovery (94.2%) & Carbon Composite Thermal Limits',
      icon: ChartLineUp,
      accentText: 'text-purple-400',
      tag: 'HYPERSONICS',
    },
  ];

  return (
    <section id="sec-research-archive" className="py-20 sm:py-28 lg:py-32 border-b border-slate-800/60 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Editorial Air */}
        <div className="pb-10 sm:pb-14 border-b border-slate-800/60 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-none bg-cyan-400" />
              <span className="text-xs font-mono-tech text-cyan-400 font-bold tracking-widest uppercase">
                RESEARCH ARCHIVE // THEORETICAL & COMPUTATIONAL
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight font-heading">
              Aerospace Research & Engineering Domains
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed font-sans">
              Rigorous investigations into supersonic aerodynamics, adaptive UAV avionics, internal rocket ballistics, and hypersonic compression physics.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono-tech text-slate-400">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>DAYANANDA SAGAR LAB VALIDATED</span>
          </div>
        </div>

        {/* Editorial Research List (Distinct from repetitive boxed cards) */}
        <div className="divide-y divide-slate-800/60 mt-4">
          {researchDomains.map((res) => {
            const Icon = res.icon;
            return (
              <div
                key={res.index}
                className="py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start group hover:bg-slate-900/40 px-4 -mx-4 rounded-none border-l-2 border-transparent hover:border-cyan-400 transition-all duration-200"
              >
                {/* Number & Domain Tag */}
                <div className="lg:col-span-3 space-y-2">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-3xl sm:text-4xl font-extrabold font-heading tabular-nums text-slate-700 group-hover:text-slate-500 transition-colors">
                      {res.index}
                    </span>
                    <span className={`text-xs font-mono-tech tracking-wider uppercase font-semibold ${res.accentText}`}>
                      {res.tag}
                    </span>
                  </div>
                  <div className="text-xs font-mono-tech text-slate-400">
                    {res.domain}
                  </div>
                </div>

                {/* Main Content & Focus */}
                <div className="lg:col-span-7 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-blue-300 transition-colors font-heading">
                    {res.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    {res.description}
                  </p>
                  <div className="pt-1 flex items-center space-x-2 text-xs font-mono-tech text-slate-400">
                    <span className="text-slate-500">CORE FOCUS:</span>
                    <span className="text-slate-200 font-medium">{res.focus}</span>
                  </div>
                </div>

                {/* Icon & CTA */}
                <div className="lg:col-span-2 flex lg:justify-end items-center">
                    <div className="w-12 h-12 rounded-none bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 group-hover:border-slate-700 group-hover:text-white transition-all shadow-sm">
                      <Icon size={24} />
                    </div>
                  </div>
                </div>
                );
          })}
              </div>

      </div>
    </section>
  );
};
