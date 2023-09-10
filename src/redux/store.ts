import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "./groupsReducer";
import { Item } from "../ts/Models/Item";
import draggableReducer from "./draggableReducer";
import itemInfoReducer from "./itemInfoReducer";
import collectionsReducer from "./collectionsReducer";

export type appState = {
  groups: { value: { [key: number]: Array<Item> } };
  draggableInfo: { value: { itemId: string; originalGroupNumber: number } };
  selectedItem: { value: Item | null };
  collections: { list: Array<any>; selectedCollection: {} };
};

export default configureStore({
  reducer: {
    groups: groupsReducer,
    draggableInfo: draggableReducer,
    selectedItem: itemInfoReducer,
    collections: collectionsReducer,
  },
});
