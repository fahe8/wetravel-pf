import { React, useState } from "react";

const InputSearch = ({

  onSearch,
  search,


}) => {

  return (
    <div className="relative  z-[1000] h-auto w-full ">
      <input
        className=" w-full outline-none border-[color:var(--primary-text-color)] drop-shadow-md rounded-[10px] pl-4"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={onSearch}
      />{" "}
    </div>
  );
};

export default InputSearch;
