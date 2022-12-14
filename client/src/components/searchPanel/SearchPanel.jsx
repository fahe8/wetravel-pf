import { React, useState } from "react";
import RangeCalendar from "../calendar/RangeCalendar";

const SearchPanel = ({ selected, setInputText, setCurrentPage }) => {
  const handleContinent = (e) => {
    setInputText(e.currentTarget.id);
    setCurrentPage(0);
  };

  if (selected === "location") {
    return (
      <div
        className={
          "transform  h-[400px] w-[800px] mx-auto bg-[color:var(--second-bg-color)] shadow-lg rounded-[30px] relative"
        }
      >
        <h1 className=" text-4xl pb-2">Location</h1>
        <div className=" h-auto flex justify-between">
          <div className="w-2/5 text-2xl border-[color:var(--primary-text-color)]">
            <h2 className="text-3xl">Recents</h2>
          </div>
          <div className=" w-3/5 h-full pb-5 text-2xl ">
            <h2 className="text-3xl font-medium">Continent</h2>
            <div className=" w-full h-full grid grid-rows-2 grid-cols-3 gap-2 pt-3">
              <div
                className="w-full h-full"
                id="america"
                onClick={handleContinent}
              >
                <p>America</p>
                <div className="w-[100px] h-[100px] border hover:border-[color:var(--primary-text-color)] cursor-pointer mx-auto bg-[url('/src/assets/img/america.png')] bg-center bg-cover bg-no-repeat rounded-[10px]"></div>
              </div>
              <div
                className="w-full h-full"
                id="europa"
                onClick={handleContinent}
              >
                <p>Europa</p>
                <div className="w-[100px] h-[100px] border hover:border-[color:var(--primary-text-color)] cursor-pointer mx-auto bg-[url('/src/assets/img/europa.png')] bg-center bg-cover bg-no-repeat rounded-[10px]"></div>
              </div>
              <div
                className="w-full h-full"
                id="asia"
                onClick={handleContinent}
              >
                <p>Asia</p>
                <div className="w-[100px] h-[100px] border hover:border-[color:var(--primary-text-color)] cursor-pointer mx-auto bg-[url('/src/assets/img/asia.png')] bg-center bg-cover bg-no-repeat rounded-[10px]"></div>
              </div>
              <div
                className="w-full h-full"
                id="africa"
                onClick={handleContinent}
              >
                <p>Africa</p>
                <div className="w-[100px] h-[100px] border hover:border-[color:var(--primary-text-color)] cursor-pointer mx-auto bg-[url('/src/assets/img/africa.png')] bg-center bg-cover bg-no-repeat rounded-[10px]"></div>
              </div>
              <div
                className="w-full h-full"
                id="australia"
                onClick={handleContinent}
              >
                <p>Australia</p>
                <div className="w-[100px] h-[100px] border hover:border-[color:var(--primary-text-color)] cursor-pointer mx-auto bg-[url('/src/assets/img/australia.png')] bg-center bg-cover bg-no-repeat rounded-[10px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // if (selected === "calendar") {
  //   return (
  //     <div
  //       className={`${
  //         active ? "" : "translate-y-[5%] "
  //       }  ease-in-out duration-300 transform  h-[400px] w-auto mx-auto bg-[color:var(--second-bg-color)] shadow-lg rounded-[30px] relative `}
  //     >
  //       <div className=" h-auto w-auto ">
  //         <RangeCalendar range={range} setRange={setRange}></RangeCalendar>
  //       </div>
  //     </div>
  //   );
  // }

  // if (selected === "guest") {

  //   return (
  //     <div
  //       className={`${
  //         active ? "" : "translate-y-[5%] "
  //       }  ease-in-out duration-300 transform h-[400px] w-[400px] mx-auto bg-[color:var(--second-bg-color)] shadow-lg rounded-[30px]  relative `}
  //     >
  //       {" "}
  //       <h1 className=" text-4xl pb-2 ">Guest</h1>
  //       <div className="pr-5">
  //       <div className="flex py-2">
  //         <h2 className=" w-[300px] text-left pl-10">Adultos</h2>
  //         <div className=" flex items-center">
  //         <div> <button className="w-[40px] h-[40px] bg-slate-400 rounded-full" onClick={counterAdult.increase}>+</button></div>
  //           <p className=" w-[30px] mx-2 text-center" type="text">{counterAdult.counter}</p>
  //           <div> <button className="w-[40px] h-[40px] bg-slate-400 rounded-full" disabled={counterAdult.counter === 0} onClick={counterAdult.decrement}>-</button></div>
  //         </div>
  //       </div>
  //       <div className="flex  py-2">
  //         <h2 className=" w-[300px] text-left pl-10">Niños</h2>
  //         <div className=" flex items-center">
  //         <div> <button className="w-[40px] h-[40px] bg-slate-400 rounded-full" onClick={counterChild.increase}>+</button></div>
  //         <p className=" w-[30px] mx-2 text-center" type="text">{counterChild.counter}</p>
  //         <div> <button className="w-[40px] h-[40px] bg-slate-400 rounded-full" disabled={counterChild.counter === 0} onClick={counterChild.decrement}>-</button></div>
  //         </div>
  //       </div>
  //       <div className="flex  py-2">
  //         <h2 className=" w-[300px] text-left pl-10">Bebes</h2>
  //         <div className=" flex items-center">
  //         <div><button className="w-[40px] h-[40px] bg-slate-400 rounded-full" onClick={counterBaby.increase}>+</button></div>
  //         <p className=" w-[30px] mx-2 text-center" type="text">{counterBaby.counter}</p>
  //          <div> <button className="w-[40px] h-[40px] bg-slate-400 rounded-full" disabled={counterBaby.counter === 0} onClick={counterBaby.decrement}>-</button></div>
  //         </div>
  //       </div>
  //       <div className="flex  py-2">
  //         <h2 className=" w-[300px] text-left pl-10">Mascotas</h2>
  //         <div className=" flex items-center">
  //         <div> <button className="w-[40px] h-[40px] bg-slate-400 rounded-full" onClick={counterPet.increase}>+</button></div>
  //           <p className=" w-[30px] mx-2 text-center" type="text">{counterPet.counter}</p>
  //           <div> <button className="w-[40px] h-[40px] bg-slate-400 rounded-full" disabled={counterPet.counter === 0} onClick={counterPet.decrement}>-</button></div>
  //         </div>
  //       </div>
  //       </div>
  //     </div>
  //   );
  // }
};

export default SearchPanel;
