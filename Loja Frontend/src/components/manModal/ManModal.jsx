import React from "react";
import { NavLink } from "react-router-dom";
import "./ManModal.css";

const ManModal = () => {
  return (
    <div>
      <div className="manmodal-container">
        <div className="manmodal">
          <div className="modal-left">
            <h3>Winter Wear</h3>
            <ul>
              <li>
                <NavLink className="link">Stores</NavLink>
              </li>
              <li>
                <NavLink className="link"> Contact Us</NavLink>
              </li>
              <li>
                <NavLink className="link">Size Guide</NavLink>
              </li>
              <li>
                <NavLink className="link"> Shipping</NavLink>
              </li>
              <li>
                <NavLink className="link">Customer Care</NavLink>
              </li>
              <li>
                <NavLink className="link">Exchange Policy</NavLink>
              </li>
              <li>
                <NavLink className="link">Track Your Order</NavLink>
              </li>
              <li>
                <NavLink className="link"> International</NavLink>
              </li>
              <li>
                <NavLink className="link">FAQ's</NavLink>
              </li>
              <li>
                <NavLink className="link">Privacy Policy</NavLink>
              </li>
            </ul>
          </div>
          <div className="modal-center">
            <h3>Western Wear</h3>
            <ul>
              <li>
                <NavLink className="link"> Catalogue</NavLink>
              </li>
              <li>
                <NavLink className="link">Couture Process</NavLink>
              </li>
              <li>
                <NavLink className="link">Traditions</NavLink>
              </li>
              <li>
                <NavLink className="link">Charity</NavLink>
              </li>
              <li>
                <NavLink className="link">Media and Press</NavLink>
              </li>
              <li>
                <NavLink className="link">Media and Press</NavLink>
              </li>
            </ul>
            <h3>Western Wear</h3>
            <ul>
              <li>
                <NavLink className="link"> Catalogue</NavLink>
              </li>
              <li>
                <NavLink className="link">Couture Process</NavLink>
              </li>
              <li>
                <NavLink className="link">Traditions</NavLink>
              </li>
              <li>
                <NavLink className="link">Charity</NavLink>
              </li>
              <li>
                <NavLink className="link">Media and Press</NavLink>
              </li>
            </ul>
          </div>
          <div className="modal-right">
            <h3>Western Wear</h3>
            <ul>
              <li>
                <NavLink className="link"> Catalogue</NavLink>
              </li>
              <li>
                <NavLink className="link">Couture Process</NavLink>
              </li>
              <li>
                <NavLink className="link">Traditions</NavLink>
              </li>
              <li>
                <NavLink className="link">Charity</NavLink>
              </li>
              <li>
                <NavLink className="link">Media and Press</NavLink>
              </li>
              <li>
                <NavLink className="link">Media and Press</NavLink>
              </li>
            </ul>
            <h3>Western Wear</h3>
            <ul>
              <li>
                <NavLink className="link"> Catalogue</NavLink>
              </li>
              <li>
                <NavLink className="link">Couture Process</NavLink>
              </li>
              <li>
                <NavLink className="link">Traditions</NavLink>
              </li>
              <li>
                <NavLink className="link">Charity</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManModal;
