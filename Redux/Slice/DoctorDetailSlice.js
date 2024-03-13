import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const docSlice = createSlice({
  name: 'doc',
  initialState,
  reducers: {
    docData: (state, action) => {
      state.data = action.payload
    },
  },
});

export const {docData} = docSlice.actions;

export default docSlice.reducer;
