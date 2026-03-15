import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeeds: (state, action) => {
      return action.payload;
    },
    removeFeeds: (state, action) => {
      const newArray = state.filter((e) => e._id != action.payload);
      return newArray;
    },
  },
});

export const { addFeeds, removeFeeds } = feedSlice.actions;
export default feedSlice.reducer;
