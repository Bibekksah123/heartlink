import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addrequest: (state, action) => {
      return action.payload;
    },
    removerequest: (state, action) => {
      const newArray = state.filter((e) => e._id != action.payload);
      return newArray;
    },
  },
});

export const { addrequest, removerequest } = requestSlice.actions;
export default requestSlice.reducer;
