import React from "react";
import "./OurBrands.css";
const OurBrands = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div className="brand-container">
        <div className="brand">
          <h2>OTHER BRANDS</h2>
          <div className="brand-logo">
            {data.map((ele) => {
              return (
                <>
                  <div key={ele.id}>
                    <img src={ele.image} alt="" />;
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurBrands;
