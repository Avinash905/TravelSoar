import React, { useContext, useState } from "react";
import "../styles/modal.css";
import { MdClose } from "react-icons/md";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { SearchContext } from "../context/searchContext";
import toast from "react-hot-toast";

function Modal({ setOpenModal, hotelid }) {
  const { dates } = useContext(SearchContext);

  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading } = useFetch(`/hotel/getrooms/${hotelid}`);

  const selectHandler = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((ele) => {
            return ele !== value;
          })
    );
  };
  const getDatesRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesRange(dates[0].startDate, dates[0].endDate);
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => {
      return alldates.includes(parseInt(date));
    });
    return !isFound;
  };

  const reserveBtn = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/room/updateroomavail/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      toast.success("Rooms reserved successfully");
      setOpenModal(false);
    } catch (error) {}
  };

  return (
    <section className="modal-section flex-center">
      {loading ? (
        <h2 className="loading">Loading...</h2>
      ) : (
        <div className="modal-container">
          <MdClose
            className="modal-close"
            onClick={() => {
              setOpenModal(false);
            }}
          />
          <h3 className="modal-heading">Select your rooms</h3>
          {data?.map((ele) => {
            return (
              <div className="modal-room" key={ele._id}>
                <div className="modal-room-content">
                  <h4 className="modal-room-heading">{ele.title}</h4>
                  <p className="modal-room-desc">{ele.desc}</p>
                  <span className="modal-room-people">
                    Max people: <strong>{ele.maxPeople}</strong>
                  </span>
                  <span className="modal-room-price">₹{ele.price}</span>
                </div>
                <div className="modal-room-numbers">
                  {ele.roomNumbers.map((room) => {
                    return (
                      <div
                        className="modal-room-number-container"
                        key={room._id}
                      >
                        <label htmlFor={room._id}>{room.number}</label>
                        <input
                          type="checkbox"
                          name="roomnumber"
                          value={room._id}
                          onChange={selectHandler}
                          id={room._id}
                          disabled={!isAvailable(room)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <button className="btn" onClick={reserveBtn}>
            reserve now
          </button>
        </div>
      )}
    </section>
  );
}

export default Modal;
