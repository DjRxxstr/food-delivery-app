import { createSlice } from "@reduxjs/toolkit";

const userProgressSlice = createSlice({
    name: 'progress',
    initialState: '',
    reducers: {
        showCart(state) {
            return 'cart';
        },

        hideCart(state) {
            return '';
        },
        showCheckout(state) {
            return 'checkout';
        },
        hideCheckout(state) {
            return '';
        }
    }
});

export const userProgressActions = userProgressSlice.actions;

export default userProgressSlice;