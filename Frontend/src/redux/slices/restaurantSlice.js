import {createSlice} from "@reduxjs/toolkit";
import { getAllRestaurants } from "../actions/restaurantAction";

const initialState = {
    restaurants: [],
    count: 0,
    loading: false,
    error: null,
    showVegOnly: false,
    pureVegRestaurants: 0,
};

const restaurantSlice = createSlice({
    name: "restaurants",
    initialState,
    reducers: {
        sortByRatings: (state) => {
            state.restaurants.sort((a, b) => b.ratings - a.ratings);
        },
        sortByReviews: (state) => {
            state.restaurants.sort((a,b) =>b.numOfReviews - a.numOfReviews);

        },
        toggleVegOnly: (state) => {
            state.showVegOnly = !state.showVegOnly;
            state.pureVegRestaurantsCount = calculatePureVegCount(state.restaurants, state.showVegOnly);
        },
        clearError:(state) =>{
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        //Get
        .addCase(getAllRestaurants.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getAllRestaurants.fulfilled,(state,action)=>{
            state.loading = false;
            state.restaurants = action.payload.restaurants;
            state.count = action.payload.count;
        })
        .addCase(getAllRestaurants.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload || "Failed to fetch restaurants";
        })
    }
})
export const {
    sortByRatings,
    sortByReviews,
    toggleVegOnly,
    clearError
}= restaurantSlice.actions;

export default restaurantSlice.reducer;

//helper function to calculate pure veg restaurants count
const calculatePureVegCount = (restaurants, showVegOnly) => {
    if (!showVegOnly) return restaurants.length;

    return restaurants.filter(restaurant => restaurant.isVeg).length;
}
    

