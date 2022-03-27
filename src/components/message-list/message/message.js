import React from "react";
import cls from "classnames";
import styles from "./message.module.css";

export function Message({ m }) {
  return (
    <div
      className={cls(styles.message, {
        [styles.currentMessage]: m.author === "Пользователь",
      })}
    >
      <h1>{m.author}</h1>
      <p>{m.text}</p>
      <p>{m.date}</p>
    </div>
  );
}
