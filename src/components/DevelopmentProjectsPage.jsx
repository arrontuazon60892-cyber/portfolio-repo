"use client";

import { projects } from "../data/projects";
import PortfolioCollectionPage from "./PortfolioCollectionPage";

export default function DevelopmentProjectsPage() {
  return <PortfolioCollectionPage kind="projects" items={projects} />;
}
