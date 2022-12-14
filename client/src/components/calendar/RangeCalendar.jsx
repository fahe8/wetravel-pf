import React from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const RangeCalendar = ({ range, setRange,getDaysArray, getAllDatesReserves }) => {
  
  let daylist = getAllDatesReserves.map(dates => getDaysArray(new Date(dates[1]), new Date(dates[0]))) 
  
  return (
    <div className="w-auto drop-shadow-2xl">
      <DateRange
        onChange={(item) => setRange([item.selection])}
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        disabledDates={daylist.flat()}
        minDate={new Date()}
        ranges={range}
        months={2}
        direction="horizontal"
        className="w-100px"
      />
    </div>
  );
};
export default RangeCalendar;