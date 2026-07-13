"use client";

import { useState } from "react";
import { Cpu, Radio } from "lucide-react";
import Gallery from "./Gallery";
import Modal from "./Modal";
import { projects } from "../data/projects";

export default function DevelopmentProjectsPage() {
  const [active, setActive] = useState(null);
  const project = projects.find((item) => item.id === active);

  return (
    <>
      <Gallery onOpenProject={(item) => setActive(item.id)} onOpenImage={() => {}} onOpenVideo={() => {}} isModalOpen={Boolean(project)} />
      <Modal isOpen={Boolean(project)} onClose={() => setActive(null)}>
        {project && <article className="development-detail"><span><Radio size={13} /> {project.status}</span><h2>{project.title}</h2><p>{project.description}</p><div>{project.tools.map((tool) => <small key={tool}>{tool}</small>)}</div><footer><Cpu size={15} /> SYSTEM DETAILS / ONLINE</footer></article>}
      </Modal>
    </>
  );
}
