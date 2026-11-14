"use client";

import { useEffect } from "react";
import { graphicDesigns } from "../data/portfolioContent";
import { designImageProps } from "./RotatingDesigns";

function goodConnection() {
  const connection = navigator.connection;
  if (!connection) return true;
  if (connection.saveData) return false;
  return !/2g/.test(connection.effectiveType || "");
}

async function warmDesignImages() {
  if (!navigator.onLine || !goodConnection()) return;
  const urls = graphicDesigns.flatMap((design) => {
    const optimized = designImageProps(design, "").src;
    return [design.src, optimized].filter(Boolean);
  });
  for (const url of urls) {
    try {
      await fetch(url);
    } catch {
      /* Keep going so one missing file does not stop the rest. */
    }
  }
}

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return undefined;
    if (!("serviceWorker" in navigator)) return undefined;

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((registration) => {
          const activate = (worker) => worker?.postMessage({ type: "SKIP_WAITING" });
          if (registration.waiting) activate(registration.waiting);
          registration.addEventListener("updatefound", () => {
            const worker = registration.installing;
            worker?.addEventListener("statechange", () => {
              if (worker.state === "installed" && navigator.serviceWorker.controller) activate(worker);
            });
          });
          return navigator.serviceWorker.ready.then(() => warmDesignImages());
        })
        .catch(() => {});
    };

    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
