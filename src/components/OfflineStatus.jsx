"use client";

import { useEffect } from "react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

export default function OfflineStatus() {
  const online = useOnlineStatus();

  useEffect(() => {
    const onError = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement) || navigator.onLine) return;
      target.classList.add("is-offline-fallback");
    };
    document.addEventListener("error", onError, true);
    return () => document.removeEventListener("error", onError, true);
  }, []);

  if (online) return null;

  return (
    <p className="offline-pill" role="status">
      Offline mode
    </p>
  );
}
