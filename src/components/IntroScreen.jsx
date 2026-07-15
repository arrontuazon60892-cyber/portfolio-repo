"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const ASSET_TIMEOUT = 12000;

function withTimeout(promise) {
  return Promise.race([
    promise,
    new Promise((_, reject) => window.setTimeout(() => reject(new Error("Asset load timed out")), ASSET_TIMEOUT)),
  ]);
}

function loadImage(src) {
  return withTimeout(new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = src;
    if (image.complete && image.naturalWidth > 0) resolve();
  }));
}

function loadVideoMetadata(src) {
  return withTimeout(new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const cleanup = () => { video.removeAttribute("src"); video.load(); };
    video.preload = "metadata";
    video.muted = true;
    video.onloadedmetadata = () => { cleanup(); resolve(); };
    video.onerror = () => { cleanup(); reject(new Error(`Unable to load ${src}`)); };
    video.src = src;
    video.load();
  }));
}

export default function IntroScreen({ assets = [], modelUrl, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(0);
  const [ready, setReady] = useState(false);
  const uniqueAssets = useMemo(() => [...new Map(assets.filter((asset) => asset?.src).map((asset) => [asset.src, asset])).values()], [assets]);

  useEffect(() => {
    let active = true;
    const tasks = [
      ...uniqueAssets.map((asset) => () => asset.type === "video" ? loadVideoMetadata(asset.src) : loadImage(asset.src)),
      () => document.fonts?.ready || Promise.resolve(),
      () => new Promise((resolve) => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve))),
    ];
    if (modelUrl) tasks.push(() => withTimeout(fetch(modelUrl, { cache: "force-cache" }).then((response) => {
      if (!response.ok) throw new Error(`Robot model returned ${response.status}`);
      return response.arrayBuffer();
    })));

    let completed = 0;
    let errors = 0;
    Promise.allSettled(tasks.map((task) => Promise.resolve().then(task).catch((error) => {
      errors += 1;
      throw error;
    }).finally(() => {
      completed += 1;
      if (active) setProgress(Math.round((completed / tasks.length) * 100));
    }))).then(() => {
      if (!active) return;
      setFailed(errors);
      setProgress(100);
      setReady(true);
    });
    return () => { active = false; };
  }, [modelUrl, uniqueAssets]);

  useEffect(() => {
    if (!ready) return undefined;
    const timer = window.setTimeout(() => onComplete?.(), 520);
    return () => window.clearTimeout(timer);
  }, [onComplete, ready]);

  const status = progress < 34 ? "INITIALIZING ASSETS" : progress < 82 ? "LOADING PORTFOLIO" : "PREPARING EXPERIENCE";
  return (
    <motion.div className="intro-screen" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: "-3%" }} transition={{ duration: 0.5 }} role="status" aria-live="polite">
      <div className="intro-frame"><span>ARRON TUAZON</span><span>PORTFOLIO / 2026</span></div>
      <div className="intro-center">
        <p className="intro-status">{status}</p>
        <strong className="intro-percentage">{String(progress).padStart(3, "0")}%</strong>
        <div className="intro-progress" aria-hidden="true"><span className="intro-progress__fill" style={{ width: `${progress}%` }} /></div>
        <p className="intro-detail">{failed ? `${failed} asset${failed === 1 ? "" : "s"} unavailable - continuing safely` : `${uniqueAssets.length} portfolio assets queued`}</p>
      </div>
    </motion.div>
  );
}
