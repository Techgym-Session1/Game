import { configureStore } from '@reduxjs/toolkit';
import gameSettingsReducer from './features/gameSettingsSlice';

export const store = configureStore({
  reducer: {
    gameSettings: gameSettingsReducer
  },
})