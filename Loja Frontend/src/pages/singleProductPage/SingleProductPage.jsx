import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { BsFillCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../features/CartSlice";
import { setIsModalVisible, setIsSearchModal } from "../../features/Modal";
import { motion } from "framer-motion";

const routeVariants = {
  hidden: {
    scale: 0.5,
  },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      mass: 0.4,
      duration: 0.9,
    },
  },
  exit: {
    scale: 0.5,
  },
};

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const data = useSelector((state) => state.modal.data);

  const increaseQty = () => {
    setQty((prevQty) => Math.max(prevQty + 1, 1));
  };

  const decreaseQty = () => {
    setQty((prevQty) => Math.max(prevQty - 1, 1));
  };

  const addToCartHandler = (product) => {
    const totalPrice = qty * product.price;
    const tempProduct = {
      ...product,
      quantity: qty,
      totalPrice,
    };
    dispatch(addToCart(tempProduct));
    dispatch(setIsModalVisible(false));
  };

  return (
    <motion.div
      variants={routeVariants}
      initial="hiddena"
      animate="visible"
      exit="exit"
    >
      <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-md backdrop-filter bg-opacity-30">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white w-full max-w-3xl p-6 rounded-md shadow-lg relative">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                dispatch(setIsModalVisible(false));
                dispatch(setIsSearchModal(true));
              }}
            >
              <RxCross2 />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="w-full">
                <img src={data.image.secure_url} alt="" className="w-full" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{data.title}</h3>
                <p className="text-sm text-gray-600">{data.description}</p>
                <div className="text-lg font-semibold mt-2">RS {data.price}</div>
                <div className="mt-4 flex items-center">
                  <span className="mr-2">Qty:</span>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                      onClick={decreaseQty}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 bg-gray-100">{qty}</span>
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                      onClick={increaseQty}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-4 bg-[#754224] text-white py-2 px-4 rounded-lg flex items-center"
                  onClick={() => addToCartHandler(data)}
                >
                  <span className="mr-2">
                    <BsFillCartFill />
                  </span>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SingleProductPage;
