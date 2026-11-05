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
      className="py-12 sm:py-16 border-b border-slate-800/60 relative scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="pb-6 mb-8 border-b border-slate-800/80">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Left title and callsign */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono-tech text-amber-400 font-bold tracking-widest uppercase">
                  {section.callsign}
                </span>
                <span className="text-xs font-mono-tech text-slate-500">
                  [{section.projects.length} {section.projects.length === 1 ? 'FILE' : 'FILES'}]
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
                {section.title}
              </h2>
            </div>

            {/* Edit Mode Section Reordering & Management */}
            {editMode && (
              <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg">
                <button
                  disabled={index === 0}
                  onClick={() => onMoveUp(index)}
                  title="Move section up in order"
                  className="p-1.5 rounded text-slate-300 hover:text-amber-400 disabled:opacity-30 disabled:hover:text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  <ArrowUp size={16} weight="bold" />
                </button>
                <button
                  disabled={index === totalSections - 1}
                  onClick={() => onMoveDown(index)}
                  title="Move section down in order"
                  className="p-1.5 rounded text-slate-300 hover:text-amber-400 disabled:opacity-30 disabled:hover:text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  <ArrowDown size={16} weight="bold" />
                </button>
                <div className="h-4 w-[1px] bg-slate-800" />
                <button
                  onClick={() => setIsEditingMeta(!isEditingMeta)}
                  title="Edit Section Name & Description"
                  className="p-1.5 rounded text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                >
                  <PencilSimple size={16} />
                </button>
                <button
                  onClick={() => onAddProject(section.id)}
                  title="Add Project to this section"
                  className="inline-flex items-center space-x-1 px-2 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded text-xs font-mono-tech hover:bg-amber-500/20"
                >
                  <Plus size={14} weight="bold" />
                  <span className="hidden sm:inline">Add Item</span>
                </button>
                {totalSections > 1 && (
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete the entire "${section.title}" section?`)) {
                        onDeleteSection(section.id);
                      }
                    }}
                    title="Delete Section"
                    className="p-1.5 rounded text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash size={16} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Section description */}
          {isEditingMeta ? (
            <div className="mt-4 p-4 bg-slate-900 border border-amber-500/30 rounded-lg space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono-tech text-slate-400">Section Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-sm text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono-tech text-slate-400">Callsign / Code</label>
                  <input
                    type="text"
                    value={editCallsign}
                    onChange={(e) => setEditCallsign(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-amber-400 font-mono-tech"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-mono-tech text-slate-400">Section Description</label>
                <textarea
                  rows={2}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-sm text-slate-200"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsEditingMeta(false)}
                  className="px-3 py-1 text-xs font-mono-tech text-slate-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveMeta}
                  className="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded text-xs font-mono-tech"
                >
                  Save Section
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-400 max-w-3xl leading-relaxed">
              {section.description}
            </p>
          )}
        </div>

        {/* Projects Grid */}
        {section.projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
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
          <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/40">
            <FolderPlus size={36} className="mx-auto text-slate-600 mb-2" />
            <p className="text-slate-400 text-sm font-medium">No projects in this section yet.</p>
            {editMode && (
              <button
                onClick={() => onAddProject(section.id)}
                className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1.5 bg-amber-500 text-slate-950 rounded font-bold text-xs font-mono-tech"
              >
                <Plus size={14} weight="bold" />
                <span>Add First Project</span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

