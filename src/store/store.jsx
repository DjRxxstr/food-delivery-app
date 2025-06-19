import { configureStore } from "@reduxjs/toolkit";

import mealsSlice from "./meals";
import cartSlice from "./cart";
import userProgressSlice from "./user-progress";

const store = configureStore(
    {
        reducer: {
            meals: mealsSlice.reducer,
            cart: cartSlice.reducer,
            progress: userProgressSlice.reducer,
        }
    }
);

export default store;