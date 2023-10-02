import React, { useEffect, useState } from "react";
import "./FilterBox.css";
import { BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyFilter } from "../../features/ProductSlics";

const colorData = [
  "White",
  "Red",
  "Cyan",
  "Navy",
  "Vermillion",
  "Orange",
  "Black",
  "Yellow",
  "Green",
  "Magenta",
  "Red",
  "Brown",
  "Grey",
  "Blue",
  "Beigh",
  "Purple",
  "Pink",
  "Darks",
];

const FilterBox = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("all");

  const handleOptionChange = (event) => {
    event.preventDefault();
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    console.log(selectedOption);
    dispatch(setCompanyFilter(selectedOption));
  }, [selectedOption]);

  return (
    <div>
      <div className="filter-container">
        <div className="filter">
          <h2>Filters:</h2>
          {selectedOption}
          <div className="filter-body">
            <div className="select">
              <select onChange={handleOptionChange}>
                <option value="all">all</option>
                <option value="apple">apple</option>
                <option value="samsung">samsung</option>
                <option value="nokia">nokia</option>
                <option value="asus">asus</option>
                <option value="dell">dell</option>
              </select>
            </div>
            <div className="colors">
              <h4>Color</h4>

              <div className="color-body">
                {colorData.map((curData, index) => {
                  return (
                    <>
                      <div>
                        <button
                          style={{
                            backgroundColor: curData,
                            borderRadius: "50%",
                            width: "1.2rem",
                            height: "1.2rem",
                            border: "2px solid #666",
                          }}
                          key={index}
                        ></button>
                        <span>{curData}</span>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="product-type">
              <h4>Product Type</h4>
              <div className="product-body">
                <span>
                  <BiPlus />
                  Winter
                </span>
                <span>
                  <BiPlus />
                  Forma
                </span>
                <span>
                  <BiPlus />
                  Summer
                </span>
                <span>
                  <BiPlus />
                  Under
                </span>
                <span>
                  <BiPlus />
                  Germents
                </span>
                <span>
                  <BiPlus />
                  Wester
                </span>
              </div>
            </div>
            <div className="size">
              <h4>Size</h4>
              <div className="size-body">
                <span>XS</span>
                <span>S</span>
                <span>M</span>
                <span>L</span>
                <span>XL</span>
              </div>
            </div>
            <div className="price-range">
              <h4>Price</h4>
              <input type="range" />
              <div className="price">
                <span>$0</span>
                <span>$1000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
