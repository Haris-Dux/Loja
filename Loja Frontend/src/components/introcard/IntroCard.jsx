import React from "react";
import "./IntroCard.css";
import { useSelector } from "react-redux";
const IntroCard = ({ title , data  }) => {
  return (
    <div>
      <div className="intro-container">
        <div className="intro-content">
          <h2>{title}</h2>
          {data === "women" ? (
            
            <p>
              Explore the latest trends in women's fashion with our curated
              collection of apparel, accessories, and footwear. From timeless
              classics to contemporary styles, find everything you need to
              express your unique style.
            </p>
          ) : null}
          
          {data === "men" ? (
            <p>
              Discover a wide range of men's fashion essentials, from sharp
              suits to casual streetwear. Whether you're dressing up for a
              special occasion or keeping it casual, our collection has you
              covered in style.
            </p>
          ) : null}
          {data === "children" ? (
            <p>
              Shop adorable and comfortable clothing for your little ones. Our
              kids' collection offers a variety of cute outfits and accessories,
              ensuring your children look and feel their best as they explore
              the world.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default IntroCard;
