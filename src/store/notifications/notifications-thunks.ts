import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { peopleApi } from "src/api";
import { getQueryStringFromObject } from "src/helpers";
import { Notification, PaginatedResponse, QueryParams } from "src/interfaces";
import { AsyncThunkConfig } from "src/store/types";

/**
 * Get notifications.
 *
 * @returns A thunk that dispatches an action.
 */
export const getNotifications = createAsyncThunk<
  PaginatedResponse<Notification>,
  QueryParams,
  AsyncThunkConfig
>("getNotifications", async (queryParams, { rejectWithValue }) => {
  try {
    const queryString = getQueryStringFromObject(queryParams || {});
    const { data } = await peopleApi.get<PaginatedResponse<Notification>>(
      `/notification?${queryString}`
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
