import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../ts/Models/Item";

type groupsState = { value?: { [key: string]: Item[] } };
import { appState } from "./store";

const initialState: groupsState = {};

export const groupsSlice = createSlice({
  name: "groupsSlice",
  initialState: initialState,
  reducers: {
    storeGroups: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { storeGroups } = groupsSlice.actions;

export const groupsSelector = (state: appState) => state.groups.value;

export default groupsSlice.reducer;
