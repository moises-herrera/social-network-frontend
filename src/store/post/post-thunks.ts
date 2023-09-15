import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { peopleApi } from "src/api";
import { getQueryStringFromObject } from "src/helpers";
import {
  PaginatedResponse,
  Post,
  PostInfo,
  QueryParams,
  StandardResponse,
  UpdatePost,
} from "src/interfaces";
import { AsyncThunkConfig } from "src/store/types";

/**
 * Get posts.
 *
 * @param queryParams The query params.
 * @returns
 */
const getPosts = async (
  queryParams: QueryParams
): Promise<PaginatedResponse<PostInfo>> => {
  const queryString = getQueryStringFromObject(queryParams || {});
  const { data } = await peopleApi.get<PaginatedResponse<PostInfo>>(
    `/post?${queryString}`
  );

  return data;
};

/**
 * Get posts following list.
 *
 * @returns A thunk that dispatches an action.
 */
export const getPostsFollowing = createAsyncThunk<
  PaginatedResponse<PostInfo>,
  void,
  AsyncThunkConfig
>("getPostsFollowing", async (_, { rejectWithValue }) => {
  try {
    const posts = await getPosts({ following: true });
    return posts;
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
 * Get posts suggested list.
 * @returns A thunk that dispatches an action.
 */
export const getPostsSuggested = createAsyncThunk<
  PaginatedResponse<PostInfo>,
  void,
  AsyncThunkConfig
>("getPostsSuggested", async (_, { rejectWithValue }) => {
  try {
    const posts = await getPosts({ suggested: true });
    return posts;
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
 * Get user's posts list.
 *
 * @param userId The user id.
 * @returns A thunk that dispatches an action.
 */
export const getUserPosts = createAsyncThunk<
  PaginatedResponse<PostInfo>,
  string,
  AsyncThunkConfig
>("getUserPosts", async (userId, { rejectWithValue }) => {
  try {
    const posts = await getPosts({ userId });
    return posts;
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
 * Search posts.
 *
 * @param queryParams The query params.
 * @returns A thunk that dispatches an action.
 */
export const searchPosts = createAsyncThunk<
  PaginatedResponse<PostInfo>,
  QueryParams,
  AsyncThunkConfig
>("searchPosts", async (queryParams, { rejectWithValue }) => {
  try {
    const posts = await getPosts(queryParams);
    return posts;
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
 * Create a new post.
 *
 * @param postData The post data.
 * @returns A thunk that dispatches an action.
 */
export const createPost = createAsyncThunk<
  StandardResponse<Post>,
  FormData,
  AsyncThunkConfig
>("createPost", async (postData, { rejectWithValue }) => {
  try {
    const { data } = await peopleApi.post<StandardResponse<Post>>(
      "/post",
      postData
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
 * Update a post.
 *
 * @param updatePostData The post data.
 * @returns A thunk that dispatches an action.
 */
export const updatePost = createAsyncThunk<
  StandardResponse<Post>,
  UpdatePost,
  AsyncThunkConfig
>("updatePost", async ({ id, postData }, { rejectWithValue }) => {
  try {
    const { data } = await peopleApi.put<StandardResponse<Post>>(
      `/post/${id}`,
      postData
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
 * Delete a post.
 *
 * @param updatePostData The post data.
 * @returns A thunk that dispatches an action.
 */
export const deletePost = createAsyncThunk<
  StandardResponse,
  string,
  AsyncThunkConfig
>("deletePost", async (id, { rejectWithValue }) => {
  try {
    const { data } = await peopleApi.delete<StandardResponse>(`/post/${id}`);

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
