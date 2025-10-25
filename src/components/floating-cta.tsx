import Link from "next/link";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 rounded-full bg-brand-secondary text-white px-5 py-3 shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        aria-label="Request a practice analysis"
      >
        <span className="hidden sm:inline">Request a Practice Analysis</span>
        <span className="sm:hidden">Request Analysis</span>
      </Link>
    </div>
  );
}
