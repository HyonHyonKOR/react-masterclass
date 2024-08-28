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
      MdNightlight,
      MdLightMode {
        transition: color 1s ease-in-out;
      }
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
        <MdAddToPhotos onClick={createBoard} size={30} />
      </button>
      <button>
        {isLight ? (
          <MdNightlight onClick={changeMode} size={30} />
        ) : (
          <MdLightMode onClick={changeMode} size={30} />
        )}
      </button>
    </Header>
  );
}
