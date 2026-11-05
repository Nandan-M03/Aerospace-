import React from 'react';
import {
  EnvelopeSimple,
  LinkedinLogo,
  GithubLogo,
  ArrowUpRight
} from '@phosphor-icons/react';
import { StudentProfile } from '../types/portfolio';

interface ContactSectionProps {
  profile: StudentProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  return (
    <section id="sec-contact" className="py-20 sm:py-28 lg:py-32 border-b border-slate-800/60 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="pb-10 sm:pb-14 border-b border-slate-800/60">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-none bg-blue-400" />
            <span className="text-xs font-mono-tech text-blue-400 font-bold tracking-widest uppercase">
              COMMUNICATION LINK // TELEMETRY DIRECT
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight font-heading mt-2">
            Establish Direct Contact
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed font-sans">
            Interested in aerospace research collaboration, UAV dynamic control architectures, or aerodynamic simulation inquiries? Connect directly.
          </p>
        </div>

        {/* 3 Prominent Communication Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-14">

          {/* Email */}
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="p-8 rounded-none bg-[#000000] border-2 border-slate-800 hover:border-slate-600 group transition-all duration-300 flex flex-col justify-between min-h-[220px] hover:-translate-y-1.5"
            >
              <div className="space-y-4">
                  <div className="w-12 h-12 rounded-none bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <EnvelopeSimple size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider">
                      Direct Email Dispatch
                    </div>
                    <div className="text-base sm:text-lg font-bold font-mono-tech text-slate-100 group-hover:text-blue-300 transition-colors break-all mt-1">
                      {profile.email}
                    </div>
                  </div>
                </div>
                  <div className="pt-4 border-t border-slate-800/60 text-xs font-mono-tech text-blue-400 flex items-center space-x-1.5 uppercase tracking-wider">
                    <span>Send Email</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </a>
          )}

                {/* LinkedIn */}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-8 rounded-none bg-[#000000] border-2 border-slate-800 hover:border-slate-600 group transition-all duration-300 flex flex-col justify-between min-h-[220px] hover:-translate-y-1.5"
                  >
                    <div className="space-y-4">
                        <div className="w-12 h-12 rounded-none bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <LinkedinLogo size={24} />
                        </div>
                        <div>
                          <div className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider">
                            Professional Network
                          </div>
                          <div className="text-base sm:text-lg font-bold font-mono-tech text-slate-100 group-hover:text-blue-300 transition-colors mt-1">
                            LinkedIn Dossier
                          </div>
                        </div>
                      </div>
                        <div className="pt-4 border-t border-slate-800/60 text-xs font-mono-tech text-blue-400 flex items-center space-x-1.5 uppercase tracking-wider">
                          <span>Connect on LinkedIn</span>
                          <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                      </a>
          )}

                      {/* GitHub */}
                      {profile.github && (
                        <a
                          href={profile.github}
                          target="_blank"
                          rel="noreferrer"
                          className="p-8 rounded-none bg-[#000000] border-2 border-slate-800 hover:border-slate-600 group transition-all duration-300 flex flex-col justify-between min-h-[220px] hover:-translate-y-1.5"
                        >
                          <div className="space-y-4">
                              <div className="w-12 h-12 rounded-none bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <GithubLogo size={24} />
                              </div>
                              <div>
                                <div className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider">
                                  Code & Simulation Scripts
                                </div>
                                <div className="text-base sm:text-lg font-bold font-mono-tech text-slate-100 group-hover:text-blue-300 transition-colors mt-1">
                                  GitHub Repository
                                </div>
                              </div>
                            </div>
                              <div className="pt-4 border-t border-slate-800/60 text-xs font-mono-tech text-blue-400 flex items-center space-x-1.5 uppercase tracking-wider">
                                <span>Inspect Source Code</span>
                                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                              </div>
                            </a>
          )}

                          </div>

                        </div>
    </section>
                    );
};
