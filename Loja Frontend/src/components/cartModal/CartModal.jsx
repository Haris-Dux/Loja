import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CartModal.css";

const CartModal = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.cart);
  return (
    <div>
      <div className="cartModal">
        <h2>Cart Product</h2>
        <div className="body">
          {data.map((ele) => {
            return (
              <>
                <div className="card">
                  <img src={ele.image.secure_url} alt="" />
                  <div className="card-body">
                    <div className="title-description">
                      <h4>{ele.name}</h4>
                      <p>{ele.description.slice(0, 30)}...</p>
                    </div>
                    <div className="price">
                      <h4>Price :</h4>
                      <span>{ele.price}</span>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
