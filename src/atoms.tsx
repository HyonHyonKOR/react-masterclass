import { atom } from "jotai";

export interface ITodo {
  id: number;
  text: string;
  date: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const toDosAtom = atom<IToDoState>({
  "To Do": [],
  Doing: [],
  Done: [],
});

interface IthemeState {
  isLight: boolean;
}

export const themeAtom = atom<IthemeState>({
  isLight: true,
});
