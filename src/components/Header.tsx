import styled from "styled-components";
import { MdAddToPhotos, MdLightMode, MdNightlight } from "react-icons/md";
import { useAtom, useSetAtom } from "jotai";
import { isLight, toDosAtom } from "../atoms";
import { useEffect } from "react";

export default function Header() {
  /*styles*/
  const Header = styled.header`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 2rem;
    margin: 0 15rem;
    height: 15vh;

    @media (max-width: 1280px) {
      justify-content: center;
      margin: 0.5rem 0 1rem 0;
    }

    button {
      padding: 0;
      background-color: transparent;
      color: ${(props) => props.theme.fontMainColor};
      cursor: pointer;
      border: none;
    }
  `;

  /*function*/
  const setToDos = useSetAtom(toDosAtom);
  const [isLightMode, setIsLightMode] = useAtom(isLight);

  useEffect(() => {
    localStorage.setItem("isLightMode", JSON.stringify(isLightMode));
  }, [isLightMode]);

  const changeMode = () => {
    setIsLightMode((prev) => !prev);
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

  return (
    <Header>
      <button>
        <MdAddToPhotos onClick={createBoard} size={28} />
      </button>
      <button>
        {isLightMode ? (
          <MdNightlight onClick={changeMode} size={28} />
        ) : (
          <MdLightMode onClick={changeMode} size={28} />
        )}
      </button>
    </Header>
  );
}
