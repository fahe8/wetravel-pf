import React from "react";
import RangeCalendar from "../calendar/RangeCalendar";

const SearchPanel = ({ selected, active, range, setRange}) => {
  if (selected === "location") {
    return (
        // <div className=" h-[100%] w-[100%] pt-5">dfd</div>
        <div className={`${active ? "":"translate-y-[5%] "}  ease-in-out duration-300 transform  h-[400px] w-[100%] mx-auto bg-[color:var(--second-bg-color)] shadow-lg rounded-[30px] relative `}>
        <h1 className=" text-4xl pb-2">Location</h1>
        <div className=" h-auto flex justify-between">
          <div className="w-2/5 text-2xl">
            <input type="text" placeholder="Search..." />
            <h2 className="text-3xl">Recents</h2>
          </div>
          <div className=" w-3/5 h-full pb-5 text-2xl ">
            <h2 className="text-3xl font-medium">Continent</h2>
            <div className=" w-full h-full grid grid-rows-2 grid-cols-3 gap-2 pt-3">
              <div>
                <p>America</p>
                <div className="w-[100px] h-[100px] border border-black mx-auto "></div>
              </div>
              <div>
                <p>Europa</p>
                <div className="w-[100px] h-[100px] border border-black mx-auto "></div>
              </div>
              <div>
                <p>Asia</p>
                <div className="w-[100px] h-[100px] border border-black mx-auto "></div>
              </div>
              <div>
                <p>Africa</p>
                <div className="w-[100px] h-[100px] border border-black mx-auto "></div>
              </div>
              <div>
                <p>Australia</p>
                <div className="w-[100px] h-[100px] border border-black mx-auto "></div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className=" absolute w-screen h-screen bg-black top-[0%] z-[-1]"></div> */}
      </div>


    );
  }

  if (selected === "calendar") {
    return (
      <div className={`${active ? "":"translate-y-[5%] "}  ease-in-out duration-300 transform  h-[400px] w-[100%] mx-auto bg-[color:var(--second-bg-color)] shadow-lg rounded-[30px] relative `}>
        <h1 className=" text-4xl pb-2">Calendar</h1>
        <div className=" h-auto flex justify-between">

<RangeCalendar range={range} setRange={setRange}></RangeCalendar>
        </div>
      </div>
    );
  }

  if (selected === "guest") {
    return (
      <div className={`${active ? "":"translate-y-[5%] "}  ease-in-out duration-300 transform  h-[400px] w-[100%] mx-auto bg-[color:var(--second-bg-color)] shadow-lg rounded-[30px] relative `}>        <h1 className=" text-4xl pb-2">Guest</h1>
        <div className=" h-auto flex justify-between">
        </div>
      </div>
    );
  }
};
     
export default SearchPanel;
