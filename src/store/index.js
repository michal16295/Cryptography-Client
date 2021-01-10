import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import auth from "./auth";
import chat from "./chat";
const reducer = combineReducers({
  // here we will be adding reducers
  auth,
  chat,
});
const store = configureStore({
  reducer,
});
export default store;
