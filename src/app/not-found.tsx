import Link from "next/link";

export default function NotFound() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          This page could not be found.
        </h1>
        <p className="mx-auto mt-3 text-sm text-slate-600 sm:text-base">
          The link may be outdated or the page may have moved. Return to the Milemend homepage
          to continue.
        </p>
        <div className="mt-7">
          <Link
            href="/"
            className="inline-flex rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
