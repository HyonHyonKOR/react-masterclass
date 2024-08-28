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

export const isLight = atom(true);
