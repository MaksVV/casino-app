import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  deposit: 0,
  balance: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action) => (state = action.payload),
    deleteUser: (state) => (state = initialState),
    updateBalance: (state, action) => {
      return {
        ...state,
        balance: action.payload,
      };
    },
  },
});

export const { createUser, deleteUser, updateBalance } = userSlice.actions;

export const getName = (state) => state.user.name;
export const getDeposit = (state) => state.user.deposit;
export const getBalance = (state) => state.user.balance;

export default userSlice.reducer;
