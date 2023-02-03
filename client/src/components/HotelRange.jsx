// import React, { useState } from "react";
// import { DateRangePicker } from "react-date-range";
// import { format } from "date-fns";
// import "../styles/hotelrange.css";

// function HotelRange({ state }) {
//   const [openDate, setOpenDate] = useState(false);

//   const inputHandler = (e) => {
//     const { name, value } = e.target;
//     return setOptions({
//       ...options,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="search-container">
//       <h3>Search</h3>
//       <div className="hotel-input-container">
//         <label htmlFor="hotel-input">Destination</label>
//         <input
//           type="text"
//           className="header-input hotel-input"
//           value={options.destination}
//           onChange={inputHandler}
//           name="destination"
//         />
//       </div>
//       <div className="hotel-input-container">
//         <label htmlFor="hotel-input">Check-in-date</label>
//         <span
//           className="header-input hotel-input"
//           onClick={() => {
//             setOpenDate(!openDate);
//           }}
//         >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
//           date[0].endDate,
//           "dd/MM/yyyy"
//         )}`}</span>
//         {openDate && (
//           <DateRangePicker
//             editableDateInputs={true}
//             onChange={(item) => setDate([item.selection])}
//             moveRangeOnFirstSelection={false}
//             ranges={date}
//             className="date"
//             minDate={new Date()}
//           />
//         )}
//       </div>
//       <div className="hotel-options-container">
//         <h4>Options</h4>
//         <div className="hotel-option">
//           <span>Min price (per night)</span>
//           <input
//             type="number"
//             className="hotel-input"
//             value={options.minprice}
//             onChange={inputHandler}
//             name="minprice"
//           />
//         </div>
//         <div className="hotel-option">
//           <span>Max price (per night)</span>
//           <input
//             type="number"
//             className="hotel-input"
//             value={options.maxprice}
//             onChange={inputHandler}
//             name="maxprice"
//           />
//         </div>
//         <div className="hotel-option">
//           <span>Adults</span>
//           <input
//             type="text"
//             className="hotel-input"
//             value={options.adults}
//             onChange={inputHandler}
//             name="adults"
//           />
//         </div>
//         <div className="hotel-option">
//           <span>Children</span>
//           <input
//             type="text"
//             className="hotel-input"
//             value={options.children}
//             onChange={inputHandler}
//             name="children"
//           />
//         </div>
//         <div className="hotel-option">
//           <span>Rooms</span>
//           <input
//             type="text"
//             className="hotel-input"
//             value={options.rooms}
//             onChange={inputHandler}
//             name="rooms"
//           />
//         </div>
//       </div>
//       <button className="btn btn-header">search</button>
//     </div>
//   );
// }

// export default HotelRange;
