import { User } from ".";

/**
 * Represents the users data in the store.
 */
export interface UsersState {
  /** Users list. */
  list: User[];

  /** Loading state. */
  isLoading: boolean;

  /** Total users. */
  totalUsers: number;

  /** Results count. */
  resultsCount: number;

  /** Error message. */
  error?: string | null;

  /** Followers list. */
  followers: User[];

  /** Whether the followers are loading. */
  followersLoading: boolean;

  /** Total followers filtered. */
  followersResultsCount: number;

  /** Following list. */
  following: User[];

  /** Whether the following are loading. */
  followingLoading: boolean;

  /** Total following users. */
  totalFollowing: number;

  /** Total following filtered. */
  followingResultsCount: number;

  /** User profile. */
  userProfile: User | null;

  /** Whether the user profile is loading. */
  userProfileLoading: boolean;
}
