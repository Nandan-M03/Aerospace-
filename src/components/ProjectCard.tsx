import React from 'react';
import {
  FilePdf,
  PencilSimple,
  Trash,
  UploadSimple,
  ArrowRight
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
      <div className="relative group flex flex-col justify-between rounded-none p-7 sm:p-8 bg-[#000000] border-2 border-slate-800 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1">

        {/* Top Codename, Date & Controls */}
        <div>
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-800/70">
            <span className="text-xs font-mono-tech text-amber-400 font-bold tracking-widest uppercase flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-none bg-amber-400" />
              <span>{project.codename || 'PROJECT // SPEC'}</span>
            </span>
            <div className="flex items-center space-x-2 shrink-0">
              {project.date && (
                <span className="text-[11px] font-mono-tech tabular-nums text-slate-400">
                  {project.date}
                </span>
              )}
              {editMode && (
                <div className="flex items-center space-x-1 pl-1">
                  <button
                    onClick={() => onEditProject(project)}
                    title="Edit Specifications"
                    className="w-7 h-7 rounded-none skeuo-button flex items-center justify-center text-slate-300 hover:text-amber-400"
                  >
                    <PencilSimple size={14} />
                  </button>
                  <button
                    onClick={() => onDeleteProject(project.id)}
                    title="Delete Card"
                    className="w-7 h-7 rounded-none skeuo-button flex items-center justify-center text-slate-400 hover:text-red-400"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Large Crisp Title */}
          <h3 className="mt-4 text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-blue-300 transition-colors leading-snug font-heading">
            {project.title}
          </h3>

          {/* Clear Summary */}
          <p className="mt-3 text-sm text-slate-300 leading-relaxed font-sans">
            {project.summary}
          </p>

          {/* Streamlined Specifications (Clean Grid without nested box clutter) */}
          {project.specs && project.specs.length > 0 && (
            <div className="mt-5 pt-4 border-t border-slate-800/60 grid grid-cols-2 gap-3 text-xs font-mono-tech tabular-nums">
              {project.specs.map((spec, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">{spec.label}</div>
                  <div className="text-slate-200 font-semibold truncate">{spec.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Minimalist Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-[10px] font-mono-tech whitespace-nowrap text-slate-400 bg-slate-900/60 border border-slate-700/80 rounded-none uppercase"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer: Clean PDF Trigger & Quick Upload */}
        <div className="mt-7 pt-5 border-t border-slate-800/70 flex flex-wrap items-center justify-between gap-3">
          <input
            type="file"
            ref={fileInputRef}
            accept="application/pdf"
            onChange={handleQuickPdfUpload}
            className="hidden"
          />

          {project.pdfName ? (
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={() => onPreviewPdf(project)}
                className="flex-1 sm:flex-initial btn-afterburner-blue px-4 py-2.5 rounded-none text-white text-xs font-mono-tech font-bold inline-flex items-center justify-center space-x-2 transition-all cursor-pointer uppercase tracking-wider"
              >
                <FilePdf size={16} weight="fill" />
                <span>Preview Technical PDF</span>
                <ArrowRight size={13} weight="bold" />
              </button>
              {project.pdfSize && (
                <span className="hidden sm:inline-block text-[11px] font-mono-tech tabular-nums text-slate-400">
                  {project.pdfSize}
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-xs font-mono-tech text-slate-400">
              <FilePdf size={16} className="text-slate-600" />
              <span>Document archived in lab</span>
            </div>
          )}

          {editMode && (
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Upload PDF document"
              className="skeuo-button px-3.5 py-2 rounded-none text-slate-300 hover:text-amber-300 text-xs font-mono-tech inline-flex items-center space-x-1.5 cursor-pointer uppercase tracking-wider"
            >
              <UploadSimple size={14} />
              <span>{project.pdfName ? 'Replace PDF' : 'Upload PDF'}</span>
            </button>
          )}
        </div>
      </div>
      );
};
