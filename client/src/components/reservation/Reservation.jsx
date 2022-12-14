import React, { useState, useRef, useEffect } from "react";
import icon from "../../assets/icons/user.svg";
import {useHistory} from "react-router-dom"
import DetailRoom from "../detailRoom/DetailRoom";
import { addDays, format, differenceInDays, set } from "date-fns";
import RangeCalendar from "../calendar/RangeCalendar";
import { useDispatch, useSelector } from "react-redux";
import { postHotel, cartReserves, getReservesByCart } from "../../redux/action";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reservation = ({ selectedHotel, price }) => {

  let dispatch = useDispatch();
  const reserves = useSelector((state) => state.reserveByCart);
  let history =  useHistory()
  const { user } = useAuth0();
  const prices = selectedHotel?.price;
  const [showCalendar, setShowCalendar] = useState(false);
  const [active, setActive] = useState(false)
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const messageSuccesful = () => {
    toast.success('Se agrego la reserva al carrito 🛒', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  const messageError = () => {
    toast.error('Ya tenes una reserva en esa fecha', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }


  const finalPrice =
    prices * differenceInDays(range[0].endDate, range[0].startDate) > 0
      ? prices * differenceInDays(range[0].endDate, range[0].startDate)
      : prices;

  const difDays =
    differenceInDays(range[0].endDate, range[0].startDate) <= 0
      ? 1
      : differenceInDays(range[0].endDate, range[0].startDate);

  const refOne = useRef("");

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setShowCalendar(false);
    }
  };

  // Get date from DataBase  in format mm-dd-yy
  const getOnlyDate = (date) => {
    const onlyDate = date.split("T")[0];
    const [year, month, day] = onlyDate.split("-");

    const result = [month, day, year].join("-");
    return result;
  };

  //Get all dates with reserves
  const getDaysArray = function (s, e) {
    for (
      var a = [], d = new Date(s);
      d <= new Date(e);
      d.setDate(d.getDate() + 1)
    ) {
      a.push(new Date(d));
    }
    return a;
  };

  const getAllDatesReserves = reserves
    .filter((f) => selectedHotel.name === f.nameHotel)
    .map((reserve) => {
      const newArr = [];
      newArr.push(getOnlyDate(reserve.check_out));
      newArr.push(getOnlyDate(reserve.check_in));
      return newArr;
    });


  const fullInfo = () => {
    if (user) {
      let info = {
        orderlines: [
          {
            idHotel: selectedHotel.id,
            quantity: difDays,
            check_in: format(range[0].startDate, "MM-dd-yyyy"),
            check_out: format(range[0].endDate, "MM-dd-yyyy"),
          },
        ],
        user: user.email,
      };
      console.log(info);

      const reserveFind = getAllDatesReserves
        .flat()
        .find(
          (f) =>
            f === info.orderlines[0].check_out ||
            f === info.orderlines[0].check_in
        );
      !reserveFind
        ? dispatch(cartReserves(info)).then((res) => {
            setActive(true)
            setShowCalendar(false)
            if(res.status === 200){
              setTimeout(() =>{
                dispatch(getReservesByCart(user.email));
                setActive(false)
                history.push("/cart")
              },200)
            }
            messageSuccesful()
          })
        : messageError();
    }

    // dispatch(getReservesByCart(user?.email))
  };

  useEffect(() => {
    // event listeners
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);
  return (
    <div className=" grid grid-rows-2 relative" ref={refOne}>
      {showCalendar && (
        <div className="absolute w-auto h-auto translate-x-[-90%] ">
          <RangeCalendar
            range={range}
            setRange={setRange}
            reserves={reserves}
            getDaysArray={getDaysArray}
            getOnlyDate={getOnlyDate}
            getAllDatesReserves={getAllDatesReserves}
          />
        </div>
      )}
      <div className="row-span-1 bg-white shadow-xl  rounded-3xl m-11" >
        <div className=" text-4xl mt-8">
          <h3>$ {selectedHotel.price} Noche</h3>
        </div>

        <div className=" text-center  bg-[#a2d2ff] text-sm mt-8 rounded-2xl mx-4 border-2 border-black ">
          <div className=" flex hover:bg-[#5aa8f7] rounded-t-2xl cursor-pointer " onClick={() => setShowCalendar(true)}>
            <div
              className="border-r-2 border-black border-b-2 cursor-pointer w-1/2"
              
            >
              <label className=" text-xl font-semibold m-0 cursor-pointer"> Check-In:</label>
              <input
                value={`${format(range[0].startDate, "yyyy-MM-dd")}`}
                readOnly
                className=" outline-none w-[100%] bg-transparent text-lg text-center cursor-pointer"
              />
            </div>

            <div className="pr-3  border-b-2 border-black w-1/2">
              <label className=" text-xl font-semibold m-0 cursor-pointer">Check-Out:</label>
              <input
                value={`${format(range[0].endDate, "yyyy-MM-dd")}`}
                readOnly
                className=" outline-none w-[100%] bg-transparent text-lg text-center cursor-pointer"
              />
            </div>
          </div>

          <p className=" py-3 text-xl">
            El precio por {difDays} noche/s es:
            <strong> ${finalPrice}</strong>
          </p>
        </div>
        <div className="col-span-2  pr-3 pb-4 pl-1">
          <h2 className=" pt-3 text-xl font-semibold">Room:</h2>
          <div>
            <DetailRoom
              room={selectedHotel?.room}
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
              active={active}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
