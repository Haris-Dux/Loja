import React from "react";
import {
  Home,
  About,
  Kids,
  Man,
  Woman,
  Others,
  AllProducts,
  SingleProductPage,
  ErrorPage,
} from "./pages/index";
import { useLocation, Routes, Route } from "react-router-dom";

const RoutesWithAnimation = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.key}>
      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/kids" element={<Kids />} />
      <Route path="/man" element={<Man />} />
      <Route path="/woman" element={<Woman />} />
      <Route path="/others" element={<Others />} />
      <Route path="/allproducts" element={<AllProducts />} />
      <Route path="/singleproductpage" element={<SingleProductPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RoutesWithAnimation;
