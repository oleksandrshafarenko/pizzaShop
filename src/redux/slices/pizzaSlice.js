import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {order, sortBy, category, currentPage, itemInPage, } = params
    const { data } = await axios.get(
        `https://6317b24bece2736550b95b29.mockapi.io/pizza?page=${currentPage}&limit=${itemInPage}&${category}&sortBy=${sortBy}&order=${order}`
    );
    return data
})

const initialState = {
    items: [],
    status: 'loading'
}

const pizzaSlice = createSlice ({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state,action){
            console.log('start loading', action)
            state.items = action.payload;
            console.log('end loading', state.items)
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        }
    }
})

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer