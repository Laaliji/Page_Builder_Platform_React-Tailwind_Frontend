import { createSlice } from "@reduxjs/toolkit" 

const initialStates = {
    selectedProjectDeleteID : '' 
}

const valueSlicer = createSlice({
    name : 'selectedProjectDeleteID',
    initialStates,
    reducers : {
        setSelectedProjectDeleteID : (state,action) => {
            state.selectedProjectDeleteID = action.payload
        }
    }
})

export const { selectedProjectDeleteID } = valueSlicer.actions
export default valueSlicer.reducer