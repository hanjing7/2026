"use client";

import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { PresentationMode } from "./components/PresentationMode";
import { ArticlePage } from "./components/ArticlePage";
import { AboutPage } from "./components/AboutPage";
import { CaseStudyPage } from "./components/CaseStudyPage";
import { TooltipProvider } from "./components/ui/tooltip";
import { fetchProjects, type Project } from "./data/projects";
import { fetchWork, type WorkItem } from "./data/work";

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Fetch work items and projects on mount
  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        const [workData, projectsData] = await Promise.all([
          fetchWork(),
          fetchProjects(),
        ]);

        if (!cancelled) {
          setWorkItems(workData);
          setProjects(projectsData);
        }
      } catch (error) {
        console.error("[App] Failed to load data:", error);
        if (!cancelled) {
          setWorkItems([]);
          setProjects([]);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const navigateTo = (page: string) => {
    setNavigationHistory([...navigationHistory, currentPage]);
    setCurrentPage(page);
  };

  const goBack = () => {
    if (navigationHistory.length > 0) {
      const previousPage = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(navigationHistory.slice(0, -1));
      setCurrentPage(previousPage);
    }
  };

  const renderPage = () => {
    // Check if it's a case study page for projects
    const project = projects.find(p => currentPage === `case-study-project-${p.id}`);
    if (project) {
      return (
        <CaseStudyPage
          id={project.id}
          title={project.title}
          description={project.description}
          gammaUrl={project.gammaUrl || "YOUR_GAMMA_URL_HERE"}
          featuredTag={project.featuredTag}
          onNavigate={navigateTo}
          onBack={goBack}
        />
      );
    }

    // Check if it's a case study page for work items
    const workItem = workItems.find(w => currentPage === `case-study-work-${w.id}`);
    if (workItem) {
      return (
        <CaseStudyPage
          id={workItem.id}
          title={workItem.title}
          description={workItem.description}
          gammaUrl={workItem.gammaUrl || "YOUR_GAMMA_URL_HERE"}
          featuredTag={workItem.featuredTag}
          category={workItem.category}
          year={workItem.year}
          onNavigate={navigateTo}
          onBack={goBack}
        />
      );
    }

    // Regular pages
    switch (currentPage) {
      case "Home":
        return <PresentationMode onNavigate={navigateTo} workItems={workItems} projects={projects} />;
      case "Article":
        return <ArticlePage onNavigate={navigateTo} />;
      case "About":
        return <AboutPage onNavigate={navigateTo} />;
      default:
        return <PresentationMode onNavigate={navigateTo} workItems={workItems} projects={projects} />;
    }
  };

  // Hide navigation on case study pages
  const isCaseStudyPage = currentPage.startsWith("case-study-");

  return (
    <TooltipProvider>
      <div className="w-full">
        {!isCaseStudyPage && (
          <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        )}
        {renderPage()}
      </div>
    </TooltipProvider>
  );
}