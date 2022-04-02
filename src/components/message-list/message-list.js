import { useState, useEffect, useRef, useCallback } from "react";
import { Input, InputAdornment } from "@mui/material";
import { Send } from "@mui/icons-material";
import { Message } from "./message";
import { useStyles } from "./use-styles";
import { useParams } from "react-router-dom";

export const MessageList = () => {
  const ref = useRef();
  const { roomId } = useParams();

  const [value, setValue] = useState("");
  const [messageList, setMessageList] = useState({
    room1: [
      {
        author: "Бот",
        message: "Привет от Бота",
        date: new Date(),
      },
    ],
  });

  const styles = useStyles();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, ref.current.scrollHeight);
    }
  });

  const sendMessage = useCallback(
    (message, author = "Пользователь") => {
      if (message) {
        setMessageList({
          ...messageList,
          [roomId]: [
            ...(messageList[roomId] ?? []),
            {
              message,
              author,
              date: new Date(),
            },
          ],
        });
        setValue("");
      }
    },
    [messageList, roomId]
  );

  // Отправка сообщения по Enter
  const handlePressInput = ({ code }) => {
    if (code === "Enter") {
      sendMessage(value);
    }
  };

  useEffect(() => {
    const messages = messageList[roomId] ?? [];
    const lastMessage = messages[messages.length - 1];
    let timerId = null;

    if (messages.length && lastMessage.author === "Пользователь") {
      timerId = setTimeout(() => {
        sendMessage("Привет от Бота", "Бот");
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [messageList, roomId, sendMessage]);

  const message = messageList[roomId] ?? [];

  return (
    <>
      <div ref={ref}>
        {message.map((message) => (
          <Message message={message} key={message.date} />
        ))}
      </div>

      <Input
        placeholder="Введите сообщение ..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handlePressInput}
        className={styles.input}
        fullWidth
        autoFocus
        endAdornment={
          <InputAdornment position="end">
            {value && (
              <Send
                className={styles.icon}
                onClick={() => sendMessage(value)}
              />
            )}
          </InputAdornment>
        }
      />
    </>
  );
};
