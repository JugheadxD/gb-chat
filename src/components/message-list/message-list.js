import React, { useState, useEffect } from "react";
import { Input, InputAdornment } from "@mui/material";
import { Send } from "@mui/icons-material";
import { Message } from "./message";
import { useStyles } from "./use-styles";

export function MessageList() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState([
    {
      id: 1,
      author: "Бот",
      text: "Привет от Бота",
      date: new Date().toLocaleTimeString(),
    },
  ]);

  const styles = useStyles();

  const sendMessage = () => {
    if (value) {
      setMessage([
        ...message,
        {
          author: "Пользователь",
          text: value,
          date: new Date().toLocaleTimeString(),
        },
      ]);
      setValue("");
    }
  };

  const handlePressedInput = ({ code }) => {
    if (code === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    const lastMessage = message[message.length - 1];
    let timerId = null;

    if (message && lastMessage.author === "Пользователь") {
      timerId = setTimeout(() => {
        setMessage([
          ...message,
          {
            author: "Бот",
            text: "Привет от Бота",
            date: new Date().toLocaleTimeString(),
          },
        ]);
      }, 1500);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [message]);

  return (
    <div>
      <div>
        {message.map((m) => (
          <Message key={m.date} m={m} />
        ))}
      </div>
      <div>
        <Input
          fullWidth
          placeholder="Введите текст..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          autoFocus
          onKeyPress={handlePressedInput}
          className={styles.input}
          endAdornment={
            <InputAdornment position="end">
              {value && <Send className={styles.icon} />}
            </InputAdornment>
          }
        />
      </div>
    </div>
  );
}
