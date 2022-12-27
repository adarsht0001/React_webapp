import {configureStore,createSlice} from "@reduxjs/toolkit";

const intialValue={value:{name:"",email:"",jwt:""}}       
const userSlice=createSlice({
    name:"user",
    initialState:intialValue,
    reducers:{
        login:(state,action)=>{
            state.value=action.payload        
        }
    }
})



export const store=configureStore({
    reducer:{
        user:userSlice.reducer
    }
})