import React from "react";
import { BiPhoneCall, BiMap } from "react-icons/bi";
import { TbWorldWww } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import "./Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer>
        <section className="container">
          <div className="footer_content">
            <div className="footer_top">
              <div className="footer_title">
                <h2>JOIN OUR NEWS LETTER</h2>
              </div>
              <div className="footer_search_box">
                <div className="footer_input">
                  <input type="text" />
                </div>
                <button className="footer_btn btn">Subcribes</button>
              </div>
            </div>
            <div className="footer_center">
              <div className="footer_center_box">
                <h2>Morat</h2>
                <p>
                  Morat is a London based Fashion brand . Join the Latest Fshion
                  trends like never before with Morat where you can buy anything
                  you please!
                </p>
                <p>Gets your order delivered at your door step !</p>
              </div>
              <div className="footer_center_box">
                <h4>Your Account</h4>
                <ul>
                  <li>
                    <NavLink to={'/login'}>Login</NavLink>
                  </li>
                  <li>
                    <NavLink to={'/signup'} >Sign Up</NavLink>
                  </li>
                </ul>
              </div>
              <div className="footer_center_box">
                <h4>Our Company</h4>
                <ul>
                  <li>
                    <NavLink to={'/about'}>About Us</NavLink>
                  </li>
                  <li>
                    <NavLink to={'shipping'}>Delivery</NavLink>
                  </li>
                  <li>
                    <NavLink to={'/exchange-policy'}>Exchange Policy</NavLink>
                  </li>
                  <li>
                    <NavLink to={'privacy-policy'}>Privacy Policy</NavLink>
                  </li>
                  <li>
                    <NavLink to={'/faq'}>FAQ Page</NavLink>
                  </li>
                </ul>
              </div>

              <div className="footer_center_box">
                <h4>Products</h4>
                <ul>
                  <li>
                    <NavLink to={'/woman'} >Women</NavLink>
                  </li>
                  <li>
                    <NavLink to={'/kids'}>Kids</NavLink>
                  </li>
                  <li>
                    <NavLink to={'/man'}>Men</NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer_bottom">
              <div className="footer_bottom_box">
                <div className="footer_icon">
                  <BiPhoneCall className="icon" />
                </div>
                <p>
                  <NavLink>+000 956 199 660</NavLink>
                </p>
              </div>
              <div className="footer_bottom_box">
                <div className="footer_icon">
                  <TbWorldWww className="icon" />
                </div>
                <p>
                  <NavLink>www.morat.com</NavLink>
                </p>
              </div>
              <div className="footer_bottom_box">
                <div className="footer_icon">
                  <MdOutlineMail className="icon" />
                </div>
                <p>
                  <NavLink>morat@gmail.com</NavLink>
                </p>
              </div>
              <div className="footer_bottom_box">
                <div className="footer_icon">
                  <BiMap className="icon" />
                </div>
                <p>
                  <NavLink>68 street- London</NavLink>
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
};

export default Footer;
