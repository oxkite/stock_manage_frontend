import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

export const fetchCategory = createAsyncThunk(
  "/fetch/category",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8080/category");
      thunkAPI.dispatch(setCategory(response.data));
      toast.success("Get categories successfully");
      // return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "/fetch/products",
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const response = await axios.get(
        `http://localhost:8080/${data.id}/${data.higher}`
      );
      thunkAPI.dispatch(setProducts(response.data.products));
      thunkAPI.dispatch(setIsLoading(false));
      toast.success("Get products successfully");
      // thunkAPI.dispatch(setProducts2(response.data.product2));
      // return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatePrice = createAsyncThunk(
  "/update/prices",
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const response = await axios.post(
        `http://localhost:8080/update/${data.category}`,
        {
          percent: data.percent,
        }
      );
      thunkAPI.dispatch(setIsLoading(false));
      toast.success("Update products successfully");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateSelectedPrice = createAsyncThunk(
  "/update/prices",
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const response = await axios.post(
        `http://185.68.120.76:8080/update/selected/price`,
        data
      );
      console.log(response);
      thunkAPI.dispatch(setIsLoading(false));
      toast.success("Update products successfully");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialValue = {
  categories: [],
  products: [],
  filter: "All",
  isLoading: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState: initialValue,
  reducers: {
    setCategory: (state, action) => {
      state.categories = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    updateFilterStatus: (state, action) => {
      state.filter = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCategory, setProducts, updateFilterStatus, setIsLoading } =
  categorySlice.actions;

export default categorySlice.reducer;
