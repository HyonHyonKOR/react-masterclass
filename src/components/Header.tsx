import styled from "styled-components";
import { MdAddToPhotos, MdLightMode, MdNightlight } from "react-icons/md";
import { useAtom } from "jotai";
import { themeAtom } from "../atoms";

export default function Header() {
  const [mode, setMode] = useAtom(themeAtom);
  const changeMode = () => {
    setMode((prev) => {
      const newMode = { ...prev, isLight: !prev.isLight };
      localStorage.setItem("isLightMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  const Header = styled.header`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 2rem;
    margin: 0 10rem;
    height: 10vh;

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
        <MdAddToPhotos size={30} />
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
