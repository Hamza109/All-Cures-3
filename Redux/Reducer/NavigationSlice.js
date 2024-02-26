// Reducer/NavigationReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentScreen: 'DEFAULT'
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigateToScreen(state, action) {
      state.currentScreen = action.payload;
    },
    // Add other navigation-related reducers here
  },
});

export const { navigateToScreen } = navigationSlice.actions;
export default navigationSlice.reducer;
