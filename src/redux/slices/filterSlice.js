import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoriItem: 0,
    currentPage: 1,
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
            state.sort = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage= action.payload
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.sort
            state.categoriItem = Number(action.payload.categoriItem)
        }
    }
})



export const { setCategory, setSort, setCurrentPage,setFilters } = filterSlice.actions

export default filterSlice.reducer
