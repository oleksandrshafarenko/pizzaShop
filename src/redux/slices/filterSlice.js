import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoriItem: 0,
    sort: { 
        name: 'популярності', sortProperyt: 'rating' 
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategory(state, action) {
            state.categoriItem = action.payload
        },
        setSort(state, action) {
            console.log(action.payload)
            state.sort = action.payload
        }
    }
})



export const { setCategory, setSort } = filterSlice.actions

export default filterSlice.reducer
