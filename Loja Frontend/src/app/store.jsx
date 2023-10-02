import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/ProductSlics";
import cartSlice from "../features/CartSlice";
import modalSlice from "../features/Modal";
import filterSlice from "../features/FilterSlice";
import authReducer from "../features/authSlice";
import orderSlice  from "../features/orderSlice";
import  categorySlice  from "../features/CategoriesSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartSlice,
    modal: modalSlice,
    filter: filterSlice,
    auth: authReducer,
    order: orderSlice,
    categories: categorySlice
  },
});
