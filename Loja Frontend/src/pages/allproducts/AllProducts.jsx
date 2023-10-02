import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import FilterBox from "../../components/filter/FilterBox";
import "./AllProduct.css";
import Loader from "../../components/loader/Loader";
import { searchProduct } from "../../features/ProductSlics";

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

const AllProducts = () => {
  const data = useSelector((state) => state.product.data);
  const searchDatas = useSelector((state) => state.product.searchData);
  console.log(searchDatas);
  const loading = useSelector((state) => state.product.loading);
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");
  useEffect(() => {
    dispatch(searchProduct(searchData));
  }, [searchData]);

  const datas = data.filter((ele) => {
    if (searchData.length === 0) {
      return ele;
    } else {
      return ele.name.toLowerCase().includes(searchData.toLowerCase());
    }
  });

  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <div className="allproduct-container">
        <div className="allproduct">
          <div className="allproduct-header">
            <h2>AllProduct :</h2>
            <div className="search">
              <input
                type="text"
                onChange={(e) => setSearchData(e.target.value)}
              />
              <button className="btn">Search</button>
            </div>
          </div>
          <div className="allproduct-body">
            <div className="body-card">
              {loading ? <Loader /> : <Card data={datas} />}
            </div>
            <div className="filter-components">
              <FilterBox />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AllProducts;
