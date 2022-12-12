import React from 'react'

import { DateRange } from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const RangeCalendar = ({range, setRange}) => {

  // date state
  // const [range, setRange] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 7),
  //     key: 'selection'
  //   }
  // ])

  return (
    <div className="w-auto">
   
          <DateRange 
            onChange={item => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="horizontal"
            className="w-100px"
          />
        

    </div>
  )
}

export default RangeCalendar