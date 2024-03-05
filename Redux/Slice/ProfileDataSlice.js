import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {profileData} = profileSlice.actions;

export default profileSlice.reducer;
