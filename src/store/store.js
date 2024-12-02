import { configureStore } from "@reduxjs/toolkit";
import valueSlicer from "./valueSlicer"; 

const store = configureStore({
    reducer : {
        values : valueSlicer
    }
})