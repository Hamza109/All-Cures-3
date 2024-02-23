// Reducer/NavigationReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  currentScreen: string;
  // Add any other properties related to navigation state
}

const initialState: NavigationState = {
  currentScreen: 'DEFAULT'
  // Initialize other properties here
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigateToScreen(state, action: PayloadAction<string>) {
      state.currentScreen = action.payload;
    },
    // Add other navigation-related reducers here
  },
});

export const { navigateToScreen } = navigationSlice.actions;
export default navigationSlice.reducer;
