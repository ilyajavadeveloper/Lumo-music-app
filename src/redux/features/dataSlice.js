import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArtistDetails = createAsyncThunk(
  'data/fetchArtistDetails',
  async (artistId, thunkAPI) => {
    try {
      const [artistRes, topSongsRes] = await Promise.all([
        axios.get(`http://localhost:5000/deezer/artist/${artistId}`),
        axios.get(`http://localhost:5000/deezer/artist/${artistId}/top`)
      ]);

      return {
        id: artistId,
        ...artistRes.data,
        topSongs: topSongsRes.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    artistDetails: {},
    topCharts: [],
  },
  reducers: {
    setTopCharts: (state, action) => {
      state.topCharts = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtistDetails.fulfilled, (state, action) => {
        state.artistDetails[action.payload.id] = action.payload;
      })
      .addCase(fetchArtistDetails.rejected, (state, action) => {
        console.error('Error fetching artist details:', action.payload);
      });
  },
});

export const { setTopCharts } = dataSlice.actions;
export default dataSlice.reducer;
