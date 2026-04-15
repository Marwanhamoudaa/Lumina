export default function LoadingPayment() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8 animate-pulse">
      <div className="rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="h-8 w-48 rounded bg-slate-200" />
        <div className="h-4 w-4/5 rounded bg-slate-100" />
        <div className="h-10 w-full rounded-lg bg-slate-200" />
        <div className="h-10 w-full rounded-lg bg-slate-200" />
        <div className="h-10 w-full rounded-lg bg-slate-200" />
        <div className="h-12 w-full rounded-lg bg-slate-300 mt-2" />
      </div>
    </div>
  );
}
