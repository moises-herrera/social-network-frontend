import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { peopleApi } from "src/api";
import {
  ChangePassword,
  ConfirmEmail,
  StandardResponse,
  UpdateUser,
  User,
} from "src/interfaces";
import { uploadFile, updateFile } from "src/shared/services";
import { AsyncThunkConfig } from "src/store/types";

const { VITE_API_URL } = import.meta.env;

/**
 * Update a user.
 *
 * @param userData The user data to update.
 * @returns A thunk that dispatches an action.
 */
export const updateUser = createAsyncThunk<User, UpdateUser, AsyncThunkConfig>(
  "updateUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const avatarFile = userData.avatarFile;
      let avatarUrl = userData.avatar;

      if (avatarFile) {
        const fileUrl = !userData.avatar
          ? await uploadFile("users", avatarFile)
          : await updateFile("users", avatarFile, userData.avatar);

        avatarUrl = fileUrl;
      }

      const { data } = await peopleApi.put<User>(`/user/${id}`, {
        ...userData,
        avatar: avatarUrl,
      });

      return data;
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Ha ocurrido un error.";

      return rejectWithValue({
        message,
      });
    }
  }
);

export const confirmEmail = createAsyncThunk<
  StandardResponse,
  ConfirmEmail,
  AsyncThunkConfig
>("confirmEmail", async ({ userId, token }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<StandardResponse>(
      `${VITE_API_URL}/user/${userId}/verify-email`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    const message =
      error instanceof AxiosError
        ? error.response?.data.message
        : "Ha ocurrido un error.";

    return rejectWithValue({
      message,
    });
  }
});

/**
 * Change user password.
 *
 * @param password The new password.
 * @returns A thunk that dispatches an action.
 */
export const changePassword = createAsyncThunk<
  StandardResponse,
  ChangePassword,
  AsyncThunkConfig
>(
  "changePassword",
  async ({ userId, token, password }, { rejectWithValue }) => {
    try {
      const body = {
        password,
      };
      const { data } = await axios.post<StandardResponse>(
        `${VITE_API_URL}/user/${userId}/password`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Ha ocurrido un error.";

      return rejectWithValue({
        message,
      });
    }
  }
);
