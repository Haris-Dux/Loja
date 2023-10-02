
// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  role : null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.role = action.payload.role; 

    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = null; 
      
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { setUser, clearUser ,updateUser } = authSlice.actions;

export default authSlice.reducer;
