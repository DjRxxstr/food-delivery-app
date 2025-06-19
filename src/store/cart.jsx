import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart(state, action){
            const existingIndex = state.findIndex((item) => item.id === action.payload.id);
            if (existingIndex === -1){
                state.push(action.payload);
            }
            else{
                state[existingIndex].quantity += 1
            }
        },
        removeFromCart(state, action){
            const existingIndex = state.findIndex((item) => item.id === action.payload.id);

            if (state[existingIndex].quantity > 1){
                state[existingIndex].quantity -= 1
            }
            else{
                state.splice(existingIndex, 1);
            }
        },
        clearCart(state){
            return [];
        },
        setCart(state, action){
            return action.payload;
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;