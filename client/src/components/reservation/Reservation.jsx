import React, { useState, useRef, useEffect } from "react";
import icon from "../../assets/icons/user.svg";
import DetailRoom from "../detailRoom/DetailRoom";
import { addDays, format, differenceInDays } from "date-fns";
import RangeCalendar from "../calendar/RangeCalendar";
import { useDispatch } from "react-redux";
import { postHotel, cartReserves, getReservesByCart  } from "../../redux/action";
import { useAuth0 } from "@auth0/auth0-react";



const Reservation = ({ selectedHotel, price }) => {
  let dispatch = useDispatch(); 
   const { user } = useAuth0();
  const prices = selectedHotel?.price
  const [showCalendar, setShowCalendar] = useState(false);


 
  
  // manage date
  const [checkIn, setCheckIn] = useState(format(new Date(), "yyyy-MM-dd"));
  const [checkOut, setCheckOut] = useState(
    format(addDays(new Date(), 1), "yyyy-MM-dd")
  );

  const handleCheckInchange = (e) => {
    {
      setCheckIn(e.target.value);
    }
  };

  const handleCheckOutChange = (e) => {
    {
      setCheckOut(e.target.value);
    }
  };

  const finalPrice =
    prices * differenceInDays(new Date(checkOut), new Date(checkIn)) > 0
      ? prices * differenceInDays(new Date(checkOut), new Date(checkIn))
      : prices;



  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setShowCalendar(false);
    }
  };

  // console.log(user)
  const fullInfo = () => {
    const info = {
      orderlines: [
        {idHotel: selectedHotel.id,
        quantity: difDays,
        check_out: checkOut,
        check_in: checkIn
      }
      ],
        user: user.email
      }
      
    
    dispatch(cartReserves(info))
    // dispatch(getReservesByCart(user?.email))
  };
  



  useEffect(() => {
    // event listeners
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);
  return (
    <div className=" grid grid-rows-2 " ref={refOne}>
      {showCalendar && (
        <div className="absolute w-auto h-auto left-0">
          <RangeCalendar />
        </div>
      )}
      <div className="row-span-1 bg-white shadow-xl  rounded-3xl m-11">
        <div className=" text-4xl mt-8">
          <h3>$ {selectedHotel.price} Noche</h3>
        </div>

        <div className=" grid grid-cols-2 bg-[color:var(--primary-bg-opacity-color)] text-sm text-left mt-8 rounded-2xl mx-4 border border-black">
          <div className="border-r border-black pr-3 pb-4 pl-1">
            <label> Check-In</label>
            <input
              type="date"
              value={checkIn}
              min={format(new Date(), "yyyy-MM-dd")}
              onChange={handleCheckInchange}
            />
          </div>

          <div className="pr-3 pb-4 pl-1">
            <label>Check-Out</label>
            <input
              type="date"
              value={checkOut}
              min={format(addDays(new Date(checkIn || null), 2), "yyyy-MM-dd")}
              onChange={handleCheckOutChange}
            />
          </div>


          <p >The price for {difDays} night/s is;
              <strong> $ {finalPrice}</strong>
            </p>
          



          <div className="col-span-2 border-t border-black pr-3 pb-4 pl-1">
            <h2>Rooms:</h2>
            <div>
              <DetailRoom
                id={selectedHotel?.id}
                name={selectedHotel?.room?.name}
                description={selectedHotel?.room?.description}
                size={selectedHotel?.room?.size}
                photos={selectedHotel?.room?.photos}
                date={difDays}
                nameHotel={selectedHotel?.name}
                price={selectedHotel?.price}
                properties={selectedHotel?.room?.properties}
                fullInfo={fullInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
