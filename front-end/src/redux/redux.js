import {configureStore,createSlice,combineReducers} from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import {persistReducer} from 'redux-persist'


const persistConfig={
    key:'root',
    storage
}



const intialValue={value:{name:null,email:null,jwt:""}}   
const initialAdmin={value:{email:null,edit:{}}}  
  
const userSlice=createSlice({
    name:"user",
    initialState:intialValue,
    reducers:{
        login:(state,action)=>{
            state.value=action.payload        
        },
        logout:(state,action)=>{
            state.value=intialValue
        }
    }
})

const adminSlice=createSlice({
    name:"admin",
    initialState:initialAdmin,
    reducers:{
        adminlogin:(state,action)=>{
            state.value=action.payload
        },
        adminlogout:(state,action)=>{
            state.value=initialAdmin
        },
        adminsetedit:(state,action)=>{
            state.value=action.payload
        }
    }
})


export const {login,logout} =userSlice.actions
export const {adminlogin,adminlogout,adminsetedit}=adminSlice.actions

const reducer=combineReducers({
    user:userSlice.reducer  ,
    admin:adminSlice.reducer
})
const persistedReducer=persistReducer(persistConfig,reducer) 

export const store=configureStore({
    reducer:persistedReducer
})