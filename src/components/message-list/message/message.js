import React from "react";
import cls from "classnames";
import styles from "./message.module.css";

export const Message = ({ message }) => {
  return (
    <div
      className={cls(styles.message, {
        [styles.currentMessage]: message.author === "Пользователь",
      })}
    >
      <h3>{message.author}</h3>
      <p>{message.message}</p>
      <p>{message.date}</p>
    </div>
  );
};
