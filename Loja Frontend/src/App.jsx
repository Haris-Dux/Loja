import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  Home,
  About,
  Kids,
  Man,
  Woman,
  AllProducts,
  SingleProductPage,
  ErrorPage,
  Cart,
  SignupPage,
  LoginPage,
} from "./pages/index";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from "./pages/checkout/Checkout";
import OrderSuccessPage from "./pages/checkout/OrderSuccessPage";
import MyOrders from "./pages/user/MyOrders";
import AdminOrders from "./components/admin/AdminOrders";
import AdminProtected from "./components/admin/AdminProtected";
import ProductForm from "./components/admin/ProductForm";
import UaDProduct from "./components/admin/UaDProduct";
import AddCategoryType from "./components/admin/CategoryType/AddCategoryType";
import AddSubCategory from "./components/admin/SubCategory/AddSubCategory";
import Faq from "./pages/FAQ/Faq";
import Shipping from "./pages/Shipping/Shipping";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import ExchangePolicy from "./pages/exchangePolicy/ExchangePolicy";



const App = () => {
  const location = useLocation();
  const ModalVisible = useSelector((state) => state.modal.isModalVisible);

  return (
    <>
      {ModalVisible && <SingleProductPage />}
      <Navbar />
      {/* <DummyData/> */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/man" element={<Man />} />
          <Route path="/woman" element={<Woman />} />
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/faq" element={<Faq/>} />
          <Route path="/shipping" element={<Shipping/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/exchange-policy" element={<ExchangePolicy/>} />
          <Route path="/order-success/:id" element={ <OrderSuccessPage/>  }/>
          <Route path="/my-orders" element={<MyOrders/>} />
          <Route path="/admin-orders" element={<AdminProtected><AdminOrders/></AdminProtected>} />
          <Route path="/add-product" element={<ProductForm/>} />
          <Route path="/ud-product/:id" element={<AdminProtected><UaDProduct /></AdminProtected>} />
          <Route path="/add-categoryType" element={<AddCategoryType/>} />
          <Route path="/add-subCategory" element={<AddSubCategory/>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer 
  position="top-center"
  autoClose={1500}
  //hideProgressBar
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable={false}
  pauseOnHover
  theme="light"/>
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default App;
