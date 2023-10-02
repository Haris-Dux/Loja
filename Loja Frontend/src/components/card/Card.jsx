// import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { motion } from "framer-motion";
import "./Card.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalVisible, setModalData } from "../../features/Modal";
import { Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";


const itemVariants = {
  hidden: {
    opacity: 0,
    y: 200,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
  hover: {
    scale: 1.05,
  },
};

const Card = ({ data }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const viewModalHandler = (data) => {
    dispatch(setModalData(data));
    dispatch(setIsModalVisible(true));
  };
  const updateProductHandler = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      {data.map((element, index) => {
        return (
          <motion.div
            variants={itemVariants}
            className="card-box"
            key={index}
            onClick={() => {
              viewModalHandler(element);
            }}
          >
            <div className="img-div">
              <img src={element.image.secure_url} alt="kk" />
            </div>
            <div className="card-content">
              <div className="card-tilte">
                <p>{element.name}</p>
                <div className="star-icon">
                  <AiFillStar className="icon" />
                  <AiFillStar className="icon" />
                  <AiFillStar className="icon" />
                  <AiFillStar className="icon" />
                  <AiFillStar className="icon" />
                </div>
              </div>
              <div className="price">
                <span>RS {element.price}</span>
                {user && user.role === "admin" ? (
                  <div className="card-cart">
                    <button onClick={(e) => updateProductHandler(e)}>
                      <Link to={`/ud-product/${element.id}`}>Update</Link>
                    </button>
                    <BsPencilSquare className="icon" />
                  </div>
                 ) : (
                  <div className="card-cart">
                    <p>Add to Cart</p>
                    <HiOutlineShoppingBag className="icon" />
                  </div>
                 )} 
              </div>
            </div>
          </motion.div>
        );
      })}
    </>
  );
};

export default Card;
