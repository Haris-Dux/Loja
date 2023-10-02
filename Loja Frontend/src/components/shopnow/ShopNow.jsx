import React from "react";
import "./ShopNow.css";

const ShopNow = ({ data }) => {
  return (
    <div>
      <div className="shop-container">
        <div className="shop-now">
          {data.map((ele) => {
            return (
              <>
                <div className="left-side">
                  <img src={ele.image_1} alt="" />
                </div>
                <div className="center">
                  <h3>{ele.session}</h3>
                  <h2>{ele.title}</h2>
                  <p>{ele.description}</p>
                  <button className="btn shop_now">SHOP NOW</button>
                </div>
                <div className="right-side">
                  <img src={ele.image_2} alt="" />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopNow;
