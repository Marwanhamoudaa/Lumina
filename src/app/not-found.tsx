import Link from "next/link";
import { ArrowLeft, Home, SearchX, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-rose-200/30 blur-3xl" />
      </div>

      <section className="mx-auto flex min-h-[75vh] w-full max-w-4xl flex-col items-center justify-center px-4 py-14 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <SearchX className="h-10 w-10 text-indigo-600" />
        </div>

        <p className="text-sm font-semibold tracking-wide text-indigo-600">Error 404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
          The page you requested does not exist or may have been moved. Continue shopping
          or go back to the homepage.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Home className="h-4 w-4" />
            Go to Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            <ShoppingBag className="h-4 w-4" />
            Browse Products
          </Link>
        </div>

        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to previous browsing
        </Link>
      </section>
    </main>
  );
}
