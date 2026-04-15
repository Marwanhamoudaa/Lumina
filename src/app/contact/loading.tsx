export default function LoadingContact() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8 animate-pulse">
      <div className="space-y-3 mb-8">
        <div className="h-4 w-24 rounded bg-slate-200" />
        <div className="h-10 w-60 rounded bg-slate-200" />
      </div>
      <div className="rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="h-10 w-full rounded-lg bg-slate-200" />
        <div className="h-10 w-full rounded-lg bg-slate-200" />
        <div className="h-28 w-full rounded-lg bg-slate-200" />
        <div className="h-11 w-40 rounded-lg bg-slate-300" />
      </div>
    </div>
  );
}
