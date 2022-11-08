import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    TotalPrice: 0,
    items: [],
    totalCount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {

            const findItem = state.items.find((obj) => obj.id === action.payload.id)

            if(findItem){
                findItem.count ++
            } else{
                state.items.push(
                    {...action.payload,
                    count: 1
                    }
                )
            }
            state.TotalPrice = state.items.reduce((sum, obj) => {
                return sum + (obj.price * obj.count)
            }, 0)
            state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0)
        },
        removeItem(state, action) {
           state.items = state.items.filter((obj) => obj.id !== action.payload)
           state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0)
           state.TotalPrice = state.items.reduce((sum, obj) => {
               return sum + (obj.price * obj.count)
           }, 0)
        },
        clearItems( state) {
            state.items = []
            state.TotalPrice = 0
            state.totalCount = 0
        },
        minusItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload)
            findItem.count--
            state.totalCount--
            state.TotalPrice = state.items.reduce((sum, obj) => {
                return sum + (obj.price * obj.count)
            }, 0)
        }

    }
})

export const {addItem, removeItem, clearItems, minusItem} = cartSlice.actions

export default cartSlice.reducer