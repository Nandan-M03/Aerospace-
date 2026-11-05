import React, { useState } from 'react';
import {
  X,
  FilePdf,
  UploadSimple,
  Plus,
  Trash,
  FloppyDisk,
  WarningCircle
} from '@phosphor-icons/react';
import { Project, TechnicalSpec } from '../types/portfolio';
import { savePdfToStorage } from '../utils/storage';

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSave: (updatedProject: Project) => void;
}

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isOpen,
  onClose,
  project,
  onSave,
}) => {
  if (!isOpen || !project) return null;

  const [title, setTitle] = useState(project.title);
  const [codename, setCodename] = useState(project.codename || '');
  const [summary, setSummary] = useState(project.summary);
  const [details, setDetails] = useState(project.details || '');
  const [tagsString, setTagsString] = useState(project.tags.join(', '));
  const [specs, setSpecs] = useState<TechnicalSpec[]>(project.specs || []);
  const [pdfName, setPdfName] = useState(project.pdfName || '');
  const [pdfSize, setPdfSize] = useState(project.pdfSize || '');
  const [pdfDataId, setPdfDataId] = useState(project.pdfDataId || '');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  const handleAddSpec = () => {
    setSpecs([...specs, { label: 'Metric', value: 'Value' }]);
  };

  const handleUpdateSpec = (index: number, field: 'label' | 'value', val: string) => {
    const updated = [...specs];
    updated[index] = { ...updated[index], [field]: val };
    setSpecs(updated);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      alert('Please upload a valid PDF document.');
      return;
    }

    try {
      setIsUploading(true);
      const generatedId = `pdf-${project.id}-${Date.now()}`;
      await savePdfToStorage(generatedId, file, file.name);

      const sizeFormatted = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      setPdfName(file.name);
      setPdfSize(sizeFormatted);
      setPdfDataId(generatedId);
      setUploadNotice(`PDF "${file.name}" cached successfully.`);
    } catch (err) {
      console.error(err);
      alert('Error saving PDF to storage.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProject: Project = {
      ...project,
      title: title.trim(),
      codename: codename.trim(),
      summary: summary.trim(),
      details: details.trim(),
      tags: tagsString.split(',').map((t) => t.trim()).filter(Boolean),
      specs,
      pdfName,
      pdfSize,
      pdfDataId,
    };
    onSave(updatedProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div
        className="relative w-full max-w-2xl skeuo-panel rounded-none border-2 border-slate-700 p-6 sm:p-7 text-slate-100 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center space-x-2">
            <span className="font-mono-tech text-amber-400 font-bold text-xs uppercase tracking-wider">
              SPECIFICATION EDITOR
            </span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-xs text-slate-300 font-mono-tech truncate max-w-[200px]">{project.title}</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-none skeuo-button flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono-tech text-slate-300 mb-1.5 uppercase">
                Project / Aircraft Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full skeuo-debossed rounded-none px-3.5 py-2 text-base sm:text-sm text-slate-100 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono-tech text-slate-300 mb-1.5 uppercase">
                Codename / Call-Sign
              </label>
              <input
                type="text"
                value={codename}
                onChange={(e) => setCodename(e.target.value)}
                placeholder="e.g. PROJECT GARUDA // CFD-VORTEX"
                className="w-full skeuo-debossed rounded-none px-3.5 py-2 text-base sm:text-sm text-amber-400 font-mono-tech focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-tech text-slate-300 mb-1.5 uppercase">
              Executive Summary *
            </label>
            <textarea
              required
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full skeuo-debossed rounded-none px-3.5 py-2 text-base sm:text-sm text-slate-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-tech text-slate-300 mb-1.5 uppercase">
              In-Depth Technical Details / Methodology
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full skeuo-debossed rounded-none px-3.5 py-2 text-base sm:text-sm text-slate-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-tech text-slate-300 mb-1.5 uppercase">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsString}
              onChange={(e) => setTagsString(e.target.value)}
              placeholder="CFD, Supersonic, Delta-Wing, Pixhawk"
              className="w-full skeuo-debossed rounded-none px-3.5 py-2 text-base sm:text-xs font-mono-tech text-slate-300 focus:outline-none"
            />
          </div>

          {/* Technical Specs Array */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono-tech text-slate-300 uppercase">
                Technical Specifications (Telemetry / Dimensions / Mach)
              </label>
              <button
                type="button"
                onClick={handleAddSpec}
                className="inline-flex items-center space-x-1 text-xs text-amber-400 font-mono-tech hover:underline"
              >
                <Plus size={14} />
                <span>Add Metric</span>
              </button>
            </div>
            <div className="space-y-2">
              {specs.map((spec, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={spec.label}
                    onChange={(e) => handleUpdateSpec(i, 'label', e.target.value)}
                    placeholder="Metric (e.g. Wingspan)"
                    className="flex-1 skeuo-debossed rounded-none px-3 py-1.5 text-base sm:text-xs text-slate-300 font-mono-tech"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleUpdateSpec(i, 'value', e.target.value)}
                    placeholder="Value (e.g. 2.8 meters)"
                    className="flex-1 skeuo-debossed rounded-none px-3 py-1.5 text-base sm:text-xs text-amber-400 font-mono-tech"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(i)}
                    className="w-7 h-7 rounded-none skeuo-button flex items-center justify-center text-slate-400 hover:text-red-400"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* PDF Upload Zone */}
          <div className="pt-2 border-t border-slate-800/80">
            <label className="block text-xs font-mono-tech text-slate-300 mb-2 uppercase">
              Attached Technical PDF Document
            </label>
              <div className="p-4 rounded-none skeuo-debossed flex flex-col items-center justify-center space-y-2.5">
                <FilePdf size={30} className="text-amber-400" />
                {pdfName ? (
                  <div className="text-center">
                    <p className="text-xs font-mono-tech text-emerald-400 font-bold truncate max-w-xs">
                      {pdfName} {pdfSize && `(${pdfSize})`}
                    </p>
                    <p className="text-[11px] text-slate-400">Ready for instant interactive preview</p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 font-mono-tech text-center">
                    Attach research report, CAD brief, or flight test data (PDF)
                  </p>
                )}
                  <label className="cursor-pointer skeuo-button inline-flex items-center space-x-2 px-4 py-2 rounded-none text-xs font-mono-tech text-slate-200 uppercase tracking-wider">
                    <UploadSimple size={15} />
                    <span>{pdfName ? 'Replace PDF File' : 'Select PDF File'}</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {isUploading && (
                    <p className="text-xs text-amber-400 font-mono-tech animate-pulse">Uploading and caching to IndexedDB...</p>
                  )}
                  {uploadNotice && (
                    <p className="text-xs text-emerald-400 font-mono-tech flex items-center space-x-1">
                      <WarningCircle size={14} />
                      <span>{uploadNotice}</span>
                    </p>
                  )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800/80">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono-tech text-slate-400 hover:text-slate-200 uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="skeuo-button-amber inline-flex items-center space-x-2 px-5 py-2.5 rounded-none font-bold text-xs font-mono-tech uppercase tracking-wider"
              >
                <FloppyDisk size={16} weight="bold" />
                <span>Save Changes</span>
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};
