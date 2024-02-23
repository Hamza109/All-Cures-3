export const NAVIGATE_TO_SCREEN = 'NAVIGATE_TO_SCREEN';

export const navigateToScreen = (screenName: string) => ({
    type: NAVIGATE_TO_SCREEN,
    payload: {
      screenName,
    },
  });