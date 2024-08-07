import {createSlice} from '@reduxjs/toolkit'

import localStorageManager from 'src/utils/localStorage'

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        cartItems: localStorageManager.get('cart') || []
    },
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload
        }
    }
})

export const {
    setCartItems
} = headerSlice.actions

export default headerSlice.reducer
