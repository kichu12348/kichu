import { useState, useCallback, lazy, Suspense } from "react";
import { Header } from "./components/Header/Header";
import { Intro } from "./components/Intro/Intro";
import { ProjectsList } from "./components/Projects/ProjectsList";
import { Experience } from "./components/Experience/Experience";
import { SocialLinks } from "./components/SocialLinks/SocialLinks";
import { AsciiStage } from "./components/AsciiStage/AsciiStage";
import { Footer } from "./components/Footer/Footer";

const ProjectModal = lazy(() =>
  import("./components/ProjectModal/ProjectModal").then((m) => ({
    default: m.ProjectModal,
  })),
);

import { PROJECTS, PREVIOUS_EXPERIENCE, PROFILE_INFO } from "./data/projects";
import { useToast } from "./hooks/useToast";
import { useTimeOfDay } from "./hooks/useTimeOfDay";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";

import styles from "./App.module.css";

export default function App() {
  // 'bruno' is active by default (index 1), matching the reference design
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    message: toastMessage,
    isVisible: isToastVisible,
    showToast,
  } = useToast();
  const { effectiveTod, clockInfo, ambientGlow } = useTimeOfDay();

  const handleOpenModal = useCallback((index?: number) => {
    if (typeof index === "number") {
      setActiveProjectIndex(index);
    }
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleNextProject = useCallback(() => {
    setActiveProjectIndex((prev) => (prev + 1) % PROJECTS.length);
  }, []);

  const handlePrevProject = useCallback(() => {
    setActiveProjectIndex(
      (prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length,
    );
  }, []);

  useKeyboardNavigation({
    isModalOpen,
    onCloseModal: handleCloseModal,
    onOpenModal: () => handleOpenModal(activeProjectIndex),
    onNextProject: handleNextProject,
    onPrevProject: handlePrevProject,
  });

  const handlePromptClick = useCallback(() => {
    showToast("keys: [↑/↓] projects · [enter] inspect");
  }, [showToast]);

  const activeProject = PROJECTS[activeProjectIndex] ?? PROJECTS[0];

  return (
    <div className={styles.appContainer}>
      {/* Film Grain Noise Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Top Header */}
      <Header
        clockInfo={clockInfo}
        onPromptClick={handlePromptClick}
        location={PROFILE_INFO.location}
      />

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <div className={styles.contentGrid}>
          {/* BLOCK 1: Intro Header & Status */}
          <div className={styles.introBlock}>
            <Intro
              name={PROFILE_INFO.name}
              bio={PROFILE_INFO.bio}
              status={PROFILE_INFO.status}
            />
          </div>

          {/* BLOCK 2: ASCII Window & Cat Scene */}
          <div className={styles.asciiBlock}>
            <AsciiStage
              effectiveTod={effectiveTod}
              ambientGlow={ambientGlow}
              onShowToast={showToast}
            />
          </div>

          {/* BLOCK 3: Projects & Previously */}
          <div className={styles.projectsBlock}>
            <ProjectsList
              projects={PROJECTS}
              activeIndex={activeProjectIndex}
              onSelectProject={setActiveProjectIndex}
              onOpenProject={handleOpenModal}
            />

            <Experience items={PREVIOUS_EXPERIENCE} />
          </div>

          {/* BLOCK 4: Social Links & Tagline */}
          <div className={styles.socialBlock}>
            <SocialLinks
              email={PROFILE_INFO.email}
              githubUrl={PROFILE_INFO.githubUrl}
              linkedinUrl={PROFILE_INFO.linkedinUrl}
              resumeUrl={PROFILE_INFO.resume}
              tagline={PROFILE_INFO.tagline}
              onShowToast={showToast}
            />
          </div>
        </div>
      </main>

      {/* Footer Status */}
      <Footer
        effectiveTod={effectiveTod}
        toastMessage={toastMessage}
        isToastVisible={isToastVisible}
      />

      {/* Project Inspector Modal */}
      <Suspense fallback={null}>
        {isModalOpen && (
          <ProjectModal
            project={activeProject}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </Suspense>
    </div>
  );
}
