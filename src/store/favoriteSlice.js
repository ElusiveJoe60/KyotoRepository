import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        items: []
    },
    reducers: {
        addFavorite: (state, action) => {
            state.items.push({
                ...action.payload,
                favoriteItemId: new Date().getTime()
            });
        },
        removeFavorite: (state, action) => {
            state.items = state.items.filter(item => item.favoriteItemId !== action.payload);
        },
    }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;