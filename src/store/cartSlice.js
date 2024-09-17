import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push({
                ...action.payload,
                cartItemId: new Date().getTime()
            })
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.cartItemId !== action.payload);
        },

    }
})

export const { addItem, removeItem } = cartSlice.actions
export default cartSlice.reducer