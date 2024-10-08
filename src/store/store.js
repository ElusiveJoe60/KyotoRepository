import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import favoritesReducer from "./favoriteSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        favorites: favoritesReducer
    }
})