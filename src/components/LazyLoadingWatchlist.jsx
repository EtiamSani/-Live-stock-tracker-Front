const Lazy = () => {
  return (
    <div class="badge-ghost badge badge-sm btn m-2 w-20 p-2">
      <div class="flex animate-pulse space-x-4">
        <div class="flex-1 space-y-6 py-1">
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-2 ml-2 h-5 w-8 rounded bg-slate-400"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lazy;
