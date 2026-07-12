import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#04070d] px-6 text-white">
      <div className="max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/70">
          Signal not found / 404
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">
          This coordinate is outside the portfolio grid.
        </h1>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-100"
        >
          Return to the interface
        </Link>
      </div>
    </main>
  );
}
