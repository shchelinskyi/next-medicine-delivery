import { createSlice } from '@reduxjs/toolkit';

type initialStateTypes = {
    favouriteItems: string[],
}

const initialState:initialStateTypes = {
    favouriteItems: [],
};

const favouriteItems = createSlice({
    name: 'favouriteItems',
    initialState,
    reducers: {
        addToFavouriteItems: (state, action) => {
            state.favouriteItems.push(action.payload);
        },

        deleteFromFavouriteItems: (state, action) => {
            if (action.payload === 'all') {
                return {
                    ...state,
                    favouriteItems: []
                };
            }
            state.favouriteItems = state.favouriteItems.filter(item => item !== action.payload);
        },
    }
});

export default favouriteItems.reducer;

export const {
    addToFavouriteItems,
    deleteFromFavouriteItems,
} = favouriteItems.actions;