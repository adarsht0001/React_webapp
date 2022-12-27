import {configureStore,createSlice,combineReducers} from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import {persistReducer} from 'redux-persist'


const persistConfig={
    key:'root',
    storage
}



const intialValue={value:{name:null,email:null,jwt:""}}     
  
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

export const {login,logout} =userSlice.actions

const reducer=combineReducers({
    user:userSlice.reducer  
})
const persistedReducer=persistReducer(persistConfig,reducer) 

export const store=configureStore({
    reducer:persistedReducer
})