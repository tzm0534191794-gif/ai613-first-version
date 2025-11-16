import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import promptsReducer from "./promptsSlice"; 

export const store = configureStore({
  reducer: {
    users: usersReducer,
    prompts: promptsReducer, 
  },
});