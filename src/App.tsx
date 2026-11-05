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
import { SystemsShowcaseSection } from './components/SystemsShowcaseSection';
import { ProjectSection } from './components/ProjectSection';
import { ResearchSection } from './components/ResearchSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { PdfPreviewModal } from './components/PdfPreviewModal';
import { EditProjectModal } from './components/EditProjectModal';
import { AuthModal } from './components/AuthModal';
import { Plus, GithubLogo, LinkedinLogo, EnvelopeSimple, ArrowUp, LockKey } from '@phosphor-icons/react';

export default function App() {
  const [data, setData] = useState<PortfolioData>(loadPortfolioData);
  const [editMode, setEditMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('nandan_aerospace_auth') === 'true';
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);

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

  // Handle Master Edit Mode Trigger (Checks password if not authenticated)
  const handleTriggerEditMode = () => {
    if (isAuthenticated) {
      setEditMode(!editMode);
    } else {
      setAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setEditMode(true);
  };

  const handleLockSession = () => {
    sessionStorage.removeItem('nandan_aerospace_auth');
    setIsAuthenticated(false);
    setEditMode(false);
  };

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

    // Fallback minimal PDF structure
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
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }
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
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }
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
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }
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
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }
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
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }
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

  const handleSelectCategory = (secId: string) => {
    const target = document.getElementById(secId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      const first = document.getElementById('sec-projects-all');
      if (first) first.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
      {/* Top Floating Navbar */}
      <Navbar
        editMode={editMode}
        isAuthenticated={isAuthenticated}
        onTriggerEditMode={handleTriggerEditMode}
        onLockSession={handleLockSession}
        sections={data.sections}
        onResetData={handleResetData}
        onExportData={handleExportData}
        onImportData={handleImportData}
      />

      {/* Edit Mode Notice Banner */}
      {editMode && (
        <div className="skeuo-panel border-b border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs font-mono-tech text-amber-300 flex items-center justify-between sticky top-18 z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-none led-armed" />
              <span className="font-bold tracking-wider">
                EDIT TERMINAL UNLOCKED (Nandan M.) &bull; Click arrows (↑ / ↓) to reorder, edit titles, update quotes, or upload PDFs.
              </span>
            </div>
            <button
              onClick={handleLockSession}
              className="skeuo-button px-3 py-1 rounded-none text-slate-300 hover:text-red-400 text-[11px] inline-flex items-center space-x-1.5 shrink-0 ml-3 cursor-pointer uppercase"
            >
              <LockKey size={13} />
              <span>Lock Terminal</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {/* Spectacular 88-95vh Cinematic Hero Section */}
        <HeroSection
          profile={data.profile}
          quotes={data.quotes}
          editMode={editMode}
          onUpdateProfile={handleUpdateProfile}
          onUpdateQuotes={handleUpdateQuotes}
          onScrollToProjects={() => {
            const first = document.getElementById('sec-projects-all');
            if (first) first.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Dedicated Aerospace Systems Showcase (Spacious & Decoupled from Hero) */}
        <SystemsShowcaseSection onSelectCategory={handleSelectCategory} />

        {/* Anchor for Projects Navigation */}
        <div id="sec-projects-all" className="scroll-mt-24">
          {/* Dynamic Project Sections: Fighter Jets, Drones, UAVs, Space Systems */}
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
        </div>

        {/* Add New Section Button in Edit Mode */}
        {editMode && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <button
              onClick={handleAddNewSection}
              className="btn-afterburner-blue inline-flex items-center space-x-2 px-7 py-4 rounded-none text-white font-mono-tech text-xs tracking-wider cursor-pointer uppercase font-bold"
            >
              <Plus size={16} weight="bold" />
              <span>ADD CUSTOM AEROSPACE SECTION</span>
            </button>
          </div>
        )}

        {/* Research Archive Section */}
        <ResearchSection />

        {/* About Nandan M. Dossier Section */}
        <AboutSection profile={data.profile} />

        {/* Contact & Telemetry Link Section */}
        <ContactSection profile={data.profile} />
      </main>

      {/* Minimalist Cinematic Aerospace Footer */}
      <footer className="border-t border-slate-800/80 bg-[#000000] py-16 text-slate-400 font-mono-tech text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <p className="font-heading text-base font-bold text-slate-200">
              {data.profile.name} // AEROSPACE ENGINEERING
            </p>
            <p className="text-slate-400 text-xs">
              {data.profile.institution} &bull; {data.profile.department}
            </p>
            <p className="text-slate-400 text-[11px]">
              Dayananda Sagar College of Engineering, Bengaluru &bull; Client-Side Encrypted Terminal
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {data.profile.email && (
              <a
                href={`mailto:${data.profile.email}`}
                className="w-10 h-10 rounded-none bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-slate-700 transition-all"
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
                className="w-10 h-10 rounded-none bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-slate-700 transition-all"
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
                className="w-10 h-10 rounded-none bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-slate-700 transition-all"
                title="GitHub"
              >
                <GithubLogo size={18} />
              </a>
            )}
            <button
              onClick={scrollToTop}
              title="Return to Top"
              className="w-10 h-10 rounded-none bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-slate-700 transition-all cursor-pointer"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </footer>

      {/* Password Authorization Keypad Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

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
