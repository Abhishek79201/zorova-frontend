import { createSlice } from '@reduxjs/toolkit';

const siteLoaderSlice = createSlice({
  name: 'siteLoader',
  initialState: {
    isLoading: true, // Set initial loading state to true
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { setLoading } = siteLoaderSlice.actions;
export default siteLoaderSlice.reducer;
