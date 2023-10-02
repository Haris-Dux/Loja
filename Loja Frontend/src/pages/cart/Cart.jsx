import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  getCartTotal,
  removeFromCart,
} from "../../features/CartSlice";
import "./Cart.css";
import { NavLink, useNavigate } from "react-router-dom";
import { setIsModalVisible, setModalData } from "../../features/Modal";
import { motion } from "framer-motion";

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

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); 
  const { data, totalItems, totalAmount, deliveryCharge } = useSelector(
    (state) => state.cart
  );
  console.log(data);
  useEffect(() => {
    dispatch(getCartTotal());
  }, [useSelector((state) => state.cart)]);

  const viewModalHandler = (data) => {
    dispatch(setModalData(data));
    dispatch(setIsModalVisible(true));
  };

  if (data.length === 0)
    return (
      <motion.div
        variants={routeVariants}
        initial="initial"
        animate="visible"
        exit="exit"
      >
        <div className="noOrder">
          <img src="./assets/Images/noOrder.jpg" alt="" />
          <h1>Oho! No Buying Anythings</h1>
          <NavLink to="/allproducts">
            <button className="btn">All Product</button>
          </NavLink>
        </div>
      </motion.div>
    );
    const navigate = useNavigate();
    const handleCheckout = () => { 
      if(user) {
         navigate('/checkout')
      } else{
        navigate('/login')
      }
    }
  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <div className="cart-container">
        <div className="cart">
          <div className="left-side">
            <div className="cart-header">
              <h2>ADMIN:</h2>
              <div className="cart-title">
                <h6>Products Grid</h6>
                <div className="btn-group">
                  <button className="btn">Export</button>
                  <NavLink to="/allproducts">
                    <button className="btn">Add New</button>
                  </NavLink>

                  <button className="btn" onClick={() => dispatch(clearCart())}>
                    Clear Item
                  </button>
                </div>
              </div>
              <div className="search">
                <input type="text" />
                <button className="btn">Search</button>
              </div>
            </div>
            <div className="cart-body">
              <div className="cards">
                {data.map((data) => {
                  return (
                    <>
                      <div className="card" key={data.id}>
                        <img src={data.image.secure_url} alt="" />
                        <div className="card-body">
                          <div className="card-title">
                            <h4>{data.name}</h4>
                            <p>{data.description.slice(0, 60)}...</p>
                            <div className="price">
                              <h4>Total Price :</h4>
                              <span>RS {data.totalPrice}</span>
                            </div>
                            <div className="quantity">
                              <h4>Quantity :</h4>
                              <span>{data.quantity}</span>
                            </div>
                            <div className="brand">
                              <h4>Brand :</h4>
                              <span>{data.brand}</span>
                            </div>
                            <div className="category">
                              <h4>Category :</h4>
                              <span>{data.category}</span>
                            </div>

                            <h4></h4>
                          </div>
                          <div className="edit-delete">
                            <button
                              className="btn"
                              onClick={() => viewModalHandler(data)}
                            >
                              Edit
                            </button>

                            <button
                              className="btn"
                              onClick={() => dispatch(removeFromCart(data.id))}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="totalQtyAmt">
              <div className="total">
                <h2>Total</h2>
                <div className="totalQty">
                  <h4>Total Quantity:</h4>
                  <span>{totalItems}</span>
                </div>
                <div className="totalAmt">
                  <h4>Total Amount:</h4>
                  <span>{totalAmount}</span>
                </div>
                <button className="btn" onClick={handleCheckout}>
                  CheckOut
                </button>
              </div>
            </div>
            <div className="filter"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
