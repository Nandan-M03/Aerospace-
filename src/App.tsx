import React, { useState, useEffect } from 'react';
import {
  PortfolioData,
  PortfolioSection,
  Project,
  StudentProfile,
  Quote
} from './types/portfolio';
import {
  loadPortfolioData,
  savePortfolioData,
  resetPortfolioData,
  getPdfFromStorage
} from './utils/storage';
import { createSamplePdfDataUri } from './data/initialData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectSection } from './components/ProjectSection';
import { PdfPreviewModal } from './components/PdfPreviewModal';
import { EditProjectModal } from './components/EditProjectModal';
import { Plus, GithubLogo, LinkedinLogo, EnvelopeSimple, ArrowUp } from '@phosphor-icons/react';

export default function App() {
  const [data, setData] = useState<PortfolioData>(loadPortfolioData);
  const [editMode, setEditMode] = useState(false);

  // PDF Preview Modal state
  const [previewState, setPreviewState] = useState<{
    isOpen: boolean;
    pdfUrl: string | null;
    title: string;
    codename?: string;
    fileName?: string;
    fileSize?: string;
  }>({
    isOpen: false,
    pdfUrl: null,
    title: '',
  });

  // Project Editor Modal state
  const [editingProjectState, setEditingProjectState] = useState<{
    isOpen: boolean;
    project: Project | null;
    sectionId: string | null;
  }>({
    isOpen: false,
    project: null,
    sectionId: null,
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    savePortfolioData(data);
  }, [data]);

  // Section Reordering handlers
  const handleMoveSectionUp = (index: number) => {
    if (index === 0) return;
    const newSections = [...data.sections];
    const temp = newSections[index - 1];
    newSections[index - 1] = newSections[index];
    newSections[index] = temp;
    setData((prev) => ({ ...prev, sections: newSections }));
  };

  const handleMoveSectionDown = (index: number) => {
    if (index === data.sections.length - 1) return;
    const newSections = [...data.sections];
    const temp = newSections[index + 1];
    newSections[index + 1] = newSections[index];
    newSections[index] = temp;
    setData((prev) => ({ ...prev, sections: newSections }));
  };

  const handleUpdateSection = (updatedSection: PortfolioSection) => {
    const updated = data.sections.map((s) =>
      s.id === updatedSection.id ? updatedSection : s
    );
    setData((prev) => ({ ...prev, sections: updated }));
  };

  const handleDeleteSection = (sectionId: string) => {
    const filtered = data.sections.filter((s) => s.id !== sectionId);
    setData((prev) => ({ ...prev, sections: filtered }));
  };

  const handleAddNewSection = () => {
    const secNum = data.sections.length + 1;
    const newSection: PortfolioSection = {
      id: `sec-${Date.now()}`,
      key: `custom-sec-${secNum}`,
      title: `New Section ${secNum}`,
      callsign: `SEC-0${secNum} // AERONAUTICAL RESEARCH`,
      description: 'Documenting specialized flight dynamics, propulsion tests, and telemetry analysis.',
      projects: [],
    };
    setData((prev) => ({ ...prev, sections: [...prev.sections, newSection] }));
  };

  // Preview PDF handler
  const handleOpenPdfPreview = async (project: Project) => {
    let url: string | null = null;
    if (project.pdfDataId) {
      const stored = await getPdfFromStorage(project.pdfDataId);
      if (stored) {
        url = stored.dataUrl;
      }
    }

    // If no custom uploaded PDF yet, generate live formatted sample PDF
    if (!url) {
      url = createSamplePdfDataUri(project.title, project.codename || 'AEROSPACE RESEARCH');
    }

    setPreviewState({
      isOpen: true,
      pdfUrl: url,
      title: project.title,
      codename: project.codename,
      fileName: project.pdfName || `${project.title.replace(/\s+/g, '_')}.pdf`,
      fileSize: project.pdfSize,
    });
  };

  // Project Add / Edit handlers
  const handleOpenAddProject = (sectionId: string) => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: 'New Aeronautical Investigation',
      codename: 'PROJECT // ARCHIVE',
      summary: 'Brief overview of aerodynamic experiments and computational fluid results.',
      tags: ['Aerospace', 'Research', 'Simulation'],
      specs: [
        { label: 'Category', value: 'Flight Mechanics' },
        { label: 'Status', value: 'Active Research' },
      ],
      date: new Date().getFullYear().toString(),
    };
    setEditingProjectState({
      isOpen: true,
      project: newProj,
      sectionId,
    });
  };

  const handleOpenEditProject = (project: Project, sectionId: string) => {
    setEditingProjectState({
      isOpen: true,
      project,
      sectionId,
    });
  };

  const handleSaveProject = (updatedProject: Project) => {
    if (!editingProjectState.sectionId) return;
    const secId = editingProjectState.sectionId;

    const updatedSections = data.sections.map((section) => {
      if (section.id !== secId) return section;
      const exists = section.projects.some((p) => p.id === updatedProject.id);
      const newProjects = exists
        ? section.projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
        : [...section.projects, updatedProject];
      return { ...section, projects: newProjects };
    });

    setData((prev) => ({ ...prev, sections: updatedSections }));
  };

  const handleDeleteProject = (projectId: string, sectionId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const updatedSections = data.sections.map((section) => {
      if (section.id !== sectionId) return section;
      return {
        ...section,
        projects: section.projects.filter((p) => p.id !== projectId),
      };
    });
    setData((prev) => ({ ...prev, sections: updatedSections }));
  };

  // Profile and Quotes handlers
  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...updated },
    }));
  };

  const handleUpdateQuotes = (quotes: Quote[]) => {
    setData((prev) => ({ ...prev, quotes }));
  };

  // Reset & Export/Import handlers
  const handleResetData = () => {
    if (confirm('Reset portfolio to initial defaults? All manual edits will be reverted.')) {
      const reset = resetPortfolioData();
      setData(reset);
    }
  };

  const handleExportData = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nandan_m_aerospace_portfolio_backup_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.sections && parsed.profile) {
          setData(parsed);
          alert('Portfolio data successfully imported and restored!');
        } else {
          alert('Invalid portfolio JSON structure.');
        }
      } catch (err) {
        console.error(err);
        alert('Failed to parse portfolio JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080C14] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navbar */}
      <Navbar
        editMode={editMode}
        onToggleEditMode={() => setEditMode(!editMode)}
        sections={data.sections}
        onResetData={handleResetData}
        onExportData={handleExportData}
        onImportData={handleImportData}
      />

      {/* Edit Mode Notice Banner */}
      {editMode && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-mono-tech font-bold text-center tracking-wide flex items-center justify-center space-x-2">
          <span>// EDIT MODE ARMED: Click on any section arrows (↑ / ↓) to reorder, edit titles, update quotes, or upload PDFs.</span>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section: Aerospace manifesto, quotes & student identity */}
        <HeroSection
          profile={data.profile}
          quotes={data.quotes}
          editMode={editMode}
          onUpdateProfile={handleUpdateProfile}
          onUpdateQuotes={handleUpdateQuotes}
        />

        {/* Dynamic Project Sections: Fighter Jets, Drones, UAVs, Others */}
        <div className="space-y-0">
          {data.sections.map((section, index) => (
            <ProjectSection
              key={section.id}
              section={section}
              index={index}
              totalSections={data.sections.length}
              editMode={editMode}
              onMoveUp={handleMoveSectionUp}
              onMoveDown={handleMoveSectionDown}
              onUpdateSection={handleUpdateSection}
              onDeleteSection={handleDeleteSection}
              onPreviewPdf={handleOpenPdfPreview}
              onEditProject={handleOpenEditProject}
              onDeleteProject={handleDeleteProject}
              onAddProject={handleOpenAddProject}
            />
          ))}
        </div>

        {/* Add New Section Button in Edit Mode */}
        {editMode && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <button
              onClick={handleAddNewSection}
              className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-xl text-slate-300 hover:text-amber-400 font-mono-tech text-xs tracking-wider transition-colors"
            >
              <Plus size={16} weight="bold" />
              <span>ADD CUSTOM AEROSPACE SECTION</span>
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#06090F] py-12 text-slate-400 font-mono-tech text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-heading text-sm font-bold text-slate-200">
              {data.profile.name} // AEROSPACE ENGINEERING
            </p>
            <p className="text-slate-500 text-[11px]">
              {data.profile.institution} &bull; {data.profile.department}
            </p>
            <p className="text-slate-600 text-[10px]">
              Ready for direct GitHub Pages static hosting
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {data.profile.email && (
              <a
                href={`mailto:${data.profile.email}`}
                className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
                title="Email Nandan"
              >
                <EnvelopeSimple size={18} />
              </a>
            )}
            {data.profile.linkedin && (
              <a
                href={data.profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedinLogo size={18} />
              </a>
            )}
            {data.profile.github && (
              <a
                href={data.profile.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
                title="GitHub"
              >
                <GithubLogo size={18} />
              </a>
            )}
            <button
              onClick={scrollToTop}
              title="Return to Top"
              className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </footer>

      {/* PDF Interactive Preview Modal */}
      <PdfPreviewModal
        isOpen={previewState.isOpen}
        onClose={() => setPreviewState((prev) => ({ ...prev, isOpen: false }))}
        pdfUrl={previewState.pdfUrl}
        documentTitle={previewState.title}
        documentCodename={previewState.codename}
        fileName={previewState.fileName}
        fileSize={previewState.fileSize}
      />

      {/* Edit Project Modal */}
      <EditProjectModal
        isOpen={editingProjectState.isOpen}
        onClose={() =>
          setEditingProjectState({ isOpen: false, project: null, sectionId: null })
        }
        project={editingProjectState.project}
        onSave={handleSaveProject}
      />
    </div>
  );
}
