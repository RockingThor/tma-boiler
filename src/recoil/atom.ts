import { Task } from "@/lib/type";
import { User } from "@tma.js/sdk";
import { atom } from "recoil";

export const telegramUserNameState = atom<User | undefined>({
  key: "telegramUserNameState",
  default: undefined,
});

export const tokenState = atom({
  key: "tokenState",
  default: "",
});

export const taskState = atom<Task | undefined>({
  key: "taskState",
  default: undefined,
});
