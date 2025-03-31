import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './features/playerSlice';
import dataReducer from './features/dataSlice'; // импорт нового dataSlice

export const store = configureStore({
  reducer: {
    player: playerReducer,
    data: dataReducer, // добавляем в state
  },
});
