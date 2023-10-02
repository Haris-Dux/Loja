import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const fetchFromLocalStorage = () => {
    let categories = localStorage.getItem('categories');
    if (categories) 
    {return JSON.parse(localStorage.getItem("categories"))
}else{
    return [];
}}

const storeInLocalStorage = (AllCategories) => {
    localStorage.setItem("categories", JSON.stringify(AllCategories));
  };
  

// API URL
const getCategoriesUrl = '/api/getAllCategories';

// Create an async thunk to fetch data
export const getCategoriesAsync = createAsyncThunk("categories/getCategories" , async () => {
   try {
    const response = await axios.post(getCategoriesUrl);
    return response.data;
   } catch (error) {
    throw error;
   }
});

//API URL
const addCategoryTypeUrl = '/api/createCategoryType';

// Create an async thunk 
export const addCategoryTypeAsync = createAsyncThunk('categoryType/addCategoryType', async (formData) => {
    try {
        const response = await axios.post(addCategoryTypeUrl,formData);
       toast.success(response.data.msg)
        return response.data;
    } catch (error) { 
        toast.error(response.data.msg)
        throw error;
    }
});

// API URL
const getCategoriesTypeUrl = '/api/getAllCategoryTypes';

// Create an async thunk to fetch data
export const getCategoriesTypeAsync = createAsyncThunk("categories/getCategoriesTypes" , async (category) => {
   try {
    const response = await axios.post(getCategoriesTypeUrl,category);
    return response.data;
   } catch (error) {
    throw error;
   }
});

// API URL
const addSubCategoryUrl = '/api/createSubCategory';

// Create an async thunk to fetch data
export const addSubCategoryAsync = createAsyncThunk("categories/addSubCategory" , async (category,categoryType,formData) => {
   try {
    const response = await axios.post(addSubCategoryUrl,category,categoryType,formData);
    toast.success(response.data.msg);
    return response.data;
   } catch (error) {
    toast.error(errorMessage);
    throw error;
   }
});

const getsubCategoriesUrl = '/api/getAllSubCategories';

// Create an async thunk to fetch data
export const getsubCategoriesAsync = createAsyncThunk("categories/getAllSubCategories" , async (category,categoryType) => {
   try {
    const response = await axios.post(getsubCategoriesUrl,category,categoryType);
    return response.data;
   } catch (error) {
    throw error;
   }
});


const initialState = {
    status : 'idle',
    AllCategories :fetchFromLocalStorage(),
    addCategoryType : null,
    getCategoriesTypes: [],
    addSubCategory:null,
    subCategories:[],
    selectedSubCategory:null
};

export const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers : {
        setSelectedSubCategory: (state,action)=>{
            state.selectedSubCategory = action.payload;
        }
        
    },
    extraReducers : (builder) => {
        builder
        .addCase(getCategoriesAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getCategoriesAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.AllCategories = action.payload.categoryData;
            storeInLocalStorage(state.AllCategories);
        })
        .addCase(getCategoriesAsync.rejected, (state) => {
            state.status = 'failed';
        })
        .addCase(addCategoryTypeAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(addCategoryTypeAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.addCategoryType = action.payload;
        })
        .addCase(getCategoriesTypeAsync.pending,(state) => {
            state.status = 'loading';
        })
        .addCase(getCategoriesTypeAsync.fulfilled,(state,action) => {
            state.status = "succeeded";
            state.getCategoriesTypes = action.payload.categoryTypesData;
        })
        .addCase(addSubCategoryAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(addSubCategoryAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.addSubCategory = action.payload;
        })
        .addCase(getsubCategoriesAsync.pending,(state) => {
            state.status = 'loading';
        })
        .addCase(getsubCategoriesAsync.fulfilled,(state,action) => {
            state.status = "succeeded";
            state.subCategories = action.payload.subCategoryData;
        })
    }
});

export const {setSelectedSubCategory} = categorySlice.actions;

export default categorySlice.reducer;