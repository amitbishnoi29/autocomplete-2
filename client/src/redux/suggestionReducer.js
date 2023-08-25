import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locationSuggestions: {},
  hotelSuggestions:[]
};

const suggestionReducer = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    setLocationSuggestions: (state, action) => {
      state.locationSuggestions = action.payload;
    },
    setHotelSuggestions: (state, action) => {
      state.hotelSuggestions = action.payload;
    }
  },
});

export const { setLocationSuggestions , setHotelSuggestions } = suggestionReducer.actions;

export default suggestionReducer.reducer;
