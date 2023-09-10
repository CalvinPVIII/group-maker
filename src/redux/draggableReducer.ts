import { createSlice } from "@reduxjs/toolkit";
import { appState } from "./store";

const draggableSlice = createSlice({
  name: "draggableInfo",
  initialState: { value: {} },
  reducers: {
    setDraggableInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDraggableInfo } = draggableSlice.actions;
export const draggableInfoSelector = (state: appState) => state.draggableInfo;
export default draggableSlice.reducer;
