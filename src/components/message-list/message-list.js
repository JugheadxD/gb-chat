import React, { useState, useEffect, useRef } from "react";
import { Input, InputAdornment } from "@mui/material";

import { Send } from "@mui/icons-material";
import { Message } from "./message";
import { useStyles } from "./use-styles";

export const MessageList = () => {
  const ref = useRef();

  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([
    {
      author: "Бот",
      message: "Привет от Бота",
      date: new Date().toLocaleTimeString(),
    },
  ]);

  const styles = useStyles();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, ref.current.scrollHeight);
    }
  });

  const sendMessage = () => {
    if (value) {
      setMessages([
        ...messages,
        {
          author: "Пользователь",
          message: value,
          date: new Date().toLocaleTimeString(),
        },
      ]);
      setValue("");
    }
  };

  const handlePressInput = ({ code }) => {
    if (code === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    const lastMessages = messages[messages.length - 1];
    let timerId = null;

    if (messages.length && lastMessages.author === "Пользователь") {
      timerId = setTimeout(() => {
        setMessages([
          ...messages,
          {
            author: "Бот",
            message: "Привет от Бота",
            date: new Date().toLocaleTimeString(),
          },
        ]);
      }, 500);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [messages]);

  return (
    <>
      <div ref={ref}>
        {messages.map((message) => (
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
