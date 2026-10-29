"use client";

// Friendly fallback instead of Next.js' bare "Application error" screen.
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-2xl md:text-3xl font-semibold">Something went wrong</h1>
      <p className="text-white/70 max-w-md">
        The page couldn’t load its content just now. Please try again in a moment.
      </p>
      <button
        onClick={reset}
        className="px-8 py-3 rounded-full border border-[#00E586] text-[#00E586]
                   hover:bg-[#00E586]/10 transition"
      >
        Try again
      </button>
    </main>
  );
}
