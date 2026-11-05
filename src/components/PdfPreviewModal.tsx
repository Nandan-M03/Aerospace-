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
        className="relative w-full max-w-5xl h-[90vh] bg-[#0A0F1D] border border-slate-700 rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="p-2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <FilePdf size={22} weight="fill" />
            </div>
            <div className="truncate">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono-tech text-amber-400 font-bold uppercase tracking-wider">
                  {documentCodename || 'TECHNICAL REPORT'}
                </span>
                <span className="hidden sm:inline-flex items-center space-x-1 text-[11px] font-mono-tech bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  <ShieldCheck size={13} />
                  <span>DEPT. VERIFIED</span>
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-100 truncate">
                {documentTitle}
              </h3>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleDownload}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono-tech transition-colors border border-slate-700"
              title="Download File"
            >
              <DownloadSimple size={15} />
              <span>Download</span>
            </button>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono-tech transition-colors"
              title="Open in new window"
            >
              <ArrowSquareOut size={15} weight="bold" />
              <span className="hidden sm:inline">New Tab</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Embedded Viewer Surface */}
        <div className="flex-1 bg-slate-950/90 relative w-full h-full p-2">
          <object
            data={pdfUrl}
            type="application/pdf"
            className="w-full h-full rounded border border-slate-800/80"
          >
            {/* Fallback for browsers without native PDF plugin */}
            <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
              <FilePdf size={48} className="text-amber-400" />
              <div className="space-y-1">
                <p className="text-slate-200 font-medium">Embedded PDF viewer unavailable in this environment.</p>
                <p className="text-xs text-slate-400 font-mono-tech">
                  File: {fileName || 'aerospace-document.pdf'} {fileSize && `(${fileSize})`}
                </p>
              </div>
              <button
                onClick={handleDownload}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-500 text-slate-950 rounded font-bold text-xs font-mono-tech hover:bg-amber-400"
              >
                <DownloadSimple size={16} weight="bold" />
                <span>Download PDF Directly</span>
              </button>
            </div>
          </object>
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 text-[11px] font-mono-tech text-slate-400 flex items-center justify-between">
          <span>Author: Nandan M. // Dayananda Sagar</span>
          <span>{fileName ? `Doc: ${fileName}` : 'Technical Publication'}</span>
        </div>
      </div>
    </div>
  );
};

