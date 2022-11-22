import React from "react";

const Search = () => {
  return (
    <div className=" w-full h-full bg-[color:var(--primary-bg-opacity-color)] rounded-full">
      <div className="h-full py-1 grid grid-cols-3">
        <div className=" h-full border-r-1 border-black">
          {" "}
          <div>
            <span></span> <p>Destination place</p>
          </div>{" "}
          <p>bogota,Colombia</p>
        </div>

        <div>
          {" "}
          <div>
            <span></span> <p>Check-in/Check-out</p>
          </div>{" "}
          <p>28 nov- 3 dic</p>
        </div>

        <div>
          {" "}
          <div>
            <span></span> <p>Guests</p>
          </div>{" "}
          <p>1 adult, 2 children</p>
        </div>
        
        <span></span>
      </div>
    </div>
  );
};

export default Search;
