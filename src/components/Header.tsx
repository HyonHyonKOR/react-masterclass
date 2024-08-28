import styled from "styled-components";
import { MdAddToPhotos, MdLightMode, MdNightlight } from "react-icons/md";
import { useAtom, useSetAtom } from "jotai";
import { themeAtom, toDosAtom } from "../atoms";

export default function Header() {
  const setToDos = useSetAtom(toDosAtom);
  const [mode, setMode] = useAtom(themeAtom);

  const changeMode = () => {
    setMode((prev) => {
      const newMode = { ...prev, isLight: !prev.isLight };
      localStorage.setItem("isLightMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  const createBoard = () => {
    const newBoardId = window.prompt("Add A Board")?.trim();

    if (newBoardId !== undefined) {
      if (newBoardId === "") {
        alert("Please Fill in the text");
        return;
      }
      setToDos((allToDos) => {
        if (Object.keys(allToDos).includes(newBoardId)) {
          alert("You can't make same Board");
          return allToDos;
        }

        const newToDos = { ...allToDos, [newBoardId]: [] };
        localStorage.setItem("toDos", JSON.stringify(newToDos));
        return newToDos;
      });
    }
  };
  const Header = styled.header`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 2rem;
    margin: 0 15rem;
    height: 20vh;

    @media (max-width: 704px) {
      justify-content: center;
      margin-bottom: 2rem;
    }

    button {
      padding: 0;
      background-color: transparent;
      color: ${(props) => props.theme.fontMainColor};
      cursor: pointer;
      border: none;
      transition: color 0.2s;
    }
  `;

  return (
    <Header>
      <button>
        <MdAddToPhotos onClick={createBoard} size={30} />
      </button>
      <button>
        {mode.isLight ? (
          <MdNightlight onClick={changeMode} size={30} />
        ) : (
          <MdLightMode onClick={changeMode} size={30} />
        )}
      </button>
    </Header>
  );
}
