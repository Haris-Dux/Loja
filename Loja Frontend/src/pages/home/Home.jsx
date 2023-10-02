import React, { useEffect } from "react";
import Herosection from "../../components/heroSection/Herosection";
import { NavLink } from "react-router-dom";
import ShopNow from "../../components/shopnow/ShopNow";
import Fashions from "../../components/fashions/Fashions";
import Card from "../../components/card/Card";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import { motion } from "framer-motion";
import { clearDeletedProduct, fetchProducts } from "../../features/ProductSlics";
import Loader from "../../components/loader/Loader";
import { getCategoriesAsync } from "../../features/CategoriesSlice";

const fashion = [
  { id: 0, title: "Woman Fashion", image: "./assets/Images/girlFashion.jpg" },
  { id: 1, title: "Man Fashion", image: "./assets/Images/manFashion.jpg" },
  { id: 2, title: "Kids Fashion", image: "./assets/Images/kidsFashion.jpg" },
];
const shopnow = [
  {
    id: 0,
    title: "TRENDING STYLE",
    description: "New Shirts Collection 2023",
    image_1: "./assets/Images/shop_1.jpg",
    image_2: "./assets/Images/shop_2.jpg",
  },
];

const routeVariants = {
  initial: {
    y: "100vh",
  },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      mass: 0.4,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};
const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.data);
  const loading = useSelector((state) => state.product.loading);
  console.log(data);
  const trendProduct = data.slice(0, 4);
  const allProduct = data.slice(0, 8);
  console.log(data, trendProduct, allProduct);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(clearDeletedProduct())
    dispatch(getCategoriesAsync())
  }, [dispatch]);

  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <Herosection />
      <motion.div
        className="trending-product"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
      >
        <motion.h2>Trending Product</motion.h2>
        <div className="treading-product-heading">
          <h5>
            <NavLink>SALE</NavLink>
          </h5>
          <h5>
            <NavLink>FEATURED</NavLink>
          </h5>
          <h5>
            <NavLink>NEW PRODUCT</NavLink>
          </h5>
        </div>

        <div className="trending-product-body">
          {loading ? <Loader /> : <Card data={trendProduct} />}
        </div>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="allproducts"
      >
        <h2>All Products</h2>
        <div className="allproducts-body">
          {loading ? <Loader /> : <Card data={allProduct} />}
        </div>
      </motion.div>
      <NavLink to="/allproducts" className="show-more">
        <button className="btn">SHOW MORE</button>
      </NavLink>
      <div className="home-shop">
        <ShopNow data={shopnow} />
      </div>
      <Fashions fashion={fashion} />
    </motion.div>
  );
};

export default Home;
