import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  docData: "",
};

export const docDataSlice = createSlice({
  name: 'docData',
  initialState,
  reducers: {
    docData: (state, action) => {
      state.screen = action.payload;
    },
  },
});

export const {docData} = docDataSlice.actions;

export default docDataSlice.reducer;
