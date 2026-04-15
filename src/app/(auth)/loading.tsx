export default function LoadingAuth() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-10 animate-pulse">
      <div className="w-full rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="h-6 w-40 rounded bg-slate-200" />
        <div className="h-4 w-56 rounded bg-slate-100" />
        <div className="space-y-3 pt-2">
          <div className="h-10 w-full rounded-lg bg-slate-200" />
          <div className="h-10 w-full rounded-lg bg-slate-200" />
          <div className="h-10 w-full rounded-lg bg-slate-200" />
        </div>
        <div className="h-10 w-full rounded-lg bg-slate-300" />
      </div>
    </div>
  );
}
