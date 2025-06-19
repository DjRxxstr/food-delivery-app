import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const mealsSlice = createSlice({
    name: 'meals',
    initialState: initialState,
    reducers: {
        setMeals(state, action){
            return action.payload;
        },
    }
})

export const mealsActions = mealsSlice.actions;

export default mealsSlice;
