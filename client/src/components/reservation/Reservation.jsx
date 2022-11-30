import React, { useState, useRef, useEffect } from "react";
import icon from "../../assets/icons/user.svg";
import DetailRoom from "../detailRoom/DetailRoom";
import format from "date-fns/format";
import { addDays } from "date-fns";
import RangeCalendar from "../calendar/RangeCalendar";
import { useDispatch } from "react-redux";


const Reservation = ({ selectedHotel }) => {

  let dispatch = useDispatch()

  const [showCalendar, setShowCalendar] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const calendar = () => {
    setShowCalendar(true);
  };
  const refOne= useRef('') 

  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setShowCalendar(false);
    }
  };

  const infoRoom = () => {
    // nameHotel,nameRoom,price,check_in,check_out,userReserve


  };


  useEffect(() => {
    // event listeners
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);
  return (
    <div className=" grid grid-rows-2 ">
      {showCalendar && (
        <div className="absolute w-auto h-auto left-0">
          <RangeCalendar range={range} setRange={setRange} />
        </div>
      )}
      <div className="row-span-1 bg-white shadow-xl  rounded-3xl m-11">
        <div className=" text-4xl mt-8">
          <h3>{selectedHotel.price} Noche</h3>
        </div>

        <div className=" grid grid-cols-2 bg-[color:var(--primary-bg-opacity-color)] text-sm text-left mt-8 rounded-2xl mx-4 border border-black">
          <div
            className="border-r border-black pr-3 pb-4 pl-1"
            onClick={calendar}
            
          >
            <h2>check in:</h2>
            <p>{format(range[0].startDate, "dd/MM/yyyy")}</p>
          </div>
          <div className="pr-3 pb-4 pl-1" onClick={calendar}>
            <h2>check out:</h2>
            <p>{format(range[0].endDate, "dd/MM/yyyy")}</p>
          </div>

          <div className="col-span-2 border-t border-black pr-3 pb-4 pl-1">
            <h2>Rooms:</h2>
            <div onClick={infoRoom} ref={refOne}>
              <DetailRoom
                name={selectedHotel?.room?.name}
                description={selectedHotel?.room?.description}
                size={selectedHotel?.room?.size}
                photos={selectedHotel?.room?.photos}
                properties={selectedHotel?.room?.properties}
              />
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-white  shadow-xl  rounded-3xl items-center m-11 ">
        <div>
          <img className="px-16" src={icon} alt="userImage" />
        </div>
        <div className="py-4 text-3xl">
          <h1>Name of user</h1>
        </div>

        <div className="text-xl py-5">Join in month XXXX</div>
        <div>
          <button className="py-2.5 px-5 mr-2 mb-2 text-lg font-medium text-gray-900  bg-[color:var(--primary-bg-opacity-color)] rounded-full border border-black-800 ">
            Perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
