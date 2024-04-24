import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    bookingData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {bookingData} = bookingSlice.actions;
export default bookingSlice.reducer;
