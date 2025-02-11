import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user : JSON.parse(localStorage.getItem("user")) || null,
    loggedIn : JSON.parse(localStorage.getItem("user")) ? true : false
};

const userSlice = createSlice({
    name : 'user',
    initialState ,
    reducers : {
        setUser(state, action){
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.loggedIn = true;
        },
        clearUser(state){
            state.user=null;
            localStorage.removeItem("user");
            state.loggedIn = false;
        },
    },
});

export const {setUser, clearUser} = userSlice.actions;
export const userReducer = userSlice.reducer;