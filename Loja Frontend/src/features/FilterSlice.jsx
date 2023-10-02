import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { color } from "framer-motion";

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const storeInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

// Define your API URL
const apiUrl = "https://api.pujakaitem.com/api/products";

// Create an async thunk to fetch data
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filter_products: [],
    all_products: [],
    category: "all",
    company: "all",
    color: "all",
    maxPrice: 0,
    price: 0,
    minPrice: 0,
  },
  reducers: {
    companyFilter(state, action) {
      state.filter_products = data;
      // if (company !== "all") {
      //   filter_products = state.filter_products.filter(
      //     (curElem) =>
      //       // curElem.colors.includes(color === action.payload)
      //       curElem.company === state.company
      //   );
      // }
    },
  },
});

export const { companyFilter } = filterSlice.actions;
export default filterSlice.reducer;
