// src/redux/features/likedSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likedSongs: JSON.parse(localStorage.getItem('likedSongs')) || [],
};

const likedSlice = createSlice({
  name: 'liked',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const song = action.payload;
      const exists = state.likedSongs.find((s) => s.id === song.id);
      if (exists) {
        state.likedSongs = state.likedSongs.filter((s) => s.id !== song.id);
      } else {
        state.likedSongs.push(song);
      }

      // Optional: persist in localStorage
      localStorage.setItem('likedSongs', JSON.stringify(state.likedSongs));
    },
  },
});

export const { toggleLike } = likedSlice.actions;
export default likedSlice.reducer;
