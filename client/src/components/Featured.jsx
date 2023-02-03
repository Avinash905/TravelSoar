import React from "react";
import "../styles/propertytype.css";
import useFetch from "../hooks/useFetch";

function Featured() {
  const { data, loading } = useFetch(
    "/hotel/countbycity?city=delhi,mumbai,chennai"
  );

  const cities = [
    {
      img: "https://cf.bstatic.com/xdata/images/city/540x405/687157.webp?k=06b9ded0733baaca9efaa06a69ae4d0d74311d620280947ae909015e804028fb&o=",
      name: "manchester",
    },
    {
      img: "https://cf.bstatic.com/xdata/images/xphoto/540x405/191445417.webp?k=158eec3229f0447f2259710f61b7190c8912fd6fcdf8bc95812346c78365d5db&o=",
      name: "japan",
    },
    {
      img: "https://cf.bstatic.com/xdata/images/xphoto/540x405/188230751.webp?k=fda8afccc595289d56c0df5ad636313b3a1863838c4bc4f6b0ae71635c9fc61f&o=",
      name: "chennai",
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
                <div className="property-type-img-cont " key={i}>
                  <img src={ele.img} alt={ele.name} className="featured-img" />
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
