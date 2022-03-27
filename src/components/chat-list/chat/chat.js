import React from "react";
// import styles from "./chat.module.css";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    item: {
      "&.Mui-selected": {
        backgroundColor: "#2b5280",
      },
      "&.Mui-selected:hover": {
        backgroundColor: "#2b5280",
      },
    },
  };
});

export function Chat({ title, selected, handleListItemClick }) {
  const styles = useStyles();
  return (
    <ListItemButton
      onClick={handleListItemClick}
      className={styles.item}
      selected={selected}
    >
      <ListItem>
        <AccountBoxIcon fontSize="large" />
      </ListItem>
      <ListItemText primary={title} />
    </ListItemButton>
  );
}
