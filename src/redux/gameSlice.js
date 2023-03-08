import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateResultGame: (state, action) => [...state, action.payload],
    deleteResultGame: (state) => (state = initialState),
  },
});

export const { updateResultGame, deleteResultGame } = gameSlice.actions;

export const getResultGame = (state) => state.game;

export default gameSlice.reducer;
