import React, { useState, useRef, useEffect } from "react";
import icon from "../../assets/icons/user.svg";
import DetailRoom from "../detailRoom/DetailRoom";
import { addDays, format, differenceInDays } from "date-fns";
import RangeCalendar from "../calendar/RangeCalendar";
import { useDispatch, useSelector } from "react-redux";
import { postHotel, cartReserves, getReservesByCart } from "../../redux/action";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reservation = ({ selectedHotel, price }) => {
  let dispatch = useDispatch();
  const reserves = useSelector((state) => state.reserveByCart);

  const { user } = useAuth0();
  const prices = selectedHotel?.price;
  const [showCalendar, setShowCalendar] = useState(false);

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
      newArr.push(getOnlyDate(reserve.check_in));
      newArr.push(getOnlyDate(reserve.check_out));
      return newArr;
    });


  const fullInfo = () => {
    if (user) {
      let info = {
        orderlines: [
          {
            idHotel: selectedHotel.id,
            quantity: difDays,
            check_out: format(range[0].startDate, "MM-dd-yyyy"),
            check_in: format(range[0].endDate, "MM-dd-yyyy"),
          },
        ],
        user: user.email,
      };

      const reserveFind = getAllDatesReserves
        .flat()
        .find(
          (f) =>
            f === info.orderlines[0].check_in ||
            f === info.orderlines[0].check_out
        );
      !reserveFind
        ? dispatch(cartReserves(info)).then((res) => {
            dispatch(getReservesByCart(user?.email));
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
    <div className=" grid grid-rows-2 " ref={refOne}>
      {showCalendar && (
        <div className="absolute w-auto h-auto left-0">
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
      <div className="row-span-1 bg-white shadow-xl  rounded-3xl m-11">
        <div className=" text-4xl mt-8">
          <h3>$ {selectedHotel.price} Noche</h3>
        </div>

        <div className=" grid grid-cols-2 bg-[color:var(--primary-bg-opacity-color)] text-sm text-left mt-8 rounded-2xl mx-4 border border-black">
          <div
            className="border-r border-black pr-3 pb-4 pl-1"
            onClick={() => setShowCalendar(true)}
          >
            <label> Check-In</label>
            <input
              value={`${format(range[0].startDate, "yyyy-MM-dd")}`}
              readOnly
              className=" outline-none w-[100%] text-center bg-transparent"
            />
          </div>

          <div className="pr-3 pb-4 pl-1">
            <label>Check-Out</label>
            <input
              value={`${format(range[0].endDate, "yyyy-MM-dd")}`}
              readOnly
              className=" outline-none w-[100%] text-center bg-transparent"
            />
          </div>

          <p>
            The price for {difDays} night/s is;
            <strong>${finalPrice}</strong>
          </p>

          <div className="col-span-2 border-t border-black pr-3 pb-4 pl-1">
            <h2>Rooms:</h2>
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
