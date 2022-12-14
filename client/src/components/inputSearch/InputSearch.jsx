import { React, useState } from "react";
import { useSelector } from "react-redux";

const InputSearch = ({inputText, setInputText}) => {



  const handleFilter = (event) => {
    let searchLocation = event.target.value;
    setInputText(searchLocation);
   
  };

  const locationSelected = (event) => {
    setInputText(event.currentTarget.id)

  }

  return (
    <div className="relative  z-[1000] h-auto w-full ">
      <input
        className=" w-full outline-none border-[color:var(--primary-text-color)] drop-shadow-md rounded-[10px] pl-4"
        type="text"
        placeholder="Search..."
        value={inputText}
        onChange={handleFilter}
      />{" "}

    </div>
  );
};

export default InputSearch;
