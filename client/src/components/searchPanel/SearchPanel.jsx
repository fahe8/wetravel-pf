import {React} from "react";
import RangeCalendar from "../calendar/RangeCalendar";

const SearchPanel = ({ selected, active, range, setRange, setInputText}) => {

  
  if (selected === "location") {

    return (

        <div className={`${active ? "":"translate-y-[5%] "} ease-in-out duration-300 transform  h-[400px] w-[100%] mx-auto bg-[color:var(--second-bg-color)] shadow-lg rounded-[30px] relative`}>
        <h1 className=" text-4xl pb-2">Location</h1>
        <div className=" h-auto flex justify-between">
          <div className="w-2/5 text-2xl border-[color:var(--primary-text-color)]">
           
            <h2 className="text-3xl">Recents</h2>
          </div>
          <div className=" w-3/5 h-full pb-5 text-2xl ">
            <h2 className="text-3xl font-medium">Continent</h2>
            <div className=" w-full h-full grid grid-rows-2 grid-cols-3 gap-2 pt-3">
              <div className="w-full h-full" id="america" onClick={e => setInputText({text:e.currentTarget.id, from: "continent"})}>
                <p>America</p>
                <div className="w-[100px] h-[100px] border hover:border-[color:var(--primary-text-color)] cursor-pointer mx-auto bg-[url('/src/assets/img/america.png')] bg-center bg-cover bg-no-repeat rounded-[10px]"></div>
              </div>
              <div className="w-full h-full" id="europa" onClick={e => setInputText({text:e.currentTarget.id, from: "continent"})}>
                <p>Europa</p>
                <div className="w-[100px] h-[100px] border hover:border-[color:var(--primary-text-color)] cursor-pointer mx-auto bg-[url('/src/assets/img/europa.png')] bg-center bg-cover bg-no-repeat rounded-[10px]"></div>
              </div>
              <div className="w-full h-full" id="asia" onClick={e => setInputText({text:e.currentTarget.id, from: "continent"})}>
                <p>Asia</p>
                <div className="w-[100px] h-[100px] border hover:border-[color:var(--primary-text-color)] cursor-pointer mx-auto bg-[url('/src/assets/img/asia.png')] bg-center bg-cover bg-no-repeat rounded-[10px]"></div>
              </div>
              <div className="w-full h-full" id="africa" onClick={e => setInputText({text:e.currentTarget.id, from: "continent"})}>
                <p>Africa</p>
                <div className="w-[100px] h-[100px] border hover:border-[color:var(--primary-text-color)] cursor-pointer mx-auto bg-[url('/src/assets/img/africa.png')] bg-center bg-cover bg-no-repeat rounded-[10px]"></div>
              </div>
              <div className="w-full h-full" id="australia" onClick={e => setInputText({text:e.currentTarget.id, from: "continent"})}>
                <p>Australia</p>
                <div className="w-[100px] h-[100px] border hover:border-[color:var(--primary-text-color)] cursor-pointer mx-auto bg-[url('/src/assets/img/australia.png')] bg-center bg-cover bg-no-repeat rounded-[10px]"></div>
              </div>
            </div>
          </div>
        </div>

      </div>


    );
  }

  if (selected === "calendar") {
    return (
      <div className={`${active ? "":"translate-y-[5%] "}  ease-in-out duration-300 transform  h-[400px] w-[100%] mx-auto bg-[color:var(--second-bg-color)] shadow-lg rounded-[30px] relative `}>
        <div className=" h-auto ">

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
