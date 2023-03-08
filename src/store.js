import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import gameReducer from "./redux/gameSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
});