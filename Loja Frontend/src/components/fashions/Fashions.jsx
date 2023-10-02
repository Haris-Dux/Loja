import React from "react";
import { Link } from "react-router-dom";
import "./Fashions.css";

const Fashions = ({ fashion }) => {
  // const [title, image] = fashion;
  console.log(fashion.title, fashion.image);
  console.log(fashion);
  return (
    <div>
      <div className="fash_contanier">
        <div className="fashion">
          {fashion.map((data, index) => {
            return (
              <>
                <div
                  className="box"
                  key={data}
                  style={{
                    backgroundImage: `url("${data.image}")`,
                    backgroundPosition: "top -20px left -2rem",
                    backgroundRepeat: "no-repeat",
                    objectFit: "contain",
                  }}
                >
                  <div className="left_side">
                    <h3>{data.title}</h3>
                    <Link>
                      <button className="fashion-btn btn">SHOP NOW</button>
                    </Link>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Fashions;
