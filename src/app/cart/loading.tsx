export default function LoadingCart() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 animate-pulse">
      <div className="mb-8 space-y-3">
        <div className="h-4 w-24 rounded bg-slate-200" />
        <div className="h-10 w-52 rounded bg-slate-200" />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="h-28 rounded-2xl border border-slate-200 bg-slate-100" />
          ))}
        </div>
        <div className="rounded-2xl border border-slate-200 p-5 space-y-3">
          <div className="h-6 w-28 rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-4/5 rounded bg-slate-100" />
          <div className="h-10 w-full rounded-lg bg-slate-300 mt-2" />
        </div>
      </div>
    </div>
  );
}
