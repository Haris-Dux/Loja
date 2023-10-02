import React from "react";
import "./HeroSection.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const banner = [
  { id: 0, img: "./assets/Images/banner-1.png" },
  { id: 2, img: "./assets/Images/banner-2.png" },
  { id: 3, img: "./assets/Images/banner-3.png" },
  { id: 4, img: "./assets/Images/banner-4.png" },
  { id: 5, img: "./assets/Images/banner-5.png" },
  { id: 6, img: "./assets/Images/banner-6.png" },
];

const Herosection = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
        duration: 4,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination, Navigation]}
    >
      {banner.map((user) => {
        console.log(user.img);
        return (
          <>
            <SwiperSlide key={user.id}>
              <div className="container">
                <header className="header">
                  <div className="left_side">
                    <div className="hero_content">
                      <h2>Step up your</h2>
                      <h1>FASHION GAME!</h1>
                      <p>
                        upto 50% off <br /> on entire stock
                      </p>
                      <button className="btn hero_btn">SHOP NOW</button>
                    </div>
                  </div>
                  <div className="right_side">
                    <img src={user.img} alt="" />
                  </div>
                </header>
              </div>
            </SwiperSlide>
            ;
          </>
        );
      })}
    </Swiper>
  );
};

export default Herosection;
