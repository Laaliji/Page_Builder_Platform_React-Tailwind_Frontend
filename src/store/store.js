// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import valueReducer from "./valueSlicer";
import tabReducer from "./tabSlicer"; 

const store = configureStore({
  reducer: {
    values: valueReducer,
    tab: tabReducer, 
  },
});

export default store;
