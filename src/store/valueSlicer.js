import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProjectDeleteID: null,
  refrecher: false,
  refetchSwitchPage: false,
  selectedProjectUpdateID: null,
  selectedProjectViewID: null,
  selectedProjectEditorID: null,
  isDiaglogAddPageOpen: false,
  selectedPageId: null,
  selectedProjectName: null,
  noPages: false,
  firstPage: true,
  saveLoading: false,
};
const valueSlicer = createSlice({
  name: "selectedProjectDeleteID",
  initialState,
  reducers: {
    setSelectedProjectDeleteID: (state, action) => {
      state.selectedProjectDeleteID = action.payload;
    },
    setSelectedProjectUpdateID: (state, action) => {
      state.selectedProjectUpdateID = action.payload;
    },
    setRefrecher: (state, action) => {
      state.refrecher = action.payload;
    },
    setSelectedProjectViewID: (state, action) => {
      state.selectedProjectViewID = action.payload;
    },
    setSelectedProjectEditorID: (state, action) => {
      state.selectedProjectEditorID = action.payload;
    },
    setIsDiaglogAddPageOpen: (state, action) => {
      state.isDiaglogAddPageOpen = action.payload;
    },
    setSelectedPageId: (state, action) => {
      state.selectedPageId = action.payload;
    },
    setSelectedProjectName: (state, action) => {
      state.selectedProjectName = action.payload;
    },
    setNoPages: (state, action) => {
      state.noPages = action.payload;
    },
    setFirstPage: (state, action) => {
      state.firstPage = action.payload;
    },
    setSaveLoading: (state, action) => {
      state.saveLoading = action.payload;
    },
    setRefetchSwitchPage: (state, action) => {
      state.refetchSwitchPage = action.payload;
    },
  },
});

export const {
  setSelectedProjectDeleteID,
  setSelectedProjectUpdateID,
  setSelectedProjectViewID,
  setSelectedProjectEditorID,
  setIsDiaglogAddPageOpen,
  setSelectedPageId,
  setSelectedProjectName,
  setNoPages,
  setFirstPage,
  setSaveLoading,
  setRefrecher,
  setRefetchSwitchPage
} = valueSlicer.actions;

export default valueSlicer.reducer;
