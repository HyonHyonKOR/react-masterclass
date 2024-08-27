import styled from "styled-components";
import {
  MdOutlineAddToPhotos,
  MdAddToPhotos,
  MdNightlight,
} from "react-icons/md";

export default function Header() {
  const Header = styled.header`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 2rem;
    margin: 0 10rem;
    height: 10vh;
    button {
      padding: 0;
      background-color: transparent;
      color: ${(props) => props.theme.textColor};
      cursor: pointer;
      border: none;
    }
  `;

  return (
    <Header>
      <button>
        <MdAddToPhotos size={30} />
      </button>
      <button>
        <MdNightlight size={30} />
      </button>
    </Header>
  );
}
