import { atom } from "jotai";

interface IToDoState {
  [key: string]: string[];
}

export const toDosAtom = atom<IToDoState>({
  to_do: ["a", "b"],
  doing: ["c", "d", "e"],
  done: ["f"],
});
