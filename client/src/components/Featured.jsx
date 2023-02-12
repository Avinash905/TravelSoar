import React from "react";
import "../styles/propertytype.css";
import useFetch from "../hooks/useFetch";

function Featured() {
  const { data, loading } = useFetch(
    "/hotel/countbycity?city=delhi,mumbai,chennai"
  );

  const cities = [
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/1920px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg",
      name: "New York",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Mum103.png/1920px-Mum103.png",
      name: "Mumbai",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/1920px-Skyscrapers_of_Shinjuku_2009_January.jpg",
      name: "Tokyo",
    },
  ];

  return (
    <section className="property-type-section">
      {loading ? (
        <></>
      ) : (
        <div className="property-type-container">
          <h2>Featured Places</h2>
          <div className="property-type-images">
            {cities.map((ele, i) => {
              return (
                <div
                  className="property-type-img-cont "
                  key={i}
                >
                  <img
                    src={ele.img}
                    alt={ele.name}
                    className="featured-img"
                  />
                  <h4 className="property-type-name featured-name">
                    {ele.name}
                  </h4>
                  <span className="featured-count">
                    {data && data[i]} properties
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export default Featured;
