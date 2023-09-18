import { Textarea, Button } from "@chakra-ui/react";
import { HeaderChat, MessageContent } from ".";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { useEffect, useRef, useState } from "react";
import { SendMessage, CreateChat } from "src/interfaces";
import { useTypedSelector } from "src/store";
import {
  sendMessage,
  createChat,
  clearMessages,
  getMessages,
} from "src/store/chats";
import defaultChat from "src/assets/images/default-chat.svg";
import "./ChatView.css";
import { useScrollPagination } from "src/hooks";

export const ChatMessages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useTypedSelector(({ auth }) => auth);
  const {
    chatSelected,
    messages,
    isSendingMessage,
    isCreatingChat,
    isLoadingMessages,
    totalMessages,
  } = useTypedSelector(({ chats }) => chats);
  const participant = chatSelected?.participants[0];
  const [message, setMessage] = useState<string>("");
  const messagesListRef = useRef<HTMLDivElement>(null);

  const { page } = useScrollPagination({
    isLoading: isLoadingMessages,
    currentRecords: messages.length,
    total: totalMessages,
    elementRef: messagesListRef,
    isReverse: true,
  });

  const onChangeMessage = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(value);
  };

  const onSendMessage = () => {
    if (!message.trim()) return;

    setMessage("");

    if (chatSelected?._id) {
      const data: SendMessage = {
        id: chatSelected._id,
        message: {
          content: {
            text: message,
          },
        },
      };

      dispatch(sendMessage(data));
    } else {
      const chatData: CreateChat = {
        participants: [user?._id as string, participant?._id as string],
        message: {
          content: {
            text: message,
          },
          sender: user?._id as string,
        },
      };

      dispatch(createChat(chatData));
    }
  };

  useEffect(() => {
    if (chatSelected?._id) {
      dispatch(
        getMessages({
          id: chatSelected._id,
          queryParams: {
            limit: 15,
            page,
          },
        })
      );
    } else {
      dispatch(clearMessages());
    }
  }, [dispatch, chatSelected?._id, page]);

  useEffect(() => {
    if (messagesListRef.current) {
      const scrollTop = Number(localStorage.getItem("scrollTop"));
      if (scrollTop) {
        messagesListRef.current.scrollTop = scrollTop;
      } else {
        messagesListRef.current.scrollTop =
          messagesListRef.current.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <>
      {participant ? (
        <>
          <HeaderChat
            avatar={participant.avatar}
            fullName={participant.fullName}
          />
          <div className="messages-container scrollable-chat">
            {messages.map(({ _id, content, sender, createdAt }) => (
              <MessageContent
                key={_id}
                content={content}
                createdAt={createdAt}
                isFromCurrentUser={sender === user?._id}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2 bg-white p-3 rounded-md">
            <Textarea
              backgroundColor="white"
              resize="none"
              placeholder="Mensaje"
              value={message}
              onChange={onChangeMessage}
            />
            <div className="flex justify-end">
              <Button
                onClick={onSendMessage}
                leftIcon={<i className="fa-regular fa-paper-plane"></i>}
                variant="message"
                isLoading={isSendingMessage || isCreatingChat}
              >
                Enviar
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <div className="max-w-[500px]">
            <img className="w-full" src={defaultChat} />
          </div>
        </div>
      )}
    </>
  );
};
