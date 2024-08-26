import { atom } from "jotai";

interface IToDoState {
  [key: string]: string[];
}

export const toDosAtom = atom<IToDoState>({
  "To Do": ["a", "b"],
  Doing: ["c", "d", "e"],
  Done: ["f"],
});
