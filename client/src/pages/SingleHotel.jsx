import React, { useContext, useState } from "react";
import "../styles/singlehotel.css";
import { MdLocationOn } from "react-icons/md";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { SearchContext } from "../context/searchContext";
import { AuthContext } from "../context/authContext";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function SingleHotel() {
  const navigate = useNavigate();
  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const { data, loading } = useFetch(`/hotel/gethotel/${id}`);
  const [openModal, setOpenModal] = useState(false);

  const millisPerDay = 1000 * 60 * 60 * 24;

  const dayDifference = (date1, date2) => {
    if (!date1 || !date2) return 1;
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const daysDiff = Math.ceil(timeDiff / millisPerDay);
    return daysDiff + 1;
  };

  const days = dayDifference(dates[0]?.startDate, dates[0]?.endDate);

  const reserveBtn = () => {
    if (!user) {
      navigate("/login");
    } else {
      setOpenModal(true);
    }
  };

  return (
    <>
      <Navbar />
      <section className="single-section">
        {loading ? (
          <h2 className="loading">Loading...</h2>
        ) : (
          <div className="single-container">
            <div className="single-container-top">
              <div className="single-top-left">
                <h2 className="single-heading">{data.name}</h2>
                <div className="single-location-container">
                  <MdLocationOn />
                  <span className="single-location">{data.address}</span>
                </div>
                <p className="single-direction">{data.distance}</p>
                <p className="single-below-direction">
                  Book a stay over ₹{data.cheapestPrice} at this property
                </p>
              </div>
              <div className="single-top-right">
                <button className="btn" onClick={reserveBtn}>
                  reserve or book now
                </button>
              </div>
            </div>
            <div className="single-image-container">
              <img
                src="https://cf.bstatic.com/xdata/images/hotel/square600/228058913.webp?k=9ddc8770cd955ef20b6c02a45a6f2478f2d7d9360c7ab5a411a15a99788c9f3a&o=&s=1"
                alt="hotel name"
              />
              <img
                src="https://cf.bstatic.com/xdata/images/hotel/square600/228058913.webp?k=9ddc8770cd955ef20b6c02a45a6f2478f2d7d9360c7ab5a411a15a99788c9f3a&o=&s=1"
                alt="hotel name"
              />
              <img
                src="https://cf.bstatic.com/xdata/images/hotel/square600/228058913.webp?k=9ddc8770cd955ef20b6c02a45a6f2478f2d7d9360c7ab5a411a15a99788c9f3a&o=&s=1"
                alt="hotel name"
              />
              <img
                src="https://cf.bstatic.com/xdata/images/hotel/square600/228058913.webp?k=9ddc8770cd955ef20b6c02a45a6f2478f2d7d9360c7ab5a411a15a99788c9f3a&o=&s=1"
                alt="hotel name"
              />
              <img
                src="https://cf.bstatic.com/xdata/images/hotel/square600/228058913.webp?k=9ddc8770cd955ef20b6c02a45a6f2478f2d7d9360c7ab5a411a15a99788c9f3a&o=&s=1"
                alt="hotel name"
              />
              <img
                src="https://cf.bstatic.com/xdata/images/hotel/square600/228058913.webp?k=9ddc8770cd955ef20b6c02a45a6f2478f2d7d9360c7ab5a411a15a99788c9f3a&o=&s=1"
                alt="hotel name"
              />
            </div>
            <div className="single-container-bottom">
              <div className="single-hotel-desc">
                <h3>{data.title}</h3>
                <p>{data.desc}</p>
              </div>
              <div className="single-price-cont">
                <h3>Perfect for a {days}-night stay!</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio
                  eum eos at quas nisi quisquam.
                </p>
                <span className="single-price">
                  ₹{days * data.cheapestPrice * options.rooms} ({days} nights)
                </span>
                <button className="btn" onClick={reserveBtn}>
                  reserve or book now
                </button>
              </div>
            </div>
          </div>
        )}
        {openModal && <Modal setOpenModal={setOpenModal} hotelid={id} />}
      </section>
      <Footer />
    </>
  );
}

export default SingleHotel;
