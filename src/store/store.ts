import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "src/store/auth";
import { uiSlice } from "src/store/ui";
import { postSlice } from "src/store/post";
import { emailSlice } from "src/store/email";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { usersSlice } from "src/store/users";
import { commentSlice } from "src/store/comment";
import { chatSlice } from "src/store/chats";
import { notificationsSlice } from "src/store/notifications";

/**
 * Redux store.
 */
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    post: postSlice.reducer,
    email: emailSlice.reducer,
    users: usersSlice.reducer,
    comment: commentSlice.reducer,
    chats: chatSlice.reducer,
    notifications: notificationsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
