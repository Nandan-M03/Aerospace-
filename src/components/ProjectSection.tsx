import React, { useState } from 'react';
import {
  ArrowUp,
  ArrowDown,
  PencilSimple,
  Plus,
  FolderPlus,
  Trash
} from '@phosphor-icons/react';
import { PortfolioSection, Project } from '../types/portfolio';
import { ProjectCard } from './ProjectCard';

interface ProjectSectionProps {
  section: PortfolioSection;
  index: number;
  totalSections: number;
  editMode: boolean;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onUpdateSection: (updated: PortfolioSection) => void;
  onDeleteSection: (sectionId: string) => void;
  onPreviewPdf: (project: Project) => void;
  onEditProject: (project: Project, sectionId: string) => void;
  onDeleteProject: (projectId: string, sectionId: string) => void;
  onAddProject: (sectionId: string) => void;
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({
  section,
  index,
  totalSections,
  editMode,
  onMoveUp,
  onMoveDown,
  onUpdateSection,
  onDeleteSection,
  onPreviewPdf,
  onEditProject,
  onDeleteProject,
  onAddProject,
}) => {
  const [isEditingMeta, setIsEditingMeta] = useState(false);
  const [editTitle, setEditTitle] = useState(section.title);
  const [editCallsign, setEditCallsign] = useState(section.callsign);
  const [editDesc, setEditDesc] = useState(section.description);

  const handleSaveMeta = () => {
    onUpdateSection({
      ...section,
      title: editTitle.trim(),
      callsign: editCallsign.trim(),
      description: editDesc.trim(),
    });
    setIsEditingMeta(false);
  };

  return (
    <section
      id={section.id}
      className="py-20 sm:py-28 lg:py-32 border-b border-slate-800/60 relative scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Generous Whitespace */}
        <div className="pb-10 mb-10 sm:mb-14 border-b border-slate-800/60">
          <div className="flex flex-wrap items-center justify-between gap-4">

            {/* Left title and callsign */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono-tech text-amber-400 font-bold tracking-widest uppercase">
                  {section.callsign}
                </span>
                  <span className="text-[11px] font-mono-tech tabular-nums text-slate-400 px-2.5 py-0.5 rounded-none border border-slate-800 bg-slate-900/60">
                    {section.projects.length} {section.projects.length === 1 ? 'RECORD' : 'RECORDS'}
                  </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight font-heading">
                {section.title}
              </h2>
            </div>

            {/* Edit Mode Section Reordering & Management */}
            {editMode && (
                <div className="flex items-center space-x-2 p-2 rounded-none skeuo-panel">
                  <button
                    disabled={index === 0}
                    onClick={() => onMoveUp(index)}
                    title="Move section up"
                    className="w-8 h-8 rounded-none skeuo-button flex items-center justify-center text-slate-300 hover:text-amber-400 disabled:opacity-25"
                  >
                    <ArrowUp size={15} weight="bold" />
                  </button>
                  <button
                    disabled={index === totalSections - 1}
                    onClick={() => onMoveDown(index)}
                    title="Move section down"
                    className="w-8 h-8 rounded-none skeuo-button flex items-center justify-center text-slate-300 hover:text-amber-400 disabled:opacity-25"
                  >
                    <ArrowDown size={15} weight="bold" />
                  </button>
                  <div className="h-5 w-[1px] bg-slate-800" />
                  <button
                    onClick={() => setIsEditingMeta(!isEditingMeta)}
                    title="Edit Section Name & Description"
                    className="w-8 h-8 rounded-none skeuo-button flex items-center justify-center text-slate-300 hover:text-amber-400"
                  >
                    <PencilSimple size={15} />
                  </button>
                  <button
                    onClick={() => onAddProject(section.id)}
                    title="Add Project"
                    className="skeuo-button px-3.5 py-1.5 rounded-none text-xs font-mono-tech text-amber-400 font-bold inline-flex items-center space-x-1.5"
                  >
                    <Plus size={14} weight="bold" />
                    <span className="hidden sm:inline">Add Item</span>
                  </button>
                  {totalSections > 1 && (
                    <button
                      onClick={() => {
                        if (confirm(`Delete entire "${section.title}" section?`)) {
                          onDeleteSection(section.id);
                        }
                      }}
                      title="Delete Section"
                      className="w-8 h-8 rounded-none skeuo-button flex items-center justify-center text-slate-400 hover:text-red-400"
                    >
                      <Trash size={15} />
                    </button>
                  )}
                </div>
            )}
              </div>

          {/* Section description */}
            {isEditingMeta ? (
                <div className="mt-5 p-5 skeuo-panel rounded-none space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono-tech text-slate-400 uppercase">Section Title</label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full skeuo-debossed rounded-none px-3.5 py-2 text-base sm:text-sm text-slate-100 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono-tech text-slate-400 uppercase">Callsign / Code</label>
                      <input
                        type="text"
                        value={editCallsign}
                        onChange={(e) => setEditCallsign(e.target.value)}
                        className="w-full skeuo-debossed rounded-none px-3.5 py-2 text-base sm:text-xs text-amber-400 font-mono-tech focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-mono-tech text-slate-400 uppercase">Section Description</label>
                    <textarea
                      rows={2}
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="w-full skeuo-debossed rounded-none px-3.5 py-2 text-base sm:text-sm text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end space-x-2.5 pt-1">
                    <button
                      onClick={() => setIsEditingMeta(false)}
                      className="px-3.5 py-1.5 text-xs font-mono-tech text-slate-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveMeta}
                      className="btn-afterburner-blue px-4 py-1.5 rounded-none text-xs font-mono-tech font-bold text-white uppercase tracking-wider"
                    >
                      Save Section
                    </button>
                  </div>
                </div>
                ) : (
                <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed font-sans">
                  {section.description}
                </p>
          )}
              </div>

        {/* Projects Grid with Ample Room */}
            {section.projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
                {section.projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    editMode={editMode}
                    onPreviewPdf={onPreviewPdf}
                    onEditProject={(p) => onEditProject(p, section.id)}
                    onDeleteProject={(id) => onDeleteProject(id, section.id)}
                    onUpdateProject={(updated) => {
                      const updatedProjects = section.projects.map((p) =>
                        p.id === updated.id ? updated : p
                      );
                      onUpdateSection({ ...section, projects: updatedProjects });
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 rounded-2xl skeuo-debossed">
                <FolderPlus size={40} className="mx-auto text-slate-600 mb-3" />
                <p className="text-slate-400 text-sm font-medium">No projects in this category yet.</p>
                {editMode && (
                  <button
                    onClick={() => onAddProject(section.id)}
                    className="mt-4 skeuo-button px-5 py-2.5 rounded-xl text-xs font-mono-tech font-bold text-amber-400 inline-flex items-center space-x-2"
                  >
                    <Plus size={15} weight="bold" />
                    <span>Add First Project</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
        );
};
