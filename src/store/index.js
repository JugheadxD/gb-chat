import { createStore } from "redux";
import { ProfileReducer } from "./profile";

export const store = createStore(ProfileReducer);
