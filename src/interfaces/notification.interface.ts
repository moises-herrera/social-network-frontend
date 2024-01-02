/**
 * Represents the information of a notification.
 */
export interface Notification {
  /** Id of the notification. */
  _id: string;

  /** Note with info about the notification. */
  note: string;

  /** User id of the recipient. */
  recipient: string;

  /** User id of the sender. */
  sender: string;

  /** Whether the notification has been read or not. */
  hasRead: boolean;

  /** Post id of the post that the notification is about. */
  post?: string;

  /** Comment id of the comment that the notification is about. */
  comment?: string;
}

/**
 * The user data used to display a notification.
 */
export interface UserNotification {
  /** User id. */
  _id: string;

  /** User name. */
  username: string;

  /** User profile picture. */
  avatar: string;
}
