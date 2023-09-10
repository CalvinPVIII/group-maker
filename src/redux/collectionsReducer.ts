import { createSlice } from "@reduxjs/toolkit";
import { appState } from "./store";
type collectionState = { list: Array<any>; selectedCollection: {} };
const initialState: collectionState = { list: [], selectedCollection: {} };
export const collectionsSlice = createSlice({
  name: "collections",
  initialState: initialState,
  reducers: {
    addCollection: (state, action) => {
      state.list.push(action.payload);
    },
    updateCollection: (state, action) => {
      const index = state.list.findIndex((c) => c.id === action.payload.id);
      if (index > -1) {
        state.list[index] = action.payload;
      }
    },
    removeFromAllCollections: (state, action) => {
      state.list = state.list.filter((c) => c.id !== action.payload);
    },
  },
});

export default collectionsSlice.reducer;
export const { addCollection, updateCollection, removeFromAllCollections } = collectionsSlice.actions;
export const collectionsSelector = (state: appState) => state.collections.list;
export const selectedCollectionSelector = (state: appState) => state.collections.selectedCollection;
