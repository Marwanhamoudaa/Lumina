interface PageSkeletonProps {
  title?: boolean;
  cards?: number;
}

export default function PageSkeleton({ title = true, cards = 6 }: PageSkeletonProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 animate-pulse">
      {title && (
        <div className="mb-8 space-y-3">
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="h-10 w-72 rounded bg-slate-200" />
          <div className="h-4 w-96 max-w-full rounded bg-slate-100" />
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: cards }).map((_, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-4 h-48 w-full rounded-xl bg-slate-200" />
            <div className="space-y-3">
              <div className="h-4 w-24 rounded bg-slate-100" />
              <div className="h-5 w-full rounded bg-slate-200" />
              <div className="h-5 w-2/3 rounded bg-slate-200" />
              <div className="h-4 w-20 rounded bg-slate-100" />
              <div className="pt-2">
                <div className="h-10 w-full rounded-lg bg-slate-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
