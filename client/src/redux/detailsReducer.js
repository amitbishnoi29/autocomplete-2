import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  placeDetails: {},
  hotelDetails:[]
};

const detailsReducer = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setPlaceDetails: (state, action) => {
      state.placeDetails = action.payload;
    },
    setHotelDetails: (state, action) => {
      state.hotelDetails = action.payload;
    }
  },
});

export const { setPlaceDetails , setHotelDetails } = detailsReducer.actions;

export default detailsReducer.reducer;
