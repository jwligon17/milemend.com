"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-800">Something went wrong</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          We hit an unexpected error.
        </h1>
        <p className="mx-auto mt-3 text-sm text-slate-600 sm:text-base">
          Please try again. If the problem persists, contact support with this reference:
          {error.digest ? ` ${error.digest}` : " unavailable"}.
        </p>
        <div className="mt-7">
          <button
            type="button"
            onClick={reset}
            className="inline-flex rounded-md bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
          >
            Try Again
          </button>
        </div>
      </div>
    </section>
  );
}
