//user open app
//we needs restaurant data from backend
//Api call happens
//data stored in redux
//UI updates automatically

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

//get all restaurants
export const getAllRestaurants = createAsyncThunk(
  'restaurants/getRestaurants',
  async (keyword =" ",{rejectWithValue}) => {
    try {
      const { data } = await api.get(`/v1/eats/stores?keyword=${keyword}`);
      console.log("Fetched restaurants data:", data);
      return {
        restaurants: data.restaurants,
        count : data.count,
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getRestaurants = getAllRestaurants;