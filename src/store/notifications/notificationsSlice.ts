import { createSlice } from "@reduxjs/toolkit";
import { NotificationsState } from "src/interfaces";
import { getNotifications } from ".";

const initialState: NotificationsState = {
  list: [],
  isLoading: false,
  total: 0,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotifications.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNotifications.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.list = payload.data;
      state.total = payload.total;
    });
    builder.addCase(getNotifications.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
