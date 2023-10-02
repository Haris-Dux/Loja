import React, { useEffect, useState, useRef } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../../features/ProductSlics";
import SearchModal from "../searchModal/SearchModal";
import OtherModal from "../otherModal/OtherModal";
import ManModal from "../manModal/ManModal";
import axios from "axios";
import { clearUser } from "../../features/authSlice";


const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  console.log(mobileMenu);
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  const { data } = useSelector((state) => state.cart);
  const setIsSearchModal = useSelector((state) => state.modal.setIsSearchModal);
  const [searchData, setSearchData] = useState("");
  const user = useSelector((state) => state.auth.user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/logout", {
        id: user.id,
      });
      if (response.status === 200) {
        console.log("User logged out successfully");
        dispatch(clearUser());
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error.message);
    }
  };

  useEffect(() => {
    dispatch(searchProduct(searchData));
  }, [dispatch,searchData]);

  return (
    <div>
      <div className="container">
        <nav className="navbar">
          <div className="navbar_header">
            <NavLink to="/">
              <img src=".\assets\Images\loja png-01.png" alt="" />
            </NavLink>
          </div>
          <div>
            <ul
              className={mobileMenu ? "navbar_menu mobile-menu" : "navbar_menu"}
            >
              {user && user.role === 'admin' ? (<><li>
                <Link to="/admin-orders" onClick={() => setMobileMenu(false)}>
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/add-categoryType" onClick={() => setMobileMenu(false)}>
                  CategoryType
                </Link>
              </li>
              <li>
                <Link to="/add-subCategory" onClick={() => setMobileMenu(false)}>
                  subCategory
                </Link>
              </li>
              <li>
               <Link to="/add-product" onClick={() => setMobileMenu(false)}>
                 Products
               </Link>
             </li>
              </> ) : (<><li>
                <Link to="/woman" onClick={() => setMobileMenu(false)}>
                  Woman
                </Link>
              </li>
              <li>
                <Link to="/kids" onClick={() => setMobileMenu(false)}>
                  Kids
                </Link>
              </li>
              <li>
                <Link to="/man" onClick={() => setMobileMenu(false)}>
                  Man
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setMobileMenu(false)}>
                  About
                </Link>
              </li>
              <li>
              </li>
         
             </>)}
            </ul>
          </div>
          <div className="navbar_link_icons">
            <div className="search_box icon">
              <input
                className={showInput ? "show" : "none"}
                onChange={(e) => setSearchData(e.target.value)}
                placeholder="Product Name.."
              />
              <AiOutlineSearch
                className="search_icon icon hover"
                onClick={() => {
                  setShowInput(!showInput);
                  setMobileMenu(false);
                }}
              />
            </div>
            <div className="profile_icon icon">
              {user ? (
                <div className="dropdown">
                  <button className="dropbtn">
                    <span className="hover">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </button>
                  <div className="dropdown-content">
                    {/* <NavLink
                      to="/account-settings"
                      onClick={() => setMobileMenu(false)}
                    >
                      Account Settings
                    </NavLink> */}
                    <NavLink
                      to="/my-orders"
                      onClick={() => setMobileMenu(false)}
                    >
                      My Orders
                    </NavLink>
                    <NavLink onClick={() => setMobileMenu(false)}>
                    <button onClick={handleLogout}>Logout</button>
                  </NavLink>
                  </div>
                </div>
              ) : (
                // If no user is logged in, display the CgProfile icon
                <NavLink to="/signup" onClick={() => setMobileMenu(false)}>
                  <CgProfile className="hover" />
                </NavLink>
              )}
            </div>
           {user && user.role === 'admin' ? (null) : (<div className="cart_icon icon">
              <NavLink to="/cart" onClick={() => setMobileMenu(false)}>
                <HiOutlineShoppingCart className="hover" />
                <span>{data.length}</span>
              </NavLink>
            </div>)}

            {/* <div className="setting_icon icon">
              <div className="dropdown">
                <button className="dropbtn">
                  <BsThreeDotsVertical className="hover" />
                </button>
                <div className="dropdown-content">
                  {!user ? (<NavLink
                    to={'/login'}
                    onClick={() => setMobileMenu(false)}
                  >
                    Login
                  </NavLink>) :
                 ( <NavLink onClick={() => setMobileMenu(false)}>
                    <button onClick={handleLogout}>Logout</button>
                  </NavLink>)}
                </div>
              </div>
            </div> */}
          </div>
          <FaBarsStaggered
            className={mobileMenu ? "rotate bar" : "bar"}
            onClick={() => setMobileMenu(!mobileMenu)}
          />
        </nav>
      </div>
      {/* <CartModal /> */}
      {setIsSearchModal === true &&
      showInput === true &&
      searchData.length > 0 ? (
        <SearchModal />
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
