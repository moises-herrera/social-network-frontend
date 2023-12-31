import { Post, PostInfo, User } from ".";

/**
 * Represents the state of the post in the store.
 */
export interface PostState {
  /** Posts following list. */
  postFollowingList: PostInfo[];

  /** Loading state. */
  isLoadingFollowing: boolean;

  /** Total posts following. */
  postsFollowingTotal: number;

  /** Posts suggested list. */
  postSuggestedList: PostInfo[];

  /** Loading state. */
  isLoadingSuggested: boolean;

  /** Total posts suggested. */
  postsSuggestedTotal: number;

  /** User's posts. */
  userPosts: PostInfo[];

  /** Loading state. */
  isLoadingUserPosts: boolean;

  /** Total user's posts. */
  userPostsTotal: number;

  /** Search posts. */
  searchResults: PostInfo[];

  /** Loading state. */
  isLoadingSearch: boolean;

  /** Total search results. */
  totalResults: number;

  /** Whether the new post form is visible. */
  isNewPostFormVisible: boolean;

  /** Whether the post form is loading. */
  isLoadingPostForm: boolean;

  /** Success message. */
  successMessage?: string | null;

  /** Error message. */
  errorMessage?: string | null;

  /** Edit post active. */
  editPost?: Post | null;

  /** Whether the delete modal is visible. */
  isDeleteModalVisible: boolean;

  /** Delete post message. */
  deleteMessage?: string | null;

  /** Delete post error message. */
  deleteError?: string | null;

  /** Delete post. */
  deletePostInfo?: PostInfo | null;

  /** Loading state. */
  isLoadingDeletePost: boolean;

  /** Post info active. */
  postInfoActive?: PostInfo | null;

  /** Users that liked the active post. */
  postUserLikes: User[];

  /** Loading state. */
  isLoadingPostLikes: boolean;

  /** Total post likes. */
  totalPostLikes: number;
}
