import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Kids.css";
import CategoryCart from "../../components/categories/CategoryCart";
import FilterBox from "../../components/filter/FilterBox";
import OurBrands from "../../components/brands/OurBrands";
import Card from "../../components/card/Card";
import IntroCard from "../../components/introcard/IntroCard";
import ShopNow from "../../components/shopnow/ShopNow";
import { motion } from "framer-motion";
import Loader from "../../components/loader/Loader";
import { getCategoriesTypeAsync, getsubCategoriesAsync } from "../../features/CategoriesSlice";

// const category = [
//   {
//     id: 0,
//     link_list: [
//       "Shirts",
//       "Sweeters",
//       "Pull Over",
//       "Hoodies",
//       "Coats",
//       "Trousers",
//       "Jackets",
//       "Caps",
//       "Tops",
//       "Puffer Jackets",
//       "Tights",
//       "Skirts",
//       "Shorts",
//       "Socks",
//     ],
//     image: "./assets/Images/kidsFashion.jpg",
//   },
//   {
//     id: 1,
//     link_list: [
//       "Shirts",
//       "T Shirts",
//       "Polo",
//       "Sweeters",
//       "PullOver",
//       "Hoodies",
//       "Coats",
//       "Trousers",
//       "Pents",
//       "Jackets",
//       "Caps",
//       "Hats",
//       "Shorts",
//       "Socks",
//     ],
//     image: "./assets/Images/kidsFashion-1.jpg",
//   },
// ];

const shopnow = [
  {
    id: 0,
    title: "CALM KIDS",
    session: "Summer Collection",
    description: "upto 50% 0ff on entire stock",
    image_1: "./assets/Images/shop_7.jpg",
  },
];
const kidsBrand = [
  {
    id: 0,
    image: "./assets/Images/logo-5.jpg",
  },
  {
    id: 1,
    image: "./assets/Images/logo-6.jpg",
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
      staggerChildren: 0.2,
    },
  },
};

const Kids = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.data);
  console.log(data);
  const loading = useSelector((state) => state.product.loading);
  const categories = useSelector((state)=>state.categories.AllCategories);
  const subCategories = useSelector((state)=>state.categories.subCategories);
  const selectedSubcategory = useSelector((state)=>state.categories.selectedSubCategory);
  const kidCategory = categories.find(category => category.name === 'children');
  //const filteredProduct = data.filter(product => product.category === kidCategory.id);
  const categoryType = useSelector((state)=>state.categories.getCategoriesTypes);
  // const kidsData = user.filter((user) => user.brand === "Samsung");
  const kidsTreData = data.slice(0, 4);
  const kidsData = data.slice(0, 6);

  useEffect(()=>{
   dispatch(getCategoriesTypeAsync({category:kidCategory.id}));
   dispatch(getsubCategoriesAsync({category:kidCategory.id,categoryType:categoryType.id}));
  },[dispatch]);
  const propData = {categoryType,subCategories};
  const selectedSubCategoryFound = subCategories.some(subcategory => subcategory.id === selectedSubcategory);
  let filteredProduct;
  if(selectedSubCategoryFound){
    filteredProduct = data.filter((product => product.subCategory === selectedSubcategory && categoryType.id))
  } else{
     filteredProduct = data.filter(product => product.category === kidCategory.id);
  }

  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <IntroCard title="KIDS :" data={kidCategory.name} />
      <CategoryCart data={propData} />
      <motion.div
        className="trending-product"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
      >
        <h2>Trending Product</h2>
        <div className="trending-product-body">
          {loading ? <Loader /> : <Card data={(kidsTreData,filteredProduct)} />}
        </div>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="allproducts-filter"
      >
        <div className="all-products">
          <h2>All Products</h2>
          <div className="allproducts-body">
            {loading ? <Loader /> : <Card data={(kidsData,filteredProduct)} />}
          </div>
        </div>
        <div className="filter-components">
          <FilterBox />
        </div>
      </motion.div>
      <OurBrands data={kidsBrand} />
      <div className="kids-shop">
        <ShopNow data={shopnow} />
      </div>

      {/*
              Morat offers a vast selection of women's clothing to shop. Each
              season, and a careful assortment of clothing no matter the season,
              trend-driven and classic pieces are always available .Morat is
              committed to helping shoppers be their most stylish selves
 */}
    </motion.div>
  );
};

export default Kids;
