import { createSlice } from "@reduxjs/toolkit";
import { appState } from "./store";

export const itemInfoSlice = createSlice({
  name: "itemInfo",
  initialState: { value: null },
  reducers: {
    setFocussedItem: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFocussedItem } = itemInfoSlice.actions;
export const itemSelector = (state: appState) => state.selectedItem.value;
export default itemInfoSlice.reducer;
