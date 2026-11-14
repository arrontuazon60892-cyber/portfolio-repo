"use client";

export default function OfflinePage() {
  return (
    <main className="offline-page">
      <p className="offline-page__eyebrow">Connection</p>
      <h1>You're offline</h1>
      <p>Pages and images you already opened are still available.</p>
      <button type="button" onClick={() => window.location.reload()}>
        Try again
      </button>
    </main>
  );
}
