import { io } from "socket.io-client";

/**
 * Socket client connection.
 */
export const socket = io(import.meta.env.VITE_SOCKET_URL);
