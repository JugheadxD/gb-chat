import cls from "classnames";
import { format } from "date-fns";
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
      <p>{format(message.date, "HH:MM:ss")}</p>
    </div>
  );
};
