export default function LoadingProductDetails() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 animate-pulse">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="h-[420px] rounded-2xl bg-slate-200" />
        <div className="space-y-4">
          <div className="h-5 w-24 rounded bg-slate-100" />
          <div className="h-10 w-4/5 rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-5/6 rounded bg-slate-100" />
          <div className="h-8 w-40 rounded bg-slate-200" />
          <div className="h-12 w-full rounded-xl bg-slate-300 mt-3" />
        </div>
      </div>
    </div>
  );
}
