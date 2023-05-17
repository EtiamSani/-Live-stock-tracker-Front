import { useState } from "react";

const CompanyBadge = ({ item, handleClick, refetch }) => {
  const [selectedId, setSelectedId] = useState("");

  const handleOnClick = () => {
    const id = item.id;
    setSelectedId(id);
    localStorage.setItem("selectedId", id);
    refetch(["companiesInWatchlist", id]);
    handleClick();
  };

  return (
    <a
      className="badge-ghost badge badge-sm btn m-2 p-2 font-bold"
      onClick={handleOnClick}
    >
      {item.name}
    </a>
  );
};

export default CompanyBadge;
