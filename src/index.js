import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./index.css";

const MessageList = () => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState([
    {
      author: "bot",
      text: "Hello from Bot",
      date: new Date().toLocaleTimeString(),
    },
  ]);

  useEffect(() => {
    const lastMessage = message[message.length - 1];
    let timerId = null;

    if (message && lastMessage.author === "user") {
      timerId = setTimeout(() => {
        setMessage([...message, { author: "bot", text: "Hello from Bot" }]);
      }, 1500);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [message]);

  return (
    <div>
      <h2>
        <input
          className="input"
          placeholder="Введите текст..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="shine-button"
          onClick={() =>
            setMessage([...message, { author: "user", text: value }])
          }
        >
          Отправить
        </button>
        <hr />
        {message.map((m) => (
          <div>
            <h1>{m.author}</h1>
            <p>{m.text}</p>
            <p>{m.date}</p>
            <hr />
          </div>
        ))}
      </h2>
    </div>
  );
};

const App = () => {
  return <MessageList />;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
