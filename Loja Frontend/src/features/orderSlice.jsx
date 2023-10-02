import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// API URL
const createOrderUrl = "/api/createOrder";

// Create an async thunk to fetch data
export const createOrderAsync = createAsyncThunk("order/createOrder", async (order) => {
    const response = await axios.post(createOrderUrl, order); 
    return response.data;
  });

// API URL
const getOrdersUrl = "/api/getAllOrdersForUser";

// Create an async thunk to fetch data
export const getOrdersAsync = createAsyncThunk('orders/getOrders', async (userId) => {
  try {
    const response = await axios.post(getOrdersUrl , {userID : userId});
    console.log(response.data); 
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
})

const getAllOrdersUrl = "/api/getAllOrders";

// Create an async thunk to fetch data
export const getAllOrdersAsync = createAsyncThunk('orders/getAllOrders',async () => {
  try {
    const response = await axios.post(getAllOrdersUrl);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
})

const initialState = {
    orders: [],
    userOrders : [],
    status: 'idle',
    currentOrder: null,
    allOrders : []
    
  };
  
  export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
       resetOrder : (state) => {
        state.currentOrder = null
       }
    },
    extraReducers: (builder) => {
      builder
        .addCase(createOrderAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createOrderAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.orders.push(action.payload);
          state.currentOrder = action.payload;
        }) 
        .addCase(getOrdersAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getOrdersAsync.fulfilled, (state,action) => {
          state.status = "succeeded";
          state.userOrders = action.payload.orderData;
          
        })
        .addCase(getOrdersAsync.rejected, (state, action) => {
          state.status = 'idle';
          state.error = action.error.message; 
        })
        .addCase(getAllOrdersAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getAllOrdersAsync.fulfilled, (state,action) => {
          state.status = "succeeded";
          state.allOrders = action.payload.orderData;
          
        })
    },
  });

  export const {resetOrder} = orderSlice.actions;
  export const selectCurrentOrder = (state) => state.order.currentOrder;
  
  export default orderSlice.reducer;