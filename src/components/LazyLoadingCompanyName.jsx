const LazyCompanyName = () => {
  return (
    <div class="mx-auto w-full max-w-sm rounded-md p-3">
      <div class="flex animate-pulse space-x-4">
        <div class="flex-1 space-y-6 py-1">
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-2 h-2 w-20 rounded bg-slate-200"></div>
              <div class="col-span-1 h-2 w-20 rounded bg-slate-200"></div>
            </div>
            <div class="h-2 w-10 rounded bg-slate-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LazyCompanyName;
