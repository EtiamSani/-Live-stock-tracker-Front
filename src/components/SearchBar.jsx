const SearchBar = () => {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Type here"
        className="input-bordered input-primary input w-full max-w-xs lg:max-w-xl"
      />
    </div>
  );
};

export default SearchBar;
