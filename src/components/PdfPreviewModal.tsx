import React, { useEffect } from 'react';
import {
  X,
  DownloadSimple,
  ArrowSquareOut,
  FilePdf,
  ShieldCheck
} from '@phosphor-icons/react';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string | null;
  documentTitle: string;
  documentCodename?: string;
  fileName?: string;
  fileSize?: string;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  documentTitle,
  documentCodename,
  fileName,
  fileSize,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !pdfUrl) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = fileName || `${documentTitle.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl h-[90vh] skeuo-panel rounded-none border-2 border-slate-700 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar with Cockpit Bezel */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-800/80 bg-slate-900/90">
          <div className="flex items-center space-x-3.5 min-w-0">
              <div className="w-10 h-10 rounded-none skeuo-button flex items-center justify-center text-amber-400 shrink-0">
                <FilePdf size={22} weight="fill" />
              </div>
              <div className="truncate">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-mono-tech text-amber-400 font-bold uppercase tracking-wider">
                    {documentCodename || 'TECHNICAL REPORT'}
                  </span>
                    <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] font-mono-tech bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-none border border-emerald-500/20">
                      <ShieldCheck size={13} />
                      <span>DEPT. VERIFIED</span>
                    </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-100 truncate font-heading">
                  {documentTitle}
                </h3>
              </div>
            </div>

            {/* Action buttons with physical depth */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={handleDownload}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-none skeuo-button text-slate-200 text-xs font-mono-tech uppercase"
                title="Download File"
              >
                <DownloadSimple size={15} />
                <span>Download</span>
              </button>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="skeuo-button-amber inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-none text-xs font-mono-tech font-bold uppercase"
                title="Open in new window"
              >
                <ArrowSquareOut size={15} weight="bold" />
                <span className="hidden sm:inline">New Tab</span>
              </a>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-none skeuo-button flex items-center justify-center text-slate-400 hover:text-white ml-1"
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Embedded Viewer Surface (Debossed Cockpit Screen) */}
          <div className="flex-1 p-3 bg-[#060910] relative w-full h-full">
            <object
              data={pdfUrl}
              type="application/pdf"
              className="w-full h-full rounded-none skeuo-debossed"
            >
              {/* Fallback for browsers without native PDF plugin */}
              <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
                <FilePdf size={48} className="text-amber-400" />
                <div className="space-y-1">
                  <p className="text-slate-200 font-medium font-heading">Embedded PDF viewer unavailable in this environment.</p>
                  <p className="text-xs text-slate-400 font-mono-tech">
                    File: {fileName || 'aerospace-document.pdf'} {fileSize && `(${fileSize})`}
                  </p>
                </div>
                <button
                  onClick={handleDownload}
                  className="skeuo-button-amber inline-flex items-center space-x-2 px-5 py-2.5 rounded-none font-bold text-xs font-mono-tech uppercase tracking-wider"
                >
                  <DownloadSimple size={16} weight="bold" />
                  <span>Download PDF Directly</span>
                </button>
              </div>
            </object>
          </div>

          {/* Footer info bar */}
          <div className="px-5 py-2.5 bg-slate-900/90 border-t border-slate-800/80 text-[11px] font-mono-tech text-slate-400 flex items-center justify-between">
            <span>Author: Nandan M. // Dayananda Sagar</span>
            <span>{fileName ? `Doc: ${fileName}` : 'Technical Publication'}</span>
          </div>
        </div>
      </div>
      );
};
