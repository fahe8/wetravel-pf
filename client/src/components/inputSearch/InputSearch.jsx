import { React, useState } from "react";
import { useSelector } from "react-redux";

const InputSearch = ({inputText, setInputText}) => {
  let hotels = useSelector((state) => state.copyHotels);

  //console.log(hotels)

  const [filteredData, setFilteredData] = useState([]);


  const handleFilter = (event) => {
    let searchLocation = event.target.value;
    setInputText({text:searchLocation, from: "location"});
    const newFilter = hotels.filter((value) => {
      return value.location
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(searchLocation.toLowerCase());
    });

    if (searchLocation === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const locationSelected = (event) => {
    setInputText({text:event.currentTarget.id, from: "location"})
    setFilteredData([])
  }

  return (
    <div className="relative  z-[1000] h-auto w-full ">
      <input
        className=" w-full outline-none border-[color:var(--primary-text-color)] drop-shadow-md rounded-[10px] pl-4"
        type="text"
        placeholder="Search..."
        value={inputText.text}
        onChange={handleFilter}
      />{" "}
      {filteredData.length !== 0 && (
        <div className="bg-white absolute z-10 right-[0] w-[90%] h-[200px] mt-[5px] overflow-hidden overflow-y-auto object-none drop-shadow-md rounded-[10px]">
          {filteredData?.map((hotel, idx) => (
            <div
              key={idx}
              className="w-[100%] h-[50px] flex items-center hover:bg-gray-300"
              id={hotel.location}
              onClick={locationSelected}
            >
              <p className="ml-[10px]" key={idx}>
                {hotel.location}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputSearch;
