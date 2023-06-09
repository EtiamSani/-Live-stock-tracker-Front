const Lazy = () => {
  return (
    <div className="badge-ghost badge badge-sm btn m-2 w-20 p-2">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 ml-2 h-5 w-8 rounded bg-slate-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lazy;
