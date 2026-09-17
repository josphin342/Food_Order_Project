import {createSlice} from '@reduxjs/toolkit';
//create initial state
const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  isUpdated: false,
  message: null,
  success: false,
  authChecked: false,
};

const userSlice =createSlice({
  name: 'user',
  initialState, 
    reducers: {
        //login /register/load
        loginRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;// store user data 
            state.authChecked = true;
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.authChecked = true;
            state.error = action.payload;
        },

        loadUserRequest: (state) => {
            state.loading = true;
            state.authChecked = false;
        },
        loadUserSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.authChecked = true;
        },
        //load user fail
        loadUserFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.authChecked = true;
            state.error = action.payload;
        },
        //logout user
        logoutSuccess: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.authChecked = true;
        },

        //logout fail
        logoutFail: (state, action) => {
            state.error = action.payload;
        },
        //update profile/password
        updateRequest: (state) => {
            state.loading = true;
        },
        updateSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updateFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateReset: (state) => {
            state.isUpdated = false;
        },
        //clear errors
        clearErrors: (state) => {
            state.error = null;
        },
    },   
 })
 export const {
    loginRequest,
    loginSuccess,
    loginFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateRequest,
    updateSuccess,
    updateFail,
    updateReset,
    clearErrors
 } = userSlice.actions;

 export default userSlice.reducer;
