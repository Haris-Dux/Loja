import React from "react";
import "./CategoryCart.css";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedSubCategory } from "../../features/CategoriesSlice";

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

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 200,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const CategoryCart = ({ data }) => {
  const dispatch = useDispatch();
const {categoryType,subCategories} = data;
const subCategoryFiltering = (e) => {
  const subCategoryId = e.target.getAttribute('value');
  dispatch(setSelectedSubCategory(subCategoryId))
}
  return (
    <div>
      <div className="category_container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="category"
        >
          <div className="category_heading">
            <motion.h2 variants={itemVariants}>CATEGORY</motion.h2>
          </div>
          <div className="category_body">
            {categoryType.map((ele, index) => {
              const subCategoriesList = subCategories.filter((subCategory)=>subCategory.categoryType === ele.id);
              console.log(subCategoriesList)
              return (
                <>
                  <motion.div
                    className="box"
                    key={index}
                    variants={itemVariants}
                  >
                    <div
                      className="box_content"
                      style={{
                        backgroundImage: `url("${ele.image.secure_url}")`,
                         backgroundPosition: "top 0px left 0px ",
                         backgroundSize: "cover",
                         backgroundRepeat: "no-repeat",
                         objectFit: "contain",
                         width: "100%",

                      }}
                    >

                      <h4>{ele.name}</h4>
                      <ul>
                         {subCategoriesList.map((subCategory,index) => {
                          return (
                            <>
                              <NavLink className='hover' key={index}  >
                                <li onClick={subCategoryFiltering} value={subCategory.id}>{subCategory.name}</li>
                              </NavLink>
                            </>
                          );
                        })} 
                      </ul>
                    </div>
                  </motion.div>
                </>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryCart;
