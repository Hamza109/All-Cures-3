import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: [],
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    tokenData: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {tokenData} = tokenSlice.actions;

export default tokenSlice.reducer;
