import { useState } from "react";
import { List } from "@mui/material";

import { Chat } from "./chat";
import { Link, useParams } from "react-router-dom";

export function ChatList() {
  const [chats] = useState(["room1", "room2", "room3"]);
  const { roomId } = useParams();

  return (
    <List component="nav">
      {chats.map((chat, index) => (
        <Link key={index} to={`/chat/${chat}`}>
          <Chat title={chat} selected={roomId === chat} />
        </Link>
      ))}
    </List>
  );
}
