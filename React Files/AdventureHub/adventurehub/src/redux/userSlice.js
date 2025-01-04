import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user : {},
    loggedIn : false
};

const userSlice = createSlice({
    name : 'user',
    initialState ,
    reducers : {
        setUser(state, action){
            state.user = action.payload;
            state.loggedIn = true;
        },
        clearUser(state){
            state.user={};
            state.loggedIn = false;
        },
    },
});

export const {setUser, clearUser} = userSlice.actions;
export const userReducer = userSlice.reducer;