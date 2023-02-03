import React from "react";
import useFetch from "../hooks/useFetch";
import "../styles/propertytype.css";

function PropertyType() {
  const { data, loading, error } = useFetch("/hotel/countbytype");

  const info = [
    {
      img: "https://r-xx.bstatic.com/xdata/images/xphoto/300x240/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=",
    },
    {
      img: "https://r-xx.bstatic.com/xdata/images/hotel/300x240/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=",
    },
    {
      img: "https://r-xx.bstatic.com/xdata/images/xphoto/300x240/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=",
    },
    {
      img: "https://q-xx.bstatic.com/xdata/images/hotel/300x240/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=",
    },
  ];

  return (
    <section className="property-type-section">
      {loading ? (
        <h2 className="loading">Loading...</h2>
      ) : (
        <div className="property-type-container">
          <h2>Browse by property type</h2>
          <div className="property-type-images">
            {info.map((ele, i) => {
              return (
                <div className="property-type-img-cont" key={i}>
                  <img
                    src={ele.img}
                    alt={ele.name}
                    className="property-type-img"
                  />
                  <h4 className="property-type-name">{data[i]?.type}</h4>
                  <span className="property-type-number">
                    {data[i]?.count} {data[i]?.type}
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

export default PropertyType;
