import { configureStore } from "@reduxjs/toolkit";
import valueReducer  from "./valueSlicer"; 

const store = configureStore({
    reducer : {
        values : valueReducer 
    }
})

export default store