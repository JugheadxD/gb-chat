import { useState, useEffect, useRef } from "react";
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
        date: "date",
      },
    ],
  });

  const styles = useStyles();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, ref.current.scrollHeight);
    }
  });

  const sendMessage = () => {
    if (value) {
      setMessageList({
        ...messageList,
        [roomId]: [
          ...(messageList[roomId] ?? []),
          {
            author: "Пользователь",
            message: value,
            date: "date",
          },
        ],
      });
      setValue("");
    }
  };

  const handlePressInput = ({ code }) => {
    if (code === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    const messages = messageList[roomId] ?? [];
    const lastMessage = messages[messages.length - 1];
    let timerId = null;

    if (messages.length && lastMessage.author === "Пользователь") {
      timerId = setTimeout(() => {
        setMessageList({
          ...messageList,
          [roomId]: [
            ...(messageList[roomId] ?? []),
            {
              author: "Бот",
              message: "Привет от Бота",
              date: "date",
            },
          ],
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [messageList, roomId]);

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
        endAdornment={
          <InputAdornment position="end">
            {value && <Send className={styles.icon} onClick={sendMessage} />}
          </InputAdornment>
        }
      />
    </>
  );
};
