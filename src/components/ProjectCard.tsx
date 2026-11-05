import React from 'react';
import {
  FilePdf,
  PencilSimple,
  Trash,
  UploadSimple,
  CaretRight
} from '@phosphor-icons/react';
import { Project } from '../types/portfolio';
import { savePdfToStorage } from '../utils/storage';

interface ProjectCardProps {
  project: Project;
  editMode: boolean;
  onPreviewPdf: (project: Project) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onUpdateProject: (updated: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  editMode,
  onPreviewPdf,
  onEditProject,
  onDeleteProject,
  onUpdateProject,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleQuickPdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      alert('Please upload a valid PDF file.');
      return;
    }

    try {
      const generatedId = `pdf-${project.id}-${Date.now()}`;
      await savePdfToStorage(generatedId, file, file.name);
      const sizeFormatted = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

      onUpdateProject({
        ...project,
        pdfName: file.name,
        pdfSize: sizeFormatted,
        pdfDataId: generatedId,
      });
    } catch (err) {
      console.error(err);
      alert('Failed to cache PDF.');
    }
  };

  return (
    <div className="relative group flex flex-col justify-between bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 rounded-xl p-5 sm:p-6 transition-all duration-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.35)] backdrop-blur-sm">

      {/* Top Codename & Controls */}
      <div>
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
          <span className="text-[11px] font-mono-tech text-amber-400 font-semibold tracking-wider uppercase truncate">
            {project.codename || 'PROJECT // SPEC'}
          </span>
          <div className="flex items-center space-x-1.5 shrink-0">
            {project.date && (
              <span className="text-[11px] font-mono-tech text-slate-500">
                {project.date}
              </span>
            )}
            {editMode && (
              <div className="flex items-center space-x-1 pl-2 border-l border-slate-800">
                <button
                  onClick={() => onEditProject(project)}
                  title="Edit Specifications"
                  className="p-1 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded transition-colors"
                >
                  <PencilSimple size={14} />
                </button>
                <button
                  onClick={() => onDeleteProject(project.id)}
                  title="Delete Card"
                  className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-3 text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors leading-snug">
          {project.title}
        </h3>

        {/* Summary Description */}
        <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
          {project.summary}
        </p>

        {/* Technical Specifications Grid */}
        {project.specs && project.specs.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800/60 grid grid-cols-2 gap-2 text-xs font-mono-tech">
            {project.specs.map((spec, i) => (
              <div key={i} className="p-2 rounded bg-slate-950/70 border border-slate-800/80">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">{spec.label}</div>
                <div className="text-slate-200 font-medium truncate mt-0.5">{spec.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[10px] font-mono-tech text-slate-400 bg-slate-800/40 border border-slate-800 rounded-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: PDF Preview & Quick Upload */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <input
          type="file"
          ref={fileInputRef}
          accept="application/pdf"
          onChange={handleQuickPdfUpload}
          className="hidden"
        />

        {project.pdfName ? (
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={() => onPreviewPdf(project)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-3.5 py-2 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono-tech font-bold transition-all hover:shadow-[0_0_12px_rgba(245,158,11,0.2)]"
            >
              <FilePdf size={16} weight="fill" />
              <span>Preview Technical PDF</span>
              <CaretRight size={13} weight="bold" />
            </button>
            {project.pdfSize && (
              <span className="hidden sm:inline-block text-[11px] font-mono-tech text-slate-500">
                {project.pdfSize}
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-xs font-mono-tech text-slate-500">
            <FilePdf size={16} className="text-slate-600" />
            <span>No PDF attached yet</span>
          </div>
        )}

        {editMode && (
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Upload or replace PDF document"
            className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono-tech border border-slate-700 transition-colors"
          >
            <UploadSimple size={14} />
            <span>{project.pdfName ? 'Replace PDF' : 'Upload PDF'}</span>
          </button>
        )}
      </div>
    </div>
  );
};