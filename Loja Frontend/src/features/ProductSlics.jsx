import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
const apiUrl = "/api/getAllProducts";

// Create an async thunk to fetch data
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await axios.post(apiUrl);
  return response.data;
});

// Define your API URL
const productByIdUrl = "/api/getProduct";

// Create an async thunk to fetch data
export const getProductByIdAsync = createAsyncThunk("product/productById", async (id) => {
 try {
  const response = await axios.post(productByIdUrl,{id});
  console.log(response.data);
  return response.data;
 } catch (error) {
  console.log(error);
      throw error;
 }
});

// Define your API URL
const updateProductUrl = "/api/updateProduct";

// Create an async thunk to fetch data
export const updateProductAsync = createAsyncThunk("product/updateProduct", async (formData) => {
 try {
  const response = await axios.post(updateProductUrl,formData);
  console.log(response.data);
  toast.success(response.data.msg);
 } catch (error) {
  toast.error(response.data.msg);
      throw error;
 }
});

// Define your API URL
const deleteProductUrl = "/api/deleteProduct";

// Create an async thunk to fetch data
export const deleteProductAsync = createAsyncThunk("product/deleteProduct", async (id) => {
 try {
  const response = await axios.post(deleteProductUrl,{id});
  toast.success(response.data.msg);
  return response.data;
 } catch (error) {
  toast.error(response.data.msg);
      throw error;
 }
});

// Define your API URL
const createProductUrl = "/api/createProduct";

// Create an async thunk to fetch data
export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (formData) => {
    try {
      const response = await axios.post(createProductUrl, formData);
      toast.success(response.data.msg);
      return response.data;
    } catch (error) {
      const errorMessage = JSON.stringify(error.response.data.msg);
      toast.error(errorMessage);
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "cart",
  initialState: {
    data: fetchFromLocalStorage(),
    filter_products: [],
    company: "all",
    status: "idle",
    error: null,
    searchData: [],
    createProduct: null,
    productById:[],
    updatedProduct:null,
    deletedProduct:null,
    categoryFilteredProducts: [],
  },
  reducers: {
    searchProduct: (state, action) => {
      console.log(action.payload);
      state.searchData = action.payload;
    },
    setCompanyFilter(state, action) {
      state.filter_products = state.data;
      state.company = action.payload;
     // console.log(state.company, state.filter_products);
      if (state.company !== "all") {
        state.filter_products = state.filter_products.filter((curEle) => {
          curEle.company === action.payload;
        });
      }
      const newState = { ...state };
      newState.filter_products = state.data;
      newState.company = action.payload;
      if (newState.company !== "all") {
        newState.filter_products = state.data.filter((curEle) => {
          curEle.company === newState.company;
        });
        console.log(newState);
        return newState;
      }
      state.filter_products = state.data;
      state.company = action.payload;
      if (state.company === "all") {
        state.filter_products = state.data;
      } else {
        state.filter_products = state.data.filter((curEle) => {
          curEle.company === state.company;
        });
      }
      state.filter_products =
      state.company === "all"
        ? state.data
        : state.data.filter((data) => {
            data.company === state.company;
          });
     // console.log(state.filter_products);
      storeInLocalStorage(state.filter_products);
    },
    clearDeletedProduct(state){
      state.deletedProduct = null;
    },
    filterProductsByCategory: (state, action) => {
      const categoryId = action.payload;
      state.categoryFilteredProducts = state.data.filter(product => product.category === categoryId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.productData.products;
        storeInLocalStorage(state.data);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.createProduct = action.payload;
      })
      .addCase(getProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productById = action.payload.productData;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.updatedProduct = action.payload;
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deletedProduct = action.payload;
      })
  },
});

export default productSlice.reducer;
export const { searchProduct, setCompanyFilter , clearDeletedProduct ,filterProductsByCategory  } = productSlice.actions;
