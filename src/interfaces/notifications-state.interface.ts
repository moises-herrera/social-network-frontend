import { Notification } from ".";

/**
 * The notifications state in the store.
 */
export interface NotificationsState {
  /** The list of notifications. */
  list: Notification[];

  /** Whether the notifications are loading or not. */
  isLoading: boolean;

  /** The total number of notifications used for pagination. */
  total: number;
}
