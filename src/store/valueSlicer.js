import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedProjectDeleteID: null,
    refrecher : false
}

const valueSlicer = createSlice({
    name: 'selectedProjectDeleteID',
    initialState, 
    reducers: {
        setSelectedProjectDeleteID: (state, action) => {
            state.selectedProjectDeleteID = action.payload
        },
        setRefrecher : (state,action) => {
            state.refrecher = action.payload
        }
    }
})

export const { setSelectedProjectDeleteID , setRefrecher } = valueSlicer.actions 
export default valueSlicer.reducer