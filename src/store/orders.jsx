import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    addOrder(state, action) {
      state.push(action.payload);
      
    },
  },
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice;