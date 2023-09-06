import { createSlice } from "@reduxjs/toolkit";
import { EmailState } from "src/interfaces";
import { sendConfirmEmail } from ".";

const initialState: EmailState = {
  notification: "",
  isLoading: false,
  error: "",
};

export const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendConfirmEmail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendConfirmEmail.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.notification = payload.message;
    });
    builder.addCase(sendConfirmEmail.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.message;
    });
  },
});
