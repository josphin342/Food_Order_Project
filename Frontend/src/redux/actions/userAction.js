/* eslint-disable no-unused-vars */
//dispatch + call API + update state based on success or failure

import api from "../../utils/api"

import {
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
} from "../slices/userSlice"

//login

export const login = (email,password)=>async(dispatch)=>{
    try{
        dispatch(loginRequest())
        const {data} =await api.post("v1/users/login",{
            email,password
        })
        dispatch(loginSuccess(data.data.user))

    }catch(error){
        dispatch(loginFail("login failed"))

    }
}
//register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const { data } = await api.post(
      "v1/users/signup",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("REGISTER SUCCESS:", data);

    dispatch(loginSuccess(data.data.user));

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    console.log("STATUS:", error.response?.status);
    console.log("RESPONSE DATA:", error.response?.data);
    console.log("MESSAGE:", error.response?.data?.message);

    dispatch(
      loginFail(
        error.response?.data?.message || "Registration failed"
      )
    );
  }
};
//load user
export const loadUser = ()=>async(dispatch)=>{
    try{
        dispatch(loadUserRequest())
        const {data} =await api.get("v1/users/profile")
    
        dispatch(loadUserSuccess(data.user))
        
    }catch(error){
        dispatch(loadUserFail(error.response?.data?.message))

    }
}

//update profie

export const updateProfile = (userData)=>async(dispatch)=>{
    try{
        dispatch(updateRequest())
        const {data} =await api.put("v1/users/me/update",userData,{
            headers:
            {"Content-Type" : "multipart/form-data"}
        })
    
        dispatch(updateSuccess(data.success))
        
    }catch(error){
        dispatch(updateFail(error.response?.data?.message))

    }
}
//logout

export const logout = ()=>async(dispatch)=>{
    try{
        await api.get("v1/users/logout")
    
        dispatch(logoutSuccess())
        
    }catch(error){
        dispatch(logoutFail(error.response?.data?.message))

    }
}
