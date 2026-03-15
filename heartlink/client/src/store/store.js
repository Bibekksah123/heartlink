import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./user/Auth"
import feedSlice from "./connection/Feed"
import connectionSlice from "./connection/Connection"
import requestSlice from "./connection/Request"


export const store = configureStore({
  reducer: {
    user: authSlice,
    feed: feedSlice,
    connection: connectionSlice,
    request: requestSlice,
  },
});
